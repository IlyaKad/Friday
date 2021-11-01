import { Component } from 'react'

export class ProgressBar extends Component {

  getWidth = () => {
    const { length } = this.props
    const width = ((1 / length) * 100).toString()
    return width
  }


  render() {
    const { bgColor, length } = this.props
    return (
      <div style={{ width: `${this.getWidth()}%` }}>
        <div className="progress-bar-unit" style={{ backgroundColor: bgColor, }}>.</div>
      </div>
    )
  }
}
