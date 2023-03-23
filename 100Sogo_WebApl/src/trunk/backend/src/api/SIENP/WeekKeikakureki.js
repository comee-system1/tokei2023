// @ts-check
const Service = require('../../SIENP/WeekKeikakureki/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

exports.connected = async function (param, kbn) {
    // 接続確認用URL
    apiRun.setQuery(param);
    let query = apiRun.getQuery();
    var url = apiRun.getDomain() + '/Sodan/v1/week-keikaku/reki/' + kbn + '?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    return await service.getData(apiRun).then(result => {
        console.log(result);
        console.log(url);
        let returnData = [];
        // データ取得時
        returnData = result;
        return returnData;
    });
}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    let query = "";
    Object.keys(param).forEach(function (key) {

        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            console.log(result);
            return result.data;
        });
}
/********************
 * データ更新用
 */
exports.update = async function (param, data) {
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
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
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }
    });
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}