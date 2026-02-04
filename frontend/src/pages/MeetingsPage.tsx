import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Meeting {
  id: string;
  title: string;
  date: string;
}

const MeetingsPage: React.FC = () => {
  const { token, logout } = useContext(AuthContext);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const resp = await axios.get('/api/meetings', { headers: { Authorization: `Bearer ${token}` } });
      setMeetings(resp.data);
    };
    fetchMeetings();
  }, [token]);

  return (
    <div>
      <h2>My Meetings</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {meetings.map(m => (
          <li key={m.id}>
            <Link to={`/meetings/${m.id}`}>{m.title} ({new Date(m.date).toLocaleString()})</Link>
          </li>
        ))}
      </ul>
      <Link to="/meetings/new">Create New Meeting</Link>
    </div>
  );
};

export default MeetingsPage;
