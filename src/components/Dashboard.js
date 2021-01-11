import React from 'react';

import FeedList from './FeedList';

import styles from './dashboard.module.scss';

const Dashboard = ({ podData }) => {

  return (
    <div className={styles.container}>
      <FeedList podData={podData} />
    </div>
  );
};

export default Dashboard;
