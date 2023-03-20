import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import './index.css'

const PostCard = props => {
  const {postDetails} = props
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
  return (
    <li className="pcList">
      <div className="pcprofilepicCont">
        <img src={profilePic} alt="profiepic" className="pcprofilepicImg" />
        <Link to={`/users/${userId}`} className="pcLink">
          <p className="pcUsername">{userName}</p>
        </Link>
      </div>
      <img src={imageUrl} alt="imageprofile" className="pcuserImage" />
      <div className="pcbottomCont">
        <div className="pcIconCont">
          <button type="button" className="pcHeartBtn">
            <BsHeart className="pcbsHeart" />
          </button>
          <FaRegComment className="pcrcomment" />
          <BiShareAlt className="pcrshare" />
        </div>
        <p className="pclikePara">{likesCount} likes</p>
        <p className="pccaptionPara">{caption}</p>
        <div className="pcComCont1">
          <p className="pcComPara1">{comments[0].userName}</p>
          <p className="pcComPara2">{comments[0].comment}</p>
        </div>
        <div className="pcComCont1">
          <p className="pcComPara1">{comments[1].userName}</p>
          <p className="pcComPara2">{comments[1].comment}</p>
        </div>
        <p className="pcCreatedPara">{createdAt}</p>
      </div>
    </li>
  )
}
export default PostCard
