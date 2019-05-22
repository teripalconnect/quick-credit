import loans from '../../dummyModels/loans';
import repayments from '../../dummyModels/repayments';

/**
 * @exports
 * @class RepaymentsController
 *
 */
class RepaymentsController {
  /**
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {JSON} res.json
   */
  static async getRepaymentsForALoan(req, res) {
    const { loanId } = req.params;

    const loan = loans.find(item => item.id === loanId);
    const loanRepayments = repayments.filter(item => item.loanId === loan.id);

    return res.status(200).json({
      status: 200,
      data: loanRepayments,
    });
  }
}

export default RepaymentsController;
