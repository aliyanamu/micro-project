<template>
  <q-page padding>
    <q-dialog persistent :maximized="$q.screen.lt.sm" v-model="modalView">
      <readme-modal v-if="repository"
        :username="$route.params.username"
        :repository="repository"
        @close="closeModal"/>
    </q-dialog>
    <div class="text-weight-bolder text-h2 text-primary q-pa-md">
      Repository Collection
    </div>
    <div class="q-py-lg q-px-md">
      <q-table
        :data="repos"
        :columns="columns"
        row-key="id"
        :loading="loading"
        hide-heade grid hide-bottom
        :pagination.sync="pagination"
        :rows-per-page-options="rowsPerPageOptions"
        @request="initRepo"
      >
        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card style="height: 100%; overflow: hidden;">
              <q-list dense>
                <q-item v-for="col in props.cols" :key="col.name">
                  <q-item-section :style="col.name === 'name' ? 'display: none;' : 'margin: 10px'">
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section :side="col.name !== 'name'">
                    <q-item-label :class="col.name === 'name' ? 'text-grey text-weight-bolder text-h6 q-pt-md' : 'q-pa-sm'">
                      {{ props.row[col.name] }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="row vertical-middle q-my-md">
                  <q-item-section>
                    <a :href="props.row.url" target="__blank" class="row vertical-middle on-right">
                      <p class="text-primary q-mr-sm text-weight-bold">Visit on</p>
                      <svg height="24"
                        viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
                        <path fill-rule="evenodd" fill="#c6cbd1"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                        </path>
                      </svg>
                    </a>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat rounded size="small"
                      class="bg-primary text-white"
                      @click="openModal(props.row['name'])">
                      View README.md
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
      <q-pagination
        v-model.number="pagination.page"
        color="primary"
        class="q-my-lg"
        :max="totalPage"
        :max-pages="6"
        :boundary-numbers="true"
      >
      </q-pagination>
    </div>
  </q-page>
</template>

<script>
import ReadmeModal from '../components/ReadmeModal'
import { GET_REPO } from '../network/api/fetch.api'

export default {
  name: 'Detail',
  components: { ReadmeModal },
  data () {
    return {
      page: 1,
      repos: [],
      loading: false,
      modalView: false,
      repository: null,
      totalPage: 0,
      rowsPerPageOptions: [4, 8, 12, 32],
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 12
      },
      columns: [
        {
          name: 'name',
          label: 'Name',
          align: 'left'
        },
        {
          name: 'watchers_count',
          align: 'center',
          label: 'Watch'
        },
        {
          name: 'stargazers_count',
          align: 'center',
          label: 'Star'
        }
      ]
    }
  },
  methods: {
    openModal (val) {
      this.repository = val
      this.modalView = true
    },
    closeModal () {
      this.repository = null
      this.modalView = false
    },
    initRepo (props) {
      let { page, rowsPerPage } = props.pagination

      this.loading = true
      this.getRepo(page, rowsPerPage)
        .then(data => {
          this.repos = data[0]
          this.totalPage = data[1]
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          if (this.pagination.page === this.totalPage) this.pagination.rowsNumber = data[1] * rowsPerPage
          else this.pagination.rowsNumber = (data[1] * (rowsPerPage - 1)) + data[0].length
        })
        .catch(() => {
          this.repos = []
          this.totalPage = 0
        })
        .finally(() => {
          this.loading = false
        })
    },
    getRepo (page, rowsPerPage) {
      return GET_REPO(this.$route.params.username, page, rowsPerPage)
        .then(response => {
          let totalPage = response.data.totalPage
          let arrData = response.data.data

          return [arrData, Number(totalPage)]
        })
        .catch(err => {
          let msg = err.response.data.message.message
          this.showNotify(msg, 'negative')
        })
    }
  },
  mounted () {
    this.initRepo({ pagination: this.pagination })
  },
  watch: {
    $route (to, from) {
      this.initRepo({ pagination: this.pagination })
    },
    pagination: {
      handler (val) {
        this.initRepo({ pagination: { page: val.page, rowsPerPage: val.rowsPerPage } })
      },
      deep: true
    }
  }
}
</script>
