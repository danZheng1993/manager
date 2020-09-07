import React from 'react';
import { InputGroup, Input } from 'reactstrap';


import Menu from '../Menu';
import { isEqual } from 'lodash';


const isItemChecked = (permissions, item) => {
  if (item.path) {
    return permissions.findIndex(p => p === item.path) >= 0
  } else {
    return (item.submenu || []).reduce((prev, item) => {
      return prev && permissions.findIndex(p => p === item.path) >= 0
    }, true);
  }
};

const PermissionItem = ({ item, checked, onChange, key }) => (
  <InputGroup key={key}>
    <Input type="checkbox" onClick={onChange} checked={checked} /><span style={{ marginLeft: '10px' }}>{item.name}</span>
  </InputGroup>
)

export default class PermissionInput extends React.Component {
  state = { permissions: [] };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.defaultPermissions, this.props.defaultPermissions)) {
      this.setState({ permissions: this.props.defaultPermissions })
    }
  }

  handleChange = (item) => {
    const { permissions } = this.state;
    let newPermissions = [];
    if (isItemChecked(permissions, item)) {
      newPermissions = permissions.filter(permission => permission !== item.path);
    } else {
      newPermissions = [...permissions, item.path];
    }
    this.setState({ permissions: newPermissions });
    this.props.onChange(newPermissions);
  }

  changeSubItems = (item) => {
    const { permissions } = this.state;
    let newPermissions = [];
    if (isItemChecked(permissions, item)) {
      newPermissions = permissions.filter(p => item.submenu.findIndex(i => i.path === p) < 0);
    } else {
      newPermissions = [...permissions, ...(item.submenu.map(i => i.path))]
    }
    this.setState({ permissions: newPermissions });
    this.props.onChange(newPermissions);
  }

  render() {
    const { permissions } = this.state;
    return (
      <div style={styles.container}>
        {
          Menu.map((item, index) => {
            if (item.path) {
              return (
                <div style={styles.itemWrapper} key={`item_${index}`}>
                  <PermissionItem
                    item={item}
                    checked={isItemChecked(permissions, item)}
                    onChange={() => this.handleChange(item)} key={`item_${index}`}
                  />
                </div>
              )
            }
            return (
              <div style={styles.itemWrapper} key={`item_${index}`}>
                <PermissionItem item={item} checked={isItemChecked(permissions, item)} onChange={() => this.changeSubItems(item)} />
                <div style={styles.wrapper}>
                  {item.submenu.map((subItem, subIndex) => (
                    <PermissionItem
                      item={subItem}
                      checked={isItemChecked(permissions, subItem)}
                      onChange={(val) => this.handleChange(subItem, val)}
                      key={`item_${index}_${subIndex}`}
                    />
                  ))}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const styles = {
  container: {
    padding: 16,
    minWidth: 300,
    maxWidth: 500,
  },
  itemWrapper: {
    padding: '10px 20px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 20px'
  }
}