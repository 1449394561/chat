<template>
<div>
    <el-button @click="exportExcel">前往 >> </el-button>
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
    classId:'',
    school:'',

};
},
//计算属性 类似于 data 概念
computed: {},
//监控 data 中的数据变化
watch: {},
//方法集合
methods: {
    exportExcel:function(){
				this.axios({
					//发送ajax获得后台查询的数据往表里添
				    url: 'http://localhost:9090/menu/export',
				    method: 'post',
					responseType: 'blob',//必须加该属性，设置响应头的格式
				    data: ({
				    //里面为我传的条件查询参数，可无视
				        'classId':this.classId,
				        'school':this.school,
				        // 'createTime':this.exportExcelParams.createTime,
						// 'checkBox':this.exportExcelParams.checkInfoOptions
				    })
				}).then(function(res) {
					if(res &&res.data!=null){
						//将后台获得的数据传给blob对象
						let blob = new Blob([res.data], {
						type: "application/vnd.ms-excel;charset=utf-8",
						});　
						//创建dom元素
						let downloadElement = document.createElement('a');
						let href = window.URL.createObjectURL(blob); //创建下载的链接
						downloadElement.href = href;
						//设置文件名
						const date = new Date()
						downloadElement.download = '学生信息表'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'.xls'; //下载后文件名
						document.body.appendChild(downloadElement);
						downloadElement.click(); //点击下载
						document.body.removeChild(downloadElement); //下载完成移除元素
						window.URL.revokeObjectURL(href); //释放掉blob对象
					}else{
						this.$message.error('导出失败')
					}

				})
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
.winClass{
        width: 300px;
        
    }
</style>