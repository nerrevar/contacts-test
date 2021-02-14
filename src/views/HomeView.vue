<template>
  <div class="wrapper">
    <h1 class="main-title">Список контактов</h1>
    <div
      class="contact-list_empty"
      v-if="contactsArr.length === 1"
      key="contact-list"
    >
      <span>В вашем списке нет контактов</span>
    </div>
    <div
      class="contact-list"
      v-else
      key="contact-list"
    >
      <div
        class="contact-list__contact"
        v-for="(contact, index) in contactsArr"
        :key="index"
      >
        <router-link
          class="contact-list__contact-link"
          :to="{ name: 'ContactDataView', params: { docId: index, contact: contact } }"
        >
          {{ contact.name }}
        </router-link>
        <!-- Delete button -->
        <span
          class="contact-list__delete-button"
          @click="deleteContact(index, contact.name)"
        >
          &#10006;
        </span>
      </div>
    </div>
    <div
      class="button button-add-contact"
      @click="setFormAddContactVisible(true)"
    >
      Добавить контакт
    </div>
    <FormAddContact
      v-if="formAddVisible"
      @complete="addContact"
      @aborted="setFormAddContactVisible(false)"
    />
  </div>
</template>

<script>
import FormAddContact from './components/FormAddContact'

export default {
  name: 'HomeView',
  components: {
    FormAddContact,
  },
  data () {
    return {
      contactsArr: {},
      formAddVisible: false,
    }
  },
  methods: {
    loadContactArr () {
      this.$_fetch(
        '/read',
        {}
      ).then(
        response => response.json()
      ).then(
        response => this.contactsArr = response.contactsArr
      )
    },
    setFormAddContactVisible (value) {
      this.formAddVisible = value
    },
    addContact () {
      this.setFormAddContactVisible(false)
      this.loadContactArr()
    },
    deleteContact (docId, contactName) {
      if (window.confirm(`Вы действительно хотите удалить контакт ${contactName}?`))
        this.$_fetch(
          '/delete',
          {
            docId: docId,
          }
        ).then(
          this.loadContactArr()
        )
    },
  },
  created () {
    this.loadContactArr()
  },
}
</script>

<style lang="sass" scoped>
.contact-list, .contact-list_empty, .button-add-contact
  display: flex
  flex: 0 1 auto
  flex-flow: column nowrap

.contact-list
  padding-bottom: 0.5rem

.contact-list__contact
  display: flex
  flex: 0 1 auto
  flex-flow: row nowrap
  justify-content: space-between

  padding: 0.5rem
  box-shadow: 1px 1px 3px lightgrey

.contact-list__contact-link
  display: flex
  flex: 1 0 auto
  flex-flow: column nowrap

  color: black
  text-decoration: none

.contact-list__delete-button
  display: flex
  flex: 0 0 auto

  color: lightgrey
  cursor: default

.button-add-contact
  display: flex
  flex: 1 0 auto

  color: grey
  background-color: lightgreen
  box-shadow:
</style>
