<template>
  <div id="headerAndNav">
    <!-- temporary    メニューを常に画面最上部に表示 -->
    <!-- hide-overlay メニュー表示時の背景を少し暗くする -->
    <v-navigation-drawer
      app
      v-model="drawer"
      class="grey lighten-3"
      width="280px"
      temporary
      style="z-index: 11"
    >
      <v-list-item>
        <p class="kenbunroku-logo">
          <img src="../assets/HukushiKenbunrokuLogo_black.png" alt="" />
        </p>
      </v-list-item>
      <v-list dense>
        <template v-for="nav_list in nav_lists">
          <!-- 下に階層を持たないメニューの場合はクリックで遷移 -->
          <v-list-item
            v-if="!nav_list.lists"
            :to="nav_list.link"
            :key="nav_list.name"
            class="nav-list-name"
          >
            <v-list-item-icon>
              <v-icon v-if="nav_list.mdi" v-text="nav_list.src"></v-icon>
              <v-img v-else :src="nav_list.src" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2 pl-2">
                {{ nav_list.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="nav_list.name"
            class="nav-list-name"
            color="#348498"
          >
            <template v-slot:activator>
              <!-- 下に階層を持つメニューの場合はクリックでメニューを展開 -->
              <v-list-item-icon>
                <v-icon v-if="nav_list.mdi" v-text="nav_list.src"></v-icon>
                <v-img v-else :src="nav_list.src" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-2 pl-2">
                  <u>{{ nav_list.name }}</u>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- 下の階層のメニュー -->
            <v-list-item
              v-for="(list, index) in nav_list.lists"
              :key="index"
              :to="list.link"
              class="pa-0 ma-0"
            >
              <v-list-item-content class="pa-2">
                <v-list-item-title v-if="list.link">
                  ・ <u>{{ list.name }}</u>
                </v-list-item-title>
                <v-subheader disabled v-else>({{ list.name }})</v-subheader>

                <v-list-item
                  v-for="(sublist, subindex) in list.sublists"
                  :key="subindex"
                  :to="sublist.link"
                  class="sublists pa-0 ma-0"
                >
                  <v-list-item-content class="pa-2 pl-4">
                    <v-list-item-title>
                      ・<u> {{ sublist.name }}</u></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#187b51" flat dark dense height="30px">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          height="25px"
          width="25"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <!-- <v-toolbar-title>{{ pageTitle }}</v-toolbar-title> -->
      </div>

      <v-card
        class="ml-5 mt-1 d-flex flex-row"
        color="transparent"
        elevation="0"
        height="100%"
      >
        <PankuzuList></PankuzuList>
      </v-card>

      <v-spacer></v-spacer>
      <v-toolbar-title>【{{ jigyoName }}】</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-spacer></v-spacer> -->
      <v-btn-toggle class="flex-wrap" style="min-width: 90px" mandatory>
        <v-btn
          v-for="n in zoomList"
          :key="n.val"
          color="indigo darken-4"
          :min-width="30"
          @click="zoomClicked(n.val)"
        >
          {{ n.name }}
        </v-btn>
      </v-btn-toggle>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="normal"
              dark
              text
              v-bind="attrs"
              v-on="on"
              small
              depressed
              temporary
            >
              <v-icon>mdi-account-circle</v-icon>
              {{ loginName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-icon @click="printExec">mdi-printer</v-icon>
      <v-icon>mdi-file-excel</v-icon>
      <v-icon v-if="isMaximize" @click="maximize">mdi-arrow-collapse</v-icon>
      <v-icon v-if="!isMaximize" @click="maximize">mdi-arrow-expand</v-icon>
    </v-app-bar>

    <v-row id="screen_dialog" v-show="screenFlag">
      <v-col class="text-h2">
        条件が変更されました。<br />更新ボタンを押してください。</v-col
      >
    </v-row>
  </div>
</template>

<script>
import PankuzuList from './PankuzuList';
import sysConst from '@/utiles/const';
export default {
  data() {
    return {
      drawer: true,
      isMaximize: false,
      jigyoName: '社会福祉法人東経会',
      loginName: '大正雅夫',
      pageTitle: this.$route.name,
      zoomList: [
        { val: 0, name: '標準' },
        { val: 1, name: '大' },
        { val: 2, name: '特大' },
      ],
      items: [
        { title: '職員マスタ' },
        { title: 'パスワード変更' },
        { title: 'ログアウト' },
      ],
      nav_lists: [
        {
          name: '共通掲示板',
          link: '/TemporaryPage',
          mdi: true,
          src: 'mdi-clipboard-edit-outline',
        },
        // {
        //   name: '利用者台帳',
        //   mdi: true,
        //   src: 'mdi-account-group-outline',
        //   lists: [
        //     { name: '基本情報', link: '/KihonJyoho' },
        //     { name: 'サービス履歴', link: '/TemporaryPage' },
        //     { name: '受給者証登録', link: '/JyukyuTouroku' },
        //   ],
        // },
        {
          name: '相談支援',
          mdi: true,
          src: 'mdi-chat-outline',
          lists: [
            // { name: '掲示板', link: '/TemporaryPage' },
            // { name: 'スケジュール', link: '/TemporaryPage' },
            // { name: '施設管理', link: '/TemporaryPage' },
            // { name: '利用者情報', link: '/TemporaryPage' },
            { name: '利用者固定情報', link: '/KoteiinfList' },
            {
              name: '受付・対応登録',
              link: '/UketukeSanshoParent/0',
            },
            {
              name: '日報参照',
              link: '/UketukeSanshoParent/1',
            },
            {
              name: '個人履歴参照',
              link: '/KojinRireki/' + sysConst.JIGYO_KBN_NAME.KIHON,
            },
            {
              name: '集計表',
              sublists: [
                {
                  name: '受付対応チェックリスト',
                  link: '/UketukeCheckList',
                },
                {
                  name: '月報参照',
                  link: '/UketukeSanshoParent/2',
                },
                {
                  name: '報告書参照',
                  link: '/SoudanHoukokusyo',
                },
                {
                  name: '報告書用集計条件設定',
                  link: '/SoudanHoukokusyoJyoukenParent',
                },
              ],
            },
            { name: 'マスタ', link: '/MstMenu' },
          ],
        },
        {
          name: '計画相談支援',
          mdi: true,
          src: 'mdi-text-box-edit-outline',
          lists: [
            {
              name: '受付・対応登録',
              link: '/KeikakuUketukeIcrn/' + sysConst.JIGYO_KBN_NAME.KEIKAKU,
            },
            {
              name: '契約報告書',
              link: '/KeiyakuHokoku',
            },
            {
              name: 'アセスメント',
              link: '/AssessmentInput/1',
            },
            {
              name: '計画作成',
              link: '/KeikakuLists',
            },
            {
              name: 'モニタリング',
              link: '/MonitoringParent',
            },
            {
              name: '担当者会議',
              link: '/TantoKaigi/' + sysConst.TANTOKAIGI_KBN_NAME.KEIKAKU,
            },
            {
              name: '個人履歴参照',
              link: '/KeikakuKojinRireki/' + sysConst.JIGYO_KBN_NAME.KEIKAKU,
            },
            {
              name: '担当者別実績表',
              link: '/TantousyaBetuJisseki',
            },
            // {
            //   name: '加算用記録表',
            //   link: '/TemporaryPage',
            // },
            { name: 'マスタ', link: '/MstMenu' },
          ],
        },
        {
          name: '地域相談支援',
          mdi: true,
          src: 'mdi-home-edit-outline',
          lists: [
            {
              name: '受付・対応登録',
              link: '/ChiikiUketukeIcrn/' + sysConst.JIGYO_KBN_NAME.CHIIKI,
            },
            // {
            //   name: '地域移行予定・実績一覧',
            //   link: '/TemporaryPage',
            // },
            {
              name: 'アセスメント',
              link: '/AssessmentInput/2',
            },
            {
              name: '地域移行支援計画作成',
              link: '/ChiikiIkoSienKeikaku',
            },
            {
              name: '担当者会議',
              link: '/TantoKaigi/' + sysConst.TANTOKAIGI_KBN_NAME.CHIIKI,
            },
            {
              name: '地域定着支援台帳',
              link: '/ChiikiteityakuDaicho',
            },
            {
              name: '個人履歴参照',
              link: '/ChiikiKojinRireki/' + sysConst.JIGYO_KBN_NAME.CHIIKI,
            },
            {
              name: 'マスタ',
              sublists: [
                {
                  name: '支援項目マスタ',
                  link: '/TemporaryPage',
                },
                {
                  name: '相談方法マスタ',
                  link: '/TemporaryPage',
                },
                {
                  name: '関係マスタ',
                  link: '/TemporaryPage',
                },
                {
                  name: '委託先マスタ',
                  link: '/TemporaryPage',
                },
                {
                  name: 'アセスメント関連マスタ',
                  link: '/TemporaryPage',
                },
                {
                  name: '地域定着台帳様式設定',
                  link: '/ChiikiteityakuDaichoMst',
                },
              ],
            },
          ],
        },
      ],

      screenFlag: false, // 検索ボタン押下前にデータエリアにスクリーンを行う
      returndata: [], // 検索ボタンを押下時に選択値を渡す変数
    };
  },
  components: {
    PankuzuList,
  },
  created: function () {
    document.addEventListener('fullscreenchange', () => {
      // document.fullscreenElement は、全画面モードにある要素があれば
      // それを指します。要素がなければ、このプロパティの値は null に
      // あります。
      if (!document.fullscreenElement) {
        this.isMaximize = false;
      }
    });
    this.returndata = {
      targetYmd: this.year + this.month + this.date,
    };
    this.$emit('parent-ymd-select', this.returndata);
  },
  watch: {
    // $route(to, from) {
    //   this.pageTitle = this.$route.name;
    //   if (to.fullPath != from.fullPath && to.path == from.path) {
    //     // 同じ画面で違うパラメータの場合のみ再読み込みを行う
    //     location.reload();
    //   }
    // },
  },
  methods: {
    /**************
     * 検索ボタンを押下
     */
    searchButton() {
      this.screenFlag = false;
      this.returndata = {
        targetYmd: this.year + this.month + this.date,
      };

      this.$emit('parent-ymd-select', this.returndata);
    },
    maximize() {
      this.isMaximize = !this.isMaximize;
      if (this.isMaximize) {
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    zoomClicked(val) {
      if (val == 0) {
        document.body.style.zoom = 1.0;
      } else if (val == 1) {
        document.body.style.zoom = 1.25;
      } else {
        document.body.style.zoom = 1.5;
      }
    },
    printExec() {
      // イベントバスを this.$router.app として、イベントをスロー
      this.$router.app.$emit('print_event_global');
      /*
       * 使い方
       * 各画面のmountedで以下を設定(関数名は固定)
       *  this.$router.app.$off('print_event_global'); // 消さないと蓄積される
       *  this.$router.app.$on('print_event_global', this.printExec);
       *  すると印刷ボタンクリックで各画面内のprintExecメソッドが呼ばれる
       */
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#headerAndNav {
  .text-h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    -webkit-text-stroke: 1px #000;
    z-index: 10;
  }
  .nav-list-name {
    border: none;
    // border-top: 1px solid #808080;
  }

  .kenbunroku-logo {
    padding-top: 10px;
    margin: auto;
  }

  .v-toolbar__title {
    font-size: 15px;
  }
  .v-subheader {
    color: $font_color;
    font-size: 14px;
    font-family: 'メイリオ';
    height: 20px;
  }
  // .v-list .v-list-item--active .v-list-item__title {
  //   color: white;
  // }

  .v-list-item {
    padding: 0;
    div.v-list-item__content {
      div {
        padding-left: 21px;
      }
    }
  }
  .service {
    &.v-btn {
      margin-left: 10px;
      border: 1px solid $light-gray;
      background-color: $white;
      color: $font_color;
      border-radius: 30px;
      font-size: 14px;
      font-family: 'メイリオ';
    }
  }
  .v-list-item--active {
    color: #1976d2;
    > .v-list-item__icon {
      // グレーを青色に変更
      filter: invert(8%) sepia(99%) saturate(7044%) hue-rotate(185deg)
        brightness(100%) contrast(145%);
    }
  }
  .v-list-item__icon {
    margin: auto 4px;
  }
  .v-list-item--dense,
  .v-list--dense .v-list-item {
    min-height: 20px;
  }
  .coditionbtn {
    margin-left: 10px;
    border: 1px solid $light-gray;
    background-color: $white;
    color: $font_color;
    border-radius: 30px;
    font-size: 14px;
    font-family: 'メイリオ';
  }
  .v-btn-toggle > .v-btn {
    height: 23px;
    width: 30px;
    font-size: 12px;
  }
}
// div#headerAndNav {
//   .text-h2 {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     -webkit-transform: translate(-50%, -50%);
//     -ms-transform: translate(-50%, -50%);
//     text-align: center;
//     color: #fff;
//     -webkit-text-stroke: 1px #000;
//     z-index: 10;
//   }
//   .nav-list-name {
//     border-top: 1px solid #808080;
//   }

//   .kenbunroku-logo {
//     padding-top: 10px;
//     margin: auto;
//   }

//   .v-toolbar__title {
//     font-size: 15px;
//   }

//   .v-list .v-list-item--active .v-list-item__title {
//     color: white;
//   }

//   .service {
//     &.v-btn {
//       margin-left: 10px;
//       border: 1px solid $light-gray;
//       background-color: $white;
//       color: $font_color;
//       border-radius: 30px;
//       font-size: 14px;
//       font-family: 'メイリオ';
//       // &:nth-child(3) {
//       //   border-left: none;
//       // }
//     }
//   }
//   .coditionbtn {
//     margin-left: 10px;
//     border: 1px solid $light-gray;
//     background-color: $white;
//     color: $font_color;
//     border-radius: 30px;
//     font-size: 14px;
//     font-family: 'メイリオ';
//   }
// }
#screen_dialog {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  width: 100%;
  height: 100%;
  z-index: 4;
  padding: 0;
  margin: 0;
}
#headerAndNavDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 20px;
  left: 100px;
  width: 300px;
}
</style>
