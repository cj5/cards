import Api from './Api'

export default {
  signUp(credentials) {
    return Api().post('/sign-up', credentials)
  }
}