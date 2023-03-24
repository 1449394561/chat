<template>
<div class="body">

    <div class="content">
        <div class="left">
            <p>WEATHER STATION</p>
            <el-button class="buttonClass" type="text" @click="$router.push('/register')">前往注册 >> </el-button>
            <div id="earth"></div>
        </div>
        <div class="middle">
            <form id="myform">
                <div class="login">
                    <input type="text" v-model="form.username" placeholder="请输入登录名" id="account" />
                </div>
                <div class="login">
                    <input type="password" v-model="form.password" @keyup.enter="keyDown"  placeholder="请输入密码" id="password" />
                </div>
            </form>

        </div>
        <div class="right">
            <div id="btn" title="Login">
                
                <div class="btn0"></div>
                
                <div class="btn1"></div>
                <div class="btn2"></div>
            </div>
        </div>
    </div>
    <div class="warning" style="display: none;">
        <span></span>PASSWORD ERROR, PLEASE RE-ENTER PASSWORD
    </div>
</div>
</template>

<script>

// import * as echarts from "echarts";
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import dynamicRoute from '../js/dynamicRoute';

export default {
//import 引入的组件需要注入到对象中才能使用
components: {},
props: {},
data() {
//这里存放数据
return {
    form:{}
};
},
//计算属性 类似于 data 概念
computed: {},
//监控 data 中的数据变化
watch: {},
//方法集合
methods: {
    cs(){
        console.log('ppppp')
    },
    keyDown(e){
          //如果是回车则执行登录方法
          if(e.keyCode == 13){
            //需要执行的登录方法
            this.login1();
          }
        },


    
    login(){
            const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ'
            }
              };
            this.axios.post("/api/kuang/mydept/movieuser/login",this.form).then(res => {
            if (res.data.code === 200) {
              console.log(res.data)
              console.log(res.data.user)

              localStorage.setItem("id", JSON.stringify(res.data.id))
              localStorage.setItem("username", JSON.stringify(res.data.username))
              localStorage.setItem("password", JSON.stringify(res.data.password))
              localStorage.setItem("role", JSON.stringify(res.data.role))
              localStorage.setItem("age", JSON.stringify(res.data.age))  // 缓存用户信息
            //   console.log(localStorage.getItem("age"))
              // 登录成功的时候更新当前路由
              this.$router.push("/v2")  //登录成功之后进行页面的跳转，跳转到主页

            } else {
              this.$message({
                type: "error",
                message: "账号或密码错误"
              })
            }
          })
            },
    login1(){
        
        this.axios.get("/api/menu").then(res => {
            if (res.status === 200) {
                this.$store.commit("routers/routers",res.data)

                console.log('ooos')
                console.log(this.$store.state.routers.routers)
                  console.log(res.data)
                  console.log('ooo')
                  this.$router.push('/index').catch(() =>{})
                } else {
                        this.$message({
                        type: "error",
                        message: 'error'
                        })
                        }
          })
        },
        login2(){
        this.$store.commit("routers/routers",dynamicRoute)
        this.$router.push('/index').catch(() =>{})
},

    },


//生命周期 - 创建完成（可以访问当前 this 实例）
created() {

},
//生命周期 - 挂载完成（可以访问 DOM 元素）
mounted () {
        //绑定事件
        window.addEventListener('keydown',this.keyDown);
      },
      //销毁事件

beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前

activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发

}
</script>
<style scoped>
.body{
    width: 100vw;
    height: 115vh;
    margin: 0;
    padding: 0;
    background: url("../img/loginbg.png") no-repeat center;
    background-size: cover;
}

.content{
    width: 845px;
    height: 260px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -125px;
    background: url("../img/login0.png") no-repeat center;
}
.left,.middle,.right{
    width: 33%;
    float: left;
    color: #B0CC35;
    text-align: center;
}
.left{
    margin-left: 1%;
    margin-top: 13px;
}
.left p{
    font-size: 18px;
}
.middle{
    margin-top: 80px;
}
.middle .login{
    width: 280px;
    height: 40px;
    margin-bottom: 30px;
    background: url("../img/login1.png") no-repeat center;
}
.middle .login input{
    height: 38px;
    border: none;
    background: none !important;
    outline: none;
    color: #B0CC35;
}
.right{
    margin-top: 50px;
    position: relative;
    box-sizing: border-box;
    padding-top: 88px;
    padding-left: 156px;
}
.btn0{
    position: absolute;
    width: 78px;
    height: 78px;
    background: url("../img/close0.png") no-repeat;
    background-size: 100%;
    animation: clockwise 3s linear infinite;
}
.btn1{
    position: absolute;
    width: 52px;
    height: 52px;
    margin: 13px;
    background: url("../img/close1.png") no-repeat;
    background-size: 100%;
}
.btn2{
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 24px;
    background: url("../img/close2.png") no-repeat;
    background-size: 100%;
    animation: anticlockwise 3s linear infinite;
}
@keyframes clockwise {
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(-360deg);
    }
}
@keyframes anticlockwise {
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg);
    }
}
#earth{
    width: 150px;
    height: 150px;
    margin-left: 60px;
}
.warning{
    width: 595px;
    height: 100px;
    background: url("../img/login2.png") no-repeat center;
    margin: 0 auto;
    position: relative;
    color:red;
    line-height: 100px;
    text-align: center;
    font-weight: bold;
}
.warning span{
    animation: 1s bounceIn;
    font-size: 50px;
    display: block;
    position: absolute;
    left: 8%;
    margin-top: -5px;
}
@keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }

    100% {
        transform: scale3d(1, 1, 1);
    }
}
.bounceIn{
    animation: 500ms bounceIn;
}
#btn{
    width: 78px;
    height: 78px;
    cursor: pointer;
}


.el-button {
    color: #B0CC35;
    font-size: 24px;
}

.buttonClass {
    margin-top: 20px;
  width: 90px;
  height: 60px;
  padding: 0;

}

</style>