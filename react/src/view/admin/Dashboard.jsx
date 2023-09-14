import React from 'react';
import { DashboardStatusGrid } from '../../components/admin/DashboardStatusGrid';
import TransactionChart from '../../components/admin/TransactionChart';
import BuyerProfileChart from '../../components/admin/BuyerProfileChart';

export const Dashboard = () => {
  return (
    <div className='flex gap-4 flex-col w-full'>
      {/* Dashboard Status Grid */}
      <DashboardStatusGrid />

      {/* Transaction and Buyer Profile Charts */}
      <div className='flex flex-row gap-4 w-full'>
        <TransactionChart />
        <BuyerProfileChart />
      </div>


    </div>
  );
};
