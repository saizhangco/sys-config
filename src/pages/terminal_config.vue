<template>
  <v-container>
    <!-- 顶部工具栏：新增按钮 + 搜索 -->
    <v-toolbar color="transparent" flat class="mb-3">
      <!-- <v-spacer /> -->
      <v-btn color="primary"
        :class="{
          'text-center': true,
          'bg-normal': true}"
        @click="split()"
      ><v-icon left>mdi-plus</v-icon>
        拆分
      </v-btn>
      <v-btn color="primary"
        :class="{
          'text-center': true,
          'bg-normal': true}"
        @click="merge()"
      ><v-icon left>mdi-plus</v-icon>
        合并
      </v-btn>
    </v-toolbar>
    <v-data-table
      class="elevation-1 table-bordered"
      density="compact"
      :headers="headers"
      hide-default-footer
      hide-default-header
      hover
      item-value="name"
      :items-length="totalItems"
    >
      <template v-for="(layer, layerIndex) in box">
        <tr class="text-no-wrap">
          <template v-for="(item, index) in layer">
            <td v-if="item.box!=0" :colspan="item.box" style="padding: 0 2px">
              <v-btn
                block
                :class="{
                  'text-center': true,
                  'bg-success': item.box == 1,
                  'bg-warning': item.box == 2,
                  'bg-error': item.box == 3,
                  'active': layerIndex === d._layerIndex && index >= d._startIndex && index + item.box <= d._endIndex
                }"
                @click="toggleChecked(layerIndex, index, item.box)"
              >
                {{ item.name }}
              </v-btn>
            </td>
          </template>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
  import axios from 'axios'
  import { ref } from 'vue'

  const d = ref({
    _startIndex: -1,
    _endIndex: -1,
    _layerIndex: -1,
  })

  function toggleChecked (layerIndex, index, size) {
    if (d.value._layerIndex == -1) {
      d.value._layerIndex = layerIndex
      d.value._startIndex = index
      d.value._endIndex = index + size
    } else if (d.value._layerIndex == layerIndex) {
      if (d.value._startIndex == index + size && d.value._endIndex - index <= 3) {
        d.value._startIndex = index
      } else if (index == d.value._endIndex && index + size - d.value._startIndex <= 3) {
        d.value._endIndex = index + size
      } else {
        alert('請選擇連續格子且最大空間不超過3')
        resetIndex()
      }
    } else {
      alert('請在同一行選擇連續格子')
      resetIndex()
    }
  }

  function resetIndex () {
    d.value._layerIndex = -1
    d.value._startIndex = -1
    d.value._endIndex = -1
  }

  function split () {
    // alert('分割(' + d.value._layerIndex + ',' + d.value._startIndex + ',' + d.value._endIndex + ')')
    splitItems(d.value._layerIndex, d.value._startIndex, d.value._endIndex - d.value._startIndex)
    resetIndex()
  }

  function merge () {
    // alert('合併(' + d.value._layerIndex + ',' + d.value._startIndex + ',' + d.value._endIndex + ')')
    mergeItems(d.value._layerIndex, d.value._startIndex, d.value._endIndex - d.value._startIndex)
    resetIndex()
  }

  const box = ref([[]])

  function mergeItems (layerIndex, index, size) {
    axios.get('/api/box/merge?layerIndex=' + layerIndex + '&index=' + index + '&size=' + size).then(
      response => {
        loadItems ()
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }

  function splitItems (layerIndex, index, size) {
    axios.get('/api/box/split?layerIndex=' + layerIndex + '&index=' + index + '&size=' + size).then(
      response => {
        loadItems ()
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }

  function loadItems () {
    axios.get('/api/box/setting').then(
      response => {
        box.value = response.data.data
      },
      error => {
        alert(error)
      },
    ).catch(error => {
      console.error(error)
    })
  }
  loadItems()
</script>
<style>
.table-bordered >>> th.table-bordered >>> td {
  border: 1px solid rgba(0, 0, 0, 0.12) !important; /* 设置边框颜色和样式 */
  padding: 0;
}

.table-bordered >>> thead th {
  border-bottom: 2px solid rgba(0, 0, 0, 0.12) !important; /* 加粗表头下边框 */
}

.active {
  background-color: rgb(232, 236, 12);
}
</style>
