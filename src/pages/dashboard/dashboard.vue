<template>
  <div class="dashboard">
    <!-- 一行4个统计卡片 -->
    <!-- <div class="card-row"> -->
    <!-- 自适应卡片容器：自动 3/4/6 个一行 -->
    <div class="card-grid">
      <el-card shadow="hover" class="card">
        <div>管藥已取數量</div>
        <div class="num">10</div>
      </el-card>

      <el-card shadow="hover" class="card">
        <div>管藥待取數量</div>
        <div class="num">70</div>
      </el-card>

      <el-card shadow="hover" class="card">
        <div>補藥數量</div>
        <div class="num">5</div>
      </el-card>
    </div> 
  </div>
</template>

<style scoped>
.card-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}
.card {
  text-align: center;
  padding: 20px 0;
  margin: 20px, 0;
  border-radius: 12px;
  background-color: #f8f9fa;
}
.num {
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
}
/* 核心：自适应网格布局 3~6个/行 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px; /* 卡片间距 */
  margin-bottom: 20px;
}
</style>