import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from '../ui/Button';
import Icon from '../AppIcon';
import Input from '../ui/Input';

const LocationPicker = ({
    latitude,
    longitude,
    onChange,
    error,
    label = "Farm Location",
    description = "Click on map to select location or use current GPS position"
}) => {
    const [mapCenter, setMapCenter] = useState({
        lat: parseFloat(latitude) || 20.5937,
        lng: parseFloat(longitude) || 78.9629
    });
    const [markerPosition, setMarkerPosition] = useState(
        latitude && longitude ? {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude)
        } : null
    );
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState('');
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualLat, setManualLat] = useState(latitude || '');
    const [manualLng, setManualLng] = useState(longitude || '');
    const mapRef = useRef(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '8px'
    };

    const mapOptions = {
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
    };

    useEffect(() => {
        if (latitude && longitude) {
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);
            setMapCenter({ lat, lng });
            setMarkerPosition({ lat, lng });
            setManualLat(latitude);
            setManualLng(longitude);
        }
    }, [latitude, longitude]);

    const handleMapClick = useCallback((event) => {
        const lat = event?.latLng?.lat();
        const lng = event?.latLng?.lng();

        if (lat && lng) {
            const position = { lat, lng };
            setMarkerPosition(position);
            setManualLat(lat?.toFixed(6));
            setManualLng(lng?.toFixed(6));
            onChange?.(lat?.toFixed(6), lng?.toFixed(6));
            setLocationError('');
        }
    }, [onChange]);

    const handleMarkerDragEnd = useCallback((event) => {
        const lat = event?.latLng?.lat();
        const lng = event?.latLng?.lng();

        if (lat && lng) {
            const position = { lat, lng };
            setMarkerPosition(position);
            setMapCenter(position);
            setManualLat(lat?.toFixed(6));
            setManualLng(lng?.toFixed(6));
            onChange?.(lat?.toFixed(6), lng?.toFixed(6));
        }
    }, [onChange]);

    const handleUseCurrentLocation = () => {
        setIsLoadingLocation(true);
        setLocationError('');

        if (!navigator?.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation?.getCurrentPosition(
            (position) => {
                const lat = position?.coords?.latitude;
                const lng = position?.coords?.longitude;
                const newPosition = { lat, lng };

                setMarkerPosition(newPosition);
                setMapCenter(newPosition);
                setManualLat(lat?.toFixed(6));
                setManualLng(lng?.toFixed(6));
                onChange?.(lat?.toFixed(6), lng?.toFixed(6));
                setIsLoadingLocation(false);
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';

                switch (error?.code) {
                    case error?.PERMISSION_DENIED:
                        errorMessage = 'Location access denied. Please enable location permissions in your browser.';
                        break;
                    case error?.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable. Please try again.';
                        break;
                    case error?.TIMEOUT:
                        errorMessage = 'Location request timed out. Please try again.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred while getting location.';
                }

                setLocationError(errorMessage);
                setIsLoadingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleManualSubmit = () => {
        const lat = parseFloat(manualLat);
        const lng = parseFloat(manualLng);

        if (isNaN(lat) || isNaN(lng)) {
            setLocationError('Please enter valid latitude and longitude values');
            return;
        }

        if (lat < -90 || lat > 90) {
            setLocationError('Latitude must be between -90 and 90');
            return;
        }

        if (lng < -180 || lng > 180) {
            setLocationError('Longitude must be between -180 and 180');
            return;
        }

        const position = { lat, lng };
        setMarkerPosition(position);
        setMapCenter(position);
        onChange?.(lat?.toFixed(6), lng?.toFixed(6));
        setLocationError('');
        setShowManualInput(false);
    };

    const apiKey = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'your-google-maps-api-key-here') {
        return (
            <div className="bg-card rounded-lg p-4 md:p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{label}</h3>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                    <Icon name="AlertTriangle" size={24} className="text-destructive mx-auto mb-2" />
                    <p className="text-sm text-destructive font-medium mb-2">Google Maps API Key Required</p>
                    <p className="text-xs text-muted-foreground">
                        Please add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{label}</h3>
            </div>

            {description && (
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
            )}

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        disabled={isLoadingLocation}
                        className="flex items-center gap-2"
                    >
                        <Icon
                            name={isLoadingLocation ? "Loader2" : "Navigation"}
                            size={16}
                            className={isLoadingLocation ? "animate-spin" : ""}
                        />
                        {isLoadingLocation ? 'Getting Location...' : 'Use Current Location'}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowManualInput(!showManualInput)}
                        className="flex items-center gap-2"
                    >
                        <Icon name="Edit3" size={16} />
                        {showManualInput ? 'Hide Manual Input' : 'Enter Manually'}
                    </Button>
                </div>

                {showManualInput && (
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                                label="Latitude"
                                type="number"
                                step="any"
                                placeholder="e.g., 28.7041"
                                value={manualLat}
                                onChange={(e) => setManualLat(e?.target?.value)}
                            />
                            <Input
                                label="Longitude"
                                type="number"
                                step="any"
                                placeholder="e.g., 77.1025"
                                value={manualLng}
                                onChange={(e) => setManualLng(e?.target?.value)}
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleManualSubmit}
                            className="w-full"
                        >
                            Apply Coordinates
                        </Button>
                    </div>
                )}

                {(locationError || error) && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                        <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5" />
                        <p className="text-sm text-destructive">{locationError || error}</p>
                    </div>
                )}

                <div className="border border-border rounded-lg overflow-hidden">
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={mapCenter}
                            zoom={markerPosition ? 13 : 5}
                            onClick={handleMapClick}
                            options={mapOptions}
                            onLoad={(map) => { mapRef.current = map; }}
                        >
                            {markerPosition && (
                                <Marker
                                    position={markerPosition}
                                    draggable={true}
                                    onDragEnd={handleMarkerDragEnd}
                                    animation={window?.google?.maps?.Animation?.DROP}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>

                {markerPosition && (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-success mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-success mb-1">Location Selected</p>
                                <p className="text-xs text-muted-foreground">
                                    Latitude: {markerPosition?.lat?.toFixed(6)}, Longitude: {markerPosition?.lng?.toFixed(6)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationPicker;