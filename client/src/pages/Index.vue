<template>
  <div class="fixed-center text-center">
    <div class="text-weight-bolder text-h2 text-primary">
      Who are you looking for?
    </div>
    <SearchBox :classProps="'first-input'" class="q-my-xl"/>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox'

export default {
  name: 'PageIndex',
  components: {
    SearchBox
  }
}
</script>
