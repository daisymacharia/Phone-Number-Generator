import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 5rem;
  box-sizing: border-box;
`

const StyledInputContainer = styled.div`
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.09);
  background: #ffff;
  width: 35rem;
  padding: 20px 10px 10px 20px;
`

const StyledInput = styled.input`
  margin: 0;
  width: 100%;
  font-size: 24px;
  border: none;
  outline: none;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 30px;
  font-weight: 100;
`

const StyledButton = styled.button`
  width: 10rem;
  height: 3rem;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid #ece9e9;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  padding: 10px;
  min-height: fit-content;
`
const Span = styled.span`
  font-size: ${props => props.size || '16px'};
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: ${props => props.weight || 200};
  margin-bottom: 10px;
`

@inject('store')
@observer
class App extends Component {
  handleChange = e => {
    this.props.store.limit = e.target.value
  }

  render() {
    const { store } = this.props
    return (
      <Page>
        <Span size='40px' weight={500}>
          Random Number Generator
        </Span>
        <Container>
          <StyledInputContainer>
            <StyledInput
              onChange={this.handleChange}
              placeholder='Number of phone numbers to be generated'
            />
          </StyledInputContainer>
          <StyledButton onClick={() => store.generateRandomNumbers()}>
            Generate Numbers
          </StyledButton>
        </Container>

        {store.phoneNumbers.length > 0 && (
          <>
            <Container>
              <StyledButton
                onClick={() =>
                  store.saveNumbers(store.phoneNumbers, 'unsorted.csv')
                }
              >
                Download unsorted Numbers
              </StyledButton>

              <StyledButton
                onClick={() =>
                  store.saveNumbers(store.sortedNumbers, 'sorted.csv')
                }
              >
                Download sorted Numbers
              </StyledButton>

              <StyledButton onClick={() => store.sortNumbers('asc')}>
                Sort in Ascending
              </StyledButton>
              <StyledButton onClick={() => store.sortNumbers('desc')}>
                Sort in Descending
              </StyledButton>
            </Container>
            {store.sortedNumbers.length > 0 && (
              <Span>Phone Numbers sorted</Span>
            )}
            <Span> Total Number of Generated Numbers: {store.limit}</Span>
            <Span> The Max Number is: {store.MaxNumber}</Span>
            <Span> The Min Number is: {store.MinNumber}</Span>
          </>
        )}
      </Page>
    )
  }
}
export default App
