<template lang="pug">
div
  router-link(to="/user") to user
  router-view
</template>

<script>
export default {
  name: "home",
  metaInfo: {
    title: "this is Home"
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "user" });
    }
  }
};
</script>
