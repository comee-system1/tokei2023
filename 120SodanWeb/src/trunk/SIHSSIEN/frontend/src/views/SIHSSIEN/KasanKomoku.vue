<template>
  <div id="KasanKomoku">
    <header-services
      @parent-service-select="parentServiceSelect($event, serviceArgument)"
      @parent-service-change="parentServiceChange($event, serviceArgument)"
      :registButtonFlag="true"
      :searchButtonFlag="true"
      :seikyuflag="true"
      :alertMessageFlag="alertMessageFlag"
    ></header-services>
    <v-container no-gutters fluid class="pa-0">
      <v-row no-gutters class="pa-1 mt-1" justify="start">
        <v-card class="d-flex" flat tile>
          <label class="label"> 市町村 </label>
          <select
            v-model="citySelected"
            class="filterSelect"
            @change="onCitySelect()"
          >
            <option v-for="val in cityArray" :key="val.id" :value="val.id">
              {{ val.text }}
            </option>
          </select>
          <label class="label ml-5"> ソート </label>
          <select v-model="sortSelected" class="filterSelect">
            <option v-for="val in sortArray" :key="val.id" :value="val.id">
              {{ val.text }}
            </option>
          </select>
          <v-btn class="ml-5 filterClear" @click="filterClear()">
            <v-icon dense>mdi-filter-off</v-icon>
          </v-btn>
        </v-card>
      </v-row>
      <v-row no-gutters class="ma-1">
        <v-col>
          <alphabet-button
            class="mt-1"
            ref="alp"
            @onAlphabetical="onAlphabetical"
          >
          </alphabet-button>
        </v-col>
        <v-col class="text-right">
          <v-row no-gutters>
            <v-col cols="8">
              <span>上段：回数</span>
              <span class="ml-10">下段：単位数</span>
            </v-col>
            <v-col>
              <select class="filterSelect">
                <option v-for="(val, k) in selectedArray" :key="k" :value="k">
                  {{ val }}
                </option>
              </select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class="ma-1 d-flex">
        <div>
          <wj-flex-grid
            id="basicGrid"
            :initialized="onInitializedBasic"
            :itemsSource="viewData"
            :alternatingRowStep="0"
            :selectionMode="0"
            :autoGenerateColumns="false"
            :headersVisibility="'Column'"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showMarquee="true"
            :formatItem="onFormatItemBasic"
          >
            <wj-flex-grid-filter
              :initialized="filterInitialized"
              :filterApplied="filterApplied"
              :showFilterIcons="false"
            ></wj-flex-grid-filter>
            <wj-flex-grid-column
              v-for="value in basicArray"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <div>
          <wj-flex-grid
            id="listGrid"
            :initialized="onInitializedList"
            :itemsSource="viewData"
            :alternatingRowStep="0"
            :selectionMode="0"
            :autoGenerateColumns="false"
            :headersVisibility="'Column'"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showMarquee="true"
            :formatItem="onFormatItemList"
            :itemsSourceChanged="itemsSourceChanged"
            v-show="displayType == 52"
          >
            <wj-flex-grid-filter
              :initialized="filterInitializedList"
              :showFilterIcons="false"
            ></wj-flex-grid-filter>
            <wj-flex-grid-column
              v-for="value in listArray.base"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArray.shisetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArray.kobetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <div>
          <wj-flex-grid
            id="listGridPlan"
            :initialized="onInitializedListPlan"
            :itemsSource="viewData"
            :alternatingRowStep="0"
            :selectionMode="0"
            :autoGenerateColumns="false"
            :headersVisibility="'Column'"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showMarquee="true"
            :formatItem="onFormatItemListPlan"
            :itemsSourceChanged="itemsSourceChanged"
            v-show="displayType == 53"
          >
            <wj-flex-grid-filter
              :initialized="filterInitializedList"
              :showFilterIcons="false"
            ></wj-flex-grid-filter>
            <wj-flex-grid-column
              v-for="value in listArrayPlan.base"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArrayPlan.shisetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArrayPlan.kobetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <div>
          <wj-flex-grid
            id="listGridFix"
            :initialized="onInitializedListFix"
            :itemsSource="viewData"
            :alternatingRowStep="0"
            :selectionMode="0"
            :autoGenerateColumns="false"
            :headersVisibility="'Column'"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showMarquee="true"
            :formatItem="onFormatItemListFix"
            :itemsSourceChanged="itemsSourceChanged"
            v-show="displayType == 54"
          >
            <wj-flex-grid-filter
              :initialized="filterInitializedList"
              :showFilterIcons="false"
            ></wj-flex-grid-filter>
            <wj-flex-grid-column
              v-for="value in listArrayFix.base"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArrayFix.shisetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
              v-for="value in listArrayFix.kobetsu"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
        <div>
          <wj-flex-grid
            id="totalGrid"
            :initialized="onInitializedTotal"
            :itemsSource="viewData"
            :alternatingRowStep="0"
            :selectionMode="0"
            :autoGenerateColumns="false"
            :headersVisibility="'Column'"
            :allowResizing="false"
            :allowDragging="false"
            :allowSorting="false"
            :showMarquee="true"
            :formatItem="onFormatItemTotal"
            :itemsSourceChanged="itemsSourceChangedTotal"
          >
            <wj-flex-grid-filter
              :initialized="filterInitializedTotal"
              :showFilterIcons="false"
            ></wj-flex-grid-filter>
            <wj-flex-grid-column
              v-for="value in totalArray"
              :key="value.id"
              :binding="value.binding"
              :allowMerging="true"
              :width="value.width"
              :wordWrap="true"
              :multiLine="true"
              :visible="value.visibleFlag"
            ></wj-flex-grid-column>
          </wj-flex-grid>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import HeaderServices from '../../components/HeaderServices.vue';
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import sysConst from '@/utiles/const';
const headerHeight = 90;
const headerHeightList = 64;
export default {
  props: {},
  components: {
    HeaderServices,
    AlphabetButton,
  },
  computed: {},
  mounted() {},
  created() {
    var tmp = [];
    tmp.push({
      receptKakutei: '',
      city: '東経市',
      riyosyaMei: '東経 春美',
      kana: 'ﾊﾙﾐﾄｳｹｲ',
      jyukyusyaBango: 1100012391,
      plandate: '2021/07/11',
      kyotakuJyufuku: '',
      riyoSien1: 1,
      riyoSien2: '',
      keizokuSien1: '',
      keizokuSien2: '',
      tokuteijigyosyo1: 1,
      tiikiseikatusienkyoten: '',
      seisinsyougaisyasientaisei: '',
      koudousyougaisientaisei: '',
      youiryoujisyasientaisei: '',
      syokaikasan: 1,
      taiintaisyoKasan: '',
      iryoHoikuKyouiku: '',
      serviceTantoKaigi: '',
      nyuinjiJyohorenkei: '',
      kyotakukaigoHo: '',
      kyotakukaigoJyo: '',
      total: '',
      bill: '',
      print: '',
      seconds: 1,
      piasaport: 1,
      jyukyosienrenkei: 1,
      tiikiseikatusien: 1,
      syutyusien: '',
      taiintaisyo: '',
      tiikijyukyo: '',
      riyo1: '',
      riyo2: '2',
      syuku1: '3',
      syuku2: '',
      taiseikakuho: 1,
      first: 2,
      second: 1,
      nitijyoseikatu: 1,
      tiikikyojyushien: 2,
    });
    tmp.push({
      receptKakutei: '',
      city: '東経市',
      riyosyaMei: '東経 春美',
      kana: 'ﾊﾙﾐﾄｳｹｲ',
      jyukyusyaBango: 1100012391,
      plandate: '2021/07/11',
      kyotakuJyufuku: '',
      riyoSien1: 1462,
      riyoSien2: '',
      keizokuSien1: '',
      keizokuSien2: '',
      tokuteijigyosyo1: 500,
      tiikiseikatusienkyoten: '',
      seisinsyougaisyasientaisei: '',
      koudousyougaisientaisei: '',
      youiryoujisyasientaisei: '',
      syokaikasan: 300,
      taiintaisyoKasan: '',
      iryoHoikuKyouiku: '',
      serviceTantoKaigi: '',
      nyuinjiJyohorenkei: '',
      kyotakukaigoHo: '',
      kyotakukaigoJyo: '',
      total: 2262,
      bill: 24791,
      print: '',
      seconds: 3062,
      piasaport: 100,
      jyukyosienrenkei: 35,
      tiikiseikatusien: '',
      syutyusien: '',
      taiintaisyo: '',
      tiikijyukyo: '',
      riyo1: '',
      riyo2: '600',
      syuku1: '900',
      syuku2: '',
      taiseikakuho: 306,
      first: 1424,
      second: 95,
      nitijyoseikatu: 1,
      tiikikyojyushien: 2,
    });

    for (let i = 2; i < 4; i++) {
      tmp.push({
        receptKakutei: '',
        city: '東経市' + i,
        riyosyaMei: '東経 サブロウ' + i,
        kana: 'ｻﾌﾞﾛｳﾄｳｹｲ',
        jyukyusyaBango: 1100012390 + i,
        plandate: '2021/07/11',
        kyotakuJyufuku: '',
        riyoSien1: 1,
        riyoSien2: '',
        keizokuSien1: '',
        keizokuSien2: '',
        tokuteijigyosyo1: 1,
        tiikiseikatusienkyoten: '',
        seisinsyougaisyasientaisei: '',
        koudousyougaisientaisei: '',
        youiryoujisyasientaisei: '',
        syokaikasan: 1,
        taiintaisyoKasan: '',
        iryoHoikuKyouiku: '',
        serviceTantoKaigi: '',
        nyuinjiJyohorenkei: '',
        kyotakukaigoHo: '',
        kyotakukaigoJyo: '',
        total: '',
        bill: '',
        print: '',
        seconds: 1,
        piasaport: 1,
        jyukyosienrenkei: 1,
        tiikiseikatusien: 1,
        syutyusien: 1,
        taiintaisyo: 1,
        tiikijyukyo: 1,
        riyo1: '',
        riyo2: '2',
        syuku1: '3',
        syuku2: '',
        taiseikakuho: 1,
        first: 2,
        second: 1,
        nitijyoseikatu: 1,
        tiikikyojyushien: 2,
      });
      tmp.push({
        receptKakutei: '',
        city: '東経市' + i,
        riyosyaMei: '東経 サブロウ' + i,
        kana: 'ｻﾌﾞﾛｳﾄｳｹｲ',
        jyukyusyaBango: 1100012390 + i,
        plandate: '2021/07/11',
        kyotakuJyufuku: '',
        riyoSien1: 600,
        riyoSien2: '',
        keizokuSien1: '',
        keizokuSien2: '',
        tokuteijigyosyo1: 500,
        tiikiseikatusienkyoten: '',
        seisinsyougaisyasientaisei: '',
        koudousyougaisientaisei: '',
        youiryoujisyasientaisei: '',
        syokaikasan: 300,
        taiintaisyoKasan: '',
        iryoHoikuKyouiku: '',
        serviceTantoKaigi: '',
        nyuinjiJyohorenkei: '',
        kyotakukaigoHo: '',
        kyotakukaigoJyo: '',
        total: 1711,
        bill: 18762,
        print: '',
        seconds: 3062,
        piasaport: 100,
        jyukyosienrenkei: 35,
        tiikiseikatusien: 450,
        syutyusien: 500,
        taiintaisyo: 500,
        tiikijyukyo: 2700,
        riyo1: '',
        riyo2: '2100',
        syuku1: '1400',
        syuku2: '',
        taiseikakuho: 306,
        first: '',
        second: '',
        nitijyoseikatu: 500,
        tiikikyojyushien: 150,
      });
    }
    // 並び順をjyukyusyaBango順に変更
    //tmp.sort((a, b) => a.jyukyusyaBango - b.jyukyusyaBango);
    // 利用者名と番号を合わせる
    tmp = this.joinNameBango(tmp);
    // 同じ受給者番号を数える
    this.getSameCounter(tmp);

    this.viewData = tmp;
    this.viewDataAll = tmp;
  },
  data() {
    return {
      displayType: 52,
      calcTotal: {}, // 合計値
      headerheight: 260,
      sameCounts: [],
      frozenPosition: 9,
      flexGrid: [],
      filtered: [], // フィルターデータ
      filteredList: [], // フィルターデータ
      filteredTotal: [], // フィルターデータ
      alertMessageFlag: false, // 変更時のアラートメッセージ
      serviceArgument: '', // ヘッダメニューのサービス選択
      filterSelect: 1, // 絞込SELECTBOX
      alpha: 0,
      selected: 0,
      selectedArray: ['全選択/全解除', '全選択', '全解除'],
      sortSelected: 1,
      sortArray: [
        {
          id: 1,
          text: '受給者番号',
        },
      ],
      citySelected: 0,
      cityArray: [
        {
          id: 0,
          text: '指定無し',
        },
        {
          id: 1,
          text: '東経市',
        },
        {
          id: 2,
          text: '西経市',
        },
      ],
      basicHeaderTitle: [
        'レセプト確定',
        '基本情報',
        '市区町村',
        '利用者名\n(受給者番号)',
      ],
      listHeaderTitle: [
        '基本報酬',
        '計画作成日/\nモニタリング日',
        '居宅重複減',
        '利用支援',
        '継続支援',
        'Ⅰ',
        'Ⅱ',
      ],
      listHeaderTitleFix: ['基本報酬', '体制確保費', '緊急時支援費', 'Ⅰ', 'Ⅱ'],
      listHeaderTitlePlan: ['基本報酬', 'Ⅱ'],
      shisetuHeaderTitle: [
        '施設体制加算',
        '特定事業所Ⅰ',
        '地域生活支援拠点等',
        '精神障碍者支援体制',
        '行動障害支援体制',
        '要医療児童者支援体制',
      ],
      shisetuHeaderTitlePlan: [
        '施設体制加算',
        'ピアサポート体制',
        '居住支援連携体制',
        '地域生活支援拠点等',
      ],
      kobetsuHeaderTitle: [
        '個別加算',
        '初回加算',
        '退院・退所加算',
        '医療・保育教育機関等',
        'サービス担当者会議',
        '入院時情報連携加算',
        '居宅開度支援事業(訪)',
        '居宅開度支援事業(情)',
      ],
      kobetsuHeaderTitleFix: ['日常生活支援情報提供', '地域居住支援体制強化'],
      kobetsuHeaderTitlePlan: [
        '個別加算',
        '初回加算',
        '集中支援加算',
        '退院・退所加算',
        '地域居住支援体制強化',
        '体験利用加算',
        'Ⅰ',
        'Ⅱ',
        '体験宿泊加算',
        'Ⅰ',
        'Ⅱ',
      ],
      totalHeaderTitle: ['合計\n単位数', '請求額', '印刷'],
      basicArray: [
        {
          id: 1,
          binding: 'receptKakutei',
          width: 30,
        },
        {
          id: 2,
          binding: 'city',
          width: 80,
        },
        {
          id: 3,
          binding: 'riyosyaMeiBango',
          width: 120,
        },
      ],
      basicGrid: [],
      viewData: [],
      viewDataAll: [],
      listArray: {
        base: [
          {
            id: 1,
            binding: 'plandate',
            width: 80,
          },
          {
            id: 2,
            binding: 'kyotakuJyufuku',
            width: 30,
          },
          {
            id: 3,
            binding: 'riyoSien1',
            width: 50,
          },
          {
            id: 4,
            binding: 'riyoSien2',
            width: 50,
          },
          {
            id: 5,
            binding: 'keizokuSien2',
            width: 50,
          },
          {
            id: 6,
            binding: 'keizokuSien2',
            width: 50,
          },
        ],
        shisetsu: [
          {
            id: 7,
            binding: 'tokuteijigyosyo1',
            width: 50,
          },
          {
            id: 8,
            binding: 'tiikiseikatusienkyoten',
            width: 50,
          },
          {
            id: 9,
            binding: 'seisinsyougaisyasientaisei',
            width: 50,
          },
          {
            id: 10,
            binding: 'koudousyougaisientaisei',
            width: 50,
          },
          {
            id: 11,
            binding: 'youiryoujisyasientaisei',
            width: 50,
          },
        ],
        kobetsu: [
          {
            id: 12,
            binding: 'syokaikasan',
            width: 50,
          },
          {
            id: 13,
            binding: 'taiintaisyoKasan',
            width: 50,
          },
          {
            id: 14,
            binding: 'iryoHoikuKyouiku',
            width: 50,
          },
          {
            id: 15,
            binding: 'serviceTantoKaigi',
            width: 50,
          },
          {
            id: 16,
            binding: 'nyuinjiJyohorenkei',
            width: 50,
          },
          {
            id: 17,
            binding: 'kyotakukaigoHo',
            width: 50,
          },
          {
            id: 18,
            binding: 'kyotakukaigoJyo',
            width: 50,
          },
        ],
      },
      listArrayPlan: {
        base: [
          {
            id: 1,
            binding: 'seconds',
            width: 80,
          },
        ],
        shisetsu: [
          {
            id: 7,
            binding: 'piasaport',
            width: 80,
          },
          {
            id: 8,
            binding: 'jyukyosienrenkei',
            width: 80,
          },
          {
            id: 9,
            binding: 'tiikiseikatusien',
            width: 80,
          },
        ],
        kobetsu: [
          {
            id: 12,
            binding: 'syokaikasan',
            width: 80,
          },
          {
            id: 13,
            binding: 'syutyusien',
            width: 80,
          },
          {
            id: 14,
            binding: 'taiintaisyo',
            width: 80,
          },
          {
            id: 15,
            binding: 'tiikijyukyo',
            width: 80,
          },
          {
            id: 16,
            binding: 'riyo1',
            width: 80,
          },
          {
            id: 17,
            binding: 'riyo2',
            width: 80,
          },
          {
            id: 18,
            binding: 'syuku1',
            width: 80,
          },
          {
            id: 19,
            binding: 'syuku2',
            width: 80,
          },
        ],
      },
      listArrayFix: {
        base: [
          {
            id: 1,
            binding: 'taiseikakuho',
            width: 80,
          },
          {
            id: 2,
            binding: 'first',
            width: 80,
          },
          {
            id: 3,
            binding: 'second',
            width: 80,
          },
        ],
        shisetsu: [
          {
            id: 7,
            binding: 'piasaport',
            width: 80,
          },
          {
            id: 8,
            binding: 'jyukyosienrenkei',
            width: 80,
          },
          {
            id: 9,
            binding: 'tiikiseikatusien',
            width: 80,
          },
        ],
        kobetsu: [
          {
            id: 12,
            binding: 'nitijyoseikatu',
            width: 80,
          },
          {
            id: 13,
            binding: 'tiikikyojyushien',
            width: 80,
          },
        ],
      },
      listGrid: [],
      listGridPlan: [],
      listGridFix: [],

      totalArray: [
        {
          id: 1,
          binding: 'total',
          width: 60,
          visibleFlag: true,
        },
        {
          id: 2,
          binding: 'bill',
          width: 60,
          visibleFlag: true,
        },
        {
          id: 3,
          binding: 'print',
          width: 30,
          visibleFlag: true,
        },
      ],
      totalGrid: [],
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
      this.displayType = serviceArgument.teikyoCode;
      // if (serviceArgument['search_button']) {
      //   // ユーザ選択の無効化
      //   this.$refs.user_list_print.userCheckInvalide();
      //   this.userDataSelect[0]['riyosyo'] = '';
      //   this.riid = '';
      //   this.mainGrid.columns.clear();
      // }
    },
    parentServiceChange(serviceArgument) {
      this.displayType = serviceArgument.teikyoCode;
      this.teikyoCode = serviceArgument.teikyoCode;
    },
    getSameCounter(tmp) {
      let sameCounts = {};
      for (var i = 0; i < tmp.length; i++) {
        var key = tmp[i].jyukyusyaBango;
        sameCounts[key] = sameCounts[key] ? sameCounts[key] + 1 : 1;
      }
      this.sameCounts = sameCounts;
    },
    joinNameBango(tmp) {
      // tmp.foreach(function (val, key) {
      //   tmp[key].riyosyaMeiBango = val.riyosyaMei + '\n' + val.riyosyaMeiBango;
      // });
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].riyosyaMeiBango =
          tmp[i].riyosyaMei + '\n(' + tmp[i].jyukyusyaBango + ')';
      }
      return tmp;
    },
    onInitializedTotal(totalGrid) {
      this.totalGrid = totalGrid;
      this.totalHeader();
      totalGrid.columnHeaders.rows[1].height = headerHeight;

      this.calcAllPoint();
    },
    calcAllPoint() {
      let total = 0;
      let bill = 0;
      this.viewData.map(function (value) {
        if (value.total) {
          total += value.total;
        }
        if (value.bill) {
          bill += value.bill;
        }
      });
      var panel = this.totalGrid.columnFooters;
      panel.setCellData(0, 0, total);
      panel.setCellData(0, 1, bill);
    },
    totalHeader() {
      var panel = this.totalGrid.columnHeaders;
      panel.rows.insert(0, new wjGrid.Row());
      panel.setCellData(0, 0, this.totalHeaderTitle[0]);
      panel.setCellData(0, 1, this.totalHeaderTitle[1]);
      panel.setCellData(0, 2, this.totalHeaderTitle[2]);

      let headerRanges = [];
      headerRanges.push(
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2)
      );

      // フッタ
      panel = this.totalGrid.columnFooters;
      panel.rows.insert(0, new wjGrid.Row());
      panel.rows.insert(1, new wjGrid.Row());

      let footerRanges = [];
      footerRanges.push(
        new wjGrid.CellRange(0, 0, 1, 0),
        new wjGrid.CellRange(0, 1, 1, 1),
        new wjGrid.CellRange(0, 2, 1, 2)
      );

      // セルをマージ
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      this.totalGrid.mergeManager = mm;
    },
    /*************************
     * 基本報酬
     */
    onInitializedListFix(listGridFix) {
      this.listGridFix = listGridFix;
      this.listHeaderFix();
      listGridFix.columnHeaders.rows[2].height = headerHeightList;
      // 合計値の計算
      this.calcTotalPoint('base', 0, this.listArrayFix);
      this.calcTotalPoint('shisetsu', 3, this.listArrayFix);
      this.calcTotalPoint('kobetsu', 6, this.listArrayFix);
    },
    onInitializedList(listGrid) {
      this.listGrid = listGrid;
      this.listHeader();
      listGrid.columnHeaders.rows[2].height = headerHeightList;
      // 合計値の計算
      this.calcTotalPoint('base', 2);
      this.calcTotalPoint('shisetsu', 6);
      this.calcTotalPoint('kobetsu', 11);
    },
    onInitializedListPlan(listGridPlan) {
      this.listGridPlan = listGridPlan;
      this.listHeaderPlan();
      listGridPlan.columnHeaders.rows[2].height = headerHeightList;
      // // 合計値の計算
      this.calcTotalPoint('base', 0, this.listArrayPlan);
      this.calcTotalPoint('shisetsu', 1, this.listArrayPlan);
      this.calcTotalPoint('kobetsu', 4, this.listArrayPlan);
    },

    /********************
     * 合計値の計算
     * type:配列のキー
     * 記述開始位置
     */
    calcTotalPoint(type, st, data = this.listArray) {
      let upper = [];
      let bottom = [];
      let _self = this;
      data[type].map(function (val, k) {
        // 基本情報の時のみ1より大きい値から取得
        if (k > 1 || st != 2) {
          let up = 0;
          let bm = 0;
          _self.viewData.map(function (value, key) {
            if (key % 2 == 0) {
              up += Number(value[val.binding]);
            }
            if (key % 2 == 1) {
              bm += Number(value[val.binding]);
            }
          });
          upper.push(up);
          bottom.push(bm);
        }
      });
      // 値の記載
      this.settingTotalData(upper, bottom, st);
    },
    settingTotalData(upper, bottom, startPos) {
      let _self = this;
      let st = startPos;
      upper.map(function (value) {
        _self.listGrid.columnFooters.setCellData(
          0,
          st,
          value == 0 ? '' : value
        );
        st++;
      });
      st = startPos;
      bottom.map(function (value) {
        _self.listGrid.columnFooters.setCellData(
          1,
          st,
          value == 0 ? '' : value
        );
        st++;
      });
    },
    listHeaderFix() {
      var panel = this.listGridFix.columnHeaders;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }
      panel.setCellData(0, 0, this.listHeaderTitleFix[0]);
      panel.setCellData(1, 0, this.listHeaderTitleFix[1]);
      panel.setCellData(1, 1, this.listHeaderTitleFix[2]);
      panel.setCellData(2, 1, this.listHeaderTitleFix[3]);
      panel.setCellData(2, 2, this.listHeaderTitleFix[4]);
      panel.setCellData(0, 3, this.shisetuHeaderTitlePlan[0]);
      panel.setCellData(1, 3, this.shisetuHeaderTitlePlan[1]);
      panel.setCellData(1, 4, this.shisetuHeaderTitlePlan[2]);
      panel.setCellData(1, 5, this.shisetuHeaderTitlePlan[3]);
      panel.setCellData(0, 6, this.kobetsuHeaderTitlePlan[0]);
      panel.setCellData(1, 6, this.kobetsuHeaderTitleFix[0]);
      panel.setCellData(1, 7, this.kobetsuHeaderTitleFix[1]);

      // 上部ヘッダの結合
      let headerRanges = [];
      let bodyRanges = [];

      headerRanges.push(
        new wjGrid.CellRange(0, 0, 0, 2),
        new wjGrid.CellRange(1, 0, 2, 0),
        new wjGrid.CellRange(1, 1, 1, 2),
        new wjGrid.CellRange(0, 3, 0, 5),
        new wjGrid.CellRange(0, 6, 0, 7),
        new wjGrid.CellRange(1, 3, 2, 3),
        new wjGrid.CellRange(1, 4, 2, 4),
        new wjGrid.CellRange(1, 5, 2, 5),
        new wjGrid.CellRange(1, 6, 2, 6),
        new wjGrid.CellRange(1, 7, 2, 7)
      );

      // フッタ
      panel = this.listGridFix.columnFooters;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }

      this.createMerge(headerRanges, bodyRanges);
    },
    listHeaderPlan() {
      var panel = this.listGridPlan.columnHeaders;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }
      panel.setCellData(0, 0, this.listHeaderTitlePlan[0]);
      panel.setCellData(1, 0, this.listHeaderTitlePlan[1]);
      panel.setCellData(0, 1, this.shisetuHeaderTitlePlan[0]);
      panel.setCellData(1, 1, this.shisetuHeaderTitlePlan[1]);
      panel.setCellData(1, 2, this.shisetuHeaderTitlePlan[2]);
      panel.setCellData(1, 3, this.shisetuHeaderTitlePlan[3]);
      panel.setCellData(0, 4, this.kobetsuHeaderTitlePlan[0]);
      panel.setCellData(1, 4, this.kobetsuHeaderTitlePlan[1]);
      panel.setCellData(1, 5, this.kobetsuHeaderTitlePlan[2]);
      panel.setCellData(1, 6, this.kobetsuHeaderTitlePlan[3]);
      panel.setCellData(1, 7, this.kobetsuHeaderTitlePlan[4]);
      panel.setCellData(1, 8, this.kobetsuHeaderTitlePlan[5]);
      panel.setCellData(2, 8, this.kobetsuHeaderTitlePlan[6]);
      panel.setCellData(2, 9, this.kobetsuHeaderTitlePlan[7]);
      panel.setCellData(1, 10, this.kobetsuHeaderTitlePlan[8]);
      panel.setCellData(2, 10, this.kobetsuHeaderTitlePlan[9]);
      panel.setCellData(2, 11, this.kobetsuHeaderTitlePlan[10]);
      // 上部ヘッダの結合
      let headerRanges = [];
      let bodyRanges = [];

      headerRanges.push(
        new wjGrid.CellRange(1, 0, 2, 0),
        new wjGrid.CellRange(0, 1, 0, 3),
        new wjGrid.CellRange(1, 1, 2, 1),
        new wjGrid.CellRange(1, 2, 2, 2),
        new wjGrid.CellRange(1, 3, 2, 3),
        new wjGrid.CellRange(0, 4, 0, 11),
        new wjGrid.CellRange(1, 4, 2, 4),
        new wjGrid.CellRange(1, 5, 2, 5),
        new wjGrid.CellRange(1, 6, 2, 6),
        new wjGrid.CellRange(1, 7, 2, 7),
        new wjGrid.CellRange(1, 8, 1, 9),
        new wjGrid.CellRange(1, 10, 1, 11)
      );

      // フッタ
      panel = this.listGridPlan.columnFooters;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }

      this.createMerge(headerRanges, bodyRanges);
    },
    listHeader() {
      var panel = this.listGrid.columnHeaders;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }
      panel.setCellData(0, 0, this.listHeaderTitle[0]);

      panel.setCellData(1, 0, this.listHeaderTitle[1]);
      panel.setCellData(1, 1, this.listHeaderTitle[2]);
      panel.setCellData(1, 2, this.listHeaderTitle[3]);
      panel.setCellData(1, 4, this.listHeaderTitle[4]);
      panel.setCellData(2, 2, this.listHeaderTitle[5]);
      panel.setCellData(2, 3, this.listHeaderTitle[6]);
      panel.setCellData(2, 4, this.listHeaderTitle[5]);
      panel.setCellData(2, 5, this.listHeaderTitle[6]);
      panel.setCellData(0, 6, this.shisetuHeaderTitle[0]);
      panel.setCellData(1, 6, this.shisetuHeaderTitle[1]);
      panel.setCellData(1, 7, this.shisetuHeaderTitle[2]);
      panel.setCellData(1, 8, this.shisetuHeaderTitle[3]);
      panel.setCellData(1, 9, this.shisetuHeaderTitle[4]);
      panel.setCellData(1, 10, this.shisetuHeaderTitle[5]);
      panel.setCellData(0, 11, this.kobetsuHeaderTitle[0]);
      panel.setCellData(1, 11, this.kobetsuHeaderTitle[1]);
      panel.setCellData(1, 12, this.kobetsuHeaderTitle[2]);
      panel.setCellData(1, 13, this.kobetsuHeaderTitle[3]);
      panel.setCellData(1, 14, this.kobetsuHeaderTitle[4]);
      panel.setCellData(1, 15, this.kobetsuHeaderTitle[5]);
      panel.setCellData(1, 16, this.kobetsuHeaderTitle[6]);
      panel.setCellData(1, 17, this.kobetsuHeaderTitle[7]);

      // 上部ヘッダの結合
      let headerRanges = [];

      headerRanges.push(
        new wjGrid.CellRange(0, 0, 0, 5),
        new wjGrid.CellRange(1, 0, 2, 0),
        new wjGrid.CellRange(1, 1, 2, 1),
        new wjGrid.CellRange(1, 2, 1, 3),
        new wjGrid.CellRange(1, 4, 1, 5),
        new wjGrid.CellRange(0, 6, 0, 10),
        new wjGrid.CellRange(1, 6, 2, 6),
        new wjGrid.CellRange(1, 7, 2, 7),
        new wjGrid.CellRange(1, 8, 2, 8),
        new wjGrid.CellRange(1, 9, 2, 9),
        new wjGrid.CellRange(1, 10, 2, 10),
        new wjGrid.CellRange(0, 11, 0, 17),
        new wjGrid.CellRange(1, 11, 2, 11),
        new wjGrid.CellRange(1, 12, 2, 12),
        new wjGrid.CellRange(1, 13, 2, 13),
        new wjGrid.CellRange(1, 14, 2, 14),
        new wjGrid.CellRange(1, 15, 2, 15),
        new wjGrid.CellRange(1, 16, 2, 16),
        new wjGrid.CellRange(1, 17, 2, 17)
      );

      let bodyRanges = [];
      let r = 0;
      let _self = this;
      Object.keys(this.sameCounts).forEach(function (val) {
        let plus = _self.sameCounts[val] - 1 + r;
        bodyRanges.push(new wjGrid.CellRange(r, 0, plus, 0));
        bodyRanges.push(new wjGrid.CellRange(r, 1, plus, 1));
        r = r + 2;
      });
      // フッタ
      panel = this.listGrid.columnFooters;
      if (panel.rows.length < 2) {
        panel.rows.insert(0, new wjGrid.Row());
        panel.rows.insert(1, new wjGrid.Row());
      }
      panel.setCellData(0, 0, '人数');
      panel.setCellData(1, 0, '単位数');
      this.createMerge(headerRanges, bodyRanges);
    },
    createMerge(headerRanges = [], bodyRanges = []) {
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }
      };
      this.listGrid.mergeManager = mm;
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
    },
    filterInitializedList(filter) {
      this.filteredList = filter;
    },
    filterInitializedTotal(filter) {
      this.filteredTotal = filter;
    },
    /*********************************
     * 基本情報
     */
    onInitializedBasic(basicGrid) {
      this.basicGrid = basicGrid;

      this.basicHeader();
      basicGrid.columnHeaders.rows[1].height = headerHeight;

      //フィルタ表示切替
      basicGrid.addEventListener(basicGrid.hostElement, 'mouseover', () => {
        this.filtered.showFilterIcons = true;
      });
      basicGrid.addEventListener(basicGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });
    },
    basicHeader() {
      var panel = this.basicGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.setCellData(0, 0, this.basicHeaderTitle[0]);
      panel.setCellData(0, 1, this.basicHeaderTitle[1]);
      panel.setCellData(1, 1, this.basicHeaderTitle[2]);
      panel.setCellData(1, 2, this.basicHeaderTitle[3]);
      // 上部ヘッダの結合
      let headerRanges = [];
      headerRanges.push(new wjGrid.CellRange(0, 0, 1, 0));
      headerRanges.push(new wjGrid.CellRange(0, 1, 0, 2));
      let bodyRanges = [];
      let r = 0;
      let _self = this;
      Object.keys(this.sameCounts).forEach(function (val) {
        let plus = _self.sameCounts[val] - 1 + r;

        bodyRanges.push(new wjGrid.CellRange(r, 0, plus, 0));
        bodyRanges.push(new wjGrid.CellRange(r, 1, plus, 1));
        bodyRanges.push(new wjGrid.CellRange(r, 2, plus, 2));
        r = r + 2;
      });

      // フッタ
      panel = this.basicGrid.columnFooters;
      panel.rows.insert(0, new wjGrid.Row());
      panel.rows.insert(1, new wjGrid.Row());
      panel.setCellData(0, 0, '合計');

      let footerRanges = [];
      footerRanges = [new wjGrid.CellRange(0, 0, 1, 2)];
      // セルをマージ
      let mm = new wjGrid.MergeManager();
      mm.getMergedRange = function (panel, r, c) {
        if (panel.cellType == wjGrid.CellType.ColumnHeader) {
          for (let h = 0; h < headerRanges.length; h++) {
            if (headerRanges[h].contains(r, c)) {
              return headerRanges[h];
            }
          }
        }
        if (panel.cellType == wjGrid.CellType.Cell) {
          for (let h = 0; h < bodyRanges.length; h++) {
            if (bodyRanges[h].contains(r, c)) {
              return bodyRanges[h];
            }
          }
        }

        if (panel.cellType == wjGrid.CellType.ColumnFooter) {
          for (let h = 0; h < footerRanges.length; h++) {
            if (footerRanges[h].contains(r, c)) {
              return footerRanges[h];
            }
          }
        }
      };
      this.basicGrid.mergeManager = mm;
    },

    onFormatItemListFix(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.row == 0) {
          e.cell.style.textAlign = 'center';
          e.cell.style.alignItems = 'center';
        }

        if (e.row == 1) {
          if (e.col != 1) {
            e.cell.style.writingMode = 'vertical-rl';
          }

          this.onJustifyCenterMiddle(e);
          if (e.col >= 3) {
            e.cell.style.justifyContent = 'left';
            e.cell.style.textAlign = 'left';
          }
        }
        if (e.row == 2) {
          this.onJustifyCenterMiddle(e);
        }

        if (e.col < 3) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
        if (e.col >= 3) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        e.cell.style.fontWeight = 'normal';
      }
    },
    onFormatItemListPlan(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.row == 0) {
          e.cell.style.textAlign = 'center';
          e.cell.style.alignItems = 'center';
        }
        if (e.row == 1) {
          if (e.col >= 1 && e.col <= 7) {
            e.cell.style.writingMode = 'vertical-rl';
            e.cell.style.justifyContent = 'left';
            e.cell.style.textAlign = 'left';
          }
          e.cell.style.display = 'flex';
          if (e.col == 0) {
            this.onJustifyCenterMiddle(e);
          }
          if (e.col >= 8) {
            e.cell.style.textAlign = 'center';
            e.cell.style.display = 'block';
          }
        }
        if (e.row == 2) {
          this.onJustifyCenterMiddle(e);
        }
        e.cell.style.alignItems = 'center';

        if (e.col == 0) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
        if (e.col > 0) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        e.cell.style.fontWeight = 'normal';
      }
    },
    onFormatItemList(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if (e.col >= this.listArray.base.length) {
          if (e.row == 1) {
            e.cell.style.writingMode = 'vertical-rl';
            e.cell.style.display = 'flex';
          } else {
            e.cell.style.textAlign = 'center';
          }
          e.cell.style.alignItems = 'center';
        } else {
          this.onJustifyCenterMiddle(e);
        }
        // 基本報酬
        if (e.col < this.listHeaderTitle.length - 1) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundGreen;
        }
        // 施設体制加算
        if (e.col >= this.listHeaderTitle.length - 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundBlue;
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      }

      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        if (e.col == 0) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundYellow;
          this.onJustifyCenterMiddle(e);
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }
        e.cell.style.textAlign = 'right';
        e.cell.style.fontWeight = 'normal';
      }
    },
    itemsSourceChanged(flexGrid) {
      this.listGrid = flexGrid;
      this.calcTotalPoint('base', 2);
      this.calcTotalPoint('shisetsu', 6);
      this.calcTotalPoint('kobetsu', 11);
    },
    itemsSourceChangedTotal(flexGrid) {
      this.totalGrid = flexGrid;
      this.calcAllPoint();
    },
    onFormatItemBasic(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        this.onJustifyCenterMiddle(e);
        if (e.col == 0) {
          e.cell.style.backgroundColor =
            sysConst.COLOR.viewTitleBackgroundOrangeDark;
          e.cell.style.color = sysConst.COLOR.viewTitleFontColorOrange;
        } else {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.backgroundColor = sysConst.COLOR.viewTitleBackgroundYellow;
        this.onJustifyCenterMiddle(e);
      }
      //let tmp = e.panel.rows[e.row].dataItem;

      // フィルターカラムの非表示設定
      if (e.col == 0) {
        var Nonefilter = this.filtered.getColumnFilter(e.col);
        Nonefilter.filterType = 'None';
      }
    },
    onFormatItemTotal(flexGrid, e) {
      let tmp = e.panel.rows[e.row].dataItem;
      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        this.onJustifyCenterMiddle(e);
        if (e.col < this.totalHeaderTitle.length - 1) {
          e.cell.style.backgroundColor = sysConst.COLOR.gridTotalBackground;
        }
      }
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col < this.totalHeaderTitle.length - 1) {
          e.cell.style.textAlign = 'right';
          e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        }

        // 空欄は下線を消す
        if (tmp.total == '') {
          e.cell.style.borderBottom = 'none';
        }
      }
      if (e.panel.cellType == wjGrid.CellType.ColumnFooter) {
        e.cell.style.backgroundColor = sysConst.COLOR.lightYellow;
        e.cell.style.textAlign = 'right';
        e.cell.style.justifyContent = 'right';
        e.cell.style.alignItems = 'end';
        e.cell.style.display = 'flex';
      }
    },
    onJustifyCenterMiddle(e) {
      e.cell.style.textAlign = 'center';
      e.cell.style.justifyContent = 'center';
      e.cell.style.alignItems = 'center';
      e.cell.style.display = 'flex';
    },
    /*********************
     * フィルターのクリア
     */
    filterClear() {
      this.filtered.clear();
    },
    /*********************
     * フィルタリングを行った後に実行
     * 合計値の計算
     */
    filterApplied(e) {
      this.filteredList.filterDefinition = e.filterDefinition;
      this.filteredTotal.filterDefinition = e.filterDefinition;

      this.calcTotalPointFilter('base', 2);
      this.calcTotalPointFilter('shisetsu', 6);
      this.calcTotalPointFilter('kobetsu', 11);
    },
    calcTotalPointFilter(type, st) {
      let _self = this;
      let upper = [];
      let bottom = [];
      this.listArray[type].map(function (val, k) {
        // 基本情報の時のみ1より大きい値から取得
        if (k > 1 || st != 2) {
          let up = 0;
          let bm = 0;
          _self.listGrid.rows.map(function (value, key) {
            if (key % 2 == 0) {
              up += value.dataItem[val.binding];
            }
            if (key % 2 == 1) {
              bm += value.dataItem[val.binding];
            }
          });
          upper.push(up);
          bottom.push(bm);
        }
      });
      // 値の記載
      this.settingTotalData(upper, bottom, st);
    },
    /**************************
     * アルファベット
     */
    onAlphabetical(alpha) {
      this.alpha = alpha;
      this.userFilter();
    },

    userFilter() {
      let tmpviewdata = this.viewDataAll;
      tmpviewdata = this.$refs.alp.alphabetFilter(tmpviewdata, 'kana');
      // 市町村
      let obj = this.cityArray.find((v) => v.id == this.citySelected);
      let cityid = obj.id;
      let city = obj.text;
      let result = tmpviewdata.filter((value) => value.city == city || !cityid);

      this.viewData = [...result];
    },

    /******************
     * 市町村選択
     */
    onCitySelect() {
      this.userFilter();
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
div#KasanKomoku {
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
      width: 180px;
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
  #basicGrid {
    border-radius: 4px 0px 0px 4px;
  }
  #listGrid {
    max-width: 800px;
    border-radius: 0px;
  }
  #listGridPlan {
    max-width: 800px;
    border-radius: 0px;
  }
  #listGridFix {
    max-width: 800px;
    border-radius: 0px;
  }
  #totalGrid {
    border-radius: 0px 4px 4px 0px;
  }
}
</style>
