import UserApi from "@/helper/api/user";

const state = {
  userInfo: null
};

const getters = {
  userInfo(state) {
    return state.userInfo;
  }
};

const actions = {
  async fetchUserInfo({ commit }) {
    const data = await UserApi.fetchUserInfo();
    commit("SET_USER_INFO", data);
  }
};

const mutations = {
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  }
};

export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
