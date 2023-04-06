export interface ShowResponse {
  url: string;
  image: string;
  name: string;
  language: string;
  genres: string[];
  premiered: Date;
  ended: Date;
  status: string;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
    };
    officialSite: string;
  };
}
