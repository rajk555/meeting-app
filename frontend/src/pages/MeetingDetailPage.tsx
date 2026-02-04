import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TranscriptUploader from '../components/TranscriptUploader';
import SummaryViewer from '../components/SummaryViewer';
import ActionItemList from '../components/ActionItemList';

interface Meeting {
  id: string;
  title: string;
  date: string;
}

interface SummaryResult {
  summary: string;
  actionItems: string[];
}

const MeetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, logout } = useContext(AuthContext);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      const resp = await axios.get(`/api/meetings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMeeting(resp.data);
    };
    fetchMeeting();
  }, [id, token]);

  const handleTranscript = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const resp = await axios.post(
      `/api/meetings/${id}/transcript`,
      form,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    setResult(resp.data);
  };

  return (
    <div>
      <h2>Meeting Detail</h2>
      <button onClick={logout}>Logout</button>
      <Link to="/meetings">Back to list</Link>
      {meeting && (
        <div>
          <h3>{meeting.title}</h3>
          <p>{new Date(meeting.date).toLocaleString()}</p>
        </div>
      )}
      <TranscriptUploader onUpload={handleTranscript} />
      {result && (
        <div>
          <SummaryViewer summary={result.summary} />
          <ActionItemList items={result.actionItems} />
        </div>
      )}
    </div>
  );
};

export default MeetingDetailPage;
