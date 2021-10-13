import { KojiBackend } from '@withkoji/core';

const sendDispatch = async (res, eventName, data = {}) => {
  if (!res || !eventName) return;

  const dispatch = new KojiBackend.Dispatch({ res });
  await dispatch.connect({});
  dispatch.emitEvent(eventName, { ...data });
  dispatch.disconnect();
};

export default sendDispatch;
