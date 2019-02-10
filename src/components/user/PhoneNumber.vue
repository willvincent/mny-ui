<template>
  <b-field horizontal grouped-muliline>
    <b-field label="Label" custom-class="is-small">
      <b-input v-model="record.name" />
    </b-field>
    <b-field label="Number" custom-class="is-small">
      <b-input v-model="record.number" />
    </b-field>
    <b-field label="Extension" custom-class="is-small">
      <b-input v-model="record.extension" />
    </b-field>
    <b-field label="Type" custom-class="is-small">
      <b-select v-model="record.type">
        <option v-for="option of phoneTypes" :key="option.id" :value="option.id">{{ option.label }}</option>
      </b-select>
    </b-field>
  </b-field>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    phone: {
      type: Object,
      default() {
        return {
          name: null,
          number: null,
          extension: null,
          type: null,
          user_id: null,
        }
      }
    }
  },
  data() {
    return {
      record: {},
      phoneTypes: [
        { id: 'HOME', label: 'Home' },
        { id: 'MOBILE', label: 'Mobile' },
        { id: 'FAX', label: 'Fax' },
        { id: 'PAGER', label: 'Pager' },
        { id: 'OTHER', label: 'Other' },
      ],
    }
  },

  watch: {
    phone: {
      handler(phone) {
        this.record = Vue.observable(phone)
      },
      immediate: true
    }
  }
}
</script>
