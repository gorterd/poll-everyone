export const standardGraph = (options, settings = {}) => {
  if ( !options || !options[0].responseIds ) { return null }

  const numResponses = options.reduce( (sum, option) => (sum + option.responses.length), 0 ) || 1;
  
  return options.map( option => {
    const {ord, body, correct } = option;
    const key = String.fromCharCode(parseInt(ord) + 65);
    const percent = Math.round(100 * (option.responses.length / numResponses));
    const percentString = `${percent}%`;
    const label = JSON.stringify([key, body, percent]);
    // return { key, body, correct, percent, percentString, zero: 0 }
    return { label, key, body, correct, percent, percentString }
  })
}