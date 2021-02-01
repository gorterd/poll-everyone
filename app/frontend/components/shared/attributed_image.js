import React from 'react';
import { useDropdown } from '../../util/custom_hooks';
import { classNames } from '../../util/general_util';

export default function AttributedImage ({
  children,
  imgClass,
  iconClass,
  ...rest
}) {
  const [ showing, ref, { toggleDropdown }] = useDropdown();

  return (
    <div className="attributed-image-container">
      <img {...classNames('attributed-image', imgClass)} {...rest} />
      <div 
        className="attribution-container"
        ref={ref}
        onClick={toggleDropdown}
      >
        <button className="attribution-button" tabIndex="0">
          <span {...classNames('attribution-icon', iconClass)}>
            <i className="fas fa-at"></i>
          </span>
        </button>
        <div {...classNames('attribution-popup', [!showing, 'hidden'])}>
          {children}
        </div>
      </div>
    </div>
  )
}

