<template>
    <div id="app">
      <div class="main">
        <Contact @set-contact="set"/>
        <Dialog :contact="contact" :msgList="msgList"/>
      </div>
    </div>
  </template>
  
  <script>
  import {request} from '@/js/network'
  import Contact from '@/view/chat/Contact'
  import Dialog from '@/view/chat/Dialog'
  
  export default {
    name: "Chat",
    components: {
      Dialog,
      Contact
    },
    data() {
      return {
        contact: null,
        msgList: []
      }
    },
    methods: {
      // 点击指定用户后，就获取两人之间的所有信息
      // 并将当前联系人保存在 localStorage
      set(user) {
        this.contact = user
        request({
          method: 'post',
          url: '/pullMsg',
          params: {
            from: JSON.parse(localStorage.getItem('user')).id,
            to: this.contact.id
          }
        }).then(res => {
          this.msgList = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
  </script>
  