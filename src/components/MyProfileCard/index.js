import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
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
        <img src={profilePic} alt="my profile" className="mpcProfilePic" />
        <div className="mpcProfileTextCont">
          <h1 className="mpcProfilePara">{userName}</h1>
          <div className="mpcpff">
            <p className="mpcpffPara">{postsCount} posts</p>
            <p className="mpcpffPara">{followersCount} followers</p>
            <p className="mpcpffPara">{followingCount} following</p>
          </div>
          <p className="mpcIdPara">{userId}</p>
          <p className="mpcBioPara">{userBio}</p>
        </div>
      </div>
      <ul className="mpcStorCont">
        {stories.map(each => (
          <li className="mpcList" key={each.id}>
            <img src={each.image} alt="my story" className="mpcStorImg" />
          </li>
        ))}
      </ul>
      <hr className="mpcLine" />
      <div className="mpcgridCont">
        <BsGrid3X3 className="mpcgrid" />
        <h1 className="mpcPostsPara">Posts</h1>
      </div>
      {posts.length === 0 ? (
        <>
          <BiCamera className="mpcNoIcon" />
          <h1 className="mpcNoHeading">No Posts</h1>
        </>
      ) : (
        <ul className="mpcListCont">
          {posts.map(each => (
            <li className="mpcList" key={each.id}>
              <img src={each.image} className="mpcListImg" alt="my post" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyProfileCard
