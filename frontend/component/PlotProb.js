import React from "react"
import ReactDOM from "react-dom"
import {Container, Row, Col} from 'reactstrap'
import {HorizontalBar} from 'react-chartjs-2'
import PropTypes from "prop-types"

class PlotProb extends React.Component {
  render() {
    const datasets = {
      labels: [
        'False', 'True'
      ],
      datasets: [
        {
          backgroundColor: [
            'rgba(244,67,54,0.8)', 'rgba(33,150,243,0.8)'
          ],
          borderColor: [
            'rgba(244,67,54,0.8)', 'rgba(33,150,243,0.8)'
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            'rgba(244,67,54,0.8)', 'rgba(33,150,243,0.8)'
          ],
          hoverBorderColor: [
            'rgba(244,67,54,0.8)', 'rgba(33,150,243,0.8)'
          ],
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
              min: 0,
              max: 1
            }
          }
        ]
      }
    }
    return (<div>
      <HorizontalBar data={datasets} options={options} redraw={true}/>
    </div>)
  }
}

PlotProb.PropTypes = {
  dataArray: PropTypes.array,
  options: PropTypes.object
}

export default PlotProb
