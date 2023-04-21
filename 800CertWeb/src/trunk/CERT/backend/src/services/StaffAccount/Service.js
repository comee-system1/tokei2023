// @ts-check
const Config = require('config');
const ApiRepository = require('../../repositories/Api');
const Logger = require('../../utils/logger').logger();

/**
 * グランドメニューの一覧を取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getGroundMenu = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({
        Getkbn: req.query.Getkbn
    });
    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'gmenu/v1/gmenu?' + repository.getQuery());

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    repository.setBody('');

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiGet().then(result => {
            //console.log(result);
            //let records = [];
            /*
            result.forEach((el) => {
                console.log(el);
                let obj = {};
                // obj['pKanritaniid'] = el['pKanritaniid']; // ユーザー管理単位ID
                // obj['pKanritanicode'] = el['pKanritanicode']; // ユーザー管理単位コード
                // obj['pKanritaniname'] = el['pKanritaniname']; // ユーザー管理単名
                // obj['pKanritaniryaku'] = el['pKanritaniryaku']; // ユーザー管理単略称
                records.push(obj);
            });
            */
            return result;
        });
    } catch (err) {
        throw err;
    }
}
/**
 * 管理単位の一覧を取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getBusinessUnitList = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({
        sikibetuid: req.get('x-corporation-unique-id')
    });

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/userkanritani?' + repository.getQuery());

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    repository.setBody('');

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiGet().then(result => {
            let records = [];
            result.forEach((el) => {
                let obj = {};
                obj['pKanritaniid'] = el['pKanritaniid']; // ユーザー管理単位ID
                obj['pKanritanicode'] = el['pKanritanicode']; // ユーザー管理単位コード
                obj['pKanritaniname'] = el['pKanritaniname']; // ユーザー管理単名
                obj['pKanritaniryaku'] = el['pKanritaniryaku']; // ユーザー管理単略称
                records.push(obj);
            });
            return records;
        });
    } catch (err) {
        throw err;
    }
}

/**
 * 管理単位ごとの利用可能システムの一覧を取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getAvailableSystemList = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/siyousystemkanri');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    repository.setBody('');

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiGet().then(result => {
            let records = [];
            result.forEach((el) => {
                let obj = {};
                obj['pKanritaniid'] = el['pKanritaniid']; // 管理単位ID
                obj['pKanritanicode'] = el['pKanritanicode']; // 管理単位コード
                obj['pBunruicode'] = el['pBunruicode']; // 分類コード
                obj['pSystemcode'] = el['pSystemcode']; // システムコード
                records.push(obj);
            });
            return records;
        });
    } catch (err) {
        throw err;
    }
}

/**
 * システム名称マスタを取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getMstSystemName = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/system');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    repository.setBody('');

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiGet().then(result => {
            let records = [];
            result.forEach((elDai) => {
                let obj = {};
                obj['pBunkbn'] = elDai['pBunkbn'] // システム分類区分（1:共有 2:介護 3:障害 4:生活支援 5:基幹）
                obj['pBuncode'] = elDai['pBuncode']; // システム分類コード
                obj['pBunname'] = elDai['pBunname']; // システム分類名
                obj['pBunRyaku'] = elDai['pBunRyaku']; // システム分類名略称

                obj['system_name'] = [];
                elDai['system_name'].forEach((elChu) => {
                    let objChu = {};
                    objChu['pSyscode'] = elChu['pSyscode']; // システム名称コード
                    objChu['pSysname'] = elChu['pSysname']; // システム名
                    objChu['pSysryaku'] = elChu['pSysryaku']; // システム名略称
                    obj['system_name'].push(objChu);
                });
                records.push(obj);
            });
            return records;
        });
    } catch (err) {
        throw err;
    }
}

/**
 * 職員アカウントの一覧を取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getStaffList = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/acn_ipanacnt');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    repository.setBody('');

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiGet().then(result => {
            let records = [];

            for (let record = 0; record < result.length; record++) {

                let syozokuSearchFlg = req.query.kanritaniId == 'ALL' ? false : true;
                let syozokuSearch = [];
                if (syozokuSearchFlg) {
                    syozokuSearch = result[record]['syozoku'].filter((value) => value.kanritaniid == req.params.kanritaniId);
                }
                if (syozokuSearchFlg && syozokuSearch.length < 1) {
                    continue;
                }

                let obj = {};
                obj['siid'] = result[record]['siid']; // 職員内部ID
                obj['sicode'] = result[record]['sicode']; // 職員表示コード
                obj['sikibetuid'] = result[record]['sikibetuid']; // 識別番号
                obj['kana'] = result[record]['kana']; // フリガナ
                obj['name'] = result[record]['name']; // 職員氏名
                obj['ekbn'] = result[record]['ekbn']; // 退職区分（0:在職 1:退職）
                obj['email'] = result[record]['email']; // メールアドレス
                obj['accountid'] = result[record]['accountid']; // アカウントID
                obj['acn_kbn'] = result[record]['acn_kbn']; // アカウントの状態（0:停止中 1:使用中 2:仮登録中）
                obj['acn_kbnnai'] = result[record]['acn_kbnnai']; // アカウントの状態の内容

                obj['syozoku'] = [];
                result[record]['syozoku'].forEach((elSyozoku) => {
                    let objSyozoku = {};
                    objSyozoku['kanritaniid'] = elSyozoku['kanritaniid']; // 管理単位内部ID
                    objSyozoku['kanritanicode'] = elSyozoku['kanritanicode']; // 管理単位コード
                    objSyozoku['kanritaniname'] = elSyozoku['kanritaniname']; // 管理単位名称
                    objSyozoku['kanritaniryaku'] = elSyozoku['kanritaniryaku']; // 管理単位略称
                    objSyozoku['symd'] = elSyozoku['symd']; // 勤務開始日
                    objSyozoku['eymd'] = elSyozoku['eymd']; // 勤務終了日
                    if (elSyozoku['sykushu']) {
                        objSyozoku['syk_sname'] = elSyozoku['sykushu']['syk_sname']; // 職種名
                    }
                    obj['syozoku'].push(objSyozoku);
                });

                obj['riyosys'] = [];
                result[record]['riyosys'].forEach((elRiyosys) => {
                    let objRiyosys = {};
                    objRiyosys['pKanritaniid'] = elRiyosys['pKanritaniid']; // 管理単位ID
                    objRiyosys['pKbnid'] = elRiyosys['pKbnid']; // 区分ID
                    objRiyosys['pBunid'] = elRiyosys['pBunid']; // システム分類ID
                    objRiyosys['pSystemid'] = elRiyosys['pSystemid']; // システムID
                    objRiyosys['kengen'] = elRiyosys['kengen']; // 画面権限設定（1:有）
                    obj['riyosys'].push(objRiyosys);
                });

                records.push(obj);
            }
            return records;
        });
    } catch (err) {
        throw err;
    }
}

/**
 * 管理者アカウントを更新登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.updateGmenu = async function (req) {
    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});
    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'gmenu/v1/gmenu');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    //const body = req.body;
    let body = {};
    body = {
        "inskbn": req.body.inskbn,
        "acnt": [{
            "acntid": req.body.acnt[0].acntid,
            "syosai": req.body.acnt[0].syosai
        }]
    }

    repository.setBody(JSON.stringify(body));
    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
            //console.log(result);
            let obj = {};
            obj['isSuccess'] = result['okflg'];
            obj['message'] = result['msg'];
            return obj;
        });
    } catch (err) {
        throw err;
    }

}
/**
 * 管理者アカウントを更新登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.updateStaff = async function (req) {

    const repository = new ApiRepository();
    let body = {};
    // APIのクエリパラメータを設定する
    repository.setQuery({});
    // APIのURLを設定する
    if (req.params[0] == '/chgpass') {
        // パスワード変更用
        repository.setUrl(Config.get('api_common').base_url + 'account/v1/acn_ipanacnt/chgpass');
        body = {
            pIpanacnt: req.body.pIpanacnt,
            pChgpassword: req.body.pChgpassword,
        };
    } else {
        repository.setUrl(Config.get('api_common').base_url + 'account/v1/acn_ipanacnt');
        // APIのボディを設定する
        body = {
            pSiid: req.body.pSiid,
            pAcntumu: req.body.pAcntumu,
            pIpanacnt: req.body.pIpanacnt,
            pEmail: req.body.pEmail,
            pEnabled: req.body.pEnabled,
            pPreIpanacnt: req.body.pPreIpanacnt,
        }
    }
    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));
    // APIのボディを設定する
    repository.setBody(JSON.stringify(body));
    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPut().then(result => {
            let obj = {};
            obj['isSuccess'] = result['okflg'];
            obj['message'] = result['msg'];
            return obj;
        });
    } catch (err) {
        //console.log(err);
        throw err;
    }

}
/**
 * 職員アカウントを削除登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.deleteStaff = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/acn_ipanacnt');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pSiid: req.body.pSiid,
        pIpanacnt: req.body.pIpanacnt
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiDelete().then(result => {
            let obj = {};
            obj['isSuccess'] = result['okflg'];
            obj['message'] = result['msg'];
            return obj;
        });
    } catch (err) {
        throw err;
    }

}