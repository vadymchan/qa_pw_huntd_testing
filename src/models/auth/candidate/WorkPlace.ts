import { formatDate } from '../../../utils/format/formatDate';
import { Month } from './Month';

export type WorkPlace = {
  role: string;
  companyName: string;
  description: string;
  startMonth: Month;
  startYear: number;
  endMonth: Month;
  endYear: number;
  achievements: string;
};

export type WorkPlaceDto = {
  title: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  achievements: string;
};

export function toWorkPlaceDto(workPlace: WorkPlace): WorkPlaceDto {
  return {
    title: workPlace.role,
    companyName: workPlace.companyName,
    description: workPlace.description,
    startDate: formatDate(workPlace.startMonth, workPlace.startYear),
    endDate: formatDate(workPlace.endMonth, workPlace.endYear),
    achievements: workPlace.achievements,
  };
}
