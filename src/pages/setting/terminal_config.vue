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
        合併
      </v-btn>
    </v-toolbar>
    <!-- <v-data-table
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
                  'bg-success': item.box == 1 && layerIndex != 0,
                  'bg-warning': item.box == 2 && layerIndex != 0,
                  'bg-error': item.box == 3 && layerIndex != 0,
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
    </v-data-table> -->
  <!-- 原生表格，替代 v-data-table -->
  <table 
    class="elevation-1 table-bordered"
    style="width: 100%; table-layout: fixed; border-collapse: collapse;"
  >
    <tbody>
      <tr 
        v-for="(layer, layerIndex) in box" 
        :key="layerIndex"
        class="row-fixed-height"
      >
        <template v-for="(item, index) in layer" :key="index">
          <td 
            v-if="item.box !== 0" 
            :colspan="item.box"
            style="padding: 0 2px; border: 1px solid #ddd;"
            class="cell-fixed-height"
          >
            <v-btn
              block
              :disabled="layerIndex == 0"
              :class="{
                'text-center': true,
                'bg-success': item.box == 1 && layerIndex !=0,
                'bg-warning': item.box == 2 && layerIndex !=0,
                'bg-error': item.box == 3  && layerIndex !=0,
                'active': layerIndex === d._layerIndex && index >= d._startIndex && index + item.box <= d._endIndex
              }"
              @click="toggleChecked(layerIndex, index, item.box)"
            >
              {{ item.name }}
            </v-btn>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
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

  headers: [
    { text: '', value: 'col1', width: '16.666%' },
    { text: '', value: 'col2', width: '16.666%' },
    { text: '', value: 'col3', width: '16.666%' },
    { text: '', value: 'col4', width: '16.666%' },
    { text: '', value: 'col5', width: '16.666%' },
    { text: '', value: 'col6', width: '16.666%' },
  ]

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
    layerIndex = layerIndex - 1
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
    layerIndex = layerIndex - 1
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
        box.value.unshift([
            {box: 1, name: '第一列'},
            {box: 1, name: '第二列'},
            {box: 1, name: '第三列'},
            {box: 1, name: '第四列'},
            {box: 1, name: '第五列'},
            {box: 1, name: '第六列'},
          ])
        console.log(box.value)
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

/* 1. 整行固定高度（按需改数值，比如 36px / 40px） */
.row-fixed-height {
  height: 36px !important;
}
/* 2. 单元格继承行高，消除默认内边距 */
.cell-fixed-height {
  height: 100% !important;
  padding: 0 2px !important;
  margin: 0 !important;
  vertical-align: middle; /* 垂直居中 */
  /* 6列均分，根据你实际列数改 */
  width: 16.666% !important;
}
/* 3. 按钮填满单元格，不额外撑高 */
.btn-full {
  height: 100% !important;
  min-height: unset !important;
  padding: 0 4px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
