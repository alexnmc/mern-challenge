import React, {Component} from 'react'
import './App.css'
import axios from 'axios'
import DonutChart from 'react-donut-chart'


class App extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      firstName: '',
      lastName: '',
      participation: '',
    }
  }

  
  componentDidMount(){
    axios.get('/data').then(res => {
      this.setState({data: res.data})
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const {firstName, lastName, participation} = this.state
    axios.post('/data', {firstName, lastName, participation}).then(res => {
      axios.get('/data').then(res => {
        this.setState({data: res.data})
      })
    })
    this.setState({firstName: '', lastName: '', participation: ''})
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]:value
    })
  }

  handleDelete = () => {
    if(this.state.data.length > 0){
      var answer = window.confirm("Are you sure you want to delete all data?")
      if(answer){
        axios.delete('/data').then(res => {
            this.setState({data: []})
        })
      }
    }else{
      alert("No Data")
    }
  }

  render(){
    return (
      <div className = "App">
        <div className = "dataForm">
          <form onSubmit = {this.handleSubmit} data-testid="form">
            <input 
              className = "input"
              id = "firstName"
              type='text' 
              name='firstName'
              placeholder='First Name'
              value={this.state.firstName} 
              onChange={this.handleChange}
              required
            />
            <input 
            className = "input" 
              id = "lastName"
              type='text' 
              name='lastName'
              placeholder='Last Name'
              value={this.state.lastName} 
              onChange={this.handleChange}
              required
            />
            <input 
              className = "input"
              id = "participation"
              name='participation'
              type='number' 
              placeholder='Participation'
              value={this.state.participation} 
              onChange={this.handleChange}
              required
            />
            <button id = "submit" className = "submit">SEND</button>
          </form>
          <button id = "delete" className = "delete" onClick = {() => this.handleDelete()}>ERASE</button>
        </div>
        <h1 id = "data">DATA</h1>
        <div className = 'container'>
          <div className = 'table'>
            <div className = 'frame'>
              <h2 className = 'index2'>{}</h2>
              <h2 className = 'title'>First Name</h2>
              <h2 className = 'lname2'>Last Name</h2>
              <h2 className = 'participation2'>Participation</h2>
            </div>
              {
                this.state.data.sort(function (a, b) {    // sorting data in increasing order
                  return a.participation - b.participation
                }).map((item, index) => {
                  return(
                    <div className = 'frame' key = {item._id}>
                      <h2 className = 'index'>{index+1}</h2>
                      <h2>{item.firstName}</h2>
                      <h2 className = 'lname'>{item.lastName}</h2>
                      <h2 className = 'participation'>{item.participation}%</h2>
                    </div>
                )})
              }
          </div>
          <DonutChart
            colors = {[ '#0066ff', '#00ff40', '#ff3c00', '#673ab7', '#f76b00', '#c9c9c9', '#f7ca00', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b' ]}
            innerRadius={0.35}
            outerRadius={0.55}
            data={this.state.data.map(item => item = {label: item.firstName+' '+item.lastName, value: item.participation})}
          />
        </div>
      </div>
    )
  }
}

export default App
