// @ts-check
const Config = require('config');
const Express = require('express');
const BodyParser = require("body-parser");
const HttpContext = require('express-http-context');
const Helmet = require('helmet');
const Cors = require('cors');
const CreateError = require('http-errors');
const Response = require("./Response");
const Logger = require('./utils/logger').logger();

// コントローラを読み込む
const AdminAccount = require('./controllers/AdminAccount/Routes');
const StaffAccount = require('./controllers/StaffAccount/Routes');

// Express起動用のポート番号を指定する
const Port = process.env.PORT || Config.get('express').port;
const App = Express();

// @ts-ignore
App.use(Helmet({
    hsts: {
        maxAge: 15552000,
        includeSubDomains: false,
        preload: false
    }
}));

/*
App.use(Cors({
    origin: Config.get('cors').origin, // アクセスを許可するオリジン
    optionsSuccessStatus: Config.get('cors').options_success_status, // 「OPTIONS」リクエスト成功時のステータスコード
    credentials: true // レスポンスヘッダに「Access-Control-Allow-Credentials」を追加
}));
*/
// localhost用
App.use(Cors({
    origin: process.env.NODE_ENV === 'production' ? ['https://t-sct1wb00.fukushikenbunroku.com:50443', 'https://t-sct1wb00.fukushikenbunroku.com:55443'] : 'http://localhost:8889', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));


// リクエストIDを生成する
App.use(HttpContext.middleware);
App.use((req, res, next) => {
    const requestId = req.get('x-request-id');
    HttpContext.set('requestId', requestId);
    // 静的リソース以外へのアクセスについて開始ログを出力する。
    if (!/^\/(?:js|img|css|favicon.ico)/.exec(req.originalUrl)) {
        Logger.info('処理を開始します。[' +
            req.method + ',' +
            req.originalUrl +
            ',X-Original-For=' +
            req.header('X-Original-For') +
            ',X-Forwarded-For=' +
            req.header('X-Forwarded-For') + ']');
    }
    next();
});

// 待ち受けポートを設定する
App.listen(Port, () =>
    Logger.info('リクエストの待ち受けを開始します。[Port=' + Port + ']')
);

// リクエストボディはJSONなのでパースする
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

// リクエストに対応するコントローラを呼び出す
App.use('/admin-account', AdminAccount);
App.use('/staff-account', StaffAccount);

// ルーティングできない場合は404エラーを発生させる
App.use(function (req, res, next) {
    next(CreateError(404));
});

// エラー処理
App.use(function (err, req, res, next) {
    // 400エラー
    if (err.status === 400) {
        Logger.warn('パラメータが不正です。');
        const response = new Response('InvalidParameters');
        response.sendBy(req, res);
        return;
    }
    // 401エラー
    if (err.status === 401) {
        Logger.warn('認証エラーが発生しました。');
        const response = new Response('AuthenticationFailure');
        response.sendBy(req, res);
        return;
    }
    // 404エラー
    if (err.status === 404) {
        Logger.warn('URLが不正です。');
        const response = new Response('NotFound');
        response.sendBy(req, res);
        return;
    }
    // 5XXエラー
    Logger.warn('処理が異常終了しました。');
    const response = new Response('UnexpectedError');
    response.sendBy(req, res);
    return;
});