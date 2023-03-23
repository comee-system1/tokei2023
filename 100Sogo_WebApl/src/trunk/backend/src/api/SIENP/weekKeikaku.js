// @ts-nocheck
const Service = require('../../SIENP/weekKeikaku/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const z = require('zod');
const Logger = require('../../utils/logger').logger();

exports.connected = async function (param, kbn) {
    // 接続確認用URL
    apiRun.setQuery(param);
    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/' + kbn + '?' + apiRun.getQuery();
    console.log(url);
    config.setURL(url);
    config.setUniqID(param.uniqid);
    return await service.getData().then(result => {
        console.log(result);
        // テスト用データ
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
    var url = config.getDomain() + '/sodan/v1/keikakuan?' + query;
    config.setURL(url);
    config.setUniqID(param.uniqid);
    config.setTraceID(param.traceid);
    config.setInputs(data);
    return await service.postData()
        .then(result => {
            console.log(result);
            return result.data;
        });
}
/********************
 * データ更新用
 */
exports.update = async function (param, data) {

    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/' + param.kbn;
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
    let kbn = param.kbn;
    delete param.kbn;
    apiRun.setQuery(param);
    query = apiRun.getQuery();
    var url = apiRun.getDomain() + '/sodan/v1/week-keikaku/' + kbn + '?' + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            console.log(result);
            return result.data;
        });
}