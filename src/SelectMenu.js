import React from 'react';
import PropTypes from 'prop-types';
import './SelectMenu.css';

export default class SelectMenu extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
  }

  state = {
    activeItemIndex: 0
  }

  itemClicked = (index, event) => {
    //w console.log('iC', index, event.target, this)
    this.setState({ activeItemIndex: index })
    if (this.props.onChange) {
      this.props.onChange(index)
    }
  }

  render() {
    console.log('re', this.state.activeItem)
    return (
      <ul className="entity-list">
        {this.props.items.map( (item, i) =>
          <li className={ this.state.activeItemIndex === i ? "active" : ""} onClick={this.itemClicked.bind(null, i)} key={i}>
            {item}
          </li>
        )}
      </ul>
    )
  }
}
