export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface PortfolioItem {
  category: string;
  title: string;
  location: string;
  categoryKey: string;
  titleKey: string;
  locationKey: string;
}

export interface Testimonial {
  initials: string;
  nameKey: string;
  roleKey: string;
  textKey: string;
}

export interface Service {
  icon: string;
  titleKey: string;
  descKey: string;
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface Translations {
  nav: {
    portfolio: string;
    about: string;
    services: string;
    contact: string;
    bookSession: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    subtitle: string;
    viewPortfolio: string;
    bookSession: string;
    stats: { label: string; value: string }[];
    trust: string;
    brands: string[];
    scroll: string;
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    quote: string;
    stats: { number: string; label: string }[];
  };
  portfolio: {
    label: string;
    title: string;
    desc: string;
    all: string;
    items: {
      category: string;
      title: string;
      location: string;
      categoryKey: string;
      titleKey: string;
      locationKey: string;
    }[];
    cta: string;
  };
  services: {
    label: string;
    title: string;
    desc: string;
    items: { title: string; desc: string; icon: string }[];
  };
  testimonials: {
    label: string;
    title: string;
    items: { initials: string; name: string; role: string; text: string }[];
  };
  contact: {
    label: string;
    title: string;
    desc: string;
    email: string;
    phone: string;
    location: string;
    form: {
      name: string;
      email: string;
      service: string;
      eventDate: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      networkError: string;
    };
    services: { value: string; label: string }[];
  };
  footer: {
    text: string;
    heart: string;
  };
}
