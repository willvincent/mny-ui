<template>
  <section class="no-top">
    <phone-numbers :numbers="profile.phones" />
    <addresses :addresses="profile.addresses" />
  </section>
</template>

<script>
import Vue from 'vue';
import { getPracticeAreas } from '@/api/practice-areas';
import { getIndustries } from '@/api/industries';
import Treeselect from '@riophae/vue-treeselect';
import Addresses from '@/components/user/Addresses.vue';
import PhoneNumbers from '@/components/user/PhoneNumbers.vue';
import cleave from '@/directives/cleave';

export default {
  components: {
    Addresses,
    PhoneNumbers,
    Treeselect
  },
  directives: {
    cleave
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      masks: {
        phone: {
          numericOnly: true,
          blocks: [0, 3, 3, 4],
          delimiters: ["(", ") ", "-"]
        }
      },
      profile: {},
    }
  },
  methods: {
  },
  watch: {
    user: {
      handler(user) {
        this.profile = Vue.observable(user.profile)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
  .pad-top .field-label {
    padding-top: 1.85rem;
  }
  .pad-top-pt3 .field-label {
    padding-top: .3rem;
  }
</style>
