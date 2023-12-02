<template>
  <div>
    <HorizontalScrollBar/>
    <div>
      <Splash />
    </div>
    <div><SearchBar /></div>
    <div class="flex"></div>
  </div>
</template>

<script>
import HorizontalScrollBar from '../components/HorizontalScrollBar.vue'
import SearchBar from '../components/SearchBar.vue'
import Splash from '../components/Splash.vue'

export default {
  components: {
    SearchBar,
    Splash,
    HorizontalScrollBar
  }
}
</script>

