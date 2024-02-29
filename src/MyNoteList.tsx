import React, { useMemo, useState } from "react";
import {
  Button,
  Col,
  Row,
  Stack,
  Form,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "./App";
import styles from "./MyNoteList.module.css";

type SimpNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type MyNoteListProps = {
  tagsAvailable: Tag[];
  notes: SimpNote[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  tagsAvailable: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

const MyNoteList = ({
  tagsAvailable,
  notes,
  onUpdateTag,
  onDeleteTag,
}: MyNoteListProps) => {
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectTags.length === 0 ||
          selectTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectTags, notes]);

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Your Notes</h1>
        </Col>

        <Col xs="auto">
          <Stack gap={4} direction="horizontal">
            <Link to="/new">
              <Button type="submit" variant="warning">
                Create
              </Button>
            </Link>

            <Button
              type="button"
              variant="light"
              onClick={() => setIsEditTagsModalOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                className="bg-dark text-light"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Note Tags</Form.Label>

              <ReactSelect
                value={selectTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }; // convert or set tags to label and id
                    })
                  );
                }}
                options={tagsAvailable.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {filterNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>

      <EditTagsModal
        tagsAvailable={tagsAvailable}
        show={isEditTagsModalOpen}
        handleClose={() => setIsEditTagsModalOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
};

export default MyNoteList;

const NoteCard = function ({ id, title, tags }: SimpNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={` h-100 text-reset text-decoration-none ${styles.cardStyle} `}
    >
      <Card.Body className="bg-dark text-light">
        <Stack
          gap={4}
          className="h-100 align-items-center justify-content-center"
        >
          <span className="fs-4">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={2}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

const EditTagsModal = function ({
  tagsAvailable,
  show,
  handleClose,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tagsAvailable.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>

                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
