function Input(props) {
  return(
    <>
      <div className="form-input">
        <label>{props.label}</label>
        <input
          type={props.type}
          placeholder={props.placeholder} 
          className={props.className}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          min={props.min}
          id={props.id}
          checked={props.checked}/>
          {props.children}
          {props.error ? <p className="error">{props.error}</p> : null}
      </div>
    </>
  )
}

export default Input