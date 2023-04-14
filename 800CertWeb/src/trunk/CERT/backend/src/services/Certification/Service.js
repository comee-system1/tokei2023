// @ts-check
const IntrospectRepository = require('../../repositories/Introspect');

/**
 * トークンイントロスペクションを実行する
 * @param {object} req Expressのリクエストオブジェクト
 * @returns 実行結果（認証成功:true / 認証失敗:false）
 */
exports.introspect = async function (req) {
    try {
        return await new IntrospectRepository(req).execute().then(result => {
            return result;
        });
    } catch (err) {
        throw err;
    }
}