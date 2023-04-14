// @ts-check
const { check } = require('express-validator');

module.exports.post = [
    check('pKanriacnt_user').exists({checkNull: true}).isString().not().isEmpty(),
    check('pKanriacnt_email').exists({checkNull: true}).isString().not().isEmpty(),
    check('pKanriacnt_regist_user').exists({checkNull: true}).not().isEmpty(),
    check('pKanriacnt_regist_email').exists({checkNull: true}).not().isEmpty()
];

module.exports.put = [
    check('pKanriacnt_user').exists({checkNull: true}).isString().not().isEmpty(),
    check('pKanriacnt_email').exists({checkNull: true}).isString().not().isEmpty(),
    check('pPreKanriacnt_email').exists({checkNull: true}).isString().not().isEmpty()
];

module.exports.delete = [
    check('pKanriacnt_user').exists({checkNull: true}).isString().not().isEmpty(),
    check('pKanriacnt_email').exists({checkNull: true}).isString().not().isEmpty(),
    check('pKanriacnt_regist_user').exists({checkNull: true}).not().isEmpty(),
    check('pKanriacnt_regist_email').exists({checkNull: true}).not().isEmpty()
];
