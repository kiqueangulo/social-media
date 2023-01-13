import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import { FETCH_POSTS } from "../utils/graphql"

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS)

  return (
    <div>
      <h1>Recent Posts</h1>

      {user && (
        <div>
          <PostForm />
        </div>
      )}

      {loading ? (
        <h1>Loading posts...</h1>
      ) : (
        data.getPosts &&
        data.getPosts.map(post => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))
      )}
    </div>
  )
}

export default Home
