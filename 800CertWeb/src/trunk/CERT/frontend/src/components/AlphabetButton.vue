<template>
  <v-btn-toggle class="flex-wrap alphabet" v-model="alphaSearch" mandatory>
    <v-btn
      outlined
      elevation="1"
      v-for="(n, k) in alphabet"
      :key="n"
      :min-width="24"
      :height="24"
      class="pa-0"
      @click="onAlphabet(k)"
      style="border-width: 1px"
    >
      {{ n }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import ls from '@/utiles/localStorage';
import alphabetFilter from '@/utiles/alphabetFilter';
export default {
  data() {
    return {
      alphabet: [
        '全',
        'ア',
        'カ',
        'サ',
        'タ',
        'ナ',
        'ハ',
        'マ',
        'ヤ',
        'ラ',
        'ワ',
      ],
      alphaSearch: 0,
    };
  },
  mounted() {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      this.alphaSearch = Number(ls.getlocalStorageEncript(ls.KEY.Alphabet));
    });
  },
  methods: {
    /************
     * アルファベットの絞り込み
     */
    onAlphabet(key) {
      this.alphaSearch = key;
      ls.setlocalStorageEncript(ls.KEY.Alphabet, Number(key));
      this.$emit('onAlphabetical', key);
    },
    alphabetFilter(array, search = '') {
      return alphabetFilter.alphabetFilter(array, this.alphaSearch, search);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';
.alphabet {
  button {
    &.v-btn {
      &--active {
        background-color: $view_Title_font_color_Blue;
        color: $white;
      }
    }
  }
}
</style>
