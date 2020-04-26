<template>
  <div id="app">
    <demo />
  </div>
</template>

<script>
import Demo from './components/Demo.vue'

export default {
  name: 'app',
  components: {
    Demo
  }
}
</script>

<style>
html, body {
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
</style>
