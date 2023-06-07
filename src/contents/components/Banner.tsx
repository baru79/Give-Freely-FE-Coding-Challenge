import type { FC } from "react"

import type { Website } from "~utils/types"

interface Props {
  data: Website
  handleCloseButton: () => void
}

const Banner: FC<Props> = ({ data, handleCloseButton }) => {
  return (
    <div className="banner">
      <button className="banner-close-button" onClick={handleCloseButton}>
        X
      </button>
      <div className="banner-data">
        <div className="banner-message">{data?.messages[0]}</div>
      </div>
    </div>
  )
}

export default Banner
