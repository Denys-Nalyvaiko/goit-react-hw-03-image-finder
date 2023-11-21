import { CirclesWithBar } from 'react-loader-spinner';

export const Loader = () => (
  <CirclesWithBar
    height="100"
    width="100"
    color="#3f51b5"
    wrapperStyle={{ margin: '24px auto 0' }}
    wrapperClass=""
    visible={true}
    outerCircleColor=""
    innerCircleColor=""
    barColor=""
    ariaLabel="circles-with-bar-loading"
  />
);
