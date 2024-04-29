import Task from "./task.js";

const ONE_SECOND = 1000
const runInASec = new Date(Date.now() + ONE_SECOND)
const runInTwoSec = new Date(Date.now() + ONE_SECOND * 2)
const runInThreeSec = new Date(Date.now() + ONE_SECOND * 3)

const task = new Task()
task.save({
  name: 'Task 1',
  dueAt: runInASec,
  fn: () => console.log('TASK 1 executed')
})
task.save({
  name: 'Task 2',
  dueAt: runInTwoSec,
  fn: () => console.log('TASK 2 executed')
})
task.save({
  name: 'Task 3',
  dueAt: runInThreeSec,
  fn: () => console.log('TASK 3 executed')
})

task.run(ONE_SECOND)