import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminBookHistoryActions } from '../../rtk/features/AdminBookHistory';
import { DataGrid } from '@mui/x-data-grid';
import './style.css'

const AdminOrderHistory = () => {
  // const [first, setfirst] = useState(second)
  const user = JSON.parse(localStorage.getItem('user'));
  const token = 'Bearer ' + localStorage.getItem('token');
  const history = useSelector(state => state.AdminBookHistory.ordersHistory);
  const [myInter, setMyInter] = useState(null);
  const [canReload, setCanReload] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setMyInter(
      setInterval(() => {
        console.log('myInter', myInter);
        axios
          .get('http://localhost:9001/user/ride', {
            headers: {
              Authorization: token,
            },
            params: {
              userId: user.id,
            },
          })
          .then(res => {
            console.log('res.data', res.data);
            dispatch(AdminBookHistoryActions.setHistory(res.data.history));
          })
          .catch(err => {
            console.log('err', err);
          });
      }, 300000)
    );
    console.log('myInter', myInter);
    axios
      .get('http://localhost:9001/user/ride', {
        headers: {
          Authorization: token,
        },
        params: {
          userId: user.id,
        },
      })
      .then(res => {
        console.log('res.data', res.data);
        dispatch(AdminBookHistoryActions.setHistory(res.data.history));
      })
      .catch(err => {
        console.log('err', err);
      });
    return () => {
      clearInterval(myInter);
    };
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
    {
      field: 'rider',
      headerName: 'rider',
      width: 150,
      renderCell: params => {
        return <div>{params.row.rider.lastName + ' ' + params.row.rider.firstName}</div>;
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
      <div className='admin-order-hitory-container'>
        <div>
          <DataGrid
            rows={history}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            style={{ textJustify: 'left', minHeight: 500 }}
          />
        </div>
        {canReload && (
          <button
            onClick={() => {
              setCanReload(false);
              setTimeout(() => {
                setCanReload(true);
              }, 60000);
              axios
                .get('http://localhost:9001/user/ride', {
                  headers: {
                    Authorization: token,
                  },
                  params: {
                    userId: user.id,
                  },
                })
                .then(res => {
                  console.log('res.data', res.data);
                  dispatch(AdminBookHistoryActions.setHistory(res.data.history));
                })
                .catch(err => {
                  console.log('err', err);
                });
            }}
          >
            Reload
          </button>
        )}
      </div>
    )
  );
};

export default AdminOrderHistory;
