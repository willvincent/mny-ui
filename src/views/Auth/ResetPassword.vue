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
            <b-field class="password">
              <b-input
                v-model="form.password"
                type="password"
                placeholder="New Password"
                icon="lock"
                password-reveal
                autofocus=""
              />
            </b-field>
            <progress
              class="progress is-small is-full-width"
              max="100"
              :value="passwordStrength"
              :class="passwordStrengthClass"
            />

            <div
              v-if="passwordSuggestions.length > 0 && form.password"
              class="content has-text-left password-feedback"
            >
              <p
                v-if="passwordWarning"
                class="warning"
              >
                <strong>Warning:</strong>
                {{ passwordWarning }}
              </p>
              <ul>
                <li
                  v-for="(suggestion, index) of passwordSuggestions"
                  :key="index"
                >
                  {{ suggestion }}
                </li>
              </ul>
            </div>

            <b-field class="password-confirm">
              <b-input
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                icon="lock"
                password-reveal
                autofocus=""
              />
            </b-field>

            <button
              :disabled="notReady"
              class="button is-block is-primary is-large is-fullwidth"
              @click.prevent="updatePassword()"
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
        password_confirmation: null,
      },
      passwordStrength: 0,
      passwordSuggestions: [],
      passwordWarning: null,
    }
  },
  computed: {
    notReady() {
      return (!this.form.password || this.form.password !== this.form.password_confirmation)
    },
    passwordStrengthClass() {
      if (this.passwordStrength <= 25) {
        return 'is-danger'
      } else if (this.passwordStrength <= 50) {
        return 'is-warning'
      } else if (this.passwordStrength <= 75) {
        return 'is-success'
      }
      return 'is-primary'

    }
  },
  watch: {
    'form.password'(value) {
      if (typeof this.zxcvbn === 'function') {
        const strength = this.zxcvbn(value)
        this.passwordStrength = strength.score * 25;
        if (strength.score === 0 && this.form.password) {
          this.passwordStrength = 7;
        }
        this.passwordSuggestions = strength.feedback.suggestions;
        this.passwordWarning = strength.feedback.warning;
      }
    }
  },
  async created() {
    const busy = this.$loading.open()
    this.token = this.$route.params.pathMatch

    this.zxcvbn = (await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')).default

    busy.close()
  },
  methods: {
    async updatePassword() {
      // Trigger password reset api call
      try {
        await this.$store.dispatch('auth/password_reset', {
          token: this.token,
          ...this.form
        });

        this.$snackbar.open({
          message: 'Your password has been updated.',
          type: 'is-primary',
        });

        this.resetForm();
        this.forgotPassword = false;
        this.$router.push('/')
        // this.$router.push(userDefaultPath(this.$router))
      } catch (error) {
        this.$snackbar.open({
          message: 'Unable to process your request',
          type: 'is-danger',
        });

        console.error(error);
      }
    },
    resetForm() {
      this.token = null,
      this.form = {
        password: null,
        password_confirmation: null,
      };
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';
  .box {
    position: relative;
  }
  .field.password {
    margin-bottom: .5em !important;
  }
  .field.password-confirm {
    margin-top: .5em !important;
  }
  .progress {
    height: .25em !important;
    margin-bottom: .5em !important;
    width: 100%;
  }
  .password-feedback {
    border-radius: 3px;
    border: 1px solid $warning-light;

    padding: 1em;
    font-size: .75em;
    margin-bottom: 0 !important;
    text-align: left;
    background: $warning-lightest;
    color: $warning-invert;
    p {
      margin: .25em !important;
      color: $danger-darkest;
      font-weight: bolder;
    }
    ul {
      margin-top: 0 !important;
    }
  }
</style>
