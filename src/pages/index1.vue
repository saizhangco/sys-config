<template>
  <v-card flat>
    <v-toolbar color="primary" title="" />
    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        color="primary"
        direction="vertical"
        class="width-tabs"
      >
        <v-tab prepend-icon="mdi-chart-bar" text="儀表板" value="儀表板" />
      </v-tabs>

      <v-tabs-window v-model="tab" class="width-tabs-window">
        <v-tabs-window-item value="儀表板">
          <Dashboard />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import Dashboard from './dashboard2.vue'

  const tab = ref('報表')
</script>
<style>
  /* 标签栏：宽度满，高度默认即可 */
  .width-tabs {
    width: 20%;
    flex-shrink: 0; /* 不压缩 */
  }
  .width-tabs-window {
    width: 80%;
    flex-shrink: 0; /* 不压缩 */
    padding: 0px 20px
  }
</style>
