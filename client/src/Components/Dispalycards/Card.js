import react, { useState, useEffect } from "react";
import Displaycard from "./Displaycard";
import axios from 'axios'
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



const URL = 'http://localhost:5000'

// const URL = 'https://pdf-manager-s3-v2.onrender.com/'




const Card = ({ reload, fnToReload, searchString, token }) => {

    const [cardData, setCardData] = useState(null);
    

    useEffect(() => {
        if (searchString) {
            axios.get(`${URL}`, { headers : {'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then((res) => {
                    const result = res.data;

                    const data = result.filter((elem)=>{
                        return elem.name.toLowerCase().includes(searchString.toLowerCase());
                    })
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);
                    console.log(cardData)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
        else{
            axios.get(`${URL}`, { headers : {'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then((res) => {
                    const data = res.data;
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);
                    console.log(cardData)
                })
                .catch((error)=>{
                    setCardData([]);
                    alert('sign first')
                    console.log(error)
                })
        }
        console.log(cardData)

    }, [reload, searchString])

    useEffect(()=>{
        console.log(cardData);
    },[])

    return (
        <div style={{display:'flex', flexDirection:'row', flexFlow: 'wrap',  alignItems:'centre', marginLeft:'2rem'}}>
            {!cardData && <div><CircularProgress size={100} sx={{ margin: '2rem 2rem', width: '70%', height: "100%" }} color="primary" thickness={5} /></div>}
            {cardData && cardData.length>0 && cardData.map((item, index) => ( <Displaycard key={index} {...item} fnToReload={fnToReload} token={token}/>))}
            {cardData && cardData.length===0 && <Paper >
      <Typography variant="h6" align="center" sx={{margin:'1.5rem'}}>
        No data found
      </Typography>
    </Paper>}
        </div>
    );
};

export default Card;