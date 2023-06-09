import '../../styles/common.css'

function Container(props){
    return(
        <div className="container">
            {props.children}
        </div>
    )
}

export default Container