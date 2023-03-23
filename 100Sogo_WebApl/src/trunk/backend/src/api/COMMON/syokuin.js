// @ts-check
const Service = require('../../COMMON/SYOKUIN/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

    var url = "";
    let cnt = 0;
    let query = "";
    let okflg = true;

    //【バリデーションチェック】
    let validFlag = true;

    //共通パラメータ
    ['Getkbn', 'Sikibetuid'].forEach(function (key) {
        if (typeof param[key] === 'undefined' || param[key] === null || param[key] === '') {
            validFlag = false;
        }
    });

    if (!validFlag) {
        return false;
    }

    Object.keys(param).forEach(function (key) {

        if (key != 'uniqid' && key != 'traceid') {
            okflg = false; 
            if (key != 'Getkbn' && key != 'Sikibetuid') {
                //必須以外のパラメータチェック
                if (param[key].trim() != "") {
                    okflg = true;
                }
            }
            else{
                okflg = true;
            }

            if(okflg == true)
            {
                if (cnt > 0) {
                    query += "&"
                }
                query += key + "=" + param[key];
            }
            cnt = 1;
        }
    });

    const Config = require('config');
    apiRun.apiAccount = Config.get('api_common').x_api_account;
    apiRun.apiKey = Config.get('api_common').x_api_key;

    url = apiRun.getDomain() + '/common/Syokuin/v1/cmst-syokuin?' + query;
    console.log("url" + url);
    apiRun.setURL(url);
    apiRun.setUniqID(param.uniqid);
    apiRun.setTraceID(param.traceid);
    return await service.getData(apiRun).then(result => {

        let returns = {};
        returns = {
            icrn_inf: result.data
        };
        return returns;
    });
}