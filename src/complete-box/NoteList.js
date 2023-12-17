import React from "react";

const NoteList = ({ notes, onNoteClick }) => {
  return (
    <ul id="notes" className="notes-class">
      {notes.reverse().map((note, index) => (
        <li key={index} onClick={() => onNoteClick(note)}>
          {note}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
