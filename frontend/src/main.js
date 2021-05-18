import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    const status = error.response.status;
    if (status === 401) {
      router.replace("/login");
    } else if (status === 404) {
      router.replace("/404");
    }
    return Promise.reject(error);
  }
);

createApp(App)
  .use(router)
  .mount("#app");
