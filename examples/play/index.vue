<template>
  <div style="margin: 20px;">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="danger" style="width: 100%" size="large" round>搜索</el-button>
    <div>
      <el-button type="danger" style="width: 100%" size="large" round disabled>搜索</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!'
      };
    }
  };
</script>
