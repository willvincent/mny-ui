
<template>
  <section>
      <b-field horizontal label="Phone Numbers">
        <b-table
          :data="phone_numbers"
        >
          <template slot-scope="{ row, index }">
            <b-table-column
              field="name"
              label="Name"
            >
              <b-input v-model="phone_numbers[index].name" />
            </b-table-column>
            <b-table-column
              field="number"
              label="Number"
            >
              <b-input v-model="phone_numbers[index].number" v-cleave="masks.phone" />
            </b-table-column>
            <b-table-column
              field="extension"
              label="Extension"
            >
              <b-input v-model="phone_numbers[index].extension" />
            </b-table-column>
            <b-table-column
              field="type"
              label="Type"
            >
              <b-select v-model="phone_numbers[index].type">
                <option v-for="option of phoneTypes" :key="option.id" :value="option.id">{{ option.label }}</option>
              </b-select>
            </b-table-column>
            <b-table-column>
              <a class="button is-danger" @click="removePhone(index)">
                <b-icon icon="delete" />
                <span> Remove</span>
              </a>
            </b-table-column>
          </template>

          <template slot="empty">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon
                    icon="phone-log"
                    size="is-large"
                  />
                </p>
                <p>No phone numbers found.</p>
              </div>
            </section>
          </template>

          <template slot="footer">
            <div class="has-text-right">
              <a class="button is-dark" @click="addEmptyPhone">
                <b-icon icon="plus-circle" />
                <span> Add Phone Number</span>
              </a>
            </div>
          </template>
        </b-table>
      </b-field>
  </section>
</template>

<script>
import Vue from 'vue';
import cleave from '@/directives/cleave';

export default {
  directives: {
    cleave
  },
  props: {
    numbers: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      phone_numbers: [],
      phoneTypes: [
        { id: 'HOME', label: 'Home' },
        { id: 'MOBILE', label: 'Mobile' },
        { id: 'FAX', label: 'Fax' },
        { id: 'PAGER', label: 'Pager' },
        { id: 'OTHER', label: 'Other' },
      ],
      masks: {
        phone: {
          numericOnly: true,
          blocks: [0, 3, 3, 4],
          delimiters: ["(", ") ", "-"]
        }
      },
    }
  },

  methods: {
    addEmptyPhone() {
      this.phone_numbers.push({
        name: null,
        number: null,
        type: 'HOME',
        extension: null,
      });
    },
    removePhone(index) {
      this.phone_numbers.splice(index, 1);
    }
  },

  watch: {
    numbers: {
      handler(numbers) {
        this.phone_numbers = Vue.observable(numbers)
      },
      immediate: true
    }
  }
}
</script>
