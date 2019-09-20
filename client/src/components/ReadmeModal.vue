<template>
  <q-card class="modal-card" v-if="!loading">
    <q-toolbar class="text-white bg-grey q-pa-md">
      <q-toolbar-title class="text-weight-bold">
        README
      </q-toolbar-title>
      <q-btn flat round dense icon="close" @click="$emit('close', false)"/>
    </q-toolbar>
    <q-card-section>
      <q-markdown>{{ readme }}</q-markdown>
    </q-card-section>
  </q-card>
</template>

<script>
import { GET_README } from '../network/api/fetch.api'

export default {
  name: 'ReadmeModal',
  props: ['username', 'repository'],
  data () {
    return {
      readme: '',
      loading: false
    }
  },
  methods: {
    getReadme () {
      this.loading = true
      let username = this.username
      let repository = this.repository
      GET_README(username, repository)
        .then(response => {
          let data = response.data.data
          this.readme = Buffer.from(data, 'base64').toString('ascii')
        })
        .catch(err => {
          this.readme = 'Not Found'
          let msg = err.response.data.message.message
          this.showNotify(msg, 'negative')
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.getReadme()
  }
}
</script>

<style lang="stylus">
.modal-card
  overflow hidden
  min-width 500px
  max-height calc(90vh - 65.59px)
</style>
