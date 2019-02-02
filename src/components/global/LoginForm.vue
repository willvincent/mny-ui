<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">
          Login
        </h3>
        <p class="subtitle has-text-grey">
          Please login to proceed.
        </p>
        <div class="box">
          <form>
            <div class="field">
              <div class="control">
                <input
                  v-model="form.email"
                  class="input is-large"
                  type="email"
                  placeholder="Your Email"
                  autofocus=""
                >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input
                  v-model="form.password"
                  class="input is-large"
                  type="password"
                  placeholder="Your Password"
                >
              </div>
            </div>
            <button class="button is-block is-primary is-large is-fullwidth">
              Login
            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <!-- <a href="../">
            Sign Up
          </a> &nbsp;·&nbsp; -->
          <a href="../">
            Forgot Password
          </a>
          <!-- </a> &nbsp;·&nbsp; -->
          <!-- <a href="../">
            Need Help?
          </a> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';is-lighter

  html, body {
    background: $neutral-lightest !important;
  }
</style>
