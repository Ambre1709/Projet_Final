import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    const status = error.response.status;
    if (status === 401) {
      //redirection Login
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);

createApp(App)
  .use(router)
  .mount("#app");
