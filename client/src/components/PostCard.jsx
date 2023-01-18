import React, { useContext } from "react"
import moment from "moment"

import { AuthContext } from "../context/auth"

function PostCard({ post: { id, username, body, createdAt, likeCount, commentCount } }) {
  const { user } = useContext(AuthContext)

  const likePost = () => console.log("Post liked!")

  return (
    <>
      <img
        src="https://thumbs.dreamstime.com/b/l%C3%ADnea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg"
        alt="Generic avatar icon"
        width="100px"
      />

      <h3>{username}</h3>
      <p>{moment(createdAt).fromNow(true)}</p>

      <p>{body}</p>

      <div>
        <div>
          <button onClick={likePost}>🤍</button>
          <span>{likeCount}</span>
        </div>
        <div>
          <button>
            <a href={`/posts/${id}`}>💬</a>
          </button>
          <span>{commentCount}</span>
        </div>

        {user && user.username === username && (
          <div>
            <button onClick={() => console.log("Delete Post")}>🚮</button>
          </div>
        )}
      </div>
    </>
  )
}

export default PostCard
