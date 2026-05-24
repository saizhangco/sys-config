<template>
  <v-card>
    <div>
      <v-tabs
        v-model="tab"
        color="primary"
      >
        <v-tab text="藥品管理" value="藥品管理" />
        <v-tab text="藥櫃配置管理" value="藥櫃配置管理" />
        <v-tab text="藥品內容管理" value="藥品內容管理" />
        <v-tab text="功能權限管理" value="功能權限管理" />
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="藥品管理">
          <medicineMgmt />
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
  import medicineMgmt from './medicine_mgmt.vue'
  import TerminalConfig from './terminal_config.vue'
  import MedicineContent from './medicine_content.vue'
  import Permission from './permission.vue'

  const tab = ref('報表')
</script>
