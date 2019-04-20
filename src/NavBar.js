import React from 'react';
import { NavLink } from 'react-router-dom';


 const left = {
    display : 'inline-block',
    textAlign : 'left',
    textSize : '1.25rem',
    width : '50%',
    padding : '12px',
    marginBottom : '3%',
    background : 'darkblue',
    textDecoration : 'none',
    color : 'white'
  }

  const right = {
    display : 'inline-block',
    textAlign : 'right',
    textSize : '1.25rem',
    width : '50%',
    padding : '12px',
    marginBottom : '3%',
    background : 'darkblue',
    textDecoration : 'none',
    color : 'white'
  }

  const div = {
    display : 'flex',
    width : '100%',
    height : '30%'
  }
  
  const NavBar = () =>{
    return (
      <div style={div}>
        <NavLink to="/bookshelf"  //set to exact so activeStyle is applied only when deeply equal to link
                 exact
                 style={left}
        >My BookShelf
        </NavLink>
        <NavLink to="/"  //set to exact so activeStyle is applied only when deeply equal to link
                 exact
                 style={right}
        ><span className="fa fa-search"role="img" aria-label="search"></span>
        </NavLink>
  
      </div>
    )
  }

  export default NavBar