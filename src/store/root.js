import { observable, action, computed } from 'mobx'
import { saveAs } from 'file-saver'

export default class Store {
  @observable phoneNumbers = []
  @observable sortedNumbers = []
  @observable limit = 0
  @observable MinNumber = 0
  @observable MaxNumber = 0
  @observable messages = []

  @action
  generateRandomNumbers = () => {
    var numbers = new Array(this.limit)
    if (this.limit >= 10000) {
      this.messages = this.messages.concat(
        'You can only generate upto 10000 numbers at a time'
      )
    } else {
      for (var i = 0; i < this.limit; i++) {
        numbers[i] = this.addZero(Math.floor(Math.random() * 1000000000))
      }

      this.phoneNumbers = numbers
      this.messages = this.messages.concat(
        `You have generated ${this.limit} numbers`
      )

      this.getMaxMinNumbers()
      return this.phoneNumbers
    }
  }

  addZero = number => {
    var str = `${number}`
    var length = 10
    while (str.length < length) {
      str = `${0 + str}`
    }
    return str
  }

  @action
  saveNumbers(numbers, fileName) {
    saveAs(new Blob([numbers], { type: 'text/csv;charset=utf-8' }), fileName)
    this.messages = this.messages.concat(`numbers saved to ${fileName}`)
  }

  getMaxMinNumbers() {
    this.MinNumber = this.phoneNumbers.slice().sort((a, b) => a - b)[0]
    this.MaxNumber = this.phoneNumbers
      .slice()
      .sort((a, b) => a - b)
      .reverse()[0]
  }

  @action
  sortNumbers = order => {
    this.sortedNumbers = this.phoneNumbers.slice().sort((a, b) => a - b)

    if (order === 'asc') {
      return (
        this.sortedNumbers,
        (this.messages = this.messages.concat(
          'Numbers sorted in ascending order'
        ))
      )
    } else if (order === 'desc') {
      return (
        (this.sortedNumbers = this.sortedNumbers.slice().reverse()),
        (this.messages = this.messages.concat(
          'Numbers sorted in descending order'
        ))
      )
    }
  }

  @action
  notNumber = () =>
    (this.messages = this.messages.concat('You can only enter numbers'))
}
