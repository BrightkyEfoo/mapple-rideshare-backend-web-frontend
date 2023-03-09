import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import { DataGrid } from '@mui/x-data-grid';
import './style.css'

const OrderHistoryView = () => {
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const history = useSelector(state => state.BookRide.history);
  //   const [history, setHistory] = useState(null);
  useEffect(() => {
    axios
      .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/bookride', {
        headers: {
          Authorization: token,
        },
        params: {
          UserId: user.id,
        },
      })
      .then(res => {
        dispatch(BookRideActions.setHistory(res.data.history));
        console.log('res.data', res.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'driver',
      headerName: 'driver',
      width: 150,
      renderCell: params => {
        return <div>{params.row.driver.lastName + ' ' + params.row.driver.firstName}</div>;
      },
    },
    { field: 'start', headerName: 'start', width: 200 },
    { field: 'end', headerName: 'end', width: 100 },
    {
      field: 'state',
      headerName: 'state',
      width: 100,
      renderCell: params => {
        return <div>{params.row.state === 0 ? 'pending' : params.row.state === 1 ? 'completed' : 'canceled'}</div>;
      },
    },
    {
      field: 'price',
      headerName: 'price',
      width: 80,
      renderCell: params => {
        return <div>{params.row.price}</div>;
      },
    },
    {
      field: 'date',
      headerName: 'date',
      width: 200,
      renderCell: params => {
        let date = new Date(params.row.updatedAt);
        return <div>{date.toLocaleString()}</div>;
      },
    },
  ];

  return (
    history && (
      <div className='order-history-ride'>
        <DataGrid
          rows={history}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          style={{ textJustify: 'left', minHeight: 500 }}
        />
      </div>
    )
  );
};

export default OrderHistoryView;
