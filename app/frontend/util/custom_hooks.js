import { useEffect, useRef, useState } from "react";

// from react docs
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
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

export function useDropdown(eleRef, unfocusCB) {
  useEffect(() => {
    let unfocus = true;

    const onEleClick = () => (unfocus = false);
    const onDocumentClick = () => {
      if (unfocus) unfocusCB();
      unfocus = true;
    }

    eleRef.current.addEventListener('click', onEleClick);
    document.addEventListener('click', onDocumentClick);

    return () => {
      unfocus = false;
      eleRef?.current?.removeEventListener('click', onEleClick);
      document.removeEventListener('click', onDocumentClick);
    }
  }, []);
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
  const [ style, setStyle ] = useState({});
  const [ key, setKey ] = useState(0);
  const timeout = useRef();
  const firstRender = useRef(noFirstAnimation);

  useEffect(() => {
    if (interruptAnimation) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    if (!timeout.current) {
      if (renderCondition) {
        if (!firstRender.current) setStyle(enterAnimation);
        setRenderState(true);

        if (!firstRender.current) timeout.current = window.setTimeout(() => {
          afterEnter();
          timeout.current = null;
        }, parseInt(enterDuration));

        firstRender.current = false;
      } 
      else {
        setKey(old => old + 1);
        if (!firstRender.current) setStyle(exitAnimation);

        timeout.current = window.setTimeout(() => {
          afterExit();
          setRenderState(false);
          timeout.current = null;
        }, parseInt(exitDuration)); 
      }
    }    
  }, [renderCondition]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  return [ renderState, style, key ];
}
