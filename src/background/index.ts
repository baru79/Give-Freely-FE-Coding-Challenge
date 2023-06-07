import { Storage } from "@plasmohq/storage"

import { getWebsites } from "../utils/service"

const storage = new Storage()

chrome.runtime.onInstalled.addListener(async () => {
  const storageData = await storage.get("data")
  if (storageData !== undefined) {
    const objStorage = JSON.parse(storageData)
    if (objStorage !== null) {
      await storage.clear()
    }
  }
  const data = await getWebsites()
  const websites = data.record
  await storage.set("websites", JSON.stringify(websites))
})

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "iconClicked" || message.type === "linkClicked") {
    const data = {
      [message.type]: true,
      data: message.data
    }
    await storage.remove("data")
    await storage.set("data", JSON.stringify(data))
  }
})

const setSorageBanner = async (tabUrl = "") => {
  const storageData = await storage.get("data")
  if (storageData !== undefined) {
    const urlClicked = JSON.parse(storageData).data.url as string
    if (tabUrl.startsWith(`https://${urlClicked}`)) {
      await storage.set("show-banner", "true")
    } else {
      await storage.set("show-banner", "false")
    }
  }
}

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tabUrl = tabs[0].url
    await setSorageBanner(tabUrl)
  })
})

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const tabUrl = tab.url
    await setSorageBanner(tabUrl)
  }
})
