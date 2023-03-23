//@ts-check
const Service = require('../../SIENT/Uktk/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
    // 接続確認用URL
    let query = "";
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    var url;
    if (intcode.length > 0) {
        url = apiRun.getDomain() + '/sodan/v1/uktk/kobetsu?' + query;
    } else {
        url = apiRun.getDomain() + '/sodan/v1/uktk?' + query;
    }
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    let icrn_inf = [];
    return await service.getData(apiRun).then(result => {

        result.forEach((el) => {
            let obj = {}
            Object.keys(el).forEach(function (key) {
                obj[key] = el[key];
                if (key == "ymd") {
                    obj[key + "D"] = el.ymd.trim().length > 0 ? el.ymd.slice(0, 4) + "/" + el.ymd.slice(4, 6) + "/" + el.ymd.substring(6, 8) : "―";
                }
                if (key == "naiyo") {
                    obj[key + "D"] = "<" + el.cskmknm + ">\n" + el.naiyo;
                }
                if (key == "dokosha") {
                    obj['kanekiD'] = '';
                    let kankei = el['sdnkanrk'];
                    if (el['sdnkanid'] != 2) {
                        kankei += " " + el['sdnnam'];
                    }
                    for (let i = 0; i < el.dokosha.length; i++) {
                        if (i == 0) {
                            obj['sdnnam1Kankeiid'] = el.dokosha[i].kandaiid;
                            obj['sdnnam1Kankei'] = el.dokosha[i].kandainame;
                            obj['sdnnam1'] = el.dokosha[i].dokosha;
                            kankei += "\n" + obj['sdnnam1Kankei'] + " " + obj['sdnnam1'];
                        } else if (i == 1) {
                            obj['sdnnam2Kankeiid'] = el.dokosha[i].kandaiid;
                            obj['sdnnam2Kankei'] = el.dokosha[i].kandainame;
                            obj['sdnnam2'] = el.dokosha[i].dokosha;
                            kankei += "\n" + obj['sdnnam2Kankei'] + " " + obj['sdnnam2'];
                        } else if (i == 2) {
                            obj['sdnnam3Kankeiid'] = el.dokosha[i].kandaiid;
                            obj['sdnnam3Kankei'] = el.dokosha[i].kandainame;
                            obj['sdnnam3'] = el.dokosha[i].dokosha;
                            kankei += "\n" + obj['sdnnam3Kankei'] + " " + obj['sdnnam3'];
                        }
                    }
                    obj['kanekiD'] = kankei;
                }
            });

            icrn_inf.push(obj)
        });
        return icrn_inf;
    });
}

/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
    let query = "";
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    query = query.replace(/&/, '');
    let url = apiRun.getDomain() + '/sodan/v1/uktk/kobetsu?'; // + query;
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.postData(apiRun)
        .then(result => {
            return result.data;
        });
}
/********************
 * データ更新用
 */
exports.update = async function (param, data) {
    let query = "";
    let intcode = "";
    Object.keys(param).forEach(function (key) {
        if (key == "pIntcode") {
            intcode = String(param[key]);
        }
        if (key != 'uniqid' && key != 'traceid') {
            query += "&" + key + "=" + param[key];
        }

    });
    let url = apiRun.getDomain() + '/sodan/v1/uktk/kobetsu?';
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
    let url = apiRun.getDomain() + '/sodan/v1/uktk/kobetsu?';
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    apiRun.setInputs(data);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}