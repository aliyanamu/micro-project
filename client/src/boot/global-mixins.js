// import something here
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.mixin({
    data () {
      return {
        dataGlobal: 'Global',
        myNotify: ''
      }
    },
    methods: {
      showNotify (message, color) {
        let colors = 'negative'
        if (color) {
          colors = color
        }
        let title = ''
        let classes = ['text-body1']
        if (colors === 'negative') {
          title = 'Error'
          classes.push('text-negative')
        } else {
          classes.push('text-positive')
        }
        this.myNotify = this.$q.dialog({
          title: title,
          message: message,
          color: colors,
          position: 'top',
          class: classes
        })
      }
    }
  })
}
