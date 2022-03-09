import React, { useState, FC } from 'react';
import { Dayjs } from 'dayjs';

import { DatePickerDate } from './DatePickerDate';
import { DatePickerTime } from './DatePickerTime';

export type DatePickerProps = {
  /** The scheduler name attached to hidden input */
  name: string;
  /** The selected date time */
  selected: Dayjs;
  /** Interval in days for time selection */
  dateInterval: number;
  /**  Interval in minutes for time selection */
  timeInterval: number;
  /** Show only the date picker(without time picker) */
  fullDay: boolean;
  /** Date format, see [dayjs docs](https://day.js.org/docs/en/display/format) */
  dateFormat: string;
  /** Time format, see [dayjs docs](https://day.js.org/docs/en/display/format) */
  timeFormat: string;
  /** Filter dates, it should return a boolean */
  icalFilter: (date: Dayjs) => boolean;
};

export const DatePicker: FC<DatePickerProps> = ({
  name,
  selected,
  dateInterval,
  timeInterval,
  dateFormat,
  timeFormat,
  fullDay,
  icalFilter,
}) => {
  const [date, setDate] = useState(selected);

  const handleChangeDate = (value: Dayjs) => {
    setDate((prevDate) =>
      prevDate
        .set('date', value.get('date'))
        .set('month', value.get('month'))
        .set('year', value.get('year')),
    );
  };

  const handleChangeTime = (value: Dayjs) => {
    setDate((prevDate) => prevDate.set('minute', value.get('minute')).set('hour', value.get('hour')));
  };

  return (
    <div className={`mml-datepicker mml-datepicker--${fullDay ? 'single' : 'double'}`}>
      <input name={name} value={date.toISOString()} type="hidden" />

      <DatePickerDate
        icalFilter={icalFilter}
        format={dateFormat}
        value={date}
        onChange={handleChangeDate}
        interval={dateInterval}
      />

      {!fullDay && (
        <DatePickerTime
          icalFilter={icalFilter}
          format={timeFormat}
          value={date}
          onChange={handleChangeTime}
          interval={timeInterval}
        />
      )}
    </div>
  );
};
