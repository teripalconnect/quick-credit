import db from '../db';
import logger from '../services/logger';

/**
 * export
 */
class Loan {
  /**
   * Create A Loan
   * @param {object} data
   * @returns {object} new record
   */
  async create(data) {
    const createQuery = `INSERT INTO
      loans("email", "tenor", "amount", "paymentInstallment", "repaid", "status", "interest", "userId", "balance")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      data.email,
      data.tenor,
      data.amount,
      data.paymentInstallment,
      data.repaid,
      data.status,
      data.interest,
      data.userId,
      data.balance,
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
   * Get Loan by id
   * @param {String} id - the id primary key
   * @returns {object} record object
   */
  async getById(id) {
    const text = 'SELECT * FROM loans WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * Get Loan by a field
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

export default Loan;
