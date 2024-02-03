import React, { useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Feedback from "../../components/feedback";
import Navbar from '../../components/Navbar';

const PreviousComplaints = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                if (cookieValue) {
                    const response = await axios.get(`${SERVER_URL}/staff/getComplaints/${cookieValue}`);
                    console.log(response.data.complaints);
                    setUser(response.data.complaints);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [])


    const getComplaints = (complaint) => {
        return (
            <div className='cards-container'>
                <div className='main-container'>
                    <p className='roomNo'>{complaint.name}</p>
                    <p className='description'>{complaint.email}</p>
                    <p className='isResolved'>True</p>
                    <p className='feedback'>praveen lawda saala</p>
                    {(complaint.isResolved ) ? <p>{complaint.feedback}</p> : <Feedback id={complaint.id}/>}
                </div>
            </div>
        )

    }

    return (
        <>
            <Navbar/>
            {user?.slice(0).reverse().map(getComplaints)}
        </>
    )
}

export default PreviousComplaints;
