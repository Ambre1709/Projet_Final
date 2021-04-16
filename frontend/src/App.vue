<template>
  <div>
    <a href="/"> <img id="logo" src="./assets/logo.png" alt="logo"/></a>
    <header />
    <router-view />
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
#logo {
  width: 400px;
}
@media (max-width: 1024px) {
  #logo {
    width: 300px;
  }
}
</style>
