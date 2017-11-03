import React from "react"
import { render } from "react-dom"
// Import React Table
import ReactTable from "react-table"
import { makeData} from "../modules/utils";
import "react-table/react-table.css"

class Datatable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div id="datatable">
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Features",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                },
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                },
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )
  }
}

export default Datatable
