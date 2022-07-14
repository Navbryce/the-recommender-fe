type RouteDefinitions = {
  [route: string]: {
    path: string;
    payloadField?: string;
    routes?: RouteDefinitions;
  };
};

export const ROUTES: RouteDefinitions = {
  searchSession: {
    path: 'search-session',
    payloadField: 'searchSession',
  },
  election: {
    path: 'rcv',
    payloadField: 'election',
    routes: {
      vote: {
        path: 'vote',
      },
      wait: {
        path: 'wait',
      },
    },
  },
};
