<template>
  <div
    class="wrapper"
  >
    <table>
      <thead>
        <tr>
          <th>Поле</th>
          <th>Значение</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!nameFilled"
          key="name"
        >
          <td>Имя</td>
          <td>
            <EditForm
              placeholder="Имя контакта"
              @complete="updateName($event)"
              @aborted="$emit('aborted')"
            />
          </td>
        </tr>
        <ContactField
          v-else
          key="name"
          class="property"
          :index="'name'"
          :prop="contactData.name"
          :deletingDisabled="true"
          @updateField="updateField({ name: $event })"
        />
        <ContactFieldList
          :contactData="contactData"
          @updateField="updateField($event)"
          @deleteField="deleteField($event)"
        />
        <FormAddContactField
          v-if="formAddFieldVisible"
          @addField="addField($event)"
          @aborted="setFormAddFieldVisible(false)"
        />
      </tbody>
    </table>
    <button
      @click="setFormAddFieldVisible(true)"
    >
      Добавить поле
    </button>
    <!-- OK button -->
    <div class="button-group">
      <button
        @click="addContact"
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
    </div>
  </div>
</template>

<script>
import EditForm from './EditForm'
import ContactField from './ContactField'
import ContactFieldList from './ContactFieldList'
import FormAddContactField from './FormAddContactField'

export default {
  name: 'FormAddContact',
  data () {
    return {
      formAddFieldVisible: false,
      nameFilled: false,
      contactData: {
        name: '',
      },
    }
  },
  components: {
    EditForm,
    ContactField,
    ContactFieldList,
    FormAddContactField,
  },
  methods: {
    setFormAddFieldVisible (value) {
      this.formAddFieldVisible = value
    },
    addContact () {
      this.$_fetch(
        '/create',
        {
          doc: this.contactData
        }
      ).then(
        this.$emit('complete')
      )
    },
    addField (fieldArr) {
      this.$set(this.contactData, fieldArr[0], fieldArr[1])
      this.setFormAddFieldVisible(false)
    },
    updateName (value) {
      this.nameFilled = true
      this.updateField({ name: value })
    },
    updateField (fieldObj) {
      this.contactData[Object.keys(fieldObj)[0]] = Object.values(fieldObj)[0]
    },
    deleteField (fieldKey) {
      this.$delete(this.contactData, fieldKey)
    },
  },
}
</script>

<style lang="sass" scoped>
</style>
