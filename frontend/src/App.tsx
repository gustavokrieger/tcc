import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CodeAnalysisResult from './pages/CodeAnalysisResult';
import CodeFilesUpload from './pages/CodeFilesUpload';
import {Path} from './pages/Path';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Path.HOME}>
          <CodeFilesUpload />
        </Route>
        <Route
          path={Path.CODE_ANALYSIS_RESULT}
          render={props => <CodeAnalysisResult {...props} />}
        />
      </Switch>
    </Router>
  );
}
