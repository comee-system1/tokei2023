<template>
  <div id="keikakuPlan">
    <v-container class="pa-0" style="max-width: 100%">
      <v-row no-gutters>
        <!-- <v-col :style="{ 'max-width': leftWidth }">
          <user-list
            ref="user_list"
            :dispHideBar="false"
            @childLeftArea="changeLeftArea"
            @child-select="setUserSelectPoint"
          >
          </user-list>
        </v-col> -->
        <v-col :style="{ 'max-width': rightWidth }">
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="180"
                height="20"
                class="text-center"
              >
                利用者名
              </v-card>
              <v-card
                elevation="0"
                outlined
                tile
                class="ml-1 pl-1"
                width="140"
                height="20"
              >
                {{ selectName }}
              </v-card>
              <v-card class="justify-end ml-auto d-flex flex-row" elevation="0">
                <v-card elevation="0" tile width="20" class="text-center pt-1">
                  <input type="checkbox" />
                </v-card>
                <v-card
                  outlined
                  tile
                  width="100"
                  class="text-center"
                  :color="'grey lighten-4'"
                  v-if="inputTypemodel == 'tab-0'"
                  >同意署名欄
                </v-card>
                <v-card
                  outlined
                  tile
                  width="100"
                  class="text-center"
                  :color="'grey lighten-4'"
                  v-if="inputTypemodel == 'tab-1'"
                  >完了
                </v-card>

                <v-card class="lightYellow pl-1 ml-1" width="200" outlined tile>
                  2022/04/26 竹下道子
                </v-card>
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="180"
                height="20"
                class="text-center"
                >作成日
              </v-card>
              <v-card
                class="pl-1 ml-1"
                width="140"
                outlined
                tile
                @click="inputCalendarClick(0)"
              >
                {{ getYm }}
                <div class="float-right">
                  <v-icon small>mdi-calendar-month</v-icon>
                </div>
              </v-card>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="160"
                height="20"
                class="text-center ml-1"
                >計画区分
              </v-card>
              <wj-menu
                class="customCombobox ml-1 text-caption"
                :itemsSource="keikakuKubun"
                selectedValuePath="val"
                displayMemberPath="name"
                v-model="keikakuKubunModel"
                :itemClicked="onkeikakuKubun"
              >
              </wj-menu>
              <v-card class="justify-end ml-auto d-flex flex-row" elevation="0">
                <v-card
                  :color="'grey lighten-4'"
                  elevation="0"
                  tile
                  small
                  width="100"
                  height="20"
                  class="text-center ml-1"
                  >作成者
                </v-card>
                <v-card class="lightYellow pl-1 ml-1" width="200" outlined tile>
                  竹下道子
                </v-card>
              </v-card>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="180"
                height="20"
                class="text-center"
              >
                障害者支援区分
              </v-card>
              <v-card class="lightYellow ml-1 pl-1" width="140" outlined tile>
                区分5
              </v-card>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="160"
                height="20"
                class="text-center ml-1"
              >
                モニタリング期間
              </v-card>

              <v-text-field
                class="pa-0 ma-0 ml-1 input-text text-caption"
                hide-details="false"
                outlined
                dense
                tile
                :full-width="true"
                :value="' '"
              >
              </v-text-field>
            </v-card>
          </div>
          <div class="mt-1">
            <v-card class="d-flex flex-row" flat tile>
              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="180"
                height="20"
                class="text-center"
                >障害福祉ｻｰﾋﾞｽ受給者番号
              </v-card>
              <v-card class="lightYellow pl-1 ml-1" width="140" outlined tile>
                1100011120
              </v-card>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="160"
                height="20"
                class="text-center ml-1"
                >地域相談支援受給者番号
              </v-card>
              <v-card class="lightYellow pl-1 ml-1" width="160" outlined tile>
                1100011120
              </v-card>

              <v-card
                :color="'grey lighten-4'"
                elevation="0"
                tile
                small
                width="140"
                height="20"
                class="text-center ml-1"
                >通所受給者証番号
              </v-card>
              <v-card class="lightYellow pl-1 ml-1" width="160" outlined tile>
                1100011120
              </v-card>
            </v-card>
          </div>

          <v-row no-gutters class="mt-1 pb-2">
            <v-col cols="6">
              <v-btn-toggle>
                <v-btn small height="20">新規入力</v-btn>
                <v-btn small height="20">内容更新</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="6" align="right">
              <v-btn-toggle>
                <v-btn small height="20">前回コピー</v-btn>
                <v-btn small height="20">履歴参照</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-card class="d-flex justify-start" flat tile>
            <v-tabs height="25" v-model="inputTypemodel">
              <v-tab
                class="text-caption"
                v-for="value in inputType"
                :key="value.key"
                style="height: 25px"
                :href="'#tab-' + value.key"
              >
                {{ value.value }}</v-tab
              >
            </v-tabs>

            <v-btn-toggle tile v-if="inputTypemodel == 'tab-1'">
              <v-btn small>行追加</v-btn>
              <v-btn small>行削除</v-btn>
            </v-btn-toggle>
          </v-card>

          <v-tabs-items v-model="inputTypemodel">
            <v-tab-item value="tab-0">
              <keikakuPlanIkou></keikakuPlanIkou>
            </v-tab-item>
            <v-tab-item value="tab-1">
              <keikakuPlanKadai></keikakuPlanKadai>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
    <!-- ダイアログエリア -->

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="keikakuIcrnDatepicker"
        v-model="picker"
        locale="jp-ja"
        :day-format="(date) => new Date(date).getDate()"
        @change="monthSelect"
      >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';

