<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar class="q-pa-md row">
        <q-toolbar-title class="text-weight-bold col-3">
          README Viewer
        </q-toolbar-title>

        <div class="col-9">
          <SearchBox
            v-if="$route.fullPath !== '/'"
            :classProps="'search-input'"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SearchBox from '../components/SearchBox'

export default {
  name: 'MyLayout',
  components: {
    SearchBox
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
