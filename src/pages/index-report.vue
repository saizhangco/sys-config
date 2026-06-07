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
        <!-- <v-tab prepend-icon="mdi-chart-bar" text="藥品取藥統計報表" value="藥品取藥統計報表" /> -->
        <v-tab prepend-icon="mdi-chart-bar" text="取藥日報表" value="取藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="取消領藥日報表" value="取消領藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="銷毀日報表" value="銷毀日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="補藥日報表" value="補藥日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="藥品消耗日報表" value="藥品消耗日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="庫存日報表" value="庫存日報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="收支結存報表" value="收支結存報表" />
        <v-tab prepend-icon="mdi-chart-bar" text="操作記錄報表" value="操作記錄報表" />
        
      </v-tabs>

      <v-tabs-window v-model="tab" class="width-tabs-window">
        <!-- <v-tabs-window-item value="藥品取藥統計報表">
          <ReportGetMedicineDay />
        </v-tabs-window-item> -->
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
        <v-tabs-window-item value="藥品消耗日報表">
          <DrugConsumptionDailyReport />
        </v-tabs-window-item>
        <v-tabs-window-item value="庫存日報表">
          <OperationRecordReport />
        </v-tabs-window-item>
        <v-tabs-window-item value="收支結存報表">
          <IncomeAndExpenditureBalanceStatement />
        </v-tabs-window-item>
        <v-tabs-window-item value="操作記錄報表">
          <OperationRecordReport />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import ReportAddMedicineDay from './report/record_add_medicine_day.vue'
  import ReportDestroyMedicineDay from './report/record_destroy_medicine_day.vue'
  // 取藥日報表
  import ReportGetMedicineDay from './report/record_get_medicine_day.vue'
  import ReportReturnMedicineDay from './report/record_return_medicine_day.vue'
  import IncomeAndExpenditureBalanceStatement from './report/income_and_expenditure_balance_statement.vue'
  import DrugConsumptionDailyReport from "./report/drug_consumption_daily_report.vue"
  import OperationRecordReport from "./report/operation_record_report.vue"

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
