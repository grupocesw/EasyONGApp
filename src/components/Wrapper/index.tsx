import React from 'react';

import {Wrapper as WrapperComp} from './styles';

const Wrapper: React.FC = ({children}: any) => {
  return <WrapperComp>{children}</WrapperComp>;
};

export default Wrapper;
