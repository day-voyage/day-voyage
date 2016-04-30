import app from 'ampersand-app';
import React from 'react';
import Router from 'ampersand-router';
import PublicPage from './pages/index';
import ConfirmationPage from './pages/confirmation';
import ActivitiesPage from './pages/activities';
import Layout from './layout';
import Filter from './layout';

export default Router.extend({

  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout>
          {page}
        </Layout>
      )
    }
    React.render(page, document.body)
  },

  renderIndex (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout>
          {page}
                  <Filter>
        
                </Filter>
          </Layout>

      )
    }
    React.render(page, document.body)
  },

  routes: {
    '': 'public',
    'activities': 'activities',
    'confirmation': 'confirmation',
    'search': 'search'
  },

  public () {
    this.renderIndex(<PublicPage/>, {layout: false})
  },

  activities () {
    this.renderPage(<ActivitiesPage/>)
  },

  confirmation () {
    this.renderPage(<ConfirmationPage/>)
  },

  search () {
    console.log('search yelp, goto Activities page')
    this.renderPage(<ActivitiesPage/>)
  }

});
