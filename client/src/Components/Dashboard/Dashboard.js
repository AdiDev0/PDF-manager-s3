import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Card from '../Dispalycards/Card'
import Form from '../Form/Form'
import './Dashboard.css'



const Dashboard = () => {

  const [reload, setReload] = useState(0);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    console.log(reload);
  }, [reload])

  return <div>
    <Navbar setSearchString={setSearchString} />
    <div className='container' style={{display:'flex', flexDirection:'row'}}>
      <Card reload={reload} fnToReload={setReload} searchString={searchString} />
      <Form fnToReload={setReload} sx={{margin:'auto'}}/>
    </div>

  </div>
}


export default Dashboard;