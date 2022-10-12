import PropTypes from 'prop-types';

import React, { useState } from 'react';

const IF = ({ children, condition }) => {
  if (condition === true) {
    return children;
  }
  return null;
};

IF.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default IF;
