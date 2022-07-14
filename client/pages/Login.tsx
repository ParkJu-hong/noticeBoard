import react, { useState } from "react";
import axios from "axios";
import { useQRCode } from 'next-qrcode';
import { useBarcode } from 'next-barcode';

import { MultiFormatReader, BarcodeFormat } from '@zxing/library';

const Login = () => {

    const [testTwo, setTestTwo] = useState({
        name: "ParkJuHong",
        age: 24
    })

    const { Canvas } = useQRCode();
    const { inputRef } = useBarcode({
        value: `{
            name: "ParkJuHong",
            age: 24
        }`,
        options: {
          background: '#ccffff',
        }
    });

    const test = async () => {
        const formData = new FormData();

        formData.set('id', 'test2');
        formData.set('pw', '123456');

        axios
            .get('http://localhost:3000/secrets')
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    react.useEffect(() => {
        test();
    }, [])
    return (
        <div>
            <form id="form1" method="POST" action="http://localhost:3000/login">
                <input type="text" name="id" value="test2" />
                <input type="text" name="pw" value="123dwd456" />
                <button id="btn1">submit</button>
            </form>
            <Canvas
                text={`{
                    message : "dwdw",
                    Firstname: "Park",
                }`}
                options={{
                    type: 'image/jpeg',
                    quality: 0.3,
                    level: 'M',
                    margin: 3,
                    scale: 4,
                    width: 200,
                    color: {
                        dark: '#010599FF',
                        light: '#FFBF60FF',
                    },
                }}
            />
            <svg ref={inputRef} />
        </div>
    );
}

export default Login;