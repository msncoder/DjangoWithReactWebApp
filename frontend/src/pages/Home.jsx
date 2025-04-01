import { useState, useEffect } from "react";
import api from "../api";
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
      })
      .catch((err) => alert(err));
    getNotes();
  };

  const createNotes = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Notes created");
        else alert("Failed to create Note");
      })
      .catch((err) => alert(err));
    getNotes();
  };

  return <div>Home</div>;
}

export default Home;
