import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import './place.css';
import { useDispatch, useSelector } from 'react-redux';
import { BookRideActions } from '../../rtk/features/BookRide';

const PlacesAutocomplete = ({ point, placeholder }) => {
  const dispatch = useDispatch();
  const BookRide = useSelector(state => state.BookRide);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = suggestion => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(suggestion.description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: suggestion.description }).then(results => {
      const { lat, lng } = getLatLng(results[0]);
      console.log('description', suggestion);
      console.log('📍 Coordinates: ', { lat, lng });

      if (point === 'start') {
        dispatch(BookRideActions.setStartCoord({ lat, lng }));
        dispatch(BookRideActions.setRoute({ ...BookRide.route, start: suggestion.structured_formatting.main_text }));
      } else if (point === 'end') {
        dispatch(BookRideActions.setRoute({ ...BookRide.route, end: suggestion.structured_formatting.main_text }));
        dispatch(BookRideActions.setEndCoord({ lat, lng }));
      }
    });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="place-finder-field">
      <input value={value} onChange={handleInput} disabled={!ready} placeholder={placeholder} />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
