import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Home', href: getPermalink('/') },
    { text: 'Research', href: getPermalink('/research') },
    { text: 'News', href: getPermalink('/news') },
    { text: 'Publications', href: getPermalink('/publications') },
    { text: 'Team', href: getPermalink('/team') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Join the Lab', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Research', href: getPermalink('/research') },
        { text: 'News', href: getPermalink('/news') },
        { text: 'Publications', href: getPermalink('/publications') },
      ],
    },
    {
      title: 'People',
      links: [
        { text: 'Team', href: getPermalink('/team') },
        { text: 'Join the Lab', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: 'Email', href: 'mailto:pi@lab.example.edu' },
        { text: 'Department', href: '#' },
      ],
    },
    {
      title: 'Affiliations',
      links: [
        { text: 'University of Rochester', href: 'https://www.rochester.edu/' },
        {
          text: 'Chemical and Sustainability Engineering (UofR)',
          href: 'https://www.hajim.rochester.edu/che/index.html',
        },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com' },
    { ariaLabel: 'Google Scholar', icon: 'tabler:school', href: '#' },
  ],
  footNote: `
    Built with Astro, based on AstroWind design patterns. &copy; Basdogan Lab.
  `,
};
