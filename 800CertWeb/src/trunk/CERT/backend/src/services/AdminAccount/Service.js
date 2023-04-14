// @ts-check
const Config = require('config');
const ApiRepository = require('../../repositories/Api');
const Logger = require('../../utils/logger').logger();

/**
 * 管理者アカウントの一覧を取得する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.getAdminList = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/kanri_acnt');

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
                obj['user'] = el['pKanriacnt_user'];
                obj['email'] = el['pKanriacnt_email'];
                records.push(obj);
            });
            return records;
        });
    } catch (err) {
        throw err;
    }
}

/**
 * 管理者アカウントを追加登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.insertAdmin = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/kanri_acnt');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pKanriacnt_user: req.body.pKanriacnt_user,
        pKanriacnt_email: req.body.pKanriacnt_email
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
            obj['password'] = result['rtn_value'];
            return obj;
        });
    } catch (err) {
        if (err.response) {
            if (err.response.data.match(/ユーザーの作成に失敗しました。\(Conflict\)/)) {
                // アカウント重複エラーが返却された場合
                let obj = {};
                obj['isSuccess'] = false;
                return obj;
            }
        }
        throw err;
    }
}

/**
 * 管理者アカウントを更新登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.updateAdmin = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/kanri_acnt');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pKanriacnt_user: req.body.pKanriacnt_user,
        pKanriacnt_email: req.body.pKanriacnt_email,
        pPreKanriacnt_email: req.body.pPreKanriacnt_email
    }
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
        throw err;
    }
}

/**
 * 管理者アカウントを削除登録する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 処理結果
 */
exports.deleteAdmin = async function (req) {

    const repository = new ApiRepository();

    // APIのクエリパラメータを設定する
    repository.setQuery({});

    // APIのURLを設定する
    repository.setUrl(Config.get('api_common').base_url + 'account/v1/kanri_acnt');

    // APIのカスタムリクエストヘッダを設定する
    repository.setXApiAccount(Config.get('api_common').x_api_account);
    repository.setXApiKey(Config.get('api_common').x_api_key);
    repository.setXCorporationUniqueId(req.get('x-corporation-unique-id'));

    // APIのボディを設定する
    const body = {
        pKanriacnt_user: req.body.pKanriacnt_user,
        pKanriacnt_email: req.body.pKanriacnt_email
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