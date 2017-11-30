import React from 'react';
import PropTypes from 'prop-types';

export default class EmployeeEditor extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    departments: PropTypes.array,
    onSave: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      modified: false
    }
  }

  valueChanged = (field, event) => {
    const value = event.target.value

    this.setState((prevState, props) => (
      {data: {...prevState.data, [field]: value}, modified: true}
    ))
  }

  saveClicked = (event) => {
    if (this.props.onSave) {
      this.props.onSave(this.state.data)
    }
    // TODO: naive optimistic
    this.setState({modified: false})
  }

  cancelClicked = (event) => {
    this.setState( (prevState, props) => ({data: props.data, modified: false}) )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  render() {
    return <div>
      <input type="text" value={this.state.data.firstName} onChange={this.valueChanged.bind(null, 'firstName')} />

      <input type="text" value={this.state.data.lastName} onChange={this.valueChanged.bind(null, 'lastName')} />

      <select value={this.state.data.departmentId} onChange={this.valueChanged.bind(null, 'departmentId')}>
        { this.props.departments.map( (item, i) =>
          (<option value={item.id} key={i}>{item.name}</option>)
        )
        }
      </select>

      <button type="button" disabled={!this.state.modified} onClick={this.saveClicked}>Save</button>
      <button type="button" disabled={!this.state.modified} onClick={this.cancelClicked}>Cancel</button>
    </div>
  }
}
