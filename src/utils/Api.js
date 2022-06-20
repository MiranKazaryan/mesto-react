const handleResponse = (res) =>{
    if(res.ok){
       // console.log(res);
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status.message}`);
}
class Api{
    constructor({baseUrl, headers}) {
        // тело конструктора
        this._baseUrl = baseUrl;
        this._headers = headers;
      }
      getProfile(){
          return fetch(`${this._baseUrl}/users/me`, {
              headers: this._headers
          }).then(res => {
              if (res.ok) {
                  return res.json();
              }
              return Promise.reject(`Ошибка ${res.status}`);
          })
          .catch(console.log) 
      }
      getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(console.log) 
      }
      editProfile(name,about){
          return fetch(`${this._baseUrl}/users/me`, {
              method: 'PATCH', 
              headers: this._headers,
              body: JSON.stringify({
                name, about})
      })
            .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
            })
            .catch(console.log) 
    }
    addCard(name, link){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST', 
            headers: this._headers,
            body: JSON.stringify({
              name, link})
    })
          .then(res =>{
          if (res.ok){
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
          })
          .catch(console.log) 
  }
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id} `, {
        method: 'DELETE', 
        headers: this._headers,
})
      .then(res =>{
      if (res.ok){
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch(console.log) 
}
addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes `, {
        method: 'PUT', 
        headers: this._headers,
})
      .then(res =>{
      if (res.ok){
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch(console.log) 
}
deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes `, {
        method: 'DELETE', 
        headers: this._headers,
})
      .then(res =>{
      if (res.ok){
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch(console.log) 
}
editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then(res =>{
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
        })
        .catch(console.log) 
}
}
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: '67007484-30da-42a1-bd4b-bc44f25f087d',
        'Content-Type': 'application/json'
    }
});