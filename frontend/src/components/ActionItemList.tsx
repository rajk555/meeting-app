import React from 'react';

interface Props {
  items: string[];
}

const ActionItemList: React.FC<Props> = ({ items }) => (
  <div>
    <h3>Action Items</h3>
    <ul>
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  </div>
);

export default ActionItemList;
