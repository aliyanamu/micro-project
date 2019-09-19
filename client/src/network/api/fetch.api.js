import * as NETWORK from '../baseURI'

export const GET_USER = function (username) {
  return NETWORK.API_FE.get(`/users?username=${username}`)
}
export const GET_REPO = function (username, page) {
  return NETWORK.API_FE.get(`/repos?username=${username}&page=${page}`)
}
export const GET_README = function (username, repository) {
  return NETWORK.API_FE.get(`/readme?username=${username}&repository=${repository}`)
}
