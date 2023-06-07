export interface Root {
  record: Record
  metadata: Metadata
}

export interface Record {
  websites: Website[]
}

export interface Website {
  name: string
  url: string
  messages: string[]
}

export interface Metadata {
  id: string
  private: boolean
  createdAt: string
  name: string
}
