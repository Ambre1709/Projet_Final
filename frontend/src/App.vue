<template>
  <div>
    <nav id="nav">
      <div class="deux">
        <a href="/"> <img id="logo" src="./assets/logo.png" alt="logo"/></a>
      </div>
      <div class="un">
        <ul>
          <li><router-link to="/feed">Accueil</router-link></li>
          <li><router-link to="/profile"> Profil</router-link></li>
          <li>
            <a to="/login" v-on:click="Logout()">
              <span class="deco">Déconnexion</span></a
            >
          </li>
        </ul>
      </div>
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
.deux {
  flex: 2;
}
.un {
  flex: 1;
}
#logo {
  width: 400px;
}
nav {
  width: 100%;
  background-color: #31bcc6;
  display: flex;
  justify-content: center;

  margin: -10px -10px 0px -10px;
  height: 90px;
  align-items: center;
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
/* @media (max-width: 1024px) {
  #logo {
    width: 300px;
  }
} */
</style>
