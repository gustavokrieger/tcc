import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CodeAnalysisResult from './CodeAnalysisResult';
import CodeFilesUpload from './CodeFilesUpload';
import {Path} from './Path';
import ViolationCase from './ViolationCase';

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
