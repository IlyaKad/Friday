import { Component } from 'react'

export class EditableElement extends Component {
  state = {
    isEdit: false,
    titleToEdit: this.props.title
  }

  handleChange = ({ target }) => {
    this.setState({ titleToEdit: target.value })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.title !== this.props.title) this.setState({ titleToEdit: this.props.title })
  // }


  onChangeTitle = (ev) => {
    ev.preventDefault()
    const { title, type } = this.props
    const { titleToEdit } = this.state
    if (title === titleToEdit) {
      this.setState({ isEdit: false })
      return
    }
    this.props.onChangeTitle(titleToEdit, type)
    this.setState({ isEdit: false })
  }


  render() {
    const { title, color } = this.props
    const { isEdit, titleToEdit } = this.state
    return (
      isEdit ?
        <form className="editable-form" onSubmit={this.onChangeTitle}>
          <input className="editable-input"
            autoFocus={true}
            autoComplete="off"
            style={{ color: `${color}` }}
            onChange={this.handleChange}
            value={titleToEdit} name="title"
            onBlur={this.onChangeTitle} />
        </form> :
        <div className="editable-txt-prev" onClick={() => this.setState({ isEdit: true, titleToEdit: this.props.title })}><span>{title}</span></div>
    )
  }
}
