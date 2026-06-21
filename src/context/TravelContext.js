import React, { createContext, useCallback, useState, useContext } from 'react';
import { tripService } from '../services/TripService.js';

const TravelContext = createContext(null);

export const TravelProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUserTrips = useCallback(async (token) => {
    setLoading(true);
    try {
      const data = await tripService.fetchTrips(token);
      setTrips(data);
      setSelectedTrip((current) => current || data[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateNewTrip = useCallback(async (tripInput, token) => {
    setLoading(true);
    try {
      const data = await tripService.generateTrip(tripInput, token);
      setTrips((prev) => [data.itinerary, ...prev]);
      setSelectedTrip(data.itinerary);
      return data.itinerary;
    } catch (err) {
      alert('Failed to generate trip through AI agent.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const modifyTripDay = useCallback(async (tripId, dayData, token) => {
    try {
      const data = await tripService.modifyDay(tripId, dayData, token);
      setTrips((prev) => prev.map(t => t._id === tripId ? data.refreshedTrip : t));
      setSelectedTrip(data.refreshedTrip);
    } catch (err) {
      alert('Failed to alter itinerary sequence.');
    }
  }, []);

  return (
    <TravelContext.Provider value={{ trips, selectedTrip, setSelectedTrip, loading, loadUserTrips, generateNewTrip, modifyTripDay }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
