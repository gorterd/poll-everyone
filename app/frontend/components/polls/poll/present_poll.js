import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { isEqual, debounce } from 'lodash';

import cableConsumer from '../../../channels/consumer';
import { presenterPollDataSelector } from '../../../util/hooks_selectors';
import { standardGraph } from '../../../util/data_formats_util';
import { usePrevious } from '../../../util/custom_hooks';
import { fetchFullPoll, toggleActive } from '../../../store/actions/poll_actions'
import { 
  receiveActivePoll, 
  clearActivePoll, 
  receiveResponse, 
  clearResponse 
} from '../../../store/actions/presentation_actions';
import PresentationGraph from './presentation_graph';


export default function PresentPoll() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentId = useSelector( state => state.session.currentId );
  const { pollId } = useParams();
  const { poll, fullAnswerOptions } = useSelector(presenterPollDataSelector(pollId), isEqual);
  const formattedData = standardGraph(fullAnswerOptions);
  const prevFormattedData = usePrevious(formattedData);

  const graphContainer = useRef(null);
  const [graphDimensions, setGraphDimensions ] = useState({width: 0, height: 0});

  let subscription = null;

  useEffect( () => {
    dispatch(fetchFullPoll(pollId)).then(poll => {
      if (poll.active) subscribe();
    });
    
    return () => subscription?.unsubscribe();
  }, []);

  useEffect( () => {
    updateGraphDimensions();

    const resizeListener = window.addEventListener(
      'resize', 
      debounce(updateGraphDimensions, 100)
    );

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  function updateGraphDimensions() {
    if (!graphContainer.current) return;
    const { width, height } = graphContainer.current.getBoundingClientRect();
    setGraphDimensions({ height, width });
  }

  function subscribe() {
    subscription = cableConsumer.subscriptions.create(
      { channel: 'PresentationChannel', presenterId: currentId },
      { received: broadcast => receiveBroadcast(broadcast) }
    );
  }

  function receiveBroadcast(broadcast) {
    const response = JSON.parse(broadcast.data);

    switch (broadcast.type) {
      case 'POLL':
        response.poll.active 
          ? dispatch(receiveActivePoll(response)) 
          : dispatch(clearActivePoll());
        break;
      case 'RESPONSE':
        dispatch(receiveResponse(response));
        break;
      case 'CLEAR_RESPONSE':
        dispatch(clearResponse(response));
        break;
    }
  }

  function handleToggleActive() {
    dispatch(toggleActive(pollId)).then( () => {
      poll?.active ? subscription?.unsubscribe() : subscribe();
    });
  }

  return (
    <section className='show-poll-container'>
      <div className='show-poll-left'>
        <div className='graph-container' ref={graphContainer}>
          <div className='graph'>
            <PresentationGraph
              formattedData={formattedData}
              graphDimensions={graphDimensions}
              isAnimationActive={!isEqual(prevFormattedData, formattedData)}
            />
          </div>
        </div>
      </div>


      <div className='show-poll-right'>
        <div className='show-poll-executive-commands'>
          <Link 
            className='button-blue' 
            to={`/polls/${pollId}/edit`}
          >Edit</Link>

          <button 
            className='button-transparent'
            onClick={handleToggleActive}
          >{poll?.active ? 'Deactivate' : 'Activate'}</button>

          <button 
            className='button-transparent' 
            onClick={history.goBack}
          >Back</button>
        </div>
      </div>
    </section>
  );
}

export function RightSidebarControls({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentId = useSelector(state => state.session.currentId);
  const { pollId } = useParams();
  const { poll, fullAnswerOptions } = useSelector(presenterPollData(pollId), isEqual);
  const formattedData = standardGraph(fullAnswerOptions);
  const prevFormattedData = usePrevious(formattedData);

  const graphContainer = useRef(null);
  const [graphDimensions, setGraphDimensions] = useState({ width: 0, height: 0 });

  let subscription = null;

  useEffect(() => {
    dispatch(fetchFullPoll(pollId)).then(poll => {
      if (poll.active) subscribe();
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    updateGraphDimensions();

    const resizeListener = window.addEventListener(
      'resize',
      debounce(updateGraphDimensions, 100)
    );

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  function updateGraphDimensions() {
    if (!graphContainer.current) return;
    const { width, height } = graphContainer.current.getBoundingClientRect();
    setGraphDimensions({ height, width });
  }

  function subscribe() {
    subscription = cableConsumer.subscriptions.create(
      { channel: 'PresentationChannel', presenterId: currentId },
      { received: broadcast => receiveBroadcast(broadcast) }
    );
  }

  function receiveBroadcast(broadcast) {
    const response = JSON.parse(broadcast.data);

    switch (broadcast.type) {
      case 'POLL':
        response.poll.active
          ? dispatch(receiveActivePoll(response))
          : dispatch(clearActivePoll());
        break;
      case 'RESPONSE':
        dispatch(receiveResponse(response));
        break;
      case 'CLEAR_RESPONSE':
        dispatch(clearResponse(response));
        break;
    }
  }

  function handleToggleActive() {
    dispatch(toggleActive(pollId)).then(() => {
      poll?.active ? subscription?.unsubscribe() : subscribe();
    });
  }

  return (
    <section className='show-poll-container'>
      <div className='show-poll-left'>
        <div className='graph-container' ref={graphContainer}>
          <div className='graph'>
            <PresentationGraph
              formattedData={formattedData}
              graphDimensions={graphDimensions}
              isAnimationActive={!isEqual(prevFormattedData, formattedData)}
            />
          </div>
        </div>
      </div>


      <div className='show-poll-right'>
        <div className='show-poll-executive-commands'>
          <Link
            className='button-blue'
            to={`/polls/${pollId}/edit`}
          >Edit</Link>

          <button
            className='button-transparent'
            onClick={handleToggleActive}
          >{poll?.active ? 'Deactivate' : 'Activate'}</button>

          <button
            className='button-transparent'
            onClick={history.goBack}
          >Back</button>
        </div>
      </div>
    </section>
  );
}
