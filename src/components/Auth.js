export const BASE_URL = 'https://auth.nomoreparties.co/';

//const handleResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};
  // .then((response) => {
  //   try {
  //     if (response.status === 200){
  //       return response.json();
  //     }
  //   } catch(e){
  //     return (e)
  //   }
  // })
  // .then((res) => {
  //   console.log(res)
  //   return res;
  // })
  // .catch((err) => console.log(err));

// export const getToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       }
//     })
//     .then(handleResponse)
//   }