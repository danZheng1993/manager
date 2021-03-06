import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';
import SidebarRun from './Sidebar.run';
import Menu from '../../Menu.js';
import { fetchPermissions } from '../../redux/api/apiCall';

/** Component to display headings on sidebar */
const SidebarItemHeader = ({item}) => (
    <li className="nav-heading">
        <span>{item.heading}</span>
    </li>
)

/** Normal items for the sidebar */
const SidebarItem = ({item, isActive}) => (
    <li className={ isActive ? 'active' : '' }>
        <Link to={'/' + item.path} title={item.name}>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span>{item.name}</span>
        </Link>
    </li>
)

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({item, isActive, handler, children, isOpen}) => (
    <li className={ isActive ? 'active' : '' }>
        <div className="nav-item" onClick={ handler }>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span>{item.name}</span>
        </div>
        <Collapse isOpen={ isOpen }>
            <ul id={item.path} className="sidebar-nav sidebar-subnav">
                { children }
            </ul>
        </Collapse>
    </li>
)

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({item}) => (
    <li className="sidebar-subnav-header">{item.name}</li>
)

class Sidebar extends Component {

    state = {
      collapse: {},
      permissions: [],
    }

    componentDidMount() {
      // pass navigator to access router api
      SidebarRun(this.navigator.bind(this));
      this.fetchPermissions();  
      // prepare the flags to handle menu collapsed states
      this.buildCollapseList()
    }

    async fetchPermissions() {
      try {
        const result = await fetchPermissions();
        this.setState({ permissions: result.data });
      } catch(err) {
        console.log(err);
      }
    }
    

    checkVisible(item) {
      const { permissions } = this.state
      if (permissions[0] === 'all') {
        return true;
      }
      if (permissions) {
        if (item.path) {
          return permissions.findIndex(perm => perm === item.path) >= 0;
        } else {
          const { submenu } = item;
          const result = submenu.reduce((prev, mItem) => {
            return prev || (permissions.findIndex(perm => perm === mItem.path) >= 0);
          }, false);
          return result;
        }
        // return true;
      }
      return true;
      // if (permissions.length === 0) {
      //   console.log(perm)
      // }
    }

    /** prepare initial state of collapse menus. Doesnt allow same route names */
    buildCollapseList = () => {
      let collapse = {};
      Menu
        .filter(({heading}) => !heading)
        .forEach(({name, path, submenu}) => {
          collapse[name] = this.routeActive(submenu ? submenu.map(({path})=>path) : path)
        })
      this.setState({collapse});
    }

    navigator(route) {
      this.props.history.push(route);
    }

    routeActive(paths) {
      paths = Array.isArray(paths) ? paths : [paths];
      if (paths.indexOf(this.props.location.pathname.replace('/','')) > -1)
        return true;
      return false;
    }

    toggleItemCollapse(stateName) {
      for (let c in this.state.collapse) {
        if (this.state.collapse[c] === true && c !== stateName)
          this.setState({
            collapse: {
              [c]: false
            }
          });
      }
      this.setState({
        collapse: {
          [stateName]: !this.state.collapse[stateName]
        }
      });
    }

    getSubRoutes = item => item.submenu.map(({path}) => path)

    /** map menu config to string to determine what elemetn to render */
    itemType = item => {
      if (item.heading) return 'heading';
      if (!item.submenu) return 'menu';
      if (item.submenu) return 'submenu';
    }

    render() {
      return (
        <aside className='aside-container'>
          { /* START Sidebar (left) */ }
          <div className="aside-inner">
            <nav data-sidebar-anyclick-close="" className="sidebar">
              { /* START sidebar nav */ }
              <ul className="sidebar-nav">
                { /* END user info */ }

                { /* Iterates over all sidebar items */ }
                {
                  Menu.map((item, i) => {
                    // heading
                    if (!this.checkVisible(item)) {
                      return null;
                    }
                    if(this.itemType(item) === 'heading')
                      return (
                          <SidebarItemHeader item={item} key={i} />
                      )
                    else {
                      if(this.itemType(item) === 'menu') {
                        return (
                          <SidebarItem isActive={this.routeActive(item.path)} item={item} key={i} />
                        )
                      }
                      if(this.itemType(item) === 'submenu')
                        return [
                          <SidebarSubItem item={item} isOpen={this.state.collapse[item.name]} handler={ this.toggleItemCollapse.bind(this, item.name) } isActive={this.routeActive(this.getSubRoutes(item))} key={i}>
                            <SidebarSubHeader item={item} key={i}/>
                            {
                              item.submenu.map((subitem, i) => this.checkVisible(subitem) ? <SidebarItem key={i} item={subitem} isActive={this.routeActive(subitem.path)} /> : null)
                            }
                          </SidebarSubItem>
                        ]
                    }
                    return null; // unrecognized item
                  })
                }
              </ul>
              { /* END sidebar nav */ }
            </nav>
          </div>
          { /* END Sidebar (left) */ }
        </aside>
      );
    }
}

export default (withRouter(Sidebar));
