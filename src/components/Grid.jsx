// All your workout cards
import {workoutProgram as training_plan} from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx';
export default function Grid(){

            const isLocked = true;
            const selectWorkout  = 4;

    return ( 

        <div className="training-grid-plan">
            {Object.keys(training_plan).map((workout , workoutIndex) => {
                const type = workoutIndex % 3 === 0 ? 'push' 
                :
                 workoutIndex % 3  === 1 ? 'pull'
                 :
                 'legs'

                 const trainingPlan = training_plan[workoutIndex]
                 const dayNum = (workoutIndex + 1 ).toString().padStart(2 ,'0')
                 const icon = workoutIndex % 3 === 0 ? (
                 <i className='fa-solid fa-dumbbell'></i>
                ) 
                 : (workoutIndex % 3 === 1 ? (<i className='fa-solid fa-weight-hanging'></i>) 
                 : (<i className='fa-solid fa-bolt'></i>))

                 if (workoutIndex === selectWorkout) {
                    return(
                        <WorkoutCard key={workoutIndex} trainingPlan={trainingPlan}
                         type = {type} workoutIndex = {workoutIndex} dayNum = {dayNum}
                         icon = {icon}
                        />
                    )
                 }
                return(
                    <button className={'card plan-card ' + (isLocked ?
                        'inactive' : ''
                    )} key={workoutIndex}>
                    <div className='plan-card-header'>
                         
                        {/* <p>Day {((workoutIndex / 8) <= 1) ? '0' + (workoutIndex
                        + 1) : workoutIndex + 1}</p> */}
                        {
                            <p>
                                Day {dayNum}
                            </p>
                        }
                    </div>
                    { 
                    isLocked ? (
                        <i className='fa-solid fa-lock'></i>
                    ) : (icon) 
                   }
                   <div className='plan-class-header'>

                    <h4>
                        <b>
                            {type}
                        </b>
                    </h4>

                   </div>
                    </button>
            )}
            )}
        </div>
    )
}