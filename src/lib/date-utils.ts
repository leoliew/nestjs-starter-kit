import * as _ from 'lodash';
import * as Moment from 'moment-timezone';
import * as process from 'process';

class DateUtil {
  private readonly timezone: string;
  constructor() {
    this.timezone = process.env.TZ || 'Australia/Perth';
  }

  /**
   * Get current time's Moment object with timezone
   * @param time
   * @returns {Moment.Moment}
   */
  getCurrentMoment(time?: any): Moment.Moment {
    return Moment.tz(time, this.timezone);
  }

  /**
   * Get current time of type Date
   *
   * @param {any} time
   * @return {Date} current time
   */
  getCurrentTime(time?: any): Date {
    return this.getCurrentMoment(time).toDate();
  }

  /**
   * Get current time of type timestamp
   *
   * @param {any} time
   * @return {number} current time
   */
  getCurrentTimestamp(time?: any): number {
    return this.getCurrentMoment(time).valueOf();
  }

  /**
   * Get current time of type seconds
   * @param time
   * @returns {number}
   */
  getCurrentSecondsStamp(time?: any): number {
    return Math.floor(this.getCurrentTimestamp(time) / 1000);
  }

  /**
   * Get current time of type formatted string
   * @param time
   * @param format
   * @returns {string}
   */
  formatTime(time?: any, format?: any): string {
    return this.getCurrentMoment(time).format(format || 'YYYY-MM-DD');
  }

  /**
   * Get date format string
   * @param date
   * @param format
   * @returns {string}
   */
  getTimeFromFormat(date: Moment.MomentInput, format?: any): Moment.Moment {
    return Moment(date, format || 'YYYY-MM-DD');
  }

  /**
   * Get timestamp of the start of today
   * @param time
   * @returns {number}
   */
  getTodayStartTimestamp(time?: any): number {
    return this.getCurrentMoment(time).startOf('day').valueOf();
  }

  /**
   * Get today end timestamp
   * @param time
   * @returns {number}
   */
  getTodayEndTimestamp(time?: any): number {
    return this.getCurrentMoment(time).endOf('day').valueOf();
  }

  /**
   * Get x days ago time
   * @param days
   * @param time
   */
  getXDaysAgoDate(days = 1, time?: Date): Date {
    return this.getCurrentMoment(time).subtract(days, 'days').toDate();
  }

  /**
   * Get current time of the start of today
   * @param days
   * @param time
   */
  getXDaysAgoStartDate(days = 1, time?: any): Date {
    return this.getCurrentMoment(time)
      .subtract(days, 'days')
      .startOf('day')
      .toDate();
  }

  /**
   * Get current time of the start of today
   * @param days
   * @param time
   */
  getXDaysAgoEndDate(days = 1, time?: any): Date {
    return this.getCurrentMoment(time)
      .subtract(days, 'days')
      .endOf('day')
      .toDate();
  }
  /**
   * Get current time of the start of today
   * @param days
   * @param time
   */
  getXDaysAfterStartDate(days = 1, time?: any): Date {
    return this.getCurrentMoment(time)
      .add(days, 'days')
      .startOf('day')
      .toDate();
  }

  /**
   * Get current time of the start of today
   * @param days
   * @param time
   */
  getXDaysAfterEndDate(days = 1, time?: any): Date {
    return this.getCurrentMoment(time).add(days, 'days').endOf('day').toDate();
  }

  /**
   * Get current time of the start of today
   * @param hours
   * @param time
   */
  getXHoursAgoDate(hours = 1, time?: any): Date {
    return this.getCurrentMoment(time).subtract(hours, 'hours').toDate();
  }

  /**
   * Get current time of the start of today
   * @param hours
   * @param time
   */
  getXHoursAfterDate(hours = 1, time?: any): Date {
    return this.getCurrentMoment(time).add(hours, 'hours').toDate();
  }

  /**
   * Get current time of the start of today
   * @param minutes
   * @param time
   */
  getXMinutesAgoDate(minutes = 1, time?: Date): Date {
    return this.getCurrentMoment(time).subtract(minutes, 'minutes').toDate();
  }

  /**
   * Get x minutes after date
   * @param minutes
   * @param time
   */
  getXMinutesAfterDate(minutes = 1, time?: any): Date {
    return this.getCurrentMoment(time).add(minutes, 'minutes').toDate();
  }

