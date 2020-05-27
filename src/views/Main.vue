<template>
  <div class="min-width">
    <Navbar />
    <div class="max-width margin-center">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Home/Footer'

export default {
  name: 'Main',
  components: { Footer, Navbar }
}
</script>
<style lang="scss" scoped>
</style>
