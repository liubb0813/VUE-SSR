<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: "this is App"
  }
};
</script>

<style lang="stylus">
#app
  display: flex
  width: 100%
  height: 100vh
  flex-direction: column
  overflow: hidden
</style>
