// @ts-check
// 関係マスタ
const Service = require('../../SIENT/MstKankei/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
exports.connected = async function (param) {
  apiRun.setQuery(param);
  let url = apiRun.getDomain() + '/sodan/v1/mst/kankei/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {
    let icrn_inf = [];
    result.forEach((el) => {
      let obj = {}
      Object.keys(el).forEach(function (key) {
        obj[key] = el[key];
        if (key == "sdnkandaicd") {
          obj["codeD"] = String(el[key]).padStart(3, '0');
        }
        if (key == "sdnkandainm") {
          obj["name"] = el[key];
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
exports.registed = async function (query, data) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/kankei/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
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
  let url = apiRun.getDomain() + '/sodan/v1/mst/kankei/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.putData(apiRun)
    .then(result => {
      return result.data;
    });
}
/********************
 * データ削除用
 */
exports.deleted = async function (query, data) {
  apiRun.setQuery(query);
  let url = apiRun.getDomain() + '/sodan/v1/mst/kankei/?' + apiRun.getQuery();
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}