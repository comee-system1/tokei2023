<template>
  <div id="ReceptSyukei">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters class="ma-2">
        <v-btn class="button" :class="{ active: active[0] }" @click="onClick(0)"
          >レセプト集計</v-btn
        >
        <v-btn
          class="button ml-2"
          :class="{ active: active[1] }"
          @click="onClick(1)"
          >自上限管理事業所入力</v-btn
        >
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters class="pa-1 mt-1 filterRow" justify="start">
        <v-card class="d-flex" flat tile>
          <label class="label"> 絞込 </label>
          <select
            v-model="filterSelect"
            class="filterSelect"
            @change="onFilterSelect()"
          >
            <option
              v-for="val in filterSelectOption"
              :key="val.id"
              :value="val.id"
            >
              {{ val.value }}
            </option>
          </select>
          <label class="label ml-10"> ソート </label>
          <select
            v-model="sortSelect"
            class="filterSelect"
            @change="onSortSelect()"
          >
            <option
              v-for="val in sortSelectOption"
              :key="val.id"
              :value="val.id"
            >
              {{ val.value }}
            </option>
          </select>
          <v-btn class="ml-5 filterClear" @click="filterClear()">
            <v-icon dense>mdi-filter-off</v-icon>
          </v-btn>
        </v-card>
        <v-card class="ml-16">
          <v-btn class="button" v-if="choiceType == 0">レセプト集計開始</v-btn>
          <v-btn class="button" v-if="choiceType == 1">上限管理計算</v-btn>
        </v-card>
      </v-row>
      <v-row no-gutters class="ma-1 filterRow">
        <v-col>
          <alphabet-button
            class="mt-1"
            ref="alp"
            @onAlphabetical="onAlphabetical"
          >
          </alphabet-button>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-card
            elevation="0"
            v-for="value in choices[choiceType]"
            :key="value.id"
          >
            <label class="label gray min ml-2"> {{ value.value }} </label>
            <select
              v-model="selected"
              class="filterSelect"
              @change="onSelected(value.id)"
            >
              <option v-for="val in selects" :key="val.id" :value="val.id">
                {{ val.value }}
              </option>
            </select>
            <!--
            <label class="label gray min"> 選択 </label>
            <v-btn-toggle v-model="choiced" class="ml-2" mandatory>
              <v-btn
                class="button"
                rounded
                v-for="value in choices[choiceType]"
                :key="value.id"
                >{{ value.value }}</v-btn
              >
            </v-btn-toggle>
            <select
              v-model="selected"
              class="filterSelect ml-2"
              @change="onSelected"
            >
              <option v-for="val in selects" :key="val.id" :value="val.id">
                {{ val.value }}
              </option>
            </select>
            -->
          </v-card>
        </v-col>
      </v-row>
      <ReceptSyukeiList
        v-if="active[0]"
        ref="ReceptSyukeiList"
      ></ReceptSyukeiList>
      <ReceptJigyo v-if="active[1]" ref="ReceptJigyo"></ReceptJigyo>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
