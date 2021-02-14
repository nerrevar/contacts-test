<template>
  <div class="wrapper">
    <router-link
      :to="{name: 'HomeView'}"
    >
      &#8592;Назад
    </router-link>
    <button
      :disabled="Object.keys(lastEvent).length === 0"
      @click="revertLastEvent"
    >
      Отменить последнее действие
    </button>
    <h1>{{ getName }}</h1>
    <ContactFieldList
      :contactData="contactData || {}"
      @updateField="sendUpdateRequest($event)"
      @deleteField="sendDeleteRequest($event)"
    />
    <!-- Button for new field -->
    <button
      class="button"
      @click="setFieldAddFormVisible(true)"
    >
      Добавить поле
    </button>
    <!-- New field form -->
    <EditForm
      class="field-add-form"
      v-if="isFieldAddFormVisible"
      placeholder="имя-поля:значение-поля"
      errorText="Неправильный ввод. Требуемый формат: имя-поля:значение-поля"
      :customInputValidator="validateInput"
      @complete="addField($event)"
      @aborted="setFieldAddFormVisible(false)"
    />
  </div>
</template>

<script>
import ContactFieldList from './components/ContactFieldList'
import EditForm from './components/EditForm'

export default {
  name: 'ContactDataView',

  components: {
    ContactFieldList,
    EditForm,
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
      lastEvent: {},
    }
  },

  computed: {
    getName () {
      if (!this.contactData)
        return ''
      else
        return this.contactData.name
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
    setLastEvent (actionType, field, oldValue=undefined) {
      this.lastEvent = {
        actionType: actionType,
        field: field,
        oldValue: oldValue,
      }
    },
    revertLastEvent () {
      switch (this.lastEvent.actionType) {
        case 'create': {
          this.sendDeleteRequest(this.lastEvent.field)
          break
        }
        case 'delete': {
          this.addField(`${ this.lastEvent.field }:${ this.lastEvent.oldValue }`)
          break
        }
        case 'update': {
          this.sendUpdateRequest({ [this.lastEvent.field]: this.lastEvent.oldValue })
          break
        }
        default: return
      }
      this.lastEvent = {}
    },
    // Page parts visibility
    setFieldAddFormVisible (value) {
      this.isFieldAddFormVisible = value
    },
    setInputErrorVisible (value) {
      this.isInputErrorVisible = value
    },
    // Field addition
    validateInput (value) {
      let valueArr = value.split(':').map(val => val.trim())
      if (valueArr.length === 2)
        if (valueArr[0] !== '' && valueArr[1] !== '')
          return true
      return false
    },
    addField (value) {
      let newFieldArr = value.split(':')
      newFieldArr.map(val => val.trim())
      this.sendUpdateRequest({ [newFieldArr[0]]: newFieldArr[1] }, true)
      this.setFieldAddFormVisible(false)
    },
    // Request to api
    sendUpdateRequest (newValue, newField=false) {
      this.$_fetch(
        '/update',
        {
          docId: this.docId,
          newValue: newValue
        }
      ).then(
        () => {
          if (newField)
            this.setLastEvent('create', Object.keys(newValue)[0])
          else
            this.setLastEvent('update', Object.keys(newValue)[0], `${ this.contactData[Object.keys(newValue)[0]] }`)
          this.loadContactData()
        }
      )
    },
    sendDeleteRequest (field) {
      if (window.confirm(`Вы действительно хотите удалить поле ${ field }?`))
        this.$_fetch(
          '/delete_field',
          {
            docId: this.docId,
            field: field
          }
        ).then(
          () => {
            this.setLastEvent('delete', field, `${ this.contactData[field] }`)
            this.loadContactData()
          }
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
