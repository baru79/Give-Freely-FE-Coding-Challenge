import type { FC } from "react"

import type { Website } from "~utils/types"

interface Props {
  data: Website
  handleCloseButton: () => void
}

const messageRandom = (messages: string[]): string => {
  const arrMsg = messages
  return arrMsg[Math.floor(Math.random() * arrMsg.length)]
}

const Modal: FC<Props> = ({ data, handleCloseButton }) => {
  return (
    <div className="modal">
      <button className="modal-close-button" onClick={handleCloseButton}>
        X
      </button>
      <div className="modal-data">
        <h2 className="modal-title">{data.name}</h2>
        <div className="modal-message">{messageRandom(data.messages)}</div>
      </div>
    </div>
  )
}

export default Modal
