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

export const setUser = user => (
  {
    type: 'SET_USER',
    payload: user,
  }
);

export const logOut = payload => (
  {
    type: "USER_LOGOUT",
    payload: payload
  }
)

export const setAcceptingMatches = payload => (
  {
    type: "SET_ACCEPTING_MATCHES",
    payload: payload
  }
)




