import Results from '@/features/Results'
import { useRouter } from 'next/router'
import React from 'react'

const Users = () => {
    const router = useRouter()
    const { id } = router.query;
    return (
        <Results id={id} />
    )
}

export default Users