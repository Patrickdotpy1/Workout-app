
function Workout(props){
    return(
        <div id="workout-container">
            <p className='workout-title'>{props.name}</p>
            <p className='workout-date'>{props.date}</p>
        </div>
    )
}

export default Workout