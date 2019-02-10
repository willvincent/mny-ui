<template>
  <section class="no-top">
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

    <addresses :addresses="user.addresses" />
    <phone-numbers :numbers="user.phone_numbers" />
  </section>
</template>

<script>
import { getPracticeAreas } from '@/api/practice-areas';
import { getIndustries } from '@/api/industries';
import Treeselect from '@riophae/vue-treeselect';
import Addresses from '@/components/user/Addresses.vue';
import PhoneNumbers from '@/components/user/PhoneNumbers.vue';

export default {
  components: {
    Addresses,
    PhoneNumbers,
    Treeselect
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      industries: [],
      practiceAreas: [],
      selectedIndustries: [],
      selectedPracticeAreas: [],
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
  async created() {
    const practiceAreas = await getPracticeAreas();
    this.practiceAreas = practiceAreas;
    const industries = await getIndustries();
    this.industries = industries;
  }
}
</script>

<style lang="scss">
  .pad-top-pt3 .field-label {
    padding-top: .3rem;
  }
</style>
