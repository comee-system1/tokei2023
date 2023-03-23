// @ts-check
const Service = require('../../COMMON/KOTEIINF/Koteiinf_syakai/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

  //【バリデーションチェック】
  let validFlag = true;

  //共通パラメータ
  ['ymd', 'intcode','pJigyoid','Kbn','Dataid','Modeflg'].forEach(function (key) {
    if (typeof param[key] === 'undefined' || param[key] === null || param[key] === '') {
      validFlag = false;
    }
  });

  if (!validFlag) {
    return false;
  }

  var url = "";
  let cnt = 0;
  let query = "";
  let query2 = "";

  Object.keys(param).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' &&
      key != 'pJigyoid' && key != 'Kbn' &&
      key != 'Dataid' && key != 'Modeflg') {
      query += "/" + param[key];
    }
  });

  Object.keys(param).forEach(function (key) {
    if (key == 'pJigyoid' || key == 'Kbn' ||
      key == 'Dataid' || key == 'Modeflg') {

      if (cnt > 0) {
        query2 += "&"
      }
      query2 += key + "=" + param[key];
      cnt = 1;
    }
  });

  query = query.replace(/&/, '');
  url = apiRun.getDomain() + '/Koteijyoho/v1/syakai' + query + "?" + query2;
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

/********************
 * データ登録用
 */
