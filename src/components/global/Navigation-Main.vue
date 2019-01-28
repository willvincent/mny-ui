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
          <div class="navbar-link" :class="{'is-arrowless': hamburgerActive}">
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
        <div class="navbar-item has-dropdown is-hoverable" :class="{ 'is-active': hamburgerActive }">
          <div class="navbar-link" :class="{'is-arrowless': hamburgerActive}">
            <i class="mdi mdi-24px mdi-account-circle" />
            <span class="is-hidden-desktop"> User Account</span>
          </div>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item" @click="userMenuAction('logout')">
              <span><i class="mdi mdi-16px mdi-logout"></i> Logout</span>
            </a>
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

  .navbar {
    box-shadow: 0px 2px rgba(0,0,0, 0.2);
  }
  div.navbar-item {
    cursor: pointer;
    &.disabled {
      color: $grey-light;
      cursor: not-allowed;
    }
  }
</style>
