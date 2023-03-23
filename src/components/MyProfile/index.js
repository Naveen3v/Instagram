import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import MyProfileCard from '../MyProfileCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, myProfileData: ''}

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        postsCount: data.profile.posts_count,
        posts: data.profile.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.profile.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      console.log(updatedData.posts)
      this.setState({
        apiStatus: apiStatusConstants.success,
        myProfileData: updatedData,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  mpLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  mpSuccess = () => {
    const {myProfileData} = this.state
    return (
      <MyProfileCard
        myProfileDetails={myProfileData}
        key={myProfileData.userId}
      />
    )
  }

  mpFailure = () => (
    <div className="mpFailCont">
      <img
        src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679494951/Failure_MP_li2utx.png"
        className="mpFailImg"
        alt="failure view"
      />
      <p className="mpFailPara">Something went wrong. Please try again</p>
      <button type="button" className="mpFailBtn">
        Try again
      </button>
    </div>
  )

  displayMyProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.mpLoading()
      case apiStatusConstants.success:
        return this.mpSuccess()
      case apiStatusConstants.failure:
        return this.mpFailure()
      default:
        return null
    }
  }

  render() {
    const {myProfileData} = this.state
    return (
      <div className="mpCont">
        <Header />
        <div className="mpMainCont">{this.displayMyProfile()}</div>
      </div>
    )
  }
}

export default MyProfile
