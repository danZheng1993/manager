import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import Loader from '../../containers/Loader'
import { getContract } from '../../redux/modules/contract'
import { contractDetailSelector, contractsloadingSelector } from '../../redux/selectors'

class ContractView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab : '1'
    }
  }
  static propTypes = {
    getContract: PropTypes.func,
    contract: PropTypes.object
  };

  componentWillMount () {
    const { getContract, match: { params } } = this.props
    params.id && getContract({ id: params.id })
  }  

  render() {
    const { contract, loading } = this.props
    return (
      <div>
        <Loader active={loading} />
        {contract &&
        <div>
        </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  contract: contractDetailSelector,
  loading: contractsloadingSelector,
})

const actions = {
  getContract,
}

export default compose(
  connect(selector, actions),
  withRouter
)(ContractView)
