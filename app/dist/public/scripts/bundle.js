(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.signup = exports.signin = exports.load = exports.isLoaded = undefined;

var _constants = require('../constants');

var isLoaded = exports.isLoaded = function isLoaded(state) {
  return state.auth && state.auth.loaded;
};

var load = exports.load = function load() {
  return {
    types: [_constants.LOAD, _constants.LOAD_SUCCESS, _constants.LOAD_FAIL],
    promise: function promise(client) {
      return client.get('/user/loadauth');
    }
  };
};

var signin = exports.signin = function signin(_ref) {
  var email = _ref.email;
  var password = _ref.password;
  return {
    types: [_constants.SIGNIN, _constants.SIGNIN_SUCCESS, _constants.SIGNIN_FAIL],
    promise: function promise(client) {
      return client.post('/user/authenticate', {
        data: { email: email, password: password }
      });
    }
  };
};

var signup = exports.signup = function signup(_ref2) {
  var completeName = _ref2.completeName;
  var email = _ref2.email;
  var password = _ref2.password;
  var passwordConfirmation = _ref2.passwordConfirmation;
  return {
    types: [_constants.SIGNUP, _constants.SIGNUP_SUCCESS, _constants.SIGNUP_FAIL],
    promise: function promise(client) {
      return client.post('/user/register', {
        data: { completeName: completeName, email: email, password: password, passwordConfirmation: passwordConfirmation }
      });
    }
  };
};

var logout = exports.logout = function logout() {
  return {
    types: [_constants.LOGOUT, _constants.LOGOUT_SUCCESS, _constants.LOGOUT_FAIL],
    promise: function promise(client) {
      return client.get('/user/logout');
    }
  };
};

},{"../constants":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

Object.keys(_auth).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});

},{"./auth":1}],3:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactRouterScroll = require('react-router-scroll');

var _reactRouterScroll2 = _interopRequireDefault(_reactRouterScroll);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _ApiClient = require('./helpers/ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__INITIAL_STATE__;

var client = new _ApiClient2.default();
var store = (0, _store2.default)(client, _reactRouter.browserHistory, initialState);

var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_reactRouter.Router, {
    children: (0, _router2.default)(store),
    history: history,
    render: (0, _reactRouter.applyRouterMiddleware)((0, _reactRouterScroll2.default)())
  })
), document.getElementById('react-view'));

},{"./helpers/ApiClient":9,"./router":13,"./store":14,"react":"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router","react-router-redux":16,"react-router-scroll":"react-router-scroll"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppView = function AppView(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { id: 'app-view' },
    _react2.default.createElement(_reactHelmet2.default, _config2.default.head),
    children
  );
};

AppView.propTypes = {
  children: _react.PropTypes.node
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state);
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_extends({}, _actions.auth), dispatch);
})(AppView);

},{"../../actions":2,"../../config":7,"react":"react","react-helmet":"react-helmet","react-redux":"react-redux","redux":"redux"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactHelmet2.default, { title: ' - Home' }),
    'vai a merda'
  );
};

exports.default = Home;

},{"react":"react","react-helmet":"react-helmet"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = exports.AppView = undefined;

var _AppView2 = require('./containers/AppView');

var _AppView3 = _interopRequireDefault(_AppView2);

var _Home2 = require('./containers/Home');

var _Home3 = _interopRequireDefault(_Home2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AppView = _AppView3.default;
exports.Home = _Home3.default;

},{"./containers/AppView":4,"./containers/Home":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  apiHost: '127.0.0.1',
  apiPort: '5000',
  head: {
    title: ' - portefolio',
    titleTemplate: 'malbernaz%s',
    meta: [{
      name: 'description',
      content: 'My personal portfolio.'
    }, {
      charset: 'utf-8'
    }]
  }
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD = exports.LOAD = 'LOAD';
var LOAD_SUCCESS = exports.LOAD_SUCCESS = 'LOAD_SUCCESS';
var LOAD_FAIL = exports.LOAD_FAIL = 'LOAD_FAIL';
var SIGNIN = exports.SIGNIN = 'SIGNIN';
var SIGNIN_SUCCESS = exports.SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
var SIGNIN_FAIL = exports.SIGNIN_FAIL = 'SIGNIN_FAIL';
var LOGOUT = exports.LOGOUT = 'LOGOUT';
var LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
var LOGOUT_FAIL = exports.LOGOUT_FAIL = 'LOGOUT_FAIL';
var SIGNUP = exports.SIGNUP = 'SIGNUP';
var SIGNUP_SUCCESS = exports.SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
var SIGNUP_FAIL = exports.SIGNUP_FAIL = 'SIGNUP_FAIL';

var SHOW_MESSAGE = exports.SHOW_MESSAGE = 'SHOW_MESSAGE';
var HIDE_MESSAGE = exports.HIDE_MESSAGE = 'HIDE_MESSAGE';

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var methods = ['get', 'post', 'put', 'del'];

var isServer = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object';

function formatUrl(path) {
  var adjustedPath = path[0] !== '/' ? '' + path : path;

  if (isServer) {
    return '\n      http://' + _config2.default.apiHost + ':' + (_config2.default.apiPort + adjustedPath) + '\n    ';
  }

  return '/api/' + adjustedPath;
}

var ApiClient = function ApiClient(req) {
  var _this = this;

  _classCallCheck(this, ApiClient);

  methods.forEach(function (method) {
    return _this[method] = function (path) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var params = _ref.params;
      var data = _ref.data;
      return new Promise(function (resolve, reject) {
        var request = _superagent2.default[method](formatUrl(path));

        if (params) request.query(params);

        if (isServer && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) request.send(data);

        request.end(function (err) {
          var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var body = _ref2.body;

          var requestErr = err;
          return requestErr ? reject(body || err) : resolve(body);
        });
      });
    };
  });
};

exports.default = ApiClient;

},{"../config":7,"superagent":"superagent"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = promiseMiddleware;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function promiseMiddleware(client) {
  return function (_ref) {
    var getState = _ref.getState;
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }

        var promise = action.promise;
        var types = action.types;

        var rest = _objectWithoutProperties(action, ['promise', 'types']);

        if (!promise) return next(action);

        var _types = _slicedToArray(types, 3);

        var REQUEST = _types[0];
        var SUCCESS = _types[1];
        var FAILURE = _types[2];


        next(_extends({}, rest, { type: REQUEST }));

        var actionPromise = promise(client);

        actionPromise.then(function (result) {
          return next(_extends({}, rest, { result: result, type: SUCCESS }));
        }, function (error) {
          return next(_extends({}, rest, { error: error, type: FAILURE }));
        }).catch(function (err) {
          console.error('MIDDLEWARE ERROR:', err);
          next(_extends({}, rest, { err: err, type: FAILURE }));
        });

        return actionPromise;
      };
    };
  };
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var reducer = function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { loaded: false } : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case _constants.LOAD:
      return _extends({}, state, {
        loading: true
      });
    case _constants.LOAD_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        status: action.result.status,
        user: action.result.user
      });
    case _constants.LOAD_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        status: Object.keys(action.error) !== 0 ? action.error : 'unathorized'
      });

    case _constants.SIGNIN:
      return _extends({}, state, {
        signingIn: true
      });
    case _constants.SIGNIN_SUCCESS:
      return _extends({}, state, {
        signingIn: false,
        status: action.result.status,
        user: action.result.user
      });
    case _constants.SIGNIN_FAIL:
      return _extends({}, state, {
        signingIn: false,
        user: null,
        status: action.error.status
      });

    case _constants.SIGNUP:
      return _extends({}, state, {
        signingUp: true
      });
    case _constants.SIGNUP_SUCCESS:
      return _extends({}, state, {
        signingUp: false,
        status: action.result.status,
        user: action.result.user
      });
    case _constants.SIGNUP_FAIL:
      return _extends({}, state, {
        signingUp: false,
        status: action.error.status
      });

    case _constants.LOGOUT:
      return _extends({}, state, {
        loggingOut: true
      });
    case _constants.LOGOUT_SUCCESS:
      return _extends({}, state, {
        loggingOut: false,
        user: null,
        status: action.result.status
      });
    case _constants.LOGOUT_FAIL:
      return _extends({}, state, {
        loggingOut: false,
        status: action.error.status
      });

    default:
      return state;
  }
};

