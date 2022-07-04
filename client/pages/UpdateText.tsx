import styles from './UpdateText.module.css';
import react, { useEffect, useState } from "react";
import axios from "axios";

type Text = {
    id: number;
    title: string;
    text: string;
}

const UpdateText = () => {

    const [texts, setTexts] = useState([]);
    const [forCleanUp, setForCleanUp] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:3000/readtext')
            .then((data) => {
                setTexts(data.data);
            })
    }, [forCleanUp])

    const reviseText = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        console.log(e.currentTarget.name);
        console.log("id : ", id);
    }

    const deleteText = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        console.log(e.currentTarget.name);
        console.log("id : ", id);

        axios
            .get(`http://localhost:3000/text/${id}`)
            .then((data) => {
                console.log(data, "지워짐");
                setForCleanUp((prev) => !prev);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className={styles.main}>
            {texts.map((el: Text) => <div key={el.id}>
                <h1>{el.title}</h1>
                <button onClick={(e) => reviseText(e, el.id)} name="revise">수정</button>
                <button onClick={(e) => deleteText(e, el.id)} name="delete">삭제</button>
            </div>)}
        </div>
    );
}

export default UpdateText;