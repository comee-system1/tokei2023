// @ts-check
const Router = require('express').Router();
const CreateError = require('http-errors');
const {
    validationResult
} = require('express-validator');
const Validator = require('./Validator');
const CertificationService = require('../../services/Certification/Service');
const StaffAccountService = require('../../services/StaffAccount/Service');
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
 * GETリクエスト（画面初期表示データ取得）を処理する
 */
Router.get('/initial-data',
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
                // マスタを取得する
                /*
                const [businessUnitListResult, availableSystemListResult, mstSystemNameResult] = await Promise.all([
                    StaffAccountService.getBusinessUnitList(req),
                    StaffAccountService.getAvailableSystemList(req),
                    StaffAccountService.getMstSystemName(req),
                ]);
                */

                // 職員アカウントの一覧を取得する
                await StaffAccountService.getStaffList(req)
                    .then(function (result) {
                        const body = {};
                        /*
                        body['businessUnitList'] = businessUnitListResult;
                        body['availableSystemList'] = availableSystemListResult;
                        body['mstSystemName'] = mstSystemNameResult;
                        */
                        body['staffList'] = result;

                        const bodyObj = new ResponseBody(body);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);

                        // 正常終了
                        Logger.info('処理が正常終了しました。');
                    })
                    .catch(function (err) {
                        next(CreateError(500));
                    });
            } catch (err) {
                next(CreateError(500));
                return;
            }
        }
);
/**
 * GETリクエスト（画面初期表示データ取得）を処理する
 */
Router.get('/gmenu',
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
                // 職員アカウントの一覧を取得する
                await StaffAccountService.getGroundMenu(req)
                    .then(function (result) {
                        const body = {};
                        console.log(result);
                        // データが無かったのでテスト用
                        result['syslst'][0]['syosai'] = [{
                                sysryaku: 'テスト',
                                systemid: 1
                            },
                            {
                                sysryaku: 'テスト2',
                                systemid: 2
                            }
                        ];
                        result['syslst'][1]['syosai'] = [{
                                sysryaku: 'テスト3',
                                systemid: 3
                            },
                            {
                                sysryaku: 'テスト4',
                                systemid: 4
                            }
                        ];

                        body['gmenu'] = result;

                        const bodyObj = new ResponseBody(body);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);

                        // 正常終了
                        Logger.info('処理が正常終了しました。');
                    })
                    .catch(function (err) {
                        next(CreateError(500));
                    });
            } catch (err) {
                next(CreateError(500));
                return;
            }
        }
);
/**
 * PUTリクエスト（画面初期表示データ取得）を処理する
 */
Router.put('/put-data*',
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


            // 更新処理を実行する
            await StaffAccountService.updateStaff(req)
                .then(async function (result) {
                    if (result['isSuccess'] === true) {

                        const bodyObj = new ResponseBody(result);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                        //console.log("メール配信パターン:" + req.body.mailSendType);
                        let send = [];
                        // 未登録
                        if (req.body.mailSendType == 1) {
                            if (req.body.pEmail) {
                                send.push(MailSendRequestService.insertMailSendRequest10(req));
                            }
                            send.push(MailSendRequestService.insertMailSendRequest30(req));
                        }
                        // 停止
                        if (req.body.mailSendType == 2) {
                            send.push(MailSendRequestService.insertMailSendRequest50(req));
                        }
                        // 利用中
                        if (req.body.mailSendType == 3) {
                            if (req.body.pEmail) {
                                send.push(MailSendRequestService.insertMailSendRequest20(req));
                            }
                            send.push(MailSendRequestService.insertMailSendRequest60(req));
                        }
                        try {
                            await Promise.all(send);
                        } catch (err) {
                            next(CreateError(500));
                            return;
                        }

                        const body = {};
                        body['emailPattern'] = req.body.mailSendType;
                        body['email1'] = req.body.pEmail;
                        body['email2'] = req.body.pEmailAdmin;

                        const mailbodyObj = new ResponseBody(body);
                        const mailresponse = new Response("Success", mailbodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(mailresponse));

                        // 正常終了
                        Logger.info('処理が正常終了しました。');
                    }
                })
                .catch(function (err) {
                    next(CreateError(500));
                });


        }
);
/**
 * POSTリクエスト（画面初期表示データ取得）を処理する
 */
Router.post('/post-data*',
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


            // 更新処理を実行する
            await StaffAccountService.updateStaff(req)
                .then(async function (result) {
                    if (result['isSuccess'] === true) {
                        const bodyObj = new ResponseBody(result);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        response.sendBy(req, res);
                        //console.log("メール配信パターン:" + req.body.mailSendType);
                        let send = [];
                        // 未登録
                        if (req.body.mailSendType == 1) {
                            if (req.body.pEmail) {
                                send.push(MailSendRequestService.insertMailSendRequest10(req));
                            }
                            send.push(MailSendRequestService.insertMailSendRequest30(req));
                        }

                        try {
                            await Promise.all(send);
                        } catch (err) {
                            next(CreateError(500));
                            return;
                        }

                        const body = {};
                        body['emailPattern'] = req.body.mailSendType;
                        body['email1'] = req.body.pEmail;
                        body['email2'] = req.body.pEmailAdmin;

                        const mailbodyObj = new ResponseBody(body);
                        const mailresponse = new Response("Success", mailbodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(mailresponse));

                        // 正常終了
                        Logger.info('処理が正常終了しました。');
                    }
                })
                .catch(function (err) {
                    next(CreateError(500));
                });


        }
);

/**
 * DELETEリクエストを処理する
 */
Router.delete('/delete-data',
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
    //Validator.delete,

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
            // 削除処理を実行する
            await StaffAccountService.deleteStaff(req)
                .then(async function (deleteStaffResult) {
                    if (deleteStaffResult['isSuccess'] === true) {
                        const bodyObj = new ResponseBody(deleteStaffResult);
                        const response = new Response("Success", bodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(response));
                        // response.sendBy(req, res);
                        // Logger.info('処理が正常終了しました。');

                        try {
                            await Promise.all([
                                MailSendRequestService.insertMailSendRequest40(req),
                            ]);
                        } catch (err) {
                            next(CreateError(500));
                            return;
                        }

                        const body = {};
                        body['email1'] = req.body.pKanriacnt_regist_email;
                        body['email2'] = null;

                        const mailbodyObj = new ResponseBody(body);
                        const mailResponse = new Response("Success", mailbodyObj);
                        Logger.debug('レスポンス:' + JSON.stringify(mailResponse));
                        response.sendBy(req, res);

                        // 正常終了
                        Logger.info('処理が正常終了しました。');


                    }
                })
                .catch(function (err) {
                    next(CreateError(500));
                });
        }

);



module.exports = Router;