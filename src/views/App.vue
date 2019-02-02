<template>
  <div>
    <template v-if="logged_in">
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

import { mapState } from 'vuex';

export default {
  components: {
    Breadcrumb,
    LoginForm,
    MainNav,
  },
  data() {
    return {
      loading: null,
    }
  },
  computed: {
    ...mapState('auth', ['logged_in', 'auth_busy'])
  },
  watch: {
    auth_busy: {
      handler(busy) {
        if (busy) {
          this.loading = this.$loading.open()
        } else {
          if (this.loading !== null) {
            this.loading.close()
          }
        }
      },
      immediate: true,
    },
  },
}
</script>


<style lang="scss">
  @import '@/assets/styles/main.scss'
</style>
