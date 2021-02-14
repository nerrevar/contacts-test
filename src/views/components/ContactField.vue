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
        v-if="!deletingDisabled"
        @click="deleteField"
      >
        &#10006;
      </span>
      <!-- Edit form -->
      <EditForm
        v-if="editFormVisible"
        placeholder="Новое значение поля"
        @complete="updateField($event)"
        @aborted="setEditFormVisibility(false)"
      />
    </td>
  </tr>
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
</style>
