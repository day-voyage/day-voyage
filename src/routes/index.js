import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../containers';
import { ActivitiesView, HomeView, LoginView, ProfileView, ConfirmView } from '../views';
import { requireAuthentication } from '../components/AuthenticatedComponent';

export default(
    <Route path='/' component={ App }>
        <IndexRoute component={ HomeView }/>
        <Route path="login" component={ LoginView }/>
        <Route path="profile" component={ requireAuthentication(ProfileView) }/>
        <Route path="confirm" component={ ConfirmView } />
        <Route path="activities" component={ ActivitiesView } />
    </Route>
);
