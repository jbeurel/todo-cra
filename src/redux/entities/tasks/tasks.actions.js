export const taskActions = {
  TASK_MODIFY: "TASK_MODIFY",
  TASK_ADDED: "TASK_ADDED",
  TASK_REMOVE: "TASK_REMOVE",
  TASK_MODIFIED: "TASK_MODIFIED",
  TASK_REMOVED: "TASK_REMOVED",

  add: () => ({
    type: taskActions.TASK_MODIFY,
    task: { label: "" }
  }),

  modify: task => ({
    type: taskActions.TASK_MODIFY,
    task
  }),

  remove: task => ({
    type: taskActions.TASK_REMOVE,
    task
  }),

  added: task => ({
    type: taskActions.TASK_ADDED,
    task
  }),

  modified: task => ({
    type: taskActions.TASK_MODIFIED,
    task
  }),

  removed: task => ({
    type: taskActions.TASK_REMOVED,
    task
  })
};
