import React, { Component } from 'react'
import { Card, Row, Col } from 'reactstrap'


class CardView extends Component {
  render() {
    const {title, value, icon} = this.props
    return (
      <Card style={{padding: '10px'}}>
        <Row>
          <Col sm={4} className="card-image">
            <i className={`fa fa-fw ${icon}`} />
          </Col>
          <Col sm={8}>
            <p className="card-title">{title}</p>
            <p className="card-value">{value}</p>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default (CardView)