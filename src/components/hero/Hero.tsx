'use client';

import { HeroText } from './HeroText';
import { HeroApparatus } from './HeroApparatus';
import { StatsRow } from './StatsRow';
import { MeterStrip } from './MeterStrip';
import { Container } from '@/components/layout';

export function Hero() {
  return (
    <section className="hero relative overflow-clip" id="heroStage">
      <div className="hero__inner max-w-page mx-auto grid grid-cols-[1.2fr_1fr] gap-2xl items-center px-gutter py-4xl">
        <HeroText />
        <HeroApparatus />
      </div>
      
      <Container>
        <StatsRow />
      </Container>
      
      <MeterStrip id="telemetryRibbon" aria-label="signal readout" title="Interactive frequency ribbon: move cursor to ripple, click to pulse" />
    </section>
  );
}