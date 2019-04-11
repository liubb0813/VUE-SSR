import Ajax from "@/object/ajax";

const ajax = new Ajax(`${process.env.VUE_APP_API_BASE}/sys`);

export default {
  fetchUserInfo() {
    return ajax.GET("users/info");
  }
};
