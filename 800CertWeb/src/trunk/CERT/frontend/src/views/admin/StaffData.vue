<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters class="d-flex pt-1 pb-1" id="subTitle">
      <h2>{{ $route.meta.title }}</h2>
      <label>{{ $route.meta.sub }}</label>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col>
        <label class="labeled">所属事業所</label>
        <select
          v-model="syozokuGroup"
          class="selectBox ml-1"
          @change="onSyozokuGroupChange()"
        >
          <option v-for="val in groupArray" :key="val.id" :value="val.id">
            {{ val.val }}
          </option>
        </select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">アカウントID</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, syokuinKey) in accountsArray"
          :key="`syokuin-${syokuinKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'syokuin_' + item.id"
            :value="item.id"
            name="syokuin"
            v-model="selAccount"
            @change="onSelAccount()"
          />
          <label :for="'syokuin_' + item.id" class="ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>

      <label class="labeled ml-1">利用状況</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="ml-1 d-flex"
          v-for="(filters, filterIndex) in filterArray"
          :key="`filter-${filterIndex}`"
          elevation="0"
        >
          <input
            type="checkbox"
            :id="'filter_' + filters.id"
            :value="filters.id"
            v-model="selFilter"
            v-if="filters.id <= 3"
            @change="onSelFilter()"
          />
          <label
            :for="'filter_' + filters.id"
            class="ml-1 mr-2"
            v-if="filters.id <= 3"
            >{{ filters.value }}</label
          >
        </v-card>
      </div>

      <label class="labeled ml-1">その他絞込</label>
      <div class="ml-1 boarderArea wMdle d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, otherKey) in otherArray"
          :key="`other-${otherKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'other_' + item.id"
            :value="item.id"
            name="other"
            v-model="selOther"
            @change="onSelOther()"
          />
          <label :for="'other_' + item.id" class="ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>
    </v-row>

    <v-row no-gutters class="mt-3 filterHeight">
      <v-col>
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
      <v-col>
        <label class="accountConfLabel"
          >アカウント発行要確認新規職員:<span>{{ accountCount }}</span
          >名</label
        >
      </v-col>
      <v-col class="justify-end d-flex">
        <label class="labeled pinked min ml-1">権限入力</label>
        <v-btn
          v-for="val in authItem"
          :key="val.id"
          height="24"
          @click="authClick(val.id)"
          :class="{ isActive: authBtnActive[val.id], 'ml-1 border': true }"
          :elevation="authBtnActive[val.id] ? 0 : 1"
          >{{ val.text }}</v-btn
        >
        <label class="labeled pinked min ml-1">その他</label>
        <v-btn
          small
          class="ml-1"
          height="24"
          @click="authCopyDialogOpenPosition()"
          >権限コピー</v-btn
        >
        <v-btn
          small
          class="ml-1"
          height="24"
          @mouseover="onsignExplain(1)"
          @mouseleave="onsignExplain(0)"
        >
          <v-icon small color=""> mdi-message-text </v-icon>
          記号説明
        </v-btn>
        <v-card id="signExplain" v-show="signExplainFlag">
          <div v-for="(value, index) in explainArray" :key="index">
            <v-row no-gutters>
              <div :class="`left ${value.bk}`">{{ value.icon }}</div>
              <div class="right">:{{ value.text }}</div>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="true"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :binding="columnsAuth.binding"
          :width="90"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-filter
          :initialized="filterInitialized"
        ></wj-flex-grid-filter>
        <v-card
          elevation="0"
          v-if="syokuinViewDataFlag"
          id="syokuinViewDataNone"
        >
          <div id="noListLogo"></div>
          <p>
            選択された所属事業所に勤務する職員が登録されていません。<br />
            <a href="">職員マスタ</a
            >にて、勤務情報を設定した職員を登録してください。
          </p>
        </v-card>
      </wj-flex-grid>
    </v-row>
    <v-row class="mt-3 bottomButtonArea" no-gutters>
      <div class="text-end">
        <label class="message" v-if="activateCancel == false"
          >変更内容を保存する場合は登録を行ってください</label
        >
        <v-btn
          class="ml-2"
          height="24"
          elavation="1"
          :disabled="activateCancel"
          @click="cancelDialogType = 1"
          >キャンセル</v-btn
        >
      </div>
      <div class="text-end">
        <v-btn class="doButton" :disabled="activateCancel" height="24"
          >権限登録</v-btn
        >
      </div>
    </v-row>

    <ConfirmDialog
      :message="`編集内容を破棄しますか？`"
      :submessage="`登録していないデータは破棄され、編集前の状態に戻ります。`"
      :messageAligns="'pre'"
      :width="450"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'破棄'"
      v-if="cancelDialogType == 1"
      args="editCancel"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <AlertDialog
      v-if="cancelDialogType == 2"
      :message="`破棄しました。`"
      :width="350"
    />

    <ConfirmDialog
      :message="`権限をコピーしますか？`"
      :messageAligns="'pre'"
      :submessage="`既に権限が設定されている職員が選択されている場合、コピー元職員の内容で上書きされます。`"
      :submessageThd="`■ 上書き対象の職員`"
      :width="450"
      :leftButton="'キャンセル'"
      :rightButton="'実行'"
      v-if="authCopyType == 2"
      args="editCancel"
      :selectedListBox="authSelected"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="authCopyType == 3"
      :message="`コピー完了しました。`"
      :width="350"
    />

    <div v-show="authCopyDialogFlag" id="authCopyDialog">
      <v-card>
        <v-card-title class="dialog_title" id="dragAble">
          権限コピー
          <v-btn
            class="closeButton pa-0"
            @click="this.authCopyDialogFlag = false"
          >
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>コピー元職員から選択した職員に権限をコピーします。</p>
          <div class="mt-3 pb-2 borderbottom">
            <label>
              コピー元職員
              <v-tooltip
                class="tooltips"
                :text="`${dialogAuthFrom}`"
                max-width="420"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </label>
            <select
              v-model="authCopySyokuinFrom"
              @change="onSelectAuthCopySyokuinFrom()"
            >
              <option value="" disabled selected style="display: none">
                職員を選択
              </option>
              <option
                v-for="val in syokuinSelectCopyData"
                :key="val.syokuinCode"
                :value="val.syokuinCode"
              >
                {{ val.syokuinName }}
              </option>
            </select>
          </div>
          <div class="mt-3">
            <label>
              コピー先職員
              <v-tooltip
                :text="`${dialogAuthTo}`"
                max-width="420"
                class="tooltips"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </label>
            <wj-flex-grid
              id="syokuinCopyGrid"
              :headersVisibility="'Column'"
              :selectionMode="0"
              :alternating-row-step="0"
              :initialized="onInitializedCopy"
              :itemsSource="syokuinAuthCopyData"
              :formatItem="onFormatItemCopy"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
            >
              <wj-flex-grid-filter
                :initialized="filterInitializedCopy"
              ></wj-flex-grid-filter>
              <wj-flex-grid-column
                :width="40"
                header="選"
                binding="copySelected"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :width="100"
                header="コード"
                binding="syokuinCode"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                width="1*"
                header="職員名"
                binding="syokuinName"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                width="1*"
                header="アカウントID"
                binding="accountID"
                align="center"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </div>
          <v-row no-gutters class="mt-3 bottombutton">
            <v-col
              ><v-btn height="24" @click="authCancelCopy()"
                >クリア</v-btn
              ></v-col
            >
            <v-col class="text-end"
              ><v-btn
                height="24"
                class="doButton"
                @click="onAuthCopyConf()"
                :disabled="copyActiveFlag"
                >実行</v-btn
              ></v-col
            >
          </v-row>
        </v-card>
      </v-card>
    </div>

    <ConfirmDialog
      :message="`職員アカウントIDを削除しますか？`"
      :bold="`bold`"
      :messageAligns="'pre'"
      :submessage="`削除すると下記の情報が失われ、システムにログインできなくなります。元に戻す場合は、職員アカウントのIDの登録が必要になります。`"
      :submessageThd="`■ 削除対象の登録情報`"
      :listBox="{
        list1: '職員アカウントID',
        list2: 'パスワード',
        list3: 'メールアドレス',
        list4: 'グランドメニュー権限情報',
      }"
      :width="450"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogAccountDeleteOpenType == 1"
      args="accountDelete"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="dialogAccountDeleteOpenType == 3"
      :message="`削除完了しました`"
      :width="350"
    />

    <ConfirmDialog
      :message="`パスワードを再発行しますか?`"
      :bold="`bold`"
      :messageAligns="'pre'"
      :submessage="`現在のパスワードは破棄され新しい仮パスワードが発行されます。仮パスワードは、メールにて管理者と職員(登録済みの場合)に通知されます。`"
      :width="450"
      :leftButton="'キャンセル'"
      :rightButton="'再発行'"
      v-if="dialogAccountPasswordOpenType == 1"
      args="passwordReset"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <ConfirmDialog
      :message="`アカウントを停止しますか？`"
      :submessage="`停止中で登録するとシステムにログインできなくなります。再開する場合は【使用中】に変更し【登録】してください。`"
      :messageAligns="'pre'"
      :width="450"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'停止'"
      v-if="dialogAccountRegistOpenType == 5"
      args="editCancel"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="dialogAccountPasswordOpenType == 2"
      :message="`仮パスワードを発行しました`"
      :submessage="`職員アカウントIDと仮パスワードをメールにて下記の対象メールアドレス宛に通知します。`"
      :submessageThd="`■ 通知対象メールアドレス`"
      :sendToMail="sendToMail"
      :height="`tall`"
      :width="350"
    />

    <AlertDialog
      v-if="dialogAccountRegistOpenType == 3"
      :message="`登録完了しました`"
      :width="350"
    />
    <AlertDialog
      v-if="dialogAccountRegistOpenType == 6"
      :message="`停止しました`"
      :width="350"
    />
    <AlertDialog
      v-if="dialogAccountRegistOpenType == 4"
      :message="`職員アカウントIDを発行しました`"
      :submessage="`職員アカウントIDと仮パスワードを、メールにて対象のメールアドレス宛に通知しました。`"
      :submessageThd="`■ 通知対象メールアドレス`"
      :sendToMail="sendToMail"
      :height="`tall`"
      :width="350"
    />

    <v-dialog
      width="500"
      v-model="dialogAccountFlag"
      class="dialogAccount"
      no-click-animation
      v-if="dialogAccountRegistOpenType <= 2"
    >
      <v-card>
        <v-card-title class="dialog_title">
          職員アカウント情報
          <v-btn class="closeButton pa-0" @click="dialogAccountClose()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>職員アカウントのIDを発行し、システムを利用できる状態にします。</p>
          <v-row no-gutters class="borderbottom pb-2 mt-1">
            <label class="tle">職員名</label>
            <input
              type="text"
              class="v-card ml-1 box min pl-1"
              v-model="dialogSyokuinName"
              :readonly="true"
            />
          </v-row>
          <v-row no-gutters class="mt-1">
            <label class="tle inq">アカウント発行</label>
            <v-card
              v-for="val in dialogAccountArray"
              :key="val.id"
              class="ml-2 mt-1"
              elevation="0"
            >
              <input
                type="radio"
                name="dialogAccount"
                v-model="dialogAccount"
                :id="`dialogAccount_${val.id}`"
                :value="val.id"
              />
              <label class="ml-1" :for="`dialogAccount_${val.id}`">{{
                val.value
              }}</label>
            </v-card>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle inq">ID</label>
            </div>
            <div class="questionarea">
              <input
                type="text"
                v-model="dialogAccountID"
                class="v-card ml-1 box mdl pl-1"
                :disabled="dialogAccount == 2 ? true : false"
              />
              <v-tooltip
                :text="`${dialogMessageID}`"
                max-width="420"
                class="tooltips"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>

              <p class="text-caption">半角英数字の4桁～32桁の文字</p>
            </div>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle">メールアドレス</label>
            </div>
            <div class="questionarea">
              <input
                type="text"
                v-model="dialogAccountMail"
                class="v-card ml-1 box mdl pl-1"
                :disabled="dialogAccount == 2 ? true : false"
              />
              <v-tooltip
                :text="`${dialogMessageMail}`"
                max-width="500"
                class="tooltips"
              >
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle">利用状態</label>
            </div>
            <div class="questionarea">
              <div
                :class="`ml-1 questionStatusButton ${useButton}`"
                @click="editUseStatus()"
              >
                利用中
              </div>
              <v-tooltip
                :text="`${dialogMessageUse}`"
                max-width="540"
                class="tooltips"
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
                @click="dialogAccountDeleteOpenType = 1"
                :disabled="useButton == usingStatusType[3]"
                >削除</v-btn
              >
            </v-col>
            <v-col class="text-end">
              <v-btn
                class="passwordButton htmin"
                @click="passwordReset()"
                :disabled="useButton == usingStatusType[3]"
                >パスワード再発行</v-btn
              >
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
import AlphabetButton from '@/components/AlphabetButton.vue';
import dDrop from '@/utiles/dragDrop';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid.filter';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import sysConst from '@/utiles/const';
import { getConnect } from '@/connect/getConnect';
import { putConnect } from '@/connect/putConnect';
import { postConnect } from '@/connect/postConnect';
import { deleteConnect } from '@/connect/deleteConnect';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import Lodash from 'lodash';

