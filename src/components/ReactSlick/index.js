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
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

class ReactSlick extends Component {
  state = {apiStatus: apiStatusConstants.initial, storiesList: []}

  componentDidMount() {
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
    }
  }

  storiesLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  storiesSuccess = () => {
    const {storiesList} = this.state
    const {userName, storyUrl, userId} = storiesList
    return (
      <div className="storSliCont">
        <Slider {...settings}>
          <ul className="stoListCont">
            {storiesList.map(each => (
              <li className="stoList" key={each.userId}>
                <img src={each.storyUrl} alt="stroy" className="stoImg" />
                <p className="stoPara">{each.userName}</p>
              </li>
            ))}
          </ul>
        </Slider>
      </div>
    )
  }

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
    return <div className="sliderCont">{this.displayStories()}</div>
  }
}
export default ReactSlick
