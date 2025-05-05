import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '../lib/auth'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH)
    console.log(session)
  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default page