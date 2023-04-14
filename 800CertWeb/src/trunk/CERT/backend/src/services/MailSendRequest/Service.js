// @ts-check
const Config = require('config');
const ApiRepository = require('../../repositories/Api');
const Logger = require('../../utils/logger').logger();

/**
 * メール送信要求（ 10： 一般ユーザーアカウント情報通知メールを登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest10 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '10',
        pEmail_address: req.body.pEmail,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（ 20： 一般ユーザー利用停止解除通知メール
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest20 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '20',
        pEmail_address: req.body.pEmail,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（ 30： 管理者向け一般ユーザーアカウント情報通知メール
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest30 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '30',
        pEmail_address: req.body.pEmailAdmin,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（ 40： 管理者向け一般ユーザーアカウント削除情報通知メール
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest40 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '40',
        pEmail_address: req.body.pEmailAdmin,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（ 50： 管理者向け一般ユーザー利用停止通知メール
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest50 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '50',
        pEmail_address: req.body.pEmailAdmin,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（ 60： 管理者向け一般ユーザー利用停止通知メール
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest60 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '60',
        pEmail_address: req.body.pEmailAdmin,
        pTmplUsername: req.body.pTmplUsername,
        pTmplAccountid: req.body.pIpanacnt,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（70：管理者ユーザーアカウント情報通知メール（設定者向け））を登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @param {string} password 仮パスワード
 * @returns 処理結果
 */
exports.insertMailSendRequest70 = async function (req, password) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '70',
        pEmail_address: req.body.pKanriacnt_regist_email,
        pTmplAdminName: req.body.pKanriacnt_regist_user,
        pTmplUsername: req.body.pKanriacnt_user,
        pTmplAccountid: req.body.pKanriacnt_email,
        pTmplAccountpassword: password,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（80：管理者ユーザーアカウント情報通知メール（所有者向け））を登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @param {string} password 仮パスワード
 * @returns 処理結果
 */
exports.insertMailSendRequest80 = async function (req, password) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '80',
        pEmail_address: req.body.pKanriacnt_email,
        pTmplUsername: req.body.pKanriacnt_user,
        pTmplAccountid: req.body.pKanriacnt_email,
        pTmplAccountpassword: password,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
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
 * メール送信要求（90：管理者ユーザーアカウント情報削除通知メール）を登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertMailSendRequest90 = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'mail/v1/sendrequest');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pEmail_kind: '90',
        pEmail_address: req.body.pKanriacnt_regist_email,
        pTmplAdminName: req.body.pKanriacnt_regist_user,
        pTmplUsername: req.body.pKanriacnt_user,
        pTmplAccountid: req.body.pKanriacnt_email,
        pSend_reservation_datetime: null
    }
    repository.setBody(JSON.stringify(body));

    // Axiosのタイムアウト値を設定する
    repository.setTimeout(Config.get('api_common').timeout);

    // APIを実行する
    try {
        return await repository.apiPost().then(result => {
            let obj = {};
            obj['isSuccess'] = result['okflg'];
            obj['message'] = result['msg'];
            return obj;
        });
    } catch (err) {
        throw err;
    }
}