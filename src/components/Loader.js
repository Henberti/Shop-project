import './styles/loader.css'

const Loader=({size})=>{
    let circleSize = {borderTop:'6px solid green', width:'150px',height:'150px'}
    switch (size) {
        case 'small':
            circleSize = {borderTop:'4px solid green', width:'40px',height:'40px'}
            break;
        case 'medium':
             circleSize = {borderTop:'4px solid green', width:'100px',height:'100px'}
             break;
        case 'x-small':
            circleSize = {borderTop:'3px solid green', width:'30px',height:'30px'}
            }

    
    
    return(
        <div className="loader">
            <div className="loader--circle" style={circleSize} />
        </div>

    )
}
export default Loader