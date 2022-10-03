import { useEffect, useState } from "react"

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/deviceInfo',)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
  }, [])
  
  return (
    <>
      <h1>PrimaryKey du device Entretien :</h1>
      { !data ? <p>Loading...</p> : <p>{data.key}</p> }
    </>
  )
}
