import React, { useState } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList
} from 'recharts';

export default function PresentationGraph({ formattedData, graphDimensions, isAnimationActive }) {  
  if (!formattedData) return null;

  const graphWidth = Math.min(graphDimensions.width, graphDimensions.height * 3);
  const graphHeight = Math.min(graphDimensions.height, graphDimensions.width * formattedData.length / 4 );
  const maxLabelHeight = (graphHeight / formattedData.length) * 0.8;
  const barHeight = maxLabelHeight * 0.75;
  const largeBodyFont = barHeight * 0.5;
  const rectHeight = barHeight * .65;
  const barFontSize = rectHeight;

  const maxBody = formattedData.reduce((maxBody, answerData) => {
    return maxBody.length > answerData.body.length ? maxBody : answerData.body;
  }, 0);
  
  const marginPercentage = .25 + Math.min((maxBody.length / 30) * .15, .15);
  const leftMargin = graphWidth * marginPercentage;

  const yAxisLine = { strokeWidth: 3, stroke: "#6b99c7" };
  const barFill = "#6b99c7";
  const fontFamily = "sans-serif";

  const ctx = document.createElement('canvas').getContext('2d'); 
  const { fontSize, lineHeight } = setFontSizeAndLineHeight();
  
  function setFontSizeAndLineHeight(){
    let fontSize = largeBodyFont, lineHeight;
    
    while (fontSize--) {
      ctx.font = `${fontSize}px ${fontFamily}`;
      lineHeight = fontSize * 1.15;
      
      let maxLines = Math.floor(maxLabelHeight / lineHeight);
      let lines = generateLines(maxBody);
      if (lines?.length <= maxLines) break;
    }
    
    return { fontSize, lineHeight }
  }

  function generateLines(text) {
    const labelWords = text.split(' ');
    const lines = [];

    while (labelWords.length) {
      let nextLine = getNextLine(labelWords);
      if (nextLine.length === 0) return null;
      lines.push(nextLine);
    }

    return lines;
  }

  function getNextLine(labelWords) {
    const lineWords = [];
    while (labelWords.length && willFit(lineWords.concat(labelWords[0]))) {
      lineWords.push(labelWords.shift());
    }

    return lineWords.join(' ');
  }

  function willFit(lineWords) {
    const line = lineWords.join(' ');
    return ctx.measureText(line).width < leftMargin;
  }

  function generateText(lines, { x, y }) {
    const initY = y - (lineHeight * (lines.length - 1.5) / 2);
    return lines.map( (line, idx) => {
      return (
        <text
          key={idx}
          x={x}
          y={initY + (idx * lineHeight)}
          textAnchor="end"
          style={{ fontSize, fontFamily }}
          className="recharts-text recharts-label"
        >
          {line}
        </text>
      );
    });
  }

  function labelRender(props) {
    const { x, y, payload } = props;
    const [ key, body, percent ] = JSON.parse(payload.value);
    const lines = generateLines(body);
    
    return (
      <g>
        {generateText(lines, props)}

        { percent 
        ? <rect
            x={ x + 12 } 
            y={ y - (rectHeight / 2) }
            width={ rectHeight * .87 }
            height={ rectHeight }
            fill={"#b5cce3"}
        ></rect>
        : null }

        <text
          x={ x + 14 } 
          y={y + (barFontSize * .35) }          
          textAnchor="start"
          style={{ fontFamily, fontWeight: 700, fontSize: barFontSize }}
          className="recharts-text recharts-label"
        >
          {key}
        </text>
      </g>
    )
  }

  const [show, setShow] = useState(false);
  setTimeout(() => setShow(true), 10);

  return show && ( 
    <BarChart
      data={formattedData}
      layout="vertical"
      margin={{ left: leftMargin }}
      width={graphWidth}
      height={graphHeight}
    >
      <XAxis type="number" hide={true} />
      <Bar
        dataKey="percent"
        fill={barFill}
        barSize={barHeight}
        isAnimationActive={isAnimationActive}
      >
        <LabelList
          dataKey="percentString"
          position="insideRight"
          formatter={v => v === '0%' ? '' : v}
          style={{ fontSize: barFontSize, fill: "#ffffff" }}
        />
      </Bar>
      <YAxis
        type="category"
        axisLine={yAxisLine}
        tickLine={false}
        dataKey="label"
        tick={labelRender}
      />
    </BarChart>
  );
}