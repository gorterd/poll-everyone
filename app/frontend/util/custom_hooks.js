import { merge } from 'lodash';
import { useEffect, useRef, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { singleValueSelector } from './hooks_selectors';

// from react docs
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useDidUpdate(cb) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      return cb();
    }
  }, [cb]);
}

export function useDelayedPrefetch(fetchCb) {
  const componentLoading = useStateValue('ui componentLoading');
  const ref = useRef({ status: 'START', value: null });

  const fetch = useCallback(() => {
    fetchCb();
    ref.current.status = null;
  }, [fetchCb]);

  useEffect(() => {
    switch (ref.current.status) {
      case 'START':
        ref.current.status = 'TIMEOUT';
        window.setTimeout(() => {
          if (ref.current.value) {
            ref.current.status = 'CHECK';
          } else {
            fetch();
          }
        }, 100);
      // fallthrough
      case 'TIMEOUT':
        ref.current.value = componentLoading;
        break;
      case 'CHECK':
        if (!componentLoading) {
          fetch()
          ref.current.status = null;
        }
    }
  }, [componentLoading, fetch]);
}

export function useObjectState(initState) {
  const [ state, setState ] = useState(initState);
  
  const mergeSetState = useCallback((newStateOrUpdaterFn, mutate = false) => {
    switch( typeof newStateOrUpdaterFn ) {
      case 'function':
        if (mutate) {
          return setState( oldState => {
            const newState = merge({}, oldState);
            newStateOrUpdaterFn(newState)
            return newState
          });
        } else {
          return setState(oldState => {
            const newState = newStateOrUpdaterFn(oldState);
            return merge({}, oldState, newState);
          });
        }
      case 'object':
        if (mutate) {
          return setState(newStateOrUpdaterFn);
        } else {
          return setState(oldState => merge({}, oldState, newStateOrUpdaterFn));
        }
      default:
        throw new Error('argument to `mergeSetState` must be object or function')
    }
  }, []);

  return [ state, mergeSetState ];
}

export function useToggleState(initVal) {
  const [ val, setVal ] = useState(initVal);
  const toggleVal = () => setVal( old => !old );
  return [ val, toggleVal ];
}

export function useTextInput(defaultVal, props = {}) {
  const [value, setValue] = useState(defaultVal);

  const inputProps = {
    onChange: event => setValue(event.target.value),
    value,
    ...props
  }

  return [value, inputProps, setValue];
}

export function useStateValue(propPath){
  return useSelector(singleValueSelector(propPath));
} 

export function useDropdown(documentClickCb) {
  const [ dropdownVisible, setDropdownVisible ] = useState(false);
  const eventHandlers = useMemo(() => ({
    hideDropdown: () => setDropdownVisible(false),
    showDropdown: () => setDropdownVisible(true),
    toggleDropdown: () => setDropdownVisible(old => !old),
  }), [])
  
  const dropdownRef = useRef();  
  const listener = useCallback(e => {
    if (!dropdownRef.current.contains(e.target)) {
      eventHandlers.hideDropdown();
      documentClickCb?.();
    }
  }, [documentClickCb, eventHandlers]); 

  useLayoutEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('click', listener, true);
      return () => document.removeEventListener('click', listener, true);
    }
  }, [dropdownVisible, listener]);

  return [ dropdownVisible, dropdownRef, eventHandlers ];
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

  const prevRenderCondition = usePrevious(renderCondition);
  const [ renderState, setRenderState ] = useState(renderCondition);
  const [ style, setStyle ] = useState(noFirstAnimation ? {} : enterAnimation);
  const [ key, setKey ] = useState(0);
  const timeout = useRef();

  useDidUpdate(() => {
    if (prevRenderCondition === renderCondition) return;

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
  });

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [ renderState, style, key ];
}
