import React from 'react';
import PropTypes from 'prop-types';
import Koji from '@withkoji/core';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { AnimatePresence } from 'framer-motion';
import Header from './_components/Header';
import TextArea from '../../components/Textarea';
import FullscreenVideoSingle from './_components/FullscreenVideoSingle';
import MediaUpload from './_components/MediaUpload';
import ReactDatePicker from '../../components/ReactDatePicker';
import TextInput from '../../components/TextInput';
import isStringEmpty from '../../resources/util/isStringEmpty';
import isMediaVideo from '../../resources/util/isMediaVideo';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  overflow: hidden;
  background: #FFFFFF;
`;

const Container = styled.div`
  position: relative;
`;

const ScrollArea = styled.div`
  width: 100%;
  max-height: calc(100vh - 53px);
  overflow-y: auto;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  margin: 32px 27px;
  margin-bottom: 20px;
  color: #111111;
`;

const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 27px;
`;

const DateTimeContainer = styled.div`
  width: 100%;
  padding: 0 27px;
  padding-bottom: 27px;
`;

const DateError = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #f44336;
  margin: 5px 7px 0px 7px;
`;

const Margin = styled.div`
  margin-top: ${({ margin }) => margin}px;
`;

class Remix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCoverMediaValid: false,
      isTitleValid: false,
      isDateValid: false,
      description: '',
      fullscreenUrl: '',
      endDateError: '',
      title: '',
      coverMedia: '',
      endDate: null,
    };
  }

  componentDidMount() {
    const {
      description,
      title,
      endDate,
      coverMedia,
    } = Koji.remix.get();
    this.setState({
      description,
      title,
      endDate: endDate ? moment.unix(endDate) : null,
      coverMedia,
    });
  }

  async onFinish() {
    const {
      description,
      coverMedia,
      title,
      endDate,
    } = this.state;

    if (isStringEmpty(coverMedia)) {
      this.setState({ isCoverMediaValid: true });
      Koji.ui.present.alert({
        title: 'Error',
        message: 'Please upload a cover photo or video',
      });
      return;
    }

    if (isStringEmpty(title)) {
      this.setState({ isTitleValid: true });
      Koji.ui.present.alert({
        title: 'Error',
        message: 'Please enter a title',
      });
      return;
    }

    if (isStringEmpty(endDate)) {
      this.setState({ isDateValid: true });
      Koji.ui.present.alert({
        title: 'Error',
        message: 'Please select an end date for your giveaway',
      });
      return;
    }

    const payload = {
      coverMedia,
      title,
      endDate: endDate.unix(),
      description,
    };

    await Koji.remix.set(payload);
    Koji.remix.finish();
  }

  render() {
    const {
      description,
      fullscreenUrl,
      endDateError,
      endDate,
      title,
      coverMedia,
      isDateValid,
      isCoverMediaValid,
      isTitleValid,
    } = this.state;

    const onSelectMedia = async () => {
      const media = await Koji.ui.capture.media(
        {
          acceptOnly: ['image', 'video'],
          videoOptions: {
            hls: true,
          },
        },
        true
      );

      if (media.result && media.resultMetadata) {
        this.setState({ coverMedia: media.result });
      }
    };

    const handleChangeDescription = (e) => {
      this.setState({ description: e.target.value });
    };

    const handleChangeTitle = (e) => {
      this.setState({ title: e.target.value });
    };

    const clearMedia = () => {
      this.setState({ coverMedia: '' });
    };

    let video = null;
    let photo = null;
    if (coverMedia) {
      if (isMediaVideo(coverMedia)) {
        video = coverMedia;
      } else {
        photo = coverMedia;
      }
    }

    return (
      <Wrapper>
        <Header
          title="Giveaway Dare"
          onCancel={() => {
            Koji.remix.cancel();
          }}
          onNext={() => this.onFinish()}
        />
        <Container>
          <ScrollArea>
            <Title>
              What are you giving away?
            </Title>
            <FormField>
              <MediaUpload
                isInvalid={isCoverMediaValid}
                userImage={photo || ''}
                userVideo={video || ''}
                onSelectMedia={onSelectMedia}
                onClear={clearMedia}
                onSetFullscreenUrl={(url) => this.setState({ fullscreenUrl: url })}
              />

              <TextInput
                error={isTitleValid || description.length > 80}
                persistentLabel="Title"
                placeholder="e.g. Win tickets to my next show"
                value={title}
                onChange={handleChangeTitle}
                maxLength={500}
              />

              <Margin margin={24} />

              <TextArea
                persistentLabel="Description (optional)"
                placeholder="Detailed giveaway description, rules, and prize info"
                value={description}
                onChange={handleChangeDescription}
                multiline
                rows={5}
                rowsMax={5}
                maxLength={500}
              />
            </FormField>

            <Title>
              End Date
            </Title>

            <DateTimeContainer>
              <ReactDatePicker
                disablePast
                isInvalid={endDateError.length > 0}
                placeholder="End Date"
                value={endDate}
                onChange={(date) => {
                  const resetTimeToEndOfDay = date ? date.endOf('day') : null;
                  this.setState({ endDate: resetTimeToEndOfDay, endDateError: '' });
                }}
              />
            </DateTimeContainer>

            {endDateError && <DateError>{endDateError}</DateError>}

          </ScrollArea>
        </Container>

        <AnimatePresence>
          {
            fullscreenUrl !== '' && (
              <FullscreenVideoSingle
                src={fullscreenUrl}
                onClose={() => this.setState({ fullscreenUrl: '' })}
              />
            )
          }
        </AnimatePresence>
      </Wrapper>
    );
  }
}

Remix.propTypes = {};

export default Remix;
