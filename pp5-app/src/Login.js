import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles.css';

function Login() {
    const naviget = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 5000)
    }, [msg])

    const handleInputChange = (e, type) => {
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("You must input username!");
                }
                break;
            case "pass":
                setError("");
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("You must input password!");
                }
                break;
            default:
        }
    }
    
    function loginSubmit() {
        if(user !== "" && pass !== ""){
            var url = "http://localhost/kodego/pp5/login.php";
            var headers = {
                "Accept": "application/json",
                "Content-type": ""
            };
            var Data = {
                user: user,
                pass: pass
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                if(response[0].result === "Invalid username!" || response[0].result === "Invalid password!"){
                    setError(response[0].result);
                }
                else{
                    setMsg(response[0].result);
                    setTimeout(function(){
                        naviget("/dashboard");
                    }, 5000);
                }
            }).catch((err) =>{
                setError(err);
                console.log(err);
            })
        }
        else{
            setError("You must input username and password!");
        }
    }

    return(
        <div className='container text-center mt-5'>
            <div className='row align-items-center'>
                <div className='col'></div>
                <div className='col-md-4 align-self-center'>
                    <h1 className='display-6'>Login to Dashboard</h1>
                        <form>
                            <p>
                                {
                                   error !== "" ?
                                   <span className="error">{error}</span> :
                                   <span className="success">{msg}</span>
                                }
                            </p>
                        <div class="mb-3">
                            <label for="user" class="form-label">Username</label>
                            <input type="text" value={user} onChange={(e) => handleInputChange(e, "user")} class="form-control" id="user" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" value={pass} onChange={(e) => handleInputChange(e, "pass")} class="form-control" id="password" /> 
                        </div>
                        <div class="d-grid gap-2">
                            <input type="submit" defaultValue="Login" onClick={loginSubmit} class="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}

export default Login;