<template>
  <hot-table
    :data="viewGridData"
    :rowHeaders="false"
    :colMergeHeaders="colMergeHeaders"
    :colHeaders="colHeaders"
    :columns="columns"
    fillHandle="true"
    :settings="settings"
    id="my-custom-id"
  ></hot-table>
</template>

<script>
import { HotTable } from '@handsontable/vue';
import 'handsontable/dist/handsontable.full.css';

var headerHtml;
var headerMergeHtml;
var headerHeight;
var columnLists;

export default {
  props: {
    viewGridData: [],
    colMergeHeaders: [],
    colHeaders: [],
    colLists: [],
    headerHeight: { type: Number },
  },
  components: {
    HotTable,
  },
  mounted() {
    /*
    let elem = document.getElementById('my-custom-id');
    let tElem = elem.children[1].children[0].children[0].children[0].children;
    //elem.innerHTML = elem.innerHTML.replaceAll('編集', 'dddd');
    tElem[0].setAttribute('id', 'my-custom-grid');
    let etable = document.getElementById('my-custom-grid');
    var theadElement = etable.tHead;
    theadElement.setAttribute('id', 'my-custom-head');
    let ehead = document.getElementById('my-custom-head');
    console.log(ehead.children[0].children);
    let td = ehead.children[0].children;
    for (let i = 0; i < td.length; i++) {
      td[i].innerHTML = 'ffff';
    }
*/
    // elem.children[1].innerHTML = elem.children[1].innerHTML.replaceAll(
    //   '編集',
    //   'dddd'
    // );
    //tElem[0].innerHTML = tElem[0].innerHTML.replace('/<th /', '<th colspan=2');
    // console.log(this.colHeaders);
    // let childElems = document.getElementsByTagName('thead');
    // for (let i = 0; i < childElems.length; i++) {
    //   console.log(childElems[i].innerHTML);
    //   childElems[i].innerHTML = '<tr><th>あああ</th></tr>';
    // }

    columnLists = this.colLists;
    headerHtml = this.colHeaders;
    headerMergeHtml = this.colMergeHeaders;
    headerHeight = this.headerHeight + 'px';
  },
  data() {
    return {
      columns: this.colLists,
      /*
      [
        { readOnly: true, type: 'text' },
        { readOnly: true, type: 'text' },
        { readOnly: true, type: 'text' },
        { readOnly: true, type: 'text' },
        
        // { type: 'checkbox' },
        // { type: 'text', width: 80 },
        // { type: 'text', width: 80 },
        // { type: 'text', width: 200, className: 'htLeft htMiddle' },
        // {
        //   type: 'numeric',
        //   numericFormat: { pattern: '0,00', culture: 'ja-JP' },
        // },
        // { type: 'text', width: 300, className: 'htLeft htMiddle' },
        
      ]
      */
      settings: {
        width: 900,
        height: 300,
        contextMenu: true,
        manualColumnFreeze: true,
        // fixedRowsTop: 1,
        // fixedColumnsLeft: 1,
        // fixedRowsBottom: 1,
        manualColumnMove: false,
        manualColumnResize: false,
        manualRowResize: false,
        manualRowMove: false,
        dropdownMenu: false,
        filters: true,
        columnSorting: true,
        comments: true,
        minSpareRows: 0,
        mergeCells: [
          //{ row: 0, col: 3, rowspan: 1, colspan: 2 },
          // { row: 1, col: 1, rowspan: 1, colspan: 2 },
        ],

        afterGetColHeader: function (col, TH) {
          let html = '';
          let setClass = '';
          if (headerHtml && headerHtml.indexOf(col)) {
            // console.log(headerHtml[col]);
            //html = '<div>sss</div><div>' + headerHtml[col].title + '</div>';
            if (headerHtml[col].class) {
              setClass = headerHtml[col].class.split(' ').join(' ');
            }

            // 開始位置から終わり位置までのcolを保持
            let tmp = headerMergeHtml.map(function (value) {
              return value.startPos <= col && value.endPos >= col;
            });
            // 開始位置のデータを保持
            let st = headerMergeHtml.find(function (value) {
              return value.startPos == col;
            });
            // 文字の位置調整
            // th上の文字がある時
            let textAdjust = '';
            if (tmp.includes(true)) {
              textAdjust = 'min';
              let mergeText = '';
              if (st) {
                mergeText = st.text;
                // 横幅の確認
                let w = columnLists[col].width;
                // マージの数 終わり位置-開始位置
                let mergeCnt = st.endPos - st.startPos + 1;
                // -1:調整
                let width = mergeCnt * w - 1;
                html =
                  '<div class="mergeArea" style="width:' +
                  width +
                  'px " ><span>' +
                  mergeText +
                  '</span>';
                // subがあるとき
                if (st.sub) {
                  html += '<div class="submerge" >';
                  st.sub.map(function (value) {
                    html +=
                      '<div style="width:' +
                      width +
                      'px;" >' +
                      value.text +
                      '</div>';
                  });
                  html += '</div>';
                }
                html += '</div>';
              }
            }

            html +=
              '<div style="height:' +
              headerHeight +
              '" class= "' +
              setClass +
              ' textJustify ' +
              textAdjust +
              '"><span>' +
              headerHtml[col].title +
              '</span></div>';
            TH.innerHTML = html;
          }
        },
      },
      // enterMoves: { row: 0, col: 1 },
      // outsideClickDeselects: true,
      // manualColumnResize: true,
      // fillHandle: false,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@/assets/scss/GridTable.scss';
</style>
