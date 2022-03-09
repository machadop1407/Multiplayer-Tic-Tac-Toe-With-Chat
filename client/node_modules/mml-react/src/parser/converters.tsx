import React, { ReactElement } from 'react';

import { MMLTag } from './MMLTag';
import {
  AddToCalendar,
  Button,
  ButtonList,
  Carousel,
  CarouselItem,
  Col,
  Icon,
  Image,
  Input,
  MD,
  Scheduler,
  Text,
  Row,
  Number,
} from '../components';

export type ConvertorType = (tag: MMLTag, children?: ReactElement[]) => ReactElement;

/**
 * The converters maps MML tags to react nodes
 * Every converter is passed the MML tag as well as the children (as React nodes)
 */
export const converters = {
  button: (tag: MMLTag) => {
    return (
      <Button
        {...tag.attributes}
        key={tag.key}
        text={tag.getText()}
        name={tag.attributes.name}
        value={tag.attributes.value}
      />
    );
  },
  button_list: (tag: MMLTag, children?: JSX.Element[]) => {
    return (
      <ButtonList {...tag.attributes} key={tag.key}>
        {children}
      </ButtonList>
    );
  },
  input: (tag: MMLTag) => {
    return <Input {...tag.attributes} key={tag.key} name={tag.attributes.name} value={tag.attributes.value} />;
  },
  add_to_calendar: (tag: MMLTag) => {
    return (
      <AddToCalendar
        {...tag.attributes}
        key={tag.key}
        title={tag.attributes.title}
        start={tag.attributes.start}
        end={tag.attributes.end}
      />
    );
  },
  col: (tag: MMLTag, children?: JSX.Element[]) => {
    return (
      <Col {...tag.attributes} key={tag.key}>
        {children}
      </Col>
    );
  },
  row: (tag: MMLTag, children?: JSX.Element[]) => {
    return (
      <Row {...tag.attributes} key={tag.key}>
        {children}
      </Row>
    );
  },
  icon: (tag: MMLTag) => {
    return <Icon {...tag.attributes} key={tag.key} name={tag.attributes.name} />;
  },
  image: (tag: MMLTag) => {
    return <Image {...tag.attributes} key={tag.key} src={tag.attributes.src} />;
  },
  md: (tag: MMLTag) => {
    return <MD {...tag.attributes} key={tag.key} text={tag.getText()} />;
  },
  text: (tag: MMLTag) => {
    return <Text {...tag.attributes} key={tag.key} text={tag.getText()} />;
  },
  scheduler: (tag: MMLTag) => {
    return (
      <Scheduler
        {...tag.attributes}
        key={tag.key}
        name={tag.attributes.name}
        dateInterval={parseInt(tag.attributes.dateInterval, 10) || 1} // default to 1 day
        timeInterval={parseInt(tag.attributes.timeInterval, 10) || 30} // default to 30 minutes
        duration={parseInt(tag.attributes.duration, 10) || 30} // default to 30 minutes
        selected={tag.attributes.selected}
        fullDay={tag.attributes.fullDay === 'true'}
        icalAvailability={tag.attributes.icalAvailability}
      />
    );
  },
  carousel: (tag: MMLTag, children?: JSX.Element[]) => {
    return (
      <Carousel slideWidth={tag.attributes.slideWidth} {...tag.attributes} key={tag.key}>
        {children}
      </Carousel>
    );
  },
  item: (tag: MMLTag, children?: JSX.Element[]) => {
    return (
      <CarouselItem {...tag.attributes} key={tag.key}>
        {children}
      </CarouselItem>
    );
  },
  number: (tag: MMLTag) => {
    return <Number {...tag.attributes} key={tag.key} name={tag.attributes.name} value={tag.attributes.value} />;
  },
};
