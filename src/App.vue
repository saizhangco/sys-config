<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style>
#app {
  width: 1440px;
  height: 900px;
  transform-origin: top left;
  transform: scale(calc(100vw / 1440));
  overflow: hidden;
}
</style>
