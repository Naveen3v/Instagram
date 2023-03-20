import {BsGrid3X3} from 'react-icons/bs'
import './index.css'

const UserProfileCard = props => {
  const {userProfileDetails} = props
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
  } = userProfileDetails
  return (
    <div className="upcCont">
      <div className="upcProfileCont">
        <img src={profilePic} alt="pic" className="upcProfilePic" />
        <div className="upcProfileTextCont">
          <p className="upcProfilePara">{userName}</p>
          <div className="upcpff">
            <p className="upcpffPara">{postsCount} posts</p>
            <p className="upcpffPara">{followersCount} followers</p>
            <p className="upcpffPara">{followingCount} following</p>
          </div>
          <p className="upcIdPara">{userId}</p>
          <p className="upcBioPara">{userBio}</p>
        </div>
      </div>
      <div className="upcStorCont">
        <img src={stories[0].image} alt="stories" className="upcStorImg" />
        <img src={stories[1].image} alt="stories" className="upcStorImg" />
        <img src={stories[2].image} alt="stories" className="upcStorImg" />
      </div>
      <hr className="upcLine" />
      <div className="upcgridCont">
        <BsGrid3X3 className="upcgrid" />
        <p className="upcPostsPara">Posts</p>
      </div>
      <ul className="upcListCont">
        {posts.map(each => (
          <li className="upcList" key={each.id}>
            <img src={each.image} className="upcListImg" alt="post" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserProfileCard
