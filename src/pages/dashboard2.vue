<template>
  <v-container>
    <div class="medicine-wrapper">
      <!-- 顶部统计栏 -->
      <div class="header-stats">
        <div class="stat-card taken">
          <div class="stat-label">管藥已取數量</div>
          <div class="stat-number">10</div>
        </div>
        <div class="stat-card waiting">
          <div class="stat-label">管藥待取數量</div>
          <div class="stat-number">70</div>
        </div>
        <div class="stat-card supplement">
          <div class="stat-label">補藥數量</div>
          <div class="stat-number">5</div>
        </div>
      </div>
    </div>
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
              <div class="medicine-item">
                <div class="medicine-info">
                  <div class="med-id">{{ item.name }}</div>
                  <div class="med-name">藥名: {{ item.medicineName }}</div>
                  <div class="med-stock">庫存量: {{ item.quantity }}</div>
                  <div class="med-max">最大量: {{ item.maxQuantity }}</div>
                </div>
              </div>
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
    alert('分割(' + d.value._layerIndex + ',' + d.value._startIndex + ',' + d.value._endIndex + ')')
    splitItems(d.value._layerIndex, d.value._startIndex, d.value._endIndex - d.value._startIndex)
  }

  function merge () {
    alert('合併(' + d.value._layerIndex + ',' + d.value._startIndex + ',' + d.value._endIndex + ')')
    mergeItems(d.value._layerIndex, d.value._startIndex, d.value._endIndex - d.value._startIndex)
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
  /* 外层容器 */
  .medicine-wrapper {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
  }

  /* 顶部统计卡片 */
  .header-stats {
    display: flex;
    gap: 12px;
    margin-bottom: 22px;
  }
  .stat-card {
    flex: 1;
    text-align: center;
    padding: 14px 0;
    border-radius: 4px;
    color: #fff;
  }
  .stat-card.taken {
    background-color: #45BCCD;
  }
  .stat-card.waiting,
  .stat-card.supplement {
    background-color: #9FA3A4;
  }
  .stat-label {
    font-size: 16px;
    margin-bottom: 6px;
  }
  .stat-number {
    font-size: 44px;
    font-weight: bold;
  }

  /* ====================== 核心：严格固定宽度 ====================== */
  .medicine-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 格子间距和图片一致 */
  }

  /* 每个药品格子：宽度严格固定 = 和图片完全一样 */
  .medicine-item {
    width: 100%; /* 自动填满父容器分配的宽度 */
    height: 150px;     /* 严格对照图片固定高度 */
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    box-sizing: border-box;
  }

  /* 单选按钮 */
  .medicine-item input[type="radio"] {
    margin-top: 4px;
    transform: scale(1.1);
  }

  /* 药品信息排版 */
  .medicine-info {
    flex: 1;
    font-size: 14px;
    line-height: 1.5;
  }
  .med-id {
    font-size: 14px;
  }
  .med-name {
    font-size: 13px;
    white-space: pre-wrap;
  }
  .med-stock, .med-max {
    font-size: 13px;
  }
</style>
