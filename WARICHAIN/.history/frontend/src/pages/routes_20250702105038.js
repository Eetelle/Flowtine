import CreateGroup from './CreateGroup';
import AddMember from './AddMember';
import Deposit from './Deposit';
import Dashboard from './Dashboard';

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/create-group', element: <CreateGroup /> },
  { path: '/add-member', element: <AddMember /> },
  { path: '/deposit', element: <Deposit /> },
];

export default routes;