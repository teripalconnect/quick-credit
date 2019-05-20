import { Pool } from 'pg';
import connectionString from './config';

const pool = new Pool({
  connectionString
});

export default {
  /**
   * DB Query
   * @param {String} text - query text
   * @param {*} params - query params
   * @returns {Promise} query promise
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
