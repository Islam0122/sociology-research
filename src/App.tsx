import { MotionConfig } from 'framer-motion';
import { PresentationProvider } from './components/presentation/PresentationProvider';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary label="Произошла ошибка при отображении страницы. Обновите страницу.">
        <PresentationProvider>
          <HomePage />
        </PresentationProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}
