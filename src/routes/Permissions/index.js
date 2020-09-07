import React from 'react'
import { Route } from 'react-router-dom'
import Departments from './department'
import DepartmentEditor from './newDepartment'
import Staffs from './staff';
import StaffEditor from './newStaff';
import StaffPermEditor from './staffPermission';

export default () => (
  <div>
    <Route path='/permissions/departments' exact component={Departments} />
    <Route path='/permissions/departments/view/:id' component={DepartmentEditor} />
    <Route path='/permissions/departments/new' component={DepartmentEditor} />
    <Route path='/permissions/staffs' exact component={Staffs} />
    <Route path='/permissions/staffs/view/:id' component={StaffEditor} />
    <Route path='/permissions/staffs/new' component={StaffEditor} />
    <Route path='/permissions/staffs/edit/:id' component={StaffPermEditor} />
  </div>
);
