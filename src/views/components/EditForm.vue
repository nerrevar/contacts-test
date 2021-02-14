<template>
  <div
    class="field-edit"
  >
    <input
      class="field-edit__input"
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="validateInput($event.target.value)"
      @keypress.enter="$emit('complete', inputValue)"
    />
    <!-- OK button -->
    <button
      class="field-edit__ok-button"
      :disabled="errorVisible"
      @click="$emit('complete', inputValue)"
    >
      &#10004;
    </button>
    <!-- Cancel button -->
    <button
      class="field-edit__cancel-button"
      @click="$emit('aborted')"
    >
      &#10006;
    </button>
    <!-- Error label -->
    <span
      class="field-edit__error-label"
      v-if="errorVisible"
    >
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      required: false,
      default: 'Значение поля не может быть пустым',
    },
    customInputValidator: {
      type: Function,
      required: false,
    }
  },
  data () {
    return {
      errorVisible: false,
      inputValue: '',
    }
  },
  methods: {
    validateInput (value) {
      let valid = false
      if (this.customInputValidator !== undefined)
        valid = this.customInputValidator(value)
      else
        if (value.trim() === '')
          valid = false
        else
          valid = true
      this.setErrorVisibility(!valid)
    },
    setErrorVisibility (value) {
      this.errorVisible = value
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