exports.default = reducer;

},{"../constants":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  auth: _auth2.default,
  routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;

},{"./auth":11,"react-router-redux":16,"redux":"redux"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _auth = require('./actions/auth');

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  var mustBeLogged = function mustBeLogged(nextState, replace, callback) {
    // eslint-disable-line
    function checkAuth() {
      var _store$getState = store.getState();

      var user = _store$getState.auth.user;

      if (!user) replace('/');
      callback();
    }

    if (!(0, _auth.isLoaded)(store.getState())) {
      return store.dispatch((0, _auth.load)()).then(checkAuth).catch(checkAuth);
    }
    return checkAuth();
  };

  return _react2.default.createElement(
    _reactRouter.Route,
    { name: 'app', component: _components.AppView, path: '/' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Home })
  );
};

},{"./actions/auth":1,"./components":6,"react":"react","react-router":"react-router"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _clientMiddleware = require('./middleware/clientMiddleware');

var _clientMiddleware2 = _interopRequireDefault(_clientMiddleware);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore(client, history) {
  var initialState = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var reduxRouterMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);
  var middleware = [(0, _clientMiddleware2.default)(client), reduxRouterMiddleware];

  var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window.devToolsExtension() : function (f) {
    return f;
  }));
  return store;
};

exports.default = configureStore;

},{"./middleware/clientMiddleware":10,"./reducers":12,"react-router-redux":16,"redux":"redux"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
var CALL_HISTORY_METHOD = exports.CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function updateLocation(method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      type: CALL_HISTORY_METHOD,
      payload: { method: method, args: args }
    };
  };
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
var push = exports.push = updateLocation('push');
var replace = exports.replace = updateLocation('replace');
var go = exports.go = updateLocation('go');
var goBack = exports.goBack = updateLocation('goBack');
var goForward = exports.goForward = updateLocation('goForward');

var routerActions = exports.routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };
},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerMiddleware = exports.routerActions = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.CALL_HISTORY_METHOD = exports.routerReducer = exports.LOCATION_CHANGE = exports.syncHistoryWithStore = undefined;

var _reducer = require('./reducer');

Object.defineProperty(exports, 'LOCATION_CHANGE', {
  enumerable: true,
  get: function get() {
    return _reducer.LOCATION_CHANGE;
  }
});
Object.defineProperty(exports, 'routerReducer', {
  enumerable: true,
  get: function get() {
    return _reducer.routerReducer;
  }
});

var _actions = require('./actions');

Object.defineProperty(exports, 'CALL_HISTORY_METHOD', {
  enumerable: true,
  get: function get() {
    return _actions.CALL_HISTORY_METHOD;
  }
});
Object.defineProperty(exports, 'push', {
  enumerable: true,
  get: function get() {
    return _actions.push;
  }
});
Object.defineProperty(exports, 'replace', {
  enumerable: true,
  get: function get() {
    return _actions.replace;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _actions.go;
  }
});
Object.defineProperty(exports, 'goBack', {
  enumerable: true,
  get: function get() {
    return _actions.goBack;
  }
});
Object.defineProperty(exports, 'goForward', {
  enumerable: true,
  get: function get() {
    return _actions.goForward;
  }
});
Object.defineProperty(exports, 'routerActions', {
  enumerable: true,
  get: function get() {
    return _actions.routerActions;
  }
});

var _sync = require('./sync');

var _sync2 = _interopRequireDefault(_sync);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.syncHistoryWithStore = _sync2['default'];
exports.routerMiddleware = _middleware2['default'];
},{"./actions":15,"./middleware":17,"./reducer":18,"./sync":19}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = routerMiddleware;

var _actions = require('./actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== _actions.CALL_HISTORY_METHOD) {
          return next(action);
        }

        var _action$payload = action.payload;
        var method = _action$payload.method;
        var args = _action$payload.args;

        history[method].apply(history, _toConsumableArray(args));
      };
    };
  };
}
},{"./actions":15}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.routerReducer = routerReducer;
/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
var LOCATION_CHANGE = exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

var initialState = {
  locationBeforeTransitions: null
};

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
function routerReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var type = _ref.type;
  var payload = _ref.payload;

  if (type === LOCATION_CHANGE) {
    return _extends({}, state, { locationBeforeTransitions: payload });
  }

  return state;
}
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = syncHistoryWithStore;

var _reducer = require('./reducer');

var defaultSelectLocationState = function defaultSelectLocationState(state) {
  return state.routing;
};

/**
 * This function synchronizes your history state with the Redux store.
 * Location changes flow from history to the store. An enhanced history is
 * returned with a listen method that responds to store updates for location.
 *
 * When this history is provided to the router, this means the location data
 * will flow like this:
 * history.push -> store.dispatch -> enhancedHistory.listen -> router
 * This ensures that when the store state changes due to a replay or other
 * event, the router will be updated appropriately and can transition to the
 * correct router state.
 */
