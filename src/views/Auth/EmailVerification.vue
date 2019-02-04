<template>
  <div class="hero-body" v-if="invalid">
    <div class="container">
      <h1 class="title">
        <b-icon
          icon="alert"
          size="is-large"
          type="is-neutral"
        />
        Invalid Token
      </h1>
      <h2 class="subtitle">
        Oops! The email verification token you provided is not valid.
      </h2>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      token: null,
      invalid: false,
    }
  },
  async created() {
    this.token = this.$route.params.pathMatch

    try {
        await this.$store.dispatch('auth/verify_email', {
          token: this.token,
        });

        this.$snackbar.open({
          message: 'Your email address has been verified.',
          type: 'is-primary',
        });

        this.$router.push('/')
        // this.$router.push(userDefaultPath(this.$router))
      } catch (error) {
        this.invalid = true

        console.error(error);
      }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .hero-body {
    background: $warning-lightest;
  }
</style>
