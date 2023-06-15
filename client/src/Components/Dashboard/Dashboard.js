import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Card from '../Dispalycards/Card'
import Form from '../Form/Form'
import './Dashboard.css'



const Dashboard = () => {

  const [reload, setReload] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [token, setToken] = useState('');
  
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  })

  useEffect(() => {
    console.log(reload);
  }, [reload])

  return <div>
  <Navbar setSearchString={setSearchString} token={token} setToken={setToken} />
  <div className="container" style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ flex: '2', marginRight: '20px' }}>
      <Card reload={reload} fnToReload={setReload} searchString={searchString} token={token} />
    </div>
    <div style={{ flex: '1' }}>
      <Form fnToReload={setReload} token={token} />
    </div>
  </div>
</div>
}


export default Dashboard;