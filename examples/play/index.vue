<template>
  <div style="margin: 20px;">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item label="金额" prop="age">
        <el-input-money :maxlength="14" v-model="ruleForm.age" clearable placeholder="0.00" :disabled="false">
          <i style="color: #333333; font-style:normal" slot="suffix">THB</i>
        </el-input-money>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" clearable placeholder="请输入内容" :disabled="false"></el-input>
      </el-form-item>

      <div>
        <el-card shadow="always" style="margin-bottom: .2rem">
          <el-radio border size="medium" v-model="radio" label="1" style="width: 100%" :disabled="false">Split equally</el-radio>
        </el-card>
        <el-card shadow="always">
          <el-radio border size="medium" v-model="radio" label="2" style="width: 100%" :disabled="false">Split individually</el-radio>
        </el-card>
      </div>
      <div>
        <el-radio border size="small" v-model="radio" label="1" style="width: 100%" :disabled="false">Paid</el-radio>
      </div>

      <div>
        <el-checkbox v-model="checked1" :disabled="false">备选项1</el-checkbox>
      </div>

      <div>
        <el-avatar shape="square" :size="medium" :src="circleUrl"></el-avatar>
        <span style="width: .5rem; display: inline-block"></span>
        <el-avatar :size="medium" :src="circleUrl"></el-avatar>
      </div>

      <el-form-item label="年龄" prop="age">
        <el-input-number :maxlength="6" type="number" v-model.number="ruleForm.age" clearable placeholder="0" :disabled="false"></el-input-number>
      </el-form-item>

      <div>
        <el-button @click="submitForm('ruleForm')" type="danger" style="width: 100%" size="large" round :disabled="false">提交</el-button>
      </div>
      <div>
        <el-button @click="resetForm('ruleForm')" type="danger" style="width: 100%" size="large" round :disabled="true">重置</el-button>
      </div>

      <el-dialog :visible.sync="centerDialogVisible" width="30%" center :show-cancle="true" :confirm-btn-plain="true"
              v-if="showDialog" @cancle="cancle" @closeDialog="closeDialog">
        <p slot="title">titleTxt</p>
        <p slot="content">
          <template>contentTxt</template>
        </p>
        <p slot="cancle">Close</p>
        <p slot="confirm">See reward</p>
      </el-dialog>
      <div>
        <el-button type="danger" style="width: 100%" size="large" round :disabled="false" @click="showDialog = true">点击打开 Dialog</el-button>
      </div>

      <el-drawer size="25%" :visible.sync="drawer" :direction="direction" :with-header="false" @cancel="drawer = false" @handleContentClick="closeDialog">
        <div slot="content">
          <template><!--i标签中的id和span中的data-index定位点击的是哪个按钮-->
            <i id="paid" class="el-icon-circle-check cell-center"><span :data-index="1" class="cel-btn-txt">mark as paid</span></i>
            <!--<i id="show" class="el-icon-collection cell-center"><span :data-index="2" class="cel-btn-txt">show QR</span></i>-->
          </template>
        </div>
        <p slot="cancel" class="cell-center" style="height: 1.1rem">Cancel</p>
      </el-drawer>
      <div>
        <el-button type="danger" style="width: 100%" size="large" round :disabled="false" @click="drawer = true">点击打开 ActionSheet</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      const checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        });
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        input: 'Hello Element UI!',
        radio: '1',
        checked1: false,
        checked2: true,
        num: 1,
        centerDialogVisible: false,
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        drawer: false,
        direction: 'btt',
        medium: 'medium',
        showDialog: false,

        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleChange(value) {
        console.log(value);
      },
      cancle() {
        this.showDialog = false
      },
      closeDialog(evt) {
        let dom = evt.target;
        let targetId = dom.getAttribute('id');
        let index = dom.getAttribute('data-index');
        if(targetId === 'paid' || index === '1'){
          console.log('call paid method')
        }else {
          console.log('call show method')
        }

        this.drawer = false;
      },
    }
  };
</script>
