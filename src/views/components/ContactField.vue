<template>
  <tr>
    <td class="property__name">{{ index }}</td>
    <td class="property__value">
      {{ prop }}
      <!-- Edit button -->
      <span
        @click="setEditFormVisibility(true)"
      >
        &#128393;
      </span>
      <!-- Delete button -->
      <span
        @click="deleteField"
      >
        &#10006;
      </span>
      <!-- Edit form -->
      <div
        class="field-edit"
        v-if="editFormVisible"
      >
        <input
          type="text"
          class="field-edit__input"
          ref="editInput"
          @input="validateInput($event.target.value)"
          @keypress.enter="updateField"
        />
        <!-- OK button -->
        <button
          class="field-edit__ok-button"
          @click="updateField"
        >
          &#10004;
        </button>
        <!-- Cancel button -->
        <button
          class="field-edit__cancel-button"
          @click="setEditFormVisibility(false)"
        >
          &#10006;
        </button>
        <!-- Error label -->
        <span
          class="field-edit__error-label"
          v-if="errorVisible"
        >
          Значение поля не может быть пустым
        </span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ContactField',
  props: {
    index: {
      type: String,
      required: true,
    },
    prop: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      editFormVisible: false,
      errorVisible: false,
    }
  },
  methods: {
    validateInput (value) {
      if (value.trim() === '')
        this.setErrorVisibility(true)
      else
        this.setErrorVisibility(false)
    },
    updateField () {
      const value = this.$refs.editInput.value.trim()
      if (value !== '') {
        this.$emit('updateField', { [this.index]: value })
        this.setEditFormVisibility(false)
      }
      else
        this.setErrorVisibility(true)
    },
    deleteField () {
      this.$emit('deleteField', this.index)
    },
    setEditFormVisibility (value) {
      this.editFormVisible = value
    },
    setErrorVisibility (value) {
      this.errorVisible = value
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
