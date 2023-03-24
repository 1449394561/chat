//动态路由
const dynamicRoute = [
    {
    "path": "/index",
    "name": "index",
    "redirect": "/index/v2",
    "component": "index.vue",
    "children": [
        {
        "path": "v2",
        "name": "v2",
        "component": "v2.vue",
      },
      {
        "path": "v3",
        "name": "v3",
        "component": "v3.vue",
      },
      {
        "path": "v4",
        "name": "v4",
        "component": "v4.vue",
      }


    ]
  },
  {
    "path": "/hello",
    "name": "hello",
    "component": "HelloWorld.vue",
  }
]
  export default dynamicRoute
  