import React from 'react'


export class BoardFilter extends React.Component {

  state = {
    filterBy: {
      name: '',
    }
  }

  // inputRef = React.createRef()

  // componentDidMount() {
  //   this.inputRef.current.focus()
  // }

  handleChange = (ev) => {
    const field = ev.target.name
    const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    this.setState(({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }), () => { this.props.onBoardFilter(this.state.filterBy) })
  }

  render() {
    return (
      <section className="board-filter-section flex column align-center" >
        <form className="flex column align-center">
          <div>
            <input className="inputTypeSearch"
              type="search"
              name="name"
              autoComplete="off"
              placeholder="Search by board"
              // autoFocus={false}
              // ref={this.inputRef}
              onChange={this.handleChange} />
          </div>
        </form>
      </section>
    )
  }
}

