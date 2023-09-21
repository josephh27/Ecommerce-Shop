import React from 'react';
import styles from './OrderHistory.module.scss';
import useFetchCollection from '../../customHooks/useFetchCollection';

const OrderHistory = () => {
  const {data, isLoading} = useFetchCollection("orders");
  console.log(data);

  return (
    <div>orderHistory</div>
  )
}

export default OrderHistory;