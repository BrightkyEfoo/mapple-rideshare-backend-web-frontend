import React, { useRef, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';
import './placeautocomplete.css';

const PlaceAutoComplete2 = ({ point, placeholder }) => {
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const BookRide = useSelector(state => state.BookRide);
  const handleChange = value => {
    setAddress(value);
    // setInputValue(value);
    if (value === '') {
      if (point === 'start') {
        dispatch(BookRideActions.setRoute({ ...BookRide.route, start: '' }));
        dispatch(BookRideActions.setStartCoord({ lat: 0, lng: 0 }));
      } else if (point === 'end') {
        dispatch(BookRideActions.setEndCoord({ lat: 0, lng: 0 }));
        dispatch(BookRideActions.setRoute({ ...BookRide.route, end: '' }));
      }
    }
  };
  const handleSelect = value => {
    setAddress(value);
    // if (value === '') {
    //   if (point === 'start') {
    //     dispatch(BookRideActions.setRoute({ ...BookRide.route, start: '' }));
    //     dispatch(BookRideActions.setStartCoord({ lat: 0, lng: 0 }));
    //   } else if (point === 'end') {
    //     dispatch(BookRideActions.setEndCoord({ lat: 0, lng: 0 }));
    //     dispatch(BookRideActions.setRoute({ ...BookRide.route, end: '' }));
    //   }
    // } else {
      geocodeByAddress(value)
        .then(async results => {
          setInputValue(value);
          if (point === 'start') {
            dispatch(BookRideActions.setRoute({ ...BookRide.route, start: results[0].formatted_address }));
          } else if (point === 'end') {
            dispatch(BookRideActions.setRoute({ ...BookRide.route, end: results[0].formatted_address }));
          }
          const latLng = await getLatLng(results[0]).catch(err => {
            console.log('err', err);
          });
          const { lat, lng } = latLng;
          if (point === 'start') {
            dispatch(BookRideActions.setStartCoord({ lat, lng }));
          } else if (point === 'end') {
            dispatch(BookRideActions.setEndCoord({ lat, lng }));
          }
        })
        .catch(error => console.log('Error', error));
    // }
  };
  return (
    <div className="autocomplete-super-container">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: ['CA'] } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: placeholder,
                className: 'location-search-input',
              })}
            />
            {(loading || suggestions.length > 0) && (
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlaceAutoComplete2;
