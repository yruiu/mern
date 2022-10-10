import {useState, useCallback} from 'react'

export const useHttp=()=>{
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(null)
    const request= useCallback(async (url, method="GET", body=null, headers={})=>{
        setLoading(true)
        try{
            if(body){
                body=JSON.stringify(body);
                headers["Content-Type"]='application/json';
            }

            const respone = await fetch(url, {method, body,headers});
            console.log(respone)
            const data=await respone.json();
            if(!respone.ok){
                throw new Error(data.message||'YourLox')
            }
            setLoading(false)

            return data
        }catch (e){
            console.log(e)
            setError(e.message());
            setLoading(false);
            return  e;
        }
    }, [])
    const clearError=useCallback(()=>setError(null), [])
    return {loading, request, error, clearError}
}