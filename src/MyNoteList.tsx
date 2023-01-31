import React, { useState } from 'react'
import { Button, Col, Row, Stack, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select/creatable'
import { Tag } from './App'


type MyNoteListProps = {

    tagsAvailable: Tag[],

}


const MyNoteList = ({ tagsAvailable }:MyNoteListProps ) => {


    const [selectTags, setSelectTags] = useState<Tag[]>([]);


  return (

    <>
    
        <Row>

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
                        <Form.Control type='text' className='bg-dark text-light' />
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

    </>

  )
}

export default MyNoteList

