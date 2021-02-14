<template>
  <div class="property">
    <div class="property__name">{{ index }}</div>
    <div class="property__value">
      <span class="property__text">{{ prop }}</span>
      <div class="button-block">
        <!-- Edit button -->
        <span
          class="button-edit"
          @click="setEditFormVisibility(true)"
        >
          &#128393;
        </span>
        <!-- Delete button -->
        <span
          class="button-delete"
          v-if="!deletingDisabled"
          @click="deleteField"
        >
          &#10006;
        </span>
      </div>
      <!-- Edit form -->
      <EditForm
        v-if="editFormVisible"
        placeholder="Новое значение поля"
        @complete="updateField($event)"
        @aborted="setEditFormVisibility(false)"
      />
    </div>
  </div>
</template>

<script>
import EditForm from './EditForm'

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
    deletingDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      editFormVisible: false,
    }
  },
  components: {
    EditForm,
  },
  methods: {
    updateField (value) {
      this.$emit('updateField', { [this.index]: value })
      this.setEditFormVisibility(false)
    },
    deleteField () {
      this.$emit('deleteField', this.index)
    },
    setEditFormVisibility (value) {
      this.editFormVisible = value
    },
  },
}
</script>

<style lang="sass" scoped>
.property
  display: grid
  grid-template-columns: 3fr 7fr

.property__name
  grid-column: 1

  padding: 0.5rem
  font-weight: 600

.property__text
  white-space: break-spaces
  word-break: break-all

.property__value
  grid-column: 2

  display: flex
  flex-flow: row nowrap
  justify-content: space-between

  padding: 0.5rem

.button-edit
  padding: 0 0.5rem
  color: lightgrey

.button-delete
  padding: 0 0.5rem
  color: red
</style>
