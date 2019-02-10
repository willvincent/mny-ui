<template>
  <section class="no-top">
    <b-field horizontal label="Employee Information" class="pad-top">
      <b-field label="Staff ID" custom-class="is-small">
        <b-input v-model="profile.staff_number" />
      </b-field>
      <b-field label="Hire Date" custom-class="is-small">
        <b-datepicker
          v-model="profile.start_date"
          placeholder="Click to select..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Global Rate" custom-class="is-small">
        <b-input v-model="global_rate" icon="currency-usd" v-cleave="masks.money" />
      </b-field>

    </b-field>
    <b-field horizontal label="Personal Details" class="pad-top">
      <b-field label="Professional Title" custom-class="is-small">
        <b-input v-model="profile.title" />
      </b-field>
      <b-field label="SSN" custom-class="is-small">
        <b-input v-model="profile.ssn" v-cleave="masks.ssn" />
      </b-field>
      <b-field label="Date of Birth" custom-class="is-small">
        <b-datepicker
          v-model="profile.dob"
          placeholder="Click to select..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
    </b-field>
    <b-field horizontal label="Spouse" class="pad-top">
      <b-field label="Name" custom-class="is-small">
        <b-input v-model="profile.spouse_name" />
      </b-field>
      <b-field label="Phone Number" custom-class="is-small">
        <b-input v-model="profile.spouse_phone" v-cleave="masks.phone" />
      </b-field>
    </b-field>

    <phone-numbers :numbers="profile.phones" />
    <addresses :addresses="profile.addresses" />

    <b-field horizontal label="Practice Areas" class="pad-top-pt3">
      <treeselect
        v-model="selectedPracticeAreas"
        :multiple="true"
        :options="practiceAreas"
        :searchable="false"
        sort-value-by="INDEX"
      >
        <label
          slot="option-label"
          slot-scope="{ node, labelClassName }"
          :class="labelClassName"
        >
          {{ node.raw.name }}
        </label>
        <label
          slot="value-label"
          slot-scope="{ node }"
        >
          {{ label(node) }}
        </label>
      </treeselect>
    </b-field>
    <b-field horizontal label="Industry Specialties" class="pad-top-pt3">
      <treeselect
        v-model="selectedIndustries"
        :multiple="true"
        :options="industries"
        :searchable="false"
        sort-value-by="INDEX"
      >
        <label
          slot="option-label"
          slot-scope="{ node, labelClassName }"
          :class="labelClassName"
        >
          {{ node.raw.name }}
        </label>
        <label
          slot="value-label"
          slot-scope="{ node }"
        >
          {{ label(node) }}
        </label>
      </treeselect>
    </b-field>
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
  computed: {
    global_rate: {
      get() { return Number.isInteger(this.profile.global_rate) ? (this.profile.global_rate / 100).toFixed(2) : null },
      set(val) { this.profile.global_rate = Math.round(val * 100) },
    }
  },
  data() {
    return {
      industries: [],
      practiceAreas: [],
      selectedIndustries: [],
      selectedPracticeAreas: [],
      masks: {
        phone: {
          numericOnly: true,
          blocks: [0, 3, 3, 4],
          delimiters: ["(", ") ", "-"]
        },
        ssn: {
          numericOnly: true,
          blocks: [3, 2, 4],
          delimiters: ["-", "-"]
        },
        money: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand'
        }
      },
      profile: {},
    }
  },
  methods: {
    label(node) {
      let label = node.raw.name
      if (node.ancestors) {
        for (const a of node.ancestors) {
          label = `${a.raw.name} / ${label}`
        }
      }
      return label;
    },
  },
  watch: {
    user: {
      handler(user) {
        this.profile = Vue.observable(user.profile)
      },
      immediate: true,
    },
  },

  async created() {
    const practiceAreas = await getPracticeAreas();
    this.practiceAreas = practiceAreas;
    const industries = await getIndustries();
    this.industries = industries;
  }
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
