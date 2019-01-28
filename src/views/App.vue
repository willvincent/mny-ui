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
      <section class="container fill-height">
        <!-- <login-reset-form /> -->
      </section>
    </template>
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb.vue'
import MainNav from '@/components/global/Navigation-Main.vue'

export default {
  components: {
    Breadcrumb,
    MainNav,
  },
  data() {
    return {
      loggedIn: true
    }
  }
}
</script>


<style lang="scss">
  @import '@/assets/styles/main.scss';
</style>
