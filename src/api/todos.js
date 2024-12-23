import axiosDJ from '../config/axiosInstance';
import { logger } from '../utils/logger';

export async function getAllTodos() {
  try {
    const res = await axiosDJ.get('/todos?limit=0');
    // console.log(res.data.todos[1].todo);
    return res.data.todos;
  }
  catch (err) {
    logger.error(err);
    return [];
  }
}
