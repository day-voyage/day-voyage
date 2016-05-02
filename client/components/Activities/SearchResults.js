import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Activity from './Activity';
import Result from '../Helpers/Result';

export default class SearchResults extends React.Component {

  render() {
    const { results, onConfirmClicked } = this.props;

    const hasResults = results.length > 0;

    const nodes = !hasResults ?

      <em>Your Search Results!</em> :
      results.map(result =>
        <Result
          title={result.title}
          categories={result.categories}
          location={result.location}
          key={result.id}/>
    )
    return (
      <div className="col-md-4">
        <h3>Your Itinerary</h3>
        <div>{nodes}</div>
        <button onClick={onConfirmClicked}
          disabled={hasActivities ? '' : 'disabled'}>
          Confirm
        </button>
      </div>
    );
  }
};

SearchResults.propTypes = {
  results: PropTypes.array,
  onConfirmClicked: PropTypes.func
};
