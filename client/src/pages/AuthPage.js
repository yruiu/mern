import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage= ()=>{
    const auth=useContext(AuthContext);
    const message=useMessage()
    const {loading,request, error, clearError}=useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    });
    useEffect(()=>{
        console.log(error)
        message(error);
        //clearError();
    }, [error, message])
    const changeHandler=event=>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registerHandler=async ()=>{
        try{
            const data=await request('/api/auth/register', 'POST', {...form}, {});
            message(data)
            console.log(data)
        } catch (e){}

    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const loginHandler=async ()=>{
        try{
            const data=await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e){console.log(e)}

    }
    return(
        <div className="row">
             <div className="col s6 offset-s3">
                 <h1>Reload Link</h1>
                 <div className="card blue darken-1">
                     <div className="card-content white-text">
                         <span className="card-title">Sign in</span>
                         <div className="">
                             <div className="input-field">
                                 <input placeholder="Write email" id="email" type="text" className="validate yellow-input" name="email" value={form.email} onChange={changeHandler}/>
                                     <label htmlFor="email">Email</label>
                             </div>
                             <div className="input-field">
                                 <input placeholder="Write password" value={form.password} id="password" type="password" name="password" className="validate yellow-input" onChange={changeHandler}/>
                                 {/*<label password="email">password</label>*/}
                             </div>
                         </div>
                     </div>
                     <div className="card-action">
                         <button onClick={loginHandler}  className="btn yellow darken-4"  style={{marginRight: 10}}>Log in</button>
                         <button onClick={registerHandler}  className="btn grey lighten-1 black-text">Sign in</button>
                     </div>
                 </div>
             </div>
        </div>
    )
}