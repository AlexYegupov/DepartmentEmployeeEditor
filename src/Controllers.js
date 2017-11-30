import React from 'react'
import axios from 'axios'

import DepartmentEditor from './DepartmentEditor'
import EmployeeEditor from './EmployeeEditor'

const HOST = 'http://localhost:4000'

const DepartmentController = {
  title: 'Departments',
  prepareData: function() {
    return getDepartments()
      .then( (departments) => {
        return {departments}
      })
  },
  patch: patchDepartment,
  createEditTable: function(data) {
    return data.departments ? data.departments.map( (item, i) =>
           (<DepartmentEditor data={item} onSave={this.patch} key={i} />))
         : null
  },
}

const EmployeeController = {
  title: 'Employees',
  prepareData: function() {
    return Promise.all([
      getEmployees(),
      getDepartments()
    ]).then( function([employees, departments]) {
      return {employees, departments} // this.data =
    })
  },
  patch: patchEmployee,
  createEditTable: function(data) {
    return data.employees ? data.employees.map( (item, i) =>
           (<EmployeeEditor data={item} departments={data.departments} onSave={this.patch} key={i} />))
         : null

  },
}

export const Controllers = [DepartmentController, EmployeeController]


export function getDepartments()  {
  return axios.get(`${HOST}/departments`).then( r => r.data)
}

export function getEmployees() {
  return axios.get(`${HOST}/employees`).then( r => r.data)
}


export function patchDepartment(data)  {
  return axios.patch(`${HOST}/departments/${data.id}`, data).then( r => r.data)
}

export function patchEmployee(data)  {
  return axios.patch(`${HOST}/employees/${data.id}`, data).then( r => r.data)
}
