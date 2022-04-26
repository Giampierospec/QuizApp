import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import Paths from './Paths'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser()
  }
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <Header />

          <Paths />
        </BrowserRouter>
        <br />
        <div className="klaviyo-form-TKYgfy"></div>
      </div>
    )
  }
}
export default connect(null, { fetchUser })(App)
