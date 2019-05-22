import db from '../db';
import logger from '../services/logger';

/**
 * export
 */
class Repayment {
  /**
   * Create A Repayment
   * @param {object} data
   * @returns {object} new record
   */
  async create(data) {
    const createQuery = `INSERT INTO
      repayments ("loanId", "amount", "monthlyInstallment")
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      data.loanId,
      data.amount,
      data.monthlyInstallment,
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
   * Get Repayment by id
   * @param {String} id - the id primary key
   * @returns {object} record object
   */
  async getById(id) {
    const text = 'SELECT * FROM repayments WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * Get Repayment by a field
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

export default Repayment;
