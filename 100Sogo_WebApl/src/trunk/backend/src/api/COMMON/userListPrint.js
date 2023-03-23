const Service = require('../../COMMON/UserListPrint/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

exports.connected = async function (param) {
    var url = "";
    apiRun.setQuery(param);
    let query = apiRun.getQuery();
    url = apiRun.getDomain() + '/syogai/daityo/v1/riyosya/riyosya/?' + query;
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