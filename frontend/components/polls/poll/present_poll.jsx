import React, { useEffect, useRef, useState } from 'react';
import { presenterPollData } from '../../../util/curried_selectors';
import { fetchFullPoll, toggleActive } from '../../../actions/poll_actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { standardGraph } from '../../../util/data_formats_util';
import { isEqual, debounce } from 'lodash';
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
  LabelList
} from 'recharts';
import { usePrevious } from '../../../util/custom_hooks';
import PresentationGraph from './presentation_graph';

export default function PresentPoll() {
  const { pollId } = useParams();
  const { poll, fullAnswerOptions } = useSelector(presenterPollData(pollId), isEqual);
  const currentId = useSelector( state => state.session.currentId );
  const formattedData = standardGraph(fullAnswerOptions);
  const prevFormattedData = usePrevious(formattedData);
  const history = useHistory();
  const dispatch = useDispatch();
  const graphContainer = useRef();
  const [graphDimensions, setGraphDimensions ] = useState({width: 100, height: 200});

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

  let subscription = null;

  function updateGraphDimensions() {
    console.log('graph container: ', graphContainer.current)
    window.gc = graphContainer.current;
    const { width, height } = graphContainer.current.getBoundingClientRect();
    console.log('dimensions to update: ', width, height);
    setGraphDimensions({ height, width });
  }

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

  // function generateGraph(){
  //   const largeFont = 45;
  //   const defaultMargin = 150;
  //   const yAxisLine = {
  //     strokeWidth: 3,
  //     stroke: "#6b99c7"
  //   };
  //   const barFill = "#6b99c7";
  //   const { height: graphHeight, width: graphWidth } = graphDimensions;
  //   console.log('graph height / width in generate graph', graphHeight, graphWidth)

  //   const maxBody = formattedData.reduce((maxBody, answerData) => {
  //     return maxBody.length > answerData.body.length ? maxBody : answerData.body;
  //   }, 0);

  //   const leftFontSize = largeFont;
  //   const leftMargin = maxBody.length > 30 ? defaultMargin : defaultMargin;

  //   const keyRender = (props) => {
  //     const { x, y, height, payload } = props;
  //     const [ key, body, percent ] = JSON.parse(payload.value);

  //     // console.log(props);
  //     return (
  //       <g>
  //         <text
  //           style={{ fontSize: largeFont, fontWeight: 700 }}
  //           textAnchor="end"
  //           dy="0.31em"
  //           x={x}
  //           y={y}
  //         >
  //           {body}
  //         </text>

  //         { percent 
  //         ? <rect
  //             x={x + 10} y={y - 25}
  //             width="2em"
  //             height={50}
  //             fill={"#b5cce3"}
  //           ></rect> 
  //         : null }

  //         <text
  //           style={{ fontSize: largeFont, fontWeight: 700 }}
  //           textAnchor="start"
  //           x={x + 12} y={y}
  //           dy="0.31em"
  //           width="1em"
  //           className="recharts-text recharts-label"
  //           height={0.6 * height}
  //         >
  //           {key}
  //         </text>
  //       </g>
  //     )
  //   }

  //   return (
  //     <BarChart 
  //       data={formattedData} 
  //       layout="vertical" 
  //       margin={{ left: leftMargin }}
  //       height={graphHeight}
  //       width={graphWidth}
  //     >
  //       <XAxis type="number" hide={true} />

  //       <Bar 
  //         dataKey="percent" 
  //         fill={barFill} 
  //         isAnimationActive={!isEqual(prevFormattedData, formattedData)}
  //       >
  //         <LabelList 
  //           dataKey="percentString" 
  //           position="insideRight" 
  //           formatter={v => v === '0%' ? '' : v}
  //           style={{ fontSize: largeFont, fill: "#ffffff" }} 
  //         />
  //         {/* <LabelList dataKey="key" position="insideLeft"
  //           style={{ fontSize: largeFont, fontWeight: 700 }}
  //         /> */}
  //         {/* <LabelList dataKey="key" content={barKeyRender} /> */}
  //       </Bar>
  //         {/* <LabelList 
  //           dataKey="body" 
  //           position="left"
  //           style={{ fontSize: leftFontSize, fontWeight: 700 }}
  //         /> */}
  //       <YAxis
  //         dataKey="label"
  //         tickLine={false}
  //         type="category"
  //         axisLine={yAxisLine}
  //         position="insideLeft"
  //         // tick={{ style: { fontSize: 45, fontWeight: 700, fill: 'black' } }}
  //         tick={keyRender}
  //       />
  //     </BarChart>
  //   );
  // }

  // const graph = formattedData ? generateGraph()
  // (
  //   <BarChart 
  //     data={formattedData} 
  //     layout="vertical" 
  //     margin={{ left: 150 }}
  //     width={700} 
  //     height={560} 
  //   >
  //     <XAxis type="number" hide={true} />
  //     <YAxis 
  //       dataKey="key" 
  //       tickLine={false} 
  //       type="category" 
  //       axisLine={{ strokeWidth: 3, stroke: "#6b99c7" }} 
        // tick={{ style: { fontSize: 45, fontWeight: 700 } }}
  //     />
  //     <Bar 
  //       dataKey="percent" 
  //       fill="#6b99c7"  
  //       isAnimationActive={!isEqual(prevFormattedData, formattedData)}
  //     >
  //       <LabelList 
  //         dataKey="percentString" 
  //         position="insideRight" 
  //         style={{ fontSize: 45, fill: "#ffffff" }} 
  //         formatter={v => v === '0%' ? '' : v} 
  //       />
  //     </Bar>
  //   </BarChart>
  // ) 
  // : <div className='empty-graph'></div>

  const toggleActiveText = poll?.active ? 'Deactivate' : 'Activate';
  console.log('formatted data right before render: ', formattedData)
  // console.log('graph right before render: ', graph)


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
