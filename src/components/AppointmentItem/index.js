// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {key, appointment, toggleStar} = props
  const {id, title, date, isStarred} = appointment

  const star = () => {
    toggleStar(id)
  }
  return (
    <li className="list-container">
      <div className="appointment-item">
        <p className="heading">{title}</p>
        <button onClick={star} className="star-button" data-testid="star">
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            className="star-image"
            alt="star"
          />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
