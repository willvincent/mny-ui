<template>
  <div class="field">
    <p class="control">
      <input
        v-model="query"
        class="input"
        type="text"
        :placeholder="label"
      >
      <i
        v-if="query"
        class="clear-search mdi mdi-16px mdi-close-circle"
        @click="query = null; callback()"
      />
    </p>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';
export default {
  props: {
    callback: {
      type: Function,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      query: null
    }
  },

  watch: {
    search: {
      handler(val) {
        this.query = val
      },
      immediate: true,
    },
    query: _debounce(function (val) {
      this.$emit('update:search', val)
      this.callback();
    }, 300),
  }
}
</script>

<style lang="scss" scoped>
  .clear-search {
    position: absolute;
    right: 8px;
    top: 6px;
    cursor: pointer;
  }
</style>