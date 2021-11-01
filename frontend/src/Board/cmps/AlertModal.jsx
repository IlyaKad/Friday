import React from 'react'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'


export function AlertModal({ closeAlert }) {
  return (
    <div className="alert-contaier  flex align-center">
      <Alert className="success-alert flex align-center" severity="success">
        Item was successfully deleted!
      </Alert>
      {/* <CloseIcon className="close-icon"  */}
      <CloseIcon className="close-icon" onClick={closeAlert}
        style={{
          backgroundColor: "#0f9147",
          width: "40px",
          height: "40px",
          color: "#fefffe",
          marginLeft: "-5px",
          marginRight: "5px",
          padding: "10px",
          borderRadius: "3px"

        }} />
    </div>
  )
}
