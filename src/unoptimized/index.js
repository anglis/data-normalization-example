import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SessionTimeLeft from '../sessionTimeLeft'
import { unoptimizedDataSlice } from '../store'

const Unoptimized = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.unoptimizedData)

  useEffect(() => {
    setInterval(() => {
      dispatch(unoptimizedDataSlice.actions.updateData())
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
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.lastActive}</td>
            <td><SessionTimeLeft duration={row.lastActive} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Unoptimized