<template>
  <div id="UketukeSansho">
    <div class="commonTab">
      <v-container no-gutters fluid class="pa-0">
        <v-tabs hide-slider v-model="tab">
          <v-tab
            v-for="item in getMenuItem()"
            :key="item.val"
            :href="item.href"
            @change="tabsChange(item.hrefval)"
          >
            {{ getMenuTxt(item.hrefval) }}
          </v-tab>
        </v-tabs>
      </v-container>
      <v-container no-gutters fluid class="pa-0">
        <v-tabs-items v-model="tab">
          <v-tab-item value="Sansyo" transition="none">
            <UketukeIcrn ref="uketukeIcrn"></UketukeIcrn>
          </v-tab-item>
          <v-tab-item value="SoudanCount" transition="none">
            <SoudanCount ref="soudanCount"></SoudanCount>
          </v-tab-item>
          <v-tab-item value="SoudanCountUtiwake" transition="none">
            <SoudanCountUtiwake ref="soudanCountUtiwake"></SoudanCountUtiwake>
          </v-tab-item>
          <v-tab-item value="SoudanCountMonthly" transition="none">
            <SoudanCountMonthly ref="soudanCountMonthly"></SoudanCountMonthly>
          </v-tab-item>
          <!-- <v-tab-item value="RiyouCheck" transition="none">
            Tab 5 Content
          </v-tab-item> -->
        </v-tabs-items>
      </v-container>
    </div>
  </div>
</template>

<script>
import UketukeIcrn from '../../components/UketukeIcrn.vue';
import SoudanCount from '../../components/SoudanCount.vue';
import SoudanCountUtiwake from '../../components/SoudanCountUtiwake.vue';
import SoudanCountMonthly from '../../components/SoudanCountMonthly.vue';
import ls from '@/utiles/localStorage';
export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UketukeIcrn,
    SoudanCount,
    SoudanCountUtiwake,
    SoudanCountMonthly,
  },
  data: function () {
    return {
      tab: ls.getlocalStorageEncript(ls.KEY.SansyoTab), // タブの初期状態
      menuItem: [
        { name: '相談一覧', href: '#Sansyo', hrefval: 'Sansyo' },
        { name: '相談件数', href: '#SoudanCount', hrefval: 'SoudanCount' },
        {
          name: '件数内訳',
          href: '#SoudanCountUtiwake',
          hrefval: 'SoudanCountUtiwake',
        },
        {
          name: '業務実績表',
          href: '#SoudanCountMonthly',
          hrefval: 'SoudanCountMonthly',
        },
        // { name: '利用チェック', href: '#RiyouCheck', hrefval: 'RiyouCheck' },
      ],
    };
  },
  mounted() {
    if (this.$route.params.kind == 0) {
      this.tab = this.menuItem[0].hrefval;
    } else {
      this.tab = this.menuItem[1].hrefval;
    }
  },
  beforeDestroy() {
    this.$router.app.$off('print_event_global');
  },
  watch: {
    selectedData() {
      // 子供に受け渡すだけ
    },
  },
  methods: {
    getMenuItem() {
      let menuList = [];
      for (let i = 0; i < this.menuItem.length; i++) {
        if (this.$route.params.kind == 0) {
          if (this.menuItem[i].hrefval == 'Sansyo') {
            menuList.push(this.menuItem[i]);
          }
        } else {
          if (
            this.menuItem[i].hrefval != 'Sansyo' &&
            !(
              this.$route.params.kind == 1 &&
              this.menuItem[i].hrefval == 'SoudanCountMonthly'
            )
          ) {
            menuList.push(this.menuItem[i]);
          }
        }
      }
      return menuList;
    },
    getMenuTxt(hrefval) {
      for (let i = 0; i < this.menuItem.length; i++) {
        if (this.menuItem[i].hrefval == hrefval) {
          if (
            this.menuItem[i].hrefval == 'SoudanCount' &&
            this.$route.params.kind == 2
          ) {
            return '相談月年報';
          }
          return this.menuItem[i].name;
        }
      }
      return '';
    },
    tabsChange(hrefval) {
      this.$router.app.$off('print_event_global');
      ls.setlocalStorageEncript(ls.KEY.SansyoTab, hrefval);
      if (hrefval == this.menuItem[0].hrefval) {
        if (this.$refs.uketukeIcrn != null) {
          this.$refs.uketukeIcrn.setPrintEvent();
        }
      } else if (hrefval == this.menuItem[1].hrefval) {
        if (this.$refs.soudanCount != null) {
          this.$refs.soudanCount.setPrintEvent();
        }
      } else if (hrefval == this.menuItem[2].hrefval) {
        if (this.$refs.soudanCountUtiwake != null) {
          this.$refs.soudanCountUtiwake.setPrintEvent();
        }
      }
    },
  },
};
</script>

<style  lang="scss">
@import '@/assets/scss/common.scss';
div#UketukeSansho {
  color: $font_color;
  font-size: 14px;
  font-family: 'メイリオ';
  // overflow-x: scroll;
  // width: 1366px !important;
  min-width: 1300px !important;
  max-width: 1920px;
  width: auto;
}
</style>
