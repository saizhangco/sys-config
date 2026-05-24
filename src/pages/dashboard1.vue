<template>
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

    <!-- 药品格子：宽度严格固定 + 与图片完全一致 -->
    <div class="medicine-grid">
      <div
        v-for="(item, index) in medicineList"
        :key="index"
        class="medicine-item"
      >
        <input type="radio" name="medicine" :id="`med${index}`" v-model="selected" :value="item.id" />
        <div class="medicine-info">
          <div class="med-id">{{ item.id }}</div>
          <div class="med-name">藥名: {{ item.name }}</div>
          <div class="med-stock">庫存量: {{ item.stock }}</div>
          <div class="med-max">最大量: {{ item.max }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 单选选中值
const selected = ref('')

// 药品数据（和图片完全一致）
const medicineList = ref([
  { id: '001', name: 'Stromectol Tab 3mg(Ivermectin)', stock: 11, max: 15 },
  { id: '003', name: 'Stromectol Tab 3mg(Ivermectin)', stock: 7, max: 15 },
  { id: '005', name: 'Chlorpheniramine Inj 5mg/ml*TBC*', stock: 9, max: 15 },
  { id: '007', name: 'Allegra Tab 60mg(Fexofenadine)', stock: 15, max: 15 },
  { id: '008', name: 'Chlorpheniramine Inj 5mg/ml*TBC*', stock: 11, max: 15 },
  { id: '009', name: 'NEOMYCIN Sulfate Oint 0.5% 28gm', stock: 11, max: 15 },
  { id: '010', name: 'Chlorpheniramine Inj 5mg/ml*TBC*', stock: 15, max: 15 },
  { id: '011', name: 'AmBisome Inj 50mg', stock: 13, max: 15 },
  { id: '012', name: '200mg Vfend Tab(Variconazole)', stock: 13, max: 15 },
  { id: '014', name: 'Voriconazole Sandoz Inj 200mg', stock: 0, max: 8 },
  { id: '017', name: 'Flucon Inj 200mg/100ml', stock: 8, max: 8 },
])
</script>

<style scoped>
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
  width: 228px;     /* 严格对照图片固定宽度 */
  height: 98px;     /* 严格对照图片固定高度 */
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