import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { 
  BarChart, 
  XAxis, 
  YAxis, 
  Bar, 
  LabelList,
} from 'recharts';
import _debounce from 'lodash.debounce';
 
import { presenterPollData } from '../../../util/selectors';
import { fetchFullPoll, toggleActive } from '../../../actions/poll_actions'
import { standardGraph } from '../../../util/data_formats_util';
import { 
  receiveActivePoll, 
  clearActivePoll, 
  receiveResponse, 
  clearResponse } 
from '../../../actions/presentation_actions';

const POLL = 'POLL';
const RESPONSE = 'RESPONSE';
const CLEAR_RESPONSE = 'CLEAR_RESPONSE';

class PresentPoll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subscription: null,
      graphWidth: 0,
      graphHeight: 0
    }

    this._subscribe = this._subscribe.bind(this)
    this.receiveBroadcast = this.receiveBroadcast.bind(this)
    this.toggleActivation = this.toggleActivation.bind(this)
    this.resetGraphDimensions = this.resetGraphDimensions.bind(this)
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', _debounce(this.resetGraphDimensions, 100));
    this.resetGraphDimensions();

    const { pollId, currentId } = this.props;

    this.props.fetchFullPoll(pollId)
      .then( poll => {
        if (poll.active) {
          this._subscribe(currentId)
        }
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  _subscribe(presenterId) {
    this.setState({
      subscription: App.cable.subscriptions.create(
        { channel: 'PresentationChannel', presenterId },
        {
          received: broadcast => {
            this.receiveBroadcast(broadcast)
          },
        }
      )
    }) 
  }

  receiveBroadcast(broadcast) {
    const { receiveActivePoll, clearActivePoll, receiveResponse, clearResponse } = this.props;
    const response = JSON.parse(broadcast.data);
    
    switch (broadcast.type) {
      case POLL:
        response.poll.active ? receiveActivePoll(response) : clearActivePoll();
        break;
      case RESPONSE:
        receiveResponse(response);
        break;
      case CLEAR_RESPONSE:
        clearResponse(response);
        break;
    }
  }

  toggleActivation(){
    const { subscription } = this.state;
    const { poll: { active: isDeactivating, id: pollId }, currentId, toggleActive } = this.props;

    toggleActive(pollId).then( () => {
      isDeactivating ? subscription.unsubscribe() : this._subscribe(currentId);
    });
  }

  _generateGraph(){
    const { formattedData } = this.props;
    const { graphWidth, graphHeight } = this.state;
    
    const largeFont = 45;
    const defaultMargin = 150;
    const yAxisLine = {
      strokeWidth: 3,
      stroke: "#6b99c7"
    };
    const barFill = "#6b99c7";

    const maxBody = formattedData.reduce((maxBody, answerData) => {
      return maxBody.length > answerData.body.length ? maxBody : answerData.body;
    }, 0);

    const leftFontSize = showKeys ? largeFont : largeFont - (maxSize * 0.5);
    const leftMargin = maxBody.length > 30 ? defaultMargin : defaultMargin + maxSize * 3; 

    const keyRender = (props) => {
      const { x, y, height, width, value } = props;

      const hasRect = Boolean(width);
      console.log(props);
      return (
        <g>
          <rect
          x={x + 10} y={y + 0.2 * height} 
          width="2em" 
          height={0.6 * height}
          fill={ hasRect ? "#b5cce3" : "rgba(0,0,0,0)"}
          >
        </rect>
        <text 
          style={{ fontSize: largeFont, fontWeight: 700 }}
          textAnchor="start"
          x={x + 12} y={y + height/2} 
          dy="0.31em"
          width="1em"
          className="recharts-text recharts-label"
            height={0.6 * height}
        >
          {value}
        </text>
        </g>

      )
    }

    const bodyRender = (props) => {
      const { x, y, height, width, value } = props;

      const hasRect = Boolean(width);
      console.log(props);
      return (
        <g>
          <rect
            x={x + 10} y={y + 0.2 * height}
            width="2em"
            height={0.6 * height}
            fill={hasRect ? "#b5cce3" : "rgba(0,0,0,0)"}
          >
          </rect>
          <text
            style={{ fontSize: largeFont, fontWeight: 700 }}
            textAnchor="start"
            x={x + 12} y={y + height / 2}
            dy="0.31em"
            width="1em"
            className="recharts-text recharts-label"
            height={0.6 * height}
          >
            {value}
          </text>
        </g>

      )
    }

    return (
      <BarChart width={graphWidth} height={graphHeight} data={formattedData} layout="vertical" margin={{ left: leftMargin }}>
        <XAxis type="number" hide={true} />
        <YAxis  tick={false} type="category" axisLine={yAxisLine} />
        <Bar dataKey="percent" fill={barFill} >
          <LabelList dataKey="percentString" position="insideRight" formatter={ v => v === '0%' ? '' : v }
            style={{ fontSize: largeFont, fill: "#ffffff" }} />
          {/* <LabelList dataKey="key" position="insideLeft"
            style={{ fontSize: largeFont, fontWeight: 700 }}
          /> */}
          <LabelList dataKey="key" content={keyRender}/>
          <LabelList dataKey="body" position="left"
            style={{ fontSize: leftFontSize, fontWeight: 700 }}
          />
        </Bar>
      </BarChart>
    );
  }

  resetGraphDimensions(){
    const graphWidth = this.graphDiv.getBoundingClientRect().width;
    const graphHeight = this.graphDiv.getBoundingClientRect().height;
    this.setState({ graphWidth, graphHeight });
  }

  _calculateFontSize(h,w,text){
    // height calculated by distance between items (height / num items)
    // create div with specified width
    // init fontsize
    // 
  }

  render() {
    const { pollId, poll, history, formattedData } = this.props;

    const graph = formattedData ? this._generateGraph() : <div className='empty-graph'></div>;

    return (
      <section className='show-poll-container'>
        <div className='show-poll-left'>
          <div className='graph-container'>
            <div className='graph' ref={ div => this.graphDiv = div }>
              {graph}
            </div>
          </div>
        </div>


        <div className='show-poll-right'>
          <div className='show-poll-executive-commands'>
            <Link className='button-blue' to={`/polls/${pollId}/edit`}>Edit</Link>
            <button className='button-transparent'
              onClick={this.toggleActivation}
            >{ (poll && poll.active) ? 'Deactivate' : 'Activate'}</button>
            <button className='button-transparent'
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >Back</button>
          </div>
        </div>

      </section>
    )
  }
};

const mapState = (state, ownProps) => {
  const pollId = ownProps.match.params.pollId;
  const { poll, fullAnswerOptions } = presenterPollData(state, pollId);
  const formattedData = standardGraph(fullAnswerOptions);

  return {
    currentId: state.session.currentId,
    pollId, poll, fullAnswerOptions, formattedData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFullPoll: (pollId) => dispatch(fetchFullPoll(pollId)),
    receiveActivePoll: data => dispatch(receiveActivePoll(data)),
    clearActivePoll: () => dispatch(clearActivePoll()),
    receiveResponse: response => dispatch(receiveResponse(response)),
    clearResponse: response => dispatch(clearResponse(response)),
    toggleActive: pollId => dispatch(toggleActive(pollId)),

  }
}

export default withRouter(connect(mapState, mapDispatch)(PresentPoll));
