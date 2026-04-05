import PropTypes from 'prop-types';

export const transactionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  merchant: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['Income', 'Expense']).isRequired,
  icon: PropTypes.string,
  iconBg: PropTypes.string,
  iconColor: PropTypes.string,
});
