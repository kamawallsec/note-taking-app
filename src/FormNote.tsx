import React, { FormEvent, useRef } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useHref } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData } from './App'

type NoteFormProps = {

    onSubmit: (value: NoteData) => void

}

const FormNote = ({ onSubmit }: NoteFormProps) => {


    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);

    const FormSubmitHandle = function(e: FormEvent) {

        e.preventDefault();

        onSubmit({

            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: [],

        });
    }


  return (

    <Form onSubmit={FormSubmitHandle}>
        
        <Stack gap={4}>

            <Row>

                <Col>
                    <Form.Group controlId='title'>

                        <Form.Label>Note Title</Form.Label>
                        <Form.Control required ref={titleRef} />        

                    </Form.Group>
                </Col>

                <Col>
                
                    <Form.Group controlId='tags'>

                        <Form.Label>Note Tags</Form.Label>
                        <CreatableReactSelect isMulti />

                    </Form.Group>

                </Col>

            </Row>

            <Form.Group controlId='markdown'>

                <Form.Label>Note Body</Form.Label>
                <Form.Control required as = 'textarea' rows={15} ref={markdownRef} />

            </Form.Group>


            <Stack direction='horizontal' gap={4} className='justify-content-end'>
                <Button type='submit' variant='info'>Save</Button>

                <Link to='..'>
                    <Button type='button' variant='light'>Cancel</Button>
                </Link>

            </Stack>

        </Stack>

    </Form>

  )
}

export default FormNote