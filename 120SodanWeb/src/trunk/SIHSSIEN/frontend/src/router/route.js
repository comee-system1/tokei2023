import Vue from 'vue'
import VueRouter from 'vue-router'
import KaigoKyufuMeisaisyo from '../views/SIHSSIEN/KaigoKyufuMeisaisyo.vue'
import RiyoJyokyo from '../views/SIHSSIEN/RiyoJyokyo.vue'
import RiyoJyokyoTest from '../views/SIHSSIEN/RiyoJyokyoTest.vue'
import RiyoJyokyoTest2 from '../views/SIHSSIEN/RiyoJyokyoTest2.vue'
import KihonHoshu from '../views/SIHSSIEN/KihonHoshu.vue'
import SeikyushoLists from '../views/SIHSSIEN/SeikyushoLists.vue'
import JyuryouTsuchisyoList from '../views/SIHSSIEN/JyuryouTsuchisyoList.vue'
import ShisetsuTaisei from '../views/SIHSSIEN/ShisetsuTaisei.vue'
import JyukyuIcrn from '../views/SIHSSIEN/JyukyuIcrn.vue'
import KyuhuMeisaiIcrn from '../views/SIHSSIEN/KyuhuMeisaiIcrn.vue'
import JissekiKiroku from '../views/SIHSSIEN/JissekiKiroku.vue'
import ReceptSyukei from '../views/SIHSSIEN/ReceptSyukei.vue'
import KasanKomoku from '../views/SIHSSIEN/KasanKomoku.vue'

Vue.use(VueRouter)

const Title = "計画相談レセプト請求";
const TitleRiyojyokyo = "利用状況一覧";
const TitleKihonHoshu = "基本報酬件数算定";
const TitleSeikyushoLists = "請求書";
const TitleJyuryouTsuchisyoList = "受領通知書";
const TitleSisetuTaisei = "施設体制";
const TitleJyukyuIcrn = "利用者受給者証一覧";
const TitleKyuhuMeisaiIcrn = "給付明細書＞介護給付費明細一覧";
const TitleKyuhuMeisaisyo = "給付明細書＞介護給付費明細書";
const TitleJissekiKiroku = "実績記録表";
const TitleReceptSyukei = "レセプト集計";
const TitleKasanKomoku = "加算項目一覧";

const routes = [{
        path: '/JyukyuIcrn/:uniqid',
        name: TitleJyukyuIcrn,
        component: JyukyuIcrn,
        meta: {
            title: Title,
        },
    },
    {
        path: '/ShisetsuTaisei/:uniqid',
        name: TitleSisetuTaisei,
        component: ShisetsuTaisei,
        meta: {
            title: Title,
        },
    },
    {
        path: '/KaigoKyufuMeisaisyo/:uniqid',
        name: TitleKyuhuMeisaisyo,
        component: KaigoKyufuMeisaisyo,
        meta: {
            title: Title,
        },
    },
    {
        path: '/KyuhuMeisaiIcrn/:uniqid',
        name: TitleKyuhuMeisaiIcrn,
        component: KyuhuMeisaiIcrn,
        meta: {
            title: Title,
        },
    },
    {
        path: '/RiyoJyokyo/:uniqid',
        name: TitleRiyojyokyo,
        component: RiyoJyokyo,
        meta: {
            title: Title,
        },
    },
    {
        path: '/RiyoJyokyoTest/:uniqid',
        name: TitleRiyojyokyo,
        component: RiyoJyokyoTest,
        meta: {
            title: Title,
        },
    },
    {
        path: '/RiyoJyokyoTest2/:uniqid',
        name: TitleRiyojyokyo,
        component: RiyoJyokyoTest2,
        meta: {
            title: Title,
        },
    },
    {
        path: '/KihonHoshu/:uniqid',
        name: TitleKihonHoshu,
        component: KihonHoshu,
        meta: {
            title: Title,
        },
    },
    {
        path: '/SeikyushoLists/:uniqid',
        name: TitleSeikyushoLists,
        component: SeikyushoLists,
        meta: {
            title: Title,
        },
    },
    {
        path: '/JyuryouTsuchisyoList/:uniqid',
        name: TitleJyuryouTsuchisyoList,
        component: JyuryouTsuchisyoList,
        meta: {
            title: Title,
        },
    },
    {
        path: '/JissekiKiroku/:uniqid',
        name: TitleJissekiKiroku,
        component: JissekiKiroku,
        meta: {
            title: Title,
        },
    },
    {
        path: '/ReceptSyukei/:uniqid',
        name: TitleReceptSyukei,
        component: ReceptSyukei,
        meta: {
            title: Title,
        },
    },
    {
        path: '/KasanKomoku/:uniqid',
        name: TitleKasanKomoku,
        component: KasanKomoku,
        meta: {
            title: Title,
        },
    },

    // {
    //     path: '/SIENT/UketukeTourokuParent/:uniqid',
    //     name: '受付・対応登録',
    //     component: SienTUketukeTourokuParent,
    //     meta: {
    //         title: TitleSoudansien,
    //     },
    // },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router