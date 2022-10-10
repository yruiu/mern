import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinkList} from "../components/LinksList";
import {AuthContext} from "../context/AuthContext";

export const LinksPage= ()=>{
    const [links, setLinks]=useState([])
    const {loading, request}=useHttp();
    const {token}=useContext(AuthContext);
    const fetchLinks=useCallback(async ()=>{
        try{
            const fetched=await request('/api/link/links', "GET", null,{
                Authorization: `Bearer ${token}`
            });
            setLinks(fetched)
        } catch (e){}
    }, [token, request])
    useEffect(()=>{
        fetchLinks();
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }
    return(
        <>
            {!loading&&<LinkList links={links}/>}
        </>
    )
}