<template>
  <div id="listsArea">
    <wj-flex-grid
      id="keikakuIdeaIkouGrid"
      :headersVisibility="'None'"
      :autoGenerateColumns="false"
      :allowAddNew="false"
      :allowDelete="false"
      :allowPinning="false"
      :allowMerging="'None'"
      :allowResizing="false"
      :allowSorting="false"
      :allowDragging="false"
      :selectionMode="'Cell'"
      :showMarquee="true"
      :imeEnabled="true"
      :alternatingRowStep="0"
      :initialized="onInitialize"
      :itemsSourceChanged="onItemsSourceChanged"
      :formatItem="onFormatItem"
      :itemsSource="viewData"
      :autoRowHeights="true"
    >
      <wj-flex-grid-column
        binding="title"
        :width="200"
        :isReadOnly="true"
        :wordWrap="true"
        :multiLine="true"
        align="center"
      ></wj-flex-grid-column>
      <wj-flex-grid-column
        binding="value"
        width="*"
        :wordWrap="true"
        :multiLine="true"
        align="left"
      ></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
export default {
  props: {},
  components: {},
  data() {
    return {
      inputs: [],
      notekey: 0,
      note: [
        {
          key: 0,
          title: '利用者及び家族の生活に対する意向(希望する生活)',
          value: '',
        },
        {
          key: 1,
          title: '総合方針',
          value: '',
        },
        {
          key: 2,
          title: '長期目標',
          value: '',
        },
        {
          key: 3,
          title: '短期目標',
          value: '',
        },
      ],

      keikakuKubunModel: '',
      editTextDialog: false,
      headerheight: 300,
      viewData: [],
      userdrawer: true,
      mainGrid: {},
    };
  },
  created() {},
  mounted() {},
  computed: {
    textstyles() {
      return {
        minHeight: '100vh',
      };
    },
  },
  methods: {
    getValue(kbn) {
      console.log(this.viewData);
      return this.viewData[kbn].value;
    },
    grdRefresh(userDispflg) {
      this.userdrawer = userDispflg;
      this.mainGrid.refresh();
      this.mainGrid.autoSizeRows();
    },
    onInitialize(flexGrid) {
      this.mainGrid = flexGrid;
      // クリックイベント
      flexGrid.addEventListener(flexGrid.hostElement, 'click', (e) => {
        let ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 1) {
            // 完全編集モードへ移行
            flexGrid.startEditing(true);
          }
        }
      });
      flexGrid.cellEditEnded.addHandler((flexGrid) => {
        flexGrid.beginUpdate();
        flexGrid.autoSizeRows();
        flexGrid.endUpdate();
      });
      this.createViewData();
    },
    createViewData() {
      let result = [];
      for (let i = 0; i < this.note.length; i++) {
        result.push({
          title: this.note[i].title,
          value: this.note[i].value,
        });
      }
      this.viewData = result;
    },
    onItemsSourceChanged(flexGrid) {
      flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
      flexGrid.beginUpdate();
      flexGrid.autoSizeRows();
      flexGrid.endUpdate();
    },
    onFormatItem(flexGrid, e) {
      if (e.panel == flexGrid.cells) {
        if (e.col == 1) {
          if (this.userdrawer) {
            e.cell.style.fontSize = '12px';
          } else {
            e.cell.style.fontSize = '16.2px';
          }
        }
        e.cell.style.textAlign = '';
        e.cell.style.justifyContent = '';
        e.cell.style.alignItems = '';
        e.cell.style.backgroundColor = '';
        if (e.col == 0) {
          e.cell.style.textAlign = 'center';
          e.cell.style.justifyContent = 'center';
          e.cell.style.alignItems = 'center';
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
      }
    },
    getGrid() {
      return this.mainGrid;
    },
    /******************************
     * 入力内容切替ボタンを押下
     */
    inputTypePage(type) {
      alert(type);
    },
    /******************************
     * 入力内容編集
     */
    editText(type) {
      this.notekey = type;
      this.inputs = this.note[type].value;
      this.editTextDialog = true;
    },
    editTextSave() {
      this.note[this.notekey].value = this.inputs;
      this.editTextDialog = false;
    },

    onkeikakuKubun(s) {
      s.header = this.keikakuKubun[s.selectedIndex].name;
    },
    setViewData(viewData) {
      console.log(viewData);

      this.viewData = [
        {
          key: 0,
          title: '利用者及び家族の生活に対する意向(希望する生活)\n',
          value: viewData.iko != undefined ? viewData.iko : '',
        },
        {
          key: 1,
          title: '\n総合方針\n\n',
          value: viewData.hoshin != undefined ? viewData.hoshin : '',
        },
        {
          key: 2,
          title: '\n長期目標\n\n',
          value:
            viewData.chokimokuhyo != undefined ? viewData.chokimokuhyo : '',
        },
        {
          key: 3,
          title: '\n短期目標\n\n',
          value:
            viewData.tankimokuhyo != undefined ? viewData.tankimokuhyo : '',
        },
      ];
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#listsArea {
  color: $font_color;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .editarea {
    overflow: hidden;
    overflow-y: scroll;
    //width: 890px;
    width: 100%;
    div {
      width: 860px;
    }
  }

  #keikakuIdeaIkouGrid {
    font-size: 12px;
    height: 100%;
    max-height: 100%;
    background: $grid_background;
    border: 1px solid $grid_Border_Color;
    .wj-header {
      // ヘッダのみ縦横中央寄せ
      color: $font_color;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: normal;
      line-height: 110%;
      padding: 4px;
    }
    // .wj-cell:not(.wj-header) {
    //   padding: 2px;
    //   display: flex;
    // }
    &.wj-flexgrid [wj-part='root'] {
      overflow-y: scroll !important;
    }
  }
}
.keikakuideaTextarea {
  fieldset {
    border: none;
  }
  textarea {
    height: 80vh !important;
    margin-top: 0px !important;
    margin-right: 10px;
  }
}
.lightGreen {
  background-color: $view_Title_background_Green !important;
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>
