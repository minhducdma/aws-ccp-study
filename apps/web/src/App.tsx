import { Navigate, Route, Routes } from 'react-router-dom';
import CourseLayout from './components/CourseLayout';
import CatalogPage from './pages/CatalogPage';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import PracticePage from './pages/PracticePage';
import ExamPage from './pages/ExamPage';
import ReviewPage from './pages/ReviewPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/course/:courseId" element={<CourseLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="phase/:phaseId/notes/:noteId" element={<NotesPage />} />
        <Route path="phase/:phaseId/notes" element={<NotesPage />} />
        <Route path="phase/:phaseId/practice" element={<PracticePage />} />
        <Route path="exam/:examId" element={<ExamPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
