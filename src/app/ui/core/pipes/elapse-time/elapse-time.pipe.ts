import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

@Pipe({
  name: 'kidoElapseTime',
})
export class ElapseTimePipe implements PipeTransform {
  transform(v: number) {
    const now = new Date();
    const date = new Date(v);

    const years = differenceInYears(now, date);
    const months = differenceInMonths(now, date);
    const weeks = differenceInWeeks(now, date);
    const days = differenceInDays(now, date);
    const hrs = differenceInHours(now, date);
    const mins = differenceInMinutes(now, date);
    let dateStr = '';

    if (years >= 1) {
      dateStr = `${years} year${this.getPlural(years)} ago`;
    } else if (months >= 1) {
      dateStr = `${months} month${this.getPlural(months)} ago`;
    } else if (weeks >= 1) {
      dateStr = `${weeks} week${this.getPlural(weeks)} ago`;
    } else if (days >= 1) {
      dateStr = `${days} day${this.getPlural(days)} ago`;
    } else if (hrs >= 1) {
      dateStr = `${hrs} hour${this.getPlural(hrs)} ago`;
    } else if (mins >= 1) {
      dateStr = `${mins} minute${this.getPlural(mins)} ago`;
    } else {
      dateStr = 'now';
    }

    return dateStr;
  }

  private getPlural(v: number) {
    return v > 1 ? 's' : '';
  }
}
