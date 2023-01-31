import { useMemo, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewNote from './NewNote';
import useLocalStorage from './useLocalStorage';
import {v4 as uuidV4} from 'uuid';  
import MyNoteList from './MyNoteList';


  export type Note = {

    id: string,

  } & NoteData     // id to the NoteData

  export type NoteData = {

    title: string,
    markdown: string,
    tags: Tag[],

  }

  export type Tag = {

    id: string,
    label: string,

  }


  export type NoteRaw = {

    id: string,

  } & NoteRawData

  export type NoteRawData = {

    title: string,
    markdown: string,
    tagId: string[],

  }



function App() {

  const [notes, setNotes] = useLocalStorage<NoteRaw[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);


  const [noteWithTag, setNoteWithTag] = useMemo( () => {

    return notes.map(note => {

      return {...note, tags: tags.filter( t => note.tagId.includes(t.id))};

    })

  }, [notes, tags]);  


  const CreateNote = function( { tags, ...data }: NoteData) {

    setNotes( previousNotes => {

      return [...previousNotes, {...data, id: uuidV4(), tagId: tags.map(tag => tag.id) } ]

    } )

  }

  const AddTag = function(tag: Tag) {

    setTags( previousTags => [...previousTags, tag]);

  }


  return (
  
      <Container className='my-4'>

        <Routes>
          
            <Route path='/' element={ <MyNoteList tagsAvailable ={ tags } />   } />
            <Route path='/new' element={ <NewNote onSubmit = {CreateNote} onAddTag = {AddTag} tagsAvailable = {tags} />} />
            
            <Route path='/:id'>

                <Route index element={<h1>Show</h1>} />
                <Route path='edit' element={<h1>Edit</h1>} />

            </Route>

            <Route path='*' element={ <Navigate to='/' /> } />

        </Routes>

      </Container>

  )
}

export default App
