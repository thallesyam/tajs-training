import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises'

describe('Task test suite', () => {
  let _logMock;
  let _task;
  
  beforeEach(() => {
    jest.spyOn(
      console,
      console.log.name
    ).mockImplementation();

    _task = new Task()
  })

  it.skip('should only run tasks that are due without fake timer (slow)', async () => {
    // Arrange, act, assert  
    const tasks = [
      { name: 'Task- Will-Run-In-Five-Secs', dueAt: new Date(Date.now() + 5000), fn: jest.fn() },
      { name: 'Task- Will-Run-In-Ten-Secs', dueAt: new Date(Date.now() + 10000), fn: jest.fn() },
    ]

    _task.save(tasks.at(0))
    _task.save(tasks.at(1))
    _task.run(200)

    await setTimeout(11000)
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  }, 15e3 )

  it('should only run tasks that are due with fake timer', async () => {
    // Arrange, act, assert 
    jest.useFakeTimers()
    const tasks = [
      { name: 'Task- Will-Run-In-Five-Secs', dueAt: new Date(Date.now() + 5_000), fn: jest.fn() },
      { name: 'Task- Will-Run-In-Ten-Secs', dueAt: new Date(Date.now() + 10_000), fn: jest.fn() },
    ]

    _task.save(tasks.at(0))
    _task.save(tasks.at(1))
    _task.run(200)
    jest.advanceTimersByTime(4000)
    
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()
   
    jest.advanceTimersByTime(2000)
        
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)
        
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  } )
})

