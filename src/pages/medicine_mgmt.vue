<template>
  <!-- 顶部工具栏：新增按钮 + 搜索 -->
  <v-toolbar color="transparent" flat class="mb-3">
    <v-btn color="primary" @click="openCreateDialog">
      <v-icon left>mdi-plus</v-icon> 新增藥品
    </v-btn>

    <v-spacer />

    <v-text-field
      v-model="search"
      placeholder="搜索藥品"
      prepend-icon="mdi-magnify"
      single-line
      hide-details
      class="mx-2"
      style="width: 280px"
    />
  </v-toolbar>
  <v-data-table-server
    :headers="headers"
    hide-default-footer
    :items="serverItems"
    :items-length="totalItems"
    :items-per-page="itemsPerPage"
    :loading="loading"
    item-key="medicineId"
    no-data-text="暫無數據">
      <!-- 表格列插槽 -->
      <!-- 👇 关键：自定义列插槽 -->
      <template #item.name="{ item }">
        <!-- 在这里拼接两个字段 -->
        {{ item.productName }}
        <br><span class="text-xs text-grey">{{ item.scienceName }}</span>
      </template>

      <!-- 操作列：删除按钮 -->
      <template #item.action="{ item }">
        <div class="d-flex gap-2">
        <v-btn
          color="primary"
          size="small"
          class="me-2"
          @click="openEditDialog(item)"
        >
          <v-icon left>mdi-pencil</v-icon>编辑
        </v-btn>
        <v-btn
          color="red"
          size="small"
          @click="handleDelete(item)"><v-icon left>mdi-delete</v-icon> 删除
        </v-btn>
        </div>
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
          <v-row density="comfortable">
            <v-col cols="6">
              <v-text-field
                v-model="form.medicineId"
                label="藥品編號"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.barcode"
                label="藥品條碼"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.productName"
                label="名稱"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.scienceName"
                label="學名"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.efficiency"
                label="功效"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.doseRoute"
                label="藥品單位"
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
  // 打开新建
  const openCreateDialog = () => {
    isEdit.value = false
    form.medicineId = ''
    form.productName = ''
    form.scienceName = ''
    form.barcode = ''
    form.efficiency = ''
    form.doseRoute = ''
    dialogVisible.value = true
  }
  // 打开编辑
  const openEditDialog = (row) => {
    isEdit.value = true
    form.medicineId = row.medicineId
    form.productName = row.productName
    form.scienceName = row.scienceName
    form.barcode = row.barcode
    form.efficiency = row.efficiency
    form.doseRoute = row.doseRoute
    dialogVisible.value = true
  }
  // 表单
  const form = reactive({
    medicineId: '',
    productName: '',
    scienceName: '',
    barcode: '',
    efficiency: '',
    doseRoute: '',
  })
  // 关闭弹窗
  const closeDialog = () => {
    dialogVisible.value = false
  }
  // 提交保存
  const submitForm = async () => {
    if (isEdit.value) {
      axios.put('/api/medicine', form).then(
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
      axios.post('/api/medicine', form).then(
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
    }
    // 成功后关闭弹窗并刷新列表
    closeDialog()
  }
  // 提交删除
  const handleDelete = async (row) => {
    axios.delete('/api/medicine?id=' + row.medicineId).then(
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
  }

  const itemsPerPage = ref(10)
  const headers = ref([
    { title: '藥品編號', key: 'medicineId', align: 'start', sortable: false },
    { title: '圖片', key: 'photo', align: 'end', sortable: false },
    { title: '名稱/學名', key: 'name', align: 'start', sortable: false },
    { title: '藥品條碼', key: 'barcode', align: 'start', sortable: false },
    { title: '功效', key: 'efficiency', align: 'end', sortable: false },
    { title: '藥品單位', key: 'doseRoute', align: 'end', sortable: false },
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
    axios.get('/api/medicine/list?page=' + page_num + '&size=' + page_size).then(
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
