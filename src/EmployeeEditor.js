import React from 'react';
import PropTypes from 'prop-types';

export default class EmployeeEditor extends React.Component {
  static propTypes = {
    //onChange: PropTypes.func,
    data: PropTypes.object,
    departments: PropTypes.array,

    onSave: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  valueChanged = (field, event) => {
    //const field = event.target.name
    const value = event.target.value

    console.log('vC', this, field, event.target.value, {data: {...this.state.data, [field]: value }})

    this.setState((prevState, props) => (
      {data: {...prevState.data, [field]: value}}
    ))

    /* if (this.props.onChange) {
     *   this.props.onChange(event.target.value)
     * }*/
  }

  saveClicked = (event) => {
    console.log('sC', this.state.data)
    if (this.props.onSave) {
      this.props.onSave(this.state.data)
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  render() {
    //console.log('rEE', this.props, this.state)
    return <div>
      <input type="text" value={this.state.data.firstName} onChange={this.valueChanged.bind(null, 'firstName')} />

      <input type="text" value={this.state.data.lastName} onChange={this.valueChanged.bind(null, 'lastName')} />

      <select value={this.state.data.departmentId} onChange={this.valueChanged.bind(null, 'departmentId')}>
        { this.props.departments.map( (item, i) =>
          (<option value={item.id} key={i}>{item.name}</option>)
        )
        }
      </select>

      <button type="button" onClick={this.saveClicked}>Save</button>
      {/* TODO: cancel button  */}
    </div>
  }
}
