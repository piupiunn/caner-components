import React, { useState } from "react";

const Comment = ({ author, content, replies }) => {
  const [replyText, setReplyText] = useState("");
  const [nestedReplies, setNestedReplies] = useState(replies);
  const [isRepliesVisible, setIsRepliesVisible] = useState(true);
  const [isReplyInputVisible, setIsReplyInputVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Yorum yazma input alanındaki metin değişikliklerini takip eden işlev
  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  // Yeni bir yanıt ekleyen işlev
  const addReply = () => {
    //Yeni yorumun özelliklerini ekliyoruz
    const newReply = { author: "You", content: replyText, replies: [] };

    //Yeni yorumu önceki tüm nestedReplies'lerin olduğu diziye ekliyoruz
    setNestedReplies([...nestedReplies, newReply]);

    //Daha iyi bir kullanıcı deneyimi için yeni yorum kayıt edildikten sonra yorum yazılan inputun içine boş hale getiriyoruz
    setReplyText("");

    //Yeni yorum eklendikten sonra yorum yazılan inputu saklamak için değeri false yapıyoruz
    setIsReplyInputVisible(false);
  };

  // Yanıtları görüntüleyip gizleyen işlev
  const toggleReplies = () => {
    setIsRepliesVisible(!isRepliesVisible);
  };

  // Yorum yazma input alanını açıp kapatan işlev
  const toggleReplyInput = () => {
    setIsReplyInputVisible(!isReplyInputVisible);
  };

  // Yorum yazma input alanını kapatma işlevi
  const closeReplyInput = () => {
    setIsReplyInputVisible(false);
  };

  //Yorum like ve dislike işlevi
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const totalVotes = likes - dislikes;

  return (
    <div className="comment">
      {/* Yanıtları göster/gizle çizgisi. Burdaki tıklamardan sonra nested-replies classına visible veya hidden classlarından biri eklenecek. */}
      {nestedReplies.length > 0 && (
        <div className="nested-replies-line" onClick={toggleReplies}></div>
      )}

      {/* Yorum içeriği */}
      <div className="comment-content">
        <strong>{author}:</strong> {content}
      </div>

      {/* Yanıtlar */}
      {nestedReplies.length > 0 && (
        <div
          className={`nested-replies ${
            isRepliesVisible ? "visible" : "hidden"
          }`}
        >
          {nestedReplies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
      {/* Like ve dislike alanı */}
      <div className="comment-actions">
        <button className="like-button" onClick={handleLike}>
          Like
        </button>
        <button className="dislike-button" onClick={handleDislike}>
          Dislike
        </button>
        <span>Total Votes: {totalVotes}</span>
      </div>

      {/* Yorum yazma input alanı */}
      {isReplyInputVisible && (
        <div className="reply-input">
          <input type="text" value={replyText} onChange={handleReplyChange} />
          <button className="reply-button" onClick={addReply}>
            Reply
          </button>
          <button className="cancel-button" onClick={closeReplyInput}>
            Cancel
          </button>
        </div>
      )}

      {/* Yanıt ekle düğmesi */}
      {!isReplyInputVisible && (
        <button className="show-reply-input" onClick={toggleReplyInput}>
          Add a reply
        </button>
      )}
    </div>
  );
};

export default Comment;
