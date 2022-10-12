import PropTypes from 'prop-types';

const IF = ({children, condition}) => {
  if (condition) {
    return children;
  }
  return null;
};

IF.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default IF;
