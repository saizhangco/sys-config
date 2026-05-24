<template>
  <v-data-table-server
    :headers="headers"
    hide-default-footer
    :items="serverItems"
    :items-length="totalItems"
    item-key="roleId"
    :items-per-page="itemsPerPage"
    :loading="loading"
    no-data-text="暫無數據">
      <!-- 操作列：编辑按钮 -->
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
          <v-row density="comfortable">
            <v-col cols="4">
              <v-select
                v-model="form.m00"
                :items="['', 'y', 'n']"
                label="儀表板"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.m10"
                :items="['', 'y', 'n']"
                label="取藥"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.m20"
                :items="['', 'y', 'n']"
                label="補藥"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.m30"
                :items="['', 'y', 'n']"
                label="點班"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.m40"
                :items="['', 'y', 'n']"
                label="稽核"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.m50"
                :items="['', 'y', 'n']"
                label="空瓶置放"
              ></v-select>
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
  import { ref, reactive  } from 'vue'

  // 弹窗
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  // 打开编辑
  const openEditDialog = (row) => {
    isEdit.value = true
    form.roleId = row.roleId
    form.m00 = row.m00
    form.m10 = row.m10
    form.m20 = row.m20
    form.m30 = row.m30
    form.m40 = row.m40
    form.m50 = row.m50
    console.log(form.roleId)
    dialogVisible.value = true
  }
  // 表单
  const form = reactive({
    roleId: '',
    m00: '',
    m10: '',
    m20: '',
    m30: '',
    m40: '',
    m50: '',
  })
  // 关闭弹窗
  const closeDialog = () => {
    dialogVisible.value = false
  }
  // 提交保存
  const submitForm = async () => {
    if (isEdit.value) {
      axios.post('/api/permission/update', form).then(
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
  }

  const itemsPerPage = ref(5)
  const headers = ref([
    { title: '', key: 'role', align: 'start', sortable: false },
    { title: '儀表板', key: 'm00', align: 'start', sortable: false },
    { title: '取藥', key: 'm10', align: 'start', sortable: false },
    { title: '補藥', key: 'm20', align: 'start', sortable: false },
    { title: '點班', key: 'm30', align: 'start', sortable: false },
    { title: '稽核', key: 'm40', align: 'start', sortable: false },
    { title: '空瓶置放', key: 'm50', align: 'start', sortable: false },
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
    axios.get('/api/permission/list').then(
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
