<template>
  <div>
    <div id="navlogo">
      <a href="/"> <img id="logo" src="./assets/logo.png" alt="logo"/></a>
    </div>
    <nav id="nav">
      <ul>
        <li><router-link to="/feed">Accueil</router-link></li>
        <li><router-link to="/profile"> Profil</router-link></li>
        <li>
          <a to="/login" v-on:click="Logout()">
            <span class="deco">Déconnexion</span></a
          >
        </li>
      </ul>
    </nav>
    <header />
    <router-view />
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
export default {
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style>
body {
  background-color: #d6dfe2;
}
#logo {
  width: 400px;
  max-width: 80%;
}
#navlogo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #31bcc6;
  margin: -10px -10px 0px -10px;
  height: 90px;
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #d2fafa;
  margin: -10px -10px 0px -10px;
  height: 40px;
  margin-bottom: 50px;
}
nav li {
  display: inline-block;
  margin: 0 8px;
}
.deco {
  color: rgb(216, 41, 41);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>
