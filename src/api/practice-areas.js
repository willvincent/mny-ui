import apiCall from './api-call';

export async function getPracticeAreas(options) {
  return apiCall('GET', '/practice-areas', null, null, options);
}
