import { Textarea } from '@mui/joy';
import { Button, IconButton, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../rtk/features/Notificarion';

const MessageRatePopUp = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  return (
    <div
      className="message-rate-popup"
      onClick={e => {
        if (e.currentTarget === e.target) {
          dispatch(NotificationActions.setIsRateVisible(false));
        }
      }}
    >
      <div>
        <IconButton
          className="message-rate-popup-close-button"
          onClick={() => {
            dispatch(NotificationActions.setIsRateVisible(false));
          }}
        >
          <CloseIcon />
        </IconButton>
        <p>Rate your ride</p>
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          size="large"
        />
        <Textarea placeholder="type here" size="lg" minRows={3} color="neutral" />
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default MessageRatePopUp;
