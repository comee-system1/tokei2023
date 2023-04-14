// @ts-check
const Axios = require('axios');
const Logger = require('../utils/logger').logger();

/**
 * 福祉見聞録APIリポジトリクラス
 */
module.exports = class Api {
    /**
     * コンストラクタ
     */
    constructor() {}

    /**
     * APIのクエリパラメータを取得する
     * @returns クエリパラメータ
     */
    getQuery() {
        return this.query;
    }

    /**
     * APIのクエリパラメータを設定する
     * @param {object} param クエリパラメータ
     */
    setQuery(param) {
        this.query = '';
        Object.keys(param).forEach(function (key) {
            this.query += "&" + key + "=" + param[key];
        }, this);
        this.query = this.query.replace('&', '');
    }

    /**
     * APIのURLを取得する
     * @returns URL
     */
    getUrl() {
        return this.url;
    }

    /**
     * APIのURLを設定する
     * @param {string} url URL
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-api-account）を取得する
     * @returns カスタムリクエストヘッダ（x-api-account）
     */
    getXApiAccount() {
        return this.xApiAccount;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-api-account）を設定する
     * @param {string} xApiAccount カスタムリクエストヘッダ（x-api-account）
     */
    setXApiAccount(xApiAccount) {
        this.xApiAccount = xApiAccount;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-api-key）を取得する
     * @returns カスタムリクエストヘッダ（x-api-key）
     */
    getXApiKey() {
        return this.xApiKey;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-api-key）を設定する
     * @param {string} xApiKey カスタムリクエストヘッダ（x-api-key）
     */
    setXApiKey(xApiKey) {
        this.xApiKey = xApiKey;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-corporation-unique-id）を取得する
     * @returns カスタムリクエストヘッダ（x-corporation-unique-id）
     */
    getXCorporationUniqueId() {
        return this.xCorporationUniqueId;
    }

    /**
     * APIのカスタムリクエストヘッダ（x-corporation-unique-id）を設定する
     * @param {string} xCorporationUniqueId カスタムリクエストヘッダ（x-corporation-unique-id）
     */
    setXCorporationUniqueId(xCorporationUniqueId) {
        this.xCorporationUniqueId = xCorporationUniqueId;
    }

    /**
     * APIのBodyを取得する
     * @returns Body
     */
    getBody() {
        return this.body;
    }

    /**
     * APIのBodyを設定する
     * @param {string} body Body
     */
    setBody(body) {
        this.body = body;
    }

    /**
     * Axiosのタイムアウト値を取得する
     * @returns タイムアウト値
     */
    getTimeout() {
        return this.timeout;
    }

    /**
     * Axiosのタイムアウト値を設定する
     * @param {string} timeout タイムアウト値
     */
    setTimeout(timeout) {
        this.timeout = timeout;
    }

    /**
     * APIに接続する（GET）
     * @returns APIレスポンス
     */
    async apiGet() {
        const HEADER = {};
        HEADER['x-api-account'] = this.getXApiAccount();
        HEADER['x-api-key'] = this.getXApiKey();
        HEADER['x-corporation-unique-id'] = this.getXCorporationUniqueId();

        var url = this.getUrl();

        Logger.info('福祉見聞録APIを実行します。['
            + 'URL=' + this.getUrl()
            + ',METHOD=' + 'GET'
            + ',事業者ユニークID=' + this.getXCorporationUniqueId() + ']');

        // @ts-ignore
        return await Axios.get(url, {
            timeout: this.getTimeout(),
            headers: HEADER
        })
        .then(function (response) {
            Logger.info('福祉見聞録APIの実行が正常終了しました。[レスポンス=' + JSON.stringify(response.data) + ']');
            return response.data;
        })
        .catch(function (err) {
            Logger.error('福祉見聞録APIの実行が異常終了しました。[' + err + ']');
            throw err;
        });
    }

    /**
     * APIに接続する（POST）
     * @returns APIレスポンス
     */
    async apiPost() {
        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        HEADER['x-api-account'] = this.getXApiAccount();
        HEADER['x-api-key'] = this.getXApiKey();
        HEADER['x-corporation-unique-id'] = this.getXCorporationUniqueId();

        var url = this.getUrl();
        var body = this.getBody();

        Logger.info('福祉見聞録APIを実行します。['
            + 'URL=' + this.getUrl()
            + ',METHOD=' + 'POST'
            + ',事業者ユニークID=' + this.getXCorporationUniqueId()
            + ',BODY=' + this.getBody() + ']');

        // @ts-ignore
        return await Axios.post(url, body, {
            timeout: this.getTimeout(),
            headers: HEADER
        })
        .then(function (response) {
            Logger.info('福祉見聞録APIの実行が正常終了しました。[レスポンス=' + JSON.stringify(response.data) + ']');
            return response.data;
        })
        .catch(function (err) {
            Logger.error('福祉見聞録APIの実行が異常終了しました。[' + err + ']');
            throw err;
        });
    }

    /**
     * APIに接続する（PUT）
     * @returns APIレスポンス
     */
    async apiPut() {
        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        HEADER['x-api-account'] = this.getXApiAccount();
        HEADER['x-api-key'] = this.getXApiKey();
        HEADER['x-corporation-unique-id'] = this.getXCorporationUniqueId();

        var url = this.getUrl();
        var body = this.getBody();

        Logger.info('福祉見聞録APIを実行します。['
            + 'URL=' + this.getUrl()
            + ',METHOD=' + 'PUT'
            + ',事業者ユニークID=' + this.getXCorporationUniqueId()
            + ',BODY=' + this.getBody() + ']');

        // @ts-ignore
        return await Axios.put(url, body, {
            timeout: this.getTimeout(),
            headers: HEADER
        })
        .then(function (response) {
            Logger.info('福祉見聞録APIの実行が正常終了しました。[レスポンス=' + JSON.stringify(response.data) + ']');
            return response.data;
        })
        .catch(function (err) {
            Logger.error('福祉見聞録APIの実行が異常終了しました。[' + err + ']');
            throw err;
        });
    }

    /**
     * APIに接続する（DELETE）
     * @returns APIレスポンス
     */
    async apiDelete() {
        const HEADER = {};
        HEADER['Content-type'] = "application/json";
        HEADER['x-api-account'] = this.getXApiAccount();
        HEADER['x-api-key'] = this.getXApiKey();
        HEADER['x-corporation-unique-id'] = this.getXCorporationUniqueId();

        var url = this.getUrl();
        var body = this.getBody();

        Logger.info('福祉見聞録APIを実行します。['
            + 'URL=' + this.getUrl()
            + ',METHOD=' + 'DELETE'
            + ',事業者ユニークID=' + this.getXCorporationUniqueId()
            + ',BODY=' + this.getBody() + ']');

        // @ts-ignore
        return await Axios.delete(url, {
            timeout: this.getTimeout(),
            headers: HEADER,
            data: body
        })
        .then(function (response) {
            Logger.info('福祉見聞録APIの実行が正常終了しました。[レスポンス=' + JSON.stringify(response.data) + ']');
            return response.data;
        })
        .catch(function (err) {
            Logger.error('福祉見聞録APIの実行が異常終了しました。[' + err + ']');
            throw err;
        });
    }
}
