import React from "react";

export const LinkCard=({link})=>{
    return(
        <>
            <h2>Link</h2>
            <p>Reload: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Reload: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Click: <strong>{link.clicks}</strong></p>
            <p>Data: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}