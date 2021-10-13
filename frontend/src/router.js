import React, { useEffect, useState } from 'react';
import Koji from '@withkoji/core';
import PropTypes from 'prop-types';
import qs from 'qs';

import { useDispatch } from 'react-redux';
import View from './screens/View';
import Remix from './screens/Remix';
import { getUserRole } from './api/Koji/getUserRole';
import { addEntry, setEntries, setHasGrants, setPresumedRole, setShowSingleEntry, setTargetEntry, setUserId, setUserInfo, setWinner } from './store/actions';
import { hasGrants } from './api/Koji/hasGrants';
import { getUserInfo } from './api/Koji/getUserInfo';
import { getEntries } from './api/getEntries';
import { getUserId } from './api/getUserId';
import { getWinner } from './api/getWinner';

function Router(props) {
  // Use a state hook to track our readiness
  const [isReady, setIsReady] = useState(false);

  // Use a state hook to track if the user is remixing
  const [isRemixing, setIsRemixing] = useState(true);
  const [isEditMode, setIsEditMode] = useState(null);
  const dispatch = useDispatch();

  // We only want to subscribe to our playerState listener function one time,
  // so we can put it into a useEffect hook with an empty dependency array:
  useEffect(() => {
    // Set up a subscription that will let us know when a user who is remixing this
    // template switches between remix and preview
    const unsubscribe = Koji.playerState.subscribe((inRemixMode, attributes) => {
      setIsRemixing(() => inRemixMode);
      setIsEditMode(() => attributes.mode === 'edit');
    });

    // It's unlikely that this component will unmount, but it's always a good practice
    // to unsubscribe from any listeners in the useEffect return
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const onSetPresumedRole = (role) => dispatch(setPresumedRole(role));
    const onSetHasGrants = (doesHaveGrants) => dispatch(setHasGrants(doesHaveGrants));
    const onSetUserInfo = (info) => dispatch(setUserInfo(info));
    const onSetEntries = (entries) => dispatch(setEntries(entries));
    const onAddEntry = (entry) => dispatch(addEntry(entry));
    const onSetUserId = (id) => dispatch(setUserId(id));
    const onSetWinner = (id) => dispatch(setWinner(id));
    const onSetTargetEntry = (entry) => dispatch(setTargetEntry(entry));
    const onSetShowSingleEntry = (show) => dispatch(setShowSingleEntry(show));

    const fetchPresumedRole = async () => {
      const presumedRole = await getUserRole();
      onSetPresumedRole(presumedRole);
    };

    const fetchUserInfo = async () => {
      const doesHaveGrants = await hasGrants();
      onSetHasGrants(doesHaveGrants);

      if (doesHaveGrants) {
        const info = await getUserInfo();
        onSetUserInfo(info);

        const userId = await getUserId();
        onSetUserId(userId);
      }
    };

    const initializeDispatch = async () => {
      try {
        await Koji.dispatch.connect();

        // Define dispatch event handlers here
        Koji.dispatch.on('addEntry', (data) => onAddEntry(data));
      } catch {
        console.error('Error while connecting Dispatch...');
      }
    };

    const fetchEntries = async () => {
      const fetchedEntries = await getEntries();
      onSetEntries(fetchedEntries);
      const winner = await getWinner();
      if (winner) onSetWinner(winner.id);

      return fetchedEntries;
    };

    const resolveDeepLink = (entries) => {
      const searchParams = qs.parse(window.location.search.replace('?', ''));

      // Do something with search params
      const { entry: id } = searchParams;

      if (!id) return;

      const entry = entries.find((e) => e.id === id);

      if (entry) {
        onSetTargetEntry(entry);
        onSetShowSingleEntry(true);
      }
    };

    const resolveEverything = async () => {
      fetchPresumedRole();
      await fetchUserInfo();
      initializeDispatch();
      const entries = await fetchEntries();
      if (entries) resolveDeepLink(entries);
    };

    resolveEverything();
  }, [dispatch]);

  useEffect(() => {
    // Call the ready method to let the platform know we have our listeners
    // set up and unblock the rendering and lookups for the rest of our application
    if (!isReady) initialize();
  }, [isReady]);

  const initialize = async () => {
    Koji.ready();
    setIsReady(true);
  };

  // Get our context from the playerState
  // which will let us know which screen to render
  const { context } = Koji.playerState;

  if (!isReady) return null;
  if (context === 'screenshot') return <div />;
  if (isRemixing && context === 'remix') {
    document.body.style = 'overflow-y: hidden';
    return <Remix />;
  }
  return <View />;
}

Router.propTypes = {};

export default Router;
