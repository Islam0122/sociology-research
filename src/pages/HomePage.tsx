import { NAV_ITEMS } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { BackToTop } from '../components/layout/BackToTop';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Navbar } from '../components/navigation/Navbar';
import { ChapterKyrgyzstan } from '../components/sections/ChapterKyrgyzstan';
import { ChapterNegative } from '../components/sections/ChapterNegative';
import { ChapterPositive } from '../components/sections/ChapterPositive';
import { ChapterSocialMedia } from '../components/sections/ChapterSocialMedia';
import { Conclusion } from '../components/sections/Conclusion';
import { Contents } from '../components/sections/Contents';
import { Hero } from '../components/sections/Hero';
import { Overview } from '../components/sections/Overview';
import { References } from '../components/sections/References';
import { Solutions } from '../components/sections/Solutions';
import { SurveySection } from '../components/survey/SurveySection';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import type { SectionId } from '../types';

const OBSERVED: SectionId[] = Array.from(new Set(NAV_ITEMS.flatMap((n) => n.covers)));

export function HomePage() {
  const { progress, scrolled } = useScrollProgress();
  const active = useActiveSection(OBSERVED);

  return (
    <>
      <ScrollProgress progress={progress} />
      <Navbar scrolled={scrolled} active={active} />
      <main>
        <Hero />
        <Overview />
        <Contents />
        <ChapterSocialMedia />
        <ChapterPositive />
        <ChapterNegative />
        <ChapterKyrgyzstan />
        <Solutions />
        <ErrorBoundary label="Раздел опроса временно недоступен.">
          <SurveySection />
        </ErrorBoundary>
        <Conclusion />
        <References />
      </main>
      <Footer />
      <BackToTop visible={progress > 0.08} />
    </>
  );
}
