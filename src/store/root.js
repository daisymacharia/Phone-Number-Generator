import { observable, action, computed } from 'mobx'
import { saveAs } from 'file-saver'

export default class Store {
  @observable phoneNumbers = []
  @observable sortedNumbers = []
  @observable limit = 0
  @observable MinNumber = 0
  @observable MaxNumber = 0
  @observable message = ''

  @action
  generateRandomNumbers = () => {
    var numbers = new Array(this.limit)
    if (this.limit >= 10000) {
      this.message = 'You can only generate upto 10000 numbers at a time'
    } else {
      for (var i = 0; i < this.limit; i++) {
        numbers[i] = this.addZero(Math.floor(Math.random() * 1000000000))
      }

      this.phoneNumbers = numbers
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
        this.sortedNumbers, (this.message = 'Numbers sorted in ascending order')
      )
    } else if (order === 'desc') {
      return (
        (this.sortedNumbers = this.sortedNumbers.slice().reverse()),
        (this.message = 'Numbers sorted in descending order')
      )
    }
  }
}
