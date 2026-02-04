import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MeetingCreatePage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        '/api/meetings',
        { title, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/meetings/${resp.data.id}`);
    } catch (err) {
      alert('Failed to create meeting');
    }
  };

  return (
    <div>
      <h2>Create Meeting</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default MeetingCreatePage;
