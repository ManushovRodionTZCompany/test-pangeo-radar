import { ref } from 'vue'

const useToggle = (valueDefault = false) => {
  const state = ref(valueDefault)

  const toggle = () => {
    state.value = !state.value
  }

  return { state, toggle }
}

export default useToggle
