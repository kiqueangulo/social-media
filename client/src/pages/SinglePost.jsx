import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

function SinglePost(props) {
  const postId = props.match.params.postId
  console.log(postId)
  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, { variables: { postId } })

  let postMarkup

  if (!getPost) {
    postMarkup = <p>Loading...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, commentCount, likeCount } =
      getPost

    postMarkup = ""
  }

  return (
    <div>
      <div>SinglePost</div>
    </div>
  )
}

export default SinglePost
