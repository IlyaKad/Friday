import { ClickAwayListener } from '@material-ui/core'
import { Component } from 'react'

export class LabelMenu extends Component {

    state = {
        isOpen: false
    }
    setCurrLabel = (label) => {
        const { currLabel, onChangeLabel, type } = this.props
        if (label.txt === currLabel.txt) {
            this.toggleMenu()
            return
        }
        onChangeLabel(label, type)
        this.toggleMenu()
    }

    toggleMenu = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }


    render() {
        const { labels, currLabel } = this.props
        const { isOpen } = this.state

        return (
            <div className="labels-menu-container">
            
                <div className="selected-label"
                    onClick={this.toggleMenu}
                    style={{ backgroundColor: currLabel.color }}>
                    {currLabel.txt}
                </div>
                {isOpen &&
                    <ClickAwayListener onClickAway={this.toggleMenu}>
                        <div className="labels-menu">
                            {labels.map(label => {
                                return <div className="label-item"
                                    key={label.id}
                                    style={{ backgroundColor: label.color }}
                                    onClick={() => this.setCurrLabel(label)}
                                >
                                    {label.txt}
                                </div>
                            })}

                        </div>
                    </ClickAwayListener>}
            </div>
        )
    }
}


