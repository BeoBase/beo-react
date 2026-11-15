// Flat list of apps. Each button from the old BoxesHome.ts is now its own app.
// - `tag`  : replaces the old group title (folder)
// - `href` : external link
// - `to`   : internal route / link placeholder
export type AppData = {
  name: string;
  tag: string;
  href?: string;
  to?: string;
};

export const appsData: AppData[] = [
  // Developments
  {
    name: 'Jira Board',
    tag: 'Developments',
    href: 'https://bellamyphan.atlassian.net/jira/software/projects/BEO/boards/139/backlog',
  },
  {
    name: 'Confluence Home',
    tag: 'Developments',
    href: 'https://bellamyphan.atlassian.net/wiki/spaces/BB/overview',
  },
  {
    name: 'React Github',
    tag: 'Developments',
    href: 'https://github.com/BeoBase/beo-react',
  },
  {
    name: 'Spring Github',
    tag: 'Developments',
    href: 'https://github.com/BeoBase/beo-spring',
  },
  {
    name: 'Database Github',
    tag: 'Developments',
    href: 'https://github.com/BeoBase/beo-database',
  },

  // Cashflow Tracking
  {name: '[TEMP] User Input', tag: 'Cashflow Tracking', to: 'user-input'},
  {name: '[TEMP] Location Picker', tag: 'Cashflow Tracking', to: 'location-picker'},
  {name: '[TEMP] User App', tag: 'Cashflow Tracking', to: 'user'},
  {name: '[TEMP] Counter App', tag: 'Cashflow Tracking', to: 'counter'},
  {name: '[TEMP] React Quiz', tag: 'Cashflow Tracking', to: 'quiz'},
  {name: 'Transaction', tag: 'Cashflow Tracking', to: 'linkhere.com'},
  {name: 'Bank', tag: 'Cashflow Tracking', to: 'linkher2.com'},
  {name: 'Budget', tag: 'Cashflow Tracking', to: 'linkher2.com'},

  // Financial Liability
  {name: 'Credit Card', tag: 'Financial Liability', to: 'linkhere.com'},
  {name: 'Personal Loan', tag: 'Financial Liability', to: 'linkhere.com'},
  {name: 'Student Loan', tag: 'Financial Liability', to: 'linkhere.com'},
  {name: 'Car Loan', tag: 'Financial Liability', to: 'linkhere.com'},
  {name: 'Mortgage', tag: 'Financial Liability', to: 'linkhere.com'},

  // Financial Health and Assets
  {name: 'Credit Score', tag: 'Financial Health and Assets', to: 'linkher2.com'},
  {name: 'Investment', tag: 'Financial Health and Assets', to: 'linkher2.com'},
  {name: 'Net Worth', tag: 'Financial Health and Assets', to: 'linkher2.com'},
  {name: 'Home', tag: 'Financial Health and Assets', to: 'linkhere.com'},
  {name: 'Car', tag: 'Financial Health and Assets', to: 'linkhere.com'},
  {name: 'Boat', tag: 'Financial Health and Assets', to: 'linkhere.com'},

  // AI Chatbox
  {name: 'Local Model', tag: 'AI Chatbox', to: 'linkhere.com'},
  {name: 'Cloud Model', tag: 'AI Chatbox', to: 'linkher2.com'},

  // Mini Games
  {name: 'Game 1', tag: 'Mini Games', to: 'linkhere.com'},
  {name: 'Game 2', tag: 'Mini Games', to: 'linkher2.com'},
];
