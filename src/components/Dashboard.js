import React from 'react';

import FeedList from './FeedList';

const Dashboard = ({ name, podData }) => {

  const title = (name)
    ? `Welcome to your feed, ${name}`
    : 'Feed';

  return (
    <div>
      <section className="section">
        <h1 className="title">
          {title}
        </h1>
      </section>
      <FeedList podData={podData} />
    </div>
  );
};

export default Dashboard;
