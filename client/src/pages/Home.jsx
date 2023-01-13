import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import { AuthContext } from "../context/auth"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"

const FETCH_POSTS = gql`
  query Posts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      commentCount
    }
  }
`

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
