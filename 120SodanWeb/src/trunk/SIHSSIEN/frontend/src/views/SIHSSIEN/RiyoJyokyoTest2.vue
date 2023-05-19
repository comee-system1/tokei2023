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
        <grid-table
          :viewGridData="viewGridData"
          :colMergeHeaders="colMergeHeaders"
          :colHeaders="colHeaders"
          :colLists="colLists"
          :headerHeight=160
        ></grid-table>
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
import HeaderServices from '@/components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import { getConnect } from '../../connect/getConnect';

import  GridTable  from '@/components/GridTable.vue';
export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
    GridTable
  },
  data() {
    return {
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

      addItemSelected: 0,
      addItem: [
        { id: 0, text: 'クリア' },
        { id: 1, text: '1' },
        { id: 2, text: '2' },
        { id: 3, text: '3' },
      ],

      colHeaders: [
        {title:'受給者証切れ',class:"verticalText"},
        {title:'受給者番号'},
        {title:'利用者名'},
        {title:'契約日'},
        {title:'予定月',class:"verticalText widthMiddle"},
        {title:'終期月',class:"verticalText widthMiddle"},
        {title:'様式',class:"verticalText"},
        {title:'計画作成日'},
        {title:'モニタリング\n実施日',class:"wordBreak"},
        {title:'Ⅰ'},
        {title:'Ⅱ'},
        {title:'Ⅰ'},
        {title:'Ⅱ'},
        {title:'Ⅰ'},
        {title:'Ⅱ'},
        {title:'予防',class:"verticalText"},
        ],
      colMergeHeaders:[
        {
          startPos:4,
          endPos:5,
          text:'ﾓﾆﾀﾘﾝｸﾞ'
        },
        {
          startPos:9,
          endPos:12,
          text:'基本報酬',
          sub:[
            {
              startPos:9,
              endPos:10,
              text:'計画'
            },
            {
              startPos:11,
              endPos:12,
              text:'ﾓﾆﾀﾘﾝｸﾞ'
            }
          ]
        },
        {
          startPos:13,
          endPos:15,
          text:'居宅重複減'
        },
      ],
        colLists:[
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 100 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 100 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 100 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 40 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 40 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 100 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 100 },
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},
        { readOnly: true, type: 'text', className: 'yellowBack' ,width: 30},



        ],
      viewGridData: [
        ['', "f",false, 'S0001','aaa','aaa','社','','','1','2','3','4','11','12','13'],
        ['', "a",false, 'S0002','fff','fff','','','','1','2','3','4','11','12','13'],
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

