import React from 'react';

const WatchedComponent = ({ handleTextChange, handleDateChange, state }) => (
  <div className="col-sm-12 row">
    <div className="col-lg-4 col-md-4">
      <label htmlFor="dateWatched">Date Watched:</label>
      <input
        type="date"
        id="dateWatched"
        value={state.dateWatched}
        onChange={handleDateChange}
        className="form-control"
      />
    </div>
    <div className="col-lg-8 col-md-8" />
    <div className="col-sm-12">
      <label htmlFor="text-area">What You Learnt from it?</label>
      <textarea
        value={state.whatYouLearnt}
        onChange={handleTextChange}
        id="text-area"
        className="form-control"
        style={{ height: 285 }}
      />
    </div>
  </div>
);

export default WatchedComponent;
