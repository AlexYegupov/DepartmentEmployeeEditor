import React from 'react';
import PropTypes from 'prop-types';

export default class DepartmentEditor extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {value: this.props.value}
  }

  valueChanged = (event) => {
    if (this.props.onChange) {
      this.setState({ value: event.target.value })
      this.props.onChange(event.target.value)
    }
  }

  render() {
    return <input type="text" value={this.props.value} onChange={this.valueChanged} />
  }
}
