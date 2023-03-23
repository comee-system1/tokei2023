const Service = require('../../DAITYO/sdai-svs/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/********************
 * データ取得用
 */
exports.connected = async function (param) {
  apiRun.setQuery(param);
  var url = apiRun.getDomain() + '/common/daityo/v1/sdai-svs?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  apiRun.setApiAccount("api_common");
  return await service.getData(apiRun).then(result => {
    return result;
  });
}
/********************
 * データ登録用
 */
exports.registed = async function (param, data) {
  apiRun.setQuery(param);
  let url = apiRun.getDomain() + '/common/daityo/v1/sdai-svs?' + apiRun.getQuery();
  console.log(url);
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  apiRun.setInputs(data);
  apiRun.setApiAccount("api_common");
  return await service.postData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ更新用
 */
exports.update = async function (query, data) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/common/daityo/v1/sdai-svs?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  apiRun.setApiAccount("api_common");
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ削除用
 */
exports.deleted = async function (query) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/common/daityo/v1/sdai-svs?' + apiRun.getQuery()
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setApiAccount("api_common");
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}