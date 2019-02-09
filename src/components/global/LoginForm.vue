<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div
          v-if="!forgotPassword"
          class="title"
        >
          <h3 class="title has-text-grey">
            Login
          </h3>
          <p class="subtitle has-text-grey">
            Please login to proceed.
          </p>
        </div>
        <div
          v-else
          class="title"
        >
          <h3 class="title has-text-grey">
            Forgot Password
          </h3>
        </div>
        <div class="box">
          <template v-if="!forgotPassword">
            <form>
              <b-field>
                <b-input
                  ref="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  icon="email"
                  autofocus=""
                />
              </b-field>

              <b-field>
                <b-input
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  icon="lock"
                  password-reveal
                  autofocus=""
                />
              </b-field>
              <button
                class="button is-block is-primary is-large is-fullwidth"
                @click.prevent="login()"
              >
                Login
              </button>
            </form>
          </template>
          <template v-else>
            <form>
              <b-field>
                <b-input
                  ref="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email"
                  icon="email"
                  autofocus=""
                />
              </b-field>
              <button
                class="button is-block is-primary is-large is-fullwidth"
                @click.prevent="passwordReset()"
              >
                Send Reset Instructions
              </button>
            </form>
          </template>
        </div>
        <p class="has-text-grey">
          <!-- <a href="../">
            Sign Up
          </a> &nbsp;·&nbsp; -->
          <a @click="resetForm(); forgotPassword = !forgotPassword">
            <span v-if="forgotPassword">
              &laquo; Login
            </span><span v-else>
              Forgot Password
            </span>
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
      forgotPassword: false,
      form: {
        email: null,
        password: null,
      },
      loading: null,
    }
  },
  methods: {
    async login() {
      if (!this.form.email ||
          !this.form.password ||
          !this.$refs.email.checkHtml5Validity()
      ) {
        return this.$toast.open({
          message: 'Please enter a valid email address and password',
          type: 'is-warning',
        });
      }


      try {
        await this.$store.dispatch('auth/login', {
          ...this.form
        });

        // this.$router.push(userDefaultPath(this.$router))
      } catch (error) {
        this.$toast.open({
          title: 'Invalid Login',
          message:
            'Either the username or password you supplied is incorrect. Please try again.',
          type: 'is-danger'
        });

        console.error(error);
      }
    },
    resetForm() {
      this.form = {
        email: null,
        password: null,
      }
    },
    async passwordReset() {
      // Trigger password reset api call
      if (
        !this.form.email ||
        !this.$refs.email.checkHtml5Validity()
      ) {
        return this.$toast.open({
          message: 'Please enter a valid email address',
          type: 'is-warning',
        });
      }

      try {
        await this.$store.dispatch('auth/password_reset_request', {
          ...this.form
        });

        this.$snackbar.open({
          message: 'An email has been sent to you with password reset instructions.',
          type: 'is-primary',
        });

        this.resetForm();
        this.forgotPassword = false;
      } catch (error) {
        this.$snackbar.open({
          message: 'Unable to process your request',
          type: 'is-danger',
        });

        console.error(error);
      }
    }
  },
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  html, body {
    background: $neutral-lightest !important;
  }

  .title {
    margin-bottom: 1em;
  }
</style>
