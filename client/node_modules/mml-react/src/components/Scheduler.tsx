import React, { useState, useEffect, FC } from 'react';
// @ts-ignore
import IcalExpander from 'ical-expander';
import dayjs, { Dayjs } from 'dayjs';

import { DatePicker } from './DatePicker';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { Error as ErrorComponent } from './Error';
import { Loading as LoadingComponent } from './Loading';

export type SchedulerProps = {
  /**
   * The scheduler name attached to hidden input
   */
  name: string;
  /**
   * The selected date, it must be a valid parseable date string
   */
  selected?: string;
  /**
   * Interval in days for day selection
   * @default 1
   */
  dateInterval?: number;
  /**
   * Interval in minutes for time selection
   * @default 30
   */
  timeInterval?: number;
  /**
   * Date format, see [dayjs docs](https://day.js.org/docs/en/display/format)
   * @default 'ddd MMM DD'
   */
  dateFormat?: string;
  /**
   * Time format, see [dayjs docs](https://day.js.org/docs/en/display/format)
   * @default 'hh:mm A'
   */
  timeFormat?: string;
  /**
   * The duration of the event in minutes, used to check availability with ical
   * @default 30
   */
  duration?: number;
  /**
   * ICal availability public URL
   */
  icalAvailability?: string;
  /**
   * Show only the date picker(without time picker) if events lasts a whole day
   * @default false
   */
  fullDay?: boolean;
};

export type ICalFilter = (start?: Dayjs) => boolean;

const setupIcalFilter = async (icalURL: string, duration: number) => {
  const response = await fetch(icalURL, { method: 'GET', redirect: 'follow', credentials: 'same-origin' });
  const body = await response.text();
  if (!response.ok) throw new Error(body);

  const icalExpander = new IcalExpander({ ics: body, maxIterations: 10 });

  return () => (start?: Dayjs) => {
    if (!start) return true;
    const { events } = icalExpander.between(start.toDate(), start.add(duration, 'minute').toDate());
    return !events.length;
  };
};

export const Scheduler: FC<SchedulerProps> = ({
  name,
  selected,
  icalAvailability,
  duration = 30,
  dateInterval = 1,
  timeInterval = 30,
  dateFormat = 'ddd MMM DD',
  timeFormat = 'hh:mm A',
  fullDay = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [icalFilter, setIcalFilter] = useState<ICalFilter>(() => () => true);

  useEffect(() => {
    if (!icalAvailability) return;

    setLoading(true);
    setupIcalFilter(icalAvailability, duration)
      .then(setIcalFilter)
      .catch((err) => {
        console.warn('loading ical failed', { icalAvailability, err });
        setError('iCal availability could not be loaded');
      })
      .finally(() => setLoading(false));
  }, [icalAvailability, duration]);

  return (
    <Card className="mml-scheduler">
      <CardHeader icon="date_range" text="Scheduler" />
      <CardBody>
        {error && !loading && <ErrorComponent error={`Failed, error: ${error}`} />}
        {!error && loading && <LoadingComponent loading={true} text="Loading availability" />}
        {!error && !loading && (
          <DatePicker
            name={name}
            selected={selected ? dayjs(selected) : dayjs().startOf('hour')}
            dateInterval={dateInterval}
            timeInterval={timeInterval}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            fullDay={fullDay}
            icalFilter={icalFilter}
          />
        )}
      </CardBody>
    </Card>
  );
};
