import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Button from '@material-ui/core/Button'


export class TextEditor extends Component {

  state = {
    editorState: undefined
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  }

  mentions = () => {
    const { users } = this.props
    const suggestions = users.map(user => {
      return { text: user.fullname, value: user.fullname, url: 'http://facebook.com' }
    })
    return suggestions
  }

  onUpdate = (ev) => {
    this.props.sendMsg(ev)
    this.setState({ editorState: undefined });
  }

  render() {
    const { msgHandleChange, sendMsg, users } = this.props
    const { editorState } = this.state
    return (
      <div>
        <Editor wrapperClassName="text-editor-wrapper"
          editorClassName="editor-txt-area"
          toolbarClassName="txt-editor-toolbar"
          editorState={editorState}
          onChange={msgHandleChange}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: this.mentions(),
          }}
          placeholder='Send your update...'
          onEditorStateChange={this.onEditorStateChange}
        />
        <Button className="chat-update-btn"
          variant="contained"
          color="primary" size="small"
          onClick={this.onUpdate}>Update</Button>
      </div>
    )
  }
}