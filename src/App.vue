<template>
  <nav class="global-nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.global-nav {
  background-color: #42b98338;
  padding: 15px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Ocupa todo el ancho */
  z-index: 1000; /* Asegura que esté por encima del contenido */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
