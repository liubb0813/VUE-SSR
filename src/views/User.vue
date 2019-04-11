<template lang="pug">
div
  p userinfo
  p {{ userInfo }}
</template>

<script>
import { mapGetters } from "vuex";

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
  }
  // created() {
  //   (async () => {
  //     try {
  //       await this.fetchUserInfo();
  //     } catch (e) {
  //       throw e;
  //     }
  //   })();
  // },
  // methods: {
  //   ...mapActions({
  //     fetchUserInfo: "user/fetchUserInfo"
  //   })
  // }
};
</script>
