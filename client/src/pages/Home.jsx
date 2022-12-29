import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const FETCH_POSTS = gql`
  query Posts {
    getPosts {
      id
      username
      body
      createdAt
    }
  }
`

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS)

  if (data) {
    console.log(data)
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
