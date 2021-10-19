<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
