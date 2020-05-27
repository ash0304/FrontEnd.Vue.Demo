<template>
  <div id="app">
    <vue-headful :title="siteTitle" />
    <router-view />
    <LoginModal />
    <HintModal />
    <AddWithdrawalPasswordModal />
    <SiteNotifyModal />
    <Spinner />
    <FixedMenu />
  </div>
</template>
<script>
import Spinner from './components/Spinner'
import FixedMenu from './components/FixedMenu'

export default {
  components: { Spinner, FixedMenu },
  data() {
    return {
      siteTitle: 'Demo'
    }
  }
}
</script>
