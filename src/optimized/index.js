import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SessionTimeLeft from '../sessionTimeLeft'
import { optimizedDataSlice } from '../store'

const Cell = ({ id, property }) => {
  const field = useSelector(state => state.optimizedData.normalizedData[id][property])

  return <td>{field}</td>
}

const RenderSessionTimeLeft = ({ id }) => {
  const field = useSelector(state => state.optimizedData.normalizedData[id].lastActive)
  useSelector(state => state.optimizedData.time)

  return <SessionTimeLeft duration={field} />
}

const RenderRow = ({ id }) => {
  return (
    <tr>
      <td>{id}</td>
      <Cell id={id} property='name' />
      <Cell id={id} property='email' />
      <Cell id={id} property='lastActive' />
      <td><RenderSessionTimeLeft id={id} /></td>
    </tr>
  )
}

const Optimized = () => {
  const dispatch = useDispatch()
  const keys = useSelector(state => state.optimizedData.keys)

  useEffect(() => { // Data updater
    setInterval(() => {
      dispatch(optimizedDataSlice.actions.updateData())
    }, 4e3)
  }, [])
  
  useEffect(() => { // Time update in order to sync countdowns
    setInterval(() => {
      dispatch(optimizedDataSlice.actions.updateTime())
    }, 1e3)
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Last time active</td>
          <td>Active before</td>
        </tr>
      </thead>
      <tbody>
        {keys.map(key => <RenderRow key={key} id={key} />)}
      </tbody>
    </table>
  )
}

export default Optimized