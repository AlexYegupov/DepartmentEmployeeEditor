import React from 'react';
import PropTypes from 'prop-types';

export default class DepartmentEditor extends React.Component {
  static propTypes = {
    //departments: PropTypes.string,
    //onChange: PropTypes.func,
    data: PropTypes.object,

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
    this.setState({ data:nextProps.data })
  }


  render() {
    console.log('DE.render', this.state.data)
    return <div>
      <input type="text" placeholder="Name" value={this.state.data.name} onChange={this.valueChanged.bind(null, 'name')} />

      <button type="button" onClick={this.saveClicked}>Save</button>
      {/* TODO: cancel button  */}
    </div>
  }
}
