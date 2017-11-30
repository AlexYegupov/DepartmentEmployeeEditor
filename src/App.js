import React from 'react';
import './App.css';
import SelectMenu from './SelectMenu'
import { Controllers } from './Controllers'

const ControllerNames = Object.values(Controllers).map( item => item.title )


class App extends React.Component {
  state = {
    entityIndex: 0,
    controllerData: {}
  }

  entityChanged = (index) => {
    this.setState({
      entityIndex: index
    })

    Controllers[index].prepareData()
      .then( data =>
        this.setState({ controllerData:  data})
      )
  }

  componentDidMount() {
    // initial manual handle
    this.entityChanged(this.state.entityIndex)
  }

  render() {
    const controller = Controllers[this.state.entityIndex]

    return (
      <div>
        <div className="App">
          <div className="left-menu">
            <SelectMenu items={ControllerNames} onChange={this.entityChanged} />
          </div>

          <div className="edit-table">
            { controller.createEditTable(this.state.controllerData) }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
