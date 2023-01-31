import React from 'react'
import { NoteData } from './App'
import FormNote from './FormNote'

type NewNoteProps = {

  onSubmit(data: NoteData): void

}

const NewNote = ({ onSubmit }: NewNoteProps) => {

    return (

      <>

        <h1 className='text-center'>New Note</h1>
        
            <FormNote onSubmit = {onSubmit} />
            
      </>

  )
}

export default NewNote