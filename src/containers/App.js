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
const Alerts = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  top: 0;
  right: 0;
`

const SingleAlert = styled.div`
  display: flex;
  min-width: 400px;
  position: relative;
  background: #f5f5f5;
  box-shadow: 0 0 5px black;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  animation: fadeOut 4s linear forwards;

  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(50px);
    }
  }
`

@inject('store')
@observer
class App extends Component {
  state = {
    limit: 0,
  }

  generateNumbers = () => {
    return (
      (this.props.store.limit = this.state.limit),
      this.props.store.generateRandomNumbers()
    )
  }

  isNumber = evt => {
    var charCode = evt.which ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return this.props.store.notNumber()

    return this.setState({ limit: evt.target.value })
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
              onKeyUp={this.isNumber}
              placeholder='Number of phone numbers to be generated'
            />
          </StyledInputContainer>
          <StyledButton onClick={this.generateNumbers}>
            Generate Numbers
          </StyledButton>
        </Container>

        {store.phoneNumbers.length > 0 && (
          <>
            <Container>
              <StyledButton
                onClick={() =>
                  store.saveNumbers(store.phoneNumbers, 'unsorted.csv')
                }>
                Download unsorted Numbers
              </StyledButton>

              <StyledButton
                onClick={() =>
                  store.saveNumbers(store.sortedNumbers, 'sorted.csv')
                }>
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
            <Span>Total Number of Generated Numbers: {store.limit}</Span>
            <Span>The Max Number is: {store.MaxNumber}</Span>
            <Span>The Min Number is: {store.MinNumber}</Span>
          </>
        )}
        {store.messages.length > 0 && (
          <Alerts>
            {store.messages.map((message, idx) => (
              <SingleAlert key={idx + message}>
                <p> {message} </p>
              </SingleAlert>
            ))}
          </Alerts>
        )}
      </Page>
    )
  }
}
export default App
