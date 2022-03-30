import React from 'react';

export interface NextPageWithAuth extends React.FC {
  requireAuth?: boolean;
}
