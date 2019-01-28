<template>
  <transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave"
  >
    <div
      v-show="isActive"
      class="snackbar"
      :class="[type,position]"
    >
      <p class="text">
        {{ message }}
      </p>
      <div
        v-if="actionText"
        class="action"
        :class="[type + '-inverted']"
        @click="action"
      >
        <button
          class="button"
          :class="type"
        >
          {{ actionText }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
    import config from '../../../../node_modules/buefy/src/utils/config'
    import NoticeMixin from '../../../../node_modules/buefy/src/utils/NoticeMixin.js'

    export default {
        name: 'Snackbar',
        mixins: [NoticeMixin],
        props: {
            actionText: {
                type: String,
                default: 'OK'
            },
            onAction: {
                type: Function,
                default: () => {}
            },
            indefinite: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                newDuration: this.duration || config.defaultSnackbarDuration
            }
        },
        methods: {
            /**
             * Click listener.
             * Call action prop before closing (from Mixin).
             */
            action() {
                this.onAction()
                this.close()
            }
        }
    }
</script>
