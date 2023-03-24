<template>
    <div style="padding: 10px">
  
      <!--    功能区域-->
      <div style="margin: 10px 0">
        <el-button type="text" @click="$router.push('/v2')">《《《 返回</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
  
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search1" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
        <el-button type="primary" style="margin-left: 5px" @click="load1">查询</el-button>
      </div>
      <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="userid"
            label="ID"
            sortable
        >
        </el-table-column>
        <el-table-column
            prop="username"
            label="用户名">
        </el-table-column>
        <el-table-column
            show-password
            prop="password"
            label="密码">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        <el-table-column label="角色列表" width="300">
          <template #default="scope">
            <el-select v-model="scope.row.roles" multiple placeholder="请选择" style="width: 80%">
              <el-option v-for="item in roles" :key="item.id" :label="item.comment" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template #default="scope">
            <!-- <el-button size="mini" type="primary" @click="handleChange(scope.row)">保存角色信息</el-button> -->
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.userid)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
  
      <div style="margin: 10px 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
  



  
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
            <el-radio v-model="form.sex" label="未知">未知</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="账户余额">
            <el-input v-model="form.account" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </template>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'User',
    components: {},
    data() {
      return {
        loading: true,
        form: {},
        dialogVisible: false,
        bookVis: false,
        search: '',
        search1: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        bookList: [],
        roles: []
      }
    },
    created() {
      this.load()
    },
    methods: {
    //   handleChange(row) {
    //     request.put("/user/changeRole", row).then(res => {
    //       if (res.code === '0') {
    //         this.$message.success("更新成功")
    //         if (res.data) {
    //           this.$router.push("/login")
    //         }
    //       }
    //     })
    //   },
      showBooks(books) {
        this.bookList = books
        this.bookVis = true
      },
      load() {
        // console.log(this.search)
        const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTA1MzEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk2OTMxfQ.VWrFtFO51A2ywFssLaz0nFn5EBiDNJaLg2OI0h7dgtAyNGNkxzSzm30W4cgY9ye2Cj4er2haAtSv3tIzDEK6IA'
            }
              };
        this.loading = true
        this.axios.get("/api/kuang/mydept/movieuser/load",config, {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search
          }
        }).then(res => {
          this.loading = false
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        })
        // request.get("/role/all").then(res => {
        //   this.roles = res.data
        // })
      },
      load1() {
        // console.log(this.search)
        const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTA1MzEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk2OTMxfQ.VWrFtFO51A2ywFssLaz0nFn5EBiDNJaLg2OI0h7dgtAyNGNkxzSzm30W4cgY9ye2Cj4er2haAtSv3tIzDEK6IA'
            }
              };
        this.loading = true
        this.axios.post("/api/kuang/mydept/movieuser/load1",this.search1,config).then(res => {

          this.loading = false
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        })
        // request.get("/role/all").then(res => {
        //   this.roles = res.data
        // })
      },
      handleUploadSuccess(res) {
        if (res.code === "0") {
          this.$message.success("导入成功")
          this.load()
        }
      },
      add() {
        this.dialogVisible = true
        this.form = {}
      },
      save() {
        if (this.form.userid) {  // 更新
            const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ'
            }
              };

        this.axios.post("/api/kuang/mydept/movieuser/update",this.form,config).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "更新成功"
              })
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
            this.load() // 刷新表格的数据
            this.dialogVisible = false  // 关闭弹窗
          })
        } else {  // 新增
            const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ'
            }
              };
            this.axios.post("/api/kuang/mydept/movieuser/add",this.form,config).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "新增成功"
              })
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
            this.load() // 刷新表格的数据
            this.dialogVisible = false  // 关闭弹窗
          })
        }
      },
      handleEdit(row) {
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogVisible = true
      },
      handleDelete(userid) {
        const config = {
              headers:{
                Authorization: 'Security-ceyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2NzIxMTE1NTEsImlzcyI6InNhbnMiLCJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiZXhwIjoxNjcyMTk3OTUxfQ.1KVjehA4HsE_mN6vPjLdi5YCiLOOH5AYi9an198yKbsCnrmDgcdnkfFUJFYFPQUOwN79v5uU64JV0v0fVtblAQ'
            }
              };
        console.log(userid)
        this.axios.get("/api/kuang/mydept/movieuser/delete/" + userid,config).then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load()  // 删除之后重新加载表格的数据
        })
      },
      handleSizeChange(pageSize) {   // 改变当前每页的个数触发
        this.pageSize = pageSize
        this.load()
      },
      handleCurrentChange(pageNum) {  // 改变当前页码触发
        this.currentPage = pageNum
        this.load()
      }
    }
  }
  </script>
  