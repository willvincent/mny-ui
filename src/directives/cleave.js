// You have to install cleave.js to use it:
// 'npm install cleave.js'
import Cleave from 'cleave.js'

/**
 * We add a new instance of Cleave when the element
 * is bound or updated, and destroy it when it's unbound.
 */
export default {
    name: 'cleave',
    bind(el, binding) {
        const input = el.querySelector('input')
        input._vCleave = new Cleave(input, binding.value)
    },
    componentUpdated(el, binding) {
      const input = el.querySelector('input')
      input._vCleave = new Cleave(input, binding.value)
    },
    update(el, binding) {
        const input = el.querySelector('input')
        input._vCleave.destroy()
        input._vCleave = new Cleave(input, binding.value)
    },
    unbind(el) {
        const input = el.querySelector('input')
        input._vCleave.destroy()
    }
}
