import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Koji from '@withkoji/core';
import StandardButton from '../../../components/StandardButton';
import Cam from '../../../resources/icons/Cam';
import { hasGrants } from '../../../api/Koji/hasGrants';
import { requestGrants } from '../../../api/Koji/requestGrants';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setShowRecordingMenu, setUserId, setUserInfo } from '../../../store/actions';
import { getUserId } from '../../../api/getUserId';
import { getUserInfo } from '../../../api/Koji/getUserInfo';
import { makeSelectEntries, makeSelectHasPosted, makeSelectPresumedRole } from '../../../store/selectors';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 30px;
  user-select: none;

  @media(min-width: 699px){
    padding-right: 75px;
    padding-left: 75px;
  }
`;

const Info = styled.div` 
  position: relative;
  color: #FFFFFF;
  padding-top: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #E0E0E0;

  svg{
    margin-right: 10px;
    margin-top: 2px;
  }

`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0.4px;
  color: #2A2A2A;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #2A2A2A;
  margin-bottom: 24px;
`;

const Note = styled.div`
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #4F4F4F;
  margin-top: 10px;
`;

const ActionSection = (props) => {
  const dispatch = useDispatch();
  const presumedRole = useSelector(makeSelectPresumedRole());
  const hasPosted = useSelector(makeSelectHasPosted());
  const entries = useSelector(makeSelectEntries());
  const [busy, setBusy] = useState(false);

  const [didExpire, setDidExpire] = useState(false);

  const {
    title,
    description,
    endDate,
  } = Koji.remix.get();

  useEffect(() => {
    setDidExpire(Date.now() / 1000 > endDate);
  }, [endDate]);

  const onAction = async () => {
    if (hasTimeExpired()) {
      Koji.ui.present.alert({
        title: "Time's up",
        message: 'Sorry, this giveaway has ended',
      });
      setDidExpire(true);
      return;
    }

    setBusy(true);
    const gotGrants = await hasGrants();

    if (!gotGrants) {
      const hasFinallyGotGrants = await requestGrants();
      if (!hasFinallyGotGrants) {
        setBusy(false);
        return;
      }
    }

    const userInfo = await getUserInfo();
    dispatch(setUserInfo(userInfo));

    const userId = await getUserId();
    dispatch(setUserId(userId));
    setBusy(false);
    dispatch(setShowRecordingMenu(true));
  };

  const hasTimeExpired = () => Date.now() / 1000 > endDate;

  let buttonLabel = 'Submit Your Entry';
  if (hasPosted) buttonLabel = 'Entry Submitted';

  let note = hasPosted ?
    'You’ve already submitted your entry. To re-submit, delete your current entry from the feed first.' :
    'All video submissions are public and required for entry.';

  if (didExpire) {
    note = '';
  }

  return (
    <Container>
      <Info>
        <Title>
          {title}
        </Title>

        {
          description !== '' && (
            <Description>
              {description}
            </Description>
          )
        }

        <StandardButton
          onClick={onAction}
          disabled={hasPosted || didExpire}
          style={didExpire ? { backgroundColor: '#F2F2F2', color: '#4F4F4F', opacity: 1 } : {}}
        >
          {
            didExpire ?
              'Giveaway Ended'
              : (
                <>
                  {
                    busy || entries == null ?
                      <LoadingSpinner color="#FFFFFF" />
                      : (
                        <>
                          {
                            !hasPosted &&
                            <Cam />
                          }
                          {buttonLabel}
                        </>
                      )
                  }
                </>
              )
          }

        </StandardButton>

        <Note>{note}</Note>
      </Info>
    </Container>
  );
};

ActionSection.propTypes = {};

export default ActionSection;
