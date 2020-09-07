import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Routes from '../routes'
import { fetchPermissions } from '../redux/api/apiCall'

export default class App extends React.Component {
  componentDidMount() {
    this.fetchPermissions();
  }

  async fetchPermissions() {
    const result = await fetchPermissions();
    localStorage.setItem('permissions', JSON.stringify(result.data));
  }

  render() {
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Routes />
        </div>
      </Provider>
    );
  }
}
