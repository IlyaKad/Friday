import { routes } from './routes.js'
import { HashRouter as Router, Route } from 'react-router-dom'


export function App() {
  return (
    <Router>
      {
        routes.map(route => <Route key={route.path} exact component={route.component}
          path={route.path} />)
      }
    </Router>
  );
}


