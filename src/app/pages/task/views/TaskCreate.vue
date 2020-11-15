<script>
import FormBase from '../components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/task/services/task-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'TaskCreate',
  components: { FormBase, CardBox },
  data: () => ({}),
  methods: {
    async onSubmit (formData) {
      try {
        const request = await service.create(formData)
        const { status } = request
        if (status === HTTP_RESPONSE.CREATED) {
          this.flashMessage.success({
            title: 'Sucesso!',
            message: 'Tarefa cadastrada!'
          })
          this.$router.push({ name: 'task.index' })
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
      <div class="l-boxContent_head_title">Nova Tarefa</div>
      <div class="l-boxContent_head_subtitle"></div>
    </template>
    <form-base @submit="onSubmit"></form-base>
  </card-box>
</template>
