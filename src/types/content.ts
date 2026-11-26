export type SocialId = 'youtube' | 'twitch' | 'instagram' | 'tiktok' | 'x' | 'discord'

export interface SocialLink {
  id: SocialId
  label: string
  handle: string
  url: string
}

export type ProjectCategory = 'company' | 'game' | 'shop' | 'publishing' | 'event' | 'media'

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  featured?: boolean
  inactive?: boolean
  since?: number
  year?: number
  url?: string
}

export interface Video {
  id: string
  title: string
  publishedAt: string
}
