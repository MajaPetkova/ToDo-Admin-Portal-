import axiosDJ from '../config/axiosInstance';
import { logger } from '../utils/logger';

export async function getPaginatedUsers(qParams = { limit: 10, skip: 0 }) {
  const query = new URLSearchParams(qParams);

  try {
    const res = await axiosDJ.get(`/users?${query.toString()}`);
    // console.log(res.data.users);
    return res.data;
  }
  catch (err) {
    logger.error(err);
    return [];
  }
}
