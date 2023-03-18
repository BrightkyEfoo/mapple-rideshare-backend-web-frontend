import { DirectionsRenderer, DirectionsService, GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import './SmallMap.css';
const SmallMap = ({ center }) => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script2',
    googleMapsApiKey: 'AIzaSyC18L8pZJlrJimHPd0CwkD_CmxLda1A8ys',
    // libraries,
  });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const DriverBooking = useSelector(state => state.DriverBooking);
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isSmallTablet = useMediaQuery({ query: '(max-width: 730px)' });
  //   const Bookride = useSelector(state => state.BookRide);
  const containerStyle = {
    width: '100%',
    height: isTablet ? '38vh' : '400px',
  };
  const CANADA_BOUNDS = {
    north: 83.86,
    south: 40.15,
    west: -145.75,
    east: -52.59,
  };
  const [response, setResponse] = useState(null);
  const directionsCallback = res => {
    console.log(res);

    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res);
      } else {
        console.log('response: ', res);
      }
    }
  };
  const endCoord = DriverBooking.newBooking.endCoord;
  const startCoord = DriverBooking.newBooking.startCoord;
  return (
    <div className="small-map-driver-view">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          //   center={center}
          options={{ restriction: { latLngBounds: CANADA_BOUNDS, strictBounds: false }, minZoom: 2.7 }}
          zoom={13} /*onLoad={onLoad} onUnmount={onUnmount}*/
        >
          {startCoord && endCoord && response === null && (
            <DirectionsService
              // required
              callback={directionsCallback}
              options={{
                destination: endCoord,
                origin: startCoord,
                travelMode: 'DRIVING',
              }}
              // required
              // callback={this.directionsCallback}
              // optional
              onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService);
              }}
              // optional
              onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService);
              }}
            />
          )}
          {response !== null && (
            <DirectionsRenderer
              // required
              options={{
                directions: response,
                polylineOptions: {
                  strokeColor: '#ed1a43',
                  strokeWeight: 5,
                },
              }}
              // optional
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
              }}
              // optional
              onUnmount={directionsRenderer => {
                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer);
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default SmallMap;
