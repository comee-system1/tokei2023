<template>
  <v-app>
    <v-main>
      <HeaderAndNav @parent-ymd-select="getSelectYmdComponent"> </HeaderAndNav>
      <router-view :key="$route.fullPath">
        :selectedData="selectedData"></router-view
      >
    </v-main>
  </v-app>
</template>

<script>
import HeaderAndNav from './components/HeaderAndNav';
import * as wjcCore from '@grapecity/wijmo';
// 下が抜けるとgridがUnknown custom elementエラーとなる
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/activereports/styles/ar-js-ui.css';
import '@grapecity/activereports/styles/ar-js-viewer.css';
import '@grapecity/activereports/pdfexport';
import '@grapecity/activereports/htmlexport';
import '@grapecity/activereports/xlsxexport';
import '@grapecity/activereports-localization';

// 開発用
// wjcCore.setLicenseKey(
//   '692771655227224#B0hNLbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPnNDbxQWaLJkU5tkZ7VGUnRnUG3GcDJXUKZjVrc6azRDb5EmZIREeFRHNroUO8hHSzV6Tjd5UylnVPFXbJVUe7NVeZNWc7YXUElnNRd7cIFmaqtiaalGaxMDaBt4TPZ5LWJ4dYZGOYN5U6sCcr5WM7UGc9IVezkUTmN4QOR5TvIkaHp7Sy86Uq3kSEh4K03iahl4ZX3GV9ZVb9kzbXpXQkt6KrEFStdWOoNnN72Cbwp6M486VYZjd5Y6Zx2mYQpFNShzbHNzcahWbrdVaxMnUaZkRxlmerIEexVXVLpmQ53EMkN4U8YUSl3EOQpnURJVVxZTa9Vna5xUSHl5djplVrNFejtCVDVnbFJETwQ6LUtyVwEVbQJUN4BXSOhGZsJ5QhRXTVh6duZnThp4ZXF4a84mVqhEOJpXaVpVS4YTOMFmclBnNOdGZ5IXRuh5cTlUOTdkWqFmYiojITJCLigjMzQUQERkI0ICSiwCNwMTM6UzMyYTM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiczMxEjMwASOxETMxIDMyIiOiQncDJCLiEjLw8CMucjMxIiOiMXbEJCLi8LpnrJvk/IvlrKomPqgjb8gjfrgjf9gjz1gjz0gjDrgjLiOiEmTDJCLiQjMycjMyUTN6EzN7ITO6IiOiQWSiwSfdtlOicGbmJCLiMjdxIDMyIiOiIXZcJ5L'
// );
// 配布用（配布用で開発も可）
wjcCore.setLicenseKey(
  't-sct1wb00.fukushikenbunroku.com,298536378579113#B0IMJojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zZxQjehZ6Yy34LKJ4T7VXS7A5L9w6RzN4M8MTTCNXS0t6KL3iUDFVTuBFVz2GR8RkRBV4TnBVcZJEaxp4Vuh7KnNnRCJ5VGF4Sjdme8lnboVVMW34aD5EOxQVV8EDbzc7KoRWTTZlWUV7Mlt4UvIjNOlDWFF4LHZGZ6QlY54kYrlXTTdja6lkcGNmbGZlV98EWjF6SmJHZtFncNhESvFjTMN4cqFET4ZFOGJ5RKtCZQFDdlhlbURnZlh5ZyYlWDV5SGlUSxckYPl7TXVne7VlTYFlTxUXOWlGe0Vzd5EFMYFTYplVYWtGTRR7RuF5KJBld9llb8ZkWYVWMstUQKhVRNNjSQNWbmxkMwZFS8skeUF5Q8ATM9o6QtFzSWp4ZPlWVqdWYIFkQlxEV5hGMxoHWOhDblJHUDRWUsZ6NwEnRG9ER52GRRFGcuNXYV9kM6YHRQZXUUllI0IyUiwiIGNjR8UzQycjI0ICSiwCNyQzN6kDN4AjM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiATNzEDOwASOwITMyIDMyIiOiQncDJCLi46bj9Sdr3mcuVnYuV6aph6c5tWdm9CMwI6dxQ7Yz5CdiojIz5GRiwiIgO88GO889K887K88MW19x6p9+S09ayL9Pyb9qCq9iojIh94QiwiIzETM9cTN8czM6MTN8kjMiojIklkIs4XXbpjInxmZiwiIxYYMNA'
);
export default {
  name: 'App',
  components: {
    HeaderAndNav,
  },
  data() {
    return {
      selectedData: {},
    };
  },
  mounted() {
    document.onkeydown = function (e) {
      // ボタンにフォーカスがある状態で、エンターキーだったら無効にする（APIを連続で呼ばせない）
      if (e.target.type == 'button' && e.key === 'Enter') {
        return false;
      }
    };
  },
  methods: {
    // 左メニューで作成されたユーザ一覧の取得を行う
    getSelectYmdComponent(data) {
      this.selectedData = data;
    },
  },
};
</script>