  /**
   * Get x seconds ago date
   * @param seconds
   * @param time
   */
  getXSecondsAgoDate(seconds = 1, time?: any): Date {
    return this.getCurrentMoment(time).subtract(seconds, 'seconds').toDate();
  }

  /**
   * Get x seconds after date
   * @param seconds
   * @param time
   */
  getXSecondsAfter(seconds = 1, time?: any): Date {
    return this.getCurrentMoment(time).add(seconds, 'seconds').toDate();
  }

  /**
   * Get x days after date
   * @param days
   * @param time
   */
  getXDaysAfterDate(days = 1, time?: undefined): Date {
    return this.getCurrentMoment(time).add(days, 'days').endOf('days').toDate();
  }

  /**
   * Get x days after date
   * @param months
   * @param time
   */
  getXMonthsAfterDate(months = 1, time?: any): Date {
    return this.getCurrentMoment(time)
      .add(months, 'months')
      .endOf('days')
      .toDate();
  }

  /**
   * Get x days after start date
   * @param days
   * @param time
   */
  getXDaysAfterNextDayStartDate(days = 1, time?: any): Date {
    return this.getCurrentMoment(time)
      .add(days + 1, 'days')
      .startOf('days')
      .toDate();
  }

  /**
   * Get x days after start date
   * @param time
   */
  getTodayStartDate(time?: any): Date {
    return this.getCurrentMoment(time).startOf('day').toDate();
  }

  /**
   * Get today start moment
   * @param time
   */
  getTodayStartMoment(time?: Moment.Moment | Date): Moment.Moment {
    return this.getCurrentMoment(time).startOf('day');
  }

  /**
   * Get date range of start and end
   * @param startTime
   * @param endTime
   * @param type
   */
  diff(startTime: any, endTime: any, type?: any): number {
    const start = this.getCurrentMoment(startTime);
    const end = this.getCurrentMoment(endTime);
    return end.diff(start, type || 'days');
  }

  /**
   * Get today end date
   * @param time
   */
  getTodayEndDate(time?: any): Date {
    return this.getCurrentMoment(time).endOf('day').toDate();
  }

  /**
   * Get today end moment
   * @param time
   */
  getTodayEndMoment(time?: any): Moment.Moment {
    return this.getCurrentMoment(time).endOf('day');
  }

  /**
   * Get this month start time
   * @returns {Date}
   */
  getThisMonthStartDate(): Date {
    return this.getCurrentMoment().startOf('month').toDate();
  }

  /**
   * Get this month end time
   * @returns {Date}
   */
  getThisMonthEndDate(): Date {
    return this.getCurrentMoment().endOf('month').toDate();
  }

  /**
   * Get one month range
   * @param time
   */
  getOneMonthRange(time: any): any {
    const startTime = this.getCurrentMoment(time)
      .subtract(1, 'months')
      .toDate();
    const endTime = this.getCurrentMoment(time).toDate();
    return { $gte: startTime, $lte: endTime };
  }

  /**
   * Get range of x days ago
   * @param range
   * @param agoDays
   * @param time
   * @returns {{gte: Date, lte: Date}}
   */
  getXDayRange(range = 1, agoDays = 0, time?: any): any {
    const date = this.getXDaysAgoDate(agoDays, time);
    return {
      $gte: this.getXDaysAgoDate(range, date),
      $lte: date,
    };
  }

  /**
   * Get forever date
   * @returns {Date}
   */
  getForeverDate(): Date {
    return new Date('9999/01/01');
  }

  /**
   * Get days diff
   * @param start
   * @param end
   */
  getDaysDiff(start: Moment.Moment | Date, end: Moment.Moment | Date): number {
    start = this.getTodayStartMoment(start);
    end = this.getTodayStartMoment(end);
    return end.diff(start, 'days');
  }

  /**
   * Get months diff
   * @param start
   * @param end
   */
  getMonthsDiff(
    start: Moment.Moment | Date,
    end: Moment.Moment | Date,
  ): number {
    start = this.getTodayStartMoment(start);
    end = this.getTodayStartMoment(end);
    return end.diff(start, 'months');
  }

  /**
   * Get current time of type string
   * @param date
   */
  isWorkDay(date = new Date()): boolean {
    const days = [1, 2, 3, 4, 5];
    return _.includes(days, date.getDay());
  }

  /**
   * Get current time of type string
   * @returns {boolean}
   */
  isWorkTime(): boolean {
    const hour = this.getCurrentMoment().hours();
    return hour >= 9 && hour <= 20;
  }
}

export default new DateUtil();
