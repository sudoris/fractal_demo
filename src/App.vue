<template>
  <div id="app">
    <Fractal />
  </div>
</template>

<script>
import Fractal from './components/Fractal.vue'

export default {
  name: 'App',
  components: {
    Fractal
  }
}
</script>

<style>
#app {
  width: 95%;
  margin: 12px auto;
}
</style>
