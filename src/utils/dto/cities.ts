import { CityName } from '../../common/models/auth/candidate/CityName';

export type CityDto = {
  cityId: string;
  cityName: string;
  cityCountrySlug: string;
  cityCountryName: string;
  cityTimezone: number;
  type: string;
};

const CITY: Record<CityName, CityDto> = {
  Kharkiv: {
    cityId: 'ChIJiw-rY5-gJ0ERCr6kGmgYTC0',
    cityName: 'Kharkiv',
    cityCountrySlug: 'UA',
    cityCountryName: 'Ukraine',
    cityTimezone: 180,
    type: 'CANDIDATE_CITY',
  },
  Kyiv: {
    cityId: 'ChIJBUVa4U7P1EAR_kYBF9IxSXY',
    cityName: 'Kyiv',
    cityCountryName: 'Ukraine',
    cityCountrySlug: 'UA',
    cityTimezone: 180,
    type: 'CANDIDATE_CITY',
  },
};

export const getCities = (cityNames: Array<CityName>) =>
  cityNames.map((cityName) => CITY[cityName]);
