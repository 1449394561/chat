<template>
<div>
   <el-menu :default-active="activeIndex"
    background-color="rgb(11,37,92)"
  text-color="#fff"
  active-text-color="#ffd04b"
     class="el-menu-demo" mode="horizontal" >
  <el-menu-item index="1"><router-link to="/index/v2" style="text-decoration: none;">多样化分析</router-link></el-menu-item>
  <el-menu-item index="4"><router-link to="/index/v3" style="text-decoration: none;">K-means聚类分析</router-link></el-menu-item>
  <el-menu-item index="5"><router-link to="/index/v4" style="text-decoration: none;">svm票房预测</router-link></el-menu-item>
  <el-submenu  style="float: right;" index="2">
    <template slot="title">{{user.username}}</template>
    <el-menu-item index="2-1"><router-link to="/person" style="text-decoration: none;">个人中心</router-link></el-menu-item>
    <el-menu-item  v-if="user.role==1" index="2-2"><router-link to="/user" style="text-decoration: none;">用户管理</router-link></el-menu-item>
    <el-menu-item  index="2-3"><router-link to="/" style="text-decoration: none;">退出登录</router-link></el-menu-item>
  </el-submenu>
</el-menu>

    <div class="zhu">
        <router-view />
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import Header from "../components/Header";
import Aside from "../components/Aside";


export default {
//import 引入的组件需要注入到对象中才能使用
components: {
    // Header,
    Aside
},
props: {},
data() {
//这里存放数据
return {
        namen:'ppp',
        activeIndex: '1',
        activeIndex2: '1',
        user:[],
        name:''
};
},
//计算属性 类似于 data 概念
computed: {},
//监控 data 中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前 this 实例）
created() {
  // let userStr =  localStorage.getItem("user")
    // this.user1 = JSON.parse(userStr)
    this.user.id=localStorage.getItem("id")
    this.user.username=localStorage.getItem("username").replace('"', '').replace('"', '')
    this.user.password=localStorage.getItem("password").replace('"', '').replace('"', '')
    this.user.role=localStorage.getItem("role")
    // console.log(this.user.username+'pp')
    // console.log(this.user)
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
<style  scoped>




.router-link-active {
  text-decoration: none;
  color: yellow;
}
a{
  text-decoration: none;
  color: white;
}
.el-menu{
 
 border:0!important;
}

</style>