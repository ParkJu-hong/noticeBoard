import react, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WriteText.module.css";


const WriteText = () => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    return (
        <div className={styles.main}>
            <h3>제목</h3>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <h3>내용</h3>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)}></input>
            <div>
                <button onClick={() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:3000/writetext',
                        data: {
                            title,
                            text
                        }
                    }).then((data) => {
                        setTitle("");
                        setText("");
                    })
                        .catch((err) => {
                            console.error(err)
                        })

                }}>제출</button>
            </div>
        </div>
    );
}

export default WriteText;