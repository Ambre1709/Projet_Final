<template>
  <div>
    <div id="nav">
      <router-link to="/feed">Accueil </router-link> |
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
import loadMessages from "./loadMessages";
import newMessage from "./newMessage";
// export default {
//   name: "feed",
//   components: {
//     loadMessages,
//     newMessage,
//   },
//   data() {
//     return {
//         token: "",
//         allMessages: [],
//     };
//   },
//   methods: {
//     Logout() {
//       localStorage.clear();
//       this.$router.push("/");
//     },
//   },
// };
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
</style>