<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey">
          Reset Password
        </h3>
        <p class="subtitle has-text-grey">
          Please enter a new password.
        </p>
        <div class="box">
          <form>
            <b-field>
              <b-input
                type="password"
                v-model="form.password"
                placeholder="New Password"
                icon="lock"
                password-reveal
                autofocus=""
              />
            </b-field>

            <b-field>
              <b-input
                type="password"
                v-model="form.confirmPassword"
                placeholder="Confirm Password"
                icon="lock"
                password-reveal
                autofocus=""
              />
            </b-field>
            <button
              @click.prevent="login()"
              class="button is-block is-primary is-large is-fullwidth"
            >
              Update Password
            </button>
          </form>
        </div>
        <p class="has-text-grey">
          <!-- <a href="../">
            Sign Up
          </a> &nbsp;·&nbsp; -->
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
      token: null,
      form: {
        password: null,
        confirmPassword: null,
      }
    }
  },
  created() {
    this.token = this.$route.params.pathMatch
  }
}
</script>
