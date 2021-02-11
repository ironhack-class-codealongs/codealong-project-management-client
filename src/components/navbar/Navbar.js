import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    return (
        <>
            {
                props.user ?
                    <div>
                        Welcome, {props.user.username}
                        <br />
                        <Link to="/projects">Projects</Link>
                    </div> :
                    <div>
                        <Link to="/signup">Register</Link>
                    </div>
            }

            <hr />
        </>
    )
}
