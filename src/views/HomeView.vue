<template>
  <div class="wrapper">
    <div
      class="contact-list_empty"
      v-if="contactsArr.length === 1"
      key="contact-list"
    >
      <span>В вашем списке нет контактов.
        <span
          class="link"
          @click="addContact"
        >
          Добавьте контакт
        </span>
      </span>
    </div>
    <div
      class="contact-list"
      v-else
      key="contact-list"
    >
      <div
        class="contact"
        v-for="(contact, index) in contactsArr"
        :key="index"
      >
        <router-link :to="{ name: 'ContactDataView', params: { docId: index, contact: contact } }">
          {{ contact.name }}
        </router-link>
        <!-- Delete button -->
        <span
          @click="deleteContact(index)"
        >
          &#10006;
        </span>
      </div>
    </div>
    <button
      @click="setFormAddContactVisible(true)"
    >
      Добавить контакт
    </button>
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
    deleteContact (docId) {
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
