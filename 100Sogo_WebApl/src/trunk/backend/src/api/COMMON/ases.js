// @ts-check
const Service = require('../../COMMON/Ases/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    // 接続確認用URL

    console.log(param);
    let query = "";
    Object.keys(param).forEach(function (key) {
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    var url = apiRun.getDomain() + '/common/ases/v1/?' + query;
    console.log(url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setApiAccount("api_common");
    return await service.getData(apiRun).then(result => {
        console.log(result);
        let obj = {}
        Object.keys(result).forEach(function (key) {
            obj[key] = result[key];
            if (key == "kanryoflg") {
                obj[key + "D"] = result[key] == 0 ? "" : "完了済み";
            }
            // if (key == "mymd" ||
            //     key == "krekiymd" ||
            //     key == "kanryoymd" ||
            //     key == "douiymd") {
            //     obj[key + "D"] = result[key].trim().length > 0 ? result[key].slice(0, 4) + "/" + result[key].slice(4, 6) + "/" + result[key].substring(6, 8) : "";
            // }
            // if (obj[key] === " ") {
            //     obj[key] = "";
            // }

        });

        return obj;
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
    apiRun.setApiAccount("api_common");
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
    apiRun.setApiAccount("api_common");
    apiRun.setInputs(data);
    return await service.putData(apiRun)
        .then(result => {
            console.log(result);
            return result.data;
        });
}
/********************
 * データ削除用
 */
exports.deleted = async function (param, data) {
    apiRun.setQuery(param);
    var url = apiRun.getDomain() + '/sodan/v1/keikakuan?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setApiAccount("api_common");
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}