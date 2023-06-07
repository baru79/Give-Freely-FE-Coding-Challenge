import type { PlasmoCSConfig } from "plasmo"
import iconBell from "raw:~/assets/bell.png"

import { Storage } from "@plasmohq/storage"

import type { Website } from "~utils/types"

import "./google-highlight.scss"

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_SITE_URL/*"],
  run_at: "document_start"
}

const storage = new Storage()

document.addEventListener("DOMContentLoaded", async () => {
  const searchValue =
    document.querySelectorAll("textarea[value]")[0].textContent ?? ""
  if (searchValue !== "") {
    const storageWebsites = await storage.get("websites")
    if (storageWebsites !== undefined) {
      const websites = JSON.parse(storageWebsites).websites
      const exist = websites.find((ws: Website) =>
        ws.url.toLowerCase().includes(searchValue.toLowerCase())
      ) as Website
      if (exist !== null) {
        const googleResults = Array.from(
          document.querySelectorAll(`a[href*="${exist.url}/"]`)
        )
        googleResults.forEach((element) => {
          const isElementHighlighted = element.closest(
            'div[class="highlight-result"]'
          )
          if (isElementHighlighted === null) {
            let ele = null
            if (element.closest('div[class="g"][data-hveid]') !== null) {
              ele = element.closest('div[class="g"][data-hveid]')
            } else if (element.closest("div[data-hveid]") !== null) {
              ele = element.closest("div[data-hveid]")
            }
            if (ele !== null) {
              element.addEventListener("click", async () => {
                await chrome.runtime.sendMessage({
                  type: "linkClicked",
                  data: exist
                })
              })
              ele.className = "highlight-result"
              const iconEle = document.createElement("img")
              iconEle.src = iconBell
              iconEle.className = "icon-bell"
              iconEle.addEventListener("click", async () => {
                await chrome.runtime.sendMessage({
                  type: "iconClicked",
                  data: exist
                })
              })
              ele.appendChild(iconEle)
            }
          }
        })
      }
    }
  }
})
