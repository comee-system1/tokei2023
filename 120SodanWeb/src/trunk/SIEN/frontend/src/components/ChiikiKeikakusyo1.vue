<template>
  <div id="chiikiKeikakusyo1" style="width: 100%">
    <v-container class="ml-1 pa-0 pr-2">
      <v-row no-gutters class="rowStyle_Dark my-1">
        <v-col cols="12" class="d-flex pa-1">
          <v-card class="koumokuTitle titleBlueDark mr-1" outlined tile>
            利用者名
          </v-card>
          <v-card
            elevation="0"
            outlined
            tile
            class="ml-1 pl-1 lightYellow"
            width="300"
            height="20"
          >
            {{ userName }}
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="rowStyle my-1">
        <v-card
          class="koumokuTitle titleMain wMin pa-1 mr-1 ml-1"
          outlined
          tile
        >
          入力
        </v-card>
        <v-btn-toggle
          class="flex-wrap mr-1"
          color="light-blue darken-4"
          mandatory
        >
          <v-btn
            v-for="n in inputList"
            :key="n.val"
            elevation="2"
            outlined
            width="25"
            height="19"
            @click="inputClicked(n.val)"
          >
            {{ n.name }}
          </v-btn>
        </v-btn-toggle>
        <v-card class="koumokuTitle titleMain mr-1 ml-1 wMin" outlined tile>
          作成日
        </v-card>

        <v-card
          class="ml-1"
          width="140"
          height="20"
          outlined
          tile
          @click="inputCalendarClick(0)"
        >
          {{ getYm }}
          <div class="float-right">
            <v-icon small>mdi-calendar-month</v-icon>
          </div>
        </v-card>
        <v-card class="koumokuTitle titleOrange ml-1 wMin" outlined tile>
          作成者
        </v-card>
        <v-card class="lightYellow pl-1 ml-1" width="140" elevation="0" tile>
          大正雅夫
        </v-card>
        <v-card class="ml-auto" elevation="0">
          <v-btn
            elevation="2"
            class="mr-1 body-2"
            height="19"
            @click="copyClicked()"
          >
            前回ｺﾋﾟｰ
          </v-btn>
          <v-btn
            elevation="2"
            class="mr-1 body-2"
            height="19"
            v-on:click.stop="drawer = !drawer"
          >
            履歴参照
          </v-btn>
        </v-card>
      </v-row>

      <v-row no-gutters class="mt-1">
        <v-app-bar flat height="24" class="titleBlueDark">
          <v-app-bar-title class="text-caption">利用者の状況</v-app-bar-title>
        </v-app-bar>
        <wj-flex-grid
          id="grdRiyosyaJyokyo"
          :alternatingRowStep="0"
          :headersVisibility="'None'"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :selectionMode="'None'"
          :isReadOnly="true"
          :initialized="onInitializeGrdRiyosyaJyokyo"
          :itemsSource="viewdataRiyosyaJyokyo"
          class="mt-1 mb-0"
        >
          <wj-flex-grid-column
            binding="title1"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value1"
            width="4*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="title2"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value2"
            width="4*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="title3"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value3"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="title4"
            width="2*"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value4"
            width="2*"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <v-row no-gutters class="mt-1">
        <v-app-bar flat height="24" class="titleBlueDark">
          <v-app-bar-title class="text-caption">施設・病院情報</v-app-bar-title>
        </v-app-bar>
        <wj-flex-grid
          id="grdSisetuByoinInfo"
          :alternatingRowStep="0"
          :headersVisibility="'None'"
          :allowAddNew="false"
          :allowDelete="false"
          :allowPinning="false"
          :allowResizing="false"
          :allowSorting="false"
          :allowDragging="false"
          :isReadOnly="false"
          :initialized="onInitializeGrdSisetuByoinInfo"
          :itemsSource="viewdataSisetuByoinInfo"
          class="mt-1 mb-0"
        >
          <wj-flex-grid-column
            binding="title1"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value1"
            width="10*"
            :wordWrap="true"
            :multiLine="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="title2"
            width="2*"
            :isReadOnly="true"
          ></wj-flex-grid-column>
          <wj-flex-grid-column
            binding="value2"
            width="6*"
            :wordWrap="true"
            :multiLine="true"
          ></wj-flex-grid-column>
        </wj-flex-grid>
      </v-row>
      <div class="mt-1">
        <v-app-bar flat height="24" class="titleBlueDark">
          <v-app-bar-title class="text-caption">アセスメント</v-app-bar-title>
        </v-app-bar>
        <v-row no-gutters class="mt-1">
          <wj-flex-grid
            id="grdAssesJyokyo"
            :alternatingRowStep="0"
            :headersVisibility="'Column'"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :allowDragging="false"
            :isReadOnly="false"
            :autoRowHeights="true"
            :selectionMode="'None'"
            :initialized="onInitializeGrdAsses"
            :itemsSource="viewdataAssesJyokyo"
            class="mb-0"
          >
            <wj-flex-grid-column
              binding="jyokyo"
              width="*"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-row>
        <v-row no-gutters class="mt-1">
          <wj-flex-grid
            id="grdAssesKankyo"
            :alternatingRowStep="0"
            :headersVisibility="'Column'"
            :allowAddNew="false"
            :allowDelete="false"
            :allowPinning="false"
            :allowResizing="false"
            :allowSorting="false"
            :allowDragging="false"
            :isReadOnly="false"
            :autoRowHeights="true"
            :selectionMode="'None'"
            :initialized="onInitializeGrdAsses"
            :itemsSource="viewdataAssesKankyo"
            class="mb-0"
          >
            <wj-flex-grid-column
              binding="kankyo"
              width="*"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </v-row>
      </div>
      <v-row no-gutters class="rowStyle my-2">
        <v-btn elevation="2" height="19"> 削除 </v-btn>
        <v-card
          class="koumokuTitle titleOrange pa-1 mr-1 ml-auto"
          outlined
          tile
          width="50"
        >
          完了
        </v-card>
        <input type="checkbox" class="mr-1" />
        <v-card class="koumokuData pa-1 pr-1 mr-1" width="200" outlined tile>
        </v-card>
        <v-btn elevation="2" height="19"> 登録 </v-btn>
      </v-row>
    </v-container>

    <v-dialog
      v-model="datepicker_dialog"
      width="200"
      class="datepicker_dialogs"
    >
      <v-date-picker
        id="chiikiKeikakusyo1Datepicker"
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
import dayjs from 'dayjs';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  components: {},
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
        '--width': window.innerWidth - 280 + 'px',
      };
    },
  },
  data() {
    return {
      leftWidth: '280px',
      rightWidth: '100%',
      userName: '',
      picker: '',
      datepicker_dialog: false,
      getYm:
        dayjs().format('YYYY') +
        '年' +
        dayjs().format('MM') +
        '月' +
        dayjs().format('DD') +
        '日',
      inputList: [
        { val: 0, name: '新規' },
        { val: 1, name: '修正' },
      ],
      headerheight: 100,
      viewdataRiyosyaJyokyo: [
        {
          title1: '氏　名',
          value1: '1',
          title2: '生年月日',
          value2: '2',
          title3: '年　齢',
          value3: '3',
          title4: '性　別',
          value4: '4',
        },
        {
          title1: '住　所',
          value1: '5',
          title3: '電話番号①',
          value3: '6',
        },
        {
          title3: '電話番号②',
          value3: '7',
        },
        {
          title1: 'メールアドレス',
          value1: '8',
          title3: '携帯番号',
          value3: '9',
        },
        {
          title1: '携帯メール',
          value1: '10',
          title3: 'ＦＡＸ番号',
          value3: '11',
        },
      ],
      viewdataSisetuByoinInfo: [
        {
          title1: '施設・病院名',
          value1: '1',
          title2: '担当者名',
          value2: '2',
        },
        {
          title1: '住　所',
          value1:
            '999-9999 宮城県あああああああああああああああああいいいいいいいいいいいい',
          title2: '電話番号',
          value2: '4',
        },
        {
          title2: 'ＦＡＸ番号',
          value2: '5',
        },
      ],
      viewdataAssesJyokyo: [
        {
          jyokyo: 'aaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        },
      ],
      viewdataAssesKankyo: [
        {
          kankyo: 'aaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        },
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('chiikiKeikakusyo1') != null) {
        document.getElementById('chiikiKeikakusyo1').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /****************
     * ユーザー一覧を押下
     */
    setUserSelectPoint(row) {
      this.userName = row.names;
    },
    inputCalendarClick() {
      this.picker =
        dayjs().format('YYYY') +
        '-' +
        dayjs().format('MM') +
        '-' +
        dayjs().format('DD');
      this.datepicker_dialog = true;
    },
    monthSelect() {
      this.getYm = dayjs(this.picker).format('YYYY年MM月DD日');
      this.datepicker_dialog = false;
    },
    onInitializeGrdRiyosyaJyokyo(flexGrid) {
      this.createMergeGrdRiyosyaJyokyo(flexGrid);

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0 || c == 2 || c == 4 || c == 6) {
            cell.style.textAlign = 'center';
            cell.innerHTML =
              '<div class="v-center">' + cell.innerHTML + '</div>';
            cell.style.backgroundColor =
              sysConst.COLOR.gridHeaderBlueBackground;
          } else {
            cell.style.textAlign = 'left';
            cell.style.backgroundColor = sysConst.COLOR.lightYellow;
          }
        }
      };
    },
    createMergeGrdRiyosyaJyokyo(flexGrid) {
      let mergeRanges = [];

      mergeRanges.push(new wjGrid.CellRange(1, 0, 2, 0));
      mergeRanges.push(new wjGrid.CellRange(1, 1, 2, 3));
      mergeRanges.push(new wjGrid.CellRange(1, 5, 1, 7));
      mergeRanges.push(new wjGrid.CellRange(2, 5, 2, 7));
      mergeRanges.push(new wjGrid.CellRange(3, 1, 3, 3));
      mergeRanges.push(new wjGrid.CellRange(3, 5, 3, 7));
      mergeRanges.push(new wjGrid.CellRange(4, 1, 4, 3));
      mergeRanges.push(new wjGrid.CellRange(4, 5, 4, 7));

      flexGrid.mergeManager = this.createMerge(mergeRanges);
    },
    onInitializeGrdSisetuByoinInfo(flexGrid) {
      this.createMergeGrdSisetuByoinInfo(flexGrid);

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          if (c == 0 || c == 2) {
            cell.style.textAlign = 'center';
            cell.innerHTML =
              '<div class="v-center">' + cell.innerHTML + '</div>';
            cell.style.backgroundColor =
              sysConst.COLOR.gridHeaderBlueBackground;
            cell.style.color = sysConst.COLOR.fontColor;
          } else {
            cell.style.textAlign = 'left';
          }
        }
      };
    },
    createMergeGrdSisetuByoinInfo(flexGrid) {
      let mergeRanges = [];

      mergeRanges.push(new wjGrid.CellRange(1, 0, 2, 0));
      mergeRanges.push(new wjGrid.CellRange(1, 1, 2, 1));

      flexGrid.mergeManager = this.createMerge(mergeRanges);
    },
    onInitializeGrdAsses(flexGrid) {
      let headerpanel = flexGrid.columnHeaders;
      if (flexGrid.hostElement.id == 'grdAssesJyokyo') {
        headerpanel.setCellData(0, 0, '1.利用者の心身の状況');
      } else if (flexGrid.hostElement.id == 'grdAssesKankyo') {
        headerpanel.setCellData(0, 0, '2.利用者の置かれている環境');
      }

      flexGrid.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          cell.style.textAlign = 'left';
          cell.style.color = sysConst.COLOR.viewTitleFontColorBlue;
          cell.style.backgroundColor = sysConst.COLOR.gridHeaderBlueBackground;
        } else if (panel.cellType == wjGrid.CellType.Cell) {
          cell.style.textAlign = 'left';
          cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
      };
    },
    createMerge(mergeRanges) {
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < mergeRanges.length; h++) {
            if (mergeRanges[h].contains(r, c)) {
              return mergeRanges[h];
            }
          }
        }
      };
      return mm;
    },
    inputClicked(kbn) {
      //dummy code
      let a = [kbn];
      a.length = 1;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#chiikiKeikakusyo1 {
  color: $font_color;
  font-size: 12px;
  font-family: 'メイリオ';
  height: 100% !important;

  .wj-cell .v-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    white-space: pre-wrap;
  }

  .v-app-bar-title__content {
    width: 100%;
  }
  .lightYellow {
    background-color: $light_yellow;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    font-size: 12px;
    th {
      background-color: $view_Title_background_Blue;
      text-align: center;
      padding: 4px;
      font-weight: normal;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 80px;
    }
    td {
      background-color: $grid_background;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 4px;
      width: 160px;
      &.wide {
        width: 400px;
      }
      &.editable {
        background-color: $white;
      }
    }
  }
}
.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense)
  textarea {
  margin-top: 4px;
}

#chiikiKeikakusyo1Datepicker {
  position: absolute;
  margin-top: 20px;
  top: 100px;
  left: 260px;
  width: 300px;
  max-width: 300px;
}
</style>
