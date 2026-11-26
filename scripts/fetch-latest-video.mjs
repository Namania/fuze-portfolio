import { writeFile } from 'node:fs/promises'

const CHANNEL_ID = 'UCfznY5SlSoZoXN0-kBPtCdg'
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const OUTPUT_URL = new URL('../src/data/latest-video.json', import.meta.url)

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }

const decode = (text) => text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])

const readTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))
  if (!match) throw new Error(`Missing <${tag}> in feed entry`)
  return decode(match[1])
}

const response = await fetch(FEED_URL)
if (!response.ok) throw new Error(`Feed request failed with status ${response.status}`)

const feed = await response.text()
const entry = feed.match(/<entry>[\s\S]*?<\/entry>/)?.[0]
if (!entry) throw new Error('No entry found in feed')

const video = {
  id: readTag(entry, 'yt:videoId'),
  title: readTag(entry, 'title'),
  publishedAt: readTag(entry, 'published'),
}

await writeFile(OUTPUT_URL, `${JSON.stringify(video, null, 2)}\n`)
console.log(`Latest video: ${video.title}`)
