<template>
  <div class="wrapper">
    <div class="contact-list">
      <div
        class="contact"
        v-for="(contact, index) in contactsArr"
        :key="index"
      >
        <router-link :to="{path: '/contact_info', params: { docId: index, contact: contact } }">
          {{ contact.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      contactsArr: {},
    }
  },
  created () {
    this.$fetch(
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
