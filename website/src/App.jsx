import { Route, Routes } from 'react-router-dom';
import { AppShell } from './AppShell';
import { LandingPage } from './components/LandingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<AppShell />} />
    </Routes>
  );
}