import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import { DataGrid } from '@mui/x-data-grid';
import './style.css';
import { GrOverview } from 'react-icons/gr';
import { useMediaQuery } from 'react-responsive';
import { socket } from '../../Socket';
import { NavBarActions } from '../../rtk/features/NavBarSlice';
import { NotificationActions } from '../../rtk/features/Notificarion';

const OrderHistoryView = () => {
  const token = 'Bearer ' + localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isSmallTablet = useMediaQuery({ query: '(max-width: 730px)' });
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const history = useSelector(state => state.BookRide.history);
  socket.on('notification', data => {
    if (data.pop_up.status === 'END') {
      console.log('lancé');
      // audioNotificationRef.current.load();
      // audioNotificationRef.current.play();
      setIsPlaying(true);
    }
    console.log('order history reloaded on notification');
    setReload(!reload);
  });
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
        dispatch(BookRideActions.setHistory(res.data.history.reverse()));
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
                  ? 'ended '
                  : params.row.state === 4
                  ? 'paused '
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
            // console.log('params', params.row);
            return (
              <>
                {params.row.state === 3 && params.row.riderConfirm === 0 && (
                  <div>
                    <p>Is this ride ended</p>
                    <div>
                      <button
                        className="btn-primary-success"
                        onClick={() => {
                          // audioNotificationRef.current.pause();
                          setIsPlaying(false);

                          axios
                            .post(
                              'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/confirm',
                              {
                                userId: user.id,
                                bookingId: params.id,
                                riderConfirm: 1,
                              },
                              {
                                headers: {
                                  Authorization: token,
                                },
                              }
                            )
                            .then(res => {
                              dispatch(NavBarActions.reload());
                              setReload(!reload);
                              dispatch(NotificationActions.setRate({ isVisible: true, bookingId: params.row?.id }));
                              console.log('res.data', res.data);
                            })
                            .catch(err => {
                              console.log('err', err);
                            });
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="btn-primary-error"
                        onClick={() => {
                          // audioNotificationRef.current.pause();
                          setReload(!reload);
                          setIsPlaying(false);
                          axios
                            .post(
                              'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/map/booking/confirm',
                              {
                                userId: user.id,
                                bookingId: params.id,
                                riderConfirm: -1,
                              },
                              {
                                headers: {
                                  Authorization: token,
                                },
                              }
                            )
                            .then(res => {
                              dispatch(NavBarActions.reload());
                              setReload(!reload);
                              dispatch(NotificationActions.setRate({ isVisible: true, bookingId: params.row?.id }));
                              console.log('res.data', res.data);
                            })
                            .catch(err => {
                              console.log('err', err);
                            });
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
                {params.row.state === 3 && params.row.riderConfirm ? <p>{params.row.riderConfirm === 1 ? 'Yes' : 'No'}</p> : null}
              </>
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
                  ? 'ended '
                  : params.row.state === 4
                  ? 'paused '
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
            return <div>{params.row.price - 3}</div>;
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

  const audioNotificationRef = useRef();

  return (
    history && (
      <div className="order-history-ride">
        <DataGrid
          rows={history}
          columns={user.accessLevel === 1 ? columnsDriver : columns}
          pageSize={10}
          sx={{
            fontSize: '0.7rem',
          }}
          rowsPerPageOptions={[10]}
          pageSizeOptions={[10]}
          // checkboxSelection
          style={{ textJustify: 'left', minHeight: 500 }}
        />
        {isPlaying && (
          <audio className="display-none" ref={audioNotificationRef} loop autoPlay>
            <source src={'longnotif.mp3'} />
          </audio>
        )}
      </div>
    )
  );
};

export default OrderHistoryView;
