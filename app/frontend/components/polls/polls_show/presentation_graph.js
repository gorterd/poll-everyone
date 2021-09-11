import { curry } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { BarChart, XAxis, YAxis, Bar, LabelList } from 'recharts'
import { useStableMutable } from '../../../hooks/general'
import { measureTextWidth } from '../../../util/general_util'

const fontFamily = 'sans-serif'
const labelTextClassName = 'recharts-text recharts-label'
const blue = '#6b99c7'
const lightBlue = '#b5cce3'

const PresentationGraph = ({
  formattedData,
  graphDimensions: dims,
  isAnimationActive,
  activated
}) => {
  const numRows = formattedData.length
  const graphWidth = Math.min(dims.width, dims.height * 2.5)
  const graphHeight = Math.min(dims.height, dims.width * numRows / 3)

  const measurements = useMemo(() => {
    const maxLabelHeight = graphHeight / Math.max(numRows, 3) * 0.9
    const barHeight = maxLabelHeight * 0.75
    const rectHeight = barHeight * 0.6

    return {
      maxLabelHeight,
      barHeight,
      rectHeight,
      rectWidth: rectHeight * 0.87,
      initialLabelFontSize: barHeight * 0.5,
      barFontSize: rectHeight * 0.9
    }
  }, [graphHeight, numRows])

  const answerBodies = useStableMutable(formattedData.map(({ body }) => body))
  const maxBodyLength = Math.max(...answerBodies.map(b => b.length))
  const marginPercent = 0.1 + Math.min((maxBodyLength / 30) * 0.25, 0.25)
  const leftMargin = graphWidth * marginPercent

  const { doWordsFit, fontSize, lineHeight } = useTextSize({
    textBodies: answerBodies,
    initialFontSize: measurements.initialLabelFontSize,
    width: leftMargin,
    height: measurements.maxLabelHeight,
    fontFamily,
  })

  const generateText = useCallback((lines, { x, y }) => {
    const initY = y - (lineHeight * (lines.length - 1.5) / 2)
    return lines.map((line, idx) =>
      <text
        key={idx}
        x={x - 5}
        y={initY + (idx * lineHeight)}
        textAnchor='end'
        style={{ fontSize, fontFamily }}
        className={labelTextClassName}
      >
        {line}
      </text>
    )
  }, [fontSize, lineHeight])

  const labelRender = useCallback(props => {
    const { x, y, payload } = props
    const [key, body, percent] = JSON.parse(payload.value)
    const lines = generateLines(body, doWordsFit)
    const { rectWidth, rectHeight, barFontSize } = measurements
    return (
      <g>
        {generateText(lines, props)}

        {percent && activated &&
          <rect
            x={x + 12}
            y={y - (rectHeight / 2)}
            width={rectWidth}
            height={rectHeight}
            fill={lightBlue}
          ></rect>
        }
        {activated &&
          <text
            x={x + 12 + rectHeight * .1}
            y={y + (barFontSize * 0.35)}
            textAnchor='start'
            style={{ fontFamily, fontWeight: 700, fontSize: barFontSize }}
            className={labelTextClassName}
          >
            {key}
          </text>
        }
      </g>
    )
  }, [activated, measurements, generateText, doWordsFit])

  const percentRender = useCallback(({ value, x, y, width, height }) => {
    if (value === '0%') return null
    const { barFontSize, rectWidth } = measurements
    const textWidth = measureTextWidth(value, barFontSize, fontFamily)
    const fitsInBar = textWidth + rectWidth + 10 < width
    const fill = fitsInBar ? '#ffffff' : '#000000'

    return (
      <text
        x={x + width + (fitsInBar ? -1 * textWidth : 5)}
        y={y + (height / 2) + (barFontSize * 0.35)}
        style={{ fontSize: barFontSize, fill }}
        className={labelTextClassName}
      >
        {value}
      </text>
    )
  }, [measurements])

  return graphHeight > 100 && graphWidth > 200
    ? (
      <BarChart
        data={formattedData}
        layout='vertical'
        margin={{ left: leftMargin, right: 20 }}
        width={graphWidth}
        height={graphHeight}
      >
        <XAxis type='number' hide={true} />
        <Bar
          dataKey='percent'
          fill={blue}
          barSize={measurements.barHeight}
          isAnimationActive={isAnimationActive}
        >
          <LabelList dataKey='percentString' content={percentRender} />
        </Bar>
        <YAxis
          type='category'
          axisLine={{ strokeWidth: 2.5, stroke: blue }}
          tickLine={false}
          dataKey='label'
          tick={labelRender}
        />
      </BarChart>
    )
    : <p>Graph cannot render at this size.</p>
}

function useTextSize({
  textBodies,
  initialFontSize,
  width,
  height,
  fontFamily,
}) {
  const LINE_HEIGHT_RATIO = 1.15

  const doWordsFit = useMemo(() => curry((fontSize, words) => {
    const textWidth = measureTextWidth(words.join(' '), fontSize, fontFamily)
    return textWidth < width * 0.95
  }), [width, fontFamily])

  const getLabelFontSize = useCallback(labelBody => {
    let fontSize = initialFontSize

    const doesLabelBodyFit = () => {
      const maxLines = Math.floor(height / (fontSize * LINE_HEIGHT_RATIO))
      const lines = generateLines(labelBody, doWordsFit(fontSize))
      return lines && lines.length <= maxLines
    }

    while (!doesLabelBodyFit()) fontSize--
    return fontSize
  }, [initialFontSize, height, doWordsFit])

  const fontSize = useMemo(() => (
    Math.min(...textBodies.map(getLabelFontSize))
  ), [textBodies, getLabelFontSize])

  return {
    fontSize,
    doWordsFit: useMemo(() => doWordsFit(fontSize), [fontSize, doWordsFit]),
    lineHeight: fontSize * LINE_HEIGHT_RATIO,
  }
}

function generateLines(text, doWordsFit) {
  const words = text.split(' ')
  const lines = []

  function getNextLine() {
    const lineWords = []
    while (words.length && doWordsFit(lineWords.concat(words[0])))
      lineWords.push(words.shift())
    return lineWords.join(' ')
  }

  while (words.length) {
    let nextLine = getNextLine()
    if (nextLine === '') return null
    lines.push(nextLine)
  }

  return lines
}

export default PresentationGraph