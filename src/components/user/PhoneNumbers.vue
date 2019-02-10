
<template>
  <section>
      <b-field horizontal label="Phone Numbers" :class="{'columns': phones.length < 1}">
        <div class="column is-full" v-if="phones.length < 1">
          <section class="section empty-phones">
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
          <div class="has-text-right">
            <a class="button is-dark" @click="addEmptyPhone">
              <b-icon icon="plus-circle" />
              <span> Add Phone Number</span>
            </a>
          </div>
        </div>
        <b-table
          v-else
          :data="phones"
        >
          <template slot-scope="{ row, index }">
            <b-table-column
              field="name"
              label="Name"
            >
              <b-input v-model="phones[index].name" />
            </b-table-column>
            <b-table-column
              field="number"
              label="Number"
            >
              <b-input v-model="phones[index].number" v-cleave="masks.phone" />
            </b-table-column>
            <b-table-column
              field="extension"
              label="Extension"
            >
              <b-input v-model="phones[index].extension" />
            </b-table-column>
            <b-table-column
              field="type"
              label="Type"
            >
              <b-select v-model="phones[index].type">
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
      default: () => [],
    }
  },
  data() {
    return {
      phones: [],
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
      this.phones.push({
        name: null,
        number: null,
        type: 'HOME',
        extension: null,
      });
    },
    removePhone(index) {
      this.phones.splice(index, 1);
    }
  },

  watch: {
    numbers: {
      handler(numbers) {
        this.phones = Vue.observable(numbers)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  .columns .field-label label.label {
    padding-top: .5em;
  }
  .empty-phones {
    background: white;
    border-bottom: 2px solid #dbdbdb;
  }
  .column .has-text-right {
    padding: .75em 1em 0;
  }
</style>
