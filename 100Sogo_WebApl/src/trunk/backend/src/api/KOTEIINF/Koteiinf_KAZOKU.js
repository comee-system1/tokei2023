// @ts-check
const Service = require('../../COMMON/KOTEIINF/Koteiinf_kazoku/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const moment = require('moment');

//データ検索
exports.connected = async function (param) {

  var url = "";
  let cnt = 0;
  let query = "";
  let query2 = "";

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
  url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + query + "?" + query2;
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
    case '100'://家族情報
    data.forEach(function (key) {
      if (typeof key.kazoku_cntid === 'undefined' || key.kazoku_cntid === null || key.kazoku_cntid === ''
        || typeof key.kazoku_kazokuname === 'undefined' || key.kazoku_kazokuname === null || key.kazoku_kazokuname === ''
        || typeof key.kazoku_kazokukana === 'undefined' || key.kazoku_kazokukana === null || key.kazoku_kazokukana === ''
        || typeof key.kazoku_yubinno1 === 'undefined' || key.kazoku_yubinno1 === null || key.kazoku_yubinno1 === ''
        || typeof key.kazoku_yubinno2 === 'undefined' || key.kazoku_yubinno2 === null || key.kazoku_yubinno2 === ''
        || typeof key.kazoku_address === 'undefined' || key.kazoku_address === null || key.kazoku_address === ''
        || typeof key.kazoku_email === 'undefined' || key.kazoku_email === null || key.kazoku_email === ''
        || typeof key.kazoku_kmail === 'undefined' || key.kazoku_kmail === null || key.kazoku_kmail === ''
        || typeof key.kazoku_kinmu_biko === 'undefined' || key.kazoku_kinmu_biko === null || key.kazoku_kinmu_biko === ''
        || typeof key.kazoku_biko === 'undefined' || key.kazoku_biko === null || key.kazoku_biko === ''        ) {
        validFlag = false;
      }
    });    
      break;
    case '101'://介護者情報
      data.forEach(function (key) {
        if (typeof key.kaigosya_kzkcntid === 'undefined' || key.kaigosya_kzkcntid === null || key.kaigosya_kzkcntid === ''
          || typeof key.kaigosya_biko === 'undefined' || key.kaigosya_biko === null || key.kaigosya_biko === '') {
          validFlag = false;
        }
      });
      break;
      case '102'://住環境
      break;
      case '103'://後見人
      data.forEach(function (key) {
        if (typeof key.koken_simei === 'undefined' || key.koken_simei === null || key.koken_simei === ''
          || typeof key.koken_kankei === 'undefined' || key.koken_kankei === null || key.koken_kankei === ''
          || typeof key.koken_yubinno1 === 'undefined' || key.koken_yubinno1 === null || key.koken_yubinno1 === ''
          || typeof key.koken_yubinno2 === 'undefined' || key.koken_yubinno2 === null || key.koken_yubinno2 === ''
          || typeof key.koken_jyusyo === 'undefined' || key.koken_jyusyo === null || key.koken_jyusyo === ''
          || typeof key.koken_renraku1_1 === 'undefined' || key.koken_renraku1_1 === null || key.koken_renraku1_1 === ''
          || typeof key.koken_renraku1_2 === 'undefined' || key.koken_renraku1_2 === null || key.koken_renraku1_2 === ''
          || typeof key.koken_renraku1_3 === 'undefined' || key.koken_renraku1_3 === null || key.koken_renraku1_3 === ''
          || typeof key.koken_renraku2_1 === 'undefined' || key.koken_renraku2_1 === null || key.koken_renraku2_1 === ''
          || typeof key.koken_renraku2_2 === 'undefined' || key.koken_renraku2_2 === null || key.koken_renraku2_2 === ''
          || typeof key.koken_renraku2_3 === 'undefined' || key.koken_renraku2_3 === null || key.koken_renraku2_3 === ''        ) {
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url + "?" + query2;
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
      case '100'://家族情報
      data.forEach(function (key) {
        if (typeof key.kazoku_cntid === 'undefined' || key.kazoku_cntid === null || key.kazoku_cntid === ''
          || typeof key.kazoku_kazokuname === 'undefined' || key.kazoku_kazokuname === null || key.kazoku_kazokuname === ''
          || typeof key.kazoku_kazokukana === 'undefined' || key.kazoku_kazokukana === null || key.kazoku_kazokukana === ''
          || typeof key.kazoku_yubinno1 === 'undefined' || key.kazoku_yubinno1 === null || key.kazoku_yubinno1 === ''
          || typeof key.kazoku_yubinno2 === 'undefined' || key.kazoku_yubinno2 === null || key.kazoku_yubinno2 === ''
          || typeof key.kazoku_address === 'undefined' || key.kazoku_address === null || key.kazoku_address === ''
          || typeof key.kazoku_email === 'undefined' || key.kazoku_email === null || key.kazoku_email === ''
          || typeof key.kazoku_kmail === 'undefined' || key.kazoku_kmail === null || key.kazoku_kmail === ''
          || typeof key.kazoku_kinmu_biko === 'undefined' || key.kazoku_kinmu_biko === null || key.kazoku_kinmu_biko === ''
          || typeof key.kazoku_biko === 'undefined' || key.kazoku_biko === null || key.kazoku_biko === ''        ) {
          validFlag = false;
        }
      });    
        break;
      case '101'://介護者情報
        data.forEach(function (key) {
          if (typeof key.kaigosya_kzkcntid === 'undefined' || key.kaigosya_kzkcntid === null || key.kaigosya_kzkcntid === ''
            || typeof key.kaigosya_biko === 'undefined' || key.kaigosya_biko === null || key.kaigosya_biko === '') {
            validFlag = false;
          }
        });
        break;
        case '102'://住環境
        break;
        case '103'://後見人
        data.forEach(function (key) {
          if (typeof key.koken_simei === 'undefined' || key.koken_simei === null || key.koken_simei === ''
            || typeof key.koken_kankei === 'undefined' || key.koken_kankei === null || key.koken_kankei === ''
            || typeof key.koken_yubinno1 === 'undefined' || key.koken_yubinno1 === null || key.koken_yubinno1 === ''
            || typeof key.koken_yubinno2 === 'undefined' || key.koken_yubinno2 === null || key.koken_yubinno2 === ''
            || typeof key.koken_jyusyo === 'undefined' || key.koken_jyusyo === null || key.koken_jyusyo === ''
            || typeof key.koken_renraku1_1 === 'undefined' || key.koken_renraku1_1 === null || key.koken_renraku1_1 === ''
            || typeof key.koken_renraku1_2 === 'undefined' || key.koken_renraku1_2 === null || key.koken_renraku1_2 === ''
            || typeof key.koken_renraku1_3 === 'undefined' || key.koken_renraku1_3 === null || key.koken_renraku1_3 === ''
            || typeof key.koken_renraku2_1 === 'undefined' || key.koken_renraku2_1 === null || key.koken_renraku2_1 === ''
            || typeof key.koken_renraku2_2 === 'undefined' || key.koken_renraku2_2 === null || key.koken_renraku2_2 === ''
            || typeof key.koken_renraku2_3 === 'undefined' || key.koken_renraku2_3 === null || key.koken_renraku2_3 === ''        ) {
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url + "?" + query2;

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
    case '100'://家族情報
    case '101'://介護者
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/kazoku' + q_url;
  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}