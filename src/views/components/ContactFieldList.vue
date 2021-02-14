<template>
  <div class="wrapper">
    <ContactField
      v-for="(prop, index) in getContactDataWithoutName"
      :key="index"
      :index="index"
      :prop="prop"
      :deletingDisabled="deletingDisabled"
      @deleteField="$emit('deleteField', $event)"
      @updateField="$emit('updateField', $event)"
    />
  </div>
</template>

<script>
import ContactField from './ContactField'

export default {
  name: 'ContactFieldList',
  props: {
    contactData: {
      type: Object,
      required: true,
    },
    deletingDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    ContactField,
  },
  computed: {
    getContactDataWithoutName () {
      // Contact entries without name property
      let filteredEntries = Object.entries(this.contactData).filter(e => e[0] !== 'name')
      // Contact object without name property
      return Object.fromEntries(filteredEntries)
    },
  },
}
</script>
