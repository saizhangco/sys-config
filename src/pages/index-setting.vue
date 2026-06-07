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
        <v-tab prepend-icon="mdi-cog" text="藥品管理" value="藥品管理" />
        <v-tab prepend-icon="mdi-cog" text="藥櫃配置管理" value="藥櫃配置管理" />
        <v-tab prepend-icon="mdi-cog" text="藥品內容管理" value="藥品內容管理" />
        <v-tab prepend-icon="mdi-cog" text="功能權限管理" value="功能權限管理" />
      </v-tabs>

      <v-tabs-window v-model="tab" class="width-tabs-window">
        <v-tabs-window-item value="藥品管理">
          <MedicineMgmt />
        </v-tabs-window-item>
        <v-tabs-window-item value="藥櫃配置管理">
          <TerminalConfig />
        </v-tabs-window-item>
        <v-tabs-window-item value="藥品內容管理">
          <MedicineContent />
        </v-tabs-window-item>
        <v-tabs-window-item value="功能權限管理">
          <Permission />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import MedicineMgmt from './setting/medicine_mgmt.vue'
  import TerminalConfig from './setting/terminal_config.vue'
  import MedicineContent from './setting/medicine_content.vue'
  import Permission from './setting/permission.vue'

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
