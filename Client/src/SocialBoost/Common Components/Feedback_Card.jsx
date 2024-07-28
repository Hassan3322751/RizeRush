import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Feedback = () => {
  return (
    <>
       <Card className='box-shadow p-2 m-2'>
            <strong className='text-center'>Feedback & Report</strong>
            <p className='text-center'>If you see here any type of problem or suggesion report us</p>
            <Button variant='primary' className='m-0'>Report</Button>
        </Card>
    </>
  )
}

export default Feedback
