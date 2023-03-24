<template>
    <el-row type="flex" class="login">
      <el-col :span="6">
        <h1 class="title">聊天室</h1>
        <el-form :model="loginForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              autocomplete="off"
              placeholder="用户名"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="id">
            <el-input
              type="id"
              v-model="loginForm.id"
              autocomplete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </template>
  <script>
  
  import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Loading,
    Message,
    FormItem
  } from 'element-ui'
  import {request} from '@/js/network'
  
  export default {
    name: 'Login',
    components: {
      'el-row': Row,
      'el-col': Col,
      'el-form': Form,
      'el-input': Input,
      'el-button': Button,
      'el-form-item': FormItem
    },
    data() {
      return {
        loginForm: {
          username: '',
          id: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          id: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm() {
        // const loading = Loading.service({ fullscreen: true })
        localStorage.setItem('user', JSON.stringify(this.loginForm))
        this.$router.push('/mchat')



        // request({
        //   method: 'post',
        //   url: 'http://localhost:9999/login',
        //   data: {
        //     'username': this.loginForm.username,
        //     'password': this.loginForm.password
        //   }
        // }).then(res => {
        //   loading.close()
        //   console.log(res.data)
        //   let user = res.data
        //   delete user.password
        //   if (!user) {
        //     Message('用户名或密码错误')
        //     return
        //   }
        //   // 登录成功将用户的信息存在 localStorage, 并跳转到聊天界面
        //   localStorage.setItem('user', JSON.stringify(user))
        //   this.$router.push('/chat')
        //   Message('登录成功')
        // }).catch(err => {
        //   console.log(err)
        // })
      }


      
    }
  }
  </script>
  