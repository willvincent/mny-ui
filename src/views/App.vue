<template>
  <div>
    <template v-if="loggedIn">
      <main-nav />
      <breadcrumb show-home />
      <div class="container is-fluid">
        <transition :name="'fade'">
          <router-view />
        </transition>
      </div>
    </template>

    <template v-else>
      <section class="hero is-fullheight">
        <login-form />
      </section>
    </template>
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb.vue'
import LoginForm from '@/components/global/LoginForm.vue'
import MainNav from '@/components/global/Navigation-Main.vue'

export default {
  components: {
    Breadcrumb,
    LoginForm,
    MainNav,
  },
  data() {
    return {
      loggedIn: false
    }
  }
}
</script>


<style lang="scss">
  @import '@/assets/styles/main.scss'
</style>
