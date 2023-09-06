import React, { useEffect } from 'react';

const Loading: React.FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {

      window.history.back();
    }, 2000); 

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
