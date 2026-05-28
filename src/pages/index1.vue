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
        <v-tab prepend-icon="mdi-chart-bar" text="藥品取藥統計報表" value="藥品取藥統計報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="取藥日報表" value="取藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="取消領藥日報表" value="取消領藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="銷毀日報表" value="銷毀日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="補藥日報表" value="補藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="收支結存報表" value="收支結存報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="藥品消耗日報表" value="藥品消耗日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="操作記錄報表" value="操作記錄報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="庫存日報表" value="庫存日報表" />
        <v-tab prepend-icon="mdi-cog" text="藥品管理" value="藥品管理" />
        <v-tab prepend-icon="mdi-cog" text="藥櫃配置管理" value="藥櫃配置管理" />
        <v-tab prepend-icon="mdi-cog" text="藥品內容管理" value="藥品內容管理" />
        <v-tab prepend-icon="mdi-cog" text="功能權限管理" value="功能權限管理" />
      </v-tabs>

      <v-tabs-window v-model="tab" class="width-tabs-window">
        <v-tabs-window-item value="儀表板">
          <Dashboard />
        </v-tabs-window-item>
        <v-tabs-window-item value="藥品取藥統計報表">
          <ReportGetMedicineDay />
        </v-tabs-window-item>
        <v-tabs-window-item value="取藥日報表">
          <ReportGetMedicineDay />
        </v-tabs-window-item>
        <v-tabs-window-item value="取消領藥日報表">
          <ReportReturnMedicineDay />
        </v-tabs-window-item>
        <v-tabs-window-item value="銷毀日報表">
          <ReportDestroyMedicineDay />
        </v-tabs-window-item>
        <v-tabs-window-item value="補藥日報表">
          <ReportAddMedicineDay />
        </v-tabs-window-item>
        <v-tabs-window-item value="收支結存報表">
          <IncomeAndExpenditureBalanceStatement />
        </v-tabs-window-item>
        <v-tabs-window-item value="藥品消耗日報表">
          <DrugConsumptionDailyReport />
        </v-tabs-window-item>
        <v-tabs-window-item value="操作記錄報表">
          <OperationRecordReport />
        </v-tabs-window-item>
        <v-tabs-window-item value="庫存日報表">
          <OperationRecordReport />
        </v-tabs-window-item>
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
  import Dashboard from './dashboard2.vue'
  import Setting from './setting.vue'
  import ReportAddMedicineDay from './record_add_medicine_day.vue'
  import ReportDestroyMedicineDay from './record_destroy_medicine_day.vue'
  import ReportGetMedicineDay from './record_get_medicine_day.vue'
  import ReportReturnMedicineDay from './record_return_medicine_day.vue'
  import MedicineMgmt from './medicine_mgmt.vue'
  import TerminalConfig from './terminal_config.vue'
  import MedicineContent from './medicine_content.vue'
  import Permission from './permission.vue'
  import IncomeAndExpenditureBalanceStatement from './income_and_expenditure_balance_statement.vue'
  import DrugConsumptionDailyReport from "./drug_consumption_daily_report.vue"
  import OperationRecordReport from "./operation_record_report.vue"

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
