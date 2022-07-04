import React from 'react';

export interface NextPageWithAuth<T = unknown> extends React.FC<T> {
  requireAuth?: boolean;
}
