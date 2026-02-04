import React from 'react';

interface Props {
  summary: string;
}

const SummaryViewer: React.FC<Props> = ({ summary }) => (
  <div>
    <h3>Summary</h3>
    <p>{summary}</p>
  </div>
);

export default SummaryViewer;
