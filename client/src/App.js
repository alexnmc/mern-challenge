import React, {Component} from 'react'
import './App.css'
import axios from 'axios'
import DonutChart from 'react-donut-chart';


class App extends Component {
  constructor(){
    super()
    this.state = {
      data2: [],
      firstName: '',
      lastName: '',
      participation: '',
    }
  }
  
  componentDidMount(){
    axios.get('http://localhost:8000/data').then(res => {
        this.setState({data2: res.data})
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
      const {firstName, lastName, participation} = this.state
      axios.post('http://localhost:8000/data', {firstName, lastName, participation}).then(res => {
        axios.get('http://localhost:8000/data').then(res => {
           this.setState({data2: res.data})
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

  render(){
    return (
      <div className="App">
        <form className = 'dataForm' onSubmit={this.handleSubmit} >
          <input className = "input"
            type='text' 
            name='firstName'
            placeholder='First Name'
            value={this.state.firstName} 
            onChange={this.handleChange}
            required
          />
          <input className = "input"
            type='text' 
            name='lastName'
            placeholder='Last Name'
            value={this.state.lastName} 
            onChange={this.handleChange}
            required
          />
          <input className = "input"
            name='participation'
            type='number' 
            placeholder='Participation'
            value={this.state.participation} 
            onChange={this.handleChange}
            required
          />
          <button className = "submit">SEND</button>
        </form> 
        <h1>DATA</h1>
        <div className = 'table'>
            <div className = 'frame'>
              <h2 className = 'index2'>{}</h2>
              <h2 className = 'title'>First Name</h2>
              <h2 className = 'title'>Last Name</h2>
              <h2 className = 'title'>Participation</h2>
            </div>
            {this.state.data2.sort(function (a, b) {
                return a.participation - b.participation
              }).map((item, index) => {
              return(
                <div className = 'frame' key = {item._id}>
                  <h2 className = 'index'>{index+1}</h2>
                  <h2>{item.firstName}</h2>
                  <h2>{item.lastName}</h2>
                  <h2>{item.participation}%</h2>
                </div>
              )
            })
            }
        </div>
        <div className ='pie'>
          <DonutChart
            innerRadius={0.40}
            outerRadius={0.60}
            data={this.state.data2.map(item => item = {label: item.firstName+' '+item.lastName, value: item.participation})} />
        </div>
      </div>
    )
  }
}

export default App;
