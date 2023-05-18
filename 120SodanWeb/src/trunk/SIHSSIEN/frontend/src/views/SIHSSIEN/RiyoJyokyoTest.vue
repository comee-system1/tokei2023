<template>
  <div id="RiyoJyokyo">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters class="pa-1" justify="start">
        <v-card class="d-flex" flat tile>
          <label class="label"> 絞込 </label>

          <select v-model="filterSelect" class="filterSelect">
            <option
              v-for="val in filterSelectOption"
              :key="val.id"
              :value="val.value"
            >
              {{ val.value }}
            </option>
          </select>
          <label class="label ml-10"> ソート </label>
          <select v-model="sortSelect" class="filterSelect">
            <option
              v-for="val in sortSelectOption"
              :key="val.id"
              :value="val.value"
            >
              {{ val.value }}
            </option>
          </select>
          <v-btn class="ml-5 filterClear" @click="filterClear()">
            <v-icon dense>mdi-filter-off</v-icon>
          </v-btn>
        </v-card>
        <v-card class="d-flex ml-auto mr-2" flat tile>
          <v-btn small class="button" @click="basicCalc()"
            >基本報酬算定を反映</v-btn
          >
          <v-btn small class="ml-4 button" @click="planAdvice()"
            >計画相談支援より</v-btn
          >
        </v-card>
      </v-row>
      <v-row no-gutters class="ma-1">
        <v-col class="mr-auto">
          <alphabet-button
            class="mt-1"
            ref="alp"
            @onAlphabetical="onAlphabetical"
          >
          </alphabet-button>
        </v-col>
        <v-col class="text-end mr-3">
          <v-btn-toggle v-model="addItemSelected" mandatory>
            <v-btn
              width="20"
              class="pa-0 ma-0"
              v-for="val in addItem"
              :key="val.id"
              x-small
              >{{ val.text }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <igc-grid
          id="grid1"
          auto-generate="false"
          allow-filtering="false"
          height="100%"
          width="100%"
        >
          <igc-column
            v-for="val in gridClumnsOne"
            :key="val.id"
            :id="val.binding"
            :field="val.binding"
            sortable="false"
            :header="val.header"
            filterable="false"
            :width="val.width"
            :header-width="val.width"
            :header-classes="val.headerClass"
          ></igc-column>
          <igc-column-group movable="true" :header="gridClumnsTwo[0].header">
            <igc-column
              v-for="val in gridClumnsTwo[0].group"
              :key="val.id"
              :id="val.binding"
              :field="val.binding"
              sortable="false"
              :header="val.header"
              filterable="false"
              :width="val.width"
              :header-width="val.width"
              :header-classes="val.headerClass"
            ></igc-column>
          </igc-column-group>
          <igc-column
            v-for="val in gridClumnsThree"
            :key="val.id"
            :id="val.binding"
            :field="val.binding"
            sortable="false"
            :header="val.header"
            filterable="false"
            :width="val.width"
            :header-width="val.width"
            :header-classes="val.headerClass"
            :has-summary="val.summary"
            data-type="number"
          ></igc-column>
          <igc-column-group movable="true" :header="gridClumnsFour[0].header">
            <igc-column-group
              movable="true"
              v-for="value in gridClumnsFour[0].group"
              :key="value.id"
              :header="value.header"
            >
              <igc-column
                v-for="val in value.group"
                :key="val.id"
                :id="val.binding"
                :field="val.binding"
                sortable="false"
                :header="val.header"
                filterable="false"
                :width="val.width"
                :header-width="val.width"
                :header-classes="val.headerClass"
                :has-summary="val.summary"
                data-type="number"
              ></igc-column>
            </igc-column-group>
          </igc-column-group>

          <igc-column-group movable="true" :header="gridClumnsFive[0].header">
            <igc-column
              v-for="val in gridClumnsFive[0].group"
              :key="val.id"
              :id="val.binding"
              :field="val.binding"
              sortable="false"
              :header="val.header"
              filterable="false"
              :width="val.width"
              :header-width="val.width"
              :header-classes="val.headerClass"
              :has-summary="val.summary"
              data-type="number"
            ></igc-column>
          </igc-column-group>
          <igc-column-group movable="true" header="加算項目">
            <igc-column
              v-for="val in gridClumnsKasan"
              :key="val.id"
              :id="val.binding"
              :field="val.binding"
              sortable="false"
              :header="val.header"
              filterable="false"
              :width="val.width"
              :header-width="val.width"
              :header-classes="val.headerClass"
              :has-summary="val.summary"
              data-type="number"
            ></igc-column>
            <igc-column-group
              movable="true"
              :header="gridClumnsKasanNyuin[0].header"
            >
              <igc-column
                v-for="val in gridClumnsKasanNyuin[0].group"
                :key="val.id"
                :id="val.binding"
                :field="val.binding"
                sortable="false"
                :header="val.header"
                filterable="false"
                :width="val.width"
                :header-width="val.width"
                :header-classes="val.headerClass"
                :has-summary="val.summary"
                data-type="number"
              ></igc-column>
            </igc-column-group>
            <igc-column-group
              movable="true"
              :header="gridClumnsKasanKyotaku[0].header"
            >
              <igc-column
                v-for="val in gridClumnsKasanKyotaku[0].group"
                :key="val.id"
                :id="val.binding"
                :field="val.binding"
                sortable="false"
                :header="val.header"
                filterable="false"
                :width="val.width"
                :header-width="val.width"
                :header-classes="val.headerClass"
                :has-summary="val.summary"
                data-type="number"
              ></igc-column>
            </igc-column-group>

            <igc-column
              v-for="val in gridClumnsKasan2"
              :key="val.id"
              :id="val.binding"
              :field="val.binding"
              sortable="false"
              :header="val.header"
              filterable="false"
              :width="val.width"
              :header-width="val.width"
              :header-classes="val.headerClass"
              :has-summary="val.summary"
              data-type="number"
            ></igc-column>

            <igc-column-group
              movable="true"
              :header="gridClumnsKasanSyutyu[0].header"
            >
              <igc-column
                v-for="val in gridClumnsKasanSyutyu[0].group"
                :key="val.id"
                :id="val.binding"
                :field="val.binding"
                sortable="false"
                :header="val.header"
                filterable="false"
                :width="val.width"
                :header-width="val.width"
                :header-classes="val.headerClass"
                :has-summary="val.summary"
                data-type="number"
              ></igc-column>
            </igc-column-group>

            <igc-column
              v-for="val in gridClumnsKasan3"
              :key="val.id"
              :id="val.binding"
              :field="val.binding"
              sortable="false"
              :header="val.header"
              filterable="false"
              :width="val.width"
              :header-width="val.width"
              :header-classes="val.headerClass"
              :has-summary="val.summary"
              data-type="number"
            ></igc-column>
          </igc-column-group>
        </igc-grid>
      </v-row>
      <v-row no-gutters class="mt-1 justify-end ma-3">
        <v-btn small>登録</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '../../connect/getConnect';
import 'igniteui-webcomponents-grids/grids/combined.js';

let num = 1;
export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
  },
  data() {
    return {
      frozenPosition: 9,
      flexGrid: [],
      filtered: [], // フィルターデータ
      serviceViewData: [],
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
      filterSelect: '全員', // 絞込SELECTBOX
      viewData: [], // 表示gridデータ
      viewDataAll: [], // 表示grid全データ
      filterSelectOption: [
        {
          id: 1,
          value: '全員',
        },
      ],
      sortSelect: '契約日順', // ソートSELECTBOX
      sortSelectOption: [
        {
          id: 1,
          value: '契約日順',
        },
      ],
      gridClumnsOne: [
        // gridデータカラム
        {
          id: 1,
          width: 30,
          header: '受給者証切れ',
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
        },
        {
          id: 2,
          width: 100,
          header: '受給者番号',
          binding: 'grid-' + num++,
        },
        {
          id: 3,
          width: 120,
          header: '利用者名',
          binding: 'grid-' + num++,
        },
        {
          id: 4,
          width: 100,
          header: '契約日',
          binding: 'grid-' + num++,
        },
      ],
      gridClumnsTwo: [
        {
          id: 5,
          header: 'ﾓﾆﾀﾘﾝｸﾞ',
          group: [
            {
              width: 50,
              header: '予定月',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
            },
            {
              width: 50,
              header: '終期月',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
            },
          ],
        },
      ],
      gridClumnsThree: [
        {
          id: 6,
          width: 30,
          header: '様式',
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical bLeft bTop',
          summary: true,
        },
        {
          id: 7,
          width: 80,
          header: '計画作成日',
          binding: 'grid-' + num++,
          headerClass: ' bTop bRight',
          summary: true,
        },
        {
          id: 8,
          width: 80,
          header: 'モニタリング\n実施日',
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-lineHeight bTop bRight',
          summary: true,
        },
      ],
      gridClumnsFour: [
        {
          id: 9,
          header: '基本報酬',
          group: [
            {
              id: 1,
              header: '計画',
              group: [
                {
                  id: 1,
                  width: 30,
                  header: 'Ⅰ',
                  binding: 'grid-' + num++,
                  summary: true,
                },
                {
                  id: 2,
                  width: 30,
                  header: 'Ⅱ',
                  binding: 'grid-' + num++,
                  summary: true,
                },
              ],
            },
            {
              id: 2,
              header: 'ﾓﾆﾀﾘﾝｸﾞ',
              group: [
                {
                  id: 1,
                  width: 30,
                  header: 'Ⅰ',
                  binding: 'grid-' + num++,
                  summary: true,
                },
                {
                  id: 2,
                  width: 30,
                  header: 'Ⅱ',
                  binding: 'grid-' + num++,
                  summary: true,
                },
              ],
            },
          ],
        },
      ],
      gridClumnsFive: [
        {
          id: 10,
          header: '居宅重複減',
          group: [
            {
              header: 'Ⅰ',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              width: 30,
              summary: true,
            },
            {
              header: 'Ⅱ',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              width: 30,
              summary: true,
            },
            {
              header: '予防',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              width: 30,
              summary: true,
            },
          ],
        },
      ],
      gridClumnsKasan: [
        {
          id: 11,
          header: '得地加算',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 12,
          header: '初回加算',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 13,
          header: '初回(訪問)',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 14,
          header: '退院・退所',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 15,
          header: '医療・保育',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 16,
          header: '担当者会議',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
      ],
      gridClumnsKasanNyuin: [
        {
          id: 17,
          header: '入院時情',
          group: [
            {
              id: 1,
              width: 30,
              header: 'Ⅰ',
              binding: 'grid-' + num++,
              summary: true,
            },
            {
              id: 2,
              width: 30,
              header: 'Ⅱ',
              binding: 'grid-' + num++,
              summary: true,
            },
          ],
        },
      ],
      gridClumnsKasanKyotaku: [
        {
          id: 18,
          header: '居宅介護',
          group: [
            {
              id: 1,
              width: 30,
              header: 'Ⅰ',
              binding: 'grid-' + num++,
              summary: true,
            },
            {
              id: 2,
              width: 30,
              header: 'Ⅱ',
              binding: 'grid-' + num++,
              summary: true,
            },
          ],
        },
      ],
      gridClumnsKasan2: [
        {
          id: 19,
          header: 'モニタリン',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
      ],
      gridClumnsKasanSyutyu: [
        {
          id: 20,
          header: '集中支援加',
          group: [
            {
              id: 1,
              width: 30,
              header: '訪問',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              summary: true,
            },
            {
              id: 2,
              width: 30,
              header: '会議開',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              summary: true,
            },
            {
              id: 3,
              width: 30,
              header: '会議参',
              binding: 'grid-' + num++,
              headerClass: 'igx-grid-vertical',
              summary: true,
            },
          ],
        },
      ],
      gridClumnsKasan3: [
        {
          id: 21,
          header: '地域生活支',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
        {
          id: 22,
          header: '地域体制強',
          width: 30,
          binding: 'grid-' + num++,
          headerClass: 'igx-grid-vertical',
          summary: true,
        },
      ],
      addItemSelected: 0,
      addItem: [
        { id: 0, text: 'クリア' },
        { id: 1, text: '1' },
        { id: 2, text: '2' },
        { id: 3, text: '3' },
      ],
    };
  },
  computed: {},
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
    this.calculateWindowHeight();
  },

  watch: {},
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('grid1') != null) {
        document.getElementById('grid1').style.height =
          window.innerHeight - 220 + 'px';
      }
    },
    /*******************************
     * ヘッダメニューのサービス初回選択 更新ボタン
     */
    parentServiceSelect(serviceArgument) {
      if (document.getElementById('grid1')) {
        this.teikyoCode = serviceArgument.teikyoCode;
        this.year = serviceArgument['teikyo_year'];
        this.month = serviceArgument['teikyo_month'];
        let m = dayjs(this.year + '-' + this.month + '-01');
        this.lastdate = m.daysInMonth();

        let params = {
          teikyoCode: this.teikyoCode,
          tym: this.year + this.month,
          Getkbn: 1,
          Entpriid: 1,
          Hokbn: 1,
          Svcsyucode: 1,
          Riid: 1,
        };

        var grid1 = document.getElementById('grid1');

        //var grid_7 = document.getElementById('grid1_grid-7');
        this._bind = () => {
          getConnect('/IcrnNyusho', params, 'HENDO').then((result) => {
            console.log(result);
            let viewData = [];
            let riyo_inf = result.riyo_inf;
            riyo_inf.map(function (value) {
              viewData.push({
                'grid-1': value.riid,
                'grid-2': value.jyukyuno,
                'grid-3': value.names,
              });
            });
            let row = riyo_inf.length;

            grid1.data = viewData;
            var grid1_3_2 = document.getElementById('grid1_' + row + '_2');
            let child = document.createElement('div');
            child.prepend('合計件数');
            grid1_3_2.prepend(child);
          });
        };
        this._bind();
      }

      if (serviceArgument['search_button']) {
        // ユーザ選択の無効化
        // this.$refs.user_list_print.userCheckInvalide();
        // this.userDataSelect[0]['riyosyo'] = '';
        // this.riid = '';
        // this.mainGrid.columns.clear();
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
    },
    /*********************
     * フィルターのクリア
     */
    filterClear() {
      this.filtered.clear();
    },
    /**************************
     * アルファベット
     */
    onAlphabetical() {
      this.userFilter();
    },
    userFilter() {},
    /***********************:
     *  基本報酬算定を反映
     */
    basicCalc() {
      alert('基本報酬算定');
    },
    /***********************
     *  計画相談支援
     */
    planAdvice() {
      alert('計画相談支援');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '~igniteui-webcomponents-grids/grids/themes/light/bootstrap.css';
div#RiyoJyokyo {
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
  }
  select {
    &.filterSelect {
      border: 1px solid $light-gray;
      width: 180px;
      -webkit-appearance: auto;
    }
  }

  .filterClear {
    height: 20px;
    min-width: 30px;
  }

  .v-btn {
    &.button {
      height: 21px;
    }
  }
}

