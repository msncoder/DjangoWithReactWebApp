import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNotes = (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Notes Deleted");
        else alert("Failed to delete Note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNotes = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Notes created");
        else alert("Failed to create Note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div>
        <h2>Notes</h2>

        {notes.map((note) => (
          <Note note={note} onDelete={deleteNotes} />
        ))}
      </div>
      <h2>Create Notes</h2>
      <form onSubmit={createNotes}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <br />

        <input type="submit" value="submit" />
      </form>
      ;
    </>
  );
}

export default Home;
