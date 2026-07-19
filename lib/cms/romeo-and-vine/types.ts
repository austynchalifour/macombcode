export type DietaryTag = "vegetarian" | "gluten-free";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary: DietaryTag[];
};

export type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export type DailySpecial = {
  id: string;
  label: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};

export type RestaurantInfo = {
  name: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  hours: {
    tueSat: string;
    sun: string;
    closed: string;
  };
};

export type MenuDocument = {
  restaurant: RestaurantInfo;
  updatedAt: string;
  dailySpecials: DailySpecial[];
  sections: MenuSection[];
};
