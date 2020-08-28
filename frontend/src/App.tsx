import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Temp from './Temp';
import CodeAnalysisResult from './pages/CodeAnalysisResult';
import CodeFilesUpload from './pages/CodeFilesUpload';
import {Path} from './pages/Path';
import ViolationCase from './pages/ViolationCase';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={Path.CODE_ANALYSIS_RESULT}>
          <CodeAnalysisResult />
        </Route>
        <Route path={Path.VIOLATION_CASE + '/:title'}>
          <ViolationCase />
        </Route>
        <Route path={Path.HOME}>
          <CodeFilesUpload />
        </Route>
      </Switch>
    </Router>
  );
}
