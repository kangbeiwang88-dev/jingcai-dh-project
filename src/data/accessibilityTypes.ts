export type AccessibilityFeatureKey = "entrance" | "desk" | "wheelchair" | "toilet" | "signage" | "parking";

export type AccessibilityFeatures = Record<AccessibilityFeatureKey, boolean>;

export type AccessiblePlaceFull = {
  id: string;
  name: string;
  category: string;
  district: string;
  address: string;
  postcode: string;
  phone: string;
  email: string;
  page: number;
  image: string;
  gallery: string[];
  ticket: string;
  openTime: string;
  summary: string;
  route: string;
  features: AccessibilityFeatures;
  sourceNote: string;
};

export type AccessibleRouteFull = {
  id: string;
  name: string;
  audience: string;
  page: number;
  image: string;
  tags: string[];
  stops: {
    time: string;
    place: string;
    highlight: string;
    image: string;
  }[];
};
