import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import { DataGrid } from '@mui/x-data-grid';
import './style.css';
import { GrOverview } from 'react-icons/gr';
import { useMediaQuery } from 'react-responsive';
import { socket } from '../../Socket';

const OrderHistoryView = () => {
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isSmallTablet = useMediaQuery({ query: '(max-width: 730px)' });
  const dispatch = useDispatch();
  const history = useSelector(state => state.BookRide.history);

  const [reload, setReload] = useState(true);
  socket.on('validated', data => {
    setReload(!reload);
    console.log('data', data);
  });
  socket.on('started', data => {
    setReload(!reload);
    console.log('data', data);
  });
  socket.on('confirmed', data => {
    setReload(!reload);
    console.log('data', data);
  });
  //   const [history, setHistory] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:9001/user/bookride', {
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
  }, [reload]);

  let columns = isMobile
    ? [
        { field: 'id', headerName: 'ID', width: 40 },
        {
          field: 'driver',
          headerName: 'driver',
          width: 80,
          renderCell: params => {
            return <div>{params.row.driver.lastName + ' ' + params.row.driver.firstName}</div>;
          },
        },
        { field: 'start', headerName: 'start', width: 70 },
        { field: 'end', headerName: 'end', width: 70 },
        {
          field: 'actions',
          headerName: 'actions',
          width: 50,
          renderCell: params => {
            return <GrOverview title={'lock the user ' + params.row.userName} size={20} color="#3b3b3b" />;
          },
        },
      ]
    : [
        { field: 'id', headerName: 'ID', width: isTablet ? 40 : 70 },
        {
          field: 'driver',
          headerName: 'driver',
          width: isSmallTablet ? 80 : isTablet ? 100 : 150,
          renderCell: params => {
            return <div>{params.row.driver.lastName + ' ' + params.row.driver.firstName}</div>;
          },
        },
        { field: 'start', headerName: 'start', width: isSmallTablet ? 70 : isTablet ? 100 : 100 },
        { field: 'end', headerName: 'end', width: isSmallTablet ? 70 : 100 },
        {
          field: 'state',
          headerName: 'state',
          width: 100,
          renderCell: params => {
            return (
              <div>
                {params.row.state === 0
                  ? 'pending'
                  : params.row.state === 1
                  ? 'validated'
                  : params.row.state === 2
                  ? 'started'
                  : params.row.state === 3
                  ? 'confirmed '
                  : 'not paid'}
              </div>
            );
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
          width: isSmallTablet ? 70 : isTablet ? 100 : 150,
          renderCell: params => {
            let date = new Date(params.row.updatedAt);
            return <div>{isTablet ? date.toLocaleDateString() : date.toLocaleString()}</div>;
          },
        },
        {
          field: 'actions',
          headerName: 'actions',
          width: 150,
          renderCell: params => {
            // console.log('params', params)
            return (
              params.row.state === 2 &&
              params.row.driverConfirm && (
                <div>
                  <button
                    onClick={() => {
                      axios
                        .post(
                          'http://localhost:9001/map/booking/confirm',
                          {
                            userId: user.id,
                            bookingId: params.id,
                          },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        )
                        .then(res => {
                          setReload(!reload);
                          console.log('res.data', res.data);
                        })
                        .catch(err => {
                          console.log('err', err);
                        });
                    }}
                  >
                    Yes
                  </button>
                  <button>No</button>
                </div>
              )
            );
          },
        },
      ];

  let columnsDriver = isMobile
    ? [
        { field: 'id', headerName: 'ID', width: 40 },
        {
          field: 'rider',
          headerName: 'rider',
          width: 80,
          renderCell: params => {
            return <div>{params.row.rider.lastName + ' ' + params.row.rider.firstName}</div>;
          },
        },
        { field: 'start', headerName: 'start', width: 70 },
        { field: 'end', headerName: 'end', width: 70 },
        {
          field: 'actions',
          headerName: 'actions',
          width: 50,
          renderCell: params => {
            return <GrOverview title={'lock the user ' + params.row.userName} size={20} color="#3b3b3b" />;
          },
        },
      ]
    : [
        { field: 'id', headerName: 'ID', width: isTablet ? 40 : 70 },
        {
          field: 'rider',
          headerName: 'rider',
          width: isSmallTablet ? 80 : isTablet ? 100 : 150,
          renderCell: params => {
            return <div>{params.row.rider.lastName + ' ' + params.row.rider.firstName}</div>;
          },
        },
        { field: 'start', headerName: 'start', width: isSmallTablet ? 70 : isTablet ? 100 : 100 },
        { field: 'end', headerName: 'end', width: isSmallTablet ? 70 : 100 },
        {
          field: 'state',
          headerName: 'state',
          width: 100,
          renderCell: params => {
            return (
              <div>
                {params.row.state === 0
                  ? 'pending'
                  : params.row.state === 1
                  ? 'validated'
                  : params.row.state === 2
                  ? 'started'
                  : params.row.state === 3
                  ? 'confirmed '
                  : 'not paid'}
              </div>
            );
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
          width: isSmallTablet ? 70 : isTablet ? 100 : 200,
          renderCell: params => {
            let date = new Date(params.row.updatedAt);
            return <div>{isTablet ? date.toLocaleDateString() : date.toLocaleString()}</div>;
          },
        },
      ];

  // const columnsRef = useRef({ columns });

  // useEffect(() => {
  //   if (isMobile) {
  //     columnsRef.current.columns = [
  //       {
  //         field: 'driver',
  //         headerName: 'driver',
  //         width: isSmallTablet ? 80 : isTablet ? 100 : 150,
  //         renderCell: params => {
  //           return <div>{params.row.driver.lastName + ' ' + params.row.driver.firstName}</div>;
  //         },
  //       },
  //       { field: 'start', headerName: 'start', width: isSmallTablet ? 70 : isTablet ? 100 : 200 },
  //       { field: 'end', headerName: 'end', width: isSmallTablet ? 70 : 100 },
  //       {
  //         field: 'actions',
  //         headerName: 'actions',
  //         width: 50,
  //         renderCell: params => {
  //           return <GrOverview title={'lock the user ' + params.row.userName} size={20} color="#3b3b3b" />;
  //         },
  //       },
  //     ];
  //   } else {
  //     columnsRef.current.columns = columns;
  //   }
  // }, [isMobile, isSmallTablet, isTablet]);

  return (
    history && (
      <div className="order-history-ride">
        <DataGrid
          rows={history}
          columns={user.accessLevel === 1 ? columnsDriver : columns}
          pageSize={8}
          sx={{
            fontSize: '0.7rem',
          }}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          style={{ textJustify: 'left', minHeight: 500 }}
        />
      </div>
    )
  );
};

export default OrderHistoryView;
