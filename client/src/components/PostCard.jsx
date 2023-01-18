import moment from "moment"

function PostCard({ post: { id, username, body, createdAt, likeCount, commentCount } }) {
  const likePost = () => console.log("Post liked!")

  const commentOnPost = () => console.log("Comment on post!")

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
          <button onClick={commentOnPost}>
            <a href={`/posts/${id}`}>💬</a>
          </button>
          <span>{commentCount}</span>
        </div>
      </div>
    </>
  )
}

export default PostCard
