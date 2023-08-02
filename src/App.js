import React, { useState, useEffect } from 'react';
import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import PlaceDetails from './components/PlaceDetails/PlaceDetails.jsx';
import { getPlacesData } from './api';

function App() {

  const [places, setPlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    setIsloading(true);
    getPlacesData(bounds /* bounds.sw, bounds.ne */)
      .then((data) => {
        console.log(data)
        setPlaces(data);
        setIsloading(false)
      })
  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            places={places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
