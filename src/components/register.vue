<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <div style="width: 400px; margin: 100px auto">
          <div style="font-size: 30px; text-align: center; padding: 30px 0; color: #333">欢迎注册大数据电影分析系统</div>
          <el-form ref="form" :model="form" size="normal" :rules="rules">
            <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user-solid" v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password placeholder="请输入密码" @keyup.enter.native="postData"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="postData">注册</el-button>
            </el-form-item>
            <el-form-item><el-button type="text" @click="$router.push('/')">前往登录 >> </el-button></el-form-item>
          </el-form>
        </div>
      </div>
      <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
        <source src="../images/sea.mp4" type="video/mp4"/>
      </video>
    </div>
  </div>

</template>

<script>


export default {
  name: "Login",

  data() {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      form: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      // 加背景图片
      // bg: {
      //   backgroundImage: "url(" + require("@/assets/bg.jpg") + ")",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%"
      // }
    }
  },
  mounted() {
    sessionStorage.removeItem("user")

    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()
  },
  methods: {

    
    postData(){
            // const config = {
            //     headers:{
            //       Authorization: Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIwMjM5OTksImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTEwMzk5fQ.qmzpq0zzMAOcj4o3oCkxsrEw7kxx6dr6ZcraE1yM5TCLYhmaJhcxfTN90Y4jI1n_Toxywiw9m5mjn4HDt89r1Q,
            //     }
            // };
            const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ'
            }
              };
            this.axios.post("/api/kuang/mydept/movieuser/register",this.form).then(res => {
            if (res.status=== 200) {
              console.log(res.data)
              // console.log('cg')
              // 登录成功的时候更新当前路由
              this.$router.push("/")  //登录成功之后进行页面的跳转，跳转到主页

            } else {
              this.$message({
                type: "error",
                message: "error"
              })
            }
          })
            },



    canplay() {
      this.vedioCanPlay = true
    },
    // login () {
    //   this.$refs['form'].validate((valid) => {
    //     if (valid) {
    //       request.post("/user/login", this.form).then(res => {
    //         if (res.code === '0') {
    //           this.$message({
    //             type: "success",
    //             message: "登录成功"
    //           })
    //           localStorage.setItem("user", JSON.stringify(res.data.user))  // 缓存用户信息

    //           // 登录成功的时候更新当前路由
    //           activeRouter()
    //           this.$router.push("/")  //登录成功之后进行页面的跳转，跳转到主页

    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: res.msg
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img{
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  /*background: rgba(0, 0, 0, 0.4);*/
  width: 100%;
}

.fillWidth {
  width: 100%;
}
</style>
