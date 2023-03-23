const Service = require('../../SIHMAIN/ServiceHistory/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();
const dayjs = require('dayjs')


/********************
 * データ取得用
 */
exports.connected = async function (param) {
  //var url = apiRun.getDomain() + '/Sodan/v1/syukei/kensu?pHostname=PC01&pJigyoid=43&pTaisyo=1&pSymd=20220301&pEymd=20220331&pSiid=0&pChiku=0';
  let url = "http://192.168.30.32/syogai/daityo/v1/keiyaku/keiyakuryoicrn/?getkbn=0&srcymd=20220714&kbn=1&sibori=1";
  apiRun.setURL(url);
  apiRun.setUniqID(param.uniqid);
  apiRun.setTraceID(param.traceid);
  return await service.getData(apiRun).then(result => {

    // 利用者情報一覧
    let icrn_inf = [];
    icrn_inf.push({
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01022',
      serviceMeisyo: '生活介護',
      intcode: 102,
      riyocode: '10000001',
      names: '愛知 三郎太',
      kana: 'ｱｲﾁ ｻﾌﾞﾛｳﾀ',
      gender: '男',
      genderKey: '1',
      birth: '19300615',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20230401',
      endDate: '',
      useYear: 0,
      useMonth: 4,
    }, {
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01032',
      serviceMeisyo: '施設入所支援',
      intcode: 102,
      riyocode: '10000001',
      names: '愛知 三郎太',
      kana: 'ｱｲﾁ ｻﾌﾞﾛｳﾀ',
      gender: '男',
      genderKey: '1',
      birth: '19300615',
      age: '30',
      riyokbn: 1,
      syurui: '体験',
      startDate: '20210401',
      endDate: '',
      useYear: 0,
      useMonth: 4,
    }, {
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01022',
      serviceMeisyo: '生活介護',
      intcode: 354,
      riyocode: '10000002',
      names: '東経 花子',
      kana: 'ハナコトウケイ',
      gender: '女',
      genderKey: '2',
      birth: '19820505',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20200901',
      endDate: '',
      useYear: 1,
      useMonth: 11,
    }, {
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01032',
      serviceMeisyo: '施設入所支援',
      intcode: 354,
      riyocode: '10000002',
      names: '東経 花子',
      kana: 'ハナコトウケイ',
      gender: '女',
      genderKey: '2',
      birth: '19820505',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20200901',
      endDate: '',
      useYear: 1,
      useMonth: 11,
    }, {
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01022',
      serviceMeisyo: '生活介護',
      intcode: 355,
      riyocode: '10000003',
      names: '東経 二郎',
      kana: 'ジロウトウケイ',
      gender: '男',
      genderKey: '1',
      birth: '19820505',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20181115',
      endDate: '',
      useYear: 3,
      useMonth: 8,
    }, {
      serviceTeikyoJigyosyoCode: '1001',
      serviceTeikyoJigyosyo: '障害者支援施設 ひまわり園',
      serviceCode: '01032',
      serviceMeisyo: '施設入所支援',
      intcode: 355,
      riyocode: '10000003',
      names: '東経 二郎',
      kana: 'ジロウトウケイ',
      gender: '男',
      genderKey: '1',
      birth: '19820505',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20181105',
      endDate: '',
      useYear: 3,
      useMonth: 8,
    }, {
      serviceTeikyoJigyosyoCode: '1002',
      serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
      serviceCode: '01041',
      serviceMeisyo: '自立訓練(機能訓練)',
      intcode: 356,
      riyocode: '10000004',
      names: '東経 三郎',
      kana: 'サブロウトウケイ',
      gender: '男',
      genderKey: '1',
      birth: '19790602',
      age: '36',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20190210',
      endDate: '',
      useYear: 2,
      useMonth: 5,
    }, {
      serviceTeikyoJigyosyoCode: '1002',
      serviceTeikyoJigyosyo: '自立訓練事業所 たんぽぽ園',
      serviceCode: '01041',
      serviceMeisyo: '自立訓練(機能訓練)',
      intcode: 106,
      riyocode: '10000005',
      names: '東経 明日香',
      kana: 'アスカトウケイ',
      gender: '女',
      genderKey: '2',
      birth: '20080301',
      age: '23',
      riyokbn: 0,
      syurui: '通常',
      startDate: '20191220',
      endDate: '20221231',
      useYear: 1,
      useMonth: 7,
    }, {
      serviceTeikyoJigyosyoCode: '',
      serviceTeikyoJigyosyo: '',
      serviceCode: '',
      serviceMeisyo: '',
      intcode: 398,
      riyocode: '10000006',
      names: '東経 うみか',
      kana: 'ウミカトウケイ',
      gender: '適不',
      genderKey: '3',
      birth: '19911215',
      age: '32',
      riyokbn: 0,
      syurui: '通常',
      startDate: '',
      endDate: '',
      useYear: 0,
      useMonth: 0,
    }, {
      serviceTeikyoJigyosyoCode: '',
      serviceTeikyoJigyosyo: '',
      serviceCode: '',
      serviceMeisyo: '',
      intcode: 348,
      riyocode: '10000009',
      names: '西経 五郎',
      kana: 'ゴロウニシケイ',
      gender: '男',
      genderKey: '1',
      birth: '19870501',
      age: '30',
      riyokbn: 0,
      syurui: '通常',
      startDate: '',
      endDate: '',
      useYear: 0,
      useMonth: 0,
    }, {
      serviceTeikyoJigyosyoCode: '',
      serviceTeikyoJigyosyo: '',
      serviceCode: '',
      serviceMeisyo: '',
      intcode: 349,
      riyocode: '10000011',
      names: '西経 みどり',
      kana: 'ミドリニシケイ',
      gender: '女',
      genderKey: '2',
      birth: '19800818',
      age: '41',
      riyokbn: 0,
      syurui: '通常',
      startDate: '',
      endDate: '',
      useYear: 0,
      useMonth: 0,
    }, {
      serviceTeikyoJigyosyoCode: '',
      serviceTeikyoJigyosyo: '',
      serviceCode: '',
      serviceMeisyo: '',
      intcode: 350,
      riyocode: '10000015',
      names: '西経 桃子',
      kana: 'モモコニシケイ',
      gender: '女',
      genderKey: '2',
      birth: '19900901',
      age: '29',
      riyokbn: 0,
      syurui: '通常',
      startDate: '',
      endDate: '',
      useYear: 0,
      useMonth: 0,
    });

    // 日付を合わせる処理
    for (let i = 0; i < icrn_inf.length; i++) {
      icrn_inf[i].processTime = icrn_inf[i].useYear + "-" + icrn_inf[i].useMonth;
    }
    let returns = {
      status: 1,
      icrn_inf: icrn_inf,
    };
    return returns;

  });
}