import cssTextModal from "data-text:~/contents/components/Modal.scss"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { Website } from "~utils/types"

import Modal from "./components/Modal"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_SITE_URL/*"],
  run_at: "document_start"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTextModal
  return style
}

interface IMessage {
  iconClicked: boolean
  data: Website
}

const MainModal = () => {
  const [data] = useStorage<string>("data")
  const [message, setMessage] = useState<IMessage>()

  useEffect(() => {
    if (data !== "" && data !== undefined) {
      const storageData = JSON.parse(data)
      setMessage(storageData)
    }
  }, [data])

  const handleCloseModal = () => {
    if (message != null) {
      setMessage({ ...message, iconClicked: !(message.iconClicked ?? false) })
    }
  }

  return (
    message?.data != null &&
    (message.iconClicked ?? false) && (
      <Modal data={message.data} handleCloseButton={handleCloseModal} />
    )
  )
}

export default MainModal
