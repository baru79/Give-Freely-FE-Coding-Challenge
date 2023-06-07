import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import PopupList from "~components/PopupList"
import PopupMessages from "~components/PopupMessages"
import type { Website } from "~utils/types"

import "./index.scss"

function IndexPopup() {
  const [messages, setMessages] = useState<string[]>([])
  const [data, setData] = useState<Website[]>([])
  const [websites] = useStorage<string>("websites")

  useEffect(() => {
    if (websites !== undefined) {
      setData(JSON.parse(websites).websites)
    }
  }, [websites])

  const handleClickName = (name: string) => {
    const msg = data.filter((ws) => ws.name === name)
    const arrMessages = msg.map((item) => item.messages).flat()
    setMessages(arrMessages)
  }

  const handleBack = () => {
    setMessages([])
  }

  return (
    <div className="popup">
      {messages.length > 0 ? (
        <PopupMessages messages={messages} handleBack={handleBack} />
      ) : (
        <PopupList websites={data} handleClickName={handleClickName} />
      )}
    </div>
  )
}

export default IndexPopup
