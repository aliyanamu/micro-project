<template>
  <q-select
    use-input flat
    hide-selected
    class="col-12"
    :class="classProps"
    v-model="search"
    color="white"
    placeholder="Search"
    fill-input
    input-debounce="0"
    :options="userOpts"
    option-value="id"
    option-label="name"
    @filter="filterUser"
    @input="toPage"
  >
  </q-select>
</template>

<script>
import { GET_USER } from '../network/api/fetch.api'

export default {
  name: 'SearchBox',
  props: {
    classProps: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      search: '',
      userOpts: []
    }
  },
  methods: {
    filterUser (val, update, abort) {
      if (val.length < 1) {
        abort()
        return
      }
      GET_USER(val)
        .then(response => {
          update(() => {
            let rawData = response.data.data
            let filterData = rawData.map(each => {
              return {
                id: each.id,
                name: each.login
              }
            })
            this.userOpts = filterData
          })
        })
        .catch(err => {
          abort(() => {
            this.userOpts = []
          })
          let msg = err.response.data.message.message
          this.showNotify(msg, 'negative')
        })
    },
    toPage () {
      this.$router.push({
        name: 'detail',
        params: {
          username: this.search.name
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
.search-input
  .q-field__native
    font-size 16px!important
    font-weight 600!important
    input::placeholder, input:focus, input
      color white!important
  .q-field__control:before
    border-bottom: 1px solid white!important

.first-input
  min-width 600px
  .q-field__native
    font-size 16px!important
    font-weight 600!important
    input::placeholder, input:focus
      color black!important
  .q-field__control
    border-bottom: 1px solid black!important

.search-input, .first-input
  .q-select__dropdown-icon
    display none!important
</style>
