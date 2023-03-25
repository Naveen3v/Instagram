import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
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
        <img src={profilePic} alt="user profile" className="upcProfilePic" />
        <div className="upcProfileTextCont">
          <h1 className="upcProfilePara">{userName}</h1>
          <div className="upcpff">
            <h1 className="upcpffPara">{postsCount} posts</h1>
            <p className="upcpffPara">{followersCount} followers</p>
            <p className="upcpffPara">{followingCount} following</p>
          </div>
          <p className="upcIdPara">{userId}</p>
          <p className="upcBioPara">{userBio}</p>
        </div>
      </div>
      <ul className="upcStorCont">
        {stories.map(each => (
          <li className="upcList" key={each.id}>
            <img src={each.image} alt="user story" className="upcStorImg" />
          </li>
        ))}
      </ul>
      <hr className="upcLine" />
      <div className="upcgridCont">
        <BsGrid3X3 className="upcgrid" />
        <p className="upcPostsPara">Posts</p>
      </div>
      {posts.length === 0 ? (
        <>
          <BiCamera className="upcNoIcon" />
          <h1 className="upcNoHeading">No Posts</h1>
        </>
      ) : (
        <ul className="upcListCont">
          {posts.map(each => (
            <li className="upcList" key={each.id}>
              <img src={each.image} className="upcListImg" alt="user post" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserProfileCard
