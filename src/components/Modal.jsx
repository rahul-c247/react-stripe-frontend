import '../styles/modal.css'

function Modal(props){
  return(
    <div className={`modal-wrapper ${props.open === true ? 'modal-open' : ''}`}>
      <span className='modal-close' onClick={props.close}>&times;</span>
      <div className="modal-box">
        {props.children}
      </div>
    </div>
  )
}
export default Modal