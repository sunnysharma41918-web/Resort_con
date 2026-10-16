import weddingVideo from '../assets/Weeding Planner.mp4';
import banquetVideo from '../assets/Banquetbooking.mp4';
import resortsVideo from '../assets/Resorts.mp4';
import hotelsVideo from '../assets/Hotels.mp4';
import corporateVideo from '../assets/Corporate Event.mp4';
import destinationWeddingsVideo from '../assets/Destinations Wedding.mp4';
import managementVideo from '../assets/Managemnet Consulting.mp4';
import groupBookingVideo from '../assets/Group booking.mp4';

export const servicesData = [
  {
    id: 'wedding-planning',
    title: 'Wedding Planning',
    slug: 'wedding-planning',
    video: weddingVideo,
    category: 'Celebrations & Events',
    iconName: 'Sparkles',
    tagline: 'Personalized wedding planning, vendor coordination, venue selection, and seamless event execution',
    description: 'We orchestrate bespoke weddings that reflect your personal love story with timeless elegance. From initial conceptualization and venue selection to decor styling and day-of execution, our dedicated wedding specialists ensure every detail unfolds effortlessly.',
    benefits: [
      'Stress-free planning with a single dedicated wedding director',
      'Vetted network of premier florists, caterers, photographers, and entertainers',
      'Customized theme conception, 3D spatial layouts, and sensory decor',
      'Transparent budget structuring with no hidden vendor markups',
      'Flawless minute-by-minute day-of coordination and guest hospitality'
    ],
    offerings: [
      'Comprehensive wedding design, theme curation & moodboards',
      'Venue scouting, contract review & date negotiation',
      'Bespoke catering menu curation & sommelier tastings',
      'Sound, lighting, stage production & live entertainment management',
      'Guest invitation management, RSVPs, and personalized welcome kits',
      'Bridal party assistance and on-site hospitality desk'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Vision & Budget Discovery',
        description: 'We dive into your personal aesthetic, guest expectations, and financial parameters to build a cohesive wedding vision.'
      },
      {
        step: '02',
        title: 'Venue Selection & Design Concept',
        description: 'Shortlisting handpicked venues, securing preferential terms, and drafting comprehensive spatial and floral design blueprints.'
      },
      {
        step: '03',
        title: 'Vendor Alignment & Tastings',
        description: 'Auditioning caterers, photographers, musicians, and decor artisans to align with your exacting standards.'
      },
      {
        step: '04',
        title: 'On-Site Production & Execution',
        description: 'Our senior coordination team manages rehearsals, vendor timelines, and ceremony logistics for a seamless celebration.'
      }
    ],
    featured: true,
    stats: '150+ Bespoke Weddings Curated',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'banquet-booking-consultancy',
    title: 'Banquet Booking & Consultancy',
    slug: 'banquet-booking-consultancy',
    video: banquetVideo,
    category: 'Venue Advisory',
    iconName: 'Landmark',
    tagline: 'Assistance with banquet venue selection, event requirements, venue comparisons, and booking coordination',
    description: 'Finding the ideal banquet hall with the right capacity, acoustics, culinary flexibility, and fair contract terms requires professional insight. S4Consultancy evaluates properties, compares proposals side-by-side, and negotiates optimal booking terms on your behalf.',
    benefits: [
      'Unbiased comparison of premier banquet spaces and hotel ballrooms',
      'Preferential rate negotiation and contract clause protection',
      'Technical assessment of acoustics, pillar-less layouts, and lighting',
      'Catering flexibility and corkage agreement advisory',
      'Guaranteed compliance with capacity and fire safety norms'
    ],
    offerings: [
      'Detailed site inspection reports with spatial feasibility maps',
      'Comparative pricing matrix across top 5-star & heritage banquets',
      'Negotiation of minimum guaranteed spend, taxes, and complimentary perks',
      'Audio-visual infrastructure vetting and generator backup confirmation',
      'Menu tasting supervision and culinary SLA formulation',
      'Direct liaison with banquet sales directors and executive chefs'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Event Requirements Intake',
        description: 'Documenting guest count, seating preferences, culinary style, and AV specifications.'
      },
      {
        step: '02',
        title: 'Comparative Venue Analysis',
        description: 'Presenting a curated shortlist of venues with transparent cost-per-plate and inclusion comparisons.'
      },
      {
        step: '03',
        title: 'Contract Negotiation & Terms',
        description: 'Protecting your deposit, securing complimentary rooms or green rooms, and locking dates.'
      },
      {
        step: '04',
        title: 'Banquet Operations Handover',
        description: 'Aligning the property banquet captain with your event run-sheet for precise execution.'
      }
    ],
    featured: true,
    stats: '300+ Banquet Deals Negotiated',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'resorts',
    title: 'Resorts',
    slug: 'resorts',
    video: resortsVideo,
    category: 'Hospitality & Leisure',
    iconName: 'Palmtree',
    tagline: 'Resort discovery, property recommendations, venue consultancy, and hospitality solutions',
    description: 'Whether planning a restorative personal escape, a company buyout, or seeking advisory on resort facility optimization, S4Consultancy unlocks premier luxury and eco-resort properties globally. We match your expectations with vetted five-star service standards.',
    benefits: [
      'Curated portfolio of beachfront, mountain, forest, and desert sanctuaries',
      'Exclusive buyout arrangements and private wing reservations',
      'Verified ecological stewardship and five-star luxury standards',
      'Direct General Manager access and tailored experiential packages',
      'Specialized amenities for wellness, wellness spas, and family retreats'
    ],
    offerings: [
      'Private resort discovery and confidential site evaluations',
      'Full or partial resort buyout contract structuring',
      'Bespoke wellness, dining, and outdoor adventure itinerary design',
      'Villa allocation and VIP family accommodation zoning',
      'Sustainable and eco-certified property recommendations',
      'Operational guest service quality audits for resort owners'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Travel & Venue Profile Review',
        description: 'Understanding your desired geographic setting, privacy requirements, and wellness focus.'
      },
      {
        step: '02',
        title: 'Property Curation & Privileged Access',
        description: 'Shortlisting luxury resorts with confirmed availability, special concessions, and VIP perks.'
      },
      {
        step: '03',
        title: 'Itinerary & Experience Customization',
        description: 'Coordinating private chefs, spa treatments, excursions, and custom airport transfers.'
      },
      {
        step: '04',
        title: 'Arrival & Stay Supervision',
        description: 'Liaising directly with resort management to ensure immaculate stay delivery from arrival to departure.'
      }
    ],
    featured: true,
    stats: '85+ Luxury Resorts Partnered',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'hotel-stays',
    title: 'Hotel Stays',
    slug: 'hotel-stays',
    video: hotelsVideo,
    category: 'Accommodation',
    iconName: 'Hotel',
    tagline: 'Hotel selection, accommodation planning, and stay arrangements for individuals, families, and business travelers',
    description: 'Elevate every trip with thoughtfully curated hotel accommodations. From boutique architectural hotels in key cultural capitals to executive business suites and family interconnecting rooms, S4Consultancy manages every stay arrangement with meticulous attention.',
    benefits: [
      'Handpicked accommodations suited for corporate, leisure, and family travel',
      'Complimentary room upgrades and VIP welcoming touches where available',
      'Flexible booking terms, priority early check-in, and late check-out advocacy',
      'Personalized dietary and accessibility requirement coordination',
      'Dedicated support for itinerary adjustments and immediate room assistance'
    ],
    offerings: [
      'Executive suite and club-level room reservations',
      'Interconnecting family suites and child-friendly amenities',
      'Corporate negotiated rate access across global hospitality chains',
      'Long-stay serviced apartments and boutique lifestyle hotels',
      'Direct coordination of airport transfers and chauffeur services',
      'VIP concierge services for restaurant bookings and city experiences'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Stay Requirements Consultation',
        description: 'Identifying location convenience, room layout needs, budget tiers, and timing parameters.'
      },
      {
        step: '02',
        title: 'Curated Hotel Options',
        description: 'Presenting vetted hotels with verified reviews, prime safety records, and superior amenities.'
      },
      {
        step: '03',
        title: 'Reservation & VIP Preferences',
        description: 'Locking confirmed bookings with explicit guest preferences communicated to hotel management.'
      },
      {
        step: '04',
        title: 'Stay Concierge Monitoring',
        description: 'Overseeing smooth check-in and remaining on standby for any in-stay requests.'
      }
    ],
    featured: true,
    stats: '1,200+ Seamless Stays Managed',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    slug: 'corporate-events',
    video: corporateVideo,
    category: 'Corporate Hospitality',
    iconName: 'Briefcase',
    tagline: 'Professional corporate event planning, conferences, meetings, team gatherings, and business celebrations',
    description: 'We orchestrate high-impact corporate conferences, leadership retreats, annual general meetings, and brand launch galas. S4Consultancy pairs corporate polish with seamless hospitality logistics to ensure your brand message resonates with every delegate.',
    benefits: [
      'Turnkey management from concept through post-conference debrief',
      'Modern audio-visual production, livestreaming, and staging solutions',
      'Punctual schedule execution with seasoned event floor managers',
      'Curated networking environments and Michelin-grade executive dining',
      'Comprehensive delegate registration, badge printing, and logistics desk'
    ],
    offerings: [
      'Full conference production, keynote staging, and LED backdrop setup',
      'Executive breakout room setup and simultaneous translation services',
      'Corporate retreat choreography with team-building activities',
      'Gala dinner management, awards ceremonies, and live entertainment',
      'VIP executive transfers, security coordination, and green room hospitality',
      'Branded collateral design, attendee gift kits, and sponsor booth zoning'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Corporate Objective Alignment',
        description: 'Defining key event goals, audience demographics, branding guidelines, and run-sheet requirements.'
      },
      {
        step: '02',
        title: 'Venue Sourcing & Tech Blueprint',
        description: 'Securing state-of-the-art conference halls and drafting detailed AV, lighting, and stage floor plans.'
      },
      {
        step: '03',
        title: 'Production & Vendor Rehearsals',
        description: 'Testing cue-to-cue timing, teleprompters, presentation decks, and culinary service workflows.'
      },
      {
        step: '04',
        title: 'Live Event Direction',
        description: 'Our senior producers run the master control room and floor operations for flawless timing.'
      }
    ],
    featured: true,
    stats: '220+ Executive Summits Hosted',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'destination-weddings',
    title: 'Destination Weddings',
    slug: 'destination-weddings',
    video: destinationWeddingsVideo,
    category: 'Celebrations & Events',
    iconName: 'Plane',
    tagline: 'Destination selection, resort coordination, guest accommodation, logistics, and wedding event planning',
    description: 'Transform your wedding into a multi-day holiday experience for your loved ones in stunning destinations worldwide. S4Consultancy manages cross-border travel logistics, full resort buyouts, multi-ceremony choreography, and round-the-clock guest hospitality.',
    benefits: [
      'Comprehensive destination scouting across royal palaces, tropical beaches, and alpine lodges',
      'End-to-end guest travel coordination including charter transfers and room allocations',
      'Multi-day thematic itinerary design (Welcome Cocktails, Traditional Rites, Gala Receptions)',
      'Navigation of local vendor permits, import logistics, and cultural custom alignment',
      'Bilingual, experienced on-site coordination team stationed at the property'
    ],
    offerings: [
      'Destination feasibility analysis and resort buyout contract negotiations',
      'Guest travel desk, airport greeting, chartered coach transfers, and baggage handling',
      'Multi-function event production with bespoke sound, fireworks, and floral styling',
      'Exquisite multi-cuisine catering featuring regional specialties and dietary provisions',
      'Customized wedding hospitality suites with emergency amenities and styling assistance',
      'Post-wedding brunch coordination and departing guest logistics'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Dream Destination Scoping',
        description: 'Evaluating locations, climate patterns, connectivity, and resort buyout opportunities.'
      },
      {
        step: '02',
        title: 'Resort Contracting & Room Blocking',
        description: 'Securing favorable multi-night buyout rates, meal plans, and event space allocations.'
      },
      {
        step: '03',
        title: 'Cross-Border Event Production',
        description: 'Shipping specialty decor, booking headlining artists, and conducting on-site technical rehearsals.'
      },
      {
        step: '04',
        title: 'Multi-Day Guest Concierge',
        description: 'Stationing an on-site hospitality desk to take care of every guest need from landing to departure.'
      }
    ],
    featured: true,
    stats: '95+ Multi-Day Destination Weddings',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'management-consultancy',
    title: 'Management Consultancy',
    slug: 'management-consultancy',
    video: managementVideo,
    category: 'Advisory & Strategy',
    iconName: 'TrendingUp',
    tagline: 'Strategic consultancy for hospitality operations, property management, service improvement, and business development',
    description: 'Actionable advisory for hotel owners, resort developers, and hospitality investors. S4Consultancy provides forensic audits, Standard Operating Procedure (SOP) formulation, revenue optimization, and service culture training to maximize property asset value.',
    benefits: [
      'Diagnostic analysis identifying operational cost leakages and yield upside',
      'Standard Operating Procedures (SOPs) tailored for luxury guest touchpoints',
      'RevPAR and GOPPAR enhancement through dynamic distribution and pricing strategy',
      'Executive staff coaching, service culture audits, and mystery guest evaluations',
      'Independent owner representation during brand operator contract negotiations'
    ],
    offerings: [
      'Hospitality operational & financial diagnostic audits',
      'Pre-opening readiness audits and countdown project management',
      'Bespoke F&B concept design, menu re-engineering, and cost-control matrices',
      'Brand standards compliance inspections and guest sentiment recovery programs',
      'Operator RFP authoring, shortlisting, and Management Agreement (HMA) review',
      'Staff service training modules for front-of-house, housekeeping, and butler teams'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Forensic Property Audit',
        description: 'Deep-dive review of operational metrics, guest feedback, labor distribution, and vendor contracts.'
      },
      {
        step: '02',
        title: 'Strategic Action Blueprint',
        description: 'Delivering prioritized recommendations for cost rationalization, service upgrades, and yield growth.'
      },
      {
        step: '03',
        title: 'Implementation & Team Coaching',
        description: 'Hands-on roll-out of new SOPs, leadership coaching, and departmental alignment workshops.'
      },
      {
        step: '04',
        title: 'Review & Continuous Governance',
        description: 'Monthly KPI benchmarking, mystery guest evaluations, and sustained asset value monitoring.'
      }
    ],
    featured: true,
    stats: '45+ Properties Transformed',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'group-booking',
    title: 'Group Booking',
    slug: 'group-booking',
    video: groupBookingVideo,
    category: 'Accommodation & Logistics',
    iconName: 'Users',
    tagline: 'Coordinated hotel reservations and accommodation arrangements for families, corporate teams, wedding guests, and group travelers',
    description: 'Securing coordinated room blocks for large groups requires careful contract protection, attrition management, and synchronized guest communications. S4Consultancy negotiates wholesale group rates, manages rooming lists, and guarantees smooth group check-ins.',
    benefits: [
      'Negotiated wholesale group discounts with top-tier hotel chains and boutique resorts',
      'Protection against severe attrition fees and rigid cancellation clauses',
      'Centralized rooming list management eliminating confusion and double-bookings',
      'Dedicated group check-in desks and coordinated luggage distribution',
      'Seamless coordination of group dining, breakfast areas, and meeting suites'
    ],
    offerings: [
      'Multi-hotel availability searches and comparative rate bidding',
      'Contract negotiation with flexible room-drop dates and payment milestones',
      'Personalized digital rooming lists and attendee RSVP tracking',
      'Special requests management (adjoining rooms, diet preferences, early arrivals)',
      'Hospitality desk setup inside hotel lobbies for large delegate arrivals',
      'Consolidated master billing coordination with transparent itemized accounting'
    ],
    coordinationProcess: [
      {
        step: '01',
        title: 'Group Parameters & Date Locking',
        description: 'Assessing total room nights, peak nights, guest demographic, and location preferences.'
      },
      {
        step: '02',
        title: 'Competitive Hotel Bidding',
        description: 'Sourcing quotes from multiple properties to secure the strongest rates, comps, and concessions.'
      },
      {
        step: '03',
        title: 'Contract Signing & Room Allocation',
        description: 'Finalizing protected contract terms and uploading the verified attendee rooming roster.'
      },
      {
        step: '04',
        title: 'On-Site Group Arrival Management',
        description: 'Liaising with hotel front desk managers to ensure pre-keyed room packets and swift group check-in.'
      }
    ],
    featured: true,
    stats: '25,000+ Group Room Nights Booked',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop&q=80'
  }
];

export const consultingStats = [
  { value: '8', label: 'Core Hospitality Disciplines' },
  { value: '300+', label: 'Events & Banquets Delivered' },
  { value: '85+', label: 'Luxury Resorts & Hotels Partnered' },
  { value: '100%', label: 'Dedicated Client Satisfaction' }
];
