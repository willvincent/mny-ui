<template>
  <nav role="navigation" class="breadcrumb" aria-label="breadcrumbs"  v-if="crumbs.length || (showHome && $route.path !== '/')">
    <div class="container is-fluid">
      <ul>
        <!-- Home -->
        <router-link
          v-if="showHome"
          tag="li"
          to="/"
        >
          <a><span><i class="mdi mdi-16px mdi-home"></i></span></a>
        </router-link>

        <!-- Breadcrumbs -->
        <li
          v-for="(crumb, index) of crumbs"
          :key="index"
        >
          <router-link :to="crumb.path">
            <span>
              <i v-if="crumb.icon" class="mdi mdi-16px" :class="['mdi-' + crumb.icon]"></i>
              {{ crumb.name }}
            </span>
          </router-link>
        </li>

        <!-- Current Page -->
        <li class="is-active">
          <router-link :to="$route.path" aria-current="page">
            <span>
              <i v-if="$route.meta.icon" class="mdi mdi-16px" :class="['mdi-' + $route.meta.icon]"></i>
              {{ $route.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    showHome: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      crumbs: []
    }
  },
  watch: {
    '$route' () {
      this.crumbs = this.$route.meta.breadcrumb || []
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main.scss';

  nav.breadcrumb {
    color: findInvertColor($neutral-lighter);
    background: $neutral-lighter;
    padding: .6rem .8rem;
  }
</style>

