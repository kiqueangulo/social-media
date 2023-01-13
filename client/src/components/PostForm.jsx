import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../utils/hooks"
import { FETCH_POSTS } from "../utils/graphql"

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

function PostForm() {
  const { values, changeValue, handleSubmit } = useForm(createPostCallback, {
    body: "",
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      })

      // TODO: Find the way around data.getPosts because apparently is a read only property
      data.getPosts = [result.data.createPost, ...data.getPosts]

      proxy.writeQuery({ query: FETCH_POSTS, data })

      values.body = ""
    },
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a post:</h2>

      <div>
        <input
          type="text"
          name="body"
          placeholder="Hello World!"
          onChange={changeValue}
          value={values.body}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default PostForm
