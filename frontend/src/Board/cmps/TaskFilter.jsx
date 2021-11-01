import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


export class TaskFilter extends React.Component {

  state = {
    filterBy: {
      groupTitle: '',
    }
  }

  inputRef = React.createRef()

  componentDidMount() {
    this.inputRef.current.focus()
  }

  handleChange = (ev) => {
    const field = ev.target.name
    const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    this.setState(({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }), () => {})
  }

  render() {
    return (
      <section className="task-filter-section flex column align-center" >
        <form className="flex align-center">
          <div className="search-btn-container flex align-center">
            <SearchIcon className="search-icon-boardheader" />
            <InputBase type="search" name="name"
              placeholder="Search" autoComplete="off" ref={this.inputRef}
              onChange={(ev) => { this.handleChange(ev) }} />
          </div>
        </form>
      </section>
    )
  }
}
