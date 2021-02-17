import React, { useCallback, useMemo } from 'react'
import { BarChart, XAxis, YAxis, Bar, LabelList } from 'recharts'

const yAxisLine = { strokeWidth: 2.5, stroke: '#6b99c7' }
const barFill = '#6b99c7'
const fontFamily = 'sans-serif'

const PresentationGraph = ({ 
  formattedData, 
  graphDimensions: dims, 
  isAnimationActive,
  activated
}) => { 
  const numRows = formattedData.length
  const graphWidth = Math.min(dims.width, dims.height * 2.5)
  const graphHeight = Math.min(dims.height, dims.width * numRows / 3)
  const maxLabelHeight = graphHeight / Math.max(numRows, 3)
  const barHeight = maxLabelHeight * 0.75
  const largeBodyFont = barHeight * 0.5
  const rectHeight = barHeight * 0.6
  const barFontSize = rectHeight * 0.9

  const maxBody = formattedData.reduce((maxBody, answerData) => 
    maxBody.length > answerData.body.length 
      ? maxBody 
      : answerData.body
  , 0)
  const marginPercent = 0.15 + Math.min((maxBody.length / 30) * 0.25, 0.25)
  const leftMargin = graphWidth * marginPercent

  const ctx = useMemo(() => 
    document.createElement('canvas').getContext('2d')
  , [])

  const wordsWillFit = useCallback( lineWords => 
    ctx.measureText(lineWords.join(' ')).width < leftMargin * 1.05
  , [ctx, leftMargin])

  const { fontSize, lineHeight } = useMemo(() => {
    let fontSize = largeBodyFont, lineHeight

    while (fontSize--) {
      ctx.font = `${fontSize}px ${fontFamily}`
      lineHeight = fontSize * 1.15

      const maxLines = Math.floor(maxLabelHeight / lineHeight)
      const lines = generateLines(wordsWillFit, maxBody)
      if (lines?.length <= maxLines) break
    }

    return { fontSize, lineHeight }
  }, [largeBodyFont, ctx, maxLabelHeight, maxBody, wordsWillFit])

  const generateText = useCallback( (lines, { x, y }) => {
    const initY = y - (lineHeight * (lines.length - 1.5) / 2)
    return lines.map( (line, idx) => 
      <text
        key={idx}
        x={x - 5}
        y={initY + (idx * lineHeight)}
        textAnchor="end"
        style={{ 
          fontSize, 
          fontFamily, 
          fontWeight: (lineHeight > 40 ? 400 : 600)
        }}
        className="recharts-text recharts-label"
      >
        {line}
      </text>
    )
  }, [fontSize, lineHeight])

  const labelRender = useCallback( props => {
    const { x, y, payload } = props
    const [ key, body, percent ] = JSON.parse(payload.value)
    const lines = generateLines(wordsWillFit, body)
    
    return (
      <g>
        {generateText(lines, props)}

        { percent && activated && 
          <rect
            x={ x + 12 } 
            y={ y - (rectHeight / 2) }
            width={ rectHeight * 0.87 }
            height={ rectHeight }
            fill={'#b5cce3'}
          ></rect>
        }
        { activated && 
          <text
            x={ x + 12 + rectHeight * .1 } 
            y={y + (barFontSize * 0.35) }          
            textAnchor="start"
            style={{ fontFamily, fontWeight: 700, fontSize: barFontSize }}
            className="recharts-text recharts-label"
          >
            {key}
          </text>
        }
      </g>
    )
  }, [activated, barFontSize, rectHeight, generateText, wordsWillFit])

  return ( 
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
          style={{ fontSize: barFontSize, fill: '#ffffff' }}
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
  )
}

function generateLines(wordsWillFitFn, text) {
  const labelWords = text.split(' ')
  const lines = []

  while (labelWords.length) {
    let nextLine = getNextLine(wordsWillFitFn, labelWords)
    if (nextLine.length === 0) return null
    lines.push(nextLine)
  }

  return lines
}

function getNextLine(wordsWillFitFn, labelWords) {
  const lineWords = []
  while (
    labelWords.length
    && wordsWillFitFn(lineWords.concat(labelWords[0]))
  ) lineWords.push(labelWords.shift())

  return lineWords.join(' ')
}

export default PresentationGraph