import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class PostCard extends Component {
  state = {likeStatus: true, count: 0}

  changeLikeIcon = async () => {
    const {postDetails} = this.props
    const {postId, likesCount} = postDetails
    const {likeStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const status = {
      like_status: likeStatus,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(status),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    this.setState(prevState => ({likeStatus: !prevState.likeStatus}))
  }

  likeIncrement = () => {
    const {postDetails} = this.props
    const {likesCount} = postDetails
    const {count} = this.state
    this.changeLikeIcon()
    this.setState({count: likesCount + 1})
  }

  likeDecrement = () => {
    const {postDetails} = this.props
    const {likesCount} = postDetails
    const {count} = this.state
    this.changeLikeIcon()
    this.setState({count: likesCount - 1})
  }

  render() {
    const {postDetails} = this.props
    const {
      postId,
      userId,
      userName,
      profilePic,
      imageUrl,
      caption,
      likesCount,
      createdAt,
      comments,
    } = postDetails
    const {likeStatus, count} = this.state
    const likesResult = count

    return (
      <li className="pcList">
        <div className="pcprofilepicCont">
          <img
            src={profilePic}
            alt="post author profile"
            className="pcprofilepicImg"
          />
          <Link to={`/users/${userId}`} className="pcLink">
            <p className="pcUsername">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="pcuserImage" />
        <div className="pcbottomCont">
          <div className="pcIconCont">
            {likeStatus ? (
              <button
                type="button"
                data-testid="likeIcon"
                className="pcHeartBtn"
                onClick={this.likeIncrement}
              >
                <FcLike className="pcbsHeart" testid="likeIcon" />
              </button>
            ) : (
              <button
                type="button"
                data-testid="unLikeIcon"
                className="pcHeartBtn"
                onClick={this.likeDecrement}
              >
                <BsHeart className="pcbsHeart" testid="unLikeIcon" />
              </button>
            )}
            <FaRegComment className="pcrcomment" />
            <BiShareAlt className="pcrshare" />
          </div>
          {likeStatus ? (
            <p className="pclikePara">{likesCount} likes</p>
          ) : (
            <p className="pclikePara">{likesResult} likes</p>
          )}
          <p className="pccaptionPara">{caption}</p>
          <div className="pcComCont1">
            <span className="pcComPara1">{comments[0].userName}</span>
            <p className="pcComPara2">{comments[0].comment}</p>
          </div>
          <div className="pcComCont1">
            <span className="pcComPara1">{comments[1].userName}</span>
            <p className="pcComPara2">{comments[1].comment}</p>
          </div>
          <p className="pcCreatedPara">{createdAt}</p>
        </div>
      </li>
    )
  }
}
export default withRouter(PostCard)
