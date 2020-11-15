import { routes as auth } from './auth/index'
import { routes as dashboard } from './dashboard/index'
import { routes as task } from './task/index'
import { routes as user } from './user/index'

export default [
  ...auth,
  ...dashboard,
  ...task,
  ...user
]
