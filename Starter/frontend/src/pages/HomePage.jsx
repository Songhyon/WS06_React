import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard.jsx'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/posts')
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`)
        }
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(`Could not load posts: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) return <p className="status-msg">Loading posts…</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="blog-page">
      <div className="page-heading">
        <p className="eyebrow">Blog</p>
        <h1 className="page-title">All posts</h1>
        <p className="page-copy">{posts.length} posts, newest first.</p>
      </div>

      {posts.length === 0 ? (
        <p className="status-msg">No posts yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage