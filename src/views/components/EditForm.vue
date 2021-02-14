<template>
  <div
    class="field-edit"
  >
    <div class="field-edit__wrapper">
      <input
        class="field-edit__input"
        type="text"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="validateInput($event.target.value)"
        @keypress.enter="$emit('complete', inputValue)"
        @keypress.esc="cancelPrompt"
      />
      <!-- OK button -->
      <div
        class="field-edit__ok-button"
        :disabled="errorVisible"
        @click="$emit('complete', inputValue)"
      >
        &#10004;
      </div>
      <!-- Cancel button -->
      <div
        class="field-edit__cancel-button"
        @click="cancelPrompt"
      >
        &#10006;
      </div>
    </div>
    <!-- Error label -->
    <span
      class="field-edit__error"
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
    },
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
        valid = (value.trim() !== '')
      this.setErrorVisibility(!valid)
    },
    setErrorVisibility (value) {
      this.errorVisible = value
    },
    cancelPrompt () {
      if (window.confirm('Отменить редактирование поля?'))
        this.$emit('aborted')
    },
  },
}
</script>

<style lang="sass" scoped>
.field-edit
  display: flex
  flex: 0 0 auto
  flex-flow: column nowrap

.field-edit__wrapper
  display: flex
  flex: 1 0 auto
  flex-flow: row nowrap

.field-edit__input
  display: flex
  flex: 1 1 auto

.field-edit__ok-button, .field-edit__cancel-button
  padding: 0.3rem 0.5rem
  cursor: default

.field-edit__ok-button
  color: green

.field-edit__cancel-button
  color: red

.field-edit__error
  font-size: 0.8rem
  color: red
</style>
