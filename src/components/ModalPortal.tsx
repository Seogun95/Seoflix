import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const el = document.getElementById('root') ?? document.createElement('div');

  return ReactDOM.createPortal(children, el);
}
