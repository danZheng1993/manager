import React from 'react';
import { InputGroup, Input } from 'reactstrap';


import Menu from '../../Menu';

const isItemChecked = (permissions, item) => permissions.findIndex(p => p === item) >= 0;

const PermissionItem = ({ item, checked, onChange, key }) => (
  <InputGroup key={key}>
    <Input type="checkbox" />{item.name}
  </InputGroup>
)

export default class PermissionInput extends React.Component {
  state = { permissions: [] };

  componentDidUpdate(pervProps) {

  }

  handleChange = (item) => {
    const { permissions } = this.state;
    if (isItemChecked(permissions, item.path)) {
      this.setState({ permissions: permissions.filter(permission => permission !== item.path) });
    } else {
      this.setState({ permissions: [...permissions, item.path] });
    }
  }

  render() {
    const { permissions } = this.state;
    return (
      <div>
        {
          Menu.map((item, index) => {
            if (item.path) {
              return <PermissionItem item={item} checked={isItemChecked(permissions, item.path)} onChange={() => this.handleChange(item)} key={`item_${index}`}/>
            }
            return (
              <div key={`item_${index}`}>
                <PermissionItem item={item} />
                <div style={styles.wrapper}>
                  {item.submenu.map((subItem, subIndex) => (
                    <PermissionItem
                      item={subItem}
                      checked={isItemChecked(permissions, subItem.path)}
                      onChange={() => this.handleChange(subItem)}
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
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
}