igx-grid-header {
  height: 160px;
}
igx-display-container {
  igx-grid-cell {
    min-height: 20px !important;
  }
}

%borderTopBlue {
  border-top: 2px solid $view_Title_background_Main;
}
%borderBottomBlue {
  border-bottom: 2px solid $view_Title_background_Main;
}
%borderLeftBlue {
  border-left: 2px solid $view_Title_background_Main;
}
%borderRightBlue {
  border-right: 2px solid $view_Title_background_Main;
}

#grid1 {
  .bTop {
    @extend %borderTopBlue;
  }
  .bBottom {
    @extend %borderBottomBlue;
  }
  .bLeft {
    @extend %borderLeftBlue;
  }
  .bRight {
    @extend %borderRightBlue;
  }
  .igx-grid__td {
    &:nth-child(7) {
      @extend %borderLeftBlue;
    }
    &:nth-child(8) {
      @extend %borderRightBlue;
    }
    &:nth-child(9) {
      @extend %borderRightBlue;
    }
  }
  .igx-grid__tr {
    &:last-child {
      .igx-grid__td {
        &:nth-child(9),
        &:nth-child(8),
        &:nth-child(7) {
          @extend %borderBottomBlue;
        }
      }
    }
  }
}
.igx-grid-thead__title,
.igx-grid-th {
  align-items: center !important;
  font-weight: normal;
  padding: 0px;
  background-color: $view_Title_background;
}
.igx-grid-vertical {
  height: 100px !important;
  .igx-grid-th__title {
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    align-items: flex-start;
    text-align: left;
    overflow: visible;
  }
}
.igx-grid__td {
  border-inline-end: var(--header-border-width) var(--header-border-style)
    var(--header-border-color);
  padding: 4px;
  &:nth-child(-n + 6) {
    background-color: $view_Hosoku_background;
  }
}
.igx-grid-thead__title {
  height: 30px;
}
.igx-grid-th {
  padding: 2px;
  align-items: center;
  .igx-grid-th__title {
    font-weight: normal;
    text-align: center;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  &.igx-grid-lineHeight {
    .igx-grid-th__title {
      line-height: 1.5;
    }
  }
}

%minTitle {
  .igx-grid-th__title {
    min-width: 5ch;
  }
}
%minWidth {
  min-width: 30px !important;
  flex-basis: 30px !important;
}

@for $i from 13 through 21 {
  #grid1_-1_1_#{$i} {
    @extend %minWidth;
    @extend %minTitle;
  }
}
@for $i from 26 through 26 {
  #grid1_-1_1_#{$i} {
    @extend %minWidth;
    @extend %minTitle;
  }
}
@for $i from 29 through 31 {
  #grid1_-1_1_#{$i} {
    @extend %minWidth;
    @extend %minTitle;
  }
}

