export default function SeoScript() {
  const client = import.meta.env.VITE_ADSENSE_CLIENT
  if (!client) return null

  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  )
}
