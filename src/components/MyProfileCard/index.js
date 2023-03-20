import {BsGrid3X3} from 'react-icons/bs'
import './index.css'

const MyProfileCard = props => {
  const {myProfileDetails} = props
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
    posts,
    stories,
  } = myProfileDetails
  return (
    <div className="mpcCont">
      <div className="mpcProfileCont">
        <img src={profilePic} alt="pic" className="mpcProfilePic" />
        <div className="mpcProfileTextCont">
          <p className="mpcProfilePara">{userName}</p>
          <div className="mpcpff">
            <p className="mpcpffPara">{postsCount} posts</p>
            <p className="mpcpffPara">{followersCount} followers</p>
            <p className="mpcpffPara">{followingCount} following</p>
          </div>
          <p className="mpcIdPara">{userId}</p>
          <p className="mpcBioPara">{userBio}</p>
        </div>
      </div>
      <div className="mpcStorCont">
        <img src={stories[0].image} alt="stories" className="mpcStorImg" />
        <img src={stories[1].image} alt="stories" className="mpcStorImg" />
        <img src={stories[2].image} alt="stories" className="mpcStorImg" />
      </div>
      <hr className="mpcLine" />
      <div className="mpcgridCont">
        <BsGrid3X3 className="mpcgrid" />
        <p className="mpcPostsPara">Posts</p>
      </div>
      <ul className="mpcListCont">
        {posts.map(each => (
          <li className="mpcList" key={each.id}>
            <img src={each.image} className="mpcListImg" alt="post" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyProfileCard
