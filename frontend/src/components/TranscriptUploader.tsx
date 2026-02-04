import React, { useState } from 'react';

interface Props {
  onUpload: (file: File) => void;
}

const TranscriptUploader: React.FC<Props> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Transcript File:</label>
        <input type="file" accept=".txt,.md" onChange={handleChange} required />
      </div>
      <button type="submit">Upload & Summarize</button>
    </form>
  );
};

export default TranscriptUploader;
