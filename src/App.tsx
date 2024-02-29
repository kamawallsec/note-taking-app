import { useMemo, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import MyNoteList from "./MyNoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

export type Note = {
  id: string;
} & NoteData; // id to the NoteData

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type NoteRaw = {
  id: string;
} & NoteRawData;

export type NoteRawData = {
  title: string;
  markdown: string;
  tagId: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<NoteRaw[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTag = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((t) => note.tagId.includes(t.id)) };
    });
  }, [notes, tags]);

  const CreateNote = function ({ tags, ...data }: NoteData) {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,
        { ...data, id: uuidV4(), tagId: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = function (id: string, { tags, ...data }: NoteData) {
    setNotes((previousNotes) => {
      return previousNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagId: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = function (id: string) {
    setNotes((previousNotes) => {
      return previousNotes.filter((note) => note.id !== id);
    });
  };

  const AddTag = function (tag: Tag) {
    setTags((previousTags) => [...previousTags, tag]);
  };

  const updateTag = function (id: string, label: string) {
    setTags((previousTags) => {
      return previousTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = function (id: string) {
    setTags((previousTags) => {
      return previousTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <MyNoteList
              notes={noteWithTag}
              tagsAvailable={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={CreateNote}
              onAddTag={AddTag}
              tagsAvailable={tags}
            />
          }
        />

        <Route path="/:id" element={<NoteLayout notes={noteWithTag} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={AddTag}
                tagsAvailable={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
