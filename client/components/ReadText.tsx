import react, { useEffect, useState } from "react";
import axios from "axios";

type Text = {
    title: string;
    text: string;
}

const ReadText = () => {

    const [texts, setTexts] = useState([]);

    useEffect(()=>{
        axios
        .get('http://localhost:3000/readtext')
        .then((data) => {
            setTexts(data.data);
        })

    },[])

    return (
        <div>
            {texts.map((el : Text,idx) => {
                return <div key={idx}>
                    <h1>{el.title}</h1>
                    <div>{el.text}</div>
                </div>
            })}
        </div>
    );
}

export default ReadText;