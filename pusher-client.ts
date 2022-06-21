import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.APP_ID || '',
  key: process.env.KEY || '',
  secret: process.env.SECRET || '',
  cluster: process.env.CLUSTER || '',
  useTLS: true,
});

export default pusher;
