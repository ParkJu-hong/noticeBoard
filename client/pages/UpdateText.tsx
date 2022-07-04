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
    const [forCleanUp, setForCleanUp] = useState<boolean>(true);
    const [isRevise, setIsRevise] = useState<boolean>(false);
    const [isReviseId, setIsReviseId] = useState(0);
    const [revisedText, setRevisedText] = useState<string>("");
    const [revisedTitle, setRevisedTitle] = useState<string>("");

    useEffect(() => {
        axios
            .get('http://localhost:3000/readtext')
            .then((data) => {
                setTexts(data.data);
            })
    }, [forCleanUp])

    // const reviseTitle = (e : any) => {
    //     setRevisedTitle(e.target.value)
    // }


    const forReviseText = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        console.log(id)
        setRevisedText("");
        setRevisedTitle("");
        axios({
            method: 'post',
            url: 'http://localhost:3000/updateText',
            data: {
                id: id,
                title: revisedTitle,
                text: revisedText
            }
        }).then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const deleteText = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
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
                <button onClick={(e) => forReviseText(e, el.id)} name="revise">수정</button>
                <button onClick={(e) => deleteText(e, el.id)} name="delete">삭제</button>
                <div >
                    <h3>제목</h3>
                <input type="text"
                 value={revisedText}
                 onChange={(e) => setRevisedText(e.target.value)}
                 ></input>
                <h3>내용</h3>
                <input type="text" 
                value={revisedTitle}
                onChange={(e) => setRevisedTitle(e.target.value)}
                ></input>
                </div>
            </div>)}
        </div>
    );
}

export default UpdateText;