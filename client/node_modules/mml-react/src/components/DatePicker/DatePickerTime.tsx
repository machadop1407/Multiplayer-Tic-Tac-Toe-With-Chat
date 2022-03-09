import React, { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { DatePickerProps } from './DatePicker';
import { DatePickerSelect, DatePickerSelectProps, DatePickerSelectReadyProps } from './DatePickerSelect';

dayjs.extend(isBetween);

export type DatePickerTimeProps = DatePickerSelectReadyProps & {
  format: NonNullable<DatePickerProps['timeFormat']>;
  interval: NonNullable<DatePickerProps['timeInterval']>;
};

/**
 * Get item data
 */
const getItemData: DatePickerSelectProps['getItemData'] = (props) => {
  const { idx, interval, value, format } = props;
  const newValue =
    idx >= 0 ? dayjs(value).add(idx * interval, 'minute') : dayjs(value).subtract(idx * -1 * interval, 'minute');

  return {
    idx,
    value: newValue,
    displayValue: dayjs(newValue).format(format),
    isSelected: (currentValue: Dayjs) =>
      dayjs(newValue).isBetween(currentValue, dayjs(currentValue).add(interval - 1, 'minute'), 'minute', '[]'),
  };
};

/**
 * DatePicker time
 */
export const DatePickerTime: FC<DatePickerTimeProps> = (props) => (
  <div className="mml-datepicker__select mml-datepicker__time">
    <DatePickerSelect {...props} itemClassName="mml-datepicker__item--time" getItemData={getItemData} />
  </div>
);
