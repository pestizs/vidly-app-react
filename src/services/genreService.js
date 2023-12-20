import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/genres";

function genreUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGenres() {
  return http.get(apiEndpoint);
}

export function saveGenre(genre) {
  return http.post(apiEndpoint, genre);
}

export function deleteGenre(genreId) {
  return http.delete(genreUrl(genreId));
}
