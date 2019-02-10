<template>
  <section class="no-top">
    <b-field
      horizontal
      label="Name"
      class="pad"
    >
      <b-field
        label="Legal First Name"
        custom-class="is-small"
      >
        <b-input
          v-model="account.first_name"
          name="first_name"
          placeholder="First Name"
          expanded
        />
      </b-field>
      <b-field
        label="Middle Name"
        custom-class="is-small"
      >
        <b-input
          v-model="account.middle_name"
          name="middle_name"
          placeholder="Middle Name"
          expanded
        />
      </b-field>
      <b-field
        label="Last Name"
        custom-class="is-small"
      >
        <b-input
          v-model="account.last_name"
          name="last_name"
          placeholder="Last Name"
          expanded
        />
      </b-field>
    </b-field>
    <b-field horizontal>
      <b-field
        label="Preferred First Name"
        custom-class="is-small"
      >
        <b-input
          v-model="account.preferred_name"
          name="preferred_name"
          placeholder="Preferred"
          expanded
        />
      </b-field>
      <b-field
        label="Initials"
        custom-class="is-small"
      >
        <b-input
          name="initials"
          disabled
          :value="userInitials"
          expanded
        />
      </b-field>
    </b-field>
    <b-field
      horizontal
      label="Email"
    >
      <b-field custom-class="is-small">
        <b-input
          v-model="account.email"
          icon="email"
          name="email"
          placeholder="Email Address"
          expanded
          type="email"
        />
      </b-field>
    </b-field>
    <b-field
      v-if="account.id === $store.state.auth.myUserId"
      horizontal
      label="Password"
    >
      <b-input
        v-model="account.old_password"
        icon="lock"
        placeholder="Current Password"
        expanded
        type="password"
        password-reveal
      />
      <b-input
        v-model="account.password"
        icon="lock"
        placeholder="New Password"
        expanded
        type="password"
        password-reveal
      />
      <b-input
        v-model="account.password_confirmation"
        icon="lock"
        placeholder="Password Confirmation"
        expanded
        type="password"
        password-reveal
      />
    </b-field>
    <b-field
      v-if="account.id === $store.state.auth.myUserId"
      horizontal
      class="password-feedback-container"
    >
      <progress
        class="progress is-small is-full-width"
        max="100"
        :value="passwordStrength"
        :class="passwordStrengthClass"
      />

      <div
        v-if="passwordSuggestions.length > 0 && account.password"
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
    </b-field>
  </section>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      account: {
        password: '',
        password_confirmation: '',
      },
      passwordStrength: 0,
      passwordSuggestions: [],
      passwordWarning: null,
      zxcvbn: null,
    }
  },
  computed: {
    userInitials() {
      let initials = '';
      if (this.account.first_name) {
        initials += this.account.first_name.slice(0,1)
      }
      if (this.account.middle_name) {
        initials += this.account.middle_name.slice(0,1)
      }
      if (this.account.last_name) {
        initials += this.account.last_name.slice(0,1)
      }
      return initials;
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
    'account.password'(value) {
      if (typeof this.zxcvbn === 'function') {
        const strength = this.zxcvbn(value)
        this.passwordStrength = strength.score * 25;
        if (strength.score === 0 && this.account.password) {
          this.passwordStrength = 7;
        }
        this.passwordSuggestions = strength.feedback.suggestions;
        this.passwordWarning = strength.feedback.warning;
      }
    },
    user: {
      handler(user) {
        this.account = Vue.observable(user)
      },
      immediate: true,
    },
  },
  async created() {
    const busy = this.$loading.open()
    this.zxcvbn = (await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')).default
    busy.close()
  },
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .field.pad > .field-label > label.label {
    padding-top: 1.5em;
  }
  .password-feedback-container {
    .field-body {
      flex-direction: column;
      .field {
        margin: 0;
      }
    }
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
