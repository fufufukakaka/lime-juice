import React from "react"
import ReactDOM from "react-dom"
import {Container, Row, Col} from 'reactstrap'
import {HorizontalBar} from 'react-chartjs-2'
import PropTypes from "prop-types"

class PlotCof extends React.Component {
  render() {
    const data = {
      labels: this.props.nameArray,
      datasets: [
        {
          backgroundColor: this.props.colorArray,
          borderColor: this.props.colorArray,
          borderWidth: 1,
          hoverBackgroundColor: this.props.colorArray,
          hoverBorderColor: this.props.colorArray,
          data: this.props.dataArray
        }
      ]
    }
    const options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              min: Math.min.apply(null, this.props.dataArray),
              max: Math.max.apply(null, this.props.dataArray)
            }
          }
        ]
      }
    }

    return (<div>
      <HorizontalBar data={data} options={options} redraw={true}/>
    </div>)
  }
}

PlotCof.PropTypes = {
  dataArray: PropTypes.array,
  nameArray: PropTypes.array,
  colorArray: PropTypes.array,
  options: PropTypes.object
}

export default PlotCof
