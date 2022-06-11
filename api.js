export async function registerUser(name, email, password) {
    console.log('trying to register user...')
    console.log('password: ' + password)
    const url = 'https://dialoog-backend.herokuapp.com/users';

    try {
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

export async function logIn(email,password) {
    const url = 'https://dialoog-backend.herokuapp.com/login';

    console.log('from login: ')
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
          email: email
        })
      });

      const data = (await response.json())[0];
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

export async function registerAndLogin(name, email, password) {
    console.log('start register and login process...')

    console.log(name);
    console.log('email: ' + email);
    console.log('password: ' + password);
    const userId = await registerUser(name, email, password);
    const userInfo = await logIn(email, password);

    return userInfo;
}

export async function requestMatch(authToken, userId) {
    
}

