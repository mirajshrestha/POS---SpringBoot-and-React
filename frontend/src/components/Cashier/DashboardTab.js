import React, { useEffect, useState } from 'react'
import axios from 'axios';

const DashboardTab = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchCurrentUser();
    });

    const fetchCurrentUser = async () => {
        try {
          const response = await axios.get('/api/cashier/me');
          setUserName(response.data.full_name);
        } catch (error) {
          console.error('Error fetching current user: ', error);
        }
      };
    
    return (
        <div className="mt-4">
            <h3>Welcome, {userName}.</h3>
            <hr />

            <p>This is your Dashboard. <br/>Here you can look through your profile and update the details you want to.</p>
        </div>
    )
}

export default DashboardTab;