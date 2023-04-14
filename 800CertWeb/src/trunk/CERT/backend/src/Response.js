// @ts-check
const Config = require('config');

const ResultCodes = {
    Success: { message: '正常', httpStatusCode: 200 },
    PutAccountNotExistsWarning: { message: 'アカウントを更新できません（更新対象が未存在）', httpStatusCode: 200 },
    DuplicateAccountWarning: { message: 'アカウント重複エラーが発生しました', httpStatusCode: 200 },
    DeleteAccountNotExistsWarning: { message: 'アカウントを削除できません（削除対象が未存在）', httpStatusCode: 200 },
    DeleteAccountMinWarning: { message: 'アカウントを削除できません（削除後のアカウント数がゼロ）', httpStatusCode: 200 },
    UnexpectedError: { message: 'サーバで予期しないエラーが発生しました', httpStatusCode: 500 },
    InvalidParameters: { message: 'パラメータが不正です', httpStatusCode: 400 },
    AuthenticationFailure: { message: '認証に失敗しました', httpStatusCode: 401 },
    NotFound: { message: 'URLが不正です', httpStatusCode: 404 }
};

/**
 * レスポンスクラス
 */
module.exports = class Response {
    /**
     * コンストラクタ
     * @param {string} resultCode 処理結果の識別子（"Success" や "UnexpectedError" など）
     * @param {object} apiResponse 処理結果データ（処理結果が正常の場合のみ設定する）
     */
    constructor(resultCode, apiResponse = null) {
        this.response = {
            result: {
                code: resultCode,
                message: ResultCodes[resultCode].message
            },
        }
  
        if (apiResponse) {
            this.response.response = apiResponse
        }
  
        this.httpStatusCode = ResultCodes[resultCode].httpStatusCode
    }

    /**
     * レスポンスを返却する
     * @param {object} req Expressのリクエストオブジェクト
     * @param {object} res Expressのレスポンスオブジェクト
     */
    sendBy(req, res) {
        res.status(this.httpStatusCode)
            .type('application/json; charset=utf-8')
            .header('Access-Control-Allow-Origin', req.headers.origin)
            .header('Access-Control-Allow-Headers', Config.get('cors').allowed_headers)
            .header('Access-Control-Allow-Methods', Config.get('cors').methods)
            .send(JSON.stringify(this.response))
    }
}
