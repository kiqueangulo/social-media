import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) setLiked(true)
    else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  const likeButton = user ? (
    liked ? (
      <button>💕</button>
    ) : (
      <button>🤍</button>
    )
  ) : (
    <Link to="/login">🤍</Link>
  )

  return (
    <div>
      <button onClick={likePost}>{likeButton}</button>
      <span>{likeCount}</span>
    </div>
  )
}

export default LikeButton
