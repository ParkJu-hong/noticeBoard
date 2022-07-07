import react from "react";
import axios from "axios";

const Login = () => {

    const test = async () => {
        const formData = new FormData();

        formData.set('id', 'test2');
        formData.set('pw', '123456');

        axios
        .get('http://localhost:3000/test')
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    react.useEffect(()=>{
        test();
    },[])
    return (
        <form id="form1" method="POST" action="http://localhost:3000/login">
            <input type="text" name="id" value="tesdwqdwt2"/>
            <input type="text" name="pw" value="123456"/>
            <button id="btn1">submit</button>
    </form>
    );
}

export default Login;