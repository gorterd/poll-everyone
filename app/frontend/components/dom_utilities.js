import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDidUpdate, useStateValue } from '../util/custom_hooks';
import { exitModal } from '../store/actions/ui_actions';

export default () => {
  const curPath = useLocation().pathname;
  const dispatch = useDispatch();
  
  const scrollY = useStateValue('ui scrollY');
  const modalType = useStateValue('modal type');

  useEffect(() => {
    if (!modalType) window.scrollTo(0, scrollY);
  }, [modalType]);

  useDidUpdate(() => {
    window.scrollTo(0, 0);
    dispatch(exitModal());
  }, [curPath]);
  
  return null;
}