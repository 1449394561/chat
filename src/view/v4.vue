<template>
<div>

    <div class="main1">
      
    <el-form :model="ruleForm"
     v-loading="loading" element-loading-text="拼命预测中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" 
    :rules="rules" ref="ruleForm" 
    label-width="100px" class="demo-ruleForm">
  <el-form-item  style="width: 600px;" label="电影评分" prop="pf">
    <el-input placeholder="请输入10以下一位小数点内评分" type="number" v-model="ruleForm.pf"></el-input>
  </el-form-item>
  <el-form-item  style="width: 600px;" label="得分票数" prop="votes">
    <el-input placeholder="请输入票数" type="number" v-model="ruleForm.votes"></el-input>
  </el-form-item>
  <el-form-item  style="width: 600px;" label="电影时长" prop="duration">
    <el-input placeholder="请输入三位数内时长" type="number" v-model="ruleForm.duration"></el-input>
  </el-form-item>
  <el-form-item style="width: 600px;" label="" >
    <el-input type="number" placeholder="请输入不超过三个类型" disabled></el-input>
  </el-form-item>
  <el-form-item style="width: 650px;" label="电影类型" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="Action" name="type"></el-checkbox>
      <el-checkbox label="Adventure" name="type"></el-checkbox>
      <el-checkbox label="Animation" name="type"></el-checkbox>
      <el-checkbox label="Comedy" name="type"></el-checkbox>
      <el-checkbox label="Crime" name="type"></el-checkbox>
      <el-checkbox label="Drama" name="type"></el-checkbox>
      <el-checkbox label="Family" name="type"></el-checkbox>
      <el-checkbox label="Fantasy" name="type"></el-checkbox>
      <el-checkbox label="Horror" name="type"></el-checkbox>
      <el-checkbox label="Mystery" name="type"></el-checkbox>
      <el-checkbox label="Romance" name="type"></el-checkbox>
      <el-checkbox label="Sci-Fi" name="type"></el-checkbox>
      <el-checkbox label="Thriller" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="open">立即预测</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>




</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import 引入的组件需要注入到对象中才能使用
components: {},
props: {},
data() {
  
//这里存放数据
return {
    visible: false,
    loading: false,
    nana:'664万美元',
    ruleForm: {
          pf: '',
          votes: '',
          duration:'',
          type: [],

        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {  message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],

        //   type: [
        //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        //   ],

        }

};
},
//计算属性 类似于 data 概念
computed: {},
//监控 data 中的数据变化
watch: {},
//方法集合
methods: {


    open() {

      var vo=this.ruleForm.votes
      var volist=vo.split('')

      // str = Math.round(str * Math.pow(10,2)) / Math.pow(10,2)
      var vot=''
      var vote=volist[0]
          vot=vote.toString()
      for (var i = 0; i < volist.length-1; i ++){
        vot=vot+'0'
        // console.log(vot)
      }
      this.ruleForm.votes=parseInt(vot)
      // console.log(this.ruleForm.votes)
      if(this.ruleForm.pf>10){
        this.$alert('请选择10以下评分', {
          confirmButtonText: '确定',

        });
        return;
      }

      var str1 =this.ruleForm.pf
      var stt2=str1.split('.')
      var stt=[]
      var lisp=this.ruleForm.type.length
      if(stt2.length >1){
          stt=str1.split('.')[1]
      }
      if (stt.length > 1){

        this.$alert('只能选择一位小数点', {
          confirmButtonText: '确定',

        });
        return;
      }
      
      if (lisp>3){
        this.$alert('请选择不超过三个类型', {
          confirmButtonText: '确定',

        });
        return;
      }

      this.loading=true
        this.axios.post("http://127.0.0.1:5000/yuc", this.ruleForm).then(res => {

            if(res.status=200){
              this.loading=false
                this.nana=res.data
                this.$alert('该电影的票房预测为'+this.nana, '预测结果', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: 'sucess'
            });
          }
        });
            }
              console.log(res.data)
              
            //   sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息

              // 登录成功的时候更新当前路由
        
            
          })

          
      },
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
      }
},
//生命周期 - 创建完成（可以访问当前 this 实例）
created() {

},
//生命周期 - 挂载完成（可以访问 DOM 元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>
<style scoped>
.main1{

    padding-top: 60px;
    padding-left: 400px;
    height: 80.7vh;
}

</style>