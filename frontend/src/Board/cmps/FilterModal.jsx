import { Component } from 'react'
import { UserPreview } from './UserPreview'

export class FilterModal extends Component {
  render() {

    const { board } = this.props
    return (
      <section>
        <div className="sort-status-menu">

        </div>

        <div className="sort-members-menu" >

          {/* <UserPreview /> */}

        </div>
        <div className="sort-priority-menu" >

        </div>

      </section>
    )
  }
}
