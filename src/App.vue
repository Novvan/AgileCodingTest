<template>
  <div class="root">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #191919;
  margin: 0px;
  box-sizing: border-box;
  font-size: 100%;
  height: 98vh;
  width: auto;
}
.root {
  width: inherit;
  height: inherit;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
</style>
