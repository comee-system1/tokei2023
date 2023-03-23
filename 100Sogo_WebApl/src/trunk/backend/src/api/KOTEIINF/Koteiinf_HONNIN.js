// @ts-check
const Service = require('../../COMMON/KOTEIINF/Koteiinf_honnin/Service')
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
  ['ymd', 'intcode', 'pJigyoid', 'Kbn', 'Dataid', 'Modeflg'].forEach(function (key) {
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
  url = apiRun.getDomain() + '/Koteijyoho/v1/honnin' + query + "?" + query2;

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
    case '1'://基本情報
      data.forEach(function (key) {
        if (typeof key.kihon_email === 'undefined' || key.kihon_email === null || key.kihon_email === ''
          || typeof key.kihon_kmail === 'undefined' || key.kihon_kmail === null || key.kihon_kmail === ''
          || typeof key.kihon_ktelno === 'undefined' || key.kihon_ktelno === null || key.kihon_ktelno === ''
          || typeof key.kihon_faxno === 'undefined' || key.kihon_faxno === null || key.kihon_faxno === '') {
          validFlag = false;
        }
      });
      break;
    case '2'://生活歴
      data.forEach(function (key) {
        if (typeof key.seikatu_id === 'undefined' || key.seikatu_id === null || key.seikatu_id === ''
          || typeof key.seikatu_lcnt === 'undefined' || key.seikatu_lcnt === null || key.seikatu_lcnt === ''
          || typeof key.seikatu_ymdkoro === 'undefined' || key.seikatu_ymdkoro === null || key.seikatu_ymdkoro === ''
          || typeof key.seikatu_naiyo === 'undefined' || key.seikatu_naiyo === null || key.seikatu_naiyo === '') {
          validFlag = false;
        }
      });
      break;
    case '3'://既往歴
      data.forEach(function (key) {
        if (typeof key.kiou_id === 'undefined' || key.kiou_id === null || key.kiou_id === ''
          || typeof key.kiou_ymd === 'undefined' || key.kiou_ymd === null || key.kiou_ymd === ''
          || typeof key.kiou_syobyocode === 'undefined' || key.kiou_syobyocode === null || key.kiou_syobyocode === ''
          || typeof key.kiou_naiyo === 'undefined' || key.kiou_naiyo === null || key.kiou_naiyo === '') {
          validFlag = false;
        }
      });
      break;
    case '4'://受診歴
      data.forEach(function (key) {
        if (typeof key.jyusin_id === 'undefined' || key.jyusin_id === null || key.jyusin_id === ''
          || typeof key.jyusin_syujii === 'undefined' || key.jyusin_syujii === null || key.jyusin_syujii === ''
          || typeof key.jyusin_renrakusaki === 'undefined' || key.jyusin_renrakusaki === null || key.jyusin_renrakusaki === ''
          || typeof key.jyusin_hindo === 'undefined' || key.jyusin_hindo === null || key.jyusin_hindo === ''
          || typeof key.jyusin_fukuyaku_time === 'undefined' || key.jyusin_fukuyaku_time === null || key.jyusin_fukuyaku_time === '') {
          validFlag = false;
        }
      });
      break;
    case '5'://医療保険情報
      data.forEach(function (key) {
        if (typeof key.iryo_iryokigobango === 'undefined' || key.iryo_iryokigobango === null || key.iryo_iryokigobango === ''
          || typeof key.iryo_syogaisonota_biko === 'undefined' || key.iryo_syogaisonota_biko === null || key.iryo_syogaisonota_biko === '') {
          validFlag = false;
        }
      });
      break;
    case '6'://生活状況
      data.forEach(function (key) {
        if (typeof key.Day_id === 'undefined' || key.Day_id === null || key.Day_id === ''
          || typeof key.Day_kbn === 'undefined' || key.Day_kbn === null || key.Day_kbn === ''
          || typeof key.Day_stime === 'undefined' || key.Day_stime === null || key.Day_stime === ''
          || typeof key.Day_etime === 'undefined' || key.Day_etime === null || key.Day_etime === ''
          || typeof key.Day_naiyo === 'undefined' || key.Day_naiyo === null || key.Day_naiyo === ''
          || typeof key.week_id === 'undefined' || key.week_id === null || key.week_id === ''
          || typeof key.week_kbn === 'undefined' || key.week_kbn === null || key.week_kbn === ''
          || typeof key.week_weekkbn === 'undefined' || key.week_weekkbn === null || key.week_weekkbn === ''
          || typeof key.week_naiyo === 'undefined' || key.week_naiyo === null || key.week_naiyo === '') {
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/honnin' + q_url + "?" + query2;
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
  //バリデーションチェック
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
    case '1'://基本情報
      data.forEach(function (key) {
        if (typeof key.kihon_email === 'undefined' || key.kihon_email === null || key.kihon_email === ''
          || typeof key.kihon_kmail === 'undefined' || key.kihon_kmail === null || key.kihon_kmail === ''
          || typeof key.kihon_ktelno === 'undefined' || key.kihon_ktelno === null || key.kihon_ktelno === ''
          || typeof key.kihon_faxno === 'undefined' || key.kihon_faxno === null || key.kihon_faxno === '') {
          validFlag = false;
        }
      });
      break;
    case '2'://生活歴
      data.forEach(function (key) {
        if (typeof key.seikatu_id === 'undefined' || key.seikatu_id === null || key.seikatu_id === ''
          || typeof key.seikatu_lcnt === 'undefined' || key.seikatu_lcnt === null || key.seikatu_lcnt === ''
          || typeof key.seikatu_ymdkoro === 'undefined' || key.seikatu_ymdkoro === null || key.seikatu_ymdkoro === ''
          || typeof key.seikatu_naiyo === 'undefined' || key.seikatu_naiyo === null || key.seikatu_naiyo === '') {
          validFlag = false;
        }
      });
      break;
    case '3'://既往歴
      data.forEach(function (key) {
        if (typeof key.kiou_id === 'undefined' || key.kiou_id === null || key.kiou_id === ''
          || typeof key.kiou_ymd === 'undefined' || key.kiou_ymd === null || key.kiou_ymd === ''
          || typeof key.kiou_syobyocode === 'undefined' || key.kiou_syobyocode === null || key.kiou_syobyocode === ''
          || typeof key.kiou_naiyo === 'undefined' || key.kiou_naiyo === null || key.kiou_naiyo === '') {
          validFlag = false;
        }
      });
      break;
    case '4'://受診歴
      data.forEach(function (key) {
        if (typeof key.jyusin_id === 'undefined' || key.jyusin_id === null || key.jyusin_id === ''
          || typeof key.jyusin_syujii === 'undefined' || key.jyusin_syujii === null || key.jyusin_syujii === ''
          || typeof key.jyusin_renrakusaki === 'undefined' || key.jyusin_renrakusaki === null || key.jyusin_renrakusaki === ''
          || typeof key.jyusin_hindo === 'undefined' || key.jyusin_hindo === null || key.jyusin_hindo === ''
          || typeof key.jyusin_fukuyaku_time === 'undefined' || key.jyusin_fukuyaku_time === null || key.jyusin_fukuyaku_time === '') {
          validFlag = false;
        }
      });
      break;
    case '5'://医療保険情報
      data.forEach(function (key) {
        if (typeof key.iryo_iryokigobango === 'undefined' || key.iryo_iryokigobango === null || key.iryo_iryokigobango === ''
          || typeof key.iryo_syogaisonota_biko === 'undefined' || key.iryo_syogaisonota_biko === null || key.iryo_syogaisonota_biko === '') {
          validFlag = false;
        }
      });
      break;
    case '6'://生活状況
      data.forEach(function (key) {
        if (typeof key.Day_id === 'undefined' || key.Day_id === null || key.Day_id === ''
          || typeof key.Day_kbn === 'undefined' || key.Day_kbn === null || key.Day_kbn === ''
          || typeof key.Day_stime === 'undefined' || key.Day_stime === null || key.Day_stime === ''
          || typeof key.Day_etime === 'undefined' || key.Day_etime === null || key.Day_etime === ''
          || typeof key.Day_naiyo === 'undefined' || key.Day_naiyo === null || key.Day_naiyo === ''
          || typeof key.week_id === 'undefined' || key.week_id === null || key.week_id === ''
          || typeof key.week_kbn === 'undefined' || key.week_kbn === null || key.week_kbn === ''
          || typeof key.week_weekkbn === 'undefined' || key.week_weekkbn === null || key.week_weekkbn === ''
          || typeof key.week_naiyo === 'undefined' || key.week_naiyo === null || key.week_naiyo === '') {
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/honnin' + q_url + "?" + query2;


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
    case '2'://生活歴
    case '3'://既往歴
    case '4'://受診歴 
        if (typeof data.id === 'undefined' || data.id === null || data.id === '') {
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

  let url = apiRun.getDomain() + '/Koteijyoho/v1/honnin' + q_url;

  apiRun.setURL(url);
  apiRun.setUniqID(query.uniqid);
  apiRun.setTraceID(query.traceid);
  apiRun.setInputs(data);
  return await service.deleteData(apiRun)
    .then(result => {
      return result.data;
    });
}