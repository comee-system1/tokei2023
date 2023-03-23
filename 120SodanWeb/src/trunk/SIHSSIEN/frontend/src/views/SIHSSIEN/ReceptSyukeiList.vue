<template>
  <v-container no-gutters fluid class="pa-0">
    <v-row no-gutters class="pl-1 pr-1">
      <wj-flex-grid
        id="flexViewGridRecept"
        :autoSearch="true"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="viewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :showMarquee="false"
        :allowMerging="'AllHeaders'"
        :formatItem="onFormatItem"
      >
        <wj-flex-grid-filter
          :initialized="filterInitialized"
          :showFilterIcons="false"
        ></wj-flex-grid-filter>
        <wj-flex-grid-column
          v-for="val in gridClumns"
          :key="val.id"
          :binding="val.binding"
          :header="val.text"
          :width="val.width"
          :word-wrap="true"
          :allowResizing="true"
          :isReadOnly="true"
          multiLine="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-row>
    <v-row no-gutters class="mt-1 justify-end ma-3 d-flex">
      <label class="label gray htMin">確定</label>
      <v-btn small class="ml-1 button">一括解除</v-btn>
      <v-btn small class="ml-1 button">登録</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import '@grapecity/wijmo.cultures/wijmo.culture.ja';

import * as wijmo from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.vue2.grid.filter';
import sysConst from '@/utiles/const';

// 〇アイコン
const ICONS = {
  MARU: '〇',
  NONE: '',
};
// グリッドの列番号の指定
const COLS = {
  ERROR: 0,
  CITY: 1,
  BASIC: 1,
  JYUKYUBANGO: 2,
  RIYOSYAMEI: 3,
  JYOGENGAKU_OTHER: 4,
  JYOGENGAKU: 5,
  RIYOSYAFUTAN: 6,
  RECEPTSYUKEI: 7,
  SYUKEIBI: 8,
  TANTO: 9,
  JYOGENKANRI: 10,
  RECEPTKAKUTEI: 11,
};
// グリッドの行番号の指定
const ROWS = {
  ZERO: 0,
  FIRST: 1,
  SECOND: 2,
};
// レセプト確定
// 1が来たら確定としています
const RECEPTKAKUTEI = {
  COMPLETE: 1,
};
export default {
  props: {},
  components: {},
  computed: {},
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  data() {
    return {
      headerheight: 260,
      viewData: [], // 表示gridデータ
      viewDataAll: [], // 表示grid全データ
      filtered: [], // フィルターデータ
      flexGrid: [],
      alpha: 0,
      gridClumns: [
        {
          id: 1,
          binding: 'error',
          width: 30,
        },
        {
          id: 2,
          binding: 'city',
          text: '市町村名',
          width: 100,
        },
        {
          id: 3,
          binding: 'jyukyuBango',
          text: '受給者番号',
          width: 160,
        },
        {
          id: 4,
          binding: 'riyosyaMei',
          text: '利用者名',
          width: 180,
        },
        {
          id: 5,
          binding: 'icon',
          width: 30,
        },
        {
          id: 6,
          binding: 'jyogengaku',
          width: 220,
        },
        {
          id: 7,
          binding: 'riyosyafutan',
          text: '利用者負担\n上限金額',
          width: 100,
        },
        {
          id: 8,
          binding: 'receptSyukei',
          width: 30,
        },
        {
          id: 9,
          binding: 'syukeibi',
          text: '集計日',
          width: 160,
        },
        {
          id: 10,
          binding: 'tantosya',
          text: '担当者',
          width: 100,
        },
        {
          id: 11,
          binding: 'jyogengakuKanrizumi',
          width: 30,
        },
        {
          id: 12,
          binding: 'receptKakutei',
          width: 30,
        },
      ],
    };
  },
  watch: {},
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('flexViewGridRecept') != null) {
        document.getElementById('flexViewGridRecept').style.height =
          window.innerHeight - this.headerheight + 'px';
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
    /*****************
     * 親から実行
     * データの取得
     */
    getDataAll() {
      return this.viewDataAll;
    },

    /****************
     * 親からの実行
     * 表示データの受け取り
     */
    userFilter(viewData = []) {
      this.viewData = new wijmo.CollectionView(viewData);
    },

    /************************
     * データ表示
     */
    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.createHeader(flexGrid);
      let viewData = [];
      viewData.push({
        error: '',
        city: '東経市',
        kana: 'ﾄｹｲｼ',
        jyukyuBango: '11000012391',
        riyosyaMei: '東経 春美',
        icon: '他',
        jyogengaku: '南山事務所',
        riyosyafutan: 9300,
        receptSyukei: '',
        syukeibi: '',
        tantosya: '',
        jyogengakuKanrizumi: '',
        receptKakutei: '',
      });
      viewData.push({
        error: '',
        city: '西経市',
        kana: 'ﾆｼｹｲｼ',
        jyukyuBango: '11000012392',
        riyosyaMei: '東経 サブロウ',
        icon: '他',
        jyogengaku: '南山事務所',
        riyosyafutan: 9300,
        receptSyukei: '〇',
        syukeibi: '',
        tantosya: '',
        jyogengakuKanrizumi: '',
        receptKakutei: '',
      });

      this.viewDataAll = viewData;
      this.viewData = new wijmo.CollectionView(viewData);

      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
      // グリッドを押下
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        let ht = flexGrid.hitTest(e);
        if (ht.cellType == wjGrid.CellType.Cell) {
          if (ht.col == COLS.RECEPTSYUKEI) {
            _self.viewData.items[ht.row].receptSyukei =
              _self.viewData.items[ht.row].receptSyukei == ICONS.NONE
                ? ICONS.MARU
                : ICONS.NONE;
          }
          if (ht.col == COLS.RECEPTKAKUTEI) {
            _self.viewData.items[ht.row].receptKakutei = _self.viewData.items[
              ht.row
            ].receptKakutei
              ? ''
              : RECEPTKAKUTEI.COMPLETE;
          }
        }
        flexGrid.refresh();
      });
    },
    /***********************
     * 親から実行
     * レセプト集計のチェック
     * type : 2:全選択 3:全解除
     * choice : 1:レセプト集計 2:レセプト確定
     */
    editReceptSyukei(flag, choice) {
      let _self = this;
      this.viewData.items.map(function (val, k) {
        if (choice == 1) {
          _self.viewData.items[k].receptSyukei = flag ? ICONS.MARU : ICONS.NONE;
        }
        if (choice == 2) {
          _self.viewData.items[k].receptKakutei = flag
            ? RECEPTKAKUTEI.COMPLETE
            : '';
        }
      });
      this.flexGrid.refresh();
    },

    /**************
     * ヘッダ情報の作成
     */
    createHeader(flexGrid) {
      flexGrid.columnHeaders.rows.insert(1, new wjGrid.Row());
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[0].height = 24;
      flexGrid.columnHeaders.rows[1].height = 100;
      flexGrid.alternatingRowStep = 0;

      flexGrid.columnHeaders.setCellData(ROWS.ZERO, COLS.ERROR, 'エラー');
      flexGrid.columnHeaders.setCellData(ROWS.ZERO, COLS.BASIC, '基本情報');
      flexGrid.columnHeaders.setCellData(
        ROWS.FIRST,
        COLS.JYOGENGAKU_OTHER,
        '上限額\n管理事務所'
      );
      flexGrid.columnHeaders.setCellData(
        ROWS.ZERO,
        COLS.RECEPTSYUKEI,
        'レセプト集計'
      );
      flexGrid.columnHeaders.setCellData(ROWS.ZERO, COLS.SYUKEIBI, '集計済');
      flexGrid.columnHeaders.setCellData(
        ROWS.ZERO,
        COLS.JYOGENKANRI,
        '上限額管理済'
      );
      flexGrid.columnHeaders.setCellData(
        ROWS.ZERO,
        COLS.RECEPTKAKUTEI,
        'レセプト確定'
      );

      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 0));
      headerRanges.push(new wjGrid.CellRange(0, 1, 0, 6));
      headerRanges.push(new wjGrid.CellRange(1, 4, 1, 5));
      headerRanges.push(new wjGrid.CellRange(0, 7, 1, 7));
      headerRanges.push(new wjGrid.CellRange(0, 8, 0, 9));
      headerRanges.push(new wjGrid.CellRange(0, 10, 1, 10));
      headerRanges.push(new wjGrid.CellRange(0, 11, 1, 11));
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
      };
      flexGrid.mergeManager = mm;
    },

    /************************
     * データ表示
     */
    onItemsSourceChanged() {},
    /************************
     * 表示フォーマット
     */
    onFormatItem(flexGrid, e) {
      let tmpitem = e.panel.rows[e.row].dataItem;
      if (e.panel == flexGrid.columnHeaders) {
        if (e.col == COLS.ERROR) {
          e.cell.style.writingMode = 'vertical-rl';
        }
        if (e.row == ROWS.FIRST) {
          e.cell.style.display = 'flex';
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
        }
        if (e.col <= COLS.RIYOSYAFUTAN) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrangeDark;
        }
        if (e.col == COLS.RECEPTKAKUTEI) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrange;
          e.cell.style.color = sysConst.COLOR.viewTitleFontColorOrange;
        }
      }
      if (e.panel == flexGrid.cells) {
        if (e.col <= COLS.RIYOSYAFUTAN) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (e.col == COLS.SYUKEIBI) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (e.col == COLS.TANTO) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (e.col == COLS.JYOGENKANRI) {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        if (
          e.col == COLS.RECEPTKAKUTEI &&
          tmpitem.receptKakutei == RECEPTKAKUTEI.COMPLETE
        ) {
          wijmo.addClass(e.cell, 'kakutei');
        }
        if (e.col == COLS.CITY) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col == COLS.RIYOSYAMEI) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col == COLS.JYOGENGAKU) {
          e.cell.style.textAlign = 'left';
        }
        if (e.col == COLS.RIYOSYAFUTAN) {
          e.cell.style.textAlign = 'right';
        }
      }
      // 青枠の追加
      if (e.col == COLS.RECEPTSYUKEI || e.col == COLS.RECEPTKAKUTEI) {
        wijmo.addClass(e.cell, 'blueLine');
        if (e.panel == flexGrid.columnHeaders) {
          wijmo.addClass(e.cell, 'blueLine-header');
        }
        if (
          e.panel == flexGrid.cells &&
          e.row == this.viewData._view.length - 1
        ) {
          wijmo.addClass(e.cell, 'blueLine-bottom');
        }
      }
      // フィルターカラムの非表示設定
      if (e.col > COLS.RIYOSYAFUTAN) {
        var Nonefilter = this.filtered.getColumnFilter(e.col);
        Nonefilter.filterType = 'None';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
#flexViewGridRecept {
  .blueLine {
    border-left: 2px solid $view_Title_background_Main;
    border-right: 2px solid $view_Title_background_Main;
    &-header {
      border-top: 2px solid $view_Title_background_Main;
    }
    &-bottom {
      border-bottom: 2px solid $view_Title_background_Main;
    }
  }
  .kakutei {
    text-indent: -9999px;
    background: no-repeat url('@/assets/kaku_15px.png') center center;
  }
}
</style>
