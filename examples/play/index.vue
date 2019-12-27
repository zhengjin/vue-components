<template>
  <div style="margin: 20px;">
    <el-button type="danger" style="width: 100%" size="large" round :disabled="false">搜索</el-button>

    <el-input v-model="input" clearable placeholder="请输入内容"></el-input>

    <div>
      <div><el-radio v-model="radio" label="1" border style="width: 100%">Split equally</el-radio></div>
      <div><el-radio v-model="radio" label="2" border style="width: 100%">Split individually</el-radio></div>
    </div>

    <div>
      <el-checkbox v-model="checked1">备选项1</el-checkbox>
      <el-checkbox v-model="checked2">备选项</el-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Hello Element UI!',
        radio: '1',
        checked1: false,
        checked2: true
      };
    }
  };
</script>
