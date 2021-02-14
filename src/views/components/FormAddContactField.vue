<template>
  <tr>
    <td>
      <EditForm
        v-if="keyEditable"
        key="keyField"
        placeholder="Название поля"
        @complete="onKeyEdited($event)"
        @aborted="$emit('aborted')"
      />
      <span
        v-else
        key="keyField"
      >
        {{ keyValue }}
      </span>
    </td>
    <td>
      <EditForm
        v-if="valueEditable"
        key="valueField"
        placeholder="Значение поля"
        @complete="onValueEdited($event)"
        @aborted="$emit('aborted')"
      />
      <span
        v-else
        key="valueField"
      >
        {{ valueValue }}
      </span>
    </td>
  </tr>
</template>

<script>
import EditForm from './EditForm'

export default {
  name: 'FormAddContactField',
  data () {
    return {
      keyEditable: true,
      keyValue: '',

      valueEditable: true,
      valueValue: '',
    }
  },
  components: {
    EditForm,
  },
  methods: {
    onKeyEdited (value) {
      this.keyValue = value
      this.setKeyEditable(false)
    },
    onValueEdited (value) {
      this.valueValue = value
      this.setValueEditable(false)
    },
    setKeyEditable (value) {
      this.keyEditable = value
    },
    setValueEditable (value) {
      this.valueEditable = value
    },
  },
  watch: {
    valueEditable: function () {
      if (!this.keyEditable && !this.valueEditable)
        this.$emit('addField', [this.keyValue, this.valueValue])
    },
    keyEditable: function () {
      if (!this.keyEditable && !this.valueEditable)
        this.$emit('addField', [this.keyValue, this.valueValue])
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
