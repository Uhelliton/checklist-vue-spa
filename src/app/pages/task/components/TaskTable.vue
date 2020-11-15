<script>
import CardBox from '@/components/layouts/CardBox'
import AppTable from '@/components/table/AppTable'
import AppInput from '@/components/form/AppInput'
import service from '@/app/domains/task/services/task-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'
import DialogConfirm from '@/components/dialog/DialogConfirm'

export default {
  name: 'TaskTable',
  components: {
    CardBox,
    AppTable,
    AppInput,
    DialogConfirm
  },
  data: () => ({
    dialog: false,
    taskSelectId: null,
    datatable: {
      filterKey: '',
      thead: [
        { field: 'id', label: 'ID', sortable: true },
        { field: 'title', label: 'Titulo', sortable: true },
        { field: 'description', label: 'Descrição', sortable: true },
        { field: 'createdAt', label: 'Criado em' },
        { field: 'action', label: '' }
      ],
      rows: [],
      pagination: {}
    }
  }),
  async mounted () {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks () {
      try {
        const params = this.setQueryParams(arguments[0])
        const request = await service.all(params)
        const { data: response, status } = request

        if (status === HTTP_RESPONSE.OK) {
          this.datatable.rows = response.data
          this.datatable.pagination = response.meta
        }
      } catch (e) {
        this.flashMessage.error({ title: 'Sucesso!', message: e })
      }
    },
    onDelete (id) {
      this.dialog = !this.dialog
      this.taskSelectId = id
    },
    async onDeleteConfirm (action) {
      const request = await service.destroy(this.taskSelectId)
      const { status } = request

      if (status === HTTP_RESPONSE.OK) {
        this.flashMessage.success({ title: 'Sucesso!', message: 'Tarefa removida!' })
        this.dialog = !this.dialog
        this.fetchTasks()
      }
    },
    setQueryParams (arg = {}) {
      return {
        per_page: arg.page || 10,
        sort: arg.sort,
        page: arg.pageLength
      }
    }
  }
}
</script>

<template>
  <card-box>
    <dialog-confirm :dialog="dialog"
                    @confirm="onDeleteConfirm">
      <template #header>
        <h1>Remover Tarefa</h1>
        <p>tem certeza que deseja remover?</p>
      </template>
    </dialog-confirm>
    <template #head>
      <div class="l-boxContent_head_title">Listagem de Tarefas</div>
      <div class="l-boxContent_head_subtitle">apenas uma listagem de tarefas</div>
    </template>
    <div class="row col-12">
      <div class="s-align--right s-mb--md">
        <button type="button"
                @click="$router.push({ name: 'task.create' })"
                class="m-button ">
          + Nova Task
        </button>
        <app-input v-model="datatable.filterKey"
                   hidden
                   forId="filterKey"
                   placeholder="digite algo"
                   label="Buscar" />
      </div>
    </div>
    <app-table :thead="datatable.thead"
               :rows="datatable.rows"
               :paginate="datatable.pagination"
               @server-request="fetchTasks"
               :filterKey="datatable.filterKey">
      <template #tbody>
        <tr v-for="(row, index) in datatable.rows" :key="index">
          <td scope="row" data-label="ID">{{ row.id }}</td>
          <td scope="row" data-label="Título">{{ row.title }}</td>
          <td scope="row" data-label="Descrição">{{ row.description }}</td>
          <td scope="row" data-label="Criado em">{{ row.createdAt }}</td>
          <td scope="row" data-label="">
            <button type="button"
                    @click="$router.push({ name: 'task.edit', params: {id: `${ row.id}`} })"
                    class="m-button ">
                  Editar
            </button>
            <button type="button"
                    @click="onDelete(row.id)"
                    class="m-button ">
              Remover
            </button>
          </td>
        </tr>
      </template>
    </app-table>
  </card-box>
</template>
