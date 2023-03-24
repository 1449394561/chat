import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../js/store'
import staticRoute from '../router/static_router'

Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: staticRoute //staticRoute为静态路由，不需动态添加
})



// let isToken = true
// router.beforeEach(async (to, from, next) => {
// 	//定义isToken为true和vuex不为空时添加路由
// 	console.log('sss')
// 	console.log(store.state.routers.routers)
// 	console.log('sssw')
// 	if (isToken && store.state.routers.routers.length != 0) {
		
// 		//从vuex中获取动态路由
// 		const accessRouteses = await store.state.routers.routers;
// 		//动态路由循环解析和添加
// 		accessRouteses.forEach(v => {
// 			var v1={};
// 			console.log(v)
// 			v1.path=v.path;
// 			v1.name=v.name;
// 			v1.component=v.component1
// 			console.log(v.children1[0].name)
// 			if(v.children1[0].name!=""){
// 				console.log("kkk")
// 				v1.children = routerChildren(v.children1);
// 			}
			
// 			// v.component=v.path.split('|')[1]
// 			v1.component = routerCom1(v1.component);
// 			console.log('ssspp')
// 			console.log(v1)
// 			console.log('ssspp')
// 			router.addRoute(v1); //添加
// 		})
// 		isToken = false //将isToken赋为 false ，否则会一直循环，崩溃
// 		next({
// 			...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
// 			replace: true, // 重进一次, 不保留重复历史
//     })
// 	} else {
// 		if (to.name == null) {
// 			next("/register")
// 		} else {
// 			if (to.meta.title) { //判断是否有标题
// 				document.title = to.meta.title //给相应页面添加标题
// 			}
// 			next()
//     }
// 	}

// })
function routerCom1(path) { //对路由的component解析
	return (resolve) => require([`@/components/${path}.vue`], resolve);
}
function routerCom(path) { //对路由的component解析
	return (resolve) => require([`@/view/${path}.vue`], resolve);
}
function routerChildren(children) { //对子路由的component解析

	children.forEach(v => {
		// v.component=v.path.split('|')[1]

		v.component1 = routerCom(v.component1);
		
		v.component=v.component1
		console.log('chcom')
		delete v.component1
		console.log(v)
		console.log('chcom')
		if (v.children != undefined) {
			v.children = routerChildren(v.children)
		}
	})
	return children
}
export default router
