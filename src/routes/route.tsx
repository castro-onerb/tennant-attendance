import { AnimatePresence } from 'framer-motion';
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const Home = lazy(() => import('../pages/home'));
const TriageWrapper = lazy(() => import('../pages/triage/wrapper'));
const Queue = lazy(() => import('../pages/attendance/queue'));
const Attendance = lazy(() => import('../pages/attendance'));

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index path='/' element={<Home />} />
        <Route path="/triage" element={<TriageWrapper />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </AnimatePresence>
  );
}