// import UserList from './UserList.vue';
import keikakuPlanIkou from './keikakuPlanIkou.vue';
import keikakuPlanKadai from './keikakuPlanKadai.vue';
// import { keikaku } from '@backend/api/Keikaku';
export default {
  props: {
    dispHideBar: Boolean,
    selectedUserObj: Object,
  },
  components: {
    // UserList,
    keikakuPlanIkou,
    keikakuPlanKadai,
  },
  data() {
    return {
      keikakuPlanData: [],
      selectName: '',
      inputTypemodel: 'tab-0', // tab-0:意向・方針 tab-1:課題・支援
      inputType: [
        {
          key: 0,
          value: '意向・方針',
        },
        {
          key: 1,
          value: '課題・支援',
        },
      ],

      leftWidth: '280px',
      rightWidth: '78.5%',
      moveLeft: true,
      datepicker_dialog: false,
      picker: '',
      getYm:
        moment().format('YYYY') +
        '年' +
        moment().format('MM') +
        '月' +
        moment().format('DD') +
        '日',
      keikakuKubun: [
        { id: 0, name: 'サービス等利用計画' },
        { id: 1, name: 'サービス等利用計画2' },
      ],
      keikakuKubunModel: '',
      headerheight: 80,
    };
  },
  created() {},
  mounted() {
    this.setUserdata(this.selectedUserObj);
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },
  beforeDestroy() {
    document.removeEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    // styles() {
    //   // ブラウザの高さ
    //   return {
    //     '--height': window.innerHeight - this.headerheight + 'px',
    //   };
    // },
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('keikakuPlan') != null) {
        document.getElementById('keikakuPlan').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    setUserdata(item) {
      if (item != null) {
        this.selectName = item.names;
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.selectName = row.names;
      // keikaku().then((result) => {
      //   //データ取得
      //   this.keikakuPlanData = result;
      // });
    },

    changeLeftArea() {
      if (this.moveLeft == true) {
        this.moveLeft = false;
        this.leftWidth = '1%';
        this.rightWidth = '99%';
      } else {
        this.moveLeft = true;
        this.leftWidth = '280px';
        this.rightWidth = '78.5%';
      }
    },
    inputCalendarClick() {
      this.picker =
        moment().format('YYYY') +
        '-' +
        moment().format('MM') +
        '-' +
        moment().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = moment(this.picker).format('YYYY年MM月DD日');
      this.viewdatakeikaku = [];
      this.datepicker_dialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

div#keikakuPlan {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  min-width: 1350px !important;
  max-width: 1920px;
  width: auto;
  span#selectUserExamNumber,
  span#selectUserText {
    min-width: 150px;
    display: block;
  }
  div.label {
    background-color: $light-gray;
  }
  .input-text {
    font-size: 12px;
    border-radius: 4px !important;
    div {
      height: 20px;
      min-height: 20px;
    }
  }
  .caption-left {
    background-color: $view_Data_Read_background;
    width: 185px;
    height: 83px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    text-align: center;
  }
  .caption-right {
    width: calc(100% - 193px);
    padding: 4px 0 4px 4px;
    height: 83px;
    line-height: 25px;
    overflow-y: scroll;
    .v-card--link:before {
      background: $white;
    }
    &:hover {
      border: 1px solid $selected_color;
      background-color: $view_Title_background;
    }
  }
  .editarea {
    &:hover {
      border: 1px solid $selected_color;
      background-color: $view_Title_background;
    }
  }
  .lightYellow {
    background-color: $view_Data_Read_background;
  }
  .valign {
    display: table;
    div {
      &:first-child {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
.editTextarea {
  textarea {
    height: 80vh !important;
  }
}

#keikakuIcrnDatepicker {
  position: absolute;
  margin-top: 20px;
  position: fixed !important;
  top: 100px;
  left: 50%;
  width: 300px;
  max-width: 300px;
}
</style>
