import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../App"

const Logout = () => {

  const [confirm, setConfirm] = useState(false);

  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "USER", payload: false });
    
    navigate("/login")
}, []);

  return (
    <>

    </>
  )
}

export default Logout
