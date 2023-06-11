import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Pdfviewer from '../Pdfviewer/Pdfviewer';
import Test from '../Test/Test'


const Routes = () => {
    return <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/viewpdf" exact component={Pdfviewer} />
        <Route path="/test" exact component={Test} />
    </Switch>
}
export default Routes;