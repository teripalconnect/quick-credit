import db from '../db';
import logger from '../services/logger';

/**
 * export
 */
class User {
  /**
   * Create A User
   * @param {object} data
   * @returns {object} new record
   */
  async create(data) {
    const createQuery = `INSERT INTO
      users("firstName", "lastName", "email", "isAdmin", "password", "address", "status")
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      data.firstName,
      data.lastName,
      data.email,
      data.isAdmin,
      data.password,
      data.address,
      data.status,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return rows[0];
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  /**
   * Get User by id
   * @param {String} id - the id primary key
   * @returns {object} record object
   */
  async getById(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * Get User by a field
   * @param {String} field - the field
   * @param {String} value - the value
   * @returns {object} record object
   */
  async getByField(field, value) {
    const text = `SELECT * FROM users WHERE "${field}" = $1`;
    try {
      const { rows } = await db.query(text, [value]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default User;