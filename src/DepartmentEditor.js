import React from 'react';
import PropTypes from 'prop-types';

export default class DepartmentEditor extends React.Component {
  static propTypes = {
    data: PropTypes.object,
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
    this.setState({ data:nextProps.data })
  }


  render() {
    return <div>
      <input type="text" placeholder="Name" value={this.state.data.name} onChange={this.valueChanged.bind(null, 'name')} />

      <button type="button" disabled={!this.state.modified} onClick={this.saveClicked}>Save</button>
      <button type="button" disabled={!this.state.modified} onClick={this.cancelClicked}>Cancel</button>
    </div>
  }
}
