import React from 'react';
import { Button } from 'react-bootstrap';

function Btn({
  outlinePrimary,
  outlineLight,
  block,
  small,
  big,
  edit,
  danger,
  margin,
  className,
  style,
  onClick,
  submit,
  disabled,
  children,
}) {
  return (
    <Button
      variant={`${
        outlinePrimary
          ? 'outline-primary'
          : outlineLight
          ? 'outline-light'
          : danger
          ? 'danger'
          : 'primary'
      }`}
      size={`${small ? 'sm' : big ? 'lg' : null}`}
      block={block}
      className={`${margin && 'my-3'} ${className}`}
      style={style}
      onClick={onClick}
      type={`${submit ? 'submit' : 'button'}`}
      disabled={disabled}>
      {children}
    </Button>
  );
}

export default Btn;
