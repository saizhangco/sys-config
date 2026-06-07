<template>
  <v-card flat>
    <v-toolbar color="primary" title="">
    </v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs
          v-model="tab"
          color="primary"
          direction="vertical"
      >
        <v-tab prepend-icon="mdi-chart-bar" text="報表" value="報表"></v-tab>
        <v-tab prepend-icon="mdi-cog" text="系統設定" value="系統設定"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="報表">
          <Report />
        </v-tabs-window-item>

        <v-tabs-window-item value="系統設定">
          <Setting />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import Report from './report.vue'
  import Setting from './setting.vue'

  const tab = ref('報表')
</script>
