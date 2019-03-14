import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { observable } from 'mobx'

import App from '../src/containers/App'

describe('Random Number Generator', () => {
  let store
  const generateRandomNumbers = jest.fn()
  //don't use an arrow function...preserve the value of "this"
  beforeEach(function() {
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
      generateRandomNumbers: generateRandomNumbers(),
    })
  })

  it('renders correctly', function() {
    const tree = renderer.create(<App store={store} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it('calls generatePhoneNumbers on generate numbers button click', function() {
  //   const wrapper = shallow(<App store={store} />).dive()

  //   wrapper
  //     .find('App__StyledButton')
  //     .at(0)
  //     .simulate('click')

  //   expect(store.generatePhoneNumbers()).toHaveBeenCalled()
  // })
})
