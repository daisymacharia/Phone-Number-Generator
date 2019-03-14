import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { observable } from 'mobx'
import App from '../src/containers/App'

import * as Store from '../src/store/root'

jest.mock('../src/store/root', () => ({
  generateRandomNumbers: jest.fn(),
  sortNumbers: jest.fn(),
  saveNumbers: jest.fn(),
  notNumber: jest.fn(),
}))

describe('Random Number Generator', () => {
  let store

  //don't use an arrow function...preserve the value of "this"
  beforeEach(() => {
    store = observable({
      phoneNumbers: [
        '0516748992',
        '0806745880',
        '0428180874',
        '0571920472',
        '0454586248',
      ],
      limit: 5,
      sortedNumbers: [
        '0806745880',
        '0571920472',
        '0516748992',
        '0454586248',
        '0428180874',
      ],
      generateRandomNumbers: Store.generateRandomNumbers,
      messages: [],
      sortNumbers: Store.sortNumbers,
      saveNumbers: Store.saveNumbers,
      notNumber: Store.notNumber,
    })
  })

  it('renders correctly', function() {
    const tree = renderer.create(<App store={store} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls generatePhoneNumbers on generate numbers button click', function() {
    const wrapper = shallow(<App store={store} />).dive()
    wrapper
      .find('App__StyledButton')
      .at(0)
      .simulate('click')

    expect(store.generateRandomNumbers).toHaveBeenCalled()
  })

  it('saves unsorted numbers on button click', function() {
    const wrapper = shallow(<App store={store} />).dive()
    wrapper
      .find('App__StyledButton')
      .at(1)
      .simulate('click')

    expect(store.saveNumbers).toHaveBeenCalledWith(
      store.phoneNumbers,
      'unsorted.csv'
    )
  })

  it('saves sorted numbers on button click', function() {
    const wrapper = shallow(<App store={store} />).dive()
    wrapper
      .find('App__StyledButton')
      .at(2)
      .simulate('click')

    expect(store.saveNumbers).toHaveBeenCalledWith(
      store.sortedNumbers,
      'sorted.csv'
    )
  })

  it('sorts in asc on sortNumbers button click', function() {
    const wrapper = shallow(<App store={store} />).dive()
    wrapper
      .find('App__StyledButton')
      .at(3)
      .simulate('click')

    expect(store.sortNumbers).toHaveBeenCalledWith('asc')
  })

  it('sorts in desc on sortNumbers button click', function() {
    const wrapper = shallow(<App store={store} />).dive()
    wrapper
      .find('App__StyledButton')
      .at(4)
      .simulate('click')

    expect(store.sortNumbers).toHaveBeenCalledWith('desc')
  })

  it('displays generated number statistics', function() {
    const wrapper = shallow(<App store={store} />).dive()
    expect(
      wrapper
        .find('App__Span')
        .at(2)
        .text()
    ).toEqual('Total Number of Generated Numbers: 5')
    expect(
      wrapper
        .find('App__Span')
        .at(3)
        .text()
    ).toEqual('The Max Number is: ')
    expect(
      wrapper
        .find('App__Span')
        .at(4)
        .text()
    ).toEqual('The Min Number is: ')
  })

  it('alerts when inputing non integers', function() {
    const wrapper = shallow(<App store={store} />).dive()
    const input = wrapper.find('App__StyledInput')
    input.simulate('keyUp', { keyCode: 40 })
    expect(store.notNumber).toHaveBeenCalled()
  })
})
