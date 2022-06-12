import * as Notifications from 'expo-notifications';

export async function registerUser(name, email, password) {
    console.log('trying to register user...')
    console.log('password: ' + password)
    const url = 'https://dialoog-backend.herokuapp.com/users';

    try {
      email = email.toLowerCase();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email
        })
      });
      return await response.json()

    } catch (err) {
      console.log('ERROR | Something went wrong while trying to register:')
      console.error(err)
    }
}

export async function logIn(email,password, expoToken) {
    const url = 'https://dialoog-backend.herokuapp.com/login';

    email = email.toLowerCase();

    console.log('from api_login: ')
    console.log(email);
    console.log(password);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          email: email,
          pushtoken: expoToken
        })
      });

      console.log('from api_login:')
     

      const data = (await response.json())[0];
      console.log(data);
      if (data.authToken !== null) {
        return data;
      } else {
        console.log('Something went wrong while trying to log in: ')
        console.log('data');
      }

    } catch (err) {
      console.log('Something went wrong while trying to log in:')
      console.error(err)
    }
}

export async function registerAndLogin(name, email, password, expoToken) {
    email = email.toLowerCase();
    console.log('start register and login process...')
    console.log(name);
    console.log('email: ' + email);
    console.log('password: ' + password);
    const userId = await registerUser(name, email, password);
    if (userId.statusCode === 405) {
      return userId
    }
    const userInfo = await logIn(email, password, expoToken);

    return userInfo;
}

export async function getOpinions(userId, authToken) {
    const url = 'https://dialoog-backend.herokuapp.com/statement/' + userId;

    console.log('from getOpinions: ')
    console.log(userId);
    console.log(authToken);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authtoken: authToken,
        })
      });

      return await response.json()

    } catch (err) {
      console.log('Something went wrong while trying to log in:')
      console.error(err)
    }
    
}


export async function changeOpinion(userId, authToken, statementId, selectedStatement) {
    const url = 'https://dialoog-backend.herokuapp.com/answer';

  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authtoken: authToken,
          userid: userId,
          statementid: statementId,
          answervalue: selectedStatement
        })
      });

      const data = await response.json();
      console.log('changeopinion response: ');
      console.log(data);

      return data;

    } catch (err) {
      console.log('Something went wrong while trying to change opinion:')
      console.error(err)
    }
}


export async function getMatch(userId, authToken) {
  const url = 'https://dialoog-backend.herokuapp.com/match/' + userId;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authtoken: authToken,
        })
      });

      const data = await response.json();
      console.log('getMatch response: ');
      console.log(data);

      return data;

    } catch (err) {
      console.log('Something went wrong while trying to get a match:')
      console.error(err)
      return err
    }
}


export async function getUserInfo(userId) {
  const url = 'https://dialoog-backend.herokuapp.com/match/' + userId;
    try {
      const response = await fetch('https://dialoog-backend.herokuapp.com/info/' + userId)
    
      const data = await response.json();
      console.log('getUserInfo response: ');
      console.log(data);

      return data;

    } catch (err) {
      console.log('Something went wrong while trying to get userInfo:')
      console.error(err)
      return err
    }
}

export async function updateUser(id, name, email, authToken, acceptingMatches) {
  const url = 'https://dialoog-backend.herokuapp.com/users/' + id;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authtoken: authToken,
        name,
        email,
        acceptingmatches: acceptingMatches
      })
    });

    const data = await response.json();
    console.log('updateUser response: ');
    console.log(data);

    return data;

  } catch (err) {
    console.log('Something went wrong while trying to update user:')
    console.error(err)
   // return err
  }
}

export async function registerForPushNotificationsAsync() {
  
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log({token});

  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
  
  return token;
};

export async function deleteUser(id, authToken) {
  const url = 'https://dialoog-backend.herokuapp.com/users/' + id;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authtoken: authToken,
      })
    });

    return await response.json();
  } catch (err) {
    console.log('Something went wrong while trying to delete user:')
    console.error(err)
  }
}


export async function sendMessage(receiverId, senderId, text, authToken) {
  const url = 'https://dialoog-backend.herokuapp.com/message/' + senderId;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        useridReceiver: receiverId,
        text,
        authtokenSender: authToken

      })
    });

    return await response.json();
  } catch (err) {
    console.log('Something went wrong while trying to delete user:')
    console.error(err)
  }
}
