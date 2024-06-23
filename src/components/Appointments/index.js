// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    starredBtn: false,
  }

  toggleStar = id => {
    const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title === '' || date === '') {
      return
    }
    const newappointment = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newappointment],
      title: '',
      date: '',
    }))
  }

  onChangetitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangedate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  starredBtnList = () => {
    const {starredBtn} = this.state
    this.setState(prevState => ({
      starredBtn: !prevState.starredBtn,
    }))
  }
  render() {
    const {title, date, appointmentList, starredBtn} = this.state
    const filterdList = starredBtn
      ? appointmentList.filter(eachItem => eachItem.isStarred === true)
      : appointmentList
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-bookings">
            <form className="add-appointment" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label>TITLE</label>
              <input
                label="TITLE"
                type="text"
                placeholder="Title"
                className="input-el"
                value={title}
                onChange={this.onChangetitle}
              />
              <label>DATE</label>
              <input
                label="DATE"
                type="date"
                value={date}
                className="input-el"
                onChange={this.onChangedate}
              />
              <button className="button">Add</button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-items-header">
            <h1 className="heading">Appointments</h1>
            <button
              className={
                starredBtn ? 'appointment-button-blue' : 'appointment-button'
              }
              onClick={this.starredBtnList}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items">
            {filterdList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointment={eachItem}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
