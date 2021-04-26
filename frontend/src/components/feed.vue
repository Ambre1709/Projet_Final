<template>
  <div>
    <div id="nav">
      <router-link to="/profile"> Profil</router-link> |
      <a to="/login" v-on:click="Logout()"> Déconnexion</a>
    </div>
    <div>
      <newPost />
    </div>
    <div>
      <allPost />
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import allPost from "./allPost";
import newPost from "./newPost";
export default {
  name: "feed",
  components: {
    allPost,
    newPost,
  },
  data() {
    return {
      token: "",
      allPost: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped></style>
