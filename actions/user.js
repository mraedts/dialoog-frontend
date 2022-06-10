export const setName = name => (
    {
      type: 'SET_NAME',
      payload: name,
    }
);

export const setAuthToken = token => (
    {
      type: 'SET_AUTHTOKEN',
      payload: token,
    }
);