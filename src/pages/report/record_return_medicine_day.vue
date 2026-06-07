<template>
  <h2>取消領藥日報表</h2>
  <!-- 顶部工具栏：新增按钮 + 搜索 -->
  <v-toolbar color="transparent" flat class="mb-3">
    查詢條件
    <!-- 下拉选择框 -->
    <v-select
      v-model="queryParams.terminalId"
      label="藥櫃"
      :items="options"
      style="width: 100px;"
      :disabled="disabledFlag"
    ></v-select>
    <v-date-input
      v-model="queryParams.startDate"
      label="開始日期"
    ></v-date-input>
    <v-date-input
      v-model="queryParams.endDate"
      label="結束日期"
    ></v-date-input>
    <v-spacer />
    <v-btn color="primary" @click="loadItems()">
      <v-icon left>mdi-search</v-icon> 查詢
    </v-btn>
  </v-toolbar>
  <v-data-table-server
    :headers="headers"
    hide-default-footer
    :items="serverItems"
    :items-length="totalItems"
    :items-per-page="itemsPerPage"
    :loading="loading"
    no-data-text="暫無數據"
  />
  <div class="d-flex align-center justify-end text-center pt-2">
    <v-pagination
      v-model="queryParams.page"
      :length="pageCount"
      total-visible="7"
      @update:model-value="onPageChange(page)"
    />
  </div></template>

<script setup>
  import axios from 'axios'
  import { ref, reactive } from 'vue'
  import { VDateInput } from 'vuetify/labs/VDateInput'
  import { useRoute } from 'vue-router'

  // 获取路由实例
  const route = useRoute()
  const disabledFlag = ref(!!route.params.terminalId)
  // 1. 查询参数（日期 + 分页）
  const queryParams = reactive({
    startDate: '', // 开始日期 YYYY-MM-DD
    endDate: '',   // 结束日期 YYYY-MM-DD
    terminalId: route.params.terminalId,
    page: 1,
    pageSize: 8
  })
  

  const itemsPerPage = ref(5)
  const headers = ref([
    { title: '時間', key: 'optionTime', align: 'start', sortable: false },
    { title: '藥品代號', key: 'medicineId', align: 'start', sortable: false },
    { title: '藥品名稱', key: 'medicineName', align: 'start', sortable: false },
    { title: '取消數量', key: 'optionQty', align: 'start', sortable: false },
    { title: '操作人員', key: 'userId', align: 'start', sortable: false },
    { title: '覆核人員', key: 'userId2', align: 'start', sortable: false },
    { title: '藥櫃名稱', key: 'terminalId', align: 'start', sortable: false },
  ])
  const serverItems = ref([])
  const loading = ref(true)
  const totalItems = ref(0)
  const page = ref(1)
  const pageCount = ref(0)
  const numbers = ref([10, 25, 50, 100])
  function loadItems () {
    loading.value = true
    axios.get('/api/option_result/list/cancelMedicine',{
      params: {
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
        page: queryParams.page-1,
        pageSize: queryParams.pageSize,
        terminalId: queryParams.terminalId,
        optionType: 1
      }
    }).then(
      response => {
        console.log(response.data)
        serverItems.value = response.data.data
        totalItems.value = response.data.count
        pageCount.value = Math.ceil(response.data.count / queryParams.pageSize)
        loading.value = false
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }

  function onPageChange () {
    loadItems()
  }

  function sel () {
    loadItems()
  }

  // 下拉选项数组
  const options = ref([])
  // 从服务器获取下拉数据
  const getSelectData = async () => {
    loading.value = true
    axios.get('/api/box/queryTerminalIdList').then(
      response => {
        console.log(response.data)
        const items = response.data.data
        options.value = items
        loading.value = false
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }

  loadItems()
  getSelectData()
</script>
