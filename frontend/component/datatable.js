import React from "react"
import {render} from "react-dom"
import PropTypes from "prop-types"
import ReactTable from "react-table"
import {makeData} from "../modules/utils"
import "react-table/react-table.css"

class Datatable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    }
  }
  renderColumns(featureNames, accessors) {
    const list = []
    let t = ""
    for (let i in featureNames) {
      t = {
        Header: featureNames[i],
        accessor: accessors[i]
      }
      list.push(t)
    }
    return (list)
  }
  render() {
    console.log(this.state.data)
    const data = this.props.data
    const featureNames = this.props.featureNames
    const accessor = this.props.accessor
    return (<div id="datatable">
      <ReactTable data={data} columns={[{
            Header: "Features",
            columns: this.renderColumns(featureNames, accessor)
          }
        ]} defaultPageSize={10} className="-striped -highlight"/>
    </div>)
  }
}

Datatable.PropTypes = {
  data: PropTypes.object,
  featureNames: PropTypes.array,
  accessor: PropTypes.array
}

export default Datatable
