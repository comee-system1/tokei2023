const Service = require('../../MST/cmst-sityoson/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  var url = apiRun.getDomain() + '/common/mst/v1/cmst-sityoson?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  apiRun.setApiAccount("api_common");
  return await service.getData(apiRun).then(result => {
    return result;
  });
}