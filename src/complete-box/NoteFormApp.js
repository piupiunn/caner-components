import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const NoteFormApp = () => {
  // Notları tutan state
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");

  // Sayfa yüklendiğinde localStorage'dan notları alma
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    setNotes(savedNotes ? savedNotes.slice(0, 15) : []);
  }, []);

  // Yeni not gönderme işlemini gerçekleştiren fonksiyon
  const handleNoteSubmit = (note) => {
    // Notun indeksini bul
    const noteIndex = notes.findIndex((n) => n === note);

    // Notun zaten kayıtlı olduğunu kontrol et
    // Yukarıdaki findIndex fonksiyonu, bir dizi içinde belirli bir koşulu sağlayan ilk öğenin indeksini döndürür.
    // Eğer belirli bir koşulu sağlayan öğe bulunmazsa, findIndex fonksiyonu -1 değerini döndürür.
    // Eğer noteIndex -1 değilse (yani belirli bir koşulu sağlayan öğe bulunmuşsa), bu ifade true olarak değerlendirilir.
    // Bu durum, notun zaten kayıtlı olduğu anlamına gelir ve ilgili kod bloğu çalıştırılır.
    if (noteIndex !== -1) {
      // Notu listenin başına taşı
      const updatedNotes = [
        note, // Yeni eklenen notu updatedNotes dizisinin başına ekler. --- Örnek : 15 adetlik bir listede NoteIndex 5 olsun. 5. öge listenin başına eklenir. ---
        ...notes.slice(0, noteIndex), // Notun bulunduğu indeksten önceki notları "note"'nin ardına ekler. --- örneğe göre daha sonra (0, 1, 2, 3, 4)'inci indexler yukarıda eklenen 5. ögenin hemen ardına eklenir. ---
        ...notes.slice(noteIndex + 1), // Son olarak notun bulunduğu indeksten sonraki notlar listenin sonuna eklenir. --- örneğe göre son olarak (6, 7, 8, 9, 10, 11, 12, 13, 14)'inci indexler de listenin sonuna eklenir. ---
        // --- örneğe göre sonuç olarak elde edilen yeni sıralama (5, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14)
      ];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } else {
      // Eğer daha önce listede olmayan bir notsa, notu listenin başına ekle
      const updatedNotes = [note, ...notes.slice(0, 14)]; // En fazla 15 not tutulacak
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  // Nota tıklanma işlemini gerçekleştiren fonksiyon
  const handleNoteClick = (note) => {
    console.log("Tıklanan not:", note);
    setSelectedNote(note);
  };

  // Not giriş alanının dışına tıklama işlemini gerçekleştiren fonksiyon
  const handleOutsideClick = (event) => {
    const notesComponent = document.querySelector(".notes-class");

    if (
      !event.target.matches(".note-input-class") &&
      notesComponent.classList.contains("show")
    ) {
      notesComponent.classList.remove("show");
      console.log("Dışarı tıklandı");
    }
  };

  // Not giriş alanının içine tıklama işlemini gerçekleştiren fonksiyon
  const handleInsideClick = (event) => {
    const notesComponent = document.querySelector(".notes-class");

    if (event.target.matches(".note-input-class")) {
      notesComponent.classList.add("show");
      console.log("İçeri tıklandı");
    }
  };

  // Not giriş alanının dışına tıklama olayının dinleyicisini ekleme
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Not giriş alanının içine tıklama olayının dinleyicisini ekleme
  useEffect(() => {
    window.addEventListener("click", handleInsideClick);
    return () => {
      window.removeEventListener("click", handleInsideClick);
    };
  }, []);

  return (
    <div>
      <h1>Notlar Uygulaması</h1>
      {/* Not gönderme formu */}
      <NoteForm
        onNoteSubmit={handleNoteSubmit}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />

      {/* Not listesi */}
      <NoteList notes={notes} onNoteClick={handleNoteClick} />
    </div>
  );
};

export default NoteFormApp;
