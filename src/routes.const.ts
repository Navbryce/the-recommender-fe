export const ROUTES: {
  [path: string]: {
    path: string;
    payloadField: string;
  };
} = {
  searchSession: {
    path: 'search-session',
    payloadField: 'searchSession',
  },
  electionOverview: {
    path: 'rcv',
    payloadField: 'electionOverview',
  },
};
