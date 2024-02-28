import React from "react";
import { useNote } from "./NoteLayout";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Note = () => {
  const note = useNote();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <Stack
              gap={4}
              className="h-100 align-items-center justify-content-center"
            >
              {note.tags.length > 0 && (
                <Stack gap={2} direction="horizontal" className="flex-wrap">
                  {note.tags.map((tag) => (
                    <Badge key={tag.id} className="text-truncate">
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              )}
            </Stack>
          )}
        </Col>

        <Col xs="auto">
          <Stack gap={4} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button type="submit" variant="warning">
                Edit
              </Button>
            </Link>

            <Button type="button" variant="outline-danger">
              Delete
            </Button>

            <Link to="/">
              <Button type="button" variant="outline-secondary">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default Note;
