import {Component} from 'react'
import Cookies from 'js-cookie'
import {FiAlertTriangle} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import PostCard from '../PostCard'
import ReactSlick from '../ReactSlick'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postsList: [],
    searchInput: '',
    show: true,
  }

  componentDidMount() {
    this.getPosts()
  }

  searchChange = value => {
    this.setState({searchInput: value})
  }

  searchClick = () => {
    this.setState({show: false}, this.getPosts)
  }

  tryAgain = () => {
    this.getPosts()
  }

  getPosts = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        imageUrl: each.post_details.image_url,
        caption: each.post_details.caption,
        likesCount: each.likes_count,
        createdAt: each.created_at,
        comments: each.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
      }))
      this.setState({
        postsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  postLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  postSuccess = () => {
    const {postsList} = this.state
    return (
      <ul className="pclistCont">
        {postsList.map(each => (
          <PostCard postDetails={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  postFailure = () => (
    <div className="homeFailureCont">
      <img
        src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679535809/alert-triangle_gkgajs.png"
        alt="failure view"
        className="alertTri"
      />
      <p className="homeFailPara">Something went wrong. Please try again</p>
      <button type="button" className="homeFailBtn" onClick={this.tryAgain}>
        Try again
      </button>
    </div>
  )

  displayPosts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.postLoading()
      case apiStatusConstants.success:
        return this.postSuccess()
      case apiStatusConstants.failure:
        return this.postFailure()
      default:
        return null
    }
  }

  render() {
    const {apiStatus, searchInput, show, postsList} = this.state
    const searchNotFound = postsList.length === 0

    return (
      <div className="homeCont">
        <Header
          searchChange={this.searchChange}
          searchClick={this.searchClick}
        />
        {searchNotFound && (
          <div className="homeSearchEmpty">
            <img
              src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679534725/Search_Not_Found_gydjjg.png"
              alt="search not found"
              className="homeSearchImg"
            />
            <h1 className="homeSearchHeading">Search Not Found</h1>
            <p className="homeSearchPara">
              Try different keyword or search again
            </p>
          </div>
        )}
        {show ? (
          <div className="homeDisplay">
            <ReactSlick />
            <div className="postCont">{this.displayPosts()}</div>
          </div>
        ) : (
          <div className="homeDisplay">
            <h1 className="homeSearchResultsHeading">Search Results</h1>
            <div className="postCont">{this.displayPosts()}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
