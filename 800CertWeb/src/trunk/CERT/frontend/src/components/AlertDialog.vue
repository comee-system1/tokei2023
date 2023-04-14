<template>
  <v-dialog
    :width="width"
    v-model="dialogAccountFlag"
    no-click-animation
    persistent
    id="alertAreaBox"
  >
    <v-card class="alertArea" :class="{ onMail: sendToMail }">
      <h5 v-if="message">{{ message }}</h5>
      <v-btn class="pa-0" @click="dialogAccountFlag = false">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </v-card>
    <v-card v-if="submessage" :class="`${height}`">
      <div class="submessage">
        <p>{{ submessage }}</p>
      </div>
      <div class="submessageThd" v-if="submessageThd">
        <p>{{ submessageThd }}</p>
      </div>
      <div class="box">
        <ul>
          <li v-for="value in sendToMail" :key="value">{{ value }}</li>
        </ul>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // message:"ダイアログに表示するメッセージ"
  // width:"ダイアログの幅"
  // args:"関数からの戻り値 どのタグを使ったかの目印になる想定"
  props: [
    'message',
    'submessage',
    'submessageThd',
    'height',
    'width',
    'args',
    'sendToMail',
  ],
  data() {
    return {
      dialogAccountFlag: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.dialogAccountFlag = false;
    }, 10000);
  },
  methods: {},
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

%checkCircleImage {
  border: none;
  background-color: $dialog_green;
  padding-left: 50px;
  background-image: url('@/assets/checkCircle.png');
  background-size: 30px 30px;
  background-position: 8px 50%;
}

$buttonSize: 20px;
#alertAreaBox {
  padding: 0px;
  margin: 20px;
  .v-overlay {
    &__scrim {
      position: static;
    }
  }
  .v-overlay__content {
    top: 0;
    left: auto;
    right: 0;
  }
  .v-card {
    box-shadow: none;
  }
}
.v-overlay__content {
  .alertArea {
    &.onMail {
      border-radius: 6px 6px 0px 0px;
      box-shadow: 0px -1px 10px 1px #777777 !important;
    }
  }
  .v-card {
    &.tall {
      border-radius: 0px 0px 6px 6px;
    }
  }
}

.alertArea {
  @extend %checkCircleImage;
  background-repeat: no-repeat;

  padding: 8px;
  background-color: $dialog_green;
  box-shadow: 0px -1px 10px 1px #777777 !important;

  h5 {
    color: $white;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    line-height: 30px;
    padding-left: 40px;
  }

  button {
    width: $buttonSize;
    min-width: $buttonSize;
    height: $buttonSize !important;
    min-height: $buttonSize;
    padding: 0;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: auto;
    right: 10px;
  }
}
.tall {
  // height: 180px;
  background-color: $dialog_green;
  box-shadow: 0px 18px 30px 1px #777777 !important;
  padding-bottom: 8px;
  .submessage {
    color: $white;
    padding: 0 8px 8px 8px;
    font-size: 14px;
  }
  .submessageThd {
    color: $white;
    padding-left: 8px;
    font-size: 12px;
  }
  .box {
    background-color: $selected_color;
    width: 96%;
    margin: 0 auto;
    ul {
      padding: 10px 30px;
      font-size: 14px;
    }
  }
}
</style>
