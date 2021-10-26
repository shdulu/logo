<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">sudu 前端结构</router-link>
        </div>
        <user-profile :user="user"></user-profile>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer>© sudu前端（sudu.com）版权所有 | ICP备20000929号-2</a-layout-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import UserProfile from '@/components/UserProfile.vue'
export default defineComponent({
  name: 'Index',
  components: {
    UserProfile
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title a {
  color: #fff;
}
</style>
