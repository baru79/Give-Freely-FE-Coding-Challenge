import type { FC } from "react"

import type { Website } from "~utils/types"

import "./PopupList.scss"

interface Props {
  websites: Website[]
  handleClickName: (name: string) => void
}

const PopupList: FC<Props> = ({ websites, handleClickName }) => {
  return (
    <div className="popup-list">
      <h2 className="popup-list-title">Companies</h2>
      {websites.map((webSite: Website) => (
        <li
          key={webSite.name}
          className="popup-list-item"
          onClick={() => {
            handleClickName(webSite.name)
          }}>
          {webSite.name}
        </li>
      ))}
    </div>
  )
}

export default PopupList
