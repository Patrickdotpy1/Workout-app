import React, { useEffect, useState } from 'react';

window.onload = function() {
    UpdateSETS();
};

let NameOfWorkout;

function UpdateSETS(){
    for(let id = 0; id < 50; id++){
        try{
            let htmlSets = document.getElementsByClassName('workout-element5')[id];
            let totalSets = (htmlSets.innerHTML).split('/')[1];
            let setsDone = Number(localStorage.getItem(`${NameOfWorkout}-${id}`));
            htmlSets.innerHTML = `${setsDone.toString()}/${totalSets}`;
            if(setsDone !== 0){
                changeSets('-', id);
                changeSets('+', id);
            }}
        catch{
            break;
        }}}

function clearSets(dataLength){
    for(let index=0; index<30; index++){
        try{
            for(let id = 0; id<20; id++){
                changeSets('-', id);
            }}
        catch{}
    }
}

function changeSets(addOrRemove, id){
    let htmlButton = document.getElementsByClassName('workout-element5')[id];
    let setsCompleted = Number((htmlButton.innerHTML).split('/')[0]);
    let setsRemained = Number((htmlButton.innerHTML).split('/')[1]);
    if(addOrRemove === '+'){
        if(setsCompleted !== setsRemained){
            // Updating the new sets
            let updatedHTML = `${(setsCompleted + 1).toString()}/${setsRemained}`
            htmlButton.innerHTML = updatedHTML;
            localStorage.setItem(`${NameOfWorkout}-${id}`, setsCompleted + 1);
            
            // If all the sets are completed, change CSS colors
            if((setsCompleted + 1) === setsRemained){
                let element1 = document.getElementsByClassName('workout-element1')[id];
                let element2 = document.getElementsByClassName('workout-element2')[id];
                let element3 = document.getElementsByClassName('workout-element3')[id];

                element1.classList.toggle('completed');
                element2.classList.toggle('completed');
                element3.classList.toggle('completed');
            }
        }}
    else if(addOrRemove === '-'){
        // Remove the potential CSS class of completed
        let element1 = document.getElementsByClassName('workout-element1')[id];
        let element2 = document.getElementsByClassName('workout-element2')[id];
        let element3 = document.getElementsByClassName('workout-element3')[id];
        
        element1.classList.remove('completed');
        element2.classList.remove('completed');
        element3.classList.remove('completed');

        //let setsCompleted = Number((htmlButton.innerHTML).split('/')[0]);
        //let setsRemained = Number((htmlButton.innerHTML).split('/')[1]);
        if(setsCompleted !== 0){
            // Updating the new sets
            let updatedHTML = `${(setsCompleted - 1).toString()}/${setsRemained}`
            htmlButton.innerHTML = updatedHTML;
            localStorage.setItem(`${NameOfWorkout}-${id}`, setsCompleted - 1);
        }
    }
}


function deleteExercise(workoutData, id){
    // Creating another list with the data of the workout
    let latestWorkoutData = [];
    // Looping through the initial list and adding all elements except the one that is going to be deleted
    let newId = 0;
    for(let object of workoutData){
        if(object.id !== id){
            let newObject = {
                id: newId,
                reps: object.reps,
                sets: object.sets,
                load: object.load,
                exercise: object.exercise,
            }
            newId += 1;
            latestWorkoutData.push(newObject);
        }
    }
    localStorage.setItem(NameOfWorkout, JSON.stringify(latestWorkoutData));

    // Refreshing the page
    location.reload();
}

function addButton(workoutData){
    let reps = document.getElementsByClassName('reps-input')[0];
    let sets = document.getElementsByClassName('sets-input')[0];
    let load = document.getElementsByClassName('load-input')[0];
    let exercise = document.getElementsByClassName('exercise-input')[0];

    // Getting the last id of the last object from workoutData
    try{
        var lastId = (workoutData[workoutData.length - 1]).id;
    }
    catch{
        var lastId = 0;
    }

    // Creating the new object
    let newObject = {
        id: (lastId + 1),
        reps: Number(reps.value),
        sets: Number(sets.value),
        load: Number(load.value),
        exercise: exercise.value
    };

    // Adding the variables to workoutData and into the localStorage
    workoutData.push(newObject);
    localStorage.setItem(NameOfWorkout, JSON.stringify(workoutData));

    // Refreshing the page
    location.reload();
}

function DisplayWorkout(props){
    // Getting the workout data
    const [workoutData, setWorkoutData] = useState([]);
    NameOfWorkout = props.WorkoutName;

    useEffect(() => {
    const data = localStorage.getItem(NameOfWorkout);
    if (data) {
      setWorkoutData(JSON.parse(data));
    }
  }, [NameOfWorkout]);

    // Creating styles for certain elements
    let space = {
        marginBottom: '10px'
    }
    // Displaying it
    return (
        <div id='workout-content'>
            <center> 
                <h2 className='workout-name'>{props.WorkoutName}</h2>
                <table id='table1'>
                    <tr>
                        <th><button style={space} className='workout-element1-alt'>Reps</button></th>
                        <th><button style={space} className='workout-element2-alt'>&nbsp;&nbsp;Load&nbsp;&nbsp;</button></th>
                        <th><button style={space} className='workout-element3-alt'>Exercise name</button></th>
                        <th></th>
                        <th><button style={space} className='workout-element5-alt' onClick={() => clearSets(workoutData.length)}>Clear</button></th>
                    </tr>
                    { workoutData.map(element => (
                        <tr>
                            <td><button className='workout-element1'>{element.reps}x{element.sets}</button></td>
                            <td><button className='workout-element2'>&nbsp;&nbsp;{element.load} kg&nbsp;&nbsp;</button></td>
                            <td><button className='workout-element3'>{element.exercise}</button></td>
                            <td><button className='workout-element4' onClick={() => changeSets('-', element.id)}>-</button></td>
                            <td><button className='workout-element5'>0/{element.sets}</button></td>
                            <td><button className='workout-element6' onClick={() => changeSets('+', element.id)}>+</button></td>
                            <td><button className='workout-element7' onClick={() => deleteExercise(workoutData, element.id)}>🗑️</button></td>
                        </tr>
                    ))}
                    
                </table>


                <table id='table2'>
                    <tr>
                        <td><button className='reps-or-seconds-button'>Reps</button></td>
                        <td><button className='sets-button'>Sets</button></td>
                        <td><button className='load-button'>Weight</button></td>
                        <td><button className='exercise-name-button'>Exercise name</button></td>
                    </tr>
                    <tr>
                        <td><input type='number' className='reps-input' placeholder='12'></input></td>
                        <td><input type='number' className='sets-input' placeholder='4'></input></td>
                        <td><input type='number' className='load-input' placeholder='15 kg'></input></td>
                        <td><input type='text' className='exercise-input' placeholder='Pull-ups'></input></td>
                    </tr>
                </table>
                <button className='add-data-button' onClick={() => addButton(workoutData)}>Add</button>
            </center>
        </div>
    )
}

export default DisplayWorkout