import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import UserProfileCard from '../UserProfileCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, userProfileData: ''}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
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
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        postsCount: data.user_details.posts_count,
        posts: data.user_details.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        stories: data.user_details.stories.map(each => ({
          id: each.id,
          image: each.image,
        })),
      }
      console.log(updatedData.posts)
      this.setState({
        apiStatus: apiStatusConstants.success,
        userProfileData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  upLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  upSuccess = () => {
    const {userProfileData} = this.state
    return (
      <UserProfileCard
        userProfileDetails={userProfileData}
        key={userProfileData.userId}
      />
    )
  }

  clickBtn = () => {
    this.getUserProfileData()
  }

  upFailure = () => (
    <div className="upFailCont">
      <img
        src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679494951/Failure_MP_li2utx.png"
        className="upFailImg"
        alt="failure view"
      />
      <p className="upFailPara">Something went wrong. Please try again</p>
      <button type="button" className="upFailBtn" onClick={this.clickBtn}>
        Try again
      </button>
    </div>
  )

  displayUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.upLoading()
      case apiStatusConstants.success:
        return this.upSuccess()
      case apiStatusConstants.failure:
        return this.upFailure()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="upCont">
        <Header />
        <div className="upMainCont">{this.displayUserProfile()}</div>
      </div>
    )
  }
}

export default UserProfile
