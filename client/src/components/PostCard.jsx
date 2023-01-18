import React, { useContext } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { AuthContext } from "../context/auth"
import LikeButton from "./LikeButton"

function PostCard({
  post: { id, username, body, createdAt, likeCount, likes, commentCount },
}) {
  const { user } = useContext(AuthContext)

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
        <LikeButton user={user} post={{ id, likes, likeCount }} />

        <div>
          <button>
            <Link to={`/posts/${id}`}>💬</Link>
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
