// @ts-check
const Router = require('express').Router();
const CreateError = require('http-errors');
const {
    validationResult
} = require('express-validator');
const Validator = require('./Validator');
const CertificationService = require('../../services/Certification/Service');
const AdminAccountService = require('../../services/AdminAccount/Service');
const MailSendRequestService = require('../../services/MailSendRequest/Service');
const Response = require("../../Response");
const Logger = require('../../utils/logger').logger();
// テスト用
const LOCAL = "localhost:8000";
/**
 * レスポンスボディクラス
 */
class ResponseBody {
    /**
     * コンストラクタ
     * @param {object} data レスポンスボディデータ
     */
    constructor(data) {
        this.data = data;
    }
}

/**
 * GETリクエストを処理する
 */
Router.get('/',
    /**
     * 前処理を実行する
     */
    function (req, res, next) {
        // リクエストカスタムヘッダが空かどうかを検証する
        if ((req.get('x-access-token') == null) || (req.get('x-corporation-unique-id') == null)) {
            Logger.warn('リクエストヘッダが不正です。');
            next(CreateError(400));
            return;
        }
        // リクエストカスタムヘッダをログに出力する
        Logger.info('事業者ユニークID:' + req.get('x-corporation-unique-id'));

        next();
    },

    /**
     * トークンイントロスペクションを実行する
     */
    async function (req, res, next) {
            try {
                // テスト時は無効にする
                // 実装時は下記条件は不要
                if (req.headers.host != LOCAL) {
                    await CertificationService.introspect(req).then(function (result) {
                        if (!result) {
                            next(CreateError(401));
                            return;
                        }
                    });
                }
                next();
            } catch (err) {
                next(CreateError(500));
            }
        },

        /**
         * メイン処理を行う
         */
        async function (req, res, next) {
            try {
                await AdminAccountService.getAdminList(req).then(function (result) {
                    const bodyObj = new ResponseBody(result);
                    const response = new Response("Success", bodyObj);
                    Logger.debug('レスポンス:' + JSON.stringify(response));
                    response.sendBy(req, res);
                });
                // 正常終了
                Logger.info('処理が正常終了しました。');
            } catch (err) {
                next(CreateError(500));
            }
        }
);


/**
 * POSTリクエストを処理する
 */
Router.post('/',
    /**
     * 前処理を実行する
     */
    function (req, res, next) {

        // リクエストカスタムヘッダが空かどうかを検証する
        if ((req.get('x-access-token') == null) || (req.get('x-corporation-unique-id') == null)) {
            Logger.warn('リクエストヘッダが不正です。');
            next(CreateError(400));
            return;
        }
        // リクエストカスタムヘッダをログに出力する
        Logger.info('事業者ユニークID:' + req.get('x-corporation-unique-id'));

        // リクエストボディデータが空かどうかを検証する
        if ((req.body == null) || (Object.keys(req.body).length === 0)) {
            Logger.warn('リクエストボディが不正です。[リクエストボディが空です。]');
            next(CreateError(400));
            return;
        }
        // リクエストボディデータをログに出力する
        Logger.info('リクエストボディ:' + JSON.stringify(req.body));
        next();
    },

    /**
     * リクエストボディデータのバリデーションを実行する
     */
    Validator.post,

    /**
     * リクエストボディデータのバリデーション実行結果を解析する
     */
    function (req, res, next) {
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()) {
            let msg = '';
            validErrors.array({
                onlyFirstError: true
            }).forEach((error) => {
                if (msg === '') msg += error.param;
                else msg += ',' + error.param;
            });
            Logger.warn('リクエストボディが不正です。[' + msg + ']');
            next(CreateError(400));
            return;
        }
        next();
    },

    /**
     * トークンイントロスペクションを実行する
     */
    async function (req, res, next) {
            try {
                // テスト時は無効にする
                // 実装時は下記条件は不要
                if (req.headers.host != LOCAL) {
                    await CertificationService.introspect(req).then(function (result) {
                        if (!result) {
                            next(CreateError(401));
                            return;
                        }
                    });
                }
                next();
            } catch (err) {
                next(CreateError(500));
            }
        },

        /**
         * メイン処理を行う
         */
        async function (req, res, next) {
            await AdminAccountService.insertAdmin(req)
                .then(async function (insertAdminResult) {
                    if (insertAdminResult['isSuccess'] === true) {
                        try {
                            await Promise.all([
                                MailSendRequestService.insertMailSendRequest70(req, insertAdminResult['password']),
                                MailSendRequestService.insertMailSendRequest80(req, insertAdminResult['password']),
                            ]);
                        } catch (err) {
                            next(CreateError(500));
                            return;
                        }

                        const body = {};
                        body['email1'] = req.body.pKanriacnt_regist_email;
                        body['email2'] = req.body.pKanriacnt_email;

                        const bodyObj = new ResponseBody(body);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                    } else {
                        const response = new Response("DuplicateAccountWarning");
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                    }

                    // 正常終了
                    Logger.info('処理が正常終了しました。');
                })
                .catch(function (err) {
                    next(CreateError(500));
                });
        }
);

