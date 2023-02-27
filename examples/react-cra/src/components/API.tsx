import '@stoplight/elements/styles.min.css';

import { API } from '@stoplight/elements';
import React from 'react';

export const StoplightAPI: React.FC = () => {
  return <API basePath="zoom-api" apiDescriptionUrl="https://payment.payfa.com/v2/api/swagger/v1/swagger.json" />;
};
