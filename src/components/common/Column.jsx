import '../../styles/common.css'

function Column(props){
    return(
        <div className={`col-${props.col}`}>
            {props.children}
        </div>
    )
}

export default Column