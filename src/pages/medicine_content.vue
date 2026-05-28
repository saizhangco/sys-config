<template>
  <v-data-table-server
    :headers="headers"
    hide-default-footer
    :items="serverItems"
    :items-length="totalItems"
    :items-per-page="itemsPerPage"
    :loading="loading"
    item-key="boxId"
    no-data-text="暫無數據">

      <!-- 操作列：删除按钮 -->
      <template #item.action="{ item }">
        <v-btn
          color="primary"
          size="small"
          class="me-2"
          @click="openEditDialog(item)"
        >
          <v-icon left>mdi-pencil</v-icon>编辑
        </v-btn>
      </template>
  </v-data-table-server>
  <div class="d-flex align-center justify-end text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
      total-visible="7"
      @update:model-value="onPageChange(page)"
    />
  </div>

  <!-- 新增 / 编辑 弹窗 -->
  <v-dialog v-model="dialogVisible" max-width="600">

    <v-card>
      <v-card-title class="text-h6">
        {{ isEdit ? '編輯' : '新增' }}
      </v-card-title>

      <v-card-text>
        <v-container class="pa-0">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="form.medicineId"
                label="藥品編號"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.quantity"
                label="現存量"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.maxQuantity"
                label="最大存量"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.quantity"
                label="盒內數據"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-end px-4 pb-4">
        <v-btn @click="closeDialog">取消</v-btn>
        <v-btn color="primary" @click="submitForm">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
  import axios from 'axios'
  import { ref, reactive } from 'vue'

  // 弹窗
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  // 打开编辑
  const openEditDialog = (row) => {
    isEdit.value = true
    form.boxId = row.boxId
    form.medicineId = row.medicineId
    form.maxQuantity = row.maxQuantity
    form.quantity = row.quantity
    dialogVisible.value = true
  }
  // 表单
  const form = reactive({
    boxId: '',
    medicineId: '',
    quantity:  0,
    maxQuantity: 0,
  })
  // 关闭弹窗
  const closeDialog = () => {
    dialogVisible.value = false
  }
  // 提交保存
  const submitForm = async () => {
    if (isEdit.value) {
      axios.put('/api/box', form).then(
        response => {
          console.log(response.data)
          loadItems(page.value, itemsPerPage.value)
        },
        error => {
          alert(error)
        },
      ).catch(error => {
        console.error(error)
      })
    } else {
      console.log('调用新增接口', form)
    }

    // 成功后关闭弹窗并刷新列表
    closeDialog()
    // await fetchList()
  }

  const itemsPerPage = ref(6)
  const headers = ref([
    { title: '儲位編號', key: 'boxId', align: 'start', sortable: false },
    { title: '藥品編號', key: 'medicineId', align: 'start', sortable: false },
    { title: '藥品名稱', key: 'description', align: 'start', sortable: false },
    { title: '現存量', key: 'quantity', align: 'start', sortable: false },
    { title: '最大存量', key: 'maxQuantity', align: 'start', sortable: false },
    { title: '盒內數據', key: 'quantity', align: 'start', sortable: false },
    { title: '操作', key: 'action', width: '140', sortable: false },
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
    axios.get('/api/box/medicine/contents?page=' + page_num + '&size=' + page_size).then(
      response => {
        console.log(response.data)
        const items = response.data.data
        serverItems.value = items
        totalItems.value = response.data.count
        pageCount.value = 6
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
