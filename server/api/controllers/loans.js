import uuid from 'uuidv4';
import loans from '../../dummyModels/loans';
import users from '../../dummyModels/users';

/**
 * @exports
 * @class LoansController
 *
 */
class LoansController {
  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAllLoans(req, res) {
    // get all repayments under each loan
    const { status, repaid } = req.query;

    let allLoans;
    if (status === 'approved' && repaid === 'true') {
      allLoans = loans.filter(item => item.status === 'approved' && item.repaid === true);
    } else if (status === 'approved' && repaid === 'false') {
      allLoans = loans.filter(item => item.status === 'approved' && item.repaid === false);
    } else {
      // all existing loans unfiltered
      allLoans = loans;
    }

    return res.status(200).json({
      status: 200,
      data: allLoans,
    });
  }

  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static async getAllUserLoans(req, res) {
    const userId = req.user.id;
    const userLoans = loans.filter(item => item.userId === userId);

    return res.status(200).json({
      status: 200,
      data: userLoans,
    });
  }

  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async createLoanRequest(req, res) {
    const user = users.find(item => item.id === req.user.id);

    const { amount, tenor } = req.body;
    const interest = (5 / 100) * amount;
    const repaymentAmount = Number(amount) + interest;

    const newLoan = {
      id: uuid(),
      email: user.email,
      tenor,
      amount,
      paymentInstallment: repaymentAmount / tenor,
      repaid: false,
      status: 'pending',
      interest,
      userId: user.id,
      balance: repaymentAmount,
      createdOn: new Date()
    };

    loans.push(newLoan);

    return res.status(201).json({
      status: 201,
      data: newLoan,
    });
  }

  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async getSingleLoan(req, res) {
    const { loanId } = req.params;

    const loan = loans.find(item => item.id === loanId);

    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  /**
   * @static
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {JonResponse} - json response with status code
   */
  static async changeLoanStatus(req, res) {
    const { loanId } = req.params;
    const { status } = req.body;

    const loan = loans.find(item => item.id === loanId);
    loan.status = status;

    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }
}

export default LoansController;
