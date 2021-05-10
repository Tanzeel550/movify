import React from 'react';

type Props = {
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  movie: {
    dateWatched: number;
    whatYouLearnt: string;
  };
};

const WatchedComponent = ({
  handleTextChange,
  handleDateChange,
  movie,
}: Props) => (
  <div className="col-sm-12 row">
    <div className="col-lg-4 col-md-4">
      <label htmlFor="dateWatched">Date Watched:</label>
      <input
        type="date"
        id="dateWatched"
        value={movie.dateWatched}
        onChange={handleDateChange}
        className="form-control"
      />
    </div>
    <div className="col-lg-8 col-md-8" />
    <div className="col-sm-12">
      <label htmlFor="text-area">What You Learnt from it?</label>
      <textarea
        value={movie.whatYouLearnt}
        onChange={handleTextChange}
        id="text-area"
        className="form-control"
        style={{ height: 285 }}
      />
    </div>
  </div>
);

export default WatchedComponent;
