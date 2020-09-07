import React from 'react'
import Departments from './department'
import DepartmentEditor from './newDepartment'
import Staffs from './staff';
import StaffEditor from './newStaff';
import StaffPermEditor from './staffPermission';
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/permissions/departments' exact component={Departments} checkPath='/permissions/departments' />
    <CustomRoute path='/permissions/departments/view/:id' component={DepartmentEditor} checkPath='/permissions/departments' />
    <CustomRoute path='/permissions/departments/new' component={DepartmentEditor} checkPath='/permissions/departments' />

    <CustomRoute path='/permissions/staffs' exact component={Staffs} checkPath='/permissions/staffs' />
    <CustomRoute path='/permissions/staffs/edit/:id' component={StaffPermEditor} checkPath='/permissions/staffs' />
    <CustomRoute path='/permissions/staffs/new' component={StaffEditor} checkPath='/permissions/staffs' />
  </div>
);
