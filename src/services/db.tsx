import request from '../utils/request';

export async function generator(params: object) {
  return request(`/db/generator`, {
    method: 'POST',
    data: params,
  })
}
