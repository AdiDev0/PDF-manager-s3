import react, { useState, useEffect } from "react";
import Displaycard from "./Displaycard";
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


const tempData = [
    {
        name: 'Object 1',
        description: 'This is the description for object 1.',
        filename: 'file1.pdf',
    },
    {
        name: 'Object 2',
        description: 'This is the description for object 2.',
        filename: 'file2.pdf',
    },
    {
        name: 'Object 3',
        description: 'This is the description for object 3.',
        filename: 'file3.pdf',
    },
    {
        name: 'Object 4',
        description: 'This is the description for object 4.',
        filename: 'file4.pdf',
    },
    {
        name: 'Object 5',
        description: 'This is the description for object 5.',
        filename: 'file5.pdf',
    },
    {
        name: 'Object 6',
        description: 'This is the description for object 6.',
        filename: 'file6.pdf',
    },
    {
        name: 'Object 7',
        description: 'This is the description for object 7.',
        filename: 'file7.pdf',
    },
    {
        name: 'Object 8',
        description: 'This is the description for object 8.',
        filename: 'file8.pdf',
    },
    {
        name: 'Object 9',
        description: 'This is the description for object 9.',
        filename: 'file9.pdf',
    },
    {
        name: 'Object 10',
        description: 'This is the description for object 10.',
        filename: 'file10.pdf',
    },
    {
        name: 'Object 1',
        description: 'This is the description for object 1.',
        filename: 'file1.pdf',
    },
    {
        name: 'Object 2',
        description: 'This is the description for object 2.',
        filename: 'file2.pdf',
    },
    {
        name: 'Object 3',
        description: 'This is the description for object 3.',
        filename: 'file3.pdf',
    },
    {
        name: 'Object 4',
        description: 'This is the description for object 4.',
        filename: 'file4.pdf',
    },
    {
        name: 'Object 5',
        description: 'This is the description for object 5.',
        filename: 'file5.pdf',
    },
    {
        name: 'Object 6',
        description: 'This is the description for object 6.',
        filename: 'file6.pdf',
    },
    {
        name: 'Object 7',
        description: 'This is the description for object 7.',
        filename: 'file7.pdf',
    },
];



const Card = ({ reload, fnToReload, searchString }) => {

    const [cardData, setCardData] = useState({});

    useEffect(() => {
        if (searchString) {
            axios.get('https://pdf-manager-s3.onrender.com/')
                .then((res) => {
                    const result = res.data;

                    const data = result.filter((elem)=>{
                        return elem.name.toLowerCase().includes(searchString);
                    })
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);

                })
        }
        else{
            axios.get('https://pdf-manager-s3.onrender.com/')
                .then((res) => {
                    const data = res.data;
                    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setCardData(sortedData);
                    
                })
        }
        console.log(cardData)

    }, [reload, searchString])

    return (
        <div style={{display:'flex', flexDirection:'row', flexFlow: 'wrap',  alignItems:'centre', justifyContent:'center'}}>
            {cardData.length>0 ? cardData.map((item, index) => (
                <Displaycard key={index} {...item} fnToReload={fnToReload} />

            )):<div><CircularProgress size={100} sx={{ margin: '2rem 2rem', width: '70%', height: "100%" }} color="primary" thickness={5} /></div>}
        </div>
    );
};

export default Card;