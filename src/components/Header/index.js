import React from 'react';

import { Header } from './styles';

export default function index({ title = 'Pipefy Clone'}) {
  return (
      <Header>
        <h1>{title}</h1>
      </Header>
  )
}
