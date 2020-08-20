import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import { getDateTimeStr } from '../../helpers'
import { BUTTONS, TABLE_HEADERS, PLACEHOLDER, LABEL } from '../../constants'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { getContracts } from '../../redux/modules/contract'
import { contractsListSelector, contractsParamsSelector, contractsloadingSelector } from '../../redux/selectors'

class ContractsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  static propTypes = {
    getContracts: PropTypes.func,
    contractsList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getContracts, params } = this.props
    getContracts({ params : {...params} })
  }

  handlePagination = (pagination) => {
    const { getContracts, params } = this.props
    getContracts({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
      }
    })
  }

  handleFilter = () => {
    const { getContracts, params } = this.props
    const { name } = this.state
    let filter = {}
    if (name) filter['name'] = name
    this.setState({filter})
    getContracts({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter,
      }
    })
  }

  handleKeyPress(target) {
    if(target.charCode === 13){
      this.handleFilter()
    } 
  }

  render() {
    const { contractsList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label={LABEL.KEYWORD}
              type='text'
              placeholder={PLACEHOLDER.CONTRACT_PERSON}
              onChange={(e) => this.setState({name: e.target.value})}
              onKeyPress = {(target) => this.handleKeyPress(target)}
              />
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>{TABLE_HEADERS.INDEX}</th>
              <th>{TABLE_HEADERS.CONTRACT_TIME}</th>
              <th>{TABLE_HEADERS.CONTRACT_ONE}</th>
              <th>{TABLE_HEADERS.CONTRACT_TWO}</th>
              <th>{TABLE_HEADERS.ACTION}</th>
            </tr>
          </thead>
          <tbody>
            {contractsList && contractsList.map((contract, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{getDateTimeStr(contract.created)}</td>
                <td>{contract.name}</td>
                <td>{contract.name}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/contracts/view/${contract._id}`}>
                    {BUTTONS.VIEW}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  contractsList: contractsListSelector,
  params: contractsParamsSelector,
  loading: contractsloadingSelector
})

const actions = {
  getContracts,
}

export default compose(
  connect(selector, actions),
  withRouter
)(ContractsList)
