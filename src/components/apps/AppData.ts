// One app as sent by the backend (GET /apps)
export type RouteType = "INTERNAL" | "EXTERNAL";

export type AppData = {
  id: string;
  name: string;
  // An app can belong to several tags (folders)
  tags: string[];
  // INTERNAL: a page inside this React app (router path). EXTERNAL: a full URL.
  route: string;
  routeType: RouteType;
};
