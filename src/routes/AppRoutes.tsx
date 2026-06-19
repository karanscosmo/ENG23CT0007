import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AllNotificationsPage from '../pages/AllNotificationsPage';
import PriorityInboxPage from '../pages/PriorityInboxPage';
import { Log } from '../utils/logger';

function RouteLogger() {
  const location = useLocation();
  useEffect(() => {
    Log('frontend', 'info', 'page', `Route changed to ${location.pathname}`);
  }, [location]);
  return null;
}

export const AppRoutes: React.FC = () => {
  return (
    <>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<AllNotificationsPage />} />
        <Route path="/priority" element={<PriorityInboxPage />} />
      </Routes>
    </>
  );
};
