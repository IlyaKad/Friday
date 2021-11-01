import { Button } from '@material-ui/core'
import React from 'react'

export function ConfirmModal({ onActionToConfirm, itemId }) {



  return (
    <section className="modal-container">
      <div className="modal-box">
        <div className="modal-msg-container" >
          <p className="modal-question" >Delete this item?</p>
          <p className="modal-note">If you confirm, it will be permanently deleted.</p>
        </div>
        <div className="modal-btns-container">
          <Button className="modal-decline-btn"
            onClick={() => onActionToConfirm(itemId, 'decline')} >Cancle</Button>
          <Button className="modal-confirm-btn" variant="contained"
            onClick={() => onActionToConfirm(itemId, 'confirm')}>Delete</Button>
        </div>
      </div>
    </section>
  )
}
