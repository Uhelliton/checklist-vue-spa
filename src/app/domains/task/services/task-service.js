import RestServices from '../../../supports/services/rest-services'

class TaskService extends RestServices {
  endpoint = '/tasks'
}

export default new TaskService()
