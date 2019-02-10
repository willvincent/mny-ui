
<template>
  <section class="address-section">
    <b-field horizontal label="Addresses" class="columns">
      <div class="column is-full">
        <section class="section empty-addresses" v-if="records.length < 1">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="mailbox"
                size="is-large"
              />
            </p>
            <p>No addresses found.</p>
          </div>
        </section>
        <div class="box" v-for="(address, index) of records" :key="index">
          <div class="media-content">
            <div class="content">
              <div class="columns">
                <b-field label="Name" class="column is-one-third-desktop" custom-class="is-small">
                  <b-input v-model="records[index].name" />
                </b-field>
                <b-field label="Address 1" class="column is-one-third-desktop" custom-class="is-small">
                  <b-input v-model="records[index].street_address_1" />
                </b-field>
                <b-field label="Address 2" class="column is-one-third-desktop" custom-class="is-small">
                  <b-input v-model="records[index].street_address_2" />
                </b-field>
              </div>
              <div class="columns">
                <b-field label="City" class="column is-one-third-desktop" custom-class="is-small">
                  <b-input v-model="records[index].city" />
                </b-field>
                <b-field label="State" class="column" custom-class="is-small">
                  <b-select v-model="records[index].state" expanded>
                    <option v-for="state of states" :key="state">{{ state }}</option>
                  </b-select>
                </b-field>
                <b-field label="Zip" class="column" custom-class="is-small" expanded>
                  <b-input v-model="records[index].zip" v-cleave="masks.zip" />
                </b-field>
              </div>
              <b-field class="column has-text-right">
                <a class="button is-danger" @click="removeAddress(index)">
                  <b-icon icon="delete" />
                  <span> Remove</span>
                </a>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </b-field>

    <div class="has-text-right">
      <a class="button is-dark" @click="addEmptyAddress">
        <b-icon icon="plus-circle" />
        <span> Add Address</span>
      </a>
    </div>
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
    addresses: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      records: [],
      states: [
        'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
        'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
        'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
        'VT','VI','VA','WA','WV','WI','WY'
      ],
      masks: {
        zip: {
          numericOnly: true,
          blocks: [5, 4],
          delimiters: ["-"]
        }
      },
    }
  },

  methods: {
    addEmptyAddress() {
      this.records.push({
        name: null,
        street_address_1: null,
        street_address_2: null,
        city: null,
        state: null,
        zip: null,
      });
    },
    removeAddress(index) {
      this.records.splice(index, 1);
    }
  },

  watch: {
    addresses: {
      handler(addr) {
        this.records = Vue.observable(addr)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">

  .address-section {
    margin-bottom: .5em;
    .field.columns {
      margin-bottom: 0;
      .field-label > label.label {
        padding-top: 1em;
      }
    }
    .has-text-right {
      padding-right: 1em;
    }
  }
  .empty-addresses {
    background: white;
    border-bottom: 2px solid #dbdbdb;
  }
  .box {
    .media-content {
      overflow: hidden;
    }
    margin-bottom: .5em !important;
  }
</style>
