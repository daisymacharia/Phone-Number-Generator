import Store from '../src/store/root'
import FileSaver from 'file-saver'
jest.mock('file-saver', () => ({ saveAs: jest.fn() }))

describe('Store', () => {
  let store

  beforeEach(() => {
    store = new Store()
    store.messages = []
  })

  it('generates new numbers', () => {
    store.limit = 10
    store.generateRandomNumbers()
    expect(store.phoneNumbers.length).toBe(10)
    expect(store.messages[0]).toBe('You have generated 10 numbers')
  })

  it('generates a random number starting with zero ', () => {
    const testRegex = /^0\d{9}/
    store.limit = 10
    let firstArray = store.generateRandomNumbers()
    let secondArray = store.generateRandomNumbers()
    expect(testRegex.test(store.phoneNumbers[0])).toBeTruthy()
    expect(firstArray).not.toBe(secondArray)
  })

  it('sorts numbers in descending order', () => {
    store.limit = 10
    store.generateRandomNumbers()
    store.sortNumbers('desc')
    expect(store.sortedNumbers[0] > store.sortedNumbers[1]).toBeTruthy()
    expect(store.messages[1]).toBe('Numbers sorted in descending order')
  })

  it('sorts numbers in ascending order', () => {
    store.limit = 10
    store.generateRandomNumbers()
    store.sortNumbers('asc')
    expect(store.sortedNumbers[0] < store.sortedNumbers[1]).toBeTruthy()
    expect(store.messages[1]).toBe('Numbers sorted in ascending order')
  })

  it('throws error if generating more than 10000 numbers', () => {
    store.limit = 10000
    store.generateRandomNumbers()
    expect(store.messages[0]).toBe(
      'You can only generate upto 10000 numbers at a time'
    )
  })

  it('successfully exports file', () => {
    global.Blob = function(content, options) {
      return { content, options }
    }

    store.saveNumbers('content', 'unsorted.csv')
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      { content: ['content'], options: { type: 'text/csv;charset=utf-8' } },
      'unsorted.csv'
    )
  })

  it('warns against entering numbers', () => {
    store.notNumber()
    expect(store.messages[0]).toBe('You can only enter numbers')
  })
})
