import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function Goalitem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> 
        X
       </button>
    </div>
  )
}

export default Goalitem