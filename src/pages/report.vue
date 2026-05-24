<template>
  <v-card>
    <div>
      <v-tabs
          v-model="tab"
          color="primary"
      >
        <v-tab text="每日取藥紀錄" value="每日取藥紀錄"></v-tab>
        <v-tab text="每日退藥紀錄" value="每日退藥紀錄"></v-tab>
        <v-tab text="每日銷毀" value="每日銷毀"></v-tab>
        <v-tab text="每日補藥紀錄" value="每日補藥紀錄"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="每日取藥紀錄">
          <ReportGetMedicineDay />
        </v-tabs-window-item>

        <v-tabs-window-item value="每日退藥紀錄">
          <ReportReturnMedicineDay />
        </v-tabs-window-item>

        <v-tabs-window-item value="每日銷毀">
          <ReportDestroyMedicineDay />
        </v-tabs-window-item>

        <v-tabs-window-item value="每日補藥紀錄">
          <ReportAddMedicineDay />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import ReportAddMedicineDay from './record_add_medicine_day.vue'
  import ReportDestroyMedicineDay from './record_destroy_medicine_day.vue'
  import ReportGetMedicineDay from './record_get_medicine_day.vue'
  import ReportReturnMedicineDay from './record_return_medicine_day.vue'

  const tab = ref('報表')
</script>
