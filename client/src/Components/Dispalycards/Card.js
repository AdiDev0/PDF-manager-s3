import react, { useState, useEffect } from "react";
import Displaycard from "./Displaycard";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';






const Card = ({ reload, fnToReload, searchString, token }) => {

    const [cardData, setCardData] = useState({});
    const URL = 'https://pdf-manager-s3-v2.onrender.com/'

    useEffect(() => {
        if (searchString) {
            axios.get(URL)
                .then((res) => {
                    const result = res.data;

                    const data = result.filter((elem)=>{
                        return elem.name.toLowerCase().includes(searchString);
                    })
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);
                    console.log(cardData)
                })
        }
        else{
            axios.get(URL)
                .then((res) => {
                    const data = res.data;
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);
                    console.log(cardData)
                })
        }
        console.log(cardData)

    }, [reload, searchString])

    return (
        <div style={{display:'flex', flexDirection:'row', flexFlow: 'wrap',  alignItems:'centre', marginLeft:'2rem'}}>
            {cardData.length>0 ? cardData.map((item, index) => (
                <Displaycard key={index} {...item} fnToReload={fnToReload} token={token}/>

            )):<div><CircularProgress size={100} sx={{ margin: '2rem 2rem', width: '70%', height: "100%" }} color="primary" thickness={5} /></div>}
        </div>
    );
};

export default Card;