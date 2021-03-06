import React, {Component} from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


export default class Editor extends Component{

  state = {
    editNoteId: null,
    title: "",
    text: "",
    pinned:""
  }

  componentDidMount() {
    //Replace link in placeholder to example.com
    if(document.querySelector('.ql-tooltip-editor input'))
      document.querySelector('.ql-tooltip-editor input').setAttribute("data-link", "https://example.com");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editNoteId !== null) {
      this.setState({
        editNoteId: nextProps.editNoteId,
        title: nextProps.editableNote.title,
        text: nextProps.editableNote.text,
        pinned: nextProps.editableNote.pinned
      });
    }
  }
  
  handleChange = (text) => {
    this.setState({ text });
  }

  handleKeyPress = e => {
    if (e.target.name === "title") {
      this.handleFocousNext(e);
    }
  }

  handleFocousNext = (e) => {
    if (e.key === "Enter") {
      this.refs.editQuill.focus();
    }
  }
  
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  render() {
    const { editNoteId, title, text,pinned } = this.state;
    return (
      <Modal
        isOpen={this.props.show}
        toggle={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
            <ModalHeader toggle={this.props.onHide}>
            <input
              className="note-title"
              name="title"
              type="text"
              value={title}
              placeholder="Title"
              onChange={this.handleTitleChange}
              onKeyPress={this.handleKeyPress}
              autoFocus={true}
              autoComplete="off"
            />
            </ModalHeader>
            <ModalBody>
              <ReactQuill
                value={text}
                onChange={this.handleChange} 
                theme={"bubble"}
                className="note-text note-text-top"
                ref="editQuill"
              />
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-warning btn-custom" onClick={()=>{this.props.saveEdit(editNoteId,title,text, pinned)}}>Save</button>
              <button className="btn btn-warning btn-custom" onClick={this.props.onHide}>Cancel</button>
            </ModalFooter>
          </Modal>
    )
  }
}