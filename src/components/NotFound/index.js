import './index.css'

const NotFound = props => {
  const goHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="nfCont">
      <img
        src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679186376/NotFound_z0ppj1.png"
        alt="page not found"
        className="nfImg"
      />
      <h1 className="nfHeading">PAGE NOT FOUND</h1>
      <p className="nfPara">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" className="nfBtn" onClick={goHome}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
