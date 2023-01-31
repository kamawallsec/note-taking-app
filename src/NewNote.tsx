import React from 'react'
import { NoteData, Tag } from './App'
import FormNote from './FormNote'

type NewNoteProps = {

  onSubmit(dataN: NoteData): void,
  onAddTag(dataT: Tag): void,
  tagsAvailable: Tag[],

}

const NewNote = ({ onSubmit, onAddTag, tagsAvailable }: NewNoteProps) => {

    return (

      <>

        <h1 className='text-center'>New Note</h1>
        
            <FormNote onSubmit = {onSubmit} onAddTag = {onAddTag} tagsAvailable = {tagsAvailable} />
            
      </>

  )
}

export default NewNote