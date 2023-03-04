import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { AiFillUnlock } from 'react-icons/ai';
import './style.css'

const AdminSettingsView = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const Token = 'Bearer ' + localStorage.getItem('token');
  const [users, setUsers] = useState(null);
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
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'username', width: 230 },
    { field: 'email', headerName: 'email', width: 250 },
    { field: 'firstName', headerName: 'firstname', width: 150 },
    { field: 'lastName', headerName: 'lastname', width: 150 },
    { field: 'sex', headerName: 'sex', width: 50 },
    { field: 'phone', headerName: 'phone', width: 130 },
    {
      field: 'actions',
      headerName: 'actions',
      width: 150,
      renderCell: params => {
        return (
          <div className='admin-settings-view-actions-buttons'>
            <button>
              <BsPencilFill size={15} color='#0000ffa9' />
            </button>
            <button>
              <BsFillTrashFill size={20} color='red' />
            </button>
            <button>
              <AiFillUnlock size={20} color='#3b3b3b'/>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {users && (
        <DataGrid rows={users} columns={columns} pageSize={8} rowsPerPageOptions={[5]} checkboxSelection style={{ textJustify: 'left' }} />
      )}
      {/* {users && users.map((el, i) => {})} */}
    </div>
  );
};

export default AdminSettingsView;