//import * as wijmo from '@grapecity/wijmo';
import ReceptSyukeiList from './ReceptSyukeiList.vue';
import ReceptJigyo from './ReceptJigyo.vue';
export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
    ReceptSyukeiList,
    ReceptJigyo,
  },
  computed: {},
  mounted() {
    this.userFilter();
  },
  data() {
    return {
      headerheight: 260,
      active: [true, false],
      frozenPosition: 9,
      flexGrid: [],
      filtered: [], // フィルターデータ
      serviceViewData: [],
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
      filterSelect: 1, // 絞込SELECTBOX
      alpha: 0,
      filterSelectOption: [
        {
          id: 1,
          value: '全員',
        },
        {
          id: 2,
          value: '東経市',
        },
        {
          id: 3,
          value: '西経市',
        },
      ],
      sortSelect: 1, // ソートSELECTBOX
      sortSelectOption: [
        {
          id: 1,
          value: '指定無し',
        },
        {
          id: 2,
          value: '受給者番号順',
        },
      ],
      selected: 1,
      selects: [
        {
          id: 1,
          value: '全選択/全解除',
        },
        {
          id: 2,
          value: '全選択',
        },
        {
          id: 3,
          value: '全解除',
        },
      ],
      choiced: 0,
      choiceType: 0,
      choices: [
        [
          {
            id: 1,
            value: '集計',
          },
          {
            id: 2,
            value: '確定',
          },
        ],
        [
          {
            id: 1,
            value: '印刷',
          },
          {
            id: 2,
            value: '確定',
          },
        ],
      ],
    };
  },
  watch: {},
  methods: {
    /*******************************
     * ヘッダメニューのサービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      this.teikyoCode = serviceArgument.teikyoCode;
      this.year = serviceArgument['teikyo_year'];
      this.month = serviceArgument['teikyo_month'];
      let m = dayjs(this.year + '-' + this.month + '-01');
      this.lastdate = m.daysInMonth();

      if (serviceArgument['search_button']) {
        // ユーザ選択の無効化
        this.$refs.user_list_print.userCheckInvalide();
        this.userDataSelect[0]['riyosyo'] = '';
        this.riid = '';
        this.mainGrid.columns.clear();
      }
    },

    /*********************
     * フィルターのクリア
     */
    filterClear() {
      if (this.active[0]) {
        this.$refs.ReceptSyukeiList.filterClear();
      }
      if (this.active[1]) {
        this.$refs.ReceptJigyo.filterClear();
      }
    },
    /**************************
     * アルファベット
     */
    onAlphabetical(alpha) {
      this.alpha = alpha;
      this.userFilter();
    },
    /******************
     * 絞り込み
     */
    onFilterSelect() {
      this.userFilter();
    },
    onSortSelect() {
      this.userFilter();
    },
    userFilter() {
      let temp = [];
      if (this.active[0]) {
        temp = this.$refs.ReceptSyukeiList.getDataAll();
      }
      if (this.active[1]) {
        temp = this.$refs.ReceptJigyo.getDataAll();
      }

      let viewData = this.$refs.alp.alphabetFilter(temp, 'kana');
      let _self = this;
      // 絞り込みフィルタリング
      let s = this.filterSelectOption.find(function (item) {
        return item.id == _self.filterSelect;
      });
      if (s.id > 1) {
        let temp = [...viewData];
        let tmp = [];
        temp.map(function (value) {
          if (value.city == s.value) {
            tmp.push(value);
          }
        });
        viewData = [...tmp];
      }

      // 並び替え
      if (this.sortSelect == 2) {
        viewData.sort(this.byByukyuBangoDESC);
      }

      if (this.active[0]) {
        this.$refs.ReceptSyukeiList.userFilter(viewData);
      }
      if (this.active[1]) {
        this.$refs.ReceptJigyo.userFilter(viewData);
      }
    },
    byByukyuBangoDESC(a, b) {
      let code = '';
      if (this.sortSelect) {
        code = 'jyukyuBango';
      }

      if (a[code] == b[code]) {
        return 0;
      }
      if (a[code] > b[code]) {
        return -1;
      }
      if (a[code] < b[code]) {
        return 1;
      }
    },
    onClick(type) {
      this.active = [];
      this.active[type] = true;
      this.choiceType = type;
    },
    // 全選択/全解除
    // 1:集計 2:確定
    onSelected(k) {
      let flag = '';
      // on/offを渡す
      if (this.selected == 2) {
        flag = true;
      }
      if (this.selected == 3) {
        flag = false;
      }

      // レセプト集計
      if (this.active[0]) {
        this.$refs.ReceptSyukeiList.editReceptSyukei(flag, k);
      }
      // 自上限管理
      if (this.active[1]) {
        this.$refs.ReceptJigyo.editReceptSyukei(flag, k);
      }

      this.selected = 1;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#ReceptSyukei {
  color: $font_color;
  font-size: 12px;
  min-width: 1300px !important;
  width: 100%;
  .label {
    background-color: $view_Title_background_Main;
    color: $white;
    width: 60px;
    text-align: center;
    height: 21px;
    line-height: 21px;
    border-radius: 0px;
    &.gray {
      background-color: $view_Title_background_Gray;
    }
    &.min {
      width: 60px !important;
      display: inline-block;
    }
    &.htMin {
      height: 21px !important;
      line-height: 21px;
    }
  }
  select {
    &.filterSelect {
      border: 1px solid $light-gray;
      width: 100px;
      -webkit-appearance: auto;
      border-radius: 3px;
    }
  }

  .filterClear {
    height: 20px;
    min-width: 30px;
  }

  .v-btn {
    &.button {
      height: 21px;
      &.active {
        background-color: $view_Hosoku_background;
        border: 1px solid $gray;
        color: $view_Title_background_Main;
      }
    }
    &.v-item {
      &--active {
        span {
          color: $view_Title_background_Main;
        }
      }
    }
  }
  .filterRow {
    &:first-child {
      width: 980px;
    }
    &:nth-child(2) {
      width: 1280px;
    }
  }
  #flexViewGrid {
  }
}
</style>
