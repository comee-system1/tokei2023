// @ts-check
const Axios = require('axios');
const Config = require('config');
const Logger = require('../utils/logger').logger();
const Sc = require('../../config/secret.json');
/**
 * トークンイントロスペクションリポジトリクラス
 */
module.exports = class Introspect {
    /**
     * コンストラクタ
     * @param {object} req Expressのリクエストオブジェクト
     */
    constructor(req) {
        this.setReq(req);
    }

    /**
     * Expressのリクエストオブジェクトを取得する
     * @returns Expressのリクエストオブジェクト
     */
    getReq() {
        return this.req;
    }

    /**
     * Expressのリクエストオブジェクトを設定する
     * @param {object} req Expressのリクエストオブジェクト
     */
    setReq(req) {
        this.req = req;
    }

    /**
     * トークンイントロスペクションを実行する
     * @returns 実行結果（認証成功:true / 認証失敗:false）
     */
    async execute() {

        Logger.info('トークンイントロスペクションを開始します。');

        // 事業者ユニークIDからレルム名を生成する
        let realm = Config.get('introspect').realm_name_pattern
            .replace('{CORPORATION-UNIQUE-ID}', this.req.get('x-corporation-unique-id'));
        // 設定ファイルからシークレットキーの取得を行う
        let tmpSecret = "";
        Sc.data.filter(function (value) {
            if (value.realm == realm) {
                tmpSecret = value.secretKey;
            }
        });

        // レルム名をもとにエンドポイントのURLを生成する
        var endpoint = Config.get('introspect').endpoint
            .replace('{REALM-NAME}', realm);
        // POSTデータを生成する
        // var postData = 'client_id=' + Config.get('introspect').client_id + '&' +
        //     'client_secret=' + Config.get('introspect').client_secret + '&' +
        //     'token=' + this.req.get('x-access-token');
        var postData = "";
        // secret.jsonファイルからクライアントシークレットを読み込むように修正
        if (tmpSecret) {
            postData = 'client_id=' + Config.get('introspect').client_id + '&' +
                'client_secret=' + tmpSecret + '&' +
                'token=' + this.req.get('x-access-token');
        }
        // Keycloakのエンドポイントに対してリクエストを発行する
        // @ts-ignore
        return await Axios.post(endpoint, postData, {
                timeout: Config.get('introspect').timeout
            })
            .then(function (response) {
                if (response.data.active === true) {
                    Logger.info('トークンイントロスペクションが正常終了しました。アクセストークンは有効です。');
                    return true;
                } else {
                    Logger.warn('トークンイントロスペクションが正常終了しました。アクセストークンは無効です。');
                    return false;
                }
            })
            .catch(function (err) {
                Logger.error('トークンイントロスペクションが異常終了しました。[' + err + ']');
                throw err;
            });
    }
}