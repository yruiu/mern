import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const CreatePage= ()=>{
    let navigate = useNavigate();
    const auth=useContext(AuthContext)
    const{request} =useHttp()
    const [link, setLink]=useState();
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const pressHandler= async event=>{
        if(event.key=='Enter'){
            try {
                let data=await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });

                navigate(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }

    }
    return(
        <div>
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="input-field">
                        <input placeholder="Write link" id="link" type="text" className="validate" name="link" value={link} onChange={e=>setLink(e.target.value)}
                        onKeyPress={pressHandler}
                        />
                        <label htmlFor="link">Link</label>
                    </div>
                </div>
            </div>
        </div>
    )
}