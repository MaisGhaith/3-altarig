import { GoogleMap, useLoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Map = () => {
    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [markerPosition, setMarkerPosition] = useState({ lat: null, lng: null });
    const [markerKey, setMarkerKey] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBj3pEgJixrXWNe0ejDSOagl-HaHUzkWMA",
        libraries,
    });

    useEffect(() => {
        if (latitude && longitude) {
            setMarkerPosition({ lat: latitude, lng: longitude });
            setMarkerKey((prevKey) => prevKey + 1);
        }
    }, [latitude, longitude]);

    const handleMapLoad = (map) => {
        setMap(map);
    };

    const handleAutocompleteLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const handlePlaceSelect = () => {
        if (autocomplete !== null) {
            const addressObject = autocomplete.getPlace();
            const address = addressObject.formatted_address;
            setSelectedLocation(address);

            const { lat, lng } = addressObject.geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            setMarkerPosition({ lat, lng });
        }
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setLatitude(lat);
        setLongitude(lng);
        setMarkerPosition({ lat, lng });
    };

    const handleShareLocation = () => {
        setLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    setLatitude(userLocation.lat);
                    setLongitude(userLocation.lng);
                    setMarkerPosition(userLocation);
                    setLoadingLocation(false);
                },
                (error) => {
                    console.log('Error getting user location:', error);
                    setLoadingLocation(false);
                }
            );
        } else {
            console.log('Geolocation is not supported');
            setLoadingLocation(false);
        }
    };

    const handleSaveLocation = () => {
        // Store the location in the database
        const locationData = {
            latitude,
            longitude,
            address: selectedLocation
        };

        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        locationData.url = url;

        axios.post("http://localhost:5151/location/locations", locationData)
            .then((response) => {
                console.log("Location saved in the database:", response.data);
                // Handle success
            })
            .catch((error) => {
                console.error("Error saving location in the database:", error);
                // Handle error
            });
    };

    if (loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <button onClick={handleShareLocation}>Share Location</button>
                <Autocomplete
                    onLoad={handleAutocompleteLoad}
                    onPlaceChanged={handlePlaceSelect}
                >
                    <input type="text" placeholder="Enter your location" />
                </Autocomplete>
                {loadingLocation ? (
                    <div>Loading location...</div>
                ) : (
                    <GoogleMap
                        onLoad={handleMapLoad}
                        mapContainerStyle={{ width: "100%", height: "400px" }}
                        center={{ lat: latitude, lng: longitude }}
                        zoom={17}
                        onClick={handleMapClick}
                    >
                        {latitude && longitude && (
                            <Marker key={markerKey} position={markerPosition} />
                        )}
                    </GoogleMap>
                )}
                <div>Selected Location: {`${selectedLocation}, ${latitude},${longitude}`}</div>
                <button onClick={handleSaveLocation}>Save Location</button>
            </div>
        </div>
    );
}

export default Map;