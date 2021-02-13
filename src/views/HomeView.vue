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
        <router-link :to="{ name: 'ContactInfoView', params: { docId: index, contact: contact } }">
          {{ contact.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      contactsArr: {},
    }
  },
  created () {
    this.$_fetch(
      '/read',
      {}
    ).then(
      response => response.json()
    ).then(
      response => this.contactsArr = response.contactsArr
    )
  },
}
</script>
