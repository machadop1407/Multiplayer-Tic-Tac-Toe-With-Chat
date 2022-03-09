import React, { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { DatePickerProps } from './DatePicker';
import { DatePickerSelect, DatePickerSelectReadyProps, DatePickerSelectProps } from './DatePickerSelect';

export type DatePickerDateProps = DatePickerSelectReadyProps & {
  format: NonNullable<DatePickerProps['dateFormat']>;
  interval: NonNullable<DatePickerProps['dateInterval']>;
};

/**
 * Get item data
 */
const getItemData: DatePickerSelectProps['getItemData'] = (props) => {
  const { idx, interval, value, format } = props;
  const newValue =
    idx >= 0
      ? dayjs(value).add(idx * (interval * 24), 'hour')
      : dayjs(value).subtract(idx * (interval * 24) * -1, 'hour');

  return {
    idx,
    value: newValue,
    displayValue: dayjs(newValue).format(format),
    isSelected: (currentValue: Dayjs) =>
      dayjs(newValue).isSame(interval === 1 ? dayjs(currentValue) : dayjs(currentValue).add(interval, 'day'), 'date'),
  };
};

/**
 * DatePicker date
 */
export const DatePickerDate: FC<DatePickerDateProps> = (props) => (
  <div className="mml-datepicker__select mml-datepicker__date">
    <DatePickerSelect {...props} itemClassName="mml-datepicker__item--day" getItemData={getItemData} />
  </div>
);
