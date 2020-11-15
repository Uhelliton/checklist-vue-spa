const routes = [
  {
    path: '/tasks',
    component: () => import('./views/TaskIndex.vue'),
    name: 'task.index',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/tasks/create',
    component: () => import('./views/TaskCreate.vue'),
    name: 'task.create',
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/tasks/:id/edit',
    component: () => import('./views/TaskEdit.vue'),
    name: 'task.edit',
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
