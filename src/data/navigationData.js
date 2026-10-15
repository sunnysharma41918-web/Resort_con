export const navigationData = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  {
    id: 'about',
    label: 'About Us',
    path: '/about'
  },
  {
    id: 'standard',
    label: 'The Standard',
    path: '/standard'
  },
  {
    id: 'consultancy-services',
    label: 'Our Services',
    path: '/services',
    isExpandable: true,
    children: [
      {
        id: 'wedding-planning',
        label: 'Wedding Planning',
        path: '/services/wedding-planning'
      },
      {
        id: 'banquet-booking-consultancy',
        label: 'Banquet Booking & Consultancy',
        path: '/services/banquet-booking-consultancy'
      },
      {
        id: 'resorts',
        label: 'Resorts',
        path: '/services/resorts'
      },
      {
        id: 'hotel-stays',
        label: 'Hotel Stays',
        path: '/services/hotel-stays'
      },
      {
        id: 'corporate-events',
        label: 'Corporate Events',
        path: '/services/corporate-events'
      },
      {
        id: 'destination-weddings',
        label: 'Destination Weddings',
        path: '/services/destination-weddings'
      },
      {
        id: 'management-consultancy',
        label: 'Management Consultancy',
        path: '/services/management-consultancy'
      },
      {
        id: 'group-booking',
        label: 'Group Booking',
        path: '/services/group-booking'
      }
    ]
  },
  {
    id: 'industries',
    label: 'Hospitality Sectors',
    path: '/projects',
    isExpandable: true,
    children: [
      {
        id: 'hotels-resorts',
        label: 'Hotels & Luxury Resorts',
        path: '/projects?sector=hotels-resorts'
      },
      {
        id: 'wedding-venues',
        label: 'Wedding & Social Venues',
        path: '/projects?sector=wedding-venues'
      },
      {
        id: 'banquets-ballrooms',
        label: 'Banquet Halls & Ballrooms',
        path: '/projects?sector=banquets-ballrooms'
      },
      {
        id: 'corporate-mice',
        label: 'Corporate Conferences & MICE',
        path: '/projects?sector=corporate-mice'
      },
      {
        id: 'destination-retreats',
        label: 'Destination Sanctuaries',
        path: '/projects?sector=destination-retreats'
      }
    ]
  },
  {
    id: 'projects',
    label: 'Our Portfolio',
    path: '/projects'
  },
  {
    id: 'blog',
    label: 'Hospitality Insights',
    path: '/blog'
  },
  {
    id: 'contact',
    label: 'Contact Us',
    path: '/contact'
  }
];

export const consultationCTA = {
  label: 'Book Consultation',
  path: '/contact',
  description: 'Discuss wedding planning, corporate events, hotel bookings, or hospitality consultancy with S4Consultancy.'
};