function syncHistoryWithStore(history, store) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$selectLocationSt = _ref.selectLocationState;
  var selectLocationState = _ref$selectLocationSt === undefined ? defaultSelectLocationState : _ref$selectLocationSt;
  var _ref$adjustUrlOnRepla = _ref.adjustUrlOnReplay;
  var adjustUrlOnReplay = _ref$adjustUrlOnRepla === undefined ? true : _ref$adjustUrlOnRepla;

  // Ensure that the reducer is mounted on the store and functioning properly.
  if (typeof selectLocationState(store.getState()) === 'undefined') {
    throw new Error('Expected the routing state to be available either as `state.routing` ' + 'or as the custom expression you can specify as `selectLocationState` ' + 'in the `syncHistoryWithStore()` options. ' + 'Ensure you have added the `routerReducer` to your store\'s ' + 'reducers via `combineReducers` or whatever method you use to isolate ' + 'your reducers.');
  }

  var initialLocation = void 0;
  var isTimeTraveling = void 0;
  var unsubscribeFromStore = void 0;
  var unsubscribeFromHistory = void 0;

  // What does the store say about current location?
  var getLocationInStore = function getLocationInStore(useInitialIfEmpty) {
    var locationState = selectLocationState(store.getState());
    return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
  };

  // Init currentLocation with potential location in store
  var currentLocation = getLocationInStore();

  // If the store is replayed, update the URL in the browser to match.
  if (adjustUrlOnReplay) {
    var handleStoreChange = function handleStoreChange() {
      var locationInStore = getLocationInStore(true);
      if (currentLocation === locationInStore) {
        return;
      }

      // Update address bar to reflect store state
      isTimeTraveling = true;
      currentLocation = locationInStore;
      history.transitionTo(_extends({}, locationInStore, {
        action: 'PUSH'
      }));
      isTimeTraveling = false;
    };

    unsubscribeFromStore = store.subscribe(handleStoreChange);
    handleStoreChange();
  }

  // Whenever location changes, dispatch an action to get it in the store
  var handleLocationChange = function handleLocationChange(location) {
    // ... unless we just caused that location change
    if (isTimeTraveling) {
      return;
    }

    // Remember where we are
    currentLocation = location;

    // Are we being called for the first time?
    if (!initialLocation) {
      // Remember as a fallback in case state is reset
      initialLocation = location;

      // Respect persisted location, if any
      if (getLocationInStore()) {
        return;
      }
    }

    // Tell the store to update by dispatching an action
    store.dispatch({
      type: _reducer.LOCATION_CHANGE,
      payload: location
    });
  };
  unsubscribeFromHistory = history.listen(handleLocationChange);

  // The enhanced history uses store as source of truth
  return _extends({}, history, {
    // The listeners are subscribed to the store instead of history

    listen: function listen(listener) {
      // Copy of last location.
      var lastPublishedLocation = getLocationInStore(true);

      // Keep track of whether we unsubscribed, as Redux store
      // only applies changes in subscriptions on next dispatch
      var unsubscribed = false;
      var unsubscribeFromStore = store.subscribe(function () {
        var currentLocation = getLocationInStore(true);
        if (currentLocation === lastPublishedLocation) {
          return;
        }
        lastPublishedLocation = currentLocation;
        if (!unsubscribed) {
          listener(lastPublishedLocation);
        }
      });

      // History listeners expect a synchronous call. Make the first call to the
      // listener after subscribing to the store, in case the listener causes a
      // location change (e.g. when it redirects)
      listener(lastPublishedLocation);

      // Let user unsubscribe later
      return function () {
        unsubscribed = true;
        unsubscribeFromStore();
      };
    },


    // It also provides a way to destroy internal listeners
    unsubscribe: function unsubscribe() {
      if (adjustUrlOnReplay) {
        unsubscribeFromStore();
      }
      unsubscribeFromHistory();
    }
  });
}
},{"./reducer":18}]},{},[3]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5sb2dvdXQgPSBleHBvcnRzLnNpZ251cCA9IGV4cG9ydHMuc2lnbmluID0gZXhwb3J0cy5sb2FkID0gZXhwb3J0cy5pc0xvYWRlZCA9IHVuZGVmaW5lZDtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIGlzTG9hZGVkID0gZXhwb3J0cy5pc0xvYWRlZCA9IGZ1bmN0aW9uIGlzTG9hZGVkKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5hdXRoICYmIHN0YXRlLmF1dGgubG9hZGVkO1xufTtcblxudmFyIGxvYWQgPSBleHBvcnRzLmxvYWQgPSBmdW5jdGlvbiBsb2FkKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGVzOiBbX2NvbnN0YW50cy5MT0FELCBfY29uc3RhbnRzLkxPQURfU1VDQ0VTUywgX2NvbnN0YW50cy5MT0FEX0ZBSUxdLFxuICAgIHByb21pc2U6IGZ1bmN0aW9uIHByb21pc2UoY2xpZW50KSB7XG4gICAgICByZXR1cm4gY2xpZW50LmdldCgnL3VzZXIvbG9hZGF1dGgnKTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgc2lnbmluID0gZXhwb3J0cy5zaWduaW4gPSBmdW5jdGlvbiBzaWduaW4oX3JlZikge1xuICB2YXIgZW1haWwgPSBfcmVmLmVtYWlsO1xuICB2YXIgcGFzc3dvcmQgPSBfcmVmLnBhc3N3b3JkO1xuICByZXR1cm4ge1xuICAgIHR5cGVzOiBbX2NvbnN0YW50cy5TSUdOSU4sIF9jb25zdGFudHMuU0lHTklOX1NVQ0NFU1MsIF9jb25zdGFudHMuU0lHTklOX0ZBSUxdLFxuICAgIHByb21pc2U6IGZ1bmN0aW9uIHByb21pc2UoY2xpZW50KSB7XG4gICAgICByZXR1cm4gY2xpZW50LnBvc3QoJy91c2VyL2F1dGhlbnRpY2F0ZScsIHtcbiAgICAgICAgZGF0YTogeyBlbWFpbDogZW1haWwsIHBhc3N3b3JkOiBwYXNzd29yZCB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgc2lnbnVwID0gZXhwb3J0cy5zaWdudXAgPSBmdW5jdGlvbiBzaWdudXAoX3JlZjIpIHtcbiAgdmFyIGNvbXBsZXRlTmFtZSA9IF9yZWYyLmNvbXBsZXRlTmFtZTtcbiAgdmFyIGVtYWlsID0gX3JlZjIuZW1haWw7XG4gIHZhciBwYXNzd29yZCA9IF9yZWYyLnBhc3N3b3JkO1xuICB2YXIgcGFzc3dvcmRDb25maXJtYXRpb24gPSBfcmVmMi5wYXNzd29yZENvbmZpcm1hdGlvbjtcbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW19jb25zdGFudHMuU0lHTlVQLCBfY29uc3RhbnRzLlNJR05VUF9TVUNDRVNTLCBfY29uc3RhbnRzLlNJR05VUF9GQUlMXSxcbiAgICBwcm9taXNlOiBmdW5jdGlvbiBwcm9taXNlKGNsaWVudCkge1xuICAgICAgcmV0dXJuIGNsaWVudC5wb3N0KCcvdXNlci9yZWdpc3RlcicsIHtcbiAgICAgICAgZGF0YTogeyBjb21wbGV0ZU5hbWU6IGNvbXBsZXRlTmFtZSwgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQsIHBhc3N3b3JkQ29uZmlybWF0aW9uOiBwYXNzd29yZENvbmZpcm1hdGlvbiB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuXG52YXIgbG9nb3V0ID0gZXhwb3J0cy5sb2dvdXQgPSBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZXM6IFtfY29uc3RhbnRzLkxPR09VVCwgX2NvbnN0YW50cy5MT0dPVVRfU1VDQ0VTUywgX2NvbnN0YW50cy5MT0dPVVRfRkFJTF0sXG4gICAgcHJvbWlzZTogZnVuY3Rpb24gcHJvbWlzZShjbGllbnQpIHtcbiAgICAgIHJldHVybiBjbGllbnQuZ2V0KCcvdXNlci9sb2dvdXQnKTtcbiAgICB9XG4gIH07XG59O1xuXG59LHtcIi4uL2NvbnN0YW50c1wiOjh9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9hdXRoID0gcmVxdWlyZSgnLi9hdXRoJyk7XG5cbk9iamVjdC5rZXlzKF9hdXRoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgaWYgKGtleSA9PT0gXCJkZWZhdWx0XCIpIHJldHVybjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX2F1dGhba2V5XTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbn0se1wiLi9hdXRoXCI6MX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX3JlYWN0Um91dGVyU2Nyb2xsID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLXNjcm9sbCcpO1xuXG52YXIgX3JlYWN0Um91dGVyU2Nyb2xsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0Um91dGVyU2Nyb2xsKTtcblxudmFyIF9yZWFjdFJlZHV4ID0gcmVxdWlyZSgncmVhY3QtcmVkdXgnKTtcblxudmFyIF9yZWFjdFJvdXRlclJlZHV4ID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLXJlZHV4Jyk7XG5cbnZhciBfcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcblxudmFyIF9yb3V0ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyKTtcblxudmFyIF9zdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcblxudmFyIF9zdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yZSk7XG5cbnZhciBfQXBpQ2xpZW50ID0gcmVxdWlyZSgnLi9oZWxwZXJzL0FwaUNsaWVudCcpO1xuXG52YXIgX0FwaUNsaWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BcGlDbGllbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaW5pdGlhbFN0YXRlID0gd2luZG93Ll9fSU5JVElBTF9TVEFURV9fO1xuXG52YXIgY2xpZW50ID0gbmV3IF9BcGlDbGllbnQyLmRlZmF1bHQoKTtcbnZhciBzdG9yZSA9ICgwLCBfc3RvcmUyLmRlZmF1bHQpKGNsaWVudCwgX3JlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5LCBpbml0aWFsU3RhdGUpO1xuXG52YXIgaGlzdG9yeSA9ICgwLCBfcmVhY3RSb3V0ZXJSZWR1eC5zeW5jSGlzdG9yeVdpdGhTdG9yZSkoX3JlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5LCBzdG9yZSk7XG5cbigwLCBfcmVhY3REb20ucmVuZGVyKShfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgX3JlYWN0UmVkdXguUHJvdmlkZXIsXG4gIHsgc3RvcmU6IHN0b3JlIH0sXG4gIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZXIsIHtcbiAgICBjaGlsZHJlbjogKDAsIF9yb3V0ZXIyLmRlZmF1bHQpKHN0b3JlKSxcbiAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgIHJlbmRlcjogKDAsIF9yZWFjdFJvdXRlci5hcHBseVJvdXRlck1pZGRsZXdhcmUpKCgwLCBfcmVhY3RSb3V0ZXJTY3JvbGwyLmRlZmF1bHQpKCkpXG4gIH0pXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhY3QtdmlldycpKTtcblxufSx7XCIuL2hlbHBlcnMvQXBpQ2xpZW50XCI6OSxcIi4vcm91dGVyXCI6MTMsXCIuL3N0b3JlXCI6MTQsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWRvbVwiOlwicmVhY3QtZG9tXCIsXCJyZWFjdC1yZWR1eFwiOlwicmVhY3QtcmVkdXhcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCIsXCJyZWFjdC1yb3V0ZXItcmVkdXhcIjoxNixcInJlYWN0LXJvdXRlci1zY3JvbGxcIjpcInJlYWN0LXJvdXRlci1zY3JvbGxcIn1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX3JlYWN0SGVsbWV0ID0gcmVxdWlyZSgncmVhY3QtaGVsbWV0Jyk7XG5cbnZhciBfcmVhY3RIZWxtZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RIZWxtZXQpO1xuXG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZycpO1xuXG52YXIgX2NvbmZpZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBBcHBWaWV3ID0gZnVuY3Rpb24gQXBwVmlldyhfcmVmKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7IGlkOiAnYXBwLXZpZXcnIH0sXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0SGVsbWV0Mi5kZWZhdWx0LCBfY29uZmlnMi5kZWZhdWx0LmhlYWQpLFxuICAgIGNoaWxkcmVuXG4gICk7XG59O1xuXG5BcHBWaWV3LnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMubm9kZVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlKTtcbn0sIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICByZXR1cm4gKDAsIF9yZWR1eC5iaW5kQWN0aW9uQ3JlYXRvcnMpKF9leHRlbmRzKHt9LCBfYWN0aW9ucy5hdXRoKSwgZGlzcGF0Y2gpO1xufSkoQXBwVmlldyk7XG5cbn0se1wiLi4vLi4vYWN0aW9uc1wiOjIsXCIuLi8uLi9jb25maWdcIjo3LFwicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1oZWxtZXRcIjpcInJlYWN0LWhlbG1ldFwiLFwicmVhY3QtcmVkdXhcIjpcInJlYWN0LXJlZHV4XCIsXCJyZWR1eFwiOlwicmVkdXhcIn1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RIZWxtZXQgPSByZXF1aXJlKCdyZWFjdC1oZWxtZXQnKTtcblxudmFyIF9yZWFjdEhlbG1ldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEhlbG1ldCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBIb21lID0gZnVuY3Rpb24gSG9tZSgpIHtcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0SGVsbWV0Mi5kZWZhdWx0LCB7IHRpdGxlOiAnIC0gSG9tZScgfSksXG4gICAgJ3ZhaSBhIG1lcmRhJ1xuICApO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSG9tZTtcblxufSx7XCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWhlbG1ldFwiOlwicmVhY3QtaGVsbWV0XCJ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSG9tZSA9IGV4cG9ydHMuQXBwVmlldyA9IHVuZGVmaW5lZDtcblxudmFyIF9BcHBWaWV3MiA9IHJlcXVpcmUoJy4vY29udGFpbmVycy9BcHBWaWV3Jyk7XG5cbnZhciBfQXBwVmlldzMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BcHBWaWV3Mik7XG5cbnZhciBfSG9tZTIgPSByZXF1aXJlKCcuL2NvbnRhaW5lcnMvSG9tZScpO1xuXG52YXIgX0hvbWUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSG9tZTIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLkFwcFZpZXcgPSBfQXBwVmlldzMuZGVmYXVsdDtcbmV4cG9ydHMuSG9tZSA9IF9Ib21lMy5kZWZhdWx0O1xuXG59LHtcIi4vY29udGFpbmVycy9BcHBWaWV3XCI6NCxcIi4vY29udGFpbmVycy9Ib21lXCI6NX1dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBhcGlIb3N0OiAnMTI3LjAuMC4xJyxcbiAgYXBpUG9ydDogJzUwMDAnLFxuICBoZWFkOiB7XG4gICAgdGl0bGU6ICcgLSBwb3J0ZWZvbGlvJyxcbiAgICB0aXRsZVRlbXBsYXRlOiAnbWFsYmVybmF6JXMnLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgY29udGVudDogJ015IHBlcnNvbmFsIHBvcnRmb2xpby4nXG4gICAgfSwge1xuICAgICAgY2hhcnNldDogJ3V0Zi04J1xuICAgIH1dXG4gIH1cbn07XG5cbn0se31dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIExPQUQgPSBleHBvcnRzLkxPQUQgPSAnTE9BRCc7XG52YXIgTE9BRF9TVUNDRVNTID0gZXhwb3J0cy5MT0FEX1NVQ0NFU1MgPSAnTE9BRF9TVUNDRVNTJztcbnZhciBMT0FEX0ZBSUwgPSBleHBvcnRzLkxPQURfRkFJTCA9ICdMT0FEX0ZBSUwnO1xudmFyIFNJR05JTiA9IGV4cG9ydHMuU0lHTklOID0gJ1NJR05JTic7XG52YXIgU0lHTklOX1NVQ0NFU1MgPSBleHBvcnRzLlNJR05JTl9TVUNDRVNTID0gJ1NJR05JTl9TVUNDRVNTJztcbnZhciBTSUdOSU5fRkFJTCA9IGV4cG9ydHMuU0lHTklOX0ZBSUwgPSAnU0lHTklOX0ZBSUwnO1xudmFyIExPR09VVCA9IGV4cG9ydHMuTE9HT1VUID0gJ0xPR09VVCc7XG52YXIgTE9HT1VUX1NVQ0NFU1MgPSBleHBvcnRzLkxPR09VVF9TVUNDRVNTID0gJ0xPR09VVF9TVUNDRVNTJztcbnZhciBMT0dPVVRfRkFJTCA9IGV4cG9ydHMuTE9HT1VUX0ZBSUwgPSAnTE9HT1VUX0ZBSUwnO1xudmFyIFNJR05VUCA9IGV4cG9ydHMuU0lHTlVQID0gJ1NJR05VUCc7XG52YXIgU0lHTlVQX1NVQ0NFU1MgPSBleHBvcnRzLlNJR05VUF9TVUNDRVNTID0gJ1NJR05VUF9TVUNDRVNTJztcbnZhciBTSUdOVVBfRkFJTCA9IGV4cG9ydHMuU0lHTlVQX0ZBSUwgPSAnU0lHTlVQX0ZBSUwnO1xuXG52YXIgU0hPV19NRVNTQUdFID0gZXhwb3J0cy5TSE9XX01FU1NBR0UgPSAnU0hPV19NRVNTQUdFJztcbnZhciBISURFX01FU1NBR0UgPSBleHBvcnRzLkhJREVfTUVTU0FHRSA9ICdISURFX01FU1NBR0UnO1xuXG59LHt9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfc3VwZXJhZ2VudCA9IHJlcXVpcmUoJ3N1cGVyYWdlbnQnKTtcblxudmFyIF9zdXBlcmFnZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N1cGVyYWdlbnQpO1xuXG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG52YXIgX2NvbmZpZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgbWV0aG9kcyA9IFsnZ2V0JywgJ3Bvc3QnLCAncHV0JywgJ2RlbCddO1xuXG52YXIgaXNTZXJ2ZXIgPSAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yod2luZG93KSkgIT09ICdvYmplY3QnO1xuXG5mdW5jdGlvbiBmb3JtYXRVcmwocGF0aCkge1xuICB2YXIgYWRqdXN0ZWRQYXRoID0gcGF0aFswXSAhPT0gJy8nID8gJycgKyBwYXRoIDogcGF0aDtcblxuICBpZiAoaXNTZXJ2ZXIpIHtcbiAgICByZXR1cm4gJ1xcbiAgICAgIGh0dHA6Ly8nICsgX2NvbmZpZzIuZGVmYXVsdC5hcGlIb3N0ICsgJzonICsgKF9jb25maWcyLmRlZmF1bHQuYXBpUG9ydCArIGFkanVzdGVkUGF0aCkgKyAnXFxuICAgICc7XG4gIH1cblxuICByZXR1cm4gJy9hcGkvJyArIGFkanVzdGVkUGF0aDtcbn1cblxudmFyIEFwaUNsaWVudCA9IGZ1bmN0aW9uIEFwaUNsaWVudChyZXEpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXBpQ2xpZW50KTtcblxuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIHJldHVybiBfdGhpc1ttZXRob2RdID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIHZhciBwYXJhbXMgPSBfcmVmLnBhcmFtcztcbiAgICAgIHZhciBkYXRhID0gX3JlZi5kYXRhO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBfc3VwZXJhZ2VudDIuZGVmYXVsdFttZXRob2RdKGZvcm1hdFVybChwYXRoKSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcykgcmVxdWVzdC5xdWVyeShwYXJhbXMpO1xuXG4gICAgICAgIGlmIChpc1NlcnZlciAmJiByZXEuZ2V0KCdjb29raWUnKSkge1xuICAgICAgICAgIHJlcXVlc3Quc2V0KCdjb29raWUnLCByZXEuZ2V0KCdjb29raWUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSkgcmVxdWVzdC5zZW5kKGRhdGEpO1xuXG4gICAgICAgIHJlcXVlc3QuZW5kKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgIHZhciBib2R5ID0gX3JlZjIuYm9keTtcblxuICAgICAgICAgIHZhciByZXF1ZXN0RXJyID0gZXJyO1xuICAgICAgICAgIHJldHVybiByZXF1ZXN0RXJyID8gcmVqZWN0KGJvZHkgfHwgZXJyKSA6IHJlc29sdmUoYm9keSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBcGlDbGllbnQ7XG5cbn0se1wiLi4vY29uZmlnXCI6NyxcInN1cGVyYWdlbnRcIjpcInN1cGVyYWdlbnRcIn1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBwcm9taXNlTWlkZGxld2FyZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBwcm9taXNlTWlkZGxld2FyZShjbGllbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoO1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJvbWlzZSA9IGFjdGlvbi5wcm9taXNlO1xuICAgICAgICB2YXIgdHlwZXMgPSBhY3Rpb24udHlwZXM7XG5cbiAgICAgICAgdmFyIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoYWN0aW9uLCBbJ3Byb21pc2UnLCAndHlwZXMnXSk7XG5cbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm4gbmV4dChhY3Rpb24pO1xuXG4gICAgICAgIHZhciBfdHlwZXMgPSBfc2xpY2VkVG9BcnJheSh0eXBlcywgMyk7XG5cbiAgICAgICAgdmFyIFJFUVVFU1QgPSBfdHlwZXNbMF07XG4gICAgICAgIHZhciBTVUNDRVNTID0gX3R5cGVzWzFdO1xuICAgICAgICB2YXIgRkFJTFVSRSA9IF90eXBlc1syXTtcblxuXG4gICAgICAgIG5leHQoX2V4dGVuZHMoe30sIHJlc3QsIHsgdHlwZTogUkVRVUVTVCB9KSk7XG5cbiAgICAgICAgdmFyIGFjdGlvblByb21pc2UgPSBwcm9taXNlKGNsaWVudCk7XG5cbiAgICAgICAgYWN0aW9uUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChfZXh0ZW5kcyh7fSwgcmVzdCwgeyByZXN1bHQ6IHJlc3VsdCwgdHlwZTogU1VDQ0VTUyB9KSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBuZXh0KF9leHRlbmRzKHt9LCByZXN0LCB7IGVycm9yOiBlcnJvciwgdHlwZTogRkFJTFVSRSB9KSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdNSURETEVXQVJFIEVSUk9SOicsIGVycik7XG4gICAgICAgICAgbmV4dChfZXh0ZW5kcyh7fSwgcmVzdCwgeyBlcnI6IGVyciwgdHlwZTogRkFJTFVSRSB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhY3Rpb25Qcm9taXNlO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG59LHt9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciByZWR1Y2VyID0gZnVuY3Rpb24gcmVkdWNlcigpIHtcbiAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8geyBsb2FkZWQ6IGZhbHNlIH0gOiBhcmd1bWVudHNbMF07XG4gIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPQUQ6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH0pO1xuICAgIGNhc2UgX2NvbnN0YW50cy5MT0FEX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBsb2FkZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogYWN0aW9uLnJlc3VsdC5zdGF0dXMsXG4gICAgICAgIHVzZXI6IGFjdGlvbi5yZXN1bHQudXNlclxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPQURfRkFJTDpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogT2JqZWN0LmtleXMoYWN0aW9uLmVycm9yKSAhPT0gMCA/IGFjdGlvbi5lcnJvciA6ICd1bmF0aG9yaXplZCdcbiAgICAgIH0pO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05JTjpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgc2lnbmluZ0luOiB0cnVlXG4gICAgICB9KTtcbiAgICBjYXNlIF9jb25zdGFudHMuU0lHTklOX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIHNpZ25pbmdJbjogZmFsc2UsXG4gICAgICAgIHN0YXR1czogYWN0aW9uLnJlc3VsdC5zdGF0dXMsXG4gICAgICAgIHVzZXI6IGFjdGlvbi5yZXN1bHQudXNlclxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05JTl9GQUlMOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaWduaW5nSW46IGZhbHNlLFxuICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICBzdGF0dXM6IGFjdGlvbi5lcnJvci5zdGF0dXNcbiAgICAgIH0pO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05VUDpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgc2lnbmluZ1VwOiB0cnVlXG4gICAgICB9KTtcbiAgICBjYXNlIF9jb25zdGFudHMuU0lHTlVQX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIHNpZ25pbmdVcDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogYWN0aW9uLnJlc3VsdC5zdGF0dXMsXG4gICAgICAgIHVzZXI6IGFjdGlvbi5yZXN1bHQudXNlclxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05VUF9GQUlMOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaWduaW5nVXA6IGZhbHNlLFxuICAgICAgICBzdGF0dXM6IGFjdGlvbi5lcnJvci5zdGF0dXNcbiAgICAgIH0pO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVDpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2luZ091dDogdHJ1ZVxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnaW5nT3V0OiBmYWxzZSxcbiAgICAgICAgdXNlcjogbnVsbCxcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24ucmVzdWx0LnN0YXR1c1xuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVF9GQUlMOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnaW5nT3V0OiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24uZXJyb3Iuc3RhdHVzXG4gICAgICB9KTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlZHVjZXI7XG5cbn0se1wiLi4vY29uc3RhbnRzXCI6OH1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWR1eCA9IHJlcXVpcmUoJ3JlZHV4Jyk7XG5cbnZhciBfcmVhY3RSb3V0ZXJSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1yZWR1eCcpO1xuXG52YXIgX2F1dGggPSByZXF1aXJlKCcuL2F1dGgnKTtcblxudmFyIF9hdXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2F1dGgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcm9vdFJlZHVjZXIgPSAoMCwgX3JlZHV4LmNvbWJpbmVSZWR1Y2Vycykoe1xuICBhdXRoOiBfYXV0aDIuZGVmYXVsdCxcbiAgcm91dGluZzogX3JlYWN0Um91dGVyUmVkdXgucm91dGVyUmVkdWNlclxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJvb3RSZWR1Y2VyO1xuXG59LHtcIi4vYXV0aFwiOjExLFwicmVhY3Qtcm91dGVyLXJlZHV4XCI6MTYsXCJyZWR1eFwiOlwicmVkdXhcIn1dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0Um91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG5cbnZhciBfYXV0aCA9IHJlcXVpcmUoJy4vYWN0aW9ucy9hdXRoJyk7XG5cbnZhciBfY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgdmFyIG11c3RCZUxvZ2dlZCA9IGZ1bmN0aW9uIG11c3RCZUxvZ2dlZChuZXh0U3RhdGUsIHJlcGxhY2UsIGNhbGxiYWNrKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uIGNoZWNrQXV0aCgpIHtcbiAgICAgIHZhciBfc3RvcmUkZ2V0U3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICB2YXIgdXNlciA9IF9zdG9yZSRnZXRTdGF0ZS5hdXRoLnVzZXI7XG5cbiAgICAgIGlmICghdXNlcikgcmVwbGFjZSgnLycpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBpZiAoISgwLCBfYXV0aC5pc0xvYWRlZCkoc3RvcmUuZ2V0U3RhdGUoKSkpIHtcbiAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaCgoMCwgX2F1dGgubG9hZCkoKSkudGhlbihjaGVja0F1dGgpLmNhdGNoKGNoZWNrQXV0aCk7XG4gICAgfVxuICAgIHJldHVybiBjaGVja0F1dGgoKTtcbiAgfTtcblxuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgX3JlYWN0Um91dGVyLlJvdXRlLFxuICAgIHsgbmFtZTogJ2FwcCcsIGNvbXBvbmVudDogX2NvbXBvbmVudHMuQXBwVmlldywgcGF0aDogJy8nIH0sXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0Um91dGVyLkluZGV4Um91dGUsIHsgY29tcG9uZW50OiBfY29tcG9uZW50cy5Ib21lIH0pXG4gICk7XG59O1xuXG59LHtcIi4vYWN0aW9ucy9hdXRoXCI6MSxcIi4vY29tcG9uZW50c1wiOjYsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCJ9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX3JlZHV4ID0gcmVxdWlyZSgncmVkdXgnKTtcblxudmFyIF9yZWFjdFJvdXRlclJlZHV4ID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyLXJlZHV4Jyk7XG5cbnZhciBfY2xpZW50TWlkZGxld2FyZSA9IHJlcXVpcmUoJy4vbWlkZGxld2FyZS9jbGllbnRNaWRkbGV3YXJlJyk7XG5cbnZhciBfY2xpZW50TWlkZGxld2FyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGllbnRNaWRkbGV3YXJlKTtcblxudmFyIF9yZWR1Y2VycyA9IHJlcXVpcmUoJy4vcmVkdWNlcnMnKTtcblxudmFyIF9yZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWR1Y2Vycyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjb25maWd1cmVTdG9yZSA9IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGNsaWVudCwgaGlzdG9yeSkge1xuICB2YXIgaW5pdGlhbFN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cbiAgdmFyIHJlZHV4Um91dGVyTWlkZGxld2FyZSA9ICgwLCBfcmVhY3RSb3V0ZXJSZWR1eC5yb3V0ZXJNaWRkbGV3YXJlKShoaXN0b3J5KTtcbiAgdmFyIG1pZGRsZXdhcmUgPSBbKDAsIF9jbGllbnRNaWRkbGV3YXJlMi5kZWZhdWx0KShjbGllbnQpLCByZWR1eFJvdXRlck1pZGRsZXdhcmVdO1xuXG4gIHZhciBzdG9yZSA9ICgwLCBfcmVkdXguY3JlYXRlU3RvcmUpKF9yZWR1Y2VyczIuZGVmYXVsdCwgaW5pdGlhbFN0YXRlLCAoMCwgX3JlZHV4LmNvbXBvc2UpKF9yZWR1eC5hcHBseU1pZGRsZXdhcmUuYXBwbHkodW5kZWZpbmVkLCBtaWRkbGV3YXJlKSwgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHdpbmRvdykpID09PSAnb2JqZWN0JyA/IHdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpIDogZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gZjtcbiAgfSkpO1xuICByZXR1cm4gc3RvcmU7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjb25maWd1cmVTdG9yZTtcblxufSx7XCIuL21pZGRsZXdhcmUvY2xpZW50TWlkZGxld2FyZVwiOjEwLFwiLi9yZWR1Y2Vyc1wiOjEyLFwicmVhY3Qtcm91dGVyLXJlZHV4XCI6MTYsXCJyZWR1eFwiOlwicmVkdXhcIn1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qKlxuICogVGhpcyBhY3Rpb24gdHlwZSB3aWxsIGJlIGRpc3BhdGNoZWQgYnkgdGhlIGhpc3RvcnkgYWN0aW9ucyBiZWxvdy5cbiAqIElmIHlvdSdyZSB3cml0aW5nIGEgbWlkZGxld2FyZSB0byB3YXRjaCBmb3IgbmF2aWdhdGlvbiBldmVudHMsIGJlIHN1cmUgdG9cbiAqIGxvb2sgZm9yIGFjdGlvbnMgb2YgdGhpcyB0eXBlLlxuICovXG52YXIgQ0FMTF9ISVNUT1JZX01FVEhPRCA9IGV4cG9ydHMuQ0FMTF9ISVNUT1JZX01FVEhPRCA9ICdAQHJvdXRlci9DQUxMX0hJU1RPUllfTUVUSE9EJztcblxuZnVuY3Rpb24gdXBkYXRlTG9jYXRpb24obWV0aG9kKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IENBTExfSElTVE9SWV9NRVRIT0QsXG4gICAgICBwYXlsb2FkOiB7IG1ldGhvZDogbWV0aG9kLCBhcmdzOiBhcmdzIH1cbiAgICB9O1xuICB9O1xufVxuXG4vKipcbiAqIFRoZXNlIGFjdGlvbnMgY29ycmVzcG9uZCB0byB0aGUgaGlzdG9yeSBBUEkuXG4gKiBUaGUgYXNzb2NpYXRlZCByb3V0ZXJNaWRkbGV3YXJlIHdpbGwgY2FwdHVyZSB0aGVzZSBldmVudHMgYmVmb3JlIHRoZXkgZ2V0IHRvXG4gKiB5b3VyIHJlZHVjZXIgYW5kIHJlaXNzdWUgdGhlbSBhcyB0aGUgbWF0Y2hpbmcgZnVuY3Rpb24gb24geW91ciBoaXN0b3J5LlxuICovXG52YXIgcHVzaCA9IGV4cG9ydHMucHVzaCA9IHVwZGF0ZUxvY2F0aW9uKCdwdXNoJyk7XG52YXIgcmVwbGFjZSA9IGV4cG9ydHMucmVwbGFjZSA9IHVwZGF0ZUxvY2F0aW9uKCdyZXBsYWNlJyk7XG52YXIgZ28gPSBleHBvcnRzLmdvID0gdXBkYXRlTG9jYXRpb24oJ2dvJyk7XG52YXIgZ29CYWNrID0gZXhwb3J0cy5nb0JhY2sgPSB1cGRhdGVMb2NhdGlvbignZ29CYWNrJyk7XG52YXIgZ29Gb3J3YXJkID0gZXhwb3J0cy5nb0ZvcndhcmQgPSB1cGRhdGVMb2NhdGlvbignZ29Gb3J3YXJkJyk7XG5cbnZhciByb3V0ZXJBY3Rpb25zID0gZXhwb3J0cy5yb3V0ZXJBY3Rpb25zID0geyBwdXNoOiBwdXNoLCByZXBsYWNlOiByZXBsYWNlLCBnbzogZ28sIGdvQmFjazogZ29CYWNrLCBnb0ZvcndhcmQ6IGdvRm9yd2FyZCB9O1xufSx7fV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yb3V0ZXJNaWRkbGV3YXJlID0gZXhwb3J0cy5yb3V0ZXJBY3Rpb25zID0gZXhwb3J0cy5nb0ZvcndhcmQgPSBleHBvcnRzLmdvQmFjayA9IGV4cG9ydHMuZ28gPSBleHBvcnRzLnJlcGxhY2UgPSBleHBvcnRzLnB1c2ggPSBleHBvcnRzLkNBTExfSElTVE9SWV9NRVRIT0QgPSBleHBvcnRzLnJvdXRlclJlZHVjZXIgPSBleHBvcnRzLkxPQ0FUSU9OX0NIQU5HRSA9IGV4cG9ydHMuc3luY0hpc3RvcnlXaXRoU3RvcmUgPSB1bmRlZmluZWQ7XG5cbnZhciBfcmVkdWNlciA9IHJlcXVpcmUoJy4vcmVkdWNlcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0xPQ0FUSU9OX0NIQU5HRScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9yZWR1Y2VyLkxPQ0FUSU9OX0NIQU5HRTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3JvdXRlclJlZHVjZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcmVkdWNlci5yb3V0ZXJSZWR1Y2VyO1xuICB9XG59KTtcblxudmFyIF9hY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ0FMTF9ISVNUT1JZX01FVEhPRCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLkNBTExfSElTVE9SWV9NRVRIT0Q7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdwdXNoJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2FjdGlvbnMucHVzaDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3JlcGxhY2UnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYWN0aW9ucy5yZXBsYWNlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZ28nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYWN0aW9ucy5nbztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2dvQmFjaycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLmdvQmFjaztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2dvRm9yd2FyZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLmdvRm9yd2FyZDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3JvdXRlckFjdGlvbnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYWN0aW9ucy5yb3V0ZXJBY3Rpb25zO1xuICB9XG59KTtcblxudmFyIF9zeW5jID0gcmVxdWlyZSgnLi9zeW5jJyk7XG5cbnZhciBfc3luYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW5jKTtcblxudmFyIF9taWRkbGV3YXJlID0gcmVxdWlyZSgnLi9taWRkbGV3YXJlJyk7XG5cbnZhciBfbWlkZGxld2FyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taWRkbGV3YXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5leHBvcnRzLnN5bmNIaXN0b3J5V2l0aFN0b3JlID0gX3N5bmMyWydkZWZhdWx0J107XG5leHBvcnRzLnJvdXRlck1pZGRsZXdhcmUgPSBfbWlkZGxld2FyZTJbJ2RlZmF1bHQnXTtcbn0se1wiLi9hY3Rpb25zXCI6MTUsXCIuL21pZGRsZXdhcmVcIjoxNyxcIi4vcmVkdWNlclwiOjE4LFwiLi9zeW5jXCI6MTl9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByb3V0ZXJNaWRkbGV3YXJlO1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qKlxuICogVGhpcyBtaWRkbGV3YXJlIGNhcHR1cmVzIENBTExfSElTVE9SWV9NRVRIT0QgYWN0aW9ucyB0byByZWRpcmVjdCB0byB0aGVcbiAqIHByb3ZpZGVkIGhpc3Rvcnkgb2JqZWN0LiBUaGlzIHdpbGwgcHJldmVudCB0aGVzZSBhY3Rpb25zIGZyb20gcmVhY2hpbmcgeW91clxuICogcmVkdWNlciBvciBhbnkgbWlkZGxld2FyZSB0aGF0IGNvbWVzIGFmdGVyIHRoaXMgb25lLlxuICovXG5mdW5jdGlvbiByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gX2FjdGlvbnMuQ0FMTF9ISVNUT1JZX01FVEhPRCkge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2FjdGlvbiRwYXlsb2FkID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICAgIHZhciBtZXRob2QgPSBfYWN0aW9uJHBheWxvYWQubWV0aG9kO1xuICAgICAgICB2YXIgYXJncyA9IF9hY3Rpb24kcGF5bG9hZC5hcmdzO1xuXG4gICAgICAgIGhpc3RvcnlbbWV0aG9kXS5hcHBseShoaXN0b3J5LCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxufSx7XCIuL2FjdGlvbnNcIjoxNX1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5yb3V0ZXJSZWR1Y2VyID0gcm91dGVyUmVkdWNlcjtcbi8qKlxuICogVGhpcyBhY3Rpb24gdHlwZSB3aWxsIGJlIGRpc3BhdGNoZWQgd2hlbiB5b3VyIGhpc3RvcnlcbiAqIHJlY2VpdmVzIGEgbG9jYXRpb24gY2hhbmdlLlxuICovXG52YXIgTE9DQVRJT05fQ0hBTkdFID0gZXhwb3J0cy5MT0NBVElPTl9DSEFOR0UgPSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJztcblxudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9jYXRpb25CZWZvcmVUcmFuc2l0aW9uczogbnVsbFxufTtcblxuLyoqXG4gKiBUaGlzIHJlZHVjZXIgd2lsbCB1cGRhdGUgdGhlIHN0YXRlIHdpdGggdGhlIG1vc3QgcmVjZW50IGxvY2F0aW9uIGhpc3RvcnlcbiAqIGhhcyB0cmFuc2l0aW9uZWQgdG8uIFRoaXMgbWF5IG5vdCBiZSBpbiBzeW5jIHdpdGggdGhlIHJvdXRlciwgcGFydGljdWxhcmx5XG4gKiBpZiB5b3UgaGF2ZSBhc3luY2hyb25vdXNseS1sb2FkZWQgcm91dGVzLCBzbyByZWFkaW5nIGZyb20gYW5kIHJlbHlpbmcgb25cbiAqIHRoaXMgc3RhdGUgaXMgZGlzY291cmFnZWQuXG4gKi9cbmZ1bmN0aW9uIHJvdXRlclJlZHVjZXIoKSB7XG4gIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IGluaXRpYWxTdGF0ZSA6IGFyZ3VtZW50c1swXTtcblxuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgcGF5bG9hZCA9IF9yZWYucGF5bG9hZDtcblxuICBpZiAodHlwZSA9PT0gTE9DQVRJT05fQ0hBTkdFKSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwgeyBsb2NhdGlvbkJlZm9yZVRyYW5zaXRpb25zOiBwYXlsb2FkIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW5jSGlzdG9yeVdpdGhTdG9yZTtcblxudmFyIF9yZWR1Y2VyID0gcmVxdWlyZSgnLi9yZWR1Y2VyJyk7XG5cbnZhciBkZWZhdWx0U2VsZWN0TG9jYXRpb25TdGF0ZSA9IGZ1bmN0aW9uIGRlZmF1bHRTZWxlY3RMb2NhdGlvblN0YXRlKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5yb3V0aW5nO1xufTtcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHN5bmNocm9uaXplcyB5b3VyIGhpc3Rvcnkgc3RhdGUgd2l0aCB0aGUgUmVkdXggc3RvcmUuXG4gKiBMb2NhdGlvbiBjaGFuZ2VzIGZsb3cgZnJvbSBoaXN0b3J5IHRvIHRoZSBzdG9yZS4gQW4gZW5oYW5jZWQgaGlzdG9yeSBpc1xuICogcmV0dXJuZWQgd2l0aCBhIGxpc3RlbiBtZXRob2QgdGhhdCByZXNwb25kcyB0byBzdG9yZSB1cGRhdGVzIGZvciBsb2NhdGlvbi5cbiAqXG4gKiBXaGVuIHRoaXMgaGlzdG9yeSBpcyBwcm92aWRlZCB0byB0aGUgcm91dGVyLCB0aGlzIG1lYW5zIHRoZSBsb2NhdGlvbiBkYXRhXG4gKiB3aWxsIGZsb3cgbGlrZSB0aGlzOlxuICogaGlzdG9yeS5wdXNoIC0+IHN0b3JlLmRpc3BhdGNoIC0+IGVuaGFuY2VkSGlzdG9yeS5saXN0ZW4gLT4gcm91dGVyXG4gKiBUaGlzIGVuc3VyZXMgdGhhdCB3aGVuIHRoZSBzdG9yZSBzdGF0ZSBjaGFuZ2VzIGR1ZSB0byBhIHJlcGxheSBvciBvdGhlclxuICogZXZlbnQsIHRoZSByb3V0ZXIgd2lsbCBiZSB1cGRhdGVkIGFwcHJvcHJpYXRlbHkgYW5kIGNhbiB0cmFuc2l0aW9uIHRvIHRoZVxuICogY29ycmVjdCByb3V0ZXIgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHN5bmNIaXN0b3J5V2l0aFN0b3JlKGhpc3RvcnksIHN0b3JlKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cbiAgdmFyIF9yZWYkc2VsZWN0TG9jYXRpb25TdCA9IF9yZWYuc2VsZWN0TG9jYXRpb25TdGF0ZTtcbiAgdmFyIHNlbGVjdExvY2F0aW9uU3RhdGUgPSBfcmVmJHNlbGVjdExvY2F0aW9uU3QgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRTZWxlY3RMb2NhdGlvblN0YXRlIDogX3JlZiRzZWxlY3RMb2NhdGlvblN0O1xuICB2YXIgX3JlZiRhZGp1c3RVcmxPblJlcGxhID0gX3JlZi5hZGp1c3RVcmxPblJlcGxheTtcbiAgdmFyIGFkanVzdFVybE9uUmVwbGF5ID0gX3JlZiRhZGp1c3RVcmxPblJlcGxhID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRhZGp1c3RVcmxPblJlcGxhO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSByZWR1Y2VyIGlzIG1vdW50ZWQgb24gdGhlIHN0b3JlIGFuZCBmdW5jdGlvbmluZyBwcm9wZXJseS5cbiAgaWYgKHR5cGVvZiBzZWxlY3RMb2NhdGlvblN0YXRlKHN0b3JlLmdldFN0YXRlKCkpID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJvdXRpbmcgc3RhdGUgdG8gYmUgYXZhaWxhYmxlIGVpdGhlciBhcyBgc3RhdGUucm91dGluZ2AgJyArICdvciBhcyB0aGUgY3VzdG9tIGV4cHJlc3Npb24geW91IGNhbiBzcGVjaWZ5IGFzIGBzZWxlY3RMb2NhdGlvblN0YXRlYCAnICsgJ2luIHRoZSBgc3luY0hpc3RvcnlXaXRoU3RvcmUoKWAgb3B0aW9ucy4gJyArICdFbnN1cmUgeW91IGhhdmUgYWRkZWQgdGhlIGByb3V0ZXJSZWR1Y2VyYCB0byB5b3VyIHN0b3JlXFwncyAnICsgJ3JlZHVjZXJzIHZpYSBgY29tYmluZVJlZHVjZXJzYCBvciB3aGF0ZXZlciBtZXRob2QgeW91IHVzZSB0byBpc29sYXRlICcgKyAneW91ciByZWR1Y2Vycy4nKTtcbiAgfVxuXG4gIHZhciBpbml0aWFsTG9jYXRpb24gPSB2b2lkIDA7XG4gIHZhciBpc1RpbWVUcmF2ZWxpbmcgPSB2b2lkIDA7XG4gIHZhciB1bnN1YnNjcmliZUZyb21TdG9yZSA9IHZvaWQgMDtcbiAgdmFyIHVuc3Vic2NyaWJlRnJvbUhpc3RvcnkgPSB2b2lkIDA7XG5cbiAgLy8gV2hhdCBkb2VzIHRoZSBzdG9yZSBzYXkgYWJvdXQgY3VycmVudCBsb2NhdGlvbj9cbiAgdmFyIGdldExvY2F0aW9uSW5TdG9yZSA9IGZ1bmN0aW9uIGdldExvY2F0aW9uSW5TdG9yZSh1c2VJbml0aWFsSWZFbXB0eSkge1xuICAgIHZhciBsb2NhdGlvblN0YXRlID0gc2VsZWN0TG9jYXRpb25TdGF0ZShzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICByZXR1cm4gbG9jYXRpb25TdGF0ZS5sb2NhdGlvbkJlZm9yZVRyYW5zaXRpb25zIHx8ICh1c2VJbml0aWFsSWZFbXB0eSA/IGluaXRpYWxMb2NhdGlvbiA6IHVuZGVmaW5lZCk7XG4gIH07XG5cbiAgLy8gSW5pdCBjdXJyZW50TG9jYXRpb24gd2l0aCBwb3RlbnRpYWwgbG9jYXRpb24gaW4gc3RvcmVcbiAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IGdldExvY2F0aW9uSW5TdG9yZSgpO1xuXG4gIC8vIElmIHRoZSBzdG9yZSBpcyByZXBsYXllZCwgdXBkYXRlIHRoZSBVUkwgaW4gdGhlIGJyb3dzZXIgdG8gbWF0Y2guXG4gIGlmIChhZGp1c3RVcmxPblJlcGxheSkge1xuICAgIHZhciBoYW5kbGVTdG9yZUNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZVN0b3JlQ2hhbmdlKCkge1xuICAgICAgdmFyIGxvY2F0aW9uSW5TdG9yZSA9IGdldExvY2F0aW9uSW5TdG9yZSh0cnVlKTtcbiAgICAgIGlmIChjdXJyZW50TG9jYXRpb24gPT09IGxvY2F0aW9uSW5TdG9yZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBhZGRyZXNzIGJhciB0byByZWZsZWN0IHN0b3JlIHN0YXRlXG4gICAgICBpc1RpbWVUcmF2ZWxpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb25JblN0b3JlO1xuICAgICAgaGlzdG9yeS50cmFuc2l0aW9uVG8oX2V4dGVuZHMoe30sIGxvY2F0aW9uSW5TdG9yZSwge1xuICAgICAgICBhY3Rpb246ICdQVVNIJ1xuICAgICAgfSkpO1xuICAgICAgaXNUaW1lVHJhdmVsaW5nID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHVuc3Vic2NyaWJlRnJvbVN0b3JlID0gc3RvcmUuc3Vic2NyaWJlKGhhbmRsZVN0b3JlQ2hhbmdlKTtcbiAgICBoYW5kbGVTdG9yZUNoYW5nZSgpO1xuICB9XG5cbiAgLy8gV2hlbmV2ZXIgbG9jYXRpb24gY2hhbmdlcywgZGlzcGF0Y2ggYW4gYWN0aW9uIHRvIGdldCBpdCBpbiB0aGUgc3RvcmVcbiAgdmFyIGhhbmRsZUxvY2F0aW9uQ2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9jYXRpb25DaGFuZ2UobG9jYXRpb24pIHtcbiAgICAvLyAuLi4gdW5sZXNzIHdlIGp1c3QgY2F1c2VkIHRoYXQgbG9jYXRpb24gY2hhbmdlXG4gICAgaWYgKGlzVGltZVRyYXZlbGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlbWVtYmVyIHdoZXJlIHdlIGFyZVxuICAgIGN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuXG4gICAgLy8gQXJlIHdlIGJlaW5nIGNhbGxlZCBmb3IgdGhlIGZpcnN0IHRpbWU/XG4gICAgaWYgKCFpbml0aWFsTG9jYXRpb24pIHtcbiAgICAgIC8vIFJlbWVtYmVyIGFzIGEgZmFsbGJhY2sgaW4gY2FzZSBzdGF0ZSBpcyByZXNldFxuICAgICAgaW5pdGlhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgICAgIC8vIFJlc3BlY3QgcGVyc2lzdGVkIGxvY2F0aW9uLCBpZiBhbnlcbiAgICAgIGlmIChnZXRMb2NhdGlvbkluU3RvcmUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGVsbCB0aGUgc3RvcmUgdG8gdXBkYXRlIGJ5IGRpc3BhdGNoaW5nIGFuIGFjdGlvblxuICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IF9yZWR1Y2VyLkxPQ0FUSU9OX0NIQU5HRSxcbiAgICAgIHBheWxvYWQ6IGxvY2F0aW9uXG4gICAgfSk7XG4gIH07XG4gIHVuc3Vic2NyaWJlRnJvbUhpc3RvcnkgPSBoaXN0b3J5Lmxpc3RlbihoYW5kbGVMb2NhdGlvbkNoYW5nZSk7XG5cbiAgLy8gVGhlIGVuaGFuY2VkIGhpc3RvcnkgdXNlcyBzdG9yZSBhcyBzb3VyY2Ugb2YgdHJ1dGhcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgLy8gVGhlIGxpc3RlbmVycyBhcmUgc3Vic2NyaWJlZCB0byB0aGUgc3RvcmUgaW5zdGVhZCBvZiBoaXN0b3J5XG5cbiAgICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgICAgLy8gQ29weSBvZiBsYXN0IGxvY2F0aW9uLlxuICAgICAgdmFyIGxhc3RQdWJsaXNoZWRMb2NhdGlvbiA9IGdldExvY2F0aW9uSW5TdG9yZSh0cnVlKTtcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB3aGV0aGVyIHdlIHVuc3Vic2NyaWJlZCwgYXMgUmVkdXggc3RvcmVcbiAgICAgIC8vIG9ubHkgYXBwbGllcyBjaGFuZ2VzIGluIHN1YnNjcmlwdGlvbnMgb24gbmV4dCBkaXNwYXRjaFxuICAgICAgdmFyIHVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlRnJvbVN0b3JlID0gc3RvcmUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IGdldExvY2F0aW9uSW5TdG9yZSh0cnVlKTtcbiAgICAgICAgaWYgKGN1cnJlbnRMb2NhdGlvbiA9PT0gbGFzdFB1Ymxpc2hlZExvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RQdWJsaXNoZWRMb2NhdGlvbiA9IGN1cnJlbnRMb2NhdGlvbjtcbiAgICAgICAgaWYgKCF1bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICBsaXN0ZW5lcihsYXN0UHVibGlzaGVkTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSGlzdG9yeSBsaXN0ZW5lcnMgZXhwZWN0IGEgc3luY2hyb25vdXMgY2FsbC4gTWFrZSB0aGUgZmlyc3QgY2FsbCB0byB0aGVcbiAgICAgIC8vIGxpc3RlbmVyIGFmdGVyIHN1YnNjcmliaW5nIHRvIHRoZSBzdG9yZSwgaW4gY2FzZSB0aGUgbGlzdGVuZXIgY2F1c2VzIGFcbiAgICAgIC8vIGxvY2F0aW9uIGNoYW5nZSAoZS5nLiB3aGVuIGl0IHJlZGlyZWN0cylcbiAgICAgIGxpc3RlbmVyKGxhc3RQdWJsaXNoZWRMb2NhdGlvbik7XG5cbiAgICAgIC8vIExldCB1c2VyIHVuc3Vic2NyaWJlIGxhdGVyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB1bnN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZUZyb21TdG9yZSgpO1xuICAgICAgfTtcbiAgICB9LFxuXG5cbiAgICAvLyBJdCBhbHNvIHByb3ZpZGVzIGEgd2F5IHRvIGRlc3Ryb3kgaW50ZXJuYWwgbGlzdGVuZXJzXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKGFkanVzdFVybE9uUmVwbGF5KSB7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVN0b3JlKCk7XG4gICAgICB9XG4gICAgICB1bnN1YnNjcmliZUZyb21IaXN0b3J5KCk7XG4gICAgfVxuICB9KTtcbn1cbn0se1wiLi9yZWR1Y2VyXCI6MTh9XX0se30sWzNdKTtcbiJdLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
