import React from "react";
import { NoteData, Tag } from "./App";
import FormNote from "./FormNote";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit(id: string, dataN: NoteData): void;
  onAddTag(dataT: Tag): void;
  tagsAvailable: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, tagsAvailable }: EditNoteProps) => {
  const note = useNote();

  return (
    <>
      <h1 className="text-center">Edit Note</h1>

      <FormNote
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        tagsAvailable={tagsAvailable}
      />
    </>
  );
};

export default EditNote;
