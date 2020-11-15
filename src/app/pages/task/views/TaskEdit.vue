<script>
import FormBase from '../components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/task/services/task-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'TaskEdit',
  components: { FormBase, CardBox },
  data: () => ({
    task: {}
  }),
  async mounted () {
    let id = this.$route.params.id
    await this.getTaskById(id)
  },
  methods: {
    async onSubmit (formData) {
      console.log(formData)
      try {
        const request = await service.update(formData)
        const { status } = request
        if (status === HTTP_RESPONSE.OK) {
          this.flashMessage.success({ title: 'Sucesso!', message: 'Tarefa atualizada!' })
          this.$router.push({ name: 'task.index' })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getTaskById (id) {
      try {
        const request = await service.show(id)
        const { status, data: response } = request
        if (status === HTTP_RESPONSE.OK) {
          this.task = response.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<template>
  <card-box>
    <template #head>
      <div class="l-boxContent_head_title">Editar Tarefa</div>
      <div class="l-boxContent_head_subtitle"></div>
    </template>
    <form-base @submit="onSubmit" :task="task"></form-base>
  </card-box>
</template>
