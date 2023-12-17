import React, { useState } from "react";

const NoteForm = ({ onNoteSubmit, selectedNote, setSelectedNote }) => {
  // Not girişini tutan state
  const [noteInput, setNoteInput] = useState("");

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    onNoteSubmit(selectedNote || noteInput);
    setSelectedNote(null); // selectedNote durumunu sıfırla
    setNoteInput(""); // noteInput durumunu sıfırla
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="note-form">
        {/* Not giriş alanı */}
        <input
          type="text"
          value={selectedNote || noteInput}
          onChange={
            (e) =>
              setSelectedNote
                ? setSelectedNote(e.target.value) // Seçili not varsa setSelectedNote fonksiyonunu kullan
                : setNoteInput(e.target.value) // Seçili not yoksa setNoteInput fonksiyonunu kullan
          }
          className="note-input-class"
        />
        {/* Gönder butonu */}
        <button type="submit" id="note-submit">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
