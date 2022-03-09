import React, { useState, useRef, useCallback, useEffect, FC } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Dayjs } from 'dayjs';
import { DatePickerProps } from './DatePicker';

export type DatePickerSelectProps = DatePickerSelectReadyProps & {
  itemClassName?: string;
  getItemData: (props: DatePickerSelectItemProps) => DatePickerItemData;
};

/**
 * Basic shape of DatePickerSelect extended by wrapper components as DatePickerDate and DatePickerTime
 */
export type DatePickerSelectReadyProps = Pick<DatePickerProps, 'icalFilter'> & {
  format: string;
  interval: number;
  onChange: (value: Dayjs) => void;
  value: Dayjs;
};

/**
 * Inside Virtuoso select items need an idx to indicate their position
 */
export type DatePickerSelectItemProps = {
  format: string;
  idx: number;
  interval: number;
  value: Dayjs;
};

/**
 * The data needed by each datepicker select item
 */
export type DatePickerItemData = {
  displayValue: string;
  idx: number;
  isSelected: (currentValue: Dayjs) => boolean;
  value: Dayjs;
};

const ITEMS_PER_PAGE = 40;
const VERTICAL_COMPENSATION = 3;
const INITIAL_INDEX = ITEMS_PER_PAGE;
const VIRTUOSO_START_INDEX = 10000;

/**
 * DatePicker select
 */
export const DatePickerSelect: FC<DatePickerSelectProps> = (props) => {
  const { onChange, icalFilter, getItemData, itemClassName, interval, format, value } = props;

  // Generate date items
  const generateItems = useCallback(
    (quantity: number, firstIdx: number) => {
      return Array(quantity)
        .fill(true)
        .map((_, idx) => getItemData({ interval, format, value, idx: firstIdx + idx }))
        .filter((newItem) => !icalFilter || (icalFilter && icalFilter(newItem.value)));
    },
    [interval, format, value, icalFilter, getItemData],
  );

  const [items, setItems] = useState<DatePickerItemData[]>(generateItems(ITEMS_PER_PAGE * 2, -ITEMS_PER_PAGE));
  const [firstItemIndex, setFirstItemIndex] = useState(VIRTUOSO_START_INDEX);

  const initialIndexOffset = useRef(INITIAL_INDEX);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleClick = useCallback(
    (item: DatePickerItemData) => {
      onChange(item.value);

      const firstItemIndex = initialIndexOffset.current || 0;
      let nextFirstItemIdx = firstItemIndex - INITIAL_INDEX - ITEMS_PER_PAGE;
      const missingTopItems = nextFirstItemIdx - item.idx + VERTICAL_COMPENSATION;

      // prepend date items, when the selected date's index is too low we prepend
      // some date options so that it will remain vertically centered in the middle
      if (missingTopItems >= 0) {
        nextFirstItemIdx -= missingTopItems;
        initialIndexOffset.current -= firstItemIndex - missingTopItems;
        setItems((items) => [...generateItems(missingTopItems, nextFirstItemIdx), ...items]);
      }
      setSelectedIdx(item.idx);
    },
    [setItems, generateItems, initialIndexOffset, onChange],
  );

  const appendItems = useCallback(
    (lastItemIndex) => {
      setItems((items) => [...items, ...generateItems(ITEMS_PER_PAGE, lastItemIndex)]);
    },
    [setItems, generateItems],
  );

  // @see https://git.io/JIUuo
  const prependItems = useCallback(() => {
    const firstItemIndex = initialIndexOffset.current || 0;
    const nextFirstItemIdx = firstItemIndex - INITIAL_INDEX - ITEMS_PER_PAGE;
    if (initialIndexOffset) {
      initialIndexOffset.current -= ITEMS_PER_PAGE;
    }
    setItems((items) => [...generateItems(ITEMS_PER_PAGE, nextFirstItemIdx), ...items]);
    setFirstItemIndex(firstItemIndex - ITEMS_PER_PAGE);
    return false;
  }, [setItems, generateItems, initialIndexOffset]);

  // on mount check if there is a selected value and save its idx in state
  useEffect(() => {
    if (value) {
      let initialSelectedIdx = null;
      for (let i = 0; i < items.length; i++) {
        if (items[i].isSelected(value)) {
          initialSelectedIdx = items[i].idx;
          break;
        }
      }
      setSelectedIdx(initialSelectedIdx);
    }
  }, []); // eslint-disable-line

  return (
    <Virtuoso
      data={items}
      firstItemIndex={firstItemIndex}
      itemContent={(_, item) => (
        <div
          className={
            itemClassName + ` mml-datepicker__item ${item.idx === selectedIdx ? 'mml-datepicker__item--selected' : ''}`
          }
          onClick={() => handleClick(item)}
        >
          {item.displayValue}
        </div>
      )}
      endReached={appendItems}
      startReached={prependItems}
    />
  );
};
