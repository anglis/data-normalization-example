
import moment from 'moment'

const SessionTimeLeft = ({ duration }) => {
  const msLeft = moment().subtract(duration, 'millisecond')

  return (
    <div>
      {msLeft.minutes()}:{msLeft.second()}
    </div>
  )
}

export default SessionTimeLeft