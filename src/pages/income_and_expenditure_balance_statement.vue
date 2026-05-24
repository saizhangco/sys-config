<template>
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
      v-model="page"
      :length="pageCount"
      total-visible="7"
      @update:model-value="onPageChange(page)"
    />
  </div></template>

<script setup>
  import axios from 'axios'
  import { ref } from 'vue'

  const itemsPerPage = ref(5)
  const headers = ref([
    { title: '藥櫃', key: 'terminalId', align: 'start', sortable: false },
    { title: '藥品代號', key: 'medicineId', align: 'start', sortable: false },
    { title: '藥盒名稱', key: 'scienceName', align: 'start', sortable: false },
    { title: '藥盒代號', key: 'rfid', align: 'end', sortable: false },
    { title: '日期', key: 'date', align: 'end', sortable: false },
    { title: '取藥數量', key: 'getNumber', align: 'end', sortable: false },
    { title: '補藥數量', key: 'addNumber', align: 'end', sortable: false },
    { title: '結存數量', key: 'otherNumber', align: 'end', sortable: false },
  ])
  const serverItems = ref([])
  const loading = ref(true)
  const totalItems = ref(0)
  const page = ref(1)
  const pageCount = ref(0)
  const numbers = ref([10, 25, 50, 100])
  function loadItems (page_num = 1, page_size = 5) {
    loading.value = true
    page_num = page_num - 1
    axios.get('/api/statement/income_and_expenditure_balance?page=' + page_num + '&size=' + page_size).then(
      response => {
        console.log(response.data)
        const items = response.data.data
        serverItems.value = items
        totalItems.value = response.data.count
        pageCount.value = Math.ceil(response.data.count / page_size)
        loading.value = false
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }
  function onPageChange (page) {
    loadItems(page, itemsPerPage.value)
  }
  function sel (page_size = 10) {
    loadItems(page.value, page_size)
  }
  loadItems(page.value, itemsPerPage.value)
</script>
