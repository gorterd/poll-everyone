import React, { useEffect } from 'react';
import { presenterPollData } from '../../../util/curried_selectors';
import { fetchFullPoll, toggleActive } from '../../../actions/poll_actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { standardGraph } from '../../../util/data_formats_util';
import { isEqual } from 'lodash';
import { 
  receiveActivePoll, 
  clearActivePoll, 
  receiveResponse, 
  clearResponse 
} from '../../../actions/presentation_actions';
import { 
  BarChart, 
  XAxis, 
  YAxis, 
  Bar, 
  LabelList,
} from 'recharts';
import { usePrevious } from '../../../util/custom_hooks';

export default function PresentPoll() {
  const { pollId } = useParams();
  const { poll, fullAnswerOptions } = useSelector(presenterPollData(pollId), isEqual);
  const currentId = useSelector( state => state.session.currentId );
  const formattedData = standardGraph(fullAnswerOptions);
  const prevFormattedData = usePrevious(formattedData);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchFullPoll(pollId)).then(poll => {
      if (poll.active) subscribe();
    });
    
    return () => subscription?.unsubscribe();
  }, []);

  let subscription = null;

  function subscribe() {
    subscription = App.cable.subscriptions.create(
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

  const graph = formattedData ? (
    <BarChart 
      data={formattedData} 
      layout="vertical" 
      margin={{ left: 150 }}
      width={700} 
      height={560} 
    >
      <XAxis type="number" hide={true} />
      <YAxis 
        dataKey="key" 
        tickLine={false} 
        type="category" 
        axisLine={{ strokeWidth: 3, stroke: "#6b99c7" }} 
        tick={{ style: { fontSize: 45, fontWeight: 700 } }}
      />
      <Bar 
        dataKey="percent" 
        fill="#6b99c7"  
        isAnimationActive={!isEqual(prevFormattedData, formattedData)}
      >
        <LabelList 
          dataKey="percentString" 
          position="insideRight" 
          style={{ fontSize: 45, fill: "#ffffff" }} 
          formatter={v => v === '0%' ? '' : v} 
        />
      </Bar>
    </BarChart>
  ) : <div className='empty-graph'></div>

  const toggleActiveText = poll?.active ? 'Deactivate' : 'Activate';

  return (
    <section className='show-poll-container'>
      <div className='show-poll-left'>
        <div className='graph-container'>
          <div className='graph'>
            {graph}
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
          >{toggleActiveText}</button>

          <button 
            className='button-transparent' 
            onClick={history.goBack}
          >Back</button>
        </div>
      </div>
    </section>
  );
}

// class PresentPoll extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       subscription: null
//     }

//     this._subscribe = this._subscribe.bind(this)
//     this.receiveBroadcast = this.receiveBroadcast.bind(this)
//     this.toggleActivation = this.toggleActivation.bind(this)
//   }

//   componentDidMount() {
//     const { pollId, currentId } = this.props;

//     this.props.fetchFullPoll(pollId)
//       .then( poll => {
//         if (poll.active) {
//           this._subscribe(currentId)
//         }
//       }
//     );
//   }

//   componentWillUnmount() {
//     if (this.state.subscription) {
//       this.state.subscription.unsubscribe();
//     }
//   }

//   _subscribe(presenterId) {
//     this.setState({
//       subscription: App.cable.subscriptions.create(
//         { channel: 'PresentationChannel', presenterId },
//         {
//           received: broadcast => {
//             this.receiveBroadcast(broadcast)
//           },
//         }
//       )
//     }) 
//   }

//   receiveBroadcast(broadcast) {
//     const { receiveActivePoll, clearActivePoll, receiveResponse, clearResponse } = this.props;
//     const response = JSON.parse(broadcast.data);
    
//     switch (broadcast.type) {
//       case POLL:
//         response.poll.active ? receiveActivePoll(response) : clearActivePoll();
//         break;
//       case RESPONSE:
//         receiveResponse(response);
//         break;
//       case CLEAR_RESPONSE:
//         clearResponse(response);
//         break;
//     }
//   }

//   toggleActivation(){
//     const { subscription } = this.state;
//     const { poll: { active: isDeactivating, id: pollId }, currentId, toggleActive } = this.props;

//     toggleActive(pollId).then( () => {
//       isDeactivating ? subscription.unsubscribe() : this._subscribe(currentId);
//     });
//   }

//   render() {

//     const { pollId, poll, history, formattedData } = this.props;

//     const graph = formattedData ? (
//       <BarChart width={700} height={560} data={formattedData} layout="vertical" margin={{left: 150}}>
//         <XAxis type="number" hide={true}/>
//         <YAxis dataKey="key" tick={false} type="category" axisLine={{ strokeWidth: 3, stroke: "#6b99c7"}} />
//         <Bar dataKey="percent" fill="#6b99c7" >
//           <LabelList dataKey="percentString" position="insideRight" formatter={ v => v==='0%' ? '' : v}
//             style={{ fontSize: 45,  fill: "#ffffff"}}/>
//           <LabelList dataKey="key" position="left" 
//             style={{ fontSize: 45, fontWeight: 700 }}
//           />
//         </Bar>
//       </BarChart>
//     ) : <div className='empty-graph'></div>

    
//     return (
//       <section className='show-poll-container'>
//         <div className='show-poll-left'>
//           <div className='graph-container'>
//             <div className='graph'>
//               {graph}
//             </div>
//           </div>
//         </div>


//         <div className='show-poll-right'>
//           <div className='show-poll-executive-commands'>
//             <Link className='button-blue' to={`/polls/${pollId}/edit`}>Edit</Link>
//             <button className='button-transparent'
//               onClick={this.toggleActivation}
//             >{ (poll && poll.active) ? 'Deactivate' : 'Activate'}</button>
//             <button className='button-transparent'
//               onClick={(e) => {
//                 e.preventDefault();
//                 history.goBack();
//               }}
//             >Back</button>
//           </div>
//         </div>

//       </section>
//     )
//   }
// };

// const mapState = (state, ownProps) => {
//   const pollId = ownProps.match.params.pollId;
//   const { poll, fullAnswerOptions } = presenterPollData(state, pollId);
//   const formattedData = standardGraph(fullAnswerOptions);

//   return {
//     currentId: state.session.currentId,
//     pollId, poll, fullAnswerOptions, formattedData
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     fetchFullPoll: (pollId) => dispatch(fetchFullPoll(pollId)),
//     receiveActivePoll: data => dispatch(receiveActivePoll(data)),
//     clearActivePoll: () => dispatch(clearActivePoll()),
//     receiveResponse: response => dispatch(receiveResponse(response)),
//     clearResponse: response => dispatch(clearResponse(response)),
//     toggleActive: pollId => dispatch(toggleActive(pollId)),

//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(PresentPoll));
