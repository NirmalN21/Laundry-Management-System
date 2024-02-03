import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffDashboard.css';
import { SERVER_URL } from '../../constants';
import Navbar from '../../components/Navbar';

const StaffDashboard = () => {
    const [users, setUsers] = useState([]);

    const handleDetails =()=>{

    }

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                if (cookieValue) {
                    const response = await axios.get(`${SERVER_URL}/staff/getData/${cookieValue}`);
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

    }, []);

    return (
        <>
            <Navbar />
            <div className="staff-dashboard">
                <h2>Staff Dashboard</h2>
                <div className="user-cards">
                    {users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <button className='details-btn' onClick={handleDetails(user._id)}>Details</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StaffDashboard;