exports.registed = async function (query, data) {

  //【バリデーションチェック】
  let validFlag = true;

  //共通パラメータ
  ['kbn', 'intcode'].forEach(function (key) {
    if (typeof query[key] === 'undefined' || query[key] === null || query[key] === '') {
      validFlag = false;
    }
  });
  data.forEach(function (key) {
    if (typeof key.head_jigyoid === 'undefined' || key.head_jigyoid === null || key.head_jigyoid === ''
      || typeof key.head_intcode === 'undefined' || key.head_intcode === null || key.head_intcode === ''
      || typeof key.head_dataid === 'undefined' || key.head_dataid === null || key.head_dataid === '') {
      validFlag = false;
    }
  });

  switch (String(query['kbn'])) {
    case '200'://関係機関
      data.forEach(function (key) {
        if (typeof key.kankei_cntid === 'undefined' || key.kankei_cntid === null || key.kankei_cntid === ''
          || typeof key.kankei_renrakusaki === 'undefined' || key.kankei_renrakusaki === null || key.kankei_renrakusaki === ''
          || typeof key.kankei_tantoname === 'undefined' || key.kankei_tantoname === null || key.kankei_tantoname === ''
          || typeof key.kankei_biko === 'undefined' || key.kankei_biko === null || key.kankei_biko === '') {
          validFlag = false;
        }
      });
      break;
    case '201'://手帳情報
    data.forEach(function (key) {
      if (typeof key.tetyo_sinsyobango === 'undefined' || key.tetyo_sinsyobango === null || key.tetyo_sinsyobango === ''
        || typeof key.tetyo_sinsyoymd === 'undefined' || key.tetyo_sinsyoymd === null || key.tetyo_sinsyoymd === ''
        || typeof key.tetyo_ryoikubango === 'undefined' || key.tetyo_ryoikubango === null || key.tetyo_ryoikubango === ''
        || typeof key.tetyo_ryoikuymd === 'undefined' || key.tetyo_ryoikuymd === null || key.tetyo_ryoikuymd === ''
        || typeof key.tetyo_ryoikuhanteiymd === 'undefined' || key.tetyo_ryoikuhanteiymd === null || key.tetyo_ryoikuhanteiymd === ''
        || typeof key.tetyo_ryoikunxhanteiymd === 'undefined' || key.tetyo_ryoikunxhanteiymd === null || key.tetyo_ryoikunxhanteiymd === ''
        || typeof key.tetyo_seisinbango === 'undefined' || key.tetyo_seisinbango === null || key.tetyo_seisinbango === ''
        || typeof key.tetyo_seisinymd === 'undefined' || key.tetyo_seisinymd === null || key.tetyo_seisinymd === ''
        || typeof key.tetyo_seisinhanteiymd === 'undefined' || key.tetyo_seisinhanteiymd === null || key.tetyo_seisinhanteiymd === ''                        
        || typeof key.tetyo_seisinnxhanteiymd === 'undefined' || key.tetyo_seisinnxhanteiymd === null || key.tetyo_seisinnxhanteiymd === '') {
        validFlag = false;
      }
    });    
      break;
      case '202'://福祉サービス
      data.forEach(function (key) {
        if (typeof key.kaigo_svsid === 'undefined' || key.kaigo_svsid === null || key.kaigo_svsid === ''
          || typeof key.kaigo_svstext === 'undefined' || key.kaigo_svstext === null || key.kaigo_svstext === ''
          || typeof key.kaigo_teikyoid === 'undefined' || key.kaigo_teikyoid === null || key.kaigo_teikyoid === ''
          || typeof key.kaigo_teikyotext === 'undefined' || key.kaigo_teikyotext === null || key.kaigo_teikyotext === ''
          || typeof key.kaigo_sientext === 'undefined' || key.kaigo_sientext === null || key.kaigo_sientext === ''
          || typeof key.kaigo_hindotext === 'undefined' || key.kaigo_hindotext === null || key.kaigo_hindotext === ''
          || typeof key.kaigo_biko === 'undefined' || key.kaigo_biko === null || key.kaigo_biko === '') {
          validFlag = false;
        }
      });      
      break;
  }

  if (!validFlag) {
    return false;
  }

  //queryの処理
  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');
  //dataの処理

  let query2 = "";
  Object.keys(query).forEach(function (key) {
    if (key == 'insflg') {
      query2 += "insflg=" + query[key];
    }
  });

  let url = apiRun.getDomain() + '/Koteijyoho/v1/syakai' + q_url + "?" + query2;
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
  
    //【バリデーションチェック】
    let validFlag = true;

    //共通パラメータ
    ['kbn', 'intcode'].forEach(function (key) {
      if (typeof query[key] === 'undefined' || query[key] === null || query[key] === '') {
        validFlag = false;
      }
    });
    data.forEach(function (key) {
      if (typeof key.head_jigyoid === 'undefined' || key.head_jigyoid === null || key.head_jigyoid === ''
        || typeof key.head_intcode === 'undefined' || key.head_intcode === null || key.head_intcode === ''
        || typeof key.head_dataid === 'undefined' || key.head_dataid === null || key.head_dataid === '') {
        validFlag = false;
      }
    });
  
    switch (String(query['kbn'])) {
      case '200'://関係機関
        data.forEach(function (key) {
          if (typeof key.kankei_cntid === 'undefined' || key.kankei_cntid === null || key.kankei_cntid === ''
            || typeof key.kankei_renrakusaki === 'undefined' || key.kankei_renrakusaki === null || key.kankei_renrakusaki === ''
            || typeof key.kankei_tantoname === 'undefined' || key.kankei_tantoname === null || key.kankei_tantoname === ''
            || typeof key.kankei_biko === 'undefined' || key.kankei_biko === null || key.kankei_biko === '') {
            validFlag = false;
          }
        });
        break;
      case '201'://手帳情報
      data.forEach(function (key) {
        if (typeof key.tetyo_sinsyobango === 'undefined' || key.tetyo_sinsyobango === null || key.tetyo_sinsyobango === ''
          || typeof key.tetyo_sinsyoymd === 'undefined' || key.tetyo_sinsyoymd === null || key.tetyo_sinsyoymd === ''
          || typeof key.tetyo_ryoikubango === 'undefined' || key.tetyo_ryoikubango === null || key.tetyo_ryoikubango === ''
          || typeof key.tetyo_ryoikuymd === 'undefined' || key.tetyo_ryoikuymd === null || key.tetyo_ryoikuymd === ''
          || typeof key.tetyo_ryoikuhanteiymd === 'undefined' || key.tetyo_ryoikuhanteiymd === null || key.tetyo_ryoikuhanteiymd === ''
          || typeof key.tetyo_ryoikunxhanteiymd === 'undefined' || key.tetyo_ryoikunxhanteiymd === null || key.tetyo_ryoikunxhanteiymd === ''
          || typeof key.tetyo_seisinbango === 'undefined' || key.tetyo_seisinbango === null || key.tetyo_seisinbango === ''
          || typeof key.tetyo_seisinymd === 'undefined' || key.tetyo_seisinymd === null || key.tetyo_seisinymd === ''
          || typeof key.tetyo_seisinhanteiymd === 'undefined' || key.tetyo_seisinhanteiymd === null || key.tetyo_seisinhanteiymd === ''                        
          || typeof key.tetyo_seisinnxhanteiymd === 'undefined' || key.tetyo_seisinnxhanteiymd === null || key.tetyo_seisinnxhanteiymd === '') {
          validFlag = false;
        }
      });    
        break;
        case '202'://福祉サービス
        data.forEach(function (key) {
          if (typeof key.kaigo_svsid === 'undefined' || key.kaigo_svsid === null || key.kaigo_svsid === ''
            || typeof key.kaigo_svstext === 'undefined' || key.kaigo_svstext === null || key.kaigo_svstext === ''
            || typeof key.kaigo_teikyoid === 'undefined' || key.kaigo_teikyoid === null || key.kaigo_teikyoid === ''
            || typeof key.kaigo_teikyotext === 'undefined' || key.kaigo_teikyotext === null || key.kaigo_teikyotext === ''
            || typeof key.kaigo_sientext === 'undefined' || key.kaigo_sientext === null || key.kaigo_sientext === ''
            || typeof key.kaigo_hindotext === 'undefined' || key.kaigo_hindotext === null || key.kaigo_hindotext === ''
            || typeof key.kaigo_biko === 'undefined' || key.kaigo_biko === null || key.kaigo_biko === '') {
            validFlag = false;
          }
        });      
        break;
    }
  
    
    if (!validFlag) {
      return false;
    }

  //queryの処理
  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');
  //dataの処理

  let query2 = "";
  //let first =true;
  Object.keys(query).forEach(function (key) {
    if (key == 'insflg') {
      query2 += "insflg=" + query[key];
      //first == false;
    }
  });

  let url = apiRun.getDomain() + '/Koteijyoho/v1/syakai' + q_url + "?" + query2;

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

  //バリデーションチェック
  let validFlag = true;

  //共通パラメータ
  ['kbn', 'intcode'].forEach(function (key) {
    if (typeof query[key] === 'undefined' || query[key] === null || query[key] === '') {
      validFlag = false;
    }
  });

  if (typeof data.jigyoid === 'undefined' || data.jigyoid === null || data.jigyoid === ''
    || typeof data.dataid === 'undefined' || data.dataid === null || data.dataid === '') {
    validFlag = false;
  }

  switch (String(query['kbn'])) {
    case '200'://関係機関
    case '202'://サービス
        if (typeof data.cntid === 'undefined' || data.cntid === null || data.cntid === '') {
          validFlag = false;
        }
      break;
  }

  if (!validFlag) {
    return false;
  }

  let q_url = "";
  Object.keys(query).forEach(function (key) {
    if (key != 'uniqid' && key != 'traceid' && key != 'insflg') {
      q_url += "/" + query[key];
    }
  });
  q_url = q_url.replace(/&/, '');

  let url = apiRun.getDomain() + '/Koteijyoho/v1/syakai' + q_url;
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}