import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import PostCard from "../components/PostCard"

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
  const { loading, data } = useQuery(FETCH_POSTS)

  return (
    <div>
      <h1>Recent Posts</h1>

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
