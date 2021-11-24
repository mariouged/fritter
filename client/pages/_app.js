//import '../styles/globals.css';
import {SocketContext, socket } from '../context/socket';
import { WithSkeletonLoader } from '../components/withSkeletonLoader';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {

  const skeletonLoader = Component.skeletonLoader;

  return (
    <SocketContext.Provider value={socket}>
      <WithSkeletonLoader skeletonLoader={skeletonLoader}>
        <Component {...pageProps} />
      </WithSkeletonLoader>
    </SocketContext.Provider>
  )
}

export default MyApp
