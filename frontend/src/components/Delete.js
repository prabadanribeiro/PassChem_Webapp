import React, { useState } from "react";

export default function Delete( {sendModalToggle} ) {

  const [isHovered, setIsHovered] = useState(false);

  const deleteAccount = () => {
    api.delete('api/users/delete-account', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then( () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        navigate('/')
    })
  }

  const buttonStyle = {
    marginTop:'15px',
    height:'35px',
    width:'160px',
    fontFamily:'DM Sans',
    fontWeight:'600',
    fontSize:'18px',
    color: isHovered ? 'white' : 'red',
    backgroundColor: isHovered ? 'red' : 'white',
    border: '2px solid red',
    borderRadius:'5px',
    transitionDuration:'0.4s'
  }

  return (
    <>
      <button 
        style={buttonStyle} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type="button"
        onClick={sendModalToggle}
        >Delete Account
      </button>
      
    </>
  )
}