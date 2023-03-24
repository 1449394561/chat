<template>
    <div class="contact">
      <div class="top">
        <div class="left">
          <img class="avatar" :src="`${api}/static/img/${user.id}.jpg`" alt=""/>
        </div>
        <div class="right">
          {{ user.username }}
        </div>
      </div>
      <div v-if="friendList.length" class="bottom">
        <div v-for="(friend, i) in friendList" class="friend" :class="{activeColor: isActive(i)}" @click="setContact(i)">
          <div class="left">
            <img class="avatar" :src="`${api}/static/img/${friend.id}.jpg`" alt=""/>
          </div>
          <div class="right">
            {{ friend.username }}
          </div>
        </div>
      </div>
      <div v-else class="info">
        <div class="msg">
          还没有好友~~~
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {request} from '@/js/network'
  
  export default {
    name: 'Contact',
    data() {
      return {
        api: 'http://localhost:9999',
        active: -1,
        friendList: []
      }
    },
    mounted() {
      // 界面渲染时获取用户的好友列表并展示
      request({
        method: 'post',
        url: '/getFriends',
        params: {
          id: this.user.id
        }
      }).then(res => {
        this.friendList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      user() {
        return JSON.parse(localStorage.getItem('user'))
      }
    },
    methods: {
      setContact(index) {
        this.active = index
        delete this.friendList[index].password
        this.$emit('set-contact', this.friendList[index])
      },
      isActive(index) {
        return this.active === index
      }
    }
  }
  </script>
  