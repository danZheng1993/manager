import React from 'react'

class SelectAllCheckBox extends React.Component {

  onClick = (e) => {
    const { list, onSelect } = this.props
    let result = {}
    list.length && list.map((item) => (
      result[item._id] = e.target.checked
    ))
    onSelect && onSelect(result)
  }

  render() {
    return (
      <input type="checkbox" onClick={(e) => this.onClick(e)} />
    )
  }

}

export default SelectAllCheckBox