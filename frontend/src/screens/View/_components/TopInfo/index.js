import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Koji from '@withkoji/core';
import Section from './Section';
import { makeSelectEntries, makeSelectPresumedRole } from '../../../../store/selectors';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const getRemainingTime = (date) => {
  const now = moment();
  const endDate = moment.unix(date);

  const duration = moment.duration(endDate.diff(now));

  const days = Math.max(Math.floor(duration.asDays()), 0);
  const hours = Math.max(Math.floor(duration.asHours()), 0);
  const minutes = Math.max(Math.floor(duration.asMinutes()), 0);
  const seconds = Math.max(Math.floor(duration.asSeconds()), 0);

  let label = days > 1 ? 'Days' : 'Day';

  let timeToUse = days;
  if (days < 1) {
    timeToUse = hours;
    label = hours > 1 ? 'Hours' : 'Hour';

    if (hours < 1) {
      timeToUse = minutes;
      label = minutes > 1 ? 'Minutes' : 'Minute';

      if (minutes < 1) {
        timeToUse = seconds;
        label = seconds > 1 ? 'Seconds' : 'Second';

        if (seconds < 1) {
          label = 'Days';
        }
      }
    }
  }

  return { timeNumber: timeToUse.toLocaleString(), timeLabel: `${label} Left` };
};

let interval = null;

const TopInfo = () => {
  const entries = useSelector(makeSelectEntries());
  const hasLoadedEntries = entries != null;
  const entryCount = entries ? entries.length : 0;

  const { endDate } = Koji.remix.get();

  const [timeInfo, setTimeInfo] = useState(getRemainingTime(endDate));

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(() => {
      setTimeInfo(getRemainingTime(endDate));
    }, 1000);

    return (() => clearInterval(interval));
  }, [endDate]);

  const { timeNumber, timeLabel } = timeInfo;

  const isTimeUp = Number(timeNumber) <= 0;

  let numberColor = '#111111';

  if (isTimeUp) {
    numberColor = '#111111';
  } else if (!timeLabel.includes('Day')) {
    numberColor = '#F44336';
  }

  return (
    <Container>
      <Section
        isLoading={!hasLoadedEntries}
        text="Total Entries"
        number={entryCount}
        borderRight
      />

      <Section
        text={timeLabel}
        number={timeNumber}
        color={numberColor}
      />
    </Container>
  );
};

TopInfo.propTypes = {};

export default TopInfo;
