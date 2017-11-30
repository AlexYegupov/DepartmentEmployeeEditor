import React from 'react';



export default class TableEditor extends React.Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
  }

  render() {
    const fields =
    const fieldNames = Object.values(this.props.fields).map( item => item.title)

    return (<table>
      <table>
        <tr>
          <th></th>
        </tr>



      </table>

    </table>)
  }

}
