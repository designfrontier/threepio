import {
  createMessage,
  createErrorMessage,
  createWarningMessage,
  looksGood,
} from './createMessage'
import { generateStubContext } from './test-helpers'

describe('#createMessage', () => {
  test('should return usage message if unknown event', () => {
    expect(createMessage('unhandled', generateStubContext())).toBe(
      `You tried to use an event Threepio doesn't understand yet`,
    )
  })

  test('should return blank message if push event', () => {
    expect(createMessage('push', generateStubContext())).toMatch(
      `Reminders of how to do a good code review`,
    )
  })

  test('should return blank message if synchronize event', () => {
    expect(createMessage('synchronize', generateStubContext())).toMatch(
      `Reminders of how to do a good code review`,
    )
  })

  test('should return blank message if edited event', () => {
    expect(createMessage('edited', generateStubContext())).toMatch(
      `Reminders of how to do a good code review`,
    )
  })

  test('should return opened message if opened event', () => {
    expect(createMessage('opened', generateStubContext())).toMatch(
      `Reminders of how to do a good code review`,
    )
  })
})

describe('#createErrorMessage', () => {
  test('should return correctly formatted message', () => {
    expect(createErrorMessage([{ type: 'error', message: 'this is an error' }]))
      .toBe(`### Errors That Need Correction Before Merging

- this is an error`)
  })

  test('should return nothing if no errors', () => {
    expect(createErrorMessage([])).toBe(``)
  })
})

describe('#looksGood', () => {
  test('should return the all good message', () => {
    expect(looksGood()).toBe(`## Threepio says: Looks Good!

![bb8 thumbs up](https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif)`)
  })
})

describe('#createWarningMessage', () => {
  test('should return correctly formatted message', () => {
    expect(
      createWarningMessage([{ type: 'warning', message: 'this is a warning' }]),
    ).toBe(`#### Things That Need Reviewer Attention

- this is a warning`)
  })

  test('should return nothing if no errors', () => {
    expect(createWarningMessage([])).toBe(``)
  })
})
