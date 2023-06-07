import cssTextBanner from "data-text:~/contents/components/Banner.scss"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { Website } from "~utils/types"

import Banner from "./components/Banner"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssTextBanner
  return style
}

interface IMessage {
  linkClicked: boolean
  data: Website
}

const MainBanner = () => {
  const [data] = useStorage<string>("data")
  const [banner] = useStorage<string>("show-banner")
  const [message, setMessage] = useState<IMessage>()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (banner !== "" && banner !== undefined) {
      setShowBanner(JSON.parse(banner))
      if (data !== "" && data !== undefined) {
        setMessage(JSON.parse(data))
      }
    }
  }, [data, banner])

  const handleCloseBanner = () => {
    if (message != null) {
      setMessage({ ...message, linkClicked: !message.linkClicked })
    }
  }

  return (
    showBanner &&
    message?.data != null &&
    (message.linkClicked ?? false) && (
      <Banner data={message?.data} handleCloseButton={handleCloseBanner} />
    )
  )
}

export default MainBanner
