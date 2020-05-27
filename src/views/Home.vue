<template>
  <div class="home">
    <Jumbotron />
    <sportsBet />
    <Mobile />
    <ServiceInfo />
  </div>
</template>
<script>
import Jumbotron from '@/components/Home/Jumbotron'
import ServiceInfo from '@/components/Home/ServiceInfo'
import sportsBet from '@/components/Home/sportsBet'
import Mobile from '@/components/Home/Mobile'

export default {
  name: 'Home',
  components: { Jumbotron, ServiceInfo, sportsBet, Mobile }
}
</script>
