// All your workout cards
import { useEffect, useState } from 'react';
import { workoutProgram as training_plan } from '../utils/index.js';
import WorkoutCard from './WorkoutCard.jsx';

export default function Grid() {
    const [savedWorkouts , setSavedWorkouts] = useState(null)
    const [selectedWorkout , setSelectedWorkout] = useState(null)
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val]
        return entry.isComplete
    })


    function handleSave(index , data) {
        // Save to local storage and modify the saved workout state
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }

        setSavedWorkouts(newObj)
        localStorage.setItem('brogram' , JSON.stringify(newObj))
        setSelectedWorkout(null)

    }

    function handleComplete(index ,data){
        // Complete a workout (so basicsally we modify the completed status)
        const newObj = { ...data }
        newObj.isComplete = true
        handleSave(index , newObj)
    }

    useEffect( () => {
        if (!localStorage) { return }
        let savedData = {}
        if(localStorage.getItem('brogram')){
            savedData = JSON.parse(localStorage.getItem('brogram'))
        }
        setSavedWorkouts(savedData)
    }, [])

    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = workoutIndex == 0 ? 
                false :  
                !completedWorkouts.includes(`${workoutIndex - 1}`)
                console.log(workoutIndex , isLocked)
                const type = workoutIndex % 3 === 0 
                    ? 'push' 
                    : workoutIndex % 3 === 1 
                        ? 'pull' 
                        : 'legs';

                const trainingPlan = training_plan[workoutIndex];
                const dayNum = (workoutIndex + 1).toString().padStart(2, '0');
                const icon = workoutIndex % 3 === 0 
                    ? <i className='fa-solid fa-dumbbell'></i>
                    : workoutIndex % 3 === 1 
                        ? <i className='fa-solid fa-weight-hanging'></i>
                        : <i className='fa-solid fa-bolt'></i>;

                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard 
                            savedWeights = {savedWorkouts?.[workoutIndex]?.weights}
                            handleComplete = {handleComplete}
                            handleSave = {handleSave}
                            key={workoutIndex} 
                            trainingPlan={trainingPlan}
                            type={type} 
                            workoutIndex={workoutIndex} 
                            dayNum={dayNum}
                            icon={icon}
                        />
                    );
                }

                return (
                    <button onClick={() => {
                        if (isLocked) {return}
                        setSelectedWorkout(workoutIndex)
                    }}
                        className={`card plan-card ${isLocked ? 'inactive' : ''}`} 
                        key={workoutIndex}
                    >
                        <div className='plan-card-header'>
                            <p>
                                <strong>Day</strong> {dayNum}
                            </p>
                            {isLocked ? (
                                <i className='fa-solid fa-lock'></i>
                            ) : (
                                icon
                            )}
                        </div>
                        <div className='plan-class-header'>
                            <h4>
                                <b>{type}</b>
                            </h4>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}