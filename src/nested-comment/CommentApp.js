import React, { useState } from "react";
import Comment from "./Comment";

const CommentApp = () => {
  // Yorumları tutan state
  const [comments, setComments] = useState([
    {
      author: "User1",
      content: "First comment",
      replies: [
        {
          author: "User2",
          content: "Reply to first comment",
          replies: [],
        },
        {
          author: "User3",
          content: "Another reply to first comment",
          replies: [
            {
              author: "User1",
              content: "Reply to reply",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      author: "User4",
      content: "Second comment",
      replies: [],
    },
    {
      author: "User5",
      content: "Third comment",
      replies: [],
    },
  ]);

  // Yeni yorum içeriğini tutan state
  const [newCommentContent, setNewCommentContent] = useState("");

  // Yorum içeriği değiştiğinde çalışacak fonksiyon
  const handleContentChange = (event) => {
    setNewCommentContent(event.target.value);
  };

  // Yeni yorum ekleme fonksiyonu
  const addComment = () => {
    const newComment = {
      author: "Caner",
      content: newCommentContent,
      replies: [],
    };
    setComments([...comments, newComment]);
    setNewCommentContent("");
  };

  return (
    <div className="app">
      <h1>Başlık</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Necessitatibus, expedita! Inventore eaque mollitia repellendus impedit
        officiis voluptatibus cupiditate sit incidunt. Optio, nihil eaque
        corrupti illo beatae perspiciatis distinctio voluptatum aspernatur!
      </p>

      {/* Yorumları listeleyen Comment bileşeni */}
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}

      {/* Yeni yorum ekleme alanı */}
      <div className="new-comment">
        <input
          type="text"
          placeholder="Yorumunuz"
          value={newCommentContent}
          onChange={handleContentChange}
        />
        <button onClick={addComment}>Yorum Ekle</button>
      </div>
    </div>
  );
};

export default CommentApp;
