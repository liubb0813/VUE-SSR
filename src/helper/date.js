import { debounce } from "throttle-debounce";

export default {
  serverDate: new Date(),
  setServerDate: debounce(1000, true, function(dateString) {
    this.serverDate = dateString ? new Date(dateString) : new Date();
  })
};
