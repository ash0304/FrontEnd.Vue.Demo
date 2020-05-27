<template>
  <div v-if="modalShow" class="hint-modal-bg" @click.self="modalShow = false">
    <div class="hint-modal" :class="{'bounce-in': effectShow, 'bounce-out': !effectShow}">
      <div class="close-btn pointer" @click.self="modalShow = false"></div>
      <div class="hint-title">{{ $t('modal.hint') }}</div>
      <div class="hint-body">
        <div>{{ text }}</div>
      </div>
      <div class="confirm-btn pointer" @click="modalClose">{{ $t('modal.confirm') }}</div>
    </div>
  </div>
</template>
<script>
import ModalHint from '../../utils/HintModal'

export default {
  name: 'HintModal',
  data() {
    return {
      modalShow: false,
      effectShow: false,
      text: '',
      isDoubleModal: false,
      callbackFncAfterModalClose: null
    }
  },
  beforeMount() {
    ModalHint.EventBus.$on('show', params => {
      this.modalOpen(params)
    })
  },
  methods: {
    modalOpen(params) {
      this.modalShow = true
      this.text = params.text
      this.isDoubleModal = params.isDoubleModal
      this.callbackFncAfterModalClose = params.callbackFnc
      setTimeout(() => {
        if (document.body.style['overflow-y'] === 'auto') {
          document.body.style['overflow-y'] = 'hidden'
        }
        this.effectShow = true
      }, 0)
    },
    modalClose() {
      if (
        document.body.style['overflow-y'] === 'hidden' &&
        this.isDoubleModal
      ) {
        document.body.style['overflow-y'] = 'hidden'
      } else {
        document.body.style['overflow-y'] = 'auto'
      }
      if (this.callbackFncAfterModalClose) {
        this.callbackFncAfterModalClose()
      }
      this.effectShow = false
      this.callbackFncAfterModalClose = null
      setTimeout(() => {
        this.modalShow = false
      }, 200)
    }
  }
}
</script>
<style lang="scss" scoped>
.hint-modal-bg {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2050;
  .hint-modal {
    width: 340px;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 35px;
    padding-bottom: 35px;
    border-radius: 0.16rem;
    background-size: 100%;
    background-image: url('../../assets/images/public/modal_bg.png');
    background-color: #f9fbff;
    position: relative;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2051;
    overflow: hidden;
    .close-btn {
      width: 14px;
      height: 14px;
      background: url('../../assets/images/public/icon_close.png');
      position: absolute;
      right: 10px;
      top: 10px;
      transition: all 0.6s;
      &:hover {
        transform: rotate(-180deg);
      }
    }
    .hint-title {
      color: #2472ff;
      font-size: 14pt;
      position: relative;
      margin-bottom: 20px;
    }
    .hint-body {
      color: #39404d;
      width: 300px;
      font-size: 12pt;
      letter-spacing: 2px;
      line-height: 25px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      > div {
        width: 100%;
      }
    }

    .confirm-btn {
      position: relative;
      background: -webkit-linear-gradient(left, #04d3ff, #028aff);
      background: linear-gradient(90deg, #04d3ff, #028aff);
      color: white;
      width: 120px;
      height: 37px;
      line-height: 37px;
      border-radius: 6px;
      letter-spacing: 5px;
      margin: 0 auto;
      &:hover {
        background: -webkit-linear-gradient(left, #028aff, #04d3ff);
        background: linear-gradient(90deg, #028aff, #04d3ff);
      }
    }
    opacity: 0;
    &.bounce-in {
      opacity: 1;
      transition: 0.2s opacity ease-in-out;
    }
    &.bounce-out {
      opacity: 0;
      transition: 0.2s opacity ease-in-out;
    }
  }
}

// .bg {
//   position: absolute;
//   // background-color: rgba(255, 255, 255, 0.2);
//   &.decoration-1 {
//     bottom: 20%;
//     right: 11%;
//     width: 25px;
//     height: 25px;
//     transform: rotate(45deg);
//     border: 6px solid rgba(255, 255, 255, 0.2);
//   }
//   &.decoration-2 {
//     bottom: 0;
//     right: 11%;
//     width: 30px;
//     height: 40px;
//     background-color: rgba(60, 92, 234, 0.2);
//   }
//   &.decoration-3 {
//     top: 10%;
//     right: 25%;
//     width: 25px;
//     height: 25px;
//     &:before {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 6px;
//       height: 100%;
//       background-color: #3eabe2;
//     }
//     &:after {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 100%;
//       height: 6px;
//       background-color: #3eabe2;
//     }
//   }

//   &.decoration-4 {
//     bottom: 0%;
//     left: 4%;
//     width: 25px;
//     height: 25px;
//     transform: rotate(45deg);
//     &:before {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 6px;
//       height: 100%;
//       background-color: #5c73f1;
//     }
//     &:after {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 100%;
//       height: 6px;
//       background-color: #5c73f1;
//     }
//   }

//   &.decoration-5 {
//     top: 50%;
//     left: 0;
//     transform: translate(-50%, -50%);
//     width: 25px;
//     height: 25px;
//     border: 6px solid rgba(255, 255, 255, 0.2);
//     border-radius: 50%;
//   }
//   &.decoration-6 {
//     top: 0%;
//     left: 5%;
//     width: 55px;
//     height: 22px;
//     display: flex;
//     flex-wrap: wrap;

//     > div {
//       width: 7px;
//       height: 7px;
//       margin: 2px;
//       border-radius: 50%;
//       background-color: #568cea;
//     }
//   }
// }
</style>
