import react from "react";
import axios from "axios";

const Login = () => {

    const test = async () => {
        const formData = new FormData();

        formData.set('id', 'test');
        formData.set('pw', '12345');

        axios({
            method: 'post',
            url: 'http://localhost:3000/test',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })    .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    react.useEffect(()=>{
        // test();
    },[])
    return (
        <form id="form1" method="POST" action="http://localhost:3000/login">
            <input type="text" name="id" value="test"/>
            <input type="text" name="pw" value="12345"/>
            <button id="btn1">submit</button>
    </form>
    );
}

export default Login;