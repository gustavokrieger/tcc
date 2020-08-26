import React from 'react';
import {useParams} from 'react-router-dom';

type Params = {
  title: string;
};

export default function ViolationCase() {
  const {title} = useParams<Params>();

  return (
    <div className="code-files-upload">
      <h1>{title}</h1>
    </div>
  );
}
