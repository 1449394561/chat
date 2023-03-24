<template>
    <div>
        <el-button type="text" @click="$router.push('/v2')">《《《 返回</el-button>
      <el-card style="width: 40%; margin-left: 350px;margin-top: 50px;">
        <el-form ref="user" :model="user" label-width="80px">
          <el-form-item style="text-align: center" label-width="0">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="user.username" disabled></el-input>
          </el-form-item>
          <el-form-item  label="密码">
            <el-input show-password v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="user.age"></el-input>
          </el-form-item>
          <!-- <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item> -->
  <!--        <el-form-item label="密码">-->
  <!--          <el-input v-model="form.password" show-password></el-input>-->
  <!--        </el-form-item>-->
          <!-- <el-form-item label="余额(￥)">
            <el-input v-model="form.account" show-password></el-input>
          </el-form-item> -->
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="update">保存</el-button>
        </div>
      </el-card>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "person",
    data() {
      return {
        form: {},
        user:{}
      }
    },
    created() {

        this.user.userid=localStorage.getItem("id")
        this.user.username=localStorage.getItem("username").replace('"', '').replace('"', '')
        this.user.password=localStorage.getItem("password").replace('"', '').replace('"', '')
        this.user.age=localStorage.getItem("age")
        this.user.role=localStorage.getItem("role")
    //   let str = sessionStorage.getItem("user") || "{}"
    //   this.form = JSON.parse(str)
    },
    methods: {
      handleAvatarSuccess(res) {
        this.form.avatar = res.data
        this.$message.success("上传成功")
        // this.update()
      },
      update() {

        const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIwMjM5OTksImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTEwMzk5fQ.qmzpq0zzMAOcj4o3oCkxsrEw7kxx6dr6ZcraE1yM5TCLYhmaJhcxfTN90Y4jI1n_Toxywiw9m5mjn4HDt89r1Q'
            }
              };

        this.axios.post("/api/kuang/mydept/movieuser/update",this.user,config).then(res => {
          console.log(res.data)
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "更新成功"
            })
            localStorage.setItem("password", JSON.stringify(this.user.password))
            // 触发Layout更新用户信息
          } else {
            this.$message({
              type: "error",
              message: "error"
            })
          }
        })
      }
    }
  }
  </script>
  
  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>