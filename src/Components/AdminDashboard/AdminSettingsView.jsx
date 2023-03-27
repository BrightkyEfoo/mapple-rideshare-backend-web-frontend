import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserCreateOrEditActions } from '../../rtk/features/UserCreateOrEditFormSlice';
import { userListActions } from '../../rtk/features/AdminUserListReload';

const AdminSettingsView = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const [users, setUsers] = useState(null);
  const reload = useSelector(state => state.userList.trigger);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user?userId=' + User.id, {
        headers: {
          Authorization: Token,
        },
      })
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [reload]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'username', width: 150 },
    { field: 'email', headerName: 'email', width: 200 },
    {
      field: 'date',
      headerName: 'date of creation',
      width: 150,
      renderCell: params => {
        let date = new Date(params.row.updatedAt);
        return <div>{date.toLocaleString()}</div>;
      },
    },
    {
      field: 'actions',
      headerName: 'actions',
      width: 120,
      renderCell: params => {
        return (
          <div className="admin-settings-view-actions-buttons">
            {User.accessLevel === 3 && (
              <>
                <button
                  onClick={e => {
                    dispatch(UserCreateOrEditActions.setUser(params.row));
                    dispatch(UserCreateOrEditActions.setIsVisible(true));
                  }}
                >
                  <BsPencilFill size={15} color="#0000ffa9" />
                </button>
                <button
                  onClick={e => {
                    console.log('params', params);
                    axios
                      .delete('https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/admin?id=' + params.row.id, {
                        headers: {
                          Authorization: Token,
                        },
                        data: {
                          userId: User.id,
                        },
                      })
                      .then(res => {
                        console.log('res.data', res.data);
                        dispatch(UserCreateOrEditActions.setIsVisible(false));
                        dispatch(userListActions.reload());
                      })
                      .catch(err => {
                        console.log('err', err);
                      });
                  }}
                >
                  <BsFillTrashFill size={20} color="red" />
                </button>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'status',
      width: 120,
      renderCell: params => {
        return (
          <div className="admin-settings-view-actions-buttons">
            <div>
              <div
                onClick={e => {
                  axios
                    .put(
                      'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/subadmin',
                      { allowed: !params.row.allowed, userId: User.id, id: parseInt(params.row.id) },
                      {
                        headers: {
                          Authorization: Token,
                        },
                      }
                    )
                    .then(res => {
                      console.log('res.data', res.data);
                      dispatch(UserCreateOrEditActions.setIsVisible(false));
                      dispatch(userListActions.reload());
                    })
                    .catch(err => {
                      console.log('err', err);
                    });
                }}
              >
                {/*il y a un truc a faire ici*/}
                {params.row.allowed ? (
                  <p title={'lock the user ' + params.row.userName}>desactivate</p>
                ) : (
                  <p title={'unlock the user ' + params.row.userName}>activate</p>
                )}
              </div>
              {!params.row.validated && (
                <div
                  onClick={e => {
                    axios
                      .put(
                        'https://mapple-rideshare-backend-nau5m.ondigitalocean.app/user/subadmin',
                        { validated: !params.row.validated, userId: User.id, id: parseInt(params.row.id) },
                        {
                          headers: {
                            Authorization: Token,
                          },
                        }
                      )
                      .then(res => {
                        console.log('res.data', res.data);
                        dispatch(UserCreateOrEditActions.setIsVisible(false));
                        dispatch(userListActions.reload());
                      })
                      .catch(err => {
                        console.log('err', err);
                      });
                  }}
                >
                  <p title={'validate ' + params.row.userName}>validate</p>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard-admin-settings-view">
      <div>
        {users && (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            pageSizeOptions={[10]}
            // checkboxSelection
            style={{ textJustify: 'left', minHeight: 500 }}
          />
        )}
      </div>
      {User.accessLevel === 3 && (
        <button
          onClick={() => {
            dispatch(UserCreateOrEditActions.setIsVisible(true));
          }}
        >
          Create User
        </button>
      )}
    </div>
  );
};

export default AdminSettingsView;
