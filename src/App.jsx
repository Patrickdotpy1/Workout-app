import Navbar from "./Navbar"
import DisplayWorkout from "./DisplayWorkout"

function App() {
  /*
  let workoutData = [
    {
        id: 0,
        reps: 12,
        sets: 3,
        load: 35,
        exercise: 'OHP'
    },
    {
        id: 1,
        reps: 5,
        sets: 5,
        load: 100,
        exercise: 'Bench Press'
    },
    {
        id: 2,
        reps: 8,
        sets: 2,
        load: 30,
        exercise: 'Biceps Curls'
    }
  ];
  localStorage.setItem('My Workout', JSON.stringify(workoutData));
  */
  
  return(
    <>
      <Navbar/>
      <DisplayWorkout WorkoutName='My Workout'/>
    </>
  )
}

export default App


// To do:
// 4. Set up the URL's
// 5. add CreateWorkout() function
// 6. add a button to save a workout
// 7. add a page for training history
// 8. make the website responsive