import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navCont">
      <div className="nav1">
        <Link to="/" className="navLink">
          <img
            src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679155631/Login_uq3dxx.png"
            alt="website logo"
            className="navImg"
          />
        </Link>
        <h1 className="navHeading">Insta Share</h1>
      </div>
      <div className="nav2">
        <div className="navInput">
          <input
            type="search"
            placeholder="Search Caption"
            className="navSearch"
          />
          <button type="button" data-testid="searchIcon" className="searchBtn">
            <FaSearch className="searchIcon" />
          </button>
        </div>
        <ul className="navContList">
          <Link to="/" className="navLink">
            <li className="nav2List">Home</li>
          </Link>
          <Link to="/my-profile" className="navLink">
            <li className="nav2List">Profile</li>
          </Link>
        </ul>
        <button type="button" className="nav2Btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
