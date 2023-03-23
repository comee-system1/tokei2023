// @ts-nocheck
const Service = require('../../SIENP/weekKeikakuKmk/Service');
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const z = require('zod');
const Logger = require('../../utils/logger').logger();

exports.connected = async function (param, kbn) {
    // connectedは使わない予定
    // 他のapiから付属品として取得 nik
    apiRun.setQuery(param);
    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + kbn + '?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);

    // データが取得できないのでテスト用に作成
    let returnData = [];

    return returnData;

}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    // エラーチェック
    // 項目のチェック
    let string = z.string();
    if (!string.safeParse(data.freetok).success || string.safeParse(data.freetok).data.length == 0) {
        Logger.error('システムエラーが発生しました。項目入力');
        throw new Error;
    }
    let array = z.array(z.string());
    if (!array.safeParse(data.yobi).success) {
        Logger.error('システムエラーが発生しました。曜日入力');
        throw new Error;
    }
    string = z.string();
    if (!string.safeParse(data.stime).success || string.safeParse(data.stime).data.length == 0) {
        Logger.error('システムエラーが発生しました。開始時刻入力');
        throw new Error;
    }
    string = z.string();
    if (!string.safeParse(data.etime).success || string.safeParse(data.etime).data.length == 0) {
        Logger.error('システムエラーが発生しました。終了時刻入力');
        throw new Error;
    }

    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + param.kbn;

    console.log("POST");
    console.log(url);
    console.log(data);

    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            //console.log(result);
            return result.data;
        });
}
/********************
 * データ更新用
 */
exports.update = async function (param, data) {
    // エラーチェック
    // 項目のチェック
    let string = z.string();
    if (!string.safeParse(data.freetok).success || string.safeParse(data.freetok).data.length == 0) {
        Logger.error('システムエラーが発生しました。項目入力');
        throw new Error;
    }
    // let array = z.array(z.string());
    // if (!array.safeParse(data.yobi).success) {
    //     Logger.error('システムエラーが発生しました。曜日入力');
    //     throw new Error;
    // }
    string = z.string();
    if (!string.safeParse(data.stime).success || string.safeParse(data.stime).data.length == 0) {
        Logger.error('システムエラーが発生しました。開始時刻入力');
        throw new Error;
    }
    string = z.string();
    if (!string.safeParse(data.etime).success || string.safeParse(data.etime).data.length == 0) {
        Logger.error('システムエラーが発生しました。終了時刻入力');
        throw new Error;
    }

    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + param.kbn;
    console.log(url);
    console.log(param);
    console.log(data);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.putData(apiRun)
        .then(result => {
            return result.data;
        });
}
/********************
 * データ削除用
 */
exports.deleted = async function (param, data) {

    apiRun.setQuery(param);
    let query = "";
    let kbn = param.kbn;
    Object.keys(param).forEach(function (key) {
        if (key != 'kbn') {
            query += "&" + key + "=" + param[key];
        }
    });
    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/kmk/' + kbn + '?' + query;

    // console.log(url);
    // console.log(param);
    // console.log(data);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}