<template>
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1>MNY</h1>
      </a>

      <a role="button" class="navbar-burger" :class="{ 'is-active': hamburgerActive }" @click="hamburgerActive = !hamburgerActive" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': hamburgerActive }">
      <div class="navbar-start">
        <!-- primary menu links -->
        <div class="navbar-item has-dropdown is-hoverable" :class="{ 'is-active': hamburgerActive }">
          <div class="navbar-link is-arrowless">
            <span>
              <i class="mdi mdi-18px mdi-account-multiple" />
              <span class="is-hidden-desktop"> Manage</span>
              Users
            </span>
          </div>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/admin/users/user-list">
              <span><i class="mdi mdi-16px mdi-view-list"></i> User List</span>
            </router-link>
          </div>
        </div>
        
      </div>

      <div class="navbar-end">
        <!-- user/contextual menu links -->
        <div class="navbar-item has-dropdown" :class="{ 'is-active': accountMenuOpen }" @click="accountMenuOpen = !accountMenuOpen">
          <div class="navbar-link">
            <i class="mdi mdi-24px mdi-account-circle" />
            <span class="is-hidden-desktop"> User Account</span>
          </div>
          <div class="navbar-dropdown is-right" :class="{'is-hidden-touch': !accountMenuOpen }">
            <div class="navbar-item" @click="userMenuAction('logout')">
              <span><i class="mdi mdi-16px mdi-logout"></i> Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation-Main',
  data() {
    return {
      hamburgerActive: false,
      userMenuOpen: false,
      accountMenuOpen: false,
    }
  },
  methods: {
    userMenuAction(command) {
      switch (command) {
        case 'logout':
          // this.$store.dispatch('auth/logout');
          break;

        default:
          break;
      }
    }
  },
  created() {
    document.body.classList.add('has-navbar-fixed-top')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main.scss';
  div.navbar-item {
    cursor: pointer;
    &.disabled {
      color: $grey-light;
      cursor: not-allowed;
    }
  }
</style>
