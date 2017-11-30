import React, { Component } from 'react';
import './App.css';

import SelectMenu from './SelectMenu'
import DepartmentEditor from './DepartmentEditor'
import EmployeeEditor from './EmployeeEditor'
import axios from 'axios';

const DepartmentController = {
  //data: null, //{departments: []},
  title: 'Departments',
  //getAll: getDepartments,
  prepareData: function() { // force=false
    //if (force || !this.data) {
      return getDepartments()
        .then( (departments) => {
          console.log('pD', departments, this)
          //this.data = {departments}
          return {departments}
        })
    //}
  },
  patch: patchDepartment,
  createEditTable: function(data) {
    console.log('cetD', data)

    //nw return Promise.resolve(1).then( d => (<div>{d}</div>) )

    //this.data
    return data.departments ? data.departments.map( (item, i) =>
           (<DepartmentEditor data={item} onSave={this.patch} key={i} />))
         : null

  },

  /* createEditor: function(data, key) {
   *   return <DepartmentEditor data={data} onSave={this.patch} key={key} />
   * }*/
}

const EmployeeController = {
  //data: {},
  title: 'Employees',
  prepareData: function() {
    return Promise.all([
      getEmployees(),
      getDepartments()
    ]).then( function([employees, departments]) {
      console.log('pD(e)', employees, departments)
      return {employees, departments} // this.data =
    })
  },
  patch: patchEmployee,
  /* createEditTable: function() {
   *   return this.data.employees.map( (item, i) =>
   *     <EmployeeEditor data={item} departments={this.data.departments} onSave={this.patch} key={i} />
   *   )
   * },  */
  createEditTable: function(data) {
    console.log('cetE', data)
    return data.employees ? data.employees.map( (item, i) =>
           (<EmployeeEditor data={item} departments={data.departments} onSave={this.patch} key={i} />))
         : null

  },
  /* createEditor: function(data, departments, key) {
   *   return <EmployeeEditor data={data} departments={departments} onSave={this.patch} key={key} />
   * }*/
}

const Controllers = [DepartmentController, EmployeeController]

const ControllerNames = Object.values(Controllers).map( item => item.title )

function getDepartments()  {
  return axios.get('http://localhost:4000/departments').then( r => r.data)
}

function getEmployees() {
  return axios.get('http://localhost:4000/employees').then( r => r.data)
}


function patchDepartment(data)  {
  return axios.patch(`http://localhost:4000/departments/${data.id}`, data).then( r => r.data)
}


function patchEmployee(data)  {
  return axios.patch(`http://localhost:4000/employees/${data.id}`, data).then( r => r.data)
}




class App extends Component {
  state = {
    entityIndex: 0,
    //entities: [],
    controllerData: {}
  }

  entityChanged = (index) => {
    console.log('ec', index)
    this.setState({
      entityIndex: index
    })

    // TODO: add errors processing
    Controllers[index].prepareData()
      .then( data =>
        this.setState({ controllerData:  data})
      )

    /* Controllers[index].prepareData().then( (data) => {
     *   this.setState({ controllerData: data  })
     * })*/

    /* Controllers[index].getAll().then( (data) => {
     *   this.setState({ entities: data })
     * })*/
  }

  Departmentchanged = (value) => {
    console.log('dc', value)
  }

  componentDidMount() {
    // initial manual handle
    this.entityChanged(this.state.entityIndex)

    /* getDepartments().then( (d) =>
     *   console.log(d.data)
     * )*/

  }

  test = () => {
    patchDepartment({id: 2, aa: "bb2++"})
  }

  /* createEditor(data, key) {
   *   console.log('createEditor', data, key)
   *   const controller = Controllers[this.state.entityIndex]
   *   return React.createElement(
   *     controller.editorComponent,
   *     {data,
   *      onSave: controller.patch,
   *      key: key,

   *     }
   *   )
   * }*/

  render() {
    console.log('r', this.state.entityIndex, this.state)
    const controller = Controllers[this.state.entityIndex]

    return (
      <div className="App">

      <div className="left-menu">
        <SelectMenu items={ControllerNames} onChange={this.entityChanged} />
      </div>

      <div className="edit-table">
        { controller.createEditTable(this.state.controllerData) }  {/* this.state.controllerData*/}
        {/* { this.state.entities.map( (item, i) => controller.createEditor(item, i) ) }*/}
      </div>

      {/* <button onClick={this.test}>test</button> */}

      {/* <DepartmentEditor  onChange={this.departmentChanged} />*/}

        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            </p> */}

      </div>
    );
  }
}

export default App;
