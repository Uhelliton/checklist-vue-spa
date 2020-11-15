<script>
import AppInput from '@/components/form/AppInput'
import { mapGetters } from 'vuex'

export default {
  name: 'FormBase',
  components: { AppInput },
  data: () => ({
    errors: [],
    form: {
      title: '',
      description: '',
      userId: ''
    }
  }),
  props: {
    task: {
      type: Object,
      required: false
    }
  },
  watch: {
    task () {
      const { id, title, description } = this.task
      this.form.title = title
      this.form.description = description
      this.form.id = id
    }
  },
  computed: {
    ...mapGetters({ user: 'user/user' })
  },
  methods: {
    handleSubmit () {
      if (!this.errors.length) {
        this.form['userId'] = this.user.id
        this.$emit('submit', this.form)
        this.$refs.form.reset()
      }
    },
    validate () {
      const form = this.form
      this.errors = []

      if (!form.title) {
        this.errors.push('O title é obrigatório.')
      }
      if (!form.description) {
        this.errors.push('A descrição é obrigatória.')
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="row col-6">
      <div>
        <p v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ul>
            <li v-for="(error, index) in errors"
                :key="index">
              {{ error }}
            </li>
          </ul>
        </p>
      </div>
    </div>
    <form @submit.prevent="handleSubmit"
          ref="form"
          method="post">
      <div class="row col-6">
        <div>
          <app-input v-model="form.title"
                     forId="title"
                     required
                     placeholder="titulo"
                     label="Titulo" />
        </div>
      </div>
      <div class="row col-6">
        <div>
          <app-input v-model="form.description"
                     required
                     forId="description"
                     placeholder="descrição"
                     label="Descrição" />
        </div>
      </div>
      <div class="row col-6">
        <div class="s-align--right">
          <button type="submit"
                  class="m-button ">
            Confirmar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
