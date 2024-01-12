import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StaffDashboard.css';
import { SERVER_URL } from '../../constants';
import Navbar from '../../components/Navbar';

const StaffDashboard = () => {
    const [staffUserId, setStaffUserId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {

                const response = await axios.get(`${SERVER_URL}/staff/getData/${staffUserId}`);
                setUsers(response.data.users);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (staffUserId) {
            console.log("CAlled");
            fetchUsers();
        }
    }, [staffUserId]);

    return (
        <>
            <Navbar />
            <div className="staff-dashboard">
                <h2>Staff Dashboard</h2>
                <label htmlFor="staffUserId" className='staff-dashboard-label'>Enter Staff Member's userId: </label>
                <input
                    type="text"
                    id="staffUserId"
                    className="user-input"
                    value={staffUserId}
                    onChange={(e) => setStaffUserId(e.target.value)}
                />

                <div className="user-cards">
                    {users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StaffDashboard;