/**
 * PUTリクエストを処理する
 */
Router.put('/',
    /**
     * 前処理を実行する
     */
    function (req, res, next) {
        // リクエストカスタムヘッダが空かどうかを検証する
        if ((req.get('x-access-token') == null) || (req.get('x-corporation-unique-id') == null)) {
            Logger.warn('リクエストヘッダが不正です。');
            next(CreateError(400));
            return;
        }
        // リクエストカスタムヘッダをログに出力する
        Logger.info('事業者ユニークID:' + req.get('x-corporation-unique-id'));

        // リクエストボディデータが空かどうかを検証する
        if ((req.body == null) || (Object.keys(req.body).length === 0)) {
            Logger.warn('リクエストボディが不正です。[リクエストボディが空です。]');
            next(CreateError(400));
            return;
        }
        // リクエストボディデータをログに出力する
        Logger.info('リクエストボディ:' + JSON.stringify(req.body));
        next();
    },

    /**
     * リクエストボディデータのバリデーションを実行する
     */
    Validator.put,

    /**
     * リクエストボディデータのバリデーション実行結果を解析する
     */
    function (req, res, next) {
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()) {
            let msg = '';
            validErrors.array({
                onlyFirstError: true
            }).forEach((error) => {
                if (msg === '') msg += error.param;
                else msg += ',' + error.param;
            });
            Logger.warn('リクエストボディが不正です。[' + msg + ']');
            next(CreateError(400));
            return;
        }
        next();
    },

    /**
     * トークンイントロスペクションを実行する
     */
    async function (req, res, next) {
            try {
                // テスト時は無効にする
                // 実装時は下記条件は不要
                if (req.headers.host != LOCAL) {
                    await CertificationService.introspect(req).then(function (result) {
                        if (!result) {
                            next(CreateError(401));
                            return;
                        }
                    });
                }
                next();
            } catch (err) {
                next(CreateError(500));
            }
        },

        /**
         * メイン処理を行う
         */
        async function (req, res, next) {
            await AdminAccountService.getAdminList(req)
                .then(async function (getAdminListResult) {

                    // 更新対象のアカウントが存在することを検証する
                    let exists = false;
                    getAdminListResult.forEach((el) => {
                        if (el['email'] === req.body.pPreKanriacnt_email) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        Logger.warn('対象のアカウントが存在しないため更新できませんでした。');
                        const response = new Response("PutAccountNotExistsWarning");
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                        return;
                    }

                    // 更新処理を実行する
                    await AdminAccountService.updateAdmin(req)
                        .then(function (updateAdminResult) {
                            if (updateAdminResult['isSuccess'] === true) {
                                const body = {};
                                body['email1'] = null;
                                body['email2'] = null;

                                const bodyObj = new ResponseBody(body);
                                const response = new Response("Success", bodyObj);
                                Logger.debug('レスポンス:' + JSON.stringify(response));
                                response.sendBy(req, res);

                                // 正常終了
                                Logger.info('処理が正常終了しました。');
                            }
                        })
                        .catch(function (err) {
                            next(CreateError(500));
                        });
                })
                .catch(function (err) {
                    next(CreateError(500));
                });
        }
);

