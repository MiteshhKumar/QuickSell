import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import { loadGrid, mapUsersByUserId } from './utils';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [gridData, setGridData] = useState({});
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");
  const [loading, setLoading] = useState(true);

  // Function to save settings to local storage
  const saveSettings = useCallback((data) => {
    for (let key in data) {
      localStorage.setItem(key, data[key]);
    }
  }, []);

  // Function to load settings from local storage
  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  // Load settings and tickets on mount
  useEffect(() => {
    loadSettings(); // Load settings first
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(resp => resp.json())
      .then(res => {
        const { tickets, users } = res;
        setTickets(tickets);
        setUserData(mapUsersByUserId(users));
      })
      .catch(err => console.error(err)); // Log error to the console
  }, [loadSettings]); // Add loadSettings to dependencies

  // Update grid data when tickets, grouping, or ordering change
  useEffect(() => {
    if (!tickets.length) return;
    setGridData(loadGrid(tickets, grouping, ordering));
    setLoading(false);
  }, [grouping, ordering, tickets]);

  // Handle grouping change
  const onSetGrouping = useCallback((value) => {
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
  }, [saveSettings]); // Add saveSettings as a dependency

  // Handle ordering change
  const onSetOrdering = useCallback((value) => {
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
  }, [saveSettings]); // Add saveSettings as a dependency

  return (
    <div className="App">
      <Header grouping={grouping} setGrouping={onSetGrouping} ordering={ordering} setOrdering={onSetOrdering} />
      {loading ? <Loader /> :
        <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />
      }
    </div>
  );
}

export default App;
