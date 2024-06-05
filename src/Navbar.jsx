import Workout from "./Workout";

function Navbar(){
    let WORKOUTS = [
        {
            id: 0,
            name: 'My Workout',
            creationMonth: 'Jan'
        }
    ];

    return(
        <div id='navbar'>
            <center>
                <h4 className='title'>Workouts</h4>
                <button className='plus-button'>+</button>
                    
                {WORKOUTS.map((workoutInfo) => (
                    <Workout name={workoutInfo.name} date="January"/>
                ))}
            </center>
        </div>
    )
}


export default Navbar