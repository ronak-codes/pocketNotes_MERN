import React from 'react'
import BannerImage from "../assets/banner.png"
import { Lock as LockIcon } from '@mui/icons-material'; 
import "../styles.css"

const InitialPage = () => {
  return (
      <div className="no-group-selected">
          <img src={BannerImage} alt="Banner Image" style={{ width: "626px", height: "313px" }} />
          <h1>Pocket Notes</h1>
          <p>
              Send and receive messages without keeping your phone online.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <div className="bottom-text">
              <LockIcon />
              <p>end-to-end encrypted</p>
          </div>
      </div>
  )
}

export default InitialPage
