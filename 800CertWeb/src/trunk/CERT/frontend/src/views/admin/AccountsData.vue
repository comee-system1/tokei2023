<template>
  <div class="pa-1" id="adminData">
    <div class="header pa-1">
      <v-row no-gutters justify="end">
        <v-btn height="24" @click="openDialog('new')" class="newRegistButton">
          <v-icon>mdi-plus-circle</v-icon>
          新規登録</v-btn
        >
      </v-row>
    </div>

    <v-row no-gutters>
      <wj-flex-grid
        id="adminListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="4"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="adminViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-filter
          :initialized="filterInitialized"
          :showFilterIcons="false"
        />

        <wj-flex-grid-column
          :width="200"
          header="管理者名"
          binding="adminName"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-column
          :width="300"
          header="メールアドレス"
          binding="mailaddress"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
      </wj-flex-grid>
    </v-row>
    <AlertDialog
      v-if="dialogType == 'newResult'"
      :message="`管理者アカウントを発行しました。`"
      :submessage="`管理者アカウントIDと仮パスワードを、メールにて対象のメールアドレスあてに通知しました。`"
      :submessageThd="`■ 通知対象のメールアドレス`"
      :sendToMail="sendToMail"
      :height="`tall`"
      :width="350"
    />

    <AlertDialog
      v-if="dialogType == 'editFin'"
      :message="`登録完了しました`"
      :width="300"
    />

    <ConfirmDialog
      :message="`管理者アカウントを削除しますか？`"
      :messageAligns="'pre'"
      :submessage="`削除すると下記の情報が失われ、管理者システムにログインできなくなります。元に戻す場合は、管理者アカウントの再登録が再度必要になります。`"
      :submessageThd="`■ 削除対象の登録情報`"
      :listBox="{
        list1: '管理者名',
        list2: 'メールアドレス',
      }"
      :width="450"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogType == 'delete'"
      args="adminDelete"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <ConfirmDialog
      :message="`選択された管理者マスタを削除しますか？`"
      :messageAligns="'pre'"
      :submessage="
        `選択された` + deleteCount + `件の管理者マスタを削除します。`
      "
      :submessageSec="`削除した場合、管理者WEBシステムにログインができなくなります。また、元に戻すことはできません。`"
      :submessageThd="`■ 削除される管理者マスタ`"
      :width="450"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogType == 'deleteAccounts'"
      args="deleteAccounts"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="dialogType == 'deleteFin'"
      :message="`削除完了しました`"
      :width="300"
    />

    <v-dialog width="500" v-model="dialogAccountFlag" id="dialogAdmin">
      <!--管理者アカウント新規登録フォーム-->
      <v-card
        v-if="
          dialogType == 'new' ||
          dialogType == 'edit' ||
          dialogType == 'editConf' ||
          dialogType == 'delete'
        "
      >
        <v-card-title class="dialog_title">
          管理者アカウント情報
          <v-btn class="closeButton pa-0" @click="dialogAccountFlag = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>
            管理者アカウントを発行し、管理者システムを利用できる状態にします。
          </p>
          <v-row no-gutters class="borderbottom pb-2 mt-1">
            <label class="tle inq">管理者名</label>
            <input
              type="text"
              class="v-card ml-1 box min pl-1"
              v-model="dialogAdminName"
            />
          </v-row>
          <v-row no-gutters class="pb-2 mt-1">
            <div>
              <label class="tle inq">メールアドレス</label>
            </div>
            <div class="questionarea">
              <input
                v-if="dialogType == 'new'"
                type="text"
                class="v-card ml-1 box mdl pl-1"
                v-model="dialogAdminMail"
              />
              <input
                v-else
                type="text"
                class="v-card ml-1 box mdl pl-1"
                v-model="dialogAdminMail"
                readonly
              />
              <v-tooltip
                class="tooltips"
                data-html="true"
                :text="dialogMessageMail"
                max-width="420"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-row>

          <v-row no-gutters class="mt-3">
            <v-col cols="3">
              <v-btn
                class="deleteButton htmin"
                :disabled="deleteDisableFlag"
                @click="dialogDelete()"
                >削除</v-btn
              >
            </v-col>
            <v-col class="text-end">
              <v-btn class="ml-2 registButton htmin" @click="dialogRegist()"
                >登録</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as wjGrid from '@grapecity/wijmo.grid';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import { getConnect } from '@/connect/getConnect';
import { postConnect } from '@/connect/postConnect';
import { putConnect } from '@/connect/putConnect';
import { deleteConnect } from '@/connect/deleteConnect';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import sysConst from '@/utiles/const';

