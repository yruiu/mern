import React from "react";
import {Link} from 'react-router-dom'

export const LinkList=({links})=>{
    console.log('MARK'+links)
    if(!links.length){
        return (
            <p className="center">Nothing link</p>
        )
    }
    return(
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original</th>
                <th>Reload</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index)=>{
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            })}


            </tbody>
        </table>
    )
}