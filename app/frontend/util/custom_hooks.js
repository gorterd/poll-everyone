import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { singleValueSelector } from "./hooks_selectors";

// from react docs
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useDidUpdate(cb, deps) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      return cb();
    }
  }, deps)
}

/* deprecate? 
    1 off side effects in render should be avoided because 
    side effects during render should be avoid
*/ 
export function useOnFirstRender(cb) {
  const first = useRef(true);
  if (first.current) cb();

  useEffect(() => {
    first.current = false;
  }, [])
}

export function useDelayedPrefetch(fetchCb) {
  const [ START, TIMEOUT, CHECK ] = [ 'START', 'TIMEOUT', 'CHECK' ];
  const componentLoading = useStateValue('ui componentLoading');
  const ref = useRef({ status: START, value: null });

  const fetch = () => {
    fetchCb();
    ref.current.status = null;
  }

  useEffect(() => {
    switch (ref.current.status) {
      case START:
        ref.current.status = TIMEOUT;
        window.setTimeout(() => {
          if (ref.current.value) {
            ref.current.status = CHECK;
          } else {
            fetch();
          }
        }, 100);
      case TIMEOUT:
        ref.current.value = componentLoading;
        break;
      case CHECK:
        if (!componentLoading) fetch();
    }
  }, [componentLoading]);
}

export function useToggleState(initVal) {
  const [ val, setVal ] = useState(initVal);
  const toggleVal = () => setVal( old => !old );
  return [ val, toggleVal ];
}

export function useTextInput(defaultVal) {
  const [value, setValue] = useState(defaultVal);

  const inputProps = {
    type: 'text',
    onChange: event => setValue(event.target.value),
    value,
  }

  return [value, inputProps];
}

export function useStateValue(propPath){
  return useSelector(singleValueSelector(propPath));
} 

export function useDropdown(stopProp = true, documentClickCb = () => {}) {
  const [ dropdownVisible, setDropdownVisible ] = useState(false);
  
  const keepDropdown = e => e?.stopPropagation();
  const hideDropdown = () => setDropdownVisible(false); 

  const showDropdown = (e) => {
    if (stopProp) e?.stopPropagation();
    setDropdownVisible(true)
  };

  const toggleDropdown = (e) => {
    if (stopProp) e?.stopPropagation();
    setDropdownVisible(old => !old);
  }; 

  useEffect(() => {
    if (dropdownVisible) {
      const listener = document.addEventListener('click', () => {
        hideDropdown();
        documentClickCb();
      })

      return () => document.removeEventListener('click', listener);
    }
  }, [dropdownVisible]);

  return [
    dropdownVisible,
    {
      showDropdown,
      hideDropdown,
      keepDropdown,
      toggleDropdown,
    }
  ];
}

export function useAnimation ({
  renderCondition, 
  enterAnimation, 
  exitAnimation,
  interruptAnimation = false,
  noFirstAnimation = false,
  afterEnter = () => {},
  afterExit = () => {},
}) {
  if (typeof renderCondition === 'undefined') {
    throw new Error('Must provide a renderCondition')
  } 

  const enterDuration = enterAnimation?.animationDuration;
  const exitDuration = exitAnimation?.animationDuration;

  if (enterAnimation && !enterDuration) {
    throw new Error('enterAnimation must have animationDuration')
  }

  if (exitAnimation && !exitDuration) {
    throw new Error('exitAnimation must have animationDuration')
  }

  enterAnimation = enterAnimation || { animationDuration: 0 };
  exitAnimation = exitAnimation || { animationDuration: 0 };

  const [ renderState, setRenderState ] = useState(renderCondition);
  const [ style, setStyle ] = useState(noFirstAnimation ? {} : enterAnimation);
  const [ key, setKey ] = useState(0);
  const timeout = useRef();

  useDidUpdate(() => {
    if (timeout.current && !interruptAnimation) return;
    clearTimeout(timeout.current);

    if (renderCondition) {
      setRenderState(true);
      setStyle(enterAnimation);

      timeout.current = window.setTimeout(() => {
        afterEnter();
        timeout.current = null;
      }, parseInt(enterDuration));
    } else {
      setKey(old => old + 1);
      setStyle(exitAnimation);

      timeout.current = window.setTimeout(() => {
        setRenderState(false);
        afterExit();
        timeout.current = null;
      }, parseInt(exitDuration)); 
    } 
  }, [renderCondition]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [ renderState, style, key ];
}