/**
 * DELETEリクエストを処理する
 */
Router.delete('/',
    /**
     * 前処理を実行する
     */
    function (req, res, next) {
        // リクエストカスタムヘッダが空かどうかを検証する
        if ((req.get('x-access-token') == null) || (req.get('x-corporation-unique-id') == null)) {
            Logger.warn('リクエストヘッダが不正です。');
            next(CreateError(400));
            return;
        }
        // リクエストカスタムヘッダをログに出力する
        Logger.info('事業者ユニークID:' + req.get('x-corporation-unique-id'));

        // リクエストボディデータが空かどうかを検証する
        if ((req.body == null) || (Object.keys(req.body).length === 0)) {
            Logger.warn('リクエストボディが不正です。[リクエストボディが空です。]');
            next(CreateError(400));
            return;
        }
        // リクエストボディデータをログに出力する
        Logger.info('リクエストボディ:' + JSON.stringify(req.body));
        next();
    },

    /**
     * リクエストボディデータのバリデーションを実行する
     */
    Validator.delete,

    /**
     * リクエストボディデータのバリデーション実行結果を解析する
     */
    function (req, res, next) {
        const validErrors = validationResult(req);
        if (!validErrors.isEmpty()) {
            let msg = '';
            validErrors.array({
                onlyFirstError: true
            }).forEach((error) => {
                if (msg === '') msg += error.param;
                else msg += ',' + error.param;
            });
            Logger.warn('リクエストボディが不正です。[' + msg + ']');
            next(CreateError(400));
            return;
        }
        next();
    },

    /**
     * トークンイントロスペクションを実行する
     */
    async function (req, res, next) {
            try {
                // テスト時は無効にする
                // 実装時は下記条件は不要
                if (req.headers.host != LOCAL) {
                    await CertificationService.introspect(req).then(function (result) {
                        if (!result) {
                            next(CreateError(401));
                            return;
                        }
                    });
                }
                next();
            } catch (err) {
                next(CreateError(500));
            }
        },

        /**
         * メイン処理を行う
         */
        async function (req, res, next) {
            await AdminAccountService.getAdminList(req)
                .then(async function (getAdminListResult) {

                    // 削除後に0件とならないこと、削除対象のアカウントが存在することを検証する
                    let exists = false;
                    getAdminListResult.forEach((el) => {
                        if (el['email'] === req.body.pKanriacnt_email) {
                            exists = true;
                        }
                    });
                    if (!exists) {
                        Logger.warn('対象のアカウントが存在しないため削除できませんでした。');
                        const response = new Response("DeleteAccountNotExistsWarning");
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                        return;
                    }
                    if (getAdminListResult.length < 2) {
                        Logger.warn('削除後の管理者アカウント数が0となるため削除できませんでした。');
                        const response = new Response("DeleteAccountMinWarning");
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                        return;
                    }

                    // 削除処理を実行する
                    await AdminAccountService.deleteAdmin(req)
                        .then(async function (deleteAdminResult) {
                            if (deleteAdminResult['isSuccess'] === true) {
                                try {
                                    await Promise.all([
                                        MailSendRequestService.insertMailSendRequest90(req),
                                    ]);
                                } catch (err) {
                                    next(CreateError(500));
                                    return;
                                }

                                const body = {};
                                body['email1'] = req.body.pKanriacnt_regist_email;
                                body['email2'] = null;

                                const bodyObj = new ResponseBody(body);
                                const response = new Response("Success", bodyObj);
                                Logger.debug('レスポンス:' + JSON.stringify(response));
                                response.sendBy(req, res);

                                // 正常終了
                                Logger.info('処理が正常終了しました。');
                            }
                        })
                        .catch(function (err) {
                            next(CreateError(500));
                        });
                })
                .catch(function (err) {
                    next(CreateError(500));
                });
        }
);

module.exports = Router;