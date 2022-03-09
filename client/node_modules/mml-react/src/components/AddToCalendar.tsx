import React, { FC, ReactElement, SyntheticEvent } from 'react';
import dayjs from 'dayjs';

import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { ButtonList } from './ButtonList';

type SvgIconProps = {
  /** The SVG path, calibrated for a 24 sized viewBox (as in Material Icons) */
  path: string;
};

/**
 * Utility to have custom svg icons outside the `material-icons` system provided by the Icon component
 * Use case internal to this library is the AddToCalendar component which needs brand icons which are not
 * included in [the default material-icons set and probably never will be](https://git.io/Jk9yH)
 */
const SvgIcon: FC<SvgIconProps> = ({ path }) => (
  <i className="mml-icon">
    <svg className="mml-icon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </i>
);

/** Icon path from https://materialdesignicons.com/ */
const IconGoogle = (
  <SvgIcon path="M21.35 11.1h-9.17v2.73h6.5c-.33 3.8-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.1 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.1 0-1.15-.15-1.8-.15-1.8h0z" />
);

/** Icon path from https://materialdesignicons.com/ */
const IconMicrosoft = (
  <SvgIcon path="M3 12V6.75l6-1.32v6.48L3 12m17-9v8.75l-10 .15V5.2L20 3M3 13l6 .1v6.8l-6-1.15V13m17 .25V22l-10-1.9v-7l10 .15z" />
);

/** Icon path from https://materialdesignicons.com/ */
const IconApple = (
  <SvgIcon path="M18.7 19.5c-.83 1.24-1.7 2.45-3.05 2.47-1.34.03-1.77-.8-3.3-.8-1.53 0-2 .77-3.27.82-1.3.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.4c.87-1.52 2.43-2.48 4.12-2.5 1.28-.02 2.5.87 3.3.87.78 0 2.26-1.07 3.8-.9.65.03 2.47.26 3.64 1.98-.1.06-2.17 1.28-2.15 3.8.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.2-.7.85-1.83 1.5-2.95 1.42-.15-1.15.4-2.35 1.05-3.1z" />
);

function isMobile() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (!ua) return false;
  const mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
  if (mobileRE.test(ua)) return true;
  if (
    typeof navigator !== 'undefined' &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  )
    return true;
  return false;
}

// @ts-ignore (expect-error breaks in GH actions) TODO: replace deprecated method
const isIE = (typeof window !== 'undefined' && window.navigator.msSaveOrOpenBlob && window.Blob) as boolean;

const getCurrentURL = () => {
  if (typeof window !== 'undefined') return window.location.href;
  return '';
};

export type AddToCalendarEvent = {
  /**
   * The title for the calendar entry, if a string it must be parseable as `Date`
   */
  start: string | Date;
  /**
   * The start time for the calendar entry, if a string it must be parseable as `Date`
   */
  end: string | Date;
  /**
   * The end time for the calendar entry
   */
  title: string;
  /**
   * The optional location for the calendar entry
   */
  location?: string;
  /**
   * The optional description for the calendar entry
   */
  description?: string;
};

export type AddToCalendarProps = AddToCalendarEvent & {
  /**
   * Additional element class name
   * @default ''
   */
  className?: string;
};

// we infer this from the the const CALENDAR_SERVICES, we might keep this
// here if we want to make the calendar services configurable
// type AddToCalendarService = {
//   id: string;
//   label: string;
//   Icon?: FC;
// };
type CalendarID = 'google' | 'apple' | 'outlook' | 'outlookcom';

const CALENDAR_SERVICES: Array<{ id: CalendarID; label: string; Icon: ReactElement }> = [
  { id: 'google', label: 'Google', Icon: IconGoogle },
  { id: 'apple', label: 'Apple Calendar', Icon: IconApple },
  { id: 'outlook', label: 'Outlook', Icon: IconMicrosoft },
  { id: 'outlookcom', label: 'Outlook.com', Icon: IconMicrosoft },
];

/**
 * Format time
 *
 * Adapted from the `moment` way of [react-add-to-calendar](https://git.io/JkWol)
 * to the dayjs way
 */
function formatTime(date: string | Date, id: CalendarID) {
  return dayjs(date).format(id === 'outlookcom' ? 'YYYY-MM-DDTHH:mm:ss' : 'YYYYMMDDTHHmmss') + 'Z';
}

/**
 * Create query string with given parameters
 *
 * It checks that the parameter value is not falsy
 */
function createQueryString(params: Record<string, string | undefined> = {}) {
  return Object.keys(params).reduce((acc, key) => {
    const value = params[key];
    if (value) acc += `&${key}=${encodeURIComponent(value)}`;
    return acc;
  }, '');
}

/**
 * Build calendar URL
 *
 * Resources:
 * - [SO question about Google](https://stackoverflow.com/q/22757908)
 * - [docs about outlook.com format](https://git.io/JkWp5)
 * - [addevent wrapper SaaS](https://www.addevent.com/)
 */
function buildUrl(event: AddToCalendarEvent, id: CalendarID) {
  const { start, end, title, location, description } = event;
  const startFormatted = formatTime(start, id);
  const endFormatted = formatTime(end, id);

  if (id === 'google')
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startFormatted}/${endFormatted}${createQueryString(
      { location, text: title, details: description },
    )}`;

  if (id === 'outlookcom')
    return `https://outlook.live.com/owa/?rru=addevent${createQueryString({
      startdt: startFormatted,
      enddt: endFormatted,
      subject: title,
      location,
      body: description,
      allday: 'false', // TODO: calculate it?
    })}&path=/calendar/view/Month`;

  let url = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'URL:' + getCurrentURL(),
    'DTSTART:' + startFormatted,
    'DTEND:' + endFormatted,
    'SUMMARY:' + title,
    'DESCRIPTION:' + description,
    'LOCATION:' + location,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');

  if (!isIE && isMobile()) url = encodeURI('data:text/calendar;charset=utf8,' + url);

  return url;
}

/**
 * AddToCalendar widget that supports google, apple and outlook calendars
 */
export const AddToCalendar: FC<AddToCalendarProps> = ({
  title,
  start,
  end,
  className = '',
  location = '',
  description = '',
}) => {
  const event = { start: start, end: end, title, location, description };

  function handleLinkClick(event: SyntheticEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href') as string;

    if (!isMobile() && (url.startsWith('data') || url.startsWith('BEGIN'))) {
      const filename = 'download.ics';
      const blob = new Blob([url], { type: 'text/calendar;charset=utf-8' });

      if (isIE) {
        // @ts-ignore (expect-error breaks in GH actions) TODO: replace deprecated method
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // many browsers do not properly support downloading data URIs
        // (even with "download" attribute in use) so this solution
        // ensures the event will download cross-browser
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      window.open(url, '_blank');
    }
  }

  return (
    <Card className={`mml-add-to-calendar ${className}`}>
      <CardHeader icon="date_range" text="Add to My Calendar" />
      <CardBody>
        <ButtonList>
          {CALENDAR_SERVICES.map(({ id, label, Icon }) => (
            <a
              key={id}
              className={`mml-btn ${Icon ? 'mml-btn--with-icon' : ''}`}
              onClick={handleLinkClick}
              href={buildUrl(event, id)}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              {Icon} {label}
            </a>
          ))}
        </ButtonList>
      </CardBody>
    </Card>
  );
};
