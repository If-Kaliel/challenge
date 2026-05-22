import type { ReactNode } from 'react';

interface PageHeroProps {
  badge?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  layout?: 'stack' | 'split';
}

interface SectionHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  accentClassName?: string;
}

export function PageHero({
  badge,
  title,
  description,
  actions,
  children,
  layout = 'stack',
}: PageHeroProps) {
  const isSplit = layout === 'split';

  return (
    <section
      className={`relative overflow-hidden bg-hero-gradient text-white rounded-2xl mb-6 sm:mb-7 shadow-lg ${
        isSplit
          ? 'px-4 py-8 xs:px-6 xs:py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-16 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14'
          : 'px-4 py-8 xs:px-6 xs:py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-16 text-center'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-overlay" />

      <div className={`relative z-10 ${isSplit ? 'flex-1 min-w-0 text-center lg:text-left' : 'max-w-4xl mx-auto'}`}>
        {badge && (
          <span className="inline-block bg-accent/15 text-accent border border-accent/35 rounded-full px-4 py-1 text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-3 xs:mb-4">
            {badge}
          </span>
        )}
        <h1
          className={`font-extrabold leading-tight mb-3 xs:mb-4 ${
            isSplit
              ? 'text-[1.7rem] xs:text-[2rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.6rem]'
              : 'text-[1.8rem] xs:text-[2rem] sm:text-[2.3rem] md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3rem]'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`text-white/85 leading-[1.7] mx-auto ${isSplit ? 'max-w-120 sm:max-w-130 lg:mx-0' : 'max-w-170'} text-[0.9rem] xs:text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem]`}
          >
            {description}
          </p>
        )}
        {actions && <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">{actions}</div>}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-hero-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-black/12" />

      {children && (
        <div className={`relative z-10 ${isSplit ? 'w-full xs:w-[90%] sm:w-75 md:w-82.5 lg:w-85 xl:w-90 shrink-0' : 'mt-7'}`}>
          {children}
        </div>
      )}
    </section>
  );
}

export function SectionHeader({ title, description, accentClassName = 'border-primary' }: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <h2 className={`font-bold text-brand-text mb-1 border-l-4 pl-3.5 text-[1.2rem] sm:text-[1.35rem] lg:text-[1.5rem] ${accentClassName}`}>
        {title}
      </h2>
      {description && <p className="text-brand-text/70 text-[0.85rem] mb-0 pl-4.5">{description}</p>}
    </div>
  );
}
