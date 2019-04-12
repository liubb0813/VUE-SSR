<template lang="pug">
div
  router-link(to="/") to home
  p userinfo
  p {{ userInfo }}
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  asyncData({ store }) {
    return [store.dispatch("user/fetchUserInfo")];
  },
  name: "User",
  metaInfo: {
    title: "this is User"
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    if (!this.userInfo) {
      (async () => {
        try {
          await this.fetchUserInfo();
        } catch (e) {
          throw e;
        }
      })();
    }
  },
  methods: {
    ...mapActions({
      fetchUserInfo: "user/fetchUserInfo"
    })
  }
};
</script>
