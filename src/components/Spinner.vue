<template>
  <div v-if="spinner" class="spinner flex flex-center flex-items-center">
    <div class="loader">
      <div class="loader02"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Spinner',
  computed: {
    ...mapGetters(['spinner'])
  }
}
</script>
<style lang="scss" scoped>
.spinner {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  .loader {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 75px;
    display: inline-block;
    vertical-align: middle;
  }

  .loader02 {
    width: 56px;
    height: 56px;
    border: 8px solid rgba(0, 82, 236, 0.25);
    border-top-color: #0052ec;
    border-radius: 50%;
    position: relative;
    animation: loader-rotate 1s linear infinite;
    top: 50%;
    margin: -28px auto 0 auto;
  }

  @-webkit-keyframes line-grow {
    0% {
      height: 0;
    }
    100% {
      height: 75%;
    }
  }

  @keyframes line-grow {
    0% {
      height: 0;
    }
    100% {
      height: 75%;
    }
  }

  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
