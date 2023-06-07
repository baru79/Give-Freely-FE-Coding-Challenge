import type { FC } from "react"

import "./PopupMessages.scss"

interface Props {
  messages: string[]
  handleBack: () => void
}

const PopupMessages: FC<Props> = ({ messages, handleBack }) => {
  return (
    <>
      <div className="popup-message">
        <h2 className="popup-message-title">Messages</h2>
        {messages.map((message, index) => (
          <li key={index} className="popup-message-item">
            {message}
          </li>
        ))}
      </div>
      <button className="popup-message-button-back" onClick={handleBack}>
        Go back
      </button>
    </>
  )
}

export default PopupMessages
