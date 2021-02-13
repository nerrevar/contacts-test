<template>
  <div class="wrapper">
    <h1>{{ getName }}</h1>
    <!-- Table of properties -->
    <table class="table">
      <tbody>
        <ContactField
          class="property"
          v-for="(prop, index) in getContactDataWithoutName"
          :key="index"
          :index="index"
          :prop="prop"
          @deleteField="sendDeleteRequest($event)"
          @updateField="sendUpdateRequest($event)"
        />
      </tbody>
    </table>
    <!-- Button for new field -->
    <button
      class="button"
      @click="setFieldAddFormVisible(true)"
    >
      Добавить поле
    </button>
    <!-- New field form -->
    <div
      class="field-add-form"
      v-if="isFieldAddFormVisible"
    >
      <span class="field-add-form__text">Новое поле: </span>
      <input
        type="text"
        ref="newField"
        placeholder="имя-поля:значение-поля"
        @input="validateInput"
      />
      <button
        class="field-add-form__add-button"
        :disabled="isInputErrorVisible"
        @click="addField"
      >
        Добавить
      </button>
      <span
        class="input-error"
        v-show="isInputErrorVisible"
      >
        Неправильный ввод. Требуемый формат: имя-поля:значение-поля
      </span>
    </div>
  </div>
</template>

<script>
import ContactField from './components/ContactField'

export default {
  name: 'ContactDataView',

  components: {
    ContactField,
  },

  props: {
    docId: {
      type: String,
      required: true,
    },
    contact: {
      type: Object,
      required: false,
    },
  },

  data () {
    return {
      contactData: this.contact,
      isFieldAddFormVisible: false,
      isInputErrorVisible: false,
    }
  },

  computed: {
    getName () {
      if (!this.contactData)
        return ''
      else
        return this.contactData.name
    },
    getContactDataWithoutName () {
      if (!this.contactData)
        return {}
      else {
         // Contact entries without name property
        let filteredEntries = Object.entries(this.contactData).filter(e => e[0] !== 'name')
        // Contact object without name property
        return Object.fromEntries(filteredEntries)
      }
    },
  },

  methods: {
    // Internal use if prop contact is undefined or create/update/delete contact fields
    loadContactData () {
      this.$_fetch(
        '/read',
        {
          docId: this.docId
        }
      ).then(
        response => response.json()
      ).then(
        response => this.contactData = response.contact
      )
    },
    // Page parts visibility
    setFieldAddFormVisible (value) {
      this.isFieldAddFormVisible = value
    },
    setInputErrorVisible (value) {
      this.isInputErrorVisible = value
    },
    // Field addition
    validateInput () {
      let valueArr = this.$refs.newField.value.split(':').map(val => val.trim())
      if (valueArr.length === 2)
        if (valueArr[0] !== '' && valueArr[1] !== '') {
          this.setInputErrorVisible(false)
          return
        }
      this.setInputErrorVisible(true)
    },
    addField () {
      let newField = {}
      let newFieldArr = this.$refs.newField.value.split(':')
      newFieldArr.map(val => val.trim())
      newField[newFieldArr[0]] = newFieldArr[1]
      this.sendUpdateRequest(newField)
      this.setFieldAddFormVisible(false)
    },
    // Request to api
    sendUpdateRequest (newValue) {
      this.$_fetch(
        '/update',
        {
          docId: this.docId,
          newValue: newValue
        }
      ).then(
        () => {
          this.loadContactData()
        }
      )
    },
    sendDeleteRequest (field) {
      this.$_fetch(
        '/delete_field',
        {
          docId: this.docId,
          field: field
        }
      ).then(
        this.loadContactData()
      )
    },
  },

  created () {
    if (this.contactData === undefined)
      this.loadContactData()
  }
}
</script>

<style lang="sass" scoped>
</style>
