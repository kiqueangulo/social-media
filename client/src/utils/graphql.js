import gql from "graphql-tag"

export const FETCH_POSTS = gql`
  query Posts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`