export default {
  props: ['keycloak'],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    ConfirmDialog,
    AlertDialog,
  },
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },
  data() {
    return {
      deleteCount: 0,
      filterIcrn: {},
      flexGrid: {},
      gridSelectedRow: 0,
      dialogAccountFlag: false,
      deleteDisableFlag: false,
      dialogType: '', // new/newResult/edit/editConf/editFin/delete/deleteConf/deleteFin
      sendToMail: [],
      adminViewData: [],
      headerheight: 140,
      dialogAdminName: '',
      dialogAdminMail: '',
      deleteAdminName: '',
      dialogMessageMail:
        '登録されたメールアドレスが、管理者システム画面にログインする際のIDとなります。他の管理者で使用しているメールアドレスと重複はできません。',
      adminMailAddress: this.keycloak.idTokenParsed.email,
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('adminListGrid') != null) {
        document.getElementById('adminListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    filterInitialized(filter) {
      this.filterIcrn = filter;
    },

    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.setAdminViewData();
      this.createHeader();
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        _self.gridSelectedRow = ht.row;
        if (ht.panel == flexGrid.cells) {
          if (ht.col != 0) {
            let temp = flexGrid.itemsSource;
            _self.openDialog('edit', temp[ht.row]);
          }
          flexGrid.refresh();
        }
      });
    },
    onItemsSourceChanged() {},
    createHeader() {
      var panel = this.flexGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.setCellData(0, 0, '管理者');

      // 上部ヘッダの結合
      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 0, 1));
      this.flexGrid.columnHeaders.rows[0].height = 50;
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
      this.flexGrid.mergeManager = mm;
    },
    setAdminViewData() {
      this.adminViewData = [];
      this.keycloak.updateToken(30).then(() => {
        getConnect(
          'admin-account',
          this.keycloak.token,
          this.keycloak.idTokenParsed.sub,
          this.keycloak.realm,
          {}
        ).then((result) => {
          let records = [];
          if (typeof result == 'boolean' && result == false) {
            alert(
              'ただいまサーバーが混み合っております。しばらく経ってから再度操作をしてください。'
            );
          } else if (result.result.code == 'Success') {
            result.response.data.forEach((el) => {
              records.push({
                adminName: el.user,
                mailaddress: el.email,
              });
            });
            this.adminViewData = records;
          }
        });
      });
    },

    onFormatItem(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        e.cell.style.backgroundColor = sysConst.COLOR.headerAreaColor;
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col >= 1) {
          e.cell.style.textAlign = 'left';
        }
      }
    },

    /*****************
     * 新規登録ボタン
     * グリッドを押下編集
     */
    openDialog(type, editdata = []) {
      this.dialogAccountFlag = true;
      this.dialogType = type;

      if (type == 'edit') {
        this.deleteDisableFlag = false; // 削除ボタン有効
      } else {
        this.deleteDisableFlag = true; // 削除ボタン無効化
      }
      this.dialogAdminName = editdata.adminName;
      this.dialogAdminMail = editdata.mailaddress;
    },
    /***********************
     * ダイアログ削除ボタン
     */
    dialogDelete() {
      this.dialogType = 'delete';

      let tmp = this.flexGrid.itemsSource[this.gridSelectedRow];
      this.deleteAdminName = tmp.adminName;
    },

    /****************
      ダイアログ登録ボタン
    */
    dialogRegist() {
      // 新規登録の時
      if (this.dialogType == 'new') {
        this.dialogAccountFlag = false;

        let registData = {
          pKanriacnt_user: this.dialogAdminName,
          pKanriacnt_email: this.dialogAdminMail,
          pKanriacnt_regist_user: this.keycloak.idTokenParsed.name,
          pKanriacnt_regist_email: this.keycloak.idTokenParsed.email,
        };
        this.keycloak.updateToken(30).then(() => {
          postConnect(
            'admin-account',
            this.keycloak.token,
            this.keycloak.idTokenParsed.sub,
            this.keycloak.realm,
            registData
          ).then((result) => {
            if (typeof result == 'boolean' && result == false) {
              alert(
                'ただいまサーバーが混み合っております。しばらく経ってから再度操作をしてください。'
              );
            } else if (result.result.code == 'Success') {
              this.setAdminViewData();
              this.dialogType = 'newResult';
              this.sendToMail = [
                result.response.data.email1,
                result.response.data.email2,
              ];
            } else if (result.result.code == 'DuplicateAccountWarning') {
              this.setAdminViewData();
              alert(
                '入力いただいたアカウント情報と重複するアカウントが存在するため登録することができませんでした。'
              );
            }
          });
        });
      }
      // 編集の時
      if (this.dialogType == 'edit') {
        this.dialogAccountFlag = false;

        let registData = {
          pKanriacnt_user: this.dialogAdminName,
          pKanriacnt_email: this.dialogAdminMail,
          pPreKanriacnt_email: this.dialogAdminMail,
        };
        this.keycloak.updateToken(30).then(() => {
          putConnect(
            'admin-account',
            this.keycloak.token,
            this.keycloak.idTokenParsed.sub,
            this.keycloak.realm,
            registData
          ).then((result) => {
            if (typeof result == 'boolean' && result == false) {
              alert(
                'ただいまサーバーが混み合っております。しばらく経ってから再度操作をしてください。'
              );
            } else if (result.result.code == 'Success') {
              this.setAdminViewData();
              this.dialogType = 'editFin';
            } else if (result.result.code == 'PutAccountNotExistsWarning') {
              this.setAdminViewData();
              alert(
                '該当するアカウントが存在しないため、更新することができませんでした。'
              );
            }
          });
        });
      }
    },
    /*********************************
     * 完了ダイアログからの戻り
     */
    dialogCompleteMethod(args = {}) {
      console.log(args);
      // if (this.dialogType == 'newResult') {
      //   this.dialogAccountFlag = false;
      // }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数
     */
    dialogConfirmMethod(args = {}) {
      console.log(args);

      if (this.dialogType == 'delete') {
        this.dialogAccountFlag = false;

        let registData = {
          pKanriacnt_user: this.dialogAdminName,
          pKanriacnt_email: this.dialogAdminMail,
          pKanriacnt_regist_user: this.keycloak.idTokenParsed.name,
          pKanriacnt_regist_email: this.keycloak.idTokenParsed.email,
        };
        this.keycloak.updateToken(30).then(() => {
          deleteConnect(
            'admin-account',
            this.keycloak.token,
            this.keycloak.idTokenParsed.sub,
            this.keycloak.realm,
            registData
          ).then((result) => {
            if (typeof result == 'boolean' && result == false) {
              alert(
                'ただいまサーバーが混み合っております。しばらく経ってから再度操作をしてください。'
              );
            } else if (result.result.code == 'Success') {
              this.setAdminViewData();
              this.dialogType = 'deleteFin';
            } else if (result.result.code == 'DeleteAccountNotExistsWarning') {
              this.setAdminViewData();
              alert(
                '該当するアカウントが存在しないため、削除することができませんでした。'
              );
            } else if (result.result.code == 'DeleteAccountMinWarning') {
              this.setAdminViewData();
              alert(
                '該当のアカウントを削除すると管理者アカウントが存在しない状態となるため、削除することができませんでした。'
              );
            }
          });
        });
      }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数(キャンセル)
     */
    dialogConfirmCancelMethod(args = {}) {
      console.log(args);
      if (this.dialogType == 'delete') {
        this.dialogType = 'edit';
      }
      // アカウントの一括削除
      if (this.dialogType == 'deleteAccounts') {
        this.dialogType = '';
        this.control = 0;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 25px;
#dialogAdmin {
  font-size: $default_fontsize;

  input[type='text']:disabled {
    background: $light-gray;
  }
  input[type='text']:read-only {
    background: $light-gray;
  }

  label {
    &.tle {
      background-color: $view_Title_background_Blue;
      width: 125px;
      height: $height;
      line-height: $height;
      display: inline-block;
      text-align: center;
      position: relative;
      &.inq {
        &:before {
          content: '*';
          color: $red;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .questionarea {
    position: relative;
    .questionIcon {
      position: absolute;
      top: 0;
      left: auto;
      right: -25px;
      font-size: 8px;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 6px;
      background-color: $black;
      color: $white;
    }
    .questionStatusButton {
      width: 70px;
      height: $height;
      background-size: 80%;
      text-indent: -9999px;
      background-position: 2px 2px;
    }
    input {
      height: $height;
    }
  }
  .v-card {
    &.box {
      border: 1px solid #ccc;
      display: inline-block;
      &.min {
        width: 200px;
      }
      &.mdl {
        width: 250px;
      }
    }
  }

  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
  }
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        height: $height;
        min-width: 30px;
        color: $black;
        position: absolute;
        left: auto;
        right: 10px;
        top: 10px;
      }
    }
  }
  .htmin {
    height: $height;
    width: 120px;
    font-size: $cell_fontsize;
  }
  .deleteButton {
    border: 1px solid $dialog_red;
    color: $red;
    &.v-btn--disabled {
      color: rgba(var(--v-theme-on-surface), 0.26);
      background: rgb(var(--v-theme-surface));
      border: 1px solid $light-gray;
    }
  }
  .registButton {
    background-color: $dialog_blue;
    color: $white;
  }
}

div#adminData {
  font-size: 12px;
  min-width: 1266px;
  .newRegistButton {
    background-color: $dialog_blue;
    color: $white;
  }
  .header {
    position: absolute;
    z-index: 11;
    top: 50px;
  }
  select {
    width: 100px;
    background-color: $white;
    border: 1px solid $dialog_borderColor;
    appearance: auto;
  }
  #adminListGrid {
    border: 1px solid $dialog_borderColor;
  }
}
</style>
