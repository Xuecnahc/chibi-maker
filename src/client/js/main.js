import React from 'react' // eslint-disable-line
import {Router, Route, Switch, Redirect} from 'react-router'
import {createBrowserHistory} from 'history'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// Routes
import Routes from '../../common/constants/Routes'

// Redux middlewares
import CharacterReducer from './CharacterReducer'

// Pages
import App from './App.js'
import MakerPage from './maker/MakerPage.js'
import CharacterMakerPage from './maker/CharacterMakerPage.js'
import ListPage from './list/ListPage.js'
import NotFoundPage from './errors/NotFoundPage.js'
render(
  <Provider store={createStore(CharacterReducer)}>
    <Router history={createBrowserHistory()}>
      <App>
        <Switch>
          <Route exact path='/' component={MakerPage} />
          <Route exact path={Routes.CREATE} component={MakerPage} />
          <Route exact path={Routes.LIST} component={ListPage} />
          <Route exact path={Routes.CREATE + '/:id'} component={CharacterMakerPage} />
          <Route exact path={Routes.EDIT + '/:id'} component={CharacterMakerPage} />
          <Redirect from={Routes.EDIT} to={Routes.CREATE} />
          <Route component={NotFoundPage} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('main')
)