#grid1_-1_0_6,
#grid1_-1_0_0 {
  @extend %minWidth;
  @extend %minTitle;
}
.igx-grid-th--number {
  justify-content: space-between;
}
@for $i from 9 through 26 {
  #grid1_-1_2_#{$i} {
    @extend %minWidth;
  }
}
@for $i from 27 through 29 {
  #grid1_-1_2_#{$i} {
    @extend %minWidth;
    @extend %minTitle;
  }
}

span {
  &.igx-grid-th__title {
    text-align: center;
    font-weight: normal;
  }
}

div {
  font-weight: normal;
  &:first-child {
    justify-content: space-around;
  }
}
.igx-grid__td--fw,
.igx-grid-th--fw {
  border-right: 1px solid var(--header-border-color);
}
.igx-grid__tbody-content {
  height: auto !important;
}

.igx-grid__tfoot {
  .igx-grid-summary-cell {
    border: 1px solid red;
  }
  .igx-grid__summaries {
    background-color: $view_Hosoku_background;
  }

  height: 20px !important;
  .igx-grid-summary {
    padding: 0 !important;
    &:last-child {
      border-right: 1px solid var(--header-border-color);
    }
  }
  .igx-grid-summary__item {
    border-left: 1px solid var(--header-border-color);

    height: 20px !important;
    display: block;
    text-align: right;
    padding: 1px;

    &:nth-child(-n + 3) {
      display: none;
    }
    &:nth-child(5) {
      display: none;
    }
  }
  .igx-grid-summary__result {
    font-weight: normal;
  }
  .igx-grid-summary__label {
    display: none;
  }
}
</style>
