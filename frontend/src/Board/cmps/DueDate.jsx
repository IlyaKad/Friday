import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import React, { Component } from 'react'

export class DueDate extends Component {
    state = {
        isShown: false,
        startDate: null,
        endDate: null,
        focusedInput: 'startDate'
    }


    handleChange = () => {
        const { startDate, endDate, focusedInput } = this.state
        if (startDate?._d && endDate?._d) this.props.changeDates({ startDate: startDate?._d, endDate: endDate?._d },this.props.type)
        if (startDate?._d && !endDate?._d && !focusedInput) {
            this.props.changeDates({ startDate: startDate?._d, endDate: null },this.props.type)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { startDate, endDate, focusedInput } = this.state
        if (startDate?._d && !endDate?._d && !focusedInput) {
            this.props.changeDates({ startDate: startDate?._d, endDate: null },this.props.type)
        }
    }

    render() {
        const { /* startDate, endDate, cardId, */ closeDatePicker } = this.props
        return (
            <div className="datePicker">
                <DayPickerRangeController
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    isOutsideRange={() => false}
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, this.handleChange)}
                    focusedInput={this.state.focusedInput}
                    hideKeyboardShortcutsPanel={true}
                    onFocusChange={focusedInput => {
                        this.setState({ focusedInput })
                    }}
                />
                <button className="date-btn" onClick={() => this.setState({ focusedInput: null }, closeDatePicker)}>Set</button>
            </div>


        )
    }
}




















// import { Component } from 'react'
// import 'react-date-range/dist/styles.css'
// import 'react-date-range/dist/theme/default.css'
// import { DateRange, DateRangePicker } from 'react-date-range';
// import { ClickAwayListener } from '@material-ui/core';
// import moment from 'moment';

// export class DueDate extends Component {

//     state = {
//         selectionRange: {
//             startDate: new Date(),
//             endDate: new Date(),
//             key: 'selection',
//         },
//         isShown: null,
//         timeRange: null

//     }
//     toggleDueDateShow = () => {
//         this.setState({ isShown: !this.state.isShown })
//     }

//     handleSelect = (date) => {
//         const { selection } = date
//         const timeRange = moment.duration((selection.endDate - selection.startDate)).days() + 1
//         this.setState({ timeRange })
//         // this.setState({ isShown: !this.state.isShown })
//     }

//     render() {
//         const { selectionRange, isShown, timeRange } = this.state
//         if (timeRange && !isShown) return (
//             <span className="date-range-container" onClick={this.toggleDueDateShow}>
//                 {timeRange} Days left</span>
//         )
//         else return (
//             <section >
//                 {!isShown ? <span className="date-range-container"
//                     onClick={this.toggleDueDateShow}>Choose</span> :
//                     <div className="date-range-picker">
//                         <ClickAwayListener onClickAway={this.toggleDueDateShow}>
//                             <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
//                         </ClickAwayListener>
//                     </div>}
//             </section >
//         )
//     }
// }
