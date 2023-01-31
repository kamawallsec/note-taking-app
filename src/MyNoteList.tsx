import React, { useMemo, useState } from 'react'
import { Button, Col, Row, Stack, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select/creatable'
import { Tag } from './App'
import styles from './MyNoteList.module.css'


type SimpNote = {

    id: string,
    title: string,
    tags: Tag[],

}

type MyNoteListProps = {

    tagsAvailable: Tag[],
    notes: SimpNote[],
}



const MyNoteList = ({ tagsAvailable, notes }:MyNoteListProps ) => {


    const [selectTags, setSelectTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState('');
    
    const filterNotes = useMemo( ()=> {
        
        return notes.filter( note=> {
            return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) && (selectTags.length === 0 || selectTags.every(tag => note.tags.some( noteTag => noteTag.id === tag.id ) ) )
        } )

    },  [title, selectTags, notes])

  return (

    <>
    
        <Row className='mb-4 align-items-center'>

            <Col>
                <h1>Your Notes</h1>             
            </Col>

            <Col xs='auto'>
                <Stack gap={4} direction='horizontal'>
                    <Link to='/new'>
                        <Button type='submit' variant='warning'>Create</Button>
                    </Link>
                    
                    <Button type='button' variant='light'>Edit Tags</Button>
                </Stack>
            </Col>

        </Row>


        <Form>

            <Row className='mb-4'>

                <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' className='bg-dark text-light' value={title} 
                        onChange={ e=> setTitle(e.target.value) }
                        />
                    </Form.Group>
                </Col>

                <Col>
                
                    <Form.Group controlId='tags' >

                        <Form.Label>Note Tags</Form.Label>

                        <ReactSelect 
                        
                            value={selectTags.map((tag) => {
                                return {label: tag.label, value: tag.id}
                        })}  onChange={tags => {
                            setSelectTags(tags.map((tag) => {
                                return {label: tag.label, id: tag.value}     // convert or set tags to label and id
                            }))
                        }}
                        options = { tagsAvailable.map((tag) =>  {
                            return {label: tag.label, value: tag.id}
                        })}
                        isMulti />

                        </Form.Group>

                </Col>

            </Row>

        </Form>


        <Row xs={1} sm={2} lg={3} xl={4} gap={4}>

            {filterNotes.map(note => {
                return <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                </Col>
            })}

        </Row>


    </>

  )
}

export default MyNoteList


const NoteCard = function({ id, title, tags }: SimpNote) {

    return <Card as = {Link} to={`/${id}`} className={` h-100 text-reset text-decoration-none ${styles.cardStyle} `}>

        <Card.Body></Card.Body>

    </Card>

}