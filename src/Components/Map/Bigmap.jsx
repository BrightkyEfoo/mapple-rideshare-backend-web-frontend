import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, Polyline, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { NotificationActions } from '../../rtk/features/Notificarion';

const Bigmap = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const dispatch = useDispatch();
  const isSmallTablet = useMediaQuery({ query: '(max-width: 730px)' });
  const [previous, setPrevious] = useState(null);
  const Bookride = useSelector(state => state.BookRide);
  const containerStyle = {
    width: isTablet ? 'calc(100vw - 16px)' : '650px',
    height: isTablet ? '38vh' : '500px',
  };
  const CANADA_BOUNDS = {
    north: 83.86,
    south: 40.15,
    west: -145.75,
    east: -52.59,
  };
  const [response, setResponse] = useState(null);
  const directionsCallback = res => {
    console.log('directions', res);

    if (res !== null) {
      if (res.status === 'OK') {
        setPrevious('OK')
        setResponse(res);
      } else {
        console.log('response: ', res);
        if (res.status === 'ZERO_RESULTS') {
          if (previous === 'OK') {
            dispatch(NotificationActions.addContent({ severity: 'warning', value: 'can make the ride by driving' }));
            dispatch(NotificationActions.setIsVisible(true));
            setResponse(0);
          }
        }
        setPrevious('KO');
      }
    }
  };
  useEffect(() => {
    setResponse(null);
  }, [Bookride.startCoord.lat, Bookride.startCoord.lng, Bookride.endCoord.lat, Bookride.endCoord.lng]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={Bookride.centerCoord}
        options={{ restriction: { latLngBounds: CANADA_BOUNDS, strictBounds: false }, minZoom: 2.7 }}
        zoom={13} /*onLoad={onLoad} onUnmount={onUnmount}*/
      >
        {/* Child components, such as markers, info windows, etc. */}
        {Bookride.startCoord.lat && !isNaN(Bookride.startCoord.lat) && <Marker position={Bookride.startCoord} />}
        {Bookride.endCoord.lat && !isNaN(Bookride.endCoord.lat) && <Marker position={Bookride.endCoord} />}
        {Bookride.startCoord && Bookride.endCoord && response === null && (
          <DirectionsService
            // required
            callback={directionsCallback}
            options={{
              destination: Bookride.endCoord,
              origin: Bookride.startCoord,
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
    </div>
  );
};

export default Bigmap;
