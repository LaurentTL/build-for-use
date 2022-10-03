import React, { useEffect, useState  } from 'react'

const Messages = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/receive')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
    }, [])

    return (
        <>
            <h1>Message du device Entretien :</h1>
            { !data ? <p>Loading...</p> : <p>{data.message}</p> }
        </>
    )
}

export default Messages