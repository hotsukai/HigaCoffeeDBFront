export type User = {
  id: number;
  name: string;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ExtractionMethod = {
  id: number;
  name: string;
};
export type Bean = {
  id: number;
  name: string;
};
export type Mesh = {
  id: number;
  name: string;
};

export type Coffee = {
  id: number;
  createdAt: Date;
  bean: Bean;
  dripper: User | null;
  drinkers: Array<User> | null;
  extractionTime: number;
  extractionMethod: ExtractionMethod | null;
  mesh: Mesh | null;
  memo: string;
  powderAmount: number;
  reviewId: Array<number>;
  waterAmount: number;
  waterTemperature: number;
};

export type Review = {
  id: number | null;
  bitterness: number;
  coffee: Coffee;
  feeling: string;
  reviewer: User;
  situation: number;
  strongness: number;
  wantRepeat: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};
