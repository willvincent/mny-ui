import apiCall from './api-call';

export async function getIndustries(options) {
  return apiCall('GET', '/industries', null, null, options);
}
