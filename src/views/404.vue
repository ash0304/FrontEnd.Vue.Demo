<template>
  <div class="error-img">
    <div>ERROR</div>
    <div>404</div>
    <div>PAGE NOT FOUND</div>
  </div>
</template>
<style lang="scss" scoped>
.error-img {
  width: 100%;
  // height: 523px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  color: #fff;
  background-color: #0259DA;
  padding: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  > div {
    font-size: 30px;
    &:nth-child(2) {
      font-size: 100px;
    }
  }
}
</style>
