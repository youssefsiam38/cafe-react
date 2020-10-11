import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { BrowserRouter } from "react-router-dom";

import App from './App.js'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Add Menu Item', route)

  return render(ui, { wrapper: BrowserRouter })
}

test('test the add menu item UI', () => {

  const history = createMemoryHistory()

  renderWithRouter(<App/>, {route: '/add'})


  // verify page content for Add Menu Item route
  expect(screen.getByText(/add menu item/i)).toBeInTheDocument()
  

  // Type the name of mock menu item 
  userEvent.type(screen.getByTestId('form-name', { exact: false}), 'ice cream')

  // check that it has been typed
  expect(screen.getByTestId('form-name', { exact: false})).toHaveValue('ice cream')

  
  // Type the price of mock menu item 
  userEvent.type(screen.getByTestId('form-price', { exact: false}), '10')

  // check that it has been typed
  expect(screen.getByTestId('form-price', { exact: false})).toHaveValue(10)


  // Type the description of mock menu item 
  userEvent.type(screen.getByLabelText('Description', { exact: false}), "cc")

  // check that it has been typed
  expect(screen.getByTestId('form-desc', { exact: false})).toHaveValue('cc')



  // create new photo
  const file = new File(['hello'], 'hello.png', {type: 'image/png'})
  const input = screen.getByLabelText(/photo/i)
  userEvent.upload(input, file)

  // check for the photo
  expect(input.files[0]).toStrictEqual(file)
  expect(input.files.item(0)).toStrictEqual(file)
  expect(input.files).toHaveLength(1)


})