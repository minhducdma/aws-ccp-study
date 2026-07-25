import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import PracticePage from './pages/PracticePage';
import ExamPage from './pages/ExamPage';
import ReviewPage from './pages/ReviewPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/phase/:phaseId/notes/:noteId" element={<NotesPage />} />
        <Route path="/phase/:phaseId/notes" element={<NotesPage />} />
        <Route path="/phase/:phaseId/practice" element={<PracticePage />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
