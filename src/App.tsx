import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewNote from './NewNote';


  export type NoteData = {

    title: string,
    markdown: string,
    tags: Tag[],

  }

  export type Tag = {

    id: string,
    label: string,

  }

  export type Note = {

    id: string,

  } & NoteData     // id to the NoteData



function App() {

  const [notes, setNotes] = useLocalStorage<NoteRaw[]>('notes', []);

  return (
  
      <Container className='my-4'>

        <Routes>
          
            <Route path='/' element={ <h1>Home</h1> } />
            <Route path='/new' element={ <NewNote />} />
            
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
