import React, {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: 'linear',
}

class ReactSlick extends Component {
  state = {apiStatus: apiStatusConstants.initial, storiesList: []}

  componentDidMount() {
    this.getStoriesList()
  }

  rstryAgain = () => {
    this.getStoriesList()
  }

  getStoriesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  storiesLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  storiesSuccess = () => {
    const {storiesList} = this.state
    return (
      <Slider {...settings}>
        {storiesList.map(each => {
          const {userId, storyUrl, userName} = each
          return (
            <ul className="stoListCont" key={userId}>
              <li className="stoList">
                <img src={storyUrl} alt="user story" className="stoImg" />
                <p className="stoPara">{userName}</p>
              </li>
            </ul>
          )
        })}
      </Slider>
    )
  }

  storiesFailure = () => (
    <div className="rsFailureCont">
      <img
        src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679535809/alert-triangle_gkgajs.png"
        alt="failure view"
        className="rsalertTri"
      />
      <p className="rsFailPara">Something went wrong. Please try again</p>
      <button type="button" className="rsFailBtn" onClick={this.rstryAgain}>
        Try again
      </button>
    </div>
  )

  displayStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.storiesLoading()
      case apiStatusConstants.success:
        return this.storiesSuccess()
      case apiStatusConstants.failure:
        return this.storiesFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="slickMain">
        <div className="sliderCont">{this.displayStories()}</div>
      </div>
    )
  }
}
export default ReactSlick
