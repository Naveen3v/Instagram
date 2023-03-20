import {Component} from 'react'
import Cookies from 'js-cookie'
import {FiAlertTriangle} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import PostCard from '../PostCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, postsList: []}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
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
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  postLoading = () => (
    <div className="loader-container" data-testid="loader">
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
    <>
      <FiAlertTriangle className="fiAlert" />
      <p>Something went wrong.Please try again</p>
      <button>Try again</button>
    </>
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
    const {apiStatus} = this.state
    return (
      <div className="homeCont">
        <Header />
        <div className="postCont">{this.displayPosts()}</div>
      </div>
    )
  }
}

export default Home