export default {
  props: ['keycloak', 'userName', 'color'],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    AlphabetButton,
    ConfirmDialog,
    AlertDialog,
  },

  created() {},
  mounted() {
    const searchURL = new URL(window.location);
    let query = searchURL.pathname.split('/');
    this.queryParam = query[2] ?? query[1];

    dDrop.drag(document.getElementById('authCopyDialog'));
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
    this.filtered.showFilterIcons = false;
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
      //
      usingStatusType: [
        'useButton', // 使用中
        'tempButton', // 仮登録
        'stopButton', // 停止中
        'noRegistButton', // 未登録
      ],
      dialogAccountFlag: false,
      dialogAccountRegistOpenType: 0, //1:登録フォーム, 2:登録確認, 3:登録完了
      dialogAccountDeleteOpenType: 0, //1:削除フォーム, 2:削除確認, 3:削除完了
      dialogAccountPasswordOpenType: 0, //1:確認フォーム, 2:完了
      queryParam: '',
      sendToMail: [],
      syokuinViewDataFlag: false,
      flexGrid: [],
      signExplainFlag: false,
      authBtnActive: { 1: true },
      authBtnSelected: 1, // 権限入力の選択状態
      authSelected: [],
      selAccount: 1,
      selOther: 1,
      syozokuGroup: 'ALL',
      selFilter: [1, 2, 3],
      selected: 0,
      syokuinViewData: [],
      syokuinViewDataDefault: [],
      accountCount: 0,
      activateCancel: true,
      groupArray: [],
      accountsArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: '発行済',
        },
        {
          id: 3,
          value: '未発行',
        },
      ],
      filterArray: [
        {
          id: 1,
          value: '使用中',
        },
        {
          id: 2,
          value: '仮登録',
        },
        {
          id: 3,
          value: '停止中',
        },
        {
          id: 4,
          value: '未登録',
        },
      ],
      otherArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: 'メール有',
        },
        {
          id: 3,
          value: '権限未設定',
        },
      ],
      filterAbled: [],
      columnArray: [
        {
          id: 1,
          header: 'コード',
          binding: 'syokuinCode',
          width: 78,
        },
        {
          id: 2,
          header: '職員名',
          binding: 'syokuinName',
          width: 140,
        },
        {
          id: 3,
          header: '職種',
          binding: 'syokusyu',
          width: 140,
        },
        {
          id: 4,
          header: '所属事業所',
          binding: 'syozokuJigyosyo',
          width: 200,
        },
        {
          id: 5,
          header: '開始日',
          binding: 'startDate',
          width: 100,
        },
        {
          id: 6,
          header: '終了日',
          binding: 'endDate',
          width: 100,
        },
        {
          id: 7,
          header: '退職',
          binding: 'taisyoku',
          width: 30,
        },
        {
          id: 8,
          header: 'メール',
          binding: 'mailFlag',
          width: 30,
        },
        {
          id: 9,
          header: 'ID',
          binding: 'accountID',
          width: 140,
        },
        {
          id: 10,
          header: '利用状況',
          binding: 'accountStatus',
          width: 60,
        },
      ],
      columnAuthArray: [],
      authItem: [
        { id: 1, text: '〇 一般権限', value: '〇' },
        { id: 2, text: '● 画面権限者', value: '●' },
        { id: 0, text: 'クリア', value: '' },
      ],
      filtered: {}, // フィルターデータ
      headerheight: 240,
      explainArray: sysConst.TOOLTIPMESSAGE,
      searchOption: {}, // 検索条件
      dialogAccount: 1,
      dialogSyokuinName: '',
      dialogAccountID: '',
      dialogAccountMail: '',
      useButton: '',
      useButtonMessage: [
        '福祉見聞録システムにログインできます。',
        '福祉見聞録システムにログインできますが、仮パスワードの状態です。',
        '福祉見聞録システムにログインできません。',
        '職員アカウントIDを発行していない状態です。',
      ],
      dialogMessageID: `この画面で設定したID名でログインできるようになります。
      他の職員で設定済みの同じ名前のIDは設定できません。`,
      dialogMessageMail: `メールアドレスを設定すると、アカウント発行時の仮パスワード通知や、
      パスワードを忘れた場合に職員本人で再設定することができます。
      `,
      dialogMessageUse: '',
      dialogAccountArray: [
        {
          id: 0,
          value: '有り',
        },
        {
          id: 1,
          value: '無し',
        },
      ],
      tooltipmessage_mail: false,
      gridSelectedRow: 0, // グリッドの選択した行数
      authCopyDialogFlag: false,
      dialogAuthFrom:
        'コピーの元となる職員を選択してください。ここで選択した職員の権限がコピーされます。',
      dialogAuthTo:
        'コピー元職員の権限を反映させたい職員をすべて選択して下さい。(複数選択可)',
      authCopySyokuinFrom: '',
      syokuinSelectCopyData: [],
      syokuinAuthCopyData: [],
      copyFlexGrid: {},
      copyActiveFlag: true,
      authCopyType: 1, // 1:登録フォーム 2:確認 3:登録完了
      cancelDialogType: 0,
      pEnabled: 0,
      pSiid: 0,
      mailSendType: 0, // 1:未登録 2:停止 3:使用中
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('syokuinListGrid') != null) {
        document.getElementById('syokuinListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*********************
     * 権限コピーダイアログ開く
     */
    authCopyDialogOpenPosition() {
      this.authCopyDialogFlag = true;
      let elem = document.getElementById('authCopyDialog');
      elem.style.left = '30%';
      elem.style.top = '10%';
    },
    /*************
     * 権限コピーダイアログ
     */
    authCopyDialog() {
      let tmp = this.syokuinViewData;
      const group = tmp.filter((item, index, self) => {
        const nameList = self.map((item) => item['syokuinCode']);
        // 重複を削除する
        if (nameList.indexOf(item.syokuinCode) === index) {
          return item;
        }
      });
      this.syokuinSelectCopyData = group;
      this.syokuinAuthCopyData = this.syokuinSelectCopyData;
    },

    /******************
     * コピー元職員選択
     */
    onSelectAuthCopySyokuinFrom() {
      // コピー元職員をコピー先職員に表示しないようにする
      let tmp = [];
      let data = this.syokuinSelectCopyData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].syokuinCode != this.authCopySyokuinFrom) {
          tmp.push(data[i]);
        }
      }
      this.syokuinAuthCopyData = [];
      this.syokuinAuthCopyData = tmp.slice();
      this.copyFlexGrid.refresh();
      this.copyActiveFlag = false;
    },
    /*************
     * コピー完了後の実行
     */
    onCopyAreaComplete() {
      // 選択状態を解除
      this.authCancelCopy();
      this.authCopyType = 1;
      this.authCopyDialogFlag = false;
    },
    /***************************
     * コピー確認
     */
    onAuthCopyConf() {
      this.authCopyType = 2;
      // 選択対象者のみを取得
      let temp = this.syokuinAuthCopyData.filter(function (value) {
        return value.copySelected;
      });
      let authSelected = [];
      for (let i = 0; i < temp.length; i++) {
        authSelected.push(temp[i].syokuinName);
      }
      this.authSelected = authSelected;
    },
    /***************************
     * コピー実行
     */
    onAuthCopy() {
      // コピー元のデータ
      let _self = this;
      let fromSelected = this.syokuinSelectCopyData.find(function (value) {
        return value.syokuinCode == _self.authCopySyokuinFrom ? value : '';
      });
      // 選択されたコピー先職員のデータ
      let tmp = this.syokuinAuthCopyData.slice();
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].copySelected) {
          // 職員一覧にコピーデータを代入
          this.syokuinViewData.filter(function (value, k) {
            if (value.syokuinCode == tmp[i].syokuinCode) {
              _self.syokuinViewData[k].groundAuth = fromSelected.groundAuth;
              return value;
            }
          });
        }
      }
      this.authCopyType = 3;
      this.authCopyDialogFlag = false;
      this.activateCancel = false; // キャンセルボタン有効
    },
    /*********************
     * 権限コピーのフィルタリングアイコン
     */
    filterInitializedCopy(filter) {
      let tmp = [];
      tmp.push('syokuinCode');
      tmp.push('syokuinName');
      tmp.push('accountID');
      filter.filterColumns = tmp;
    },
    onSyozokuGroupChange() {
      let selected = this.syozokuGroup;
      let temp = this.groupArray.find(function (value) {
        return value.id == selected ? value : '';
      });

      let tmplist = [];
      if (temp.id) {
        this.syokuinViewDataDefault.filter(function (val) {
          if (val.syozokuJigyosyoId == temp.id) {
            tmplist.push(val);
          }
        });
      } else {
        tmplist = this.syokuinViewDataDefault;
      }
      this.syokuinViewData = tmplist;
    },
    onSelAccount() {
      let select = this.selAccount;
      let selected = this.accountsArray.find(function (value) {
        return value.id == select ? value : '';
      });
      this.searchOption.accountSelect = selected.id;
      this.searched();
    },
    onSelFilter() {
      this.searchOption.selFilter = this.selFilter;
      this.searched();
    },
    onSelOther() {
      let selOther = this.selOther;
      let selected = this.otherArray.find(function (value) {
        return value.id == selOther ? value : '';
      });

      // 権限未設定を選択時、権限の登録数を保持する
      if (selected.id == 3) {
        for (let i = 0; i < this.syokuinViewData.length; i++) {
          let groundAuth = this.syokuinViewData[i].groundAuth;
          let cnt = 0;
          Object.keys(groundAuth).forEach(function (key) {
            if (groundAuth[key]) {
              cnt += 1;
            }
          });
          this.syokuinViewData[i].groundAuthFlag = cnt;
        }
      }
      this.searchOption.otherSelect = selected;
      this.searched();
    },
    onAlphabetical(k) {
      this.searched(k);
    },
    searched(alphabetkey = '') {
      let result = this.syokuinViewData;
      // アカウントID検索
      if (
        this.searchOption.accountSelect &&
        this.searchOption.accountSelect != 1
      ) {
        let accountTemp = [];

        for (let i = 0; i < result.length; i++) {
          // 発行済み
          if (
            this.searchOption.accountSelect == 2 &&
            result[i].accountID.length > 0
          ) {
            accountTemp.push(result[i]);
          }
          // 未発行
          if (
            this.searchOption.accountSelect == 3 &&
            result[i].accountID.length == 0
          ) {
            accountTemp.push(result[i]);
          }
        }

        result = accountTemp;
      }

      // 利用状況
      let selFilter = this.searchOption.selFilter;
      if (selFilter && selFilter.length != 0) {
        let filterTemp = [];
        for (let i = 0; i < result.length; i++) {
          // 使用中
          if (
            selFilter.indexOf(1) != -1 &&
            result[i].accountStatus == this.filterArray[0].value
          ) {
            filterTemp.push(result[i]);
          }
          // 仮登録
          if (
            selFilter.indexOf(2) != -1 &&
            result[i].accountStatus === this.filterArray[1].value
          ) {
            filterTemp.push(result[i]);
          }
          // 停止中
          if (
            selFilter.indexOf(3) != -1 &&
            result[i].accountStatus === this.filterArray[2].value
          ) {
            filterTemp.push(result[i]);
          }
        }
        result = filterTemp;
      }

      // その他絞込
      let otherSelect = this.searchOption.otherSelect;
      if (otherSelect && otherSelect.id != 1) {
        let otherTemp = [];
        for (let i = 0; i < result.length; i++) {
          // メール有
          if (otherSelect.id == 2 && result[i].mailFlag != '') {
            otherTemp.push(result[i]);
          }
          // 権限未設定
          if (otherSelect.id == 3 && result[i].groundAuthFlag != 0) {
            otherTemp.push(result[i]);
          }
        }
        result = otherTemp;
      }
      // アルファベット検索
      if (alphabetkey > 0) {
        let tmpviewdata = result.concat();
        result = this.$refs.alp.alphabetFilter(tmpviewdata, 'rkana');
      }
      this.flexGrid.itemsSource = result;
    },
    onInitializedCopy(flexGrid) {
      this.copyFlexGrid = flexGrid;
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 0) {
            if (
              _self.syokuinAuthCopyData[ht.row].copySelected ==
              _self.authItem[0].value
            ) {
              _self.syokuinAuthCopyData[ht.row].copySelected = '';
            } else {
              _self.syokuinAuthCopyData[ht.row].copySelected =
                _self.authItem[0].value;
            }
          }
        }
        flexGrid.refresh();
      });
    },
    onItemsSourceChangedCopy() {},
    authCancelCopy() {
      let tmp = this.syokuinSelectCopyData;
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].copySelected = '';
      }
      this.copyFlexGrid.refresh();
    },
    onCancelAllClear() {
      //let state = this.syokuinViewDataDefault;
      //this.syokuinViewData = [];
      //this.syokuinViewData = JSON.parse(JSON.stringify(state));
      this.cancelDialogType = 2;
      this.activateCancel = true;
      this.setSyokuinViewData('ALL');
    },
    onFormatItemCopy(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 2 || e.col == 3) {
          e.cell.style.textAlign = 'left';
        }
      }
    },

    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      let _self = this;

      this.setSyokuinViewData('ALL');
      flexGrid.frozenColumns = this.columnArray.length;
      // フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', (e) => {
        var ht = flexGrid.hitTest(e);

        // グランドメニュー権限セルマウスオーバー
        let groundStatus = 'authMouseOverStatus';
        let groundElem = document.getElementsByClassName(groundStatus);
        for (let i = 0; i < groundElem.length; i++) {
          groundElem[i].style.backgroundColor = sysConst.COLOR.white;
        }
        if (ht.panel == flexGrid.cells) {
          let cellElement = document.elementFromPoint(e.clientX, e.clientY);
          if (cellElement.className.indexOf(groundStatus) > -1) {
            let str = cellElement.className;
            let target = 'authMouseOverStatusCode--';
            let string = str.substring(str.indexOf(target) + target.length);
            let elem = document.getElementsByClassName(target + string);
            for (let i = 0; i < elem.length; i++) {
              elem[i].style.backgroundColor = sysConst.COLOR.dialog_hover;
            }
          }
        }

        // グランドメニュー権限ヘッダmouseover
        let authString = 'headerAuthMouseOver';
        if (ht.panel == flexGrid.columnHeaders) {
          let headerElement = document.elementFromPoint(e.clientX, e.clientY);
          if (headerElement.className.indexOf(authString) > -1) {
            // 縦列noを取得
            let str = headerElement.className;
            let target = 'headerAuthMouseOverCode--';
            let bodyTarget = 'authMouseOverBody--';
            let num = str.substring(str.indexOf(target) + target.length);
            let elem = document.getElementsByClassName(bodyTarget + num);
            for (let i = 0; i < elem.length; i++) {
              elem[i].style.backgroundColor = sysConst.COLOR.dialog_hover;
            }
          }
        }

        // アカウント管理のマウスオーバー
        // セルに付与されたclass名より色を変更する
        let statusString = 'accountMouseOverStatus';
        let elem = document.getElementsByClassName(statusString);
        for (let i = 0; i < elem.length; i++) {
          elem[i].style.backgroundColor = sysConst.COLOR.white;
        }
        if (ht.panel == flexGrid.cells) {
          let cellElement = document.elementFromPoint(e.clientX, e.clientY);
          if (cellElement.className.indexOf(statusString) > -1) {
            // 職員コードを取得
            let str = cellElement.className;
            let target = 'accountMouseOverCode--';
            let string = str.substring(str.indexOf(target) + target.length);
            // 指定職員コードのエレメント
            let elem = document.getElementsByClassName(target + string);
            for (let i = 0; i < elem.length; i++) {
              elem[i].style.backgroundColor = sysConst.COLOR.dialog_hover;
            }
          }
        }
        this.filtered.showFilterIcons = true;

        // vue3の場合下記記載がないとfiltered機能が動作しない
        setTimeout(() => {
          flexGrid.refresh();
        });
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });

      // グリッド押下時
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.columnHeaders) {
          if (ht.col >= _self.columnArray.length && ht.row == 2) {
            let tempIcon = _self.getAuthSelecteToIdIcon(_self.authBtnSelected);
            let editCol = ht.col - _self.columnArray.length + 1;
            let editColName = 'column_' + parseInt(editCol);
            for (let i = 0; i < _self.syokuinViewData.length; i++) {
              // 未登録以外
              if (
                _self.syokuinViewData[i].accountStatus !=
                _self.filterArray[3].value
              ) {
                _self.syokuinViewData[i].groundAuth[editColName] = tempIcon;
              }
            }
            flexGrid.refresh();
            _self.activateCancel = false; // キャンセルボタン有効
          }
        }
        if (ht.panel == flexGrid.cells) {
          // グリッドの選択位置
          _self.gridSelectedRow = ht.row;
          // 利用状況を押下し、状態に応じた職員アカウント情報ダイアログ画面を表示
          if (
            ht.col == _self.columnArray.length - 1 ||
            ht.col == _self.columnArray.length - 2 ||
            ht.col == _self.columnArray.length - 3
          ) {
            let temp = flexGrid.itemsSource[ht.row];
            _self.dialogSyokuinName = temp.syokuinName; // 職員名
            // アカウント発行 未登録の場合は0
            if (temp.accountStatus == _self.filterArray[3].value) {
              _self.dialogAccount = 2;
            } else {
              _self.dialogAccount = 1;
            }
            _self.dialogAccountID = temp.accountID; // アカウントID
            _self.dialogAccountMail = temp.mailAddress; // メールアドレス

            // 使用中
            if (temp.accountStatus == _self.filterArray[0].value) {
              _self.useButton = _self.usingStatusType[0];
              _self.dialogMessageUse =
                _self.filterArray[0].value + '：' + _self.useButtonMessage[0];
            }
            // 仮登録
            if (temp.accountStatus == _self.filterArray[1].value) {
              _self.useButton = _self.usingStatusType[1];
              _self.dialogMessageUse =
                _self.filterArray[1].value + '：' + _self.useButtonMessage[1];
            }
            // 停止中
            if (temp.accountStatus == _self.filterArray[2].value) {
              _self.useButton = _self.usingStatusType[2];
              _self.dialogMessageUse =
                _self.filterArray[2].value + '：' + _self.useButtonMessage[2];
            }
            // 未登録
            if (temp.accountStatus == '') {
              _self.useButton = _self.usingStatusType[3];
              _self.dialogMessageUse =
                _self.filterArray[3].value +
                '：' +
                '：' +
                _self.useButtonMessage[3];
            }

            _self.dialogAccountFlag = true;
            _self.dialogAccountRegistOpenType = 1;
            _self.dialogAccountDeleteOpenType = 0;
            _self.dialogAccountPasswordOpenType = 0;
          }
          // 権限のチェック
          if (ht.col > _self.columnArray.length - 1) {
            // 権限入力の選択状態
            let tempIcon = _self.getAuthSelecteToIdIcon(_self.authBtnSelected);
            // 選択したグランドメニュー権限のカラムの名前
            let colNumber = ht.col - _self.columnArray.length + 1;
            // let column = 'groundAuth.column_' + colNumber;

            // 選択したデータのsyokuinCodeを取得
            // 同じsyokuinCodeのデータを更新
            let syokuinCode = _self.syokuinViewData[ht.row].syokuinCode;
            _self.editSyokuiCodeColumData(
              syokuinCode,
              'groundAuth',
              'column_' + colNumber,
              tempIcon
            );
            flexGrid.refresh();
            _self.activateCancel = false; // キャンセルボタン有効
          }
        }
      });
    },

    setSyokuinViewData(syozokuGroup) {
      this.syokuinViewDataDefault = [];
      this.syokuinViewData = [];
      let _self = this;
      this.keycloak.updateToken(30).then(() => {
        let searchParam = { kanritaniId: syozokuGroup };
        getConnect(
          'staff-account/initial-data',
          _self.keycloak.token,
          _self.keycloak.idTokenParsed.sub,
          _self.keycloak.realm,
          searchParam
        ).then((result) => {
          let records = [];
          if (typeof result == 'boolean' && result == false) {
            alert(
              'ただいまサーバーが混み合っております。しばらく経ってから再度操作をしてください。'
            );
          } else if (result.result.code == 'Success') {
            /*
            if (_self.groupArray.length == 0) {
              _self.groupArray.push({ id: 'ALL', value: '' });
              result.response.data.businessUnitList.forEach((el) => {
                _self.groupArray.push({
                  id: el.pKanritaniid,
                  value: el.pKanritaniname,
                });
              });
            }
*/
            result.response.data.staffList.forEach((el) => {
              if (el.syozoku.length > 0) {
                for (let i = 0; i < el.syozoku.length; i++) {
                  records.push({
                    siid: el.siid,
                    sikibetuid: el.sikibetuid,
                    sicode: el.sicode,
                    syokuinCode: String(el.sicode).padStart(5, '0'),
                    syokuinName: el.name,
                    rkana: el.kana,
                    syokusyu: el.syozoku[i].syk_sname,
                    syozokuJigyosyoId: el.syozoku[i].kanritaniid,
                    syozokuJigyosyo: el.syozoku[i].kanritaniname,
                    startDate:
                      el.syozoku[i].symd.trim().length > 0
                        ? el.syozoku[i].symd.slice(0, 4) +
                          '/' +
                          el.syozoku[i].symd.slice(4, 6) +
                          '/' +
                          el.syozoku[i].symd.substring(6, 8)
                        : '',
                    endDate:
                      el.syozoku[i].eymd.trim().length > 0
                        ? el.syozoku[i].eymd.slice(0, 4) +
                          '/' +
                          el.syozoku[i].eymd.slice(4, 6) +
                          '/' +
                          el.syozoku[i].eymd.substring(6, 8)
                        : '',
                    taisyoku: el.ekbn == 1 ? '〇' : '',
                    mailAddress: el.email != null ? el.email : '',
                    mailFlag: el.email != null ? '〇' : '',
                    accountID: el.accountid != null ? el.accountid : '',
                    accountStatus:
                      el.acn_kbn == 0
                        ? '停止中'
                        : el.acn_kbn == 1
                        ? '使用中'
                        : el.acn_kbn == 2
                        ? '仮登録'
                        : '',
                    groundAuth: {
                      column_1:
                        el.riyosys[0] && el.riyosys[0].kengen ? '〇' : '',
                      column_2:
                        el.riyosys[1] && el.riyosys[1].kengen ? '〇' : '',
                      column_3:
                        el.riyosys[2] && el.riyosys[2].kengen ? '〇' : '',
                      column_4:
                        el.riyosys[3] && el.riyosys[3].kengen ? '〇' : '',
                      column_5:
                        el.riyosys[4] && el.riyosys[4].kengen ? '〇' : '',
                      column_6:
                        el.riyosys[5] && el.riyosys[5].kengen ? '〇' : '',
                      column_7:
                        el.riyosys[6] && el.riyosys[6].kengen ? '〇' : '',
                      column_8:
                        el.riyosys[7] && el.riyosys[7].kengen ? '〇' : '',
                    },
                    checkedFlag: false,
                  });
                }
              } else {
                records.push({
                  siid: el.siid,
                  sikibetuid: el.sikibetuid,
                  sicode: el.sicode,
                  syokuinCode: String(el.sicode).padStart(5, '0'),
                  syokuinName: el.name,
                  rkana: el.kana,
                  syokusyu: '',
                  syozokuJigyosyoId: null,
                  syozokuJigyosyo: '',
                  startDate: '',
                  endDate: '',
                  taisyoku: el.ekbn == 1 ? '〇' : '',
                  mailAddress: el.email != null ? el.email : '',
                  mailFlag: el.email != null ? '〇' : '',
                  accountID: el.accountid != null ? el.accountid : '',
                  accountStatus:
                    el.accountid == null
                      ? ''
                      : el.acn_kbn == 0
                      ? '停止中'
                      : el.acn_kbn == 1
                      ? '使用中'
                      : el.acn_kbn == 2
                      ? '仮登録'
                      : '',
                  groundAuth: {
                    column_1: el.riyosys[0] && el.riyosys[0].kengen ? '〇' : '',
                    column_2: el.riyosys[1] && el.riyosys[1].kengen ? '〇' : '',
                    column_3: el.riyosys[2] && el.riyosys[2].kengen ? '〇' : '',
                    column_4: el.riyosys[3] && el.riyosys[3].kengen ? '〇' : '',
                    column_5: el.riyosys[4] && el.riyosys[4].kengen ? '〇' : '',
                    column_6: el.riyosys[5] && el.riyosys[5].kengen ? '〇' : '',
                    column_7: el.riyosys[6] && el.riyosys[6].kengen ? '〇' : '',
                    column_8: el.riyosys[7] && el.riyosys[7].kengen ? '〇' : '',
                  },
                  checkedFlag: false,
                });
              }
            });
            this.syokuinViewDataDefault = records;
            this.syokuinViewData = records;
            /*一旦コメント上記を有効*******/
            //this.syokuinViewDataDefault = JSON.parse(JSON.stringify(records));
            //this.syokuinViewData = JSON.parse(JSON.stringify(records));
          }

          // 所属事業所セレクトボックスの指定
          let tmpSelect = [];
          this.syokuinViewDataDefault.filter(function (val) {
            if (val.syozokuJigyosyoId) {
              tmpSelect.push({
                syozokuJigyosyo: val.syozokuJigyosyo,
                syozokuJigyosyoId: val.syozokuJigyosyoId,
              });
            }
          });
          let tmpSelected = Lodash.groupBy(tmpSelect, 'syozokuJigyosyoId');
          let entries = [];
          entries.push({
            id: 0,
            val: '',
          });
          Object.entries(tmpSelected).map(function (val) {
            entries.push({
              id: val[1][0]['syozokuJigyosyoId'],
              val: val[1][0]['syozokuJigyosyo'],
            });
          });

          this.groupArray = entries;

          if (this.syokuinViewData.length == 0) {
            this.syokuinViewDataFlag = true;
          } else {
            this.syokuinViewDataFlag = false;
            this.searched();
            this.getAccountCount();
          }
          this.authCopyDialog();
        });
      });
    },

    /*********************************
     * 確認用ダイアログからの戻り関数
     * 引数に戻り値設定可能{}
     */
    dialogConfirmMethod() {
      if (this.dialogAccountPasswordOpenType == 1) {
        // パスワード再発行実行
        this.dialogPasswordRest();
      }
      if (this.dialogAccountRegistOpenType == 5) {
        // ステータス停止中
        this.dialogAccountRegistOpenType = 6;
        this.putDataStaff();
      }
      if (this.dialogAccountDeleteOpenType == 1) {
        // 職員アカウント削除確認
        this.dialogAccountDeleteOpenType = 3;
        this.dialogDelete();
      }

      if (this.cancelDialogType == 1) {
        // 編集内容のキャンセル
        this.onCancelAllClear();
      }
      if (this.authCopyType == 2) {
        // 権限コピー実行
        this.onAuthCopy();
      }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数(キャンセル)
     * 引数に戻り値設定可能{}
     */
    dialogConfirmCancelMethod() {
      if (this.dialogAccountPasswordOpenType == 1) {
        this.dialogAccountPasswordOpenType = 0;
      }
      if (this.dialogAccountDeleteOpenType <= 2) {
        this.dialogAccountDeleteOpenType = 0;
      }
      if (this.cancelDialogType == 1) {
        this.cancelDialogType = 0;
      }
      if (this.authCopyType == 2) {
        this.authCopyType = 1;
      }
      if (this.dialogAccountRegistOpenType == 5) {
        this.dialogAccountRegistOpenType = 1;
      }
    },
    /*********************************
     * 完了ダイアログからの戻り
     * 引数に戻り値設定可能{}
     */
    dialogCompleteMethod() {
      if (this.dialogAccountPasswordOpenType == 2) {
        this.dialogAccountPasswordOpenType = 0;
      }
    },

    dialogAccountRegistFinish() {
      this.flexGrid.refresh();
      this.dialogAccountFlag = false;
    },
    /******************
     * 削除実行
     */
    dialogDelete() {
      let viewData = this.syokuinViewData;
      let siid = viewData[this.gridSelectedRow].siid;
      let _self = this;
      // データ削除
      this.keycloak.updateToken(30).then(() => {
        let deleteParam = {
          pSiid: siid,
          pIpanacnt: _self.dialogAccountID,
        };
        deleteConnect(
          'staff-account/delete-data',
          _self.keycloak.token,
          _self.keycloak.idTokenParsed.sub,
          _self.keycloak.realm,
          deleteParam
        ).then((result) => {
          if (result.result.code == 'Success') {
            this.setSyokuinViewData('ALL');

            this.dialogAccountDeleteOpenType = 3;
            this.dialogAccountFlag = false;
          }
        });
      });
    },
    /************************
     * ダイアログ登録実行
     */
    dialogRegist() {
      let viewData = this.syokuinViewData;

      // // コードが同じ人のデータを取得
      let syokuinCode =
        this.flexGrid.itemsSource[this.gridSelectedRow].syokuinCode;
      let _self = this;
      viewData.filter(function (value, k) {
        if (syokuinCode == value.syokuinCode) {
          _self.pSiid = viewData[k].siid;
          viewData[k].accountID = _self.dialogAccountID;
          viewData[k].mailAddress = _self.dialogAccountMail;

          // 使用中
          if (_self.useButton == _self.usingStatusType[0]) {
            viewData[k].accountStatus = _self.filterArray[0].value;
            _self.dialogAccountRegistOpenType = 3;
            _self.pEnabled = 0;
            _self.mailSendType = 3;
            _self.putDataStaff();
          }
          // 仮登録
          if (_self.useButton == _self.usingStatusType[1]) {
            viewData[k].accountStatus = _self.filterArray[1].value;
            _self.dialogAccountRegistOpenType = 3;
            _self.pEnabled = 1;
            _self.putDataStaff();
          }
          // 停止中
          if (_self.useButton == _self.usingStatusType[2]) {
            viewData[k].accountStatus = _self.filterArray[2].value;
            _self.dialogAccountRegistOpenType = 5;
            _self.mailSendType = 2;
            _self.pEnabled = 1;
          }
          // 未登録
          if (_self.useButton == _self.usingStatusType[3]) {
            _self.sendToMail = [
              _self.keycloak.idTokenParsed.email,
              _self.dialogAccountMail,
            ];
            viewData[k].accountStatus = _self.filterArray[3].value;
            _self.dialogAccountRegistOpenType = 4;
            _self.pEnabled = 1;
            _self.mailSendType = 1;
            _self.postDataStaff();
          }
        }
      });

      this.syokuinViewData = viewData;
    },
    /****************
     * 職員データ新規登録
     */
    postDataStaff() {
      let _self = this;

      // データ更新
      this.keycloak.updateToken(30).then(() => {
        let putParam = {
          pSiid: _self.pSiid,
          pAcntumu: _self.dialogAccount,
          pIpanacnt: _self.dialogAccountID,
          pEmail: _self.dialogAccountMail,
          pEnabled: _self.pEnabled,
          pPreIpanacnt: _self.dialogAccountID,
          pTmplUsername: _self.dialogSyokuinName,
          pEmailAdmin: _self.keycloak.idTokenParsed.email,
          mailSendType: _self.mailSendType,
        };
        postConnect(
          'staff-account/post-data',
          _self.keycloak.token,
          _self.keycloak.idTokenParsed.sub,
          _self.keycloak.realm,
          putParam
        ).then(() => {
          this.setSyokuinViewData('ALL');
        });
      });
    },
    /***********************
     * 職員データ更新処理
     */
    putDataStaff() {
      let _self = this;

      // データ更新
      this.keycloak.updateToken(30).then(() => {
        let putParam = {
          pSiid: _self.pSiid,
          pAcntumu: _self.dialogAccount,
          pIpanacnt: _self.dialogAccountID,
          pEmail: _self.dialogAccountMail,
          pEnabled: _self.pEnabled,
          pPreIpanacnt: _self.dialogAccountID,
          pTmplUsername: _self.dialogSyokuinName,
          pEmailAdmin: _self.keycloak.idTokenParsed.email,
          mailSendType: _self.mailSendType,
        };
        putConnect(
          'staff-account/put-data',
          _self.keycloak.token,
          _self.keycloak.idTokenParsed.sub,
          _self.keycloak.realm,
          putParam
        ).then(() => {
          this.setSyokuinViewData('ALL');
        });
      });
    },
    dialogAccountClose() {
      this.dialogAccountFlag = false;
    },
    /**********************
     * パスワード再発行
     */
    passwordReset() {
      this.dialogAccountPasswordOpenType = 1;
    },
    /**********************
     * パスワード再発行実行
     */
    dialogPasswordRest() {
      // パスワード変更処理
      let _self = this;
      // データ更新
      this.keycloak.updateToken(30).then(() => {
        let putParam = {
          pIpanacnt: _self.dialogAccountID,
          pChgpassword: '',
        };

        putConnect(
          'staff-account/put-data/chgpass',
          _self.keycloak.token,
          _self.keycloak.idTokenParsed.sub,
          _self.keycloak.realm,
          putParam
        ).then(() => {
          //  this.setSyokuinViewData('ALL');

          _self.dialogAccountFlag = false;
          _self.dialogAccountPasswordOpenType = 2;
          // 管理者と対象者
          let target = _self.flexGrid.itemsSource[_self.gridSelectedRow];
          _self.sendToMail = [
            _self.keycloak.idTokenParsed.email,
            target.mailAddress,
          ];
        });
      });
    },

    /**************************
     * dialogで表示している利用状態の変更
     */
    editUseStatus() {
      // 利用中の時は停止ボタンに変更
      if (this.useButton == this.usingStatusType[0]) {
        this.useButton = this.usingStatusType[2];
        this.dialogMessageUse =
          this.filterArray[2].value + '：' + this.useButtonMessage[2];
      }
      // 停止中の時は利用中ボタンに変更
      else if (this.useButton == this.usingStatusType[2]) {
        this.useButton = this.usingStatusType[0];
        this.dialogMessageUse =
          this.filterArray[0].value + '：' + this.useButtonMessage[0];
      }
    },
    /*******************
     * 指定したsyokuinCodeのデータを更新
     */
    editSyokuiCodeColumData(syokuinCode, editColumn, num, icon) {
      for (let i = 0; i < this.syokuinViewData.length; i++) {
        // syokuinCodeが選択した物と同じもの
        // 利用状況が未登録ではない
        if (
          this.syokuinViewData[i].syokuinCode == syokuinCode &&
          this.syokuinViewData[i].accountStatus != ''
        ) {
          this.syokuinViewData[i][editColumn][num] = icon;
        }
      }
    },
    /*******************************
     * ヘッダ作成
     *******************************/
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      //console.log(panel.rows.length);
      if (panel.rows.length < 3) {
        panel.rows.insert(1, new wjGrid.Row());
        panel.rows.insert(2, new wjGrid.Row());
      }
      for (let i = 0; i < this.columnArray.length; i++) {
        panel.setCellData(0, i, this.columnArray[i].header);
        panel.setCellData(1, i, this.columnArray[i].header);
        panel.setCellData(2, i, this.columnArray[i].header);
        flexGrid.columnHeaders.columns[i].allowMerging = true;
      }

      let col = '';
      let c = this.columnArray.length;

      let _self = this;
      let searchParam = { Getkbn: 0 };
      // グランドメニュー
      getConnect(
        'staff-account/gmenu',
        _self.keycloak.token,
        _self.keycloak.idTokenParsed.sub,
        _self.keycloak.realm,
        searchParam
      ).then((result) => {
        let syslst = result.response.data.gmenu.syslst;
        let tmp = [];
        let k = 1;
        syslst.map(function (value) {
          value['syosai'].map(function (val) {
            tmp.push({
              id: k,
              top: 'グランドメニュー権限',
              middle: value.bunryaku,
              bottom: val.sysryaku,
              binding: 'groundAuth.column_' + k,
            });
            k++;
          });
        });
        this.columnAuthArray = tmp;
        for (let i = 0; i < this.columnAuthArray.length; i++) {
          if (this.columnAuthArray[i]) {
            panel.setCellData(0, c, this.columnAuthArray[i].top);
            panel.setCellData(1, c, this.columnAuthArray[i].middle);
            panel.setCellData(2, c, this.columnAuthArray[i].bottom);

            col = flexGrid.columnHeaders.columns[c];
            col.allowMerging = true;
            col.multiLine = true;
            col.wordWrap = true;

            c++;
          }
        }

        flexGrid.columnHeaders.rows[0].allowMerging = true;
        flexGrid.columnHeaders.rows[1].allowMerging = true;
        flexGrid.columnHeaders.rows[2].allowMerging = true;
      });

      let str = '';
      for (let i = 3; i <= this.columnArray.length - 1; i++) {
        str = i >= 7 ? 'アカウント管理' : '勤務情報';
        panel.setCellData(0, i, str);
      }
      flexGrid.columnHeaders.rows[1].height = 60;
    },
    onItemsSourceChanged(flexGrid) {
      this.createHeader(flexGrid);
    },
    onFormatItem(flexGrid, e) {
      let accountRowCount = this.columnArray.length - 1;

      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if ((e.col == 6 || e.col == 7) && e.row == 1) {
          wijmo.addClass(e.cell, 'vertical-write');
        }

        if (e.col >= 7 && e.col <= accountRowCount) {
          wijmo.addClass(e.cell, 'headerorange');
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
        }

        if (e.col > accountRowCount) {
          wijmo.addClass(e.cell, 'headerAuthMouseOver');
          wijmo.addClass(e.cell, 'headerAuthMouseOverCode--' + e.col);
        }
      }

      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1 || e.col == 2 || e.col == 3 || e.col == 8) {
          e.cell.style.textAlign = 'left';
        }

        // セルデータを取得
        let tmpitem = [];
        if (e.panel.rows[e.row]) {
          tmpitem = e.panel.rows[e.row].dataItem;
        }
        let tmp = [];
        // 終了日が登録＋権限が登録されている場合は背景をピンクに変更
        if (e.col > accountRowCount) {
          let c = 'column_' + (e.col - accountRowCount); // 権限カラム名

          this.syokuinViewData.map(function (value) {
            if (value.endDate && value.groundAuth[c]) {
              tmp.push(value.syokuinCode);
            }
          });

          if (tmpitem.syokuinCode == tmp[0]) {
            wijmo.addClass(e.cell, 'backgroundPink');
          }
        }

        // 利用状況が未登録の場合は列以降をgrayに変更
        if (tmpitem.accountStatus == '') {
          if (e.col > accountRowCount) {
            wijmo.addClass(e.cell, 'backgroundGray');
          }
        }
        // 上下のセルを比べて同じ場合に下のセルを消す
        let tmpitemBefore = [];
        if (e.panel.rows[e.row - 1]) {
          tmpitemBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemBefore != null &&
          tmpitem.syokuinCode == tmpitemBefore.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            e.cell.innerHTML = '';
          }
        }
        // 上下のセルを比べて同じ場合に上のセルの下線を消す
        let tmpitemAfter = [];
        let tmpBefore = [];
        if (e.panel.rows[e.row + 1]) {
          tmpitemAfter = e.panel.rows[e.row + 1].dataItem;
        }
        if (e.panel.rows[e.row - 1]) {
          tmpBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemAfter != null &&
          tmpitem.syokuinCode == tmpitemAfter.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            wijmo.addClass(e.cell, 'borderBottomNone');
          }
        }

        // 職員名に要確認アイコンをつける
        if (e.col == 1 && tmpitem.checkedFlag) {
          e.cell.innerHTML += '<span class="checkicon">新規</span>';
        }

        // 利用状況へ文字前にアイコンを付けるためclass付与
        if (
          e.col == accountRowCount &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          // 使用中
          if (tmpitem.accountStatus == this.filterArray[0].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconUsing');
          }
          // 未登録は空欄
          if (tmpitem.accountStatus == '') {
            e.cell.innerHTML = '';
          }
          // 仮登録
          if (tmpitem.accountStatus == this.filterArray[1].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconNone');
          }
          // 停止中
          if (tmpitem.accountStatus == this.filterArray[2].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconStop');
          }
        }
        // アカウント管理用背景色変更用class付与
        if (
          e.col == accountRowCount - 2 ||
          e.col == accountRowCount - 1 ||
          e.col == accountRowCount
        ) {
          wijmo.addClass(e.cell, 'accountMouseOverStatus');
          wijmo.addClass(
            e.cell,
            'accountMouseOverCode--' + tmpitem.syokuinCode
          );
        }

        // グランドメニュー権限セル部分mouseover用class付与
        if (e.col > accountRowCount) {
          // 下記コメントのセルはclassを付与しない
          // 終了日が登録＋権限が登録されている場合は背景をピンクに変更
          if (
            tmpitem.accountStatus != this.filterArray[3].value &&
            (tmpitem.endDate == '' ||
              (tmpitem.endDate && !flexGrid.getCellData(e.row, e.col))) &&
            tmpitem.syokuinCode != tmp[0]
          ) {
            wijmo.addClass(e.cell, 'authMouseOver');
            wijmo.addClass(e.cell, 'authMouseOverBody--' + e.col);

            wijmo.addClass(e.cell, 'authMouseOverStatus');
            wijmo.addClass(
              e.cell,
              'authMouseOverStatusCode--' + tmpitem.syokuinCode + '_' + e.col
            );
          }
        }

        if (e.col < this.columnArray.length - 3) {
          wijmo.addClass(e.cell, 'backgroundYellow');
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
      for (let i = 0; i < this.columnArray.length; i++) {
        if (i < 6) {
          this.filterAbled.push(this.columnArray[i].binding);
        }
      }
      filter.filterColumns = this.filterAbled;
    },
    /************************
     * 権限入力クリック
     */
    authClick(mine) {
      // クリア押下時はid:1に戻す
      /*
      if (mine == 0) {
        // グランドメニュー権限のデータをクリア
        let editColumn = '';
        for (let i = 0; i < this.syokuinViewData.length; i++) {
          for (let c = 0; c < this.columnAuthArray.length; c++) {
            editColumn = this.columnAuthArray[c].binding;
            this.syokuinViewData[i][editColumn] = '';
          }
        }
        this.flexGrid.refresh();
        this.activateCancel = false; // キャンセルボタン有効
        mine = 1;
      }
      */
      this.authBtnActive = [];
      this.authBtnActive[mine] = true;
      this.authBtnSelected = mine; // 権限入力の選択値
    },
    /***********************
     * 選択しているidの値を元に表示されるiconを取得
     ***********/
    getAuthSelecteToIdIcon(select) {
      let temp = this.authItem.find((el) => el.id == select);
      return temp.value;
    },
    /****************************
     * アカウント発行要確認新規職員
     */
    getAccountCount() {
      // 新規のアイコンが表示されている数
      let array = this.syokuinViewData.map(function (value) {
        return value.checkedFlag ? 1 : 0;
      });
      this.accountCount = array.reduce((prev, current) => prev + current, 0);
    },
    /****************
     * 記号説明ボタン押下
     */
    onsignExplain(type) {
      this.signExplainFlag = type == 0 ? false : true;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 24px;
$mwidth: 1366px;
%commonCloseButton {
  height: $height;
  min-width: 30px;
  color: $black;
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
}
%doButton {
  color: $white;
  background-color: $dialog_blue;
}

%checkCircleImage {
  border: none;
  background-color: $green;
  text-align: center;
  background-image: url('@/assets/checkCircle.png');
  background-position: 20% 50%;
}
%h5 {
  color: $white;
  font-weight: normal;
  font-size: 1.25rem;
}
%disabledbutton {
  color: rgba(var(--v-theme-on-surface), 0.26);
  background: rgb(var(--v-theme-surface));
  border: 1px solid $light-gray;
}

#authCopyDialog {
  font-size: $default_fontsize;
  padding: 10px;
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        @extend %commonCloseButton;
      }
    }
  }

  label {
    display: block;
    position: relative;
    .questionIcon {
      position: absolute;
      top: 0;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      margin-left: 10px;
      background-color: $black;
      color: $white;
      font-size: 8px;
    }
  }
  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
  }
  select {
    border: 1px solid $light-gray;
    width: 80%;
    -webkit-appearance: auto;
    padding: 4px;
    border-radius: 5px;
  }
  .bottombutton {
    button {
      width: 120px;
      &.doButton {
        @extend %doButton;

        &.v-btn--disabled {
          @extend %disabledbutton;
        }
      }
    }
  }
  #syokuinCopyGrid {
    max-height: 260px;
  }
}
.dialogAccount {
  font-size: $default_fontsize;

  input[type='text']:disabled {
    background: $light-gray;
  }
  input {
    &:read-only {
      background-color: $dialog_yellow;
    }
  }
  label {
    &.tle {
      background-color: $view_Title_background_Blue;
      width: 125px;
      height: 25px;
      line-height: 25px;
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
      top: 2px;
      left: auto;
      right: -15px;
      font-size: 8px;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      background-color: $black;
      color: $white;
    }
    .questionStatusButton {
      width: 80px;
      height: 25px;
      background-size: 90%;
      text-indent: -9999px;
      background-position: 2px 2px;
      &.useButton {
        background-image: url('@/assets/usingButton.png');
      }
      &.tempButton {
        background-image: url('@/assets/tempRegistButton.png');
      }
      &.stopButton {
        background-image: url('@/assets/stoppingButton.png');
      }
      &.noRegistButton {
        background-image: url('@/assets/noRegistButton.png');
      }
    }
  }
  .v-card {
    &.box {
      border: 1px solid #ccc;
      display: inline-block;
      height: 25px;
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
        @extend %commonCloseButton;
      }
    }
  }
  .htmin {
    height: $height;
    width: 120px;
    font-size: $cell_fontsize;
  }
  .deleteButton {
    border: 1px solid $red;
    color: $red;
    &:disabled {
      @extend %disabledbutton;
    }
  }
  .passwordButton {
    border: 1px solid $time_color_header;
  }
  .registButton {
    background-color: $dialog_blue;
    color: $white;
  }
}
div#accountsData {
  font-size: $default_fontsize;
  min-width: $mwidth;

  #subTitle {
    border-bottom: 1px solid $black;
    h2 {
      font-weight: normal;
    }
    label {
      line-height: 28px;
      margin-left: 20px;
    }
  }
  input {
    & + label {
      line-height: 24px;
    }
  }
  #signExplain {
    position: absolute;
    width: 400px;
    padding: 10px;
    z-index: 1000;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid $view_Title_background_Main;

    animation-name: fadeInAnime;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;

    div {
      margin-top: 1px;
      &.left {
        width: 40px;
        text-align: center;
      }
      &.pinkBackColor {
        background-color: $pink;
      }
      &.brownBackColor {
        background-color: $brown;
        color: $white;
      }
    }
  }
  @keyframes fadeInAnime {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  label {
    &.message {
      background-color: $Hissu_Color !important;
      color: $white;
      padding: 5px;
    }
    &.accountConfLabel {
      background-color: $view_Title_background_Orange;
      height: $height;
      width: 260px;
      display: block;
      text-align: center;
      line-height: $height;
    }
  }
  span {
    &.checkicon {
      font-size: 0.85%;
      display: inline-block;
      float: right;
      background-color: $brown;
      width: 30px;
      height: 15px;
      text-align: center;
      color: $white;
    }
  }
  button {
    &.isActive {
      color: $white;
      background-color: $view_Title_font_color_Blue;
    }
  }
  #alpCommon {
    height: $height;
  }
  #syokuinListGrid {
    max-width: '1366px';
    position: relative;
    #syokuinViewDataNone {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      z-index: 10000;
      #noListLogo {
        width: 140px;
        height: 140px;
        background-image: url('@/assets/noList.png');
        background-size: contain;
        margin: 0 auto;
      }
    }

    .wj-cell {
      &.borderBottomNone {
        border-bottom: 0px;
      }
      &.backgroundYellow {
        background-color: $light-yellow !important;
      }
      &.backgroundGray {
        background-color: $selected_color !important;
      }
      &.backgroundPink {
        background-color: $dialog_pink !important;
      }
      &.backgroundWhite {
        background-color: $white;
      }
      &.setCheckIcon {
        text-indent: -9999px;
        background-repeat: no-repeat;
        background-position: -2px 3px;
        &.setCheckIconUsing {
          background-image: url('../../assets/usingIcon.png');
        }
        &.setCheckIconNone {
          background-image: url('../../assets/tempIcon.png');
        }
        &.setCheckIconStop {
          background-image: url('../../assets/stopIcon.png');
        }
      }
      &.setCheckIconNone {
        &:before {
          content: url('../../assets/checkIconNone.png');
          padding-right: 3px;
          padding-top: 3px;
        }
      }
    }
    .wj-header {
      &.wj-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: normal;
        &.vertical-write {
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
        }
        &.headerpink {
          background-color: $pink;
        }
        &.headerorange {
          background-color: $grid_Total_Header_Background;
        }
        &.headeraqua {
          background-color: $light-blue;
        }
      }
    }
  }
  .bottomButtonArea {
    min-width: $mwidth;
    position: relative;
    div {
      &:first-child {
        width: $mwidth - 114px;
      }
      &:nth-child(2) {
        button {
          position: absolute;
          top: 0;
          left: auto;
          right: 10px;
          &.doButton {
            @extend %doButton;

            &.v-btn--disabled {
              @extend %disabledbutton;
            }
          }
        }
      }
    }
  }
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: $height;
    display: inline-block;
    &.pinked {
      background-color: $pink;
      line-height: $height;
      height: $height;
    }
    &.min {
      width: 80px;
    }
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      height: $height;
      width: 400px;
      &.short {
        width: 140px;
      }
    }
  }
  .boarderArea {
    width: 240px;
    &.wMdle {
      width: 450px;
    }
  }

  .filterHeight {
    height: $height;
  }
}
</style>
