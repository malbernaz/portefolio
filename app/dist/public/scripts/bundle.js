(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.signIn = exports.loadAuth = exports.isLoaded = undefined;

var _constants = require('../constants');

var isLoaded = exports.isLoaded = function isLoaded(state) {
  return state.auth && state.auth.loaded;
};

var loadAuth = exports.loadAuth = function loadAuth() {
  return {
    types: [_constants.LOAD_AUTH, _constants.LOAD_AUTH_SUCCESS, _constants.LOAD_AUTH_FAIL],
    promise: function promise(client) {
      return client.get('/user/loadauth');
    }
  };
};

var signIn = exports.signIn = function signIn(_ref) {
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

var logout = exports.logout = function logout() {
  return {
    types: [_constants.LOGOUT, _constants.LOGOUT_SUCCESS, _constants.LOGOUT_FAIL],
    promise: function promise(client) {
      return client.get('/user/logout');
    }
  };
};

},{"../constants":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.posts = exports.auth = undefined;

var _auth2 = require('./auth');

var _auth = _interopRequireWildcard(_auth2);

var _posts2 = require('./posts');

var _posts = _interopRequireWildcard(_posts2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.auth = _auth;
exports.posts = _posts;

},{"./auth":1,"./posts":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPosts = undefined;

var _constants = require('../constants');

var loadPosts = exports.loadPosts = function loadPosts() {
  return {
    types: [_constants.LOAD_POSTS, _constants.LOAD_POSTS_SUCCESS, _constants.LOAD_POSTS_FAIL],
    promise: function promise(client) {
      return client.get('/posts');
    }
  };
};

},{"../constants":16}],4:[function(require,module,exports){
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

},{"./helpers/ApiClient":17,"./router":24,"./store":25,"react":"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router","react-router-redux":81,"react-router-scroll":"react-router-scroll"}],5:[function(require,module,exports){
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

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppView = function AppView(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { id: 'app-view', className: 'app-view' },
    _react2.default.createElement(_reactHelmet2.default, _config2.default.head),
    _react2.default.createElement(_.Nav, null),
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'section',
        null,
        children
      ),
      _react2.default.createElement(_.Footer, null)
    )
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

},{"../":9,"../../actions":2,"../../config":15,"react":"react","react-helmet":"react-helmet","react-redux":"react-redux","redux":"redux"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'footer',
    null,
    'this is a footer'
  );
};

exports.default = Footer;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav(_ref) {
  var auth = _ref.auth;
  var logout = _ref.logout;
  return _react2.default.createElement(
    'nav',
    null,
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.IndexLink,
          { to: '/' },
          'home'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.IndexLink,
          { to: '/about' },
          'about'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.IndexLink,
          { to: '/contact' },
          'contact'
        )
      ),
      auth.user ? _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/admin' },
          'admin'
        )
      ) : '',
      ' ',
      auth.user ? _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/', onClick: logout },
          'logout'
        )
      ) : ''
    )
  );
};

Nav.propTypes = {
  auth: _react.PropTypes.object,
  logout: _react.PropTypes.func
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state);
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_extends({}, _actions.auth), dispatch);
})(Nav);

},{"../../actions":2,"react":"react","react-redux":"react-redux","react-router":"react-router","redux":"redux"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _formFactory = require('../../helpers/formFactory');

var _formFactory2 = _interopRequireDefault(_formFactory);

var _validation = require('../../helpers/validation');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validation = (0, _validation.createValidator)({
  email: [_validation.required, _validation.email],
  password: _validation.required
});

var Form = (0, _formFactory2.default)({
  validate: (0, _lruMemoize2.default)(10)(validation),
  styleClass: 'signin-form',
  formName: 'signin',
  inputFields: [{
    name: 'email',
    type: 'email',
    label: 'email'
  }, {
    name: 'password',
    type: 'password',
    label: 'password'
  }],
  submitText: 'Sign In'
});

var SignInForm = function SignInForm(_ref) {
  var auth = _ref.auth;
  var signIn = _ref.signIn;
  var logout = _ref.logout;
  var loadAuth = _ref.loadAuth;

  function handleSubmit(data) {
    var submitChain = function submitChain() {
      return signIn(data).then(function (result) {
        _reactRouter.browserHistory.push('/admin');
        return result;
      }).catch(function (err) {
        _reactRouter.browserHistory.push('/admin');
        console.log(err);
        return err;
      }).then(loadAuth);
    };

    return auth.user ? logout().then(function () {
      return submitChain();
    }) : submitChain();
  }

  return _react2.default.createElement(Form, { onSubmit: handleSubmit });
};

SignInForm.propTypes = {
  auth: _react.PropTypes.object,
  signIn: _react.PropTypes.func,
  logout: _react.PropTypes.func,
  loadAuth: _react.PropTypes.func
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state);
}, function (dispatch) {
  return (0, _redux.bindActionCreators)(_extends({}, _actions.auth), dispatch);
})(SignInForm);

},{"../../actions":2,"../../helpers/formFactory":18,"../../helpers/validation":19,"lru-memoize":32,"react":"react","react-redux":"react-redux","react-router":"react-router","redux":"redux"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = exports.SignIn = exports.Contact = exports.About = exports.Home = exports.SignInForm = exports.Footer = exports.Nav = exports.AppView = undefined;

var _AppView2 = require('./containers/AppView');

var _AppView3 = _interopRequireDefault(_AppView2);

var _Nav2 = require('./containers/Nav');

var _Nav3 = _interopRequireDefault(_Nav2);

var _Footer2 = require('./containers/Footer');

var _Footer3 = _interopRequireDefault(_Footer2);

var _SignInForm2 = require('./containers/SignInForm');

var _SignInForm3 = _interopRequireDefault(_SignInForm2);

var _Home2 = require('./presentational/Home');

var _Home3 = _interopRequireDefault(_Home2);

var _About2 = require('./presentational/About');

var _About3 = _interopRequireDefault(_About2);

var _Contact2 = require('./presentational/Contact');

var _Contact3 = _interopRequireDefault(_Contact2);

var _SignIn2 = require('./presentational/SignIn');

var _SignIn3 = _interopRequireDefault(_SignIn2);

var _Admin2 = require('./presentational/Admin');

var _Admin3 = _interopRequireDefault(_Admin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AppView = _AppView3.default; // Containers

exports.Nav = _Nav3.default;
exports.Footer = _Footer3.default;
exports.SignInForm = _SignInForm3.default;

// Presentational

exports.Home = _Home3.default;
exports.About = _About3.default;
exports.Contact = _Contact3.default;
exports.SignIn = _SignIn3.default;
exports.Admin = _Admin3.default;

},{"./containers/AppView":5,"./containers/Footer":6,"./containers/Nav":7,"./containers/SignInForm":8,"./presentational/About":10,"./presentational/Admin":11,"./presentational/Contact":12,"./presentational/Home":13,"./presentational/SignIn":14}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function About() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactHelmet2.default, { title: 'about' }),
    'about'
  );
};

exports.default = About;

},{"react":"react","react-helmet":"react-helmet"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = function Admin() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactHelmet2.default, { title: 'admin' }),
    'admin'
  );
};

exports.default = Admin;

},{"react":"react","react-helmet":"react-helmet"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contact = function Contact() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactHelmet2.default, { title: 'contact' }),
    'contact'
  );
};

exports.default = Contact;

},{"react":"react","react-helmet":"react-helmet"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home(_ref) {
  var posts = _ref.posts.posts;
  return _react2.default.createElement(
    'div',
    { className: 'home' },
    _react2.default.createElement(_reactHelmet2.default, { title: 'home' }),
    posts.map(function (post, index) {
      return _react2.default.createElement(
        'article',
        { key: index },
        _react2.default.createElement(
          'small',
          null,
          (0, _moment2.default)(post.createdAt, 'YYYYMMDD').fromNow()
        ),
        _react2.default.createElement(
          'h2',
          null,
          post.title
        ),
        _react2.default.createElement(
          'h3',
          null,
          post.subtitle
        )
      );
    })
  );
};

Home.propTypes = {
  posts: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state);
})(Home);

},{"moment":36,"react":"react","react-helmet":"react-helmet","react-redux":"react-redux"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignIn = function SignIn() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactHelmet2.default, { title: 'sign in' }),
    _react2.default.createElement(_.SignInForm, null)
  );
};

exports.default = SignIn;

},{"../":9,"react":"react","react-helmet":"react-helmet"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  apiHost: '127.0.0.1',
  apiPort: '5000',
  head: {
    title: 'portefolio',
    titleTemplate: 'malbernaz λ %s',
    meta: [{
      name: 'description',
      content: 'My personal portfolio.'
    }, {
      charset: 'utf-8'
    }]
  }
};

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Auth
var LOAD_AUTH = exports.LOAD_AUTH = 'LOAD_AUTH';
var LOAD_AUTH_SUCCESS = exports.LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS';
var LOAD_AUTH_FAIL = exports.LOAD_AUTH_FAIL = 'LOAD_AUTH_FAIL';
var SIGNIN = exports.SIGNIN = 'SIGNIN';
var SIGNIN_SUCCESS = exports.SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
var SIGNIN_FAIL = exports.SIGNIN_FAIL = 'SIGNIN_FAIL';
var LOGOUT = exports.LOGOUT = 'LOGOUT';
var LOGOUT_SUCCESS = exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
var LOGOUT_FAIL = exports.LOGOUT_FAIL = 'LOGOUT_FAIL';

// Posts
var LOAD_POSTS = exports.LOAD_POSTS = 'LOAD_POSTS';
var LOAD_POSTS_SUCCESS = exports.LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
var LOAD_POSTS_FAIL = exports.LOAD_POSTS_FAIL = 'LOAD_POSTS_FAIL';

var SHOW_MESSAGE = exports.SHOW_MESSAGE = 'SHOW_MESSAGE';
var HIDE_MESSAGE = exports.HIDE_MESSAGE = 'HIDE_MESSAGE';

},{}],17:[function(require,module,exports){
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
    return 'http://' + _config2.default.apiHost + ':' + (_config2.default.apiPort + adjustedPath);
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

},{"../config":15,"superagent":"superagent"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var formFactory = function formFactory(_ref) {
  var validate = _ref.validate;
  var styleClass = _ref.styleClass;
  var formName = _ref.formName;
  var inputFields = _ref.inputFields;
  var submitText = _ref.submitText;

  var Form = function Form(_ref2) {
    var handleSubmit = _ref2.handleSubmit;

    var fields = _objectWithoutProperties(_ref2.fields, []);

    var renderInput = function renderInput(field, type, label) {
      return _react2.default.createElement(
        'div',
        { className: 'field', key: field.name },
        _react2.default.createElement(
          'label',
          { htmlFor: field.name },
          _react2.default.createElement(
            'span',
            { className: field.dirty ? 'input-label hasvalue' : 'input-label' },
            label
          ),
          _react2.default.createElement('input', _extends({
            type: type,
            name: field.name,
            placeholder: label,
            className: field.invalid && field.touched ? 'invalid' : ''
          }, field)),
          _react2.default.createElement(
            'span',
            { className: 'errors' },
            field.touched ? field.error : ''
          )
        )
      );
    };

    return _react2.default.createElement(
      'form',
      { className: styleClass, onSubmit: handleSubmit, action: '/admim' },
      _underscore2.default.map(fields, function (field, key) {
        var _inputFields$filter$ = inputFields.filter(function (f) {
          return f.name === key;
        })[0];
        var type = _inputFields$filter$.type;
        var label = _inputFields$filter$.label;

        return renderInput(field, type, label);
      }),
      _react2.default.createElement(
        'div',
        { className: 'cta' },
        _react2.default.createElement(
          'button',
          { className: 'btn large', onClick: handleSubmit },
          submitText
        )
      )
    );
  };

  Form.propTypes = {
    handleSubmit: _react.PropTypes.func.isRequired,
    fields: _react.PropTypes.object.isRequired
  };

  return (0, _reduxForm.reduxForm)({
    form: formName,
    fields: inputFields.map(function (field) {
      return field.name;
    }),
    validate: validate
  })(Form);
};

exports.default = formFactory;

},{"react":"react","redux-form":62,"underscore":"underscore"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.email = email;
exports.required = required;
exports.match = match;
exports.createValidator = createValidator;
/* eslint-disable consistent-return */

var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0];
  };
};

function email(value) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

function required(value) {
  if (isEmpty(value)) return 'This field is required';
}

function match(field) {
  return function (value, data) {
    if (data) {
      if (value !== data[field]) {
        return 'As senhas não coincidem';
      }
    }
  };
}

function createValidator(rules) {
  return function () {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var errors = {};
    Object.keys(rules).forEach(function (key) {
      var rule = join([].concat(rules[key]));
      var error = rule(data[key], data);
      if (error) errors[key] = error;
    });
    return errors;
  };
}

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
    case _constants.LOAD_AUTH:
      return _extends({}, state, {
        loading: true
      });
    case _constants.LOAD_AUTH_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        status: action.result.status,
        user: action.result.user
      });
    case _constants.LOAD_AUTH_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        status: 'unathorized'
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

},{"../constants":16}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  auth: _auth2.default,
  posts: _posts2.default,
  form: _reduxForm.reducer,
  routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;

},{"./auth":21,"./posts":23,"react-router-redux":81,"redux":"redux","redux-form":62}],23:[function(require,module,exports){
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
    case _constants.LOAD_POSTS:
      return _extends({}, state, {
        loading: true
      });
    case _constants.LOAD_POSTS_SUCCESS:
      return _extends({}, state, {
        loading: false,
        loaded: true,
        status: action.result.status.message,
        posts: action.result.status.posts
      });
    case _constants.LOAD_POSTS_FAIL:
      return _extends({}, state, {
        loading: false,
        loaded: false,
        status: Object.keys(action.error) !== 0 ? action.error : 'unathorized'
      });
    default:
      return state;
  }
};

exports.default = reducer;

},{"../constants":16}],24:[function(require,module,exports){
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
    function checkAuth() {
      var _store$getState = store.getState();

      var user = _store$getState.auth.user;

      if (!user) replace('/admin/signin');
      callback();
    }

    if (!(0, _auth.isLoaded)(store.getState())) {
      return store.dispatch((0, _auth.loadAuth)()).then(checkAuth).catch(checkAuth);
    }
    return checkAuth();
  };

  return _react2.default.createElement(
    _reactRouter.Route,
    { name: 'app', component: _components.AppView, path: '/' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Home }),
    _react2.default.createElement(_reactRouter.Route, { component: _components.About, path: 'about' }),
    _react2.default.createElement(_reactRouter.Route, { component: _components.Contact, path: 'contact' }),
    _react2.default.createElement(
      _reactRouter.Route,
      { name: 'admin', path: 'admin' },
      _react2.default.createElement(_reactRouter.Route, { component: _components.SignIn, path: 'signin' }),
      _react2.default.createElement(
        _reactRouter.Route,
        { onEnter: mustBeLogged },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Admin })
      )
    )
  );
};

},{"./actions/auth":1,"./components":9,"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
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

},{"./middleware/clientMiddleware":20,"./reducers":22,"react-router-redux":81,"redux":"redux"}],26:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":27,"./lib/keys.js":28}],27:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],28:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],29:[function(require,module,exports){
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);
        for (var i=0; i<keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

},{}],30:[function(require,module,exports){
module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = deepEquals;
var hasOwn = Object.prototype.hasOwnProperty;

function deepEquals(equals, deepObjects) {
  function deep(valueA, valueB) {
    if (equals(valueA, valueB)) {
      return true;
    }

    if (Array.isArray(valueA)) {
      if (!Array.isArray(valueB) || valueA.length !== valueB.length) {
        return false;
      }
      for (var index = 0; index < valueA.length; index++) {
        if (!deep(valueA[index], valueB[index])) {
          return false;
        }
      }
      // could not find unequal items
      return true;
    }

    if (Array.isArray(valueB)) {
      return false;
    }

    if (typeof valueA === 'object') {
      if (typeof valueB !== 'object') {
        return false;
      }

      var isANull = valueA === null;
      var isBNull = valueB === null;
      if (isANull || isBNull) {
        return isANull === isBNull;
      }

      var aKeys = Object.keys(valueA);
      var bKeys = Object.keys(valueB);

      if (aKeys.length !== bKeys.length) {
        return false;
      }

      for (var index = 0; index < aKeys.length; index++) {
        var key = aKeys[index];
        if (hasOwn.call(valueA, key) && (!hasOwn.call(valueB, key) || !(deepObjects ? deep : equals)(valueA[key], valueB[key]))) {
          return false;
        }
      }
      // could not find unequal keys or values
      return true;
    }
    return false;
  }

  return deep;
}

module.exports = exports['default'];
},{}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _memoize = require('./memoize');

var _memoize2 = _interopRequireDefault(_memoize);

exports['default'] = _memoize2['default'];
module.exports = exports['default'];
},{"./memoize":34}],33:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = lruCache;

function lruCache(limit, equals) {
  var entries = [];

  function get(key) {
    for (var index = 0; index < entries.length; index++) {
      var entry = entries[index];
      if (equals(key, entry.key)) {
        if (index > 0) {
          // move this entry to the top of the cache
          entries.splice(index, 1);
          entries.unshift(entry);
        }
        return entry.value;
      }
    }
  }

  function put(key, value) {
    if (!get(key)) {
      entries.unshift({ key: key, value: value });
      if (entries.length > limit) {
        entries.pop();
      }
    }
  }

  return { get: get, put: put };
}

module.exports = exports["default"];
},{}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = memoize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _singletonCache = require('./singletonCache');

var _singletonCache2 = _interopRequireDefault(_singletonCache);

var _lruCache = require('./lruCache');

var _lruCache2 = _interopRequireDefault(_lruCache);

var _deepEquals = require('./deepEquals');

var _deepEquals2 = _interopRequireDefault(_deepEquals);

function createCache(limit, equals) {
  return limit === 1 ? _singletonCache2['default'](equals) : _lruCache2['default'](limit, equals);
}

function memoize() {
  var limit = 1;
  var equals = function equals(valueA, valueB) {
    return valueA === valueB;
  };
  var deepObjects = false;

  for (var _len = arguments.length, config = Array(_len), _key = 0; _key < _len; _key++) {
    config[_key] = arguments[_key];
  }

  if (typeof config[0] === 'number') {
    limit = config.shift();
  }
  if (typeof config[0] === 'function') {
    equals = config.shift();
  }
  if (typeof config[0] === 'boolean') {
    deepObjects = config[0];
  }

  var cache = createCache(limit, _deepEquals2['default'](equals, deepObjects));

  return function (fn) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var value = cache.get(args);
      if (value === undefined) {
        value = fn.apply(fn, args);
        cache.put(args, value);
      }
      return value;
    };
  };
}

module.exports = exports['default'];
},{"./deepEquals":31,"./lruCache":33,"./singletonCache":35}],35:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = singletonCache;

function singletonCache(equals) {
  var entry = undefined;
  return {
    get: function get(key) {
      if (entry && equals(key, entry.key)) {
        return entry.value;
      }
    },

    put: function put(key, value) {
      entry = { key: key, value: value };
    }
  };
}

module.exports = exports["default"];
},{}],36:[function(require,module,exports){
//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function intersects(array1, array2) {
  return !!(array1 && array2 && array1.some(function (item) {
    return ~array2.indexOf(item);
  }));
}

var LazyCache = (function () {
  function LazyCache(component, calculators) {
    var _this = this;

    _classCallCheck(this, LazyCache);

    this.component = component;
    this.allProps = [];
    this.cache = Object.keys(calculators).reduce(function (accumulator, key) {
      var _extends2;

      var calculator = calculators[key];
      var fn = calculator.fn;
      var paramNames = calculator.params;
      paramNames.forEach(function (param) {
        if (! ~_this.allProps.indexOf(param)) {
          _this.allProps.push(param);
        }
      });
      return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = {
        value: undefined,
        props: paramNames,
        fn: fn
      }, _extends2));
    }, {});
  }

  LazyCache.prototype.get = function get(key) {
    var component = this.component;
    var _cache$key = this.cache[key];
    var value = _cache$key.value;
    var fn = _cache$key.fn;
    var props = _cache$key.props;

    if (value !== undefined) {
      return value;
    }
    var params = props.map(function (prop) {
      return component.props[prop];
    });
    var result = fn.apply(undefined, params);
    this.cache[key].value = result;
    return result;
  };

  LazyCache.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var component = this.component;

    var diffProps = [];
    this.allProps.forEach(function (prop) {
      if (!_deepEqual2['default'](component.props[prop], nextProps[prop])) {
        diffProps.push(prop);
      }
    });
    if (diffProps.length) {
      Object.keys(this.cache).forEach(function (key) {
        if (intersects(diffProps, _this2.cache[key].props)) {
          delete _this2.cache[key].value; // uncache value
        }
      });
    }
  };

  return LazyCache;
})();

exports['default'] = LazyCache;
module.exports = exports['default'];
},{"deep-equal":26}],38:[function(require,module,exports){
module.exports = require('./lib/noGetters');

},{"./lib/noGetters":37}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var ADD_ARRAY_VALUE = exports.ADD_ARRAY_VALUE = 'redux-form/ADD_ARRAY_VALUE';
var AUTOFILL = exports.AUTOFILL = 'redux-form/AUTOFILL';
var BLUR = exports.BLUR = 'redux-form/BLUR';
var CHANGE = exports.CHANGE = 'redux-form/CHANGE';
var DESTROY = exports.DESTROY = 'redux-form/DESTROY';
var FOCUS = exports.FOCUS = 'redux-form/FOCUS';
var INITIALIZE = exports.INITIALIZE = 'redux-form/INITIALIZE';
var REMOVE_ARRAY_VALUE = exports.REMOVE_ARRAY_VALUE = 'redux-form/REMOVE_ARRAY_VALUE';
var RESET = exports.RESET = 'redux-form/RESET';
var START_ASYNC_VALIDATION = exports.START_ASYNC_VALIDATION = 'redux-form/START_ASYNC_VALIDATION';
var START_SUBMIT = exports.START_SUBMIT = 'redux-form/START_SUBMIT';
var STOP_ASYNC_VALIDATION = exports.STOP_ASYNC_VALIDATION = 'redux-form/STOP_ASYNC_VALIDATION';
var STOP_SUBMIT = exports.STOP_SUBMIT = 'redux-form/STOP_SUBMIT';
var SUBMIT_FAILED = exports.SUBMIT_FAILED = 'redux-form/SUBMIT_FAILED';
var SWAP_ARRAY_VALUES = exports.SWAP_ARRAY_VALUES = 'redux-form/SWAP_ARRAY_VALUES';
var TOUCH = exports.TOUCH = 'redux-form/TOUCH';
var UNTOUCH = exports.UNTOUCH = 'redux-form/UNTOUCH';
},{}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.untouch = exports.touch = exports.swapArrayValues = exports.submitFailed = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.removeArrayValue = exports.initialize = exports.focus = exports.destroy = exports.change = exports.blur = exports.autofill = exports.addArrayValue = undefined;

var _actionTypes = require('./actionTypes');

var addArrayValue = exports.addArrayValue = function addArrayValue(path, value, index, fields) {
  return { type: _actionTypes.ADD_ARRAY_VALUE, path: path, value: value, index: index, fields: fields };
};

var autofill = exports.autofill = function autofill(field, value) {
  return { type: _actionTypes.AUTOFILL, field: field, value: value };
};

var blur = exports.blur = function blur(field, value) {
  return { type: _actionTypes.BLUR, field: field, value: value };
};

var change = exports.change = function change(field, value) {
  return { type: _actionTypes.CHANGE, field: field, value: value };
};

var destroy = exports.destroy = function destroy() {
  return { type: _actionTypes.DESTROY };
};

var focus = exports.focus = function focus(field) {
  return { type: _actionTypes.FOCUS, field: field };
};

var initialize = exports.initialize = function initialize(data, fields) {
  var overwriteValues = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  if (!Array.isArray(fields)) {
    throw new Error('must provide fields array to initialize() action creator');
  }
  return { type: _actionTypes.INITIALIZE, data: data, fields: fields, overwriteValues: overwriteValues };
};

var removeArrayValue = exports.removeArrayValue = function removeArrayValue(path, index) {
  return { type: _actionTypes.REMOVE_ARRAY_VALUE, path: path, index: index };
};

var reset = exports.reset = function reset() {
  return { type: _actionTypes.RESET };
};

var startAsyncValidation = exports.startAsyncValidation = function startAsyncValidation(field) {
  return { type: _actionTypes.START_ASYNC_VALIDATION, field: field };
};

var startSubmit = exports.startSubmit = function startSubmit() {
  return { type: _actionTypes.START_SUBMIT };
};

var stopAsyncValidation = exports.stopAsyncValidation = function stopAsyncValidation(errors) {
  return { type: _actionTypes.STOP_ASYNC_VALIDATION, errors: errors };
};

var stopSubmit = exports.stopSubmit = function stopSubmit(errors) {
  return { type: _actionTypes.STOP_SUBMIT, errors: errors };
};

var submitFailed = exports.submitFailed = function submitFailed() {
  return { type: _actionTypes.SUBMIT_FAILED };
};

var swapArrayValues = exports.swapArrayValues = function swapArrayValues(path, indexA, indexB) {
  return { type: _actionTypes.SWAP_ARRAY_VALUES, path: path, indexA: indexA, indexB: indexB };
};

var touch = exports.touch = function touch() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return { type: _actionTypes.TOUCH, fields: fields };
};

var untouch = exports.untouch = function untouch() {
  for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fields[_key2] = arguments[_key2];
  }

  return { type: _actionTypes.UNTOUCH, fields: fields };
};
},{"./actionTypes":39}],41:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncValidation = function asyncValidation(fn, start, stop, field) {
  start(field);
  var promise = fn();
  if (!(0, _isPromise2.default)(promise)) {
    throw new Error('asyncValidate function passed to reduxForm must return a promise');
  }
  var handleErrors = function handleErrors(rejected) {
    return function (errors) {
      if (!(0, _isValid2.default)(errors)) {
        stop(errors);
        return Promise.reject();
      } else if (rejected) {
        stop();
        throw new Error('Asynchronous validation promise was rejected without errors.');
      }
      stop();
      return Promise.resolve();
    };
  };
  return promise.then(handleErrors(false), handleErrors(true));
};

exports.default = asyncValidation;
},{"./isValid":65,"is-promise":30}],42:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = bindActionData;

var _mapValues = require('./mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds additional properties to the results of the function or map of functions passed
 */
function bindActionData(action, data) {
  if (typeof action === 'function') {
    return function () {
      return _extends({}, action.apply(undefined, arguments), data);
    };
  }
  if (typeof action === 'object') {
    return (0, _mapValues2.default)(action, function (value) {
      return bindActionData(value, data);
    });
  }
  return action;
}
},{"./mapValues":66}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createAll;

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _createReduxForm = require('./createReduxForm');

var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

var _mapValues = require('./mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _bindActionData = require('./bindActionData');

var _bindActionData2 = _interopRequireDefault(_bindActionData);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _createPropTypes = require('./createPropTypes');

var _createPropTypes2 = _interopRequireDefault(_createPropTypes);

var _getValuesFromState = require('./getValuesFromState');

var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bind form as first parameter of action creators
var boundActions = _extends({}, (0, _mapValues2.default)(_extends({}, actions, {
  autofillWithKey: function autofillWithKey(key) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (0, _bindActionData2.default)(actions.autofill, { key: key }).apply(undefined, args);
  },
  changeWithKey: function changeWithKey(key) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return (0, _bindActionData2.default)(actions.change, { key: key }).apply(undefined, args);
  },
  initializeWithKey: function initializeWithKey(key) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return (0, _bindActionData2.default)(actions.initialize, { key: key }).apply(undefined, args);
  },
  reset: function reset(key) {
    return (0, _bindActionData2.default)(actions.reset, { key: key })();
  },
  touchWithKey: function touchWithKey(key) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return (0, _bindActionData2.default)(actions.touch, { key: key }).apply(undefined, args);
  },
  untouchWithKey: function untouchWithKey(key) {
    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    return (0, _bindActionData2.default)(actions.untouch, { key: key }).apply(undefined, args);
  },
  destroy: function destroy(key) {
    return (0, _bindActionData2.default)(actions.destroy, { key: key })();
  }
}), function (action) {
  return function (form) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return (0, _bindActionData2.default)(action, { form: form }).apply(undefined, args);
  };
}));

var addArrayValue = boundActions.addArrayValue;
var autofill = boundActions.autofill;
var autofillWithKey = boundActions.autofillWithKey;
var blur = boundActions.blur;
var change = boundActions.change;
var changeWithKey = boundActions.changeWithKey;
var destroy = boundActions.destroy;
var focus = boundActions.focus;
var initialize = boundActions.initialize;
var initializeWithKey = boundActions.initializeWithKey;
var removeArrayValue = boundActions.removeArrayValue;
var reset = boundActions.reset;
var startAsyncValidation = boundActions.startAsyncValidation;
var startSubmit = boundActions.startSubmit;
var stopAsyncValidation = boundActions.stopAsyncValidation;
var stopSubmit = boundActions.stopSubmit;
var submitFailed = boundActions.submitFailed;
var swapArrayValues = boundActions.swapArrayValues;
var touch = boundActions.touch;
var touchWithKey = boundActions.touchWithKey;
var untouch = boundActions.untouch;
var untouchWithKey = boundActions.untouchWithKey;

function createAll(isReactNative, React, connect) {
  return {
    actionTypes: actionTypes,
    addArrayValue: addArrayValue,
    autofill: autofill,
    autofillWithKey: autofillWithKey,
    blur: blur,
    change: change,
    changeWithKey: changeWithKey,
    destroy: destroy,
    focus: focus,
    getValues: _getValuesFromState2.default,
    initialize: initialize,
    initializeWithKey: initializeWithKey,
    propTypes: (0, _createPropTypes2.default)(React),
    reduxForm: (0, _createReduxForm2.default)(isReactNative, React, connect),
    reducer: _reducer2.default,
    removeArrayValue: removeArrayValue,
    reset: reset,
    startAsyncValidation: startAsyncValidation,
    startSubmit: startSubmit,
    stopAsyncValidation: stopAsyncValidation,
    stopSubmit: stopSubmit,
    submitFailed: submitFailed,
    swapArrayValues: swapArrayValues,
    touch: touch,
    touchWithKey: touchWithKey,
    untouch: untouch,
    untouchWithKey: untouchWithKey
  };
}
},{"./actionTypes":39,"./actions":40,"./bindActionData":42,"./createPropTypes":45,"./createReduxForm":46,"./getValuesFromState":60,"./mapValues":66,"./reducer":71}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var importedActions = _interopRequireWildcard(_actions);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _reducer = require('./reducer');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _bindActionData = require('./bindActionData');

var _bindActionData2 = _interopRequireDefault(_bindActionData);

var _getValues = require('./getValues');

var _getValues2 = _interopRequireDefault(_getValues);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var _readFields = require('./readFields');

var _readFields2 = _interopRequireDefault(_readFields);

var _handleSubmit2 = require('./handleSubmit');

var _handleSubmit3 = _interopRequireDefault(_handleSubmit2);

var _asyncValidation = require('./asyncValidation');

var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

var _silenceEvents = require('./events/silenceEvents');

var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

var _silenceEvent = require('./events/silenceEvent');

var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

var _wrapMapDispatchToProps = require('./wrapMapDispatchToProps');

var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

var _wrapMapStateToProps = require('./wrapMapStateToProps');

var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Creates a HOC that knows how to create redux-connected sub-components.
 */
var createHigherOrderComponent = function createHigherOrderComponent(config, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  return function (reduxMountPoint, formName, formKey, getFormState) {
    var ReduxForm = function (_Component) {
      _inherits(ReduxForm, _Component);

      function ReduxForm(props) {
        _classCallCheck(this, ReduxForm);

        // bind functions

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.asyncValidate = _this.asyncValidate.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.fields = (0, _readFields2.default)(props, {}, {}, _this.asyncValidate, isReactNative);
        var submitPassback = _this.props.submitPassback;

        submitPassback(function () {
          return _this.handleSubmit();
        }); // wrapped in function to disallow params
        return _this;
      }

      ReduxForm.prototype.componentWillMount = function componentWillMount() {
        var _props = this.props;
        var fields = _props.fields;
        var form = _props.form;
        var initialize = _props.initialize;
        var initialValues = _props.initialValues;

        if (initialValues && !form._initialized) {
          initialize(initialValues, fields);
        }
      };

      ReduxForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!(0, _deepEqual2.default)(this.props.fields, nextProps.fields) || !(0, _deepEqual2.default)(this.props.form, nextProps.form, { strict: true })) {
          this.fields = (0, _readFields2.default)(nextProps, this.props, this.fields, this.asyncValidate, isReactNative);
        }
        if (!(0, _deepEqual2.default)(this.props.initialValues, nextProps.initialValues)) {
          this.props.initialize(nextProps.initialValues, nextProps.fields, this.props.overwriteOnInitialValuesChange || !this.props.form._initialized);
        }
      };

      ReduxForm.prototype.componentWillUnmount = function componentWillUnmount() {
        if (config.destroyOnUnmount) {
          this.props.destroy();
        }
      };

      ReduxForm.prototype.asyncValidate = function asyncValidate(name, value) {
        var _this2 = this;

        var _props2 = this.props;
        var alwaysAsyncValidate = _props2.alwaysAsyncValidate;
        var asyncValidate = _props2.asyncValidate;
        var dispatch = _props2.dispatch;
        var fields = _props2.fields;
        var form = _props2.form;
        var startAsyncValidation = _props2.startAsyncValidation;
        var stopAsyncValidation = _props2.stopAsyncValidation;
        var validate = _props2.validate;

        var isSubmitting = !name;
        if (asyncValidate) {
          var _ret = function () {
            var values = (0, _getValues2.default)(fields, form);
            if (name) {
              values[name] = value;
            }
            var syncErrors = validate(values, _this2.props);
            var allPristine = _this2.fields._meta.allPristine;

            var initialized = form._initialized;

            // if blur validating, only run async validate if sync validation passes
            // and submitting (not blur validation) or form is dirty or form was never initialized
            // unless alwaysAsyncValidate is true
            var syncValidationPasses = isSubmitting || (0, _isValid2.default)(syncErrors[name]);
            if (alwaysAsyncValidate || syncValidationPasses && (isSubmitting || !allPristine || !initialized)) {
              return {
                v: (0, _asyncValidation2.default)(function () {
                  return asyncValidate(values, dispatch, _this2.props);
                }, startAsyncValidation, stopAsyncValidation, name)
              };
            }
          }();

          if (typeof _ret === "object") return _ret.v;
        }
      };

      ReduxForm.prototype.handleSubmit = function handleSubmit(submitOrEvent) {
        var _this3 = this;

        var _props3 = this.props;
        var onSubmit = _props3.onSubmit;
        var fields = _props3.fields;
        var form = _props3.form;

        var check = function check(submit) {
          if (!submit || typeof submit !== 'function') {
            throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
          }
          return submit;
        };
        return !submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent) ?
        // submitOrEvent is an event: fire submit
        (0, _handleSubmit3.default)(check(onSubmit), (0, _getValues2.default)(fields, form), this.props, this.asyncValidate) :
        // submitOrEvent is the submit function: return deferred submit thunk
        (0, _silenceEvents2.default)(function () {
          return (0, _handleSubmit3.default)(check(submitOrEvent), (0, _getValues2.default)(fields, form), _this3.props, _this3.asyncValidate);
        });
      };

      ReduxForm.prototype.render = function render() {
        var _this4 = this,
            _ref;

        var allFields = this.fields;
        var _props4 = this.props;
        var addArrayValue = _props4.addArrayValue;
        var asyncBlurFields = _props4.asyncBlurFields;
        var autofill = _props4.autofill;
        var blur = _props4.blur;
        var change = _props4.change;
        var destroy = _props4.destroy;
        var focus = _props4.focus;
        var fields = _props4.fields;
        var form = _props4.form;
        var initialValues = _props4.initialValues;
        var initialize = _props4.initialize;
        var onSubmit = _props4.onSubmit;
        var propNamespace = _props4.propNamespace;
        var reset = _props4.reset;
        var removeArrayValue = _props4.removeArrayValue;
        var returnRejectedSubmitPromise = _props4.returnRejectedSubmitPromise;
        var startAsyncValidation = _props4.startAsyncValidation;
        var startSubmit = _props4.startSubmit;
        var stopAsyncValidation = _props4.stopAsyncValidation;
        var stopSubmit = _props4.stopSubmit;
        var submitFailed = _props4.submitFailed;
        var swapArrayValues = _props4.swapArrayValues;
        var touch = _props4.touch;
        var untouch = _props4.untouch;
        var validate = _props4.validate;

        var passableProps = _objectWithoutProperties(_props4, ['addArrayValue', 'asyncBlurFields', 'autofill', 'blur', 'change', 'destroy', 'focus', 'fields', 'form', 'initialValues', 'initialize', 'onSubmit', 'propNamespace', 'reset', 'removeArrayValue', 'returnRejectedSubmitPromise', 'startAsyncValidation', 'startSubmit', 'stopAsyncValidation', 'stopSubmit', 'submitFailed', 'swapArrayValues', 'touch', 'untouch', 'validate']); // eslint-disable-line no-redeclare


        var _allFields$_meta = allFields._meta;
        var allPristine = _allFields$_meta.allPristine;
        var allValid = _allFields$_meta.allValid;
        var errors = _allFields$_meta.errors;
        var formError = _allFields$_meta.formError;
        var values = _allFields$_meta.values;


        var props = {
          // State:
          active: form._active,
          asyncValidating: form._asyncValidating,
          dirty: !allPristine,
          error: formError,
          errors: errors,
          fields: allFields,
          formKey: formKey,
          invalid: !allValid,
          pristine: allPristine,
          submitting: form._submitting,
          submitFailed: form._submitFailed,
          valid: allValid,
          values: values,

          // Actions:
          asyncValidate: (0, _silenceEvents2.default)(function () {
            return _this4.asyncValidate();
          }),
          // ^ doesn't just pass this.asyncValidate to disallow values passing
          destroyForm: (0, _silenceEvents2.default)(destroy),
          handleSubmit: this.handleSubmit,
          initializeForm: (0, _silenceEvents2.default)(function (initValues) {
            return initialize(initValues, fields);
          }),
          resetForm: (0, _silenceEvents2.default)(reset),
          touch: (0, _silenceEvents2.default)(function () {
            return touch.apply(undefined, arguments);
          }),
          touchAll: (0, _silenceEvents2.default)(function () {
            return touch.apply(undefined, fields);
          }),
          untouch: (0, _silenceEvents2.default)(function () {
            return untouch.apply(undefined, arguments);
          }),
          untouchAll: (0, _silenceEvents2.default)(function () {
            return untouch.apply(undefined, fields);
          })
        };
        var passedProps = propNamespace ? (_ref = {}, _ref[propNamespace] = props, _ref) : props;
        return React.createElement(WrappedComponent, _extends({}, passableProps, passedProps));
      };

      return ReduxForm;
    }(Component);

    ReduxForm.displayName = 'ReduxForm(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
    ReduxForm.WrappedComponent = WrappedComponent;
    ReduxForm.propTypes = {
      // props:
      alwaysAsyncValidate: PropTypes.bool,
      asyncBlurFields: PropTypes.arrayOf(PropTypes.string),
      asyncValidate: PropTypes.func,
      dispatch: PropTypes.func.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string).isRequired,
      form: PropTypes.object,
      initialValues: PropTypes.any,
      onSubmit: PropTypes.func,
      onSubmitSuccess: PropTypes.func,
      onSubmitFail: PropTypes.func,
      overwriteOnInitialValuesChange: PropTypes.bool.isRequired,
      propNamespace: PropTypes.string,
      readonly: PropTypes.bool,
      returnRejectedSubmitPromise: PropTypes.bool,
      submitPassback: PropTypes.func.isRequired,
      validate: PropTypes.func,

      // actions:
      addArrayValue: PropTypes.func.isRequired,
      autofill: PropTypes.func.isRequired,
      blur: PropTypes.func.isRequired,
      change: PropTypes.func.isRequired,
      destroy: PropTypes.func.isRequired,
      focus: PropTypes.func.isRequired,
      initialize: PropTypes.func.isRequired,
      removeArrayValue: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      startAsyncValidation: PropTypes.func.isRequired,
      startSubmit: PropTypes.func.isRequired,
      stopAsyncValidation: PropTypes.func.isRequired,
      stopSubmit: PropTypes.func.isRequired,
      submitFailed: PropTypes.func.isRequired,
      swapArrayValues: PropTypes.func.isRequired,
      touch: PropTypes.func.isRequired,
      untouch: PropTypes.func.isRequired
    };
    ReduxForm.defaultProps = {
      asyncBlurFields: [],
      form: _reducer.initialState,
      readonly: false,
      returnRejectedSubmitPromise: false,
      validate: function validate() {
        return {};
      }
    };

    // bind touch flags to blur and change
    var unboundActions = _extends({}, importedActions, {
      blur: (0, _bindActionData2.default)(importedActions.blur, {
        touch: !!config.touchOnBlur
      }),
      change: (0, _bindActionData2.default)(importedActions.change, {
        touch: !!config.touchOnChange
      })
    });

    // make redux connector with or without form key
    var decorate = formKey !== undefined && formKey !== null ? connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
      var formState = getFormState(state, reduxMountPoint);
      if (!formState) {
        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
      }
      return formState && formState[formName] && formState[formName][formKey];
    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, {
      form: formName,
      key: formKey
    })), mergeProps, options) : connect((0, _wrapMapStateToProps2.default)(mapStateToProps, function (state) {
      var formState = getFormState(state, reduxMountPoint);
      if (!formState) {
        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
      }
      return formState && formState[formName];
    }), (0, _wrapMapDispatchToProps2.default)(mapDispatchToProps, (0, _bindActionData2.default)(unboundActions, { form: formName })), mergeProps, options);

    return decorate(ReduxForm);
  };
};

exports.default = createHigherOrderComponent;
},{"./actions":40,"./asyncValidation":41,"./bindActionData":42,"./events/silenceEvent":55,"./events/silenceEvents":56,"./getDisplayName":58,"./getValues":59,"./handleSubmit":61,"./isValid":65,"./readFields":70,"./reducer":71,"./wrapMapDispatchToProps":77,"./wrapMapStateToProps":78,"deep-equal":26}],45:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var createPropTypes = function createPropTypes(_ref) {
  var _ref$PropTypes = _ref.PropTypes;
  var any = _ref$PropTypes.any;
  var bool = _ref$PropTypes.bool;
  var string = _ref$PropTypes.string;
  var func = _ref$PropTypes.func;
  var object = _ref$PropTypes.object;
  return {
    // State:
    active: string, // currently active field
    asyncValidating: bool.isRequired, // true if async validation is running
    autofilled: bool, // true if set programmatically by autofill
    dirty: bool.isRequired, // true if any values are different from initialValues
    error: any, // form-wide error from '_error' key in validation result
    errors: object, // a map of errors corresponding to structure of form data (result of validation)
    fields: object.isRequired, // the map of fields
    formKey: any, // the form key if one was provided (used when doing multirecord forms)
    invalid: bool.isRequired, // true if there are any validation errors
    pristine: bool.isRequired, // true if the values are the same as initialValues
    submitting: bool.isRequired, // true if the form is in the process of being submitted
    submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
    valid: bool.isRequired, // true if there are no validation errors
    values: object.isRequired, // the values of the form as they will be submitted

    // Actions:
    asyncValidate: func.isRequired, // function to trigger async validation
    destroyForm: func.isRequired, // action to destroy the form's data in Redux
    handleSubmit: func.isRequired, // function to submit the form
    initializeForm: func.isRequired, // action to initialize form data
    resetForm: func.isRequired, // action to reset the form data to previously initialized values
    touch: func.isRequired, // action to mark fields as touched
    touchAll: func.isRequired, // action to mark ALL fields as touched
    untouch: func.isRequired, // action to mark fields as untouched
    untouchAll: func.isRequired // action to mark ALL fields as untouched
  };
};

exports.default = createPropTypes;
},{}],46:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createReduxFormConnector = require('./createReduxFormConnector');

var _createReduxFormConnector2 = _interopRequireDefault(_createReduxFormConnector);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The decorator that is the main API to redux-form
 */
var createReduxForm = function createReduxForm(isReactNative, React, connect) {
  var Component = React.Component;

  var reduxFormConnector = (0, _createReduxFormConnector2.default)(isReactNative, React, connect);
  return function (config, mapStateToProps, mapDispatchToProps, mergeProps, options) {
    return function (WrappedComponent) {
      var ReduxFormConnector = reduxFormConnector(WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options);
      var configWithDefaults = _extends({
        overwriteOnInitialValuesChange: true,
        touchOnBlur: true,
        touchOnChange: false,
        destroyOnUnmount: true
      }, config);

      var ConnectedForm = function (_Component) {
        _inherits(ConnectedForm, _Component);

        function ConnectedForm(props) {
          _classCallCheck(this, ConnectedForm);

          var _this = _possibleConstructorReturn(this, _Component.call(this, props));

          _this.handleSubmitPassback = _this.handleSubmitPassback.bind(_this);
          return _this;
        }

        ConnectedForm.prototype.handleSubmitPassback = function handleSubmitPassback(submit) {
          this.submit = submit;
        };

        ConnectedForm.prototype.render = function render() {
          return React.createElement(ReduxFormConnector, _extends({}, configWithDefaults, this.props, {
            submitPassback: this.handleSubmitPassback }));
        };

        return ConnectedForm;
      }(Component);

      return (0, _hoistNonReactStatics2.default)(ConnectedForm, WrappedComponent);
    };
  };
};

exports.default = createReduxForm;
},{"./createReduxFormConnector":47,"hoist-non-react-statics":29}],47:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _noGetters = require('react-lazy-cache/noGetters');

var _noGetters2 = _interopRequireDefault(_noGetters);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _createHigherOrderComponent = require('./createHigherOrderComponent');

var _createHigherOrderComponent2 = _interopRequireDefault(_createHigherOrderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component tracks props that affect how the form is mounted to the store. Normally these should not change,
 * but if they do, the connected components below it need to be redefined.
 */
var createReduxFormConnector = function createReduxFormConnector(isReactNative, React, connect) {
  return function (WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
    var Component = React.Component;
    var PropTypes = React.PropTypes;

    var ReduxFormConnector = function (_Component) {
      _inherits(ReduxFormConnector, _Component);

      function ReduxFormConnector(props) {
        _classCallCheck(this, ReduxFormConnector);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.cache = new _noGetters2.default(_this, {
          ReduxForm: {
            params: [
            // props that effect how redux-form connects to the redux store
            'reduxMountPoint', 'form', 'formKey', 'getFormState'],
            fn: (0, _createHigherOrderComponent2.default)(props, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options)
          }
        });
        return _this;
      }

      ReduxFormConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.cache.componentWillReceiveProps(nextProps);
      };

      ReduxFormConnector.prototype.render = function render() {
        var ReduxForm = this.cache.get('ReduxForm');
        // remove some redux-form config-only props
        var _props = this.props;
        var reduxMountPoint = _props.reduxMountPoint;
        var destroyOnUnmount = _props.destroyOnUnmount;
        var form = _props.form;
        var getFormState = _props.getFormState;
        var touchOnBlur = _props.touchOnBlur;
        var touchOnChange = _props.touchOnChange;

        var passableProps = _objectWithoutProperties(_props, ['reduxMountPoint', 'destroyOnUnmount', 'form', 'getFormState', 'touchOnBlur', 'touchOnChange']); // eslint-disable-line no-redeclare


        return React.createElement(ReduxForm, passableProps);
      };

      return ReduxFormConnector;
    }(Component);

    ReduxFormConnector.displayName = 'ReduxFormConnector(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
    ReduxFormConnector.WrappedComponent = WrappedComponent;
    ReduxFormConnector.propTypes = {
      destroyOnUnmount: PropTypes.bool,
      reduxMountPoint: PropTypes.string,
      form: PropTypes.string.isRequired,
      formKey: PropTypes.string,
      getFormState: PropTypes.func,
      touchOnBlur: PropTypes.bool,
      touchOnChange: PropTypes.bool
    };
    ReduxFormConnector.defaultProps = {
      reduxMountPoint: 'form',
      getFormState: function getFormState(state, reduxMountPoint) {
        return state[reduxMountPoint];
      }
    };
    return ReduxFormConnector;
  };
};

exports.default = createReduxFormConnector;
},{"./createHigherOrderComponent":44,"./getDisplayName":58,"react-lazy-cache/noGetters":38}],48:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOnBlur = function createOnBlur(name, blur, isReactNative, afterBlur) {
  return function (event) {
    var value = (0, _getValue2.default)(event, isReactNative);
    blur(name, value);
    if (afterBlur) {
      afterBlur(name, value);
    }
  };
};
exports.default = createOnBlur;
},{"./getValue":53}],49:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOnChange = function createOnChange(name, change, isReactNative) {
  return function (event) {
    return change(name, (0, _getValue2.default)(event, isReactNative));
  };
};
exports.default = createOnChange;
},{"./getValue":53}],50:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var dataKey = exports.dataKey = 'value';
var createOnDragStart = function createOnDragStart(name, getValue) {
  return function (event) {
    event.dataTransfer.setData(dataKey, getValue());
  };
};

exports.default = createOnDragStart;
},{}],51:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createOnDragStart = require('./createOnDragStart');

var createOnDrop = function createOnDrop(name, change) {
  return function (event) {
    change(name, event.dataTransfer.getData(_createOnDragStart.dataKey));
  };
};
exports.default = createOnDrop;
},{"./createOnDragStart":50}],52:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var createOnFocus = function createOnFocus(name, focus) {
  return function () {
    return focus(name);
  };
};
exports.default = createOnFocus;
},{}],53:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _isEvent = require('./isEvent');

var _isEvent2 = _interopRequireDefault(_isEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSelectedValues = function getSelectedValues(options) {
  var result = [];
  if (options) {
    for (var index = 0; index < options.length; index++) {
      var option = options[index];
      if (option.selected) {
        result.push(option.value);
      }
    }
  }
  return result;
};

var getValue = function getValue(event, isReactNative) {
  if ((0, _isEvent2.default)(event)) {
    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
      return event.nativeEvent.text;
    }
    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text;
    }
    var _event$target = event.target;
    var type = _event$target.type;
    var value = _event$target.value;
    var checked = _event$target.checked;
    var files = _event$target.files;
    var dataTransfer = event.dataTransfer;

    if (type === 'checkbox') {
      return checked;
    }
    if (type === 'file') {
      return files || dataTransfer && dataTransfer.files;
    }
    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options);
    }
    return value;
  }
  // not an event, so must be either our value or an object containing our value in the 'value' key
  return event && typeof event === 'object' && event.value !== undefined ? event.value : // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
  event;
};

exports.default = getValue;
},{"./isEvent":54}],54:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var isEvent = function isEvent(candidate) {
  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
};

exports.default = isEvent;
},{}],55:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _isEvent = require('./isEvent');

var _isEvent2 = _interopRequireDefault(_isEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var silenceEvent = function silenceEvent(event) {
  var is = (0, _isEvent2.default)(event);
  if (is) {
    event.preventDefault();
  }
  return is;
};

exports.default = silenceEvent;
},{"./isEvent":54}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _silenceEvent = require('./silenceEvent');

var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var silenceEvents = function silenceEvents(fn) {
  return function (event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (0, _silenceEvent2.default)(event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
  };
};

exports.default = silenceEvents;
},{"./silenceEvent":55}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.makeFieldValue = makeFieldValue;
exports.isFieldValue = isFieldValue;
var flag = '_isFieldValue';
var isObject = function isObject(object) {
  return typeof object === 'object';
};

function makeFieldValue(object) {
  if (object && isObject(object)) {
    Object.defineProperty(object, flag, { value: true });
  }
  return object;
}

function isFieldValue(object) {
  return !!(object && isObject(object) && object[flag]);
}
},{}],58:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = getDisplayName;
function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
}
},{}],59:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * Given a state[field], get the value.
 *  Fallback to .initialValue when .value is undefined to prevent double render/initialize cycle.
 *  See {@link https://github.com/erikras/redux-form/issues/621}.
 */
var itemToValue = function itemToValue(_ref) {
  var value = _ref.value;
  var initialValue = _ref.initialValue;
  return typeof value !== 'undefined' ? value : initialValue;
};

var getValue = function getValue(field, state, dest) {
  var dotIndex = field.indexOf('.');
  var openIndex = field.indexOf('[');
  var closeIndex = field.indexOf(']');
  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }
  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    (function () {
      // array field
      var key = field.substring(0, openIndex);
      var rest = field.substring(closeIndex + 1);
      if (rest[0] === '.') {
        rest = rest.substring(1);
      }
      var array = state && state[key] || [];
      if (rest) {
        if (!dest[key]) {
          dest[key] = [];
        }
        array.forEach(function (item, index) {
          if (!dest[key][index]) {
            dest[key][index] = {};
          }
          getValue(rest, item, dest[key][index]);
        });
      } else {
        dest[key] = array.map(itemToValue);
      }
    })();
  } else if (dotIndex > 0) {
    // subobject field
    var _key = field.substring(0, dotIndex);
    var _rest = field.substring(dotIndex + 1);
    if (!dest[_key]) {
      dest[_key] = {};
    }
    getValue(_rest, state && state[_key] || {}, dest[_key]);
  } else {
    dest[field] = state[field] && itemToValue(state[field]);
  }
};

var getValues = function getValues(fields, state) {
  return fields.reduce(function (accumulator, field) {
    getValue(field, state, accumulator);
    return accumulator;
  }, {});
};

exports.default = getValues;
},{}],60:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _fieldValue = require('./fieldValue');

/**
 * A different version of getValues() that does not need the fields array
 */
var getValuesFromState = function getValuesFromState(state) {
  if (!state) {
    return state;
  }
  var keys = Object.keys(state);
  if (!keys.length) {
    return undefined;
  }
  return keys.reduce(function (accumulator, key) {
    var field = state[key];
    if (field) {
      if ((0, _fieldValue.isFieldValue)(field)) {
        if (field.value !== undefined) {
          accumulator[key] = field.value;
        }
      } else if (Array.isArray(field)) {
        accumulator[key] = field.map(function (arrayField) {
          return (0, _fieldValue.isFieldValue)(arrayField) ? arrayField.value : getValuesFromState(arrayField);
        });
      } else if (typeof field === 'object') {
        var result = getValuesFromState(field);

        if (result && Object.keys(result).length > 0) {
          accumulator[key] = result;
        }
      }
    }
    return accumulator;
  }, {});
};

exports.default = getValuesFromState;
},{"./fieldValue":57}],61:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleSubmit = function handleSubmit(submit, values, props, asyncValidate) {
  var dispatch = props.dispatch;
  var fields = props.fields;
  var onSubmitSuccess = props.onSubmitSuccess;
  var onSubmitFail = props.onSubmitFail;
  var startSubmit = props.startSubmit;
  var stopSubmit = props.stopSubmit;
  var submitFailed = props.submitFailed;
  var returnRejectedSubmitPromise = props.returnRejectedSubmitPromise;
  var touch = props.touch;
  var validate = props.validate;

  var syncErrors = validate(values, props);
  touch.apply(undefined, fields); // touch all fields
  if ((0, _isValid2.default)(syncErrors)) {
    var doSubmit = function doSubmit() {
      var result = submit(values, dispatch);
      if ((0, _isPromise2.default)(result)) {
        startSubmit();
        return result.then(function (submitResult) {
          stopSubmit();
          if (onSubmitSuccess) {
            onSubmitSuccess(submitResult);
          }
          return submitResult;
        }, function (submitError) {
          stopSubmit(submitError);
          if (onSubmitFail) {
            onSubmitFail(submitError);
          }
          if (returnRejectedSubmitPromise) {
            return Promise.reject(submitError);
          }
        });
      }
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }
      return result;
    };
    var asyncValidateResult = asyncValidate();
    return (0, _isPromise2.default)(asyncValidateResult) ?
    // asyncValidateResult will be rejected if async validation failed
    asyncValidateResult.then(doSubmit, function () {
      submitFailed();
      if (onSubmitFail) {
        onSubmitFail();
      }
      return returnRejectedSubmitPromise ? Promise.reject() : Promise.resolve();
    }) : doSubmit(); // no async validation, so submit
  }
  submitFailed();

  if (onSubmitFail) {
    onSubmitFail(syncErrors);
  }

  if (returnRejectedSubmitPromise) {
    return Promise.reject(syncErrors);
  }
};

exports.default = handleSubmit;
},{"./isValid":65,"is-promise":30}],62:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.untouchWithKey = exports.untouch = exports.touchWithKey = exports.touch = exports.swapArrayValues = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.propTypes = exports.initializeWithKey = exports.initialize = exports.getValues = exports.removeArrayValue = exports.reduxForm = exports.reducer = exports.focus = exports.destroy = exports.changeWithKey = exports.change = exports.blur = exports.autofillWithKey = exports.autofill = exports.addArrayValue = exports.actionTypes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _createAll2 = require('./createAll');

var _createAll3 = _interopRequireDefault(_createAll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

var _createAll = (0, _createAll3.default)(isNative, _react2.default, _reactRedux.connect);

var actionTypes = _createAll.actionTypes;
var addArrayValue = _createAll.addArrayValue;
var autofill = _createAll.autofill;
var autofillWithKey = _createAll.autofillWithKey;
var blur = _createAll.blur;
var change = _createAll.change;
var changeWithKey = _createAll.changeWithKey;
var destroy = _createAll.destroy;
var focus = _createAll.focus;
var reducer = _createAll.reducer;
var reduxForm = _createAll.reduxForm;
var removeArrayValue = _createAll.removeArrayValue;
var getValues = _createAll.getValues;
var initialize = _createAll.initialize;
var initializeWithKey = _createAll.initializeWithKey;
var propTypes = _createAll.propTypes;
var reset = _createAll.reset;
var startAsyncValidation = _createAll.startAsyncValidation;
var startSubmit = _createAll.startSubmit;
var stopAsyncValidation = _createAll.stopAsyncValidation;
var stopSubmit = _createAll.stopSubmit;
var swapArrayValues = _createAll.swapArrayValues;
var touch = _createAll.touch;
var touchWithKey = _createAll.touchWithKey;
var untouch = _createAll.untouch;
var untouchWithKey = _createAll.untouchWithKey;
exports.actionTypes = actionTypes;
exports.addArrayValue = addArrayValue;
exports.autofill = autofill;
exports.autofillWithKey = autofillWithKey;
exports.blur = blur;
exports.change = change;
exports.changeWithKey = changeWithKey;
exports.destroy = destroy;
exports.focus = focus;
exports.reducer = reducer;
exports.reduxForm = reduxForm;
exports.removeArrayValue = removeArrayValue;
exports.getValues = getValues;
exports.initialize = initialize;
exports.initializeWithKey = initializeWithKey;
exports.propTypes = propTypes;
exports.reset = reset;
exports.startAsyncValidation = startAsyncValidation;
exports.startSubmit = startSubmit;
exports.stopAsyncValidation = stopAsyncValidation;
exports.stopSubmit = stopSubmit;
exports.swapArrayValues = swapArrayValues;
exports.touch = touch;
exports.touchWithKey = touchWithKey;
exports.untouch = untouch;
exports.untouchWithKey = untouchWithKey;
},{"./createAll":43,"react":"react","react-redux":"react-redux"}],63:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fieldValue = require('./fieldValue');

var makeEntry = function makeEntry(value, previousValue, overwriteValues) {
  return (0, _fieldValue.makeFieldValue)(value === undefined ? {} : {
    initial: value,
    value: overwriteValues ? value : previousValue
  });
};

/**
 * Sets the initial values into the state and returns a new copy of the state
 */
var initializeState = function initializeState(values, fields) {
  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var overwriteValues = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  if (!fields) {
    throw new Error('fields must be passed when initializing state');
  }
  if (!values || !fields.length) {
    return state;
  }
  var initializeField = function initializeField(path, src, dest) {
    var dotIndex = path.indexOf('.');
    if (dotIndex === 0) {
      return initializeField(path.substring(1), src, dest);
    }
    var openIndex = path.indexOf('[');
    var closeIndex = path.indexOf(']');
    var result = _extends({}, dest) || {};
    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
      // is dot notation
      var key = path.substring(0, dotIndex);
      result[key] = src[key] && initializeField(path.substring(dotIndex + 1), src[key], result[key] || {});
    } else if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
      (function () {
        // is array notation
        if (closeIndex < 0) {
          throw new Error('found \'[\' but no \']\': \'' + path + '\'');
        }
        var key = path.substring(0, openIndex);
        var srcArray = src[key];
        var destArray = result[key];
        var rest = path.substring(closeIndex + 1);
        if (Array.isArray(srcArray)) {
          if (rest.length) {
            // need to keep recursing
            result[key] = srcArray.map(function (srcValue, srcIndex) {
              return initializeField(rest, srcValue, destArray && destArray[srcIndex]);
            });
          } else {
            result[key] = srcArray.map(function (srcValue, srcIndex) {
              return makeEntry(srcValue, destArray && destArray[srcIndex] && destArray[srcIndex].value, overwriteValues);
            });
          }
        } else {
          result[key] = [];
        }
      })();
    } else {
      result[path] = makeEntry(src && src[path], dest && dest[path] && dest[path].value, overwriteValues);
    }
    return result;
  };
  return fields.reduce(function (accumulator, field) {
    return initializeField(field, values, accumulator);
  }, _extends({}, state));
};

exports.default = initializeState;
},{"./fieldValue":57}],64:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = isPristine;
function isPristine(initial, data) {
  if (initial === data) {
    return true;
  }
  if (typeof initial === 'boolean' || typeof data === 'boolean') {
    return initial === data;
  } else if (initial instanceof Date && data instanceof Date) {
    return initial.getTime() === data.getTime();
  } else if (initial && typeof initial === 'object') {
    if (!data || typeof data !== 'object') {
      return false;
    }
    var initialKeys = Object.keys(initial);
    var dataKeys = Object.keys(data);
    if (initialKeys.length !== dataKeys.length) {
      return false;
    }
    for (var index = 0; index < dataKeys.length; index++) {
      var key = dataKeys[index];
      if (!isPristine(initial[key], data[key])) {
        return false;
      }
    }
  } else if (initial || data) {
    // allow '' to equate to undefined or null
    return initial === data;
  }
  return true;
}
},{}],65:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = isValid;
function isValid(error) {
  if (Array.isArray(error)) {
    return error.reduce(function (valid, errorValue) {
      return valid && isValid(errorValue);
    }, true);
  }
  if (error && typeof error === 'object') {
    return Object.keys(error).reduce(function (valid, key) {
      return valid && isValid(error[key]);
    }, true);
  }
  return !error;
}
},{}],66:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = mapValues;
/**
 * Maps all the values in the given object through the given function and saves them, by key, to a result object
 */
function mapValues(obj, fn) {
  return obj ? Object.keys(obj).reduce(function (accumulator, key) {
    var _extends2;

    return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = fn(obj[key], key), _extends2));
  }, {}) : obj;
}
},{}],67:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = normalizeFields;

var _fieldValue = require('./fieldValue');

function extractKey(field) {
  var dotIndex = field.indexOf('.');
  var openIndex = field.indexOf('[');
  var closeIndex = field.indexOf(']');

  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }

  var isArray = openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex);
  var key = void 0;
  var nestedPath = void 0;

  if (isArray) {
    key = field.substring(0, openIndex);
    nestedPath = field.substring(closeIndex + 1);

    if (nestedPath[0] === '.') {
      nestedPath = nestedPath.substring(1);
    }
  } else if (dotIndex > 0) {
    key = field.substring(0, dotIndex);
    nestedPath = field.substring(dotIndex + 1);
  } else {
    key = field;
  }

  return { isArray: isArray, key: key, nestedPath: nestedPath };
}

function normalizeField(field, fullFieldPath, state, previousState, values, previousValues, normalizers) {
  if (field.isArray) {
    if (field.nestedPath) {
      var _ret = function () {
        var array = state && state[field.key] || [];
        var previousArray = previousState && previousState[field.key] || [];
        var nestedField = extractKey(field.nestedPath);

        return {
          v: array.map(function (nestedState, i) {
            nestedState[nestedField.key] = normalizeField(nestedField, fullFieldPath, nestedState, previousArray[i], values, previousValues, normalizers);

            return nestedState;
          })
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    }

    var _normalizer = normalizers[fullFieldPath];

    var result = _normalizer(state && state[field.key], previousState && previousState[field.key], values, previousValues);
    return field.isArray ? result && result.map(_fieldValue.makeFieldValue) : result;
  } else if (field.nestedPath) {
    var nestedState = state && state[field.key] || {};
    var _nestedField = extractKey(field.nestedPath);

    nestedState[_nestedField.key] = normalizeField(_nestedField, fullFieldPath, nestedState, previousState && previousState[field.key], values, previousValues, normalizers);

    return nestedState;
  }

  var finalField = state && state[field.key] || {};
  var normalizer = normalizers[fullFieldPath];

  finalField.value = normalizer(finalField.value, previousState && previousState[field.key] && previousState[field.key].value, values, previousValues);

  return (0, _fieldValue.makeFieldValue)(finalField);
}

function normalizeFields(normalizers, state, previousState, values, previousValues) {
  var newState = Object.keys(normalizers).reduce(function (accumulator, field) {
    var extracted = extractKey(field);

    accumulator[extracted.key] = normalizeField(extracted, field, state, previousState, values, previousValues, normalizers);

    return accumulator;
  }, {});

  return _extends({}, state, newState);
}
},{"./fieldValue":57}],68:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * Reads any potentially deep value from an object using dot and array syntax
 */
var read = function read(path, object) {
  if (!path || !object) {
    return object;
  }
  var dotIndex = path.indexOf('.');
  if (dotIndex === 0) {
    return read(path.substring(1), object);
  }
  var openIndex = path.indexOf('[');
  var closeIndex = path.indexOf(']');
  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
    // iterate down object tree
    return read(path.substring(dotIndex + 1), object[path.substring(0, dotIndex)]);
  }
  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    if (closeIndex < 0) {
      throw new Error('found [ but no ]');
    }
    var key = path.substring(0, openIndex);
    var index = path.substring(openIndex + 1, closeIndex);
    if (!index.length) {
      return object[key];
    }
    if (openIndex === 0) {
      return read(path.substring(closeIndex + 1), object[index]);
    }
    if (!object[key]) {
      return undefined;
    }
    return read(path.substring(closeIndex + 1), object[key][index]);
  }
  return object[path];
};

exports.default = read;
},{}],69:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createOnBlur = require('./events/createOnBlur');

var _createOnBlur2 = _interopRequireDefault(_createOnBlur);

var _createOnChange = require('./events/createOnChange');

var _createOnChange2 = _interopRequireDefault(_createOnChange);

var _createOnDragStart = require('./events/createOnDragStart');

var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);

var _createOnDrop = require('./events/createOnDrop');

var _createOnDrop2 = _interopRequireDefault(_createOnDrop);

var _createOnFocus = require('./events/createOnFocus');

var _createOnFocus2 = _interopRequireDefault(_createOnFocus);

var _silencePromise = require('./silencePromise');

var _silencePromise2 = _interopRequireDefault(_silencePromise);

var _read = require('./read');

var _read2 = _interopRequireDefault(_read);

var _updateField = require('./updateField');

var _updateField2 = _interopRequireDefault(_updateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSuffix(input, closeIndex) {
  var suffix = input.substring(closeIndex + 1);
  if (suffix[0] === '.') {
    suffix = suffix.substring(1);
  }
  return suffix;
}

var getNextKey = function getNextKey(path) {
  var dotIndex = path.indexOf('.');
  var openIndex = path.indexOf('[');
  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    return path.substring(0, openIndex);
  }
  return dotIndex > 0 ? path.substring(0, dotIndex) : path;
};

var shouldAsyncValidate = function shouldAsyncValidate(name, asyncBlurFields) {
  return(
    // remove array indices
    ~asyncBlurFields.indexOf(name.replace(/\[[0-9]+\]/g, '[]'))
  );
};

var readField = function readField(state, fieldName) {
  var pathToHere = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
  var fields = arguments[3];
  var syncErrors = arguments[4];
  var asyncValidate = arguments[5];
  var isReactNative = arguments[6];
  var props = arguments[7];
  var callback = arguments.length <= 8 || arguments[8] === undefined ? function () {
    return null;
  } : arguments[8];
  var prefix = arguments.length <= 9 || arguments[9] === undefined ? '' : arguments[9];
  var asyncBlurFields = props.asyncBlurFields;
  var autofill = props.autofill;
  var blur = props.blur;
  var change = props.change;
  var focus = props.focus;
  var form = props.form;
  var initialValues = props.initialValues;
  var readonly = props.readonly;
  var addArrayValue = props.addArrayValue;
  var removeArrayValue = props.removeArrayValue;
  var swapArrayValues = props.swapArrayValues;

  var dotIndex = fieldName.indexOf('.');
  var openIndex = fieldName.indexOf('[');
  var closeIndex = fieldName.indexOf(']');
  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }

  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    var _ret = function () {
      // array field
      var key = fieldName.substring(0, openIndex);
      var rest = getSuffix(fieldName, closeIndex);
      var stateArray = state && state[key] || [];
      var fullPrefix = prefix + fieldName.substring(0, closeIndex + 1);
      var subfields = props.fields.reduce(function (accumulator, field) {
        if (field.indexOf(fullPrefix) === 0) {
          accumulator.push(field);
        }
        return accumulator;
      }, []).map(function (field) {
        return getSuffix(field, prefix.length + closeIndex);
      });
      var addMethods = function addMethods(dest) {
        Object.defineProperty(dest, 'addField', {
          value: function value(_value, index) {
            return addArrayValue(pathToHere + key, _value, index, subfields);
          }
        });
        Object.defineProperty(dest, 'removeField', {
          value: function value(index) {
            return removeArrayValue(pathToHere + key, index);
          }
        });
        Object.defineProperty(dest, 'swapFields', {
          value: function value(indexA, indexB) {
            return swapArrayValues(pathToHere + key, indexA, indexB);
          }
        });
        return dest;
      };
      if (!fields[key] || fields[key].length !== stateArray.length) {
        fields[key] = fields[key] ? [].concat(fields[key]) : [];
        addMethods(fields[key]);
      }
      var fieldArray = fields[key];
      var changed = false;
      stateArray.forEach(function (fieldState, index) {
        if (rest && !fieldArray[index]) {
          fieldArray[index] = {};
          changed = true;
        }
        var dest = rest ? fieldArray[index] : {};
        var nextPath = '' + pathToHere + key + '[' + index + ']' + (rest ? '.' : '');
        var nextPrefix = '' + prefix + key + '[]' + (rest ? '.' : '');

        var result = readField(fieldState, rest, nextPath, dest, syncErrors, asyncValidate, isReactNative, props, callback, nextPrefix);
        if (!rest && fieldArray[index] !== result) {
          // if nothing after [] in field name, assign directly to array
          fieldArray[index] = result;
          changed = true;
        }
      });
      if (fieldArray.length > stateArray.length) {
        // remove extra items that aren't in state array
        fieldArray.splice(stateArray.length, fieldArray.length - stateArray.length);
      }
      return {
        v: changed ? addMethods([].concat(fieldArray)) : fieldArray
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
  if (dotIndex > 0) {
    // subobject field
    var _key = fieldName.substring(0, dotIndex);
    var _rest = fieldName.substring(dotIndex + 1);
    var subobject = fields[_key] || {};
    var nextPath = pathToHere + _key + '.';
    var nextKey = getNextKey(_rest);
    var previous = subobject[nextKey];
    var result = readField(state[_key] || {}, _rest, nextPath, subobject, syncErrors, asyncValidate, isReactNative, props, callback, nextPath);
    if (result !== previous) {
      var _extends2;

      subobject = _extends({}, subobject, (_extends2 = {}, _extends2[nextKey] = result, _extends2));
    }
    fields[_key] = subobject;
    return subobject;
  }
  var name = pathToHere + fieldName;
  var field = fields[fieldName] || {};
  if (field.name !== name) {
    var onChange = (0, _createOnChange2.default)(name, change, isReactNative);
    var initialFormValue = (0, _read2.default)(name + '.initial', form);
    var initialValue = initialFormValue || (0, _read2.default)(name, initialValues);
    initialValue = initialValue === undefined ? '' : initialValue;
    field.name = name;
    field.checked = initialValue === true || undefined;
    field.value = initialValue;
    field.initialValue = initialValue;
    if (!readonly) {
      field.autofill = function (value) {
        return autofill(name, value);
      };
      field.onBlur = (0, _createOnBlur2.default)(name, blur, isReactNative, shouldAsyncValidate(name, asyncBlurFields) && function (blurName, blurValue) {
        return (0, _silencePromise2.default)(asyncValidate(blurName, blurValue));
      });
      field.onChange = onChange;
      field.onDragStart = (0, _createOnDragStart2.default)(name, function () {
        return field.value;
      });
      field.onDrop = (0, _createOnDrop2.default)(name, change);
      field.onFocus = (0, _createOnFocus2.default)(name, focus);
      field.onUpdate = onChange; // alias to support belle. https://github.com/nikgraf/belle/issues/58
    }
    field.valid = true;
    field.invalid = false;
    Object.defineProperty(field, '_isField', { value: true });
  }

  var defaultFieldState = {
    initial: field.value,
    value: field.value
  };

  var fieldState = (fieldName ? state[fieldName] : state) || defaultFieldState;
  var syncError = (0, _read2.default)(name, syncErrors);
  var updated = (0, _updateField2.default)(field, fieldState, name === form._active, syncError);
  if (fieldName || fields[fieldName] !== updated) {
    fields[fieldName] = updated;
  }
  callback(updated);
  return updated;
};

exports.default = readField;
},{"./events/createOnBlur":48,"./events/createOnChange":49,"./events/createOnDragStart":50,"./events/createOnDrop":51,"./events/createOnFocus":52,"./read":68,"./silencePromise":75,"./updateField":76}],70:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _readField = require('./readField');

var _readField2 = _interopRequireDefault(_readField);

var _write = require('./write');

var _write2 = _interopRequireDefault(_write);

var _getValues = require('./getValues');

var _getValues2 = _interopRequireDefault(_getValues);

var _removeField = require('./removeField');

var _removeField2 = _interopRequireDefault(_removeField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reads props and generates (or updates) field structure
 */
var readFields = function readFields(props, previousProps, myFields, asyncValidate, isReactNative) {
  var fields = props.fields;
  var form = props.form;
  var validate = props.validate;

  var previousFields = previousProps.fields;
  var values = (0, _getValues2.default)(fields, form);
  var syncErrors = validate(values, props) || {};
  var errors = {};
  var formError = syncErrors._error || form._error;
  var allValid = !formError;
  var allPristine = true;
  var tally = function tally(field) {
    if (field.error) {
      errors = (0, _write2.default)(field.name, field.error, errors);
      allValid = false;
    }
    if (field.dirty) {
      allPristine = false;
    }
  };
  var fieldObjects = previousFields ? previousFields.reduce(function (accumulator, previousField) {
    return ~fields.indexOf(previousField) ? accumulator : (0, _removeField2.default)(accumulator, previousField);
  }, _extends({}, myFields)) : _extends({}, myFields);
  fields.forEach(function (name) {
    (0, _readField2.default)(form, name, undefined, fieldObjects, syncErrors, asyncValidate, isReactNative, props, tally);
  });
  Object.defineProperty(fieldObjects, '_meta', {
    value: {
      allPristine: allPristine,
      allValid: allValid,
      values: values,
      errors: errors,
      formError: formError
    }
  });
  return fieldObjects;
};
exports.default = readFields;
},{"./getValues":59,"./readField":69,"./removeField":72,"./write":79}],71:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.initialState = exports.globalErrorKey = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _initialState, _behaviors;

var _actionTypes = require('./actionTypes');

var _mapValues = require('./mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _read = require('./read');

var _read2 = _interopRequireDefault(_read);

var _write = require('./write');

var _write2 = _interopRequireDefault(_write);

var _getValuesFromState = require('./getValuesFromState');

var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

var _initializeState = require('./initializeState');

var _initializeState2 = _interopRequireDefault(_initializeState);

var _resetState = require('./resetState');

var _resetState2 = _interopRequireDefault(_resetState);

var _setErrors = require('./setErrors');

var _setErrors2 = _interopRequireDefault(_setErrors);

var _fieldValue = require('./fieldValue');

var _normalizeFields = require('./normalizeFields');

var _normalizeFields2 = _interopRequireDefault(_normalizeFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var globalErrorKey = exports.globalErrorKey = '_error';

var initialState = exports.initialState = (_initialState = {
  _active: undefined,
  _asyncValidating: false
}, _initialState[globalErrorKey] = undefined, _initialState._initialized = false, _initialState._submitting = false, _initialState._submitFailed = false, _initialState);

var behaviors = (_behaviors = {}, _behaviors[_actionTypes.ADD_ARRAY_VALUE] = function (state, _ref) {
  var path = _ref.path;
  var index = _ref.index;
  var value = _ref.value;
  var fields = _ref.fields;

  var array = (0, _read2.default)(path, state);
  var stateCopy = _extends({}, state);
  var arrayCopy = array ? [].concat(array) : [];
  var newValue = value !== null && typeof value === 'object' ? (0, _initializeState2.default)(value, fields || Object.keys(value)) : (0, _fieldValue.makeFieldValue)({ value: value });
  if (index === undefined) {
    arrayCopy.push(newValue);
  } else {
    arrayCopy.splice(index, 0, newValue);
  }
  return (0, _write2.default)(path, arrayCopy, stateCopy);
}, _behaviors[_actionTypes.AUTOFILL] = function (state, _ref2) {
  var field = _ref2.field;
  var value = _ref2.value;

  return (0, _write2.default)(field, function (previous) {
    var _previous$value$autof = _extends({}, previous, { value: value, autofilled: true });

    var asyncError = _previous$value$autof.asyncError;
    var submitError = _previous$value$autof.submitError;

    var result = _objectWithoutProperties(_previous$value$autof, ['asyncError', 'submitError']);

    return (0, _fieldValue.makeFieldValue)(result);
  }, state);
}, _behaviors[_actionTypes.BLUR] = function (state, _ref3) {
  var field = _ref3.field;
  var value = _ref3.value;
  var touch = _ref3.touch;
  var _active = state._active;

  var stateCopy = _objectWithoutProperties(state, ['_active']);

  if (_active && _active !== field) {
    // remove _active from state
    stateCopy._active = _active;
  }
  return (0, _write2.default)(field, function (previous) {
    var result = _extends({}, previous);
    if (value !== undefined) {
      result.value = value;
    }
    if (touch) {
      result.touched = true;
    }
    return (0, _fieldValue.makeFieldValue)(result);
  }, stateCopy);
}, _behaviors[_actionTypes.CHANGE] = function (state, _ref4) {
  var field = _ref4.field;
  var value = _ref4.value;
  var touch = _ref4.touch;

  return (0, _write2.default)(field, function (previous) {
    var _previous$value = _extends({}, previous, { value: value });

    var asyncError = _previous$value.asyncError;
    var submitError = _previous$value.submitError;
    var autofilled = _previous$value.autofilled;

    var result = _objectWithoutProperties(_previous$value, ['asyncError', 'submitError', 'autofilled']);

    if (touch) {
      result.touched = true;
    }
    return (0, _fieldValue.makeFieldValue)(result);
  }, state);
}, _behaviors[_actionTypes.DESTROY] = function () {
  return undefined;
}, _behaviors[_actionTypes.FOCUS] = function (state, _ref5) {
  var field = _ref5.field;

  var stateCopy = (0, _write2.default)(field, function (previous) {
    return (0, _fieldValue.makeFieldValue)(_extends({}, previous, { visited: true }));
  }, state);
  stateCopy._active = field;
  return stateCopy;
}, _behaviors[_actionTypes.INITIALIZE] = function (state, _ref6) {
  var _extends2;

  var data = _ref6.data;
  var fields = _ref6.fields;
  var overwriteValues = _ref6.overwriteValues;

  return _extends({}, (0, _initializeState2.default)(data, fields, state, overwriteValues), (_extends2 = {
    _asyncValidating: false,
    _active: undefined
  }, _extends2[globalErrorKey] = undefined, _extends2._initialized = true, _extends2._submitting = false, _extends2._submitFailed = false, _extends2));
}, _behaviors[_actionTypes.REMOVE_ARRAY_VALUE] = function (state, _ref7) {
  var path = _ref7.path;
  var index = _ref7.index;

  var array = (0, _read2.default)(path, state);
  var stateCopy = _extends({}, state);
  var arrayCopy = array ? [].concat(array) : [];
  if (index === undefined) {
    arrayCopy.pop();
  } else if (isNaN(index)) {
    delete arrayCopy[index];
  } else {
    arrayCopy.splice(index, 1);
  }
  return (0, _write2.default)(path, arrayCopy, stateCopy);
}, _behaviors[_actionTypes.RESET] = function (state) {
  var _extends3;

  return _extends({}, (0, _resetState2.default)(state), (_extends3 = {
    _active: undefined,
    _asyncValidating: false
  }, _extends3[globalErrorKey] = undefined, _extends3._initialized = state._initialized, _extends3._submitting = false, _extends3._submitFailed = false, _extends3));
}, _behaviors[_actionTypes.START_ASYNC_VALIDATION] = function (state, _ref8) {
  var field = _ref8.field;

  return _extends({}, state, {
    _asyncValidating: field || true
  });
}, _behaviors[_actionTypes.START_SUBMIT] = function (state) {
  return _extends({}, state, {
    _submitting: true
  });
}, _behaviors[_actionTypes.STOP_ASYNC_VALIDATION] = function (state, _ref9) {
  var _extends4;

  var errors = _ref9.errors;

  return _extends({}, (0, _setErrors2.default)(state, errors, 'asyncError'), (_extends4 = {
    _asyncValidating: false
  }, _extends4[globalErrorKey] = errors && errors[globalErrorKey], _extends4));
}, _behaviors[_actionTypes.STOP_SUBMIT] = function (state, _ref10) {
  var _extends5;

  var errors = _ref10.errors;

  return _extends({}, (0, _setErrors2.default)(state, errors, 'submitError'), (_extends5 = {}, _extends5[globalErrorKey] = errors && errors[globalErrorKey], _extends5._submitting = false, _extends5._submitFailed = !!(errors && Object.keys(errors).length), _extends5));
}, _behaviors[_actionTypes.SUBMIT_FAILED] = function (state) {
  return _extends({}, state, {
    _submitFailed: true
  });
}, _behaviors[_actionTypes.SWAP_ARRAY_VALUES] = function (state, _ref11) {
  var path = _ref11.path;
  var indexA = _ref11.indexA;
  var indexB = _ref11.indexB;

  var array = (0, _read2.default)(path, state);
  var arrayLength = array.length;
  if (indexA === indexB || isNaN(indexA) || isNaN(indexB) || indexA >= arrayLength || indexB >= arrayLength) {
    return state; // do nothing
  }
  var stateCopy = _extends({}, state);
  var arrayCopy = [].concat(array);
  arrayCopy[indexA] = array[indexB];
  arrayCopy[indexB] = array[indexA];
  return (0, _write2.default)(path, arrayCopy, stateCopy);
}, _behaviors[_actionTypes.TOUCH] = function (state, _ref12) {
  var fields = _ref12.fields;

  return _extends({}, state, fields.reduce(function (accumulator, field) {
    return (0, _write2.default)(field, function (value) {
      return (0, _fieldValue.makeFieldValue)(_extends({}, value, { touched: true }));
    }, accumulator);
  }, state));
}, _behaviors[_actionTypes.UNTOUCH] = function (state, _ref13) {
  var fields = _ref13.fields;

  return _extends({}, state, fields.reduce(function (accumulator, field) {
    return (0, _write2.default)(field, function (value) {
      if (value) {
        var touched = value.touched;

        var rest = _objectWithoutProperties(value, ['touched']);

        return (0, _fieldValue.makeFieldValue)(rest);
      }
      return (0, _fieldValue.makeFieldValue)(value);
    }, accumulator);
  }, state));
}, _behaviors);

var reducer = function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};

function formReducer() {
  var _extends11;

  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var form = action.form;
  var key = action.key;

  var rest = _objectWithoutProperties(action, ['form', 'key']); // eslint-disable-line no-redeclare


  if (!form) {
    return state;
  }
  if (key) {
    var _extends8, _extends9;

    if (action.type === _actionTypes.DESTROY) {
      var _extends7;

      return _extends({}, state, (_extends7 = {}, _extends7[form] = state[form] && Object.keys(state[form]).reduce(function (accumulator, stateKey) {
        var _extends6;

        return stateKey === key ? accumulator : _extends({}, accumulator, (_extends6 = {}, _extends6[stateKey] = state[form][stateKey], _extends6));
      }, {}), _extends7));
    }
    return _extends({}, state, (_extends9 = {}, _extends9[form] = _extends({}, state[form], (_extends8 = {}, _extends8[key] = reducer((state[form] || {})[key], rest), _extends8)), _extends9));
  }
  if (action.type === _actionTypes.DESTROY) {
    return Object.keys(state).reduce(function (accumulator, formName) {
      var _extends10;

      return formName === form ? accumulator : _extends({}, accumulator, (_extends10 = {}, _extends10[formName] = state[formName], _extends10));
    }, {});
  }
  return _extends({}, state, (_extends11 = {}, _extends11[form] = reducer(state[form], rest), _extends11));
}

/**
 * Adds additional functionality to the reducer
 */
function decorate(target) {
  target.plugin = function plugin(reducers) {
    var _this = this;

    // use 'function' keyword to enable 'this'
    return decorate(function () {
      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var result = _this(state, action);
      return _extends({}, result, (0, _mapValues2.default)(reducers, function (pluginReducer, key) {
        return pluginReducer(result[key] || initialState, action);
      }));
    });
  };

  target.normalize = function normalize(normalizers) {
    var _this2 = this;

    // use 'function' keyword to enable 'this'
    return decorate(function () {
      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var result = _this2(state, action);
      return _extends({}, result, (0, _mapValues2.default)(normalizers, function (formNormalizers, form) {
        var runNormalize = function runNormalize(previous, currentResult) {
          var previousValues = (0, _getValuesFromState2.default)(_extends({}, initialState, previous));
          var formResult = _extends({}, initialState, currentResult);
          var values = (0, _getValuesFromState2.default)(formResult);
          return (0, _normalizeFields2.default)(formNormalizers, formResult, previous, values, previousValues);
        };
        if (action.key) {
          var _extends12;

          return _extends({}, result[form], (_extends12 = {}, _extends12[action.key] = runNormalize(state[form][action.key], result[form][action.key]), _extends12));
        }
        return runNormalize(state[form], result[form]);
      }));
    });
  };

  return target;
}

exports.default = decorate(formReducer);
},{"./actionTypes":39,"./fieldValue":57,"./getValuesFromState":60,"./initializeState":63,"./mapValues":66,"./normalizeFields":67,"./read":68,"./resetState":73,"./setErrors":74,"./write":79}],72:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var without = function without(object, key) {
  var copy = _extends({}, object);
  delete copy[key];
  return copy;
};

var removeField = function removeField(fields, path) {
  var dotIndex = path.indexOf('.');
  var openIndex = path.indexOf('[');
  var closeIndex = path.indexOf(']');
  if (openIndex > 0 && closeIndex !== openIndex + 1) {
    throw new Error('found [ not followed by ]');
  }
  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    var _ret = function () {
      // array field
      var key = path.substring(0, openIndex);
      if (!Array.isArray(fields[key])) {
        return {
          v: without(fields, key)
        };
      }
      var rest = path.substring(closeIndex + 1);
      if (rest[0] === '.') {
        rest = rest.substring(1);
      }
      if (rest) {
        var _ret2 = function () {
          var _extends2;

          var copy = [];
          fields[key].forEach(function (item, index) {
            var result = removeField(item, rest);
            if (Object.keys(result).length) {
              copy[index] = result;
            }
          });
          return {
            v: {
              v: copy.length ? _extends({}, fields, (_extends2 = {}, _extends2[key] = copy, _extends2)) : without(fields, key)
            }
          };
        }();

        if (typeof _ret2 === "object") return _ret2.v;
      }
      return {
        v: without(fields, key)
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
  if (dotIndex > 0) {
    var _extends3;

    // subobject field
    var _key = path.substring(0, dotIndex);
    var _rest = path.substring(dotIndex + 1);
    if (!fields[_key]) {
      return fields;
    }
    var result = removeField(fields[_key], _rest);
    return Object.keys(result).length ? _extends({}, fields, (_extends3 = {}, _extends3[_key] = removeField(fields[_key], _rest), _extends3)) : without(fields, _key);
  }
  return without(fields, path);
};

exports.default = removeField;
},{}],73:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _fieldValue = require('./fieldValue');

var reset = function reset(value) {
  return (0, _fieldValue.makeFieldValue)(value === undefined || value && value.initial === undefined ? {} : { initial: value.initial, value: value.initial });
};

/**
 * Sets the initial values into the state and returns a new copy of the state
 */
var resetState = function resetState(values) {
  return values ? Object.keys(values).reduce(function (accumulator, key) {
    var value = values[key];
    if (Array.isArray(value)) {
      accumulator[key] = value.map(function (item) {
        return (0, _fieldValue.isFieldValue)(item) ? reset(item) : resetState(item);
      });
    } else if (value) {
      if ((0, _fieldValue.isFieldValue)(value)) {
        accumulator[key] = reset(value);
      } else if (typeof value === 'object' && value !== null) {
        accumulator[key] = resetState(value);
      } else {
        accumulator[key] = value;
      }
    }
    return accumulator;
  }, {}) : values;
};

exports.default = resetState;
},{"./fieldValue":57}],74:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fieldValue = require('./fieldValue');

var isMetaKey = function isMetaKey(key) {
  return key[0] === '_';
};

/**
 * Sets an error on a field deep in the tree, returning a new copy of the state
 */
var setErrors = function setErrors(state, errors, destKey) {
  var clear = function clear() {
    if (Array.isArray(state)) {
      return state.map(function (stateItem, index) {
        return setErrors(stateItem, errors && errors[index], destKey);
      });
    }
    if (state && typeof state === 'object') {
      var result = Object.keys(state).reduce(function (accumulator, key) {
        var _extends2;

        return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[key] = setErrors(state[key], errors && errors[key], destKey), _extends2));
      }, state);
      if ((0, _fieldValue.isFieldValue)(state)) {
        (0, _fieldValue.makeFieldValue)(result);
      }
      return result;
    }
    return (0, _fieldValue.makeFieldValue)(state);
  };
  if (typeof File !== 'undefined' && state instanceof File) {
    return state;
  }
  if (!errors) {
    if (!state) {
      return state;
    }
    if (state[destKey]) {
      var copy = _extends({}, state);
      delete copy[destKey];
      return (0, _fieldValue.makeFieldValue)(copy);
    }
    return clear();
  }
  if (typeof errors === 'string') {
    var _extends3;

    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends3 = {}, _extends3[destKey] = errors, _extends3)));
  }
  if (Array.isArray(errors)) {
    if (!state || Array.isArray(state)) {
      var _ret = function () {
        var copy = (state || []).map(function (stateItem, index) {
          return setErrors(stateItem, errors[index], destKey);
        });
        errors.forEach(function (errorItem, index) {
          return copy[index] = setErrors(copy[index], errorItem, destKey);
        });
        return {
          v: copy
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    }
    return setErrors(state, errors[0], destKey); // use first error
  }
  if ((0, _fieldValue.isFieldValue)(state)) {
    var _extends4;

    return (0, _fieldValue.makeFieldValue)(_extends({}, state, (_extends4 = {}, _extends4[destKey] = errors, _extends4)));
  }
  var errorKeys = Object.keys(errors);
  if (!errorKeys.length && !state) {
    return state;
  }
  return errorKeys.reduce(function (accumulator, key) {
    var _extends5;

    return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[key] = setErrors(state && state[key], errors[key], destKey), _extends5));
  }, clear() || {});
};

exports.default = setErrors;
},{"./fieldValue":57}],75:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {
  return undefined;
};

var silencePromise = function silencePromise(promise) {
  return (0, _isPromise2.default)(promise) ? promise.then(noop, noop) : promise;
};

exports.default = silencePromise;
},{"is-promise":30}],76:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isPristine = require('./isPristine');

var _isPristine2 = _interopRequireDefault(_isPristine);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Updates a field object from the store values
 */
var updateField = function updateField(field, formField, active, syncError) {
  var diff = {};
  var formFieldValue = formField.value === undefined ? '' : formField.value;

  // update field value
  if (field.value !== formFieldValue) {
    diff.value = formFieldValue;
    diff.checked = typeof formFieldValue === 'boolean' ? formFieldValue : undefined;
  }

  // update dirty/pristine
  var pristine = (0, _isPristine2.default)(formFieldValue, formField.initial);
  if (field.pristine !== pristine) {
    diff.dirty = !pristine;
    diff.pristine = pristine;
  }

  // update field error
  var error = syncError || formField.submitError || formField.asyncError;
  if (error !== field.error) {
    diff.error = error;
  }
  var valid = (0, _isValid2.default)(error);
  if (field.valid !== valid) {
    diff.invalid = !valid;
    diff.valid = valid;
  }

  if (active !== field.active) {
    diff.active = active;
  }
  var touched = !!formField.touched;
  if (touched !== field.touched) {
    diff.touched = touched;
  }
  var visited = !!formField.visited;
  if (visited !== field.visited) {
    diff.visited = visited;
  }
  var autofilled = !!formField.autofilled;
  if (autofilled !== field.autofilled) {
    diff.autofilled = autofilled;
  }

  if ('initial' in formField && formField.initial !== field.initialValue) {
    field.initialValue = formField.initial;
  }

  return Object.keys(diff).length ? _extends({}, field, diff) : field;
};
exports.default = updateField;
},{"./isPristine":64,"./isValid":65}],77:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var wrapMapDispatchToProps = function wrapMapDispatchToProps(mapDispatchToProps, actionCreators) {
  if (mapDispatchToProps) {
    if (typeof mapDispatchToProps === 'function') {
      if (mapDispatchToProps.length > 1) {
        return function (dispatch, ownProps) {
          return _extends({
            dispatch: dispatch
          }, mapDispatchToProps(dispatch, ownProps), (0, _redux.bindActionCreators)(actionCreators, dispatch));
        };
      }
      return function (dispatch) {
        return _extends({
          dispatch: dispatch
        }, mapDispatchToProps(dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
      };
    }
    return function (dispatch) {
      return _extends({
        dispatch: dispatch
      }, (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch), (0, _redux.bindActionCreators)(actionCreators, dispatch));
    };
  }
  return function (dispatch) {
    return _extends({
      dispatch: dispatch
    }, (0, _redux.bindActionCreators)(actionCreators, dispatch));
  };
};

exports.default = wrapMapDispatchToProps;
},{"redux":"redux"}],78:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var wrapMapStateToProps = function wrapMapStateToProps(mapStateToProps, getForm) {
  if (mapStateToProps) {
    if (typeof mapStateToProps !== 'function') {
      throw new Error('mapStateToProps must be a function');
    }
    if (mapStateToProps.length > 1) {
      return function (state, ownProps) {
        return _extends({}, mapStateToProps(state, ownProps), {
          form: getForm(state)
        });
      };
    }
    return function (state) {
      return _extends({}, mapStateToProps(state), {
        form: getForm(state)
      });
    };
  }
  return function (state) {
    return {
      form: getForm(state)
    };
  };
};

exports.default = wrapMapStateToProps;
},{}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Writes any potentially deep value from an object using dot and array syntax,
 * and returns a new copy of the object.
 */
var write = function write(path, value, object) {
  var _extends7;

  var dotIndex = path.indexOf('.');
  if (dotIndex === 0) {
    return write(path.substring(1), value, object);
  }
  var openIndex = path.indexOf('[');
  var closeIndex = path.indexOf(']');
  if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
    var _extends2;

    // is dot notation
    var key = path.substring(0, dotIndex);
    return _extends({}, object, (_extends2 = {}, _extends2[key] = write(path.substring(dotIndex + 1), value, object[key] || {}), _extends2));
  }
  if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
    var _ret = function () {
      var _extends6;

      // is array notation
      if (closeIndex < 0) {
        throw new Error('found [ but no ]');
      }
      var key = path.substring(0, openIndex);
      var index = path.substring(openIndex + 1, closeIndex);
      var array = object[key] || [];
      var rest = path.substring(closeIndex + 1);
      if (index) {
        var _extends4;

        // indexed array
        if (rest.length) {
          var _extends3;

          // need to keep recursing
          var dest = array[index] || {};
          var arrayCopy = [].concat(array);
          arrayCopy[index] = write(rest, value, dest);
          return {
            v: _extends({}, object || {}, (_extends3 = {}, _extends3[key] = arrayCopy, _extends3))
          };
        }
        var copy = [].concat(array);
        copy[index] = typeof value === 'function' ? value(copy[index]) : value;
        return {
          v: _extends({}, object || {}, (_extends4 = {}, _extends4[key] = copy, _extends4))
        };
      }
      // indexless array
      if (rest.length) {
        var _extends5;

        // need to keep recursing
        if ((!array || !array.length) && typeof value === 'function') {
          return {
            v: object
          }; // don't even set a value under [key]
        }
        var _arrayCopy = array.map(function (dest) {
          return write(rest, value, dest);
        });
        return {
          v: _extends({}, object || {}, (_extends5 = {}, _extends5[key] = _arrayCopy, _extends5))
        };
      }
      var result = void 0;
      if (Array.isArray(value)) {
        result = value;
      } else if (object[key]) {
        result = array.map(function (dest) {
          return typeof value === 'function' ? value(dest) : value;
        });
      } else if (typeof value === 'function') {
        return {
          v: object
        }; // don't even set a value under [key]
      } else {
          result = value;
        }
      return {
        v: _extends({}, object || {}, (_extends6 = {}, _extends6[key] = result, _extends6))
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
  return _extends({}, object, (_extends7 = {}, _extends7[path] = typeof value === 'function' ? value(object[path]) : value, _extends7));
};

exports.default = write;
},{}],80:[function(require,module,exports){
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
},{}],81:[function(require,module,exports){
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
},{"./actions":80,"./middleware":82,"./reducer":83,"./sync":84}],82:[function(require,module,exports){
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
},{"./actions":80}],83:[function(require,module,exports){
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
},{}],84:[function(require,module,exports){
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
},{"./reducer":83}]},{},[4]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5sb2dvdXQgPSBleHBvcnRzLnNpZ25JbiA9IGV4cG9ydHMubG9hZEF1dGggPSBleHBvcnRzLmlzTG9hZGVkID0gdW5kZWZpbmVkO1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgaXNMb2FkZWQgPSBleHBvcnRzLmlzTG9hZGVkID0gZnVuY3Rpb24gaXNMb2FkZWQoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLmF1dGggJiYgc3RhdGUuYXV0aC5sb2FkZWQ7XG59O1xuXG52YXIgbG9hZEF1dGggPSBleHBvcnRzLmxvYWRBdXRoID0gZnVuY3Rpb24gbG9hZEF1dGgoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZXM6IFtfY29uc3RhbnRzLkxPQURfQVVUSCwgX2NvbnN0YW50cy5MT0FEX0FVVEhfU1VDQ0VTUywgX2NvbnN0YW50cy5MT0FEX0FVVEhfRkFJTF0sXG4gICAgcHJvbWlzZTogZnVuY3Rpb24gcHJvbWlzZShjbGllbnQpIHtcbiAgICAgIHJldHVybiBjbGllbnQuZ2V0KCcvdXNlci9sb2FkYXV0aCcpO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBzaWduSW4gPSBleHBvcnRzLnNpZ25JbiA9IGZ1bmN0aW9uIHNpZ25JbihfcmVmKSB7XG4gIHZhciBlbWFpbCA9IF9yZWYuZW1haWw7XG4gIHZhciBwYXNzd29yZCA9IF9yZWYucGFzc3dvcmQ7XG4gIHJldHVybiB7XG4gICAgdHlwZXM6IFtfY29uc3RhbnRzLlNJR05JTiwgX2NvbnN0YW50cy5TSUdOSU5fU1VDQ0VTUywgX2NvbnN0YW50cy5TSUdOSU5fRkFJTF0sXG4gICAgcHJvbWlzZTogZnVuY3Rpb24gcHJvbWlzZShjbGllbnQpIHtcbiAgICAgIHJldHVybiBjbGllbnQucG9zdCgnL3VzZXIvYXV0aGVudGljYXRlJywge1xuICAgICAgICBkYXRhOiB7IGVtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG5cbnZhciBsb2dvdXQgPSBleHBvcnRzLmxvZ291dCA9IGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW19jb25zdGFudHMuTE9HT1VULCBfY29uc3RhbnRzLkxPR09VVF9TVUNDRVNTLCBfY29uc3RhbnRzLkxPR09VVF9GQUlMXSxcbiAgICBwcm9taXNlOiBmdW5jdGlvbiBwcm9taXNlKGNsaWVudCkge1xuICAgICAgcmV0dXJuIGNsaWVudC5nZXQoJy91c2VyL2xvZ291dCcpO1xuICAgIH1cbiAgfTtcbn07XG5cbn0se1wiLi4vY29uc3RhbnRzXCI6MTZ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucG9zdHMgPSBleHBvcnRzLmF1dGggPSB1bmRlZmluZWQ7XG5cbnZhciBfYXV0aDIgPSByZXF1aXJlKCcuL2F1dGgnKTtcblxudmFyIF9hdXRoID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2F1dGgyKTtcblxudmFyIF9wb3N0czIgPSByZXF1aXJlKCcuL3Bvc3RzJyk7XG5cbnZhciBfcG9zdHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfcG9zdHMyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZXhwb3J0cy5hdXRoID0gX2F1dGg7XG5leHBvcnRzLnBvc3RzID0gX3Bvc3RzO1xuXG59LHtcIi4vYXV0aFwiOjEsXCIuL3Bvc3RzXCI6M31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5sb2FkUG9zdHMgPSB1bmRlZmluZWQ7XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBsb2FkUG9zdHMgPSBleHBvcnRzLmxvYWRQb3N0cyA9IGZ1bmN0aW9uIGxvYWRQb3N0cygpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW19jb25zdGFudHMuTE9BRF9QT1NUUywgX2NvbnN0YW50cy5MT0FEX1BPU1RTX1NVQ0NFU1MsIF9jb25zdGFudHMuTE9BRF9QT1NUU19GQUlMXSxcbiAgICBwcm9taXNlOiBmdW5jdGlvbiBwcm9taXNlKGNsaWVudCkge1xuICAgICAgcmV0dXJuIGNsaWVudC5nZXQoJy9wb3N0cycpO1xuICAgIH1cbiAgfTtcbn07XG5cbn0se1wiLi4vY29uc3RhbnRzXCI6MTZ9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3RSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxudmFyIF9yZWFjdFJvdXRlclNjcm9sbCA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1zY3JvbGwnKTtcblxudmFyIF9yZWFjdFJvdXRlclNjcm9sbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdFJvdXRlclNjcm9sbCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RSb3V0ZXJSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1yZWR1eCcpO1xuXG52YXIgX3JvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5cbnZhciBfcm91dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcik7XG5cbnZhciBfc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG5cbnZhciBfc3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RvcmUpO1xuXG52YXIgX0FwaUNsaWVudCA9IHJlcXVpcmUoJy4vaGVscGVycy9BcGlDbGllbnQnKTtcblxudmFyIF9BcGlDbGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXBpQ2xpZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGluaXRpYWxTdGF0ZSA9IHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXztcblxudmFyIGNsaWVudCA9IG5ldyBfQXBpQ2xpZW50Mi5kZWZhdWx0KCk7XG52YXIgc3RvcmUgPSAoMCwgX3N0b3JlMi5kZWZhdWx0KShjbGllbnQsIF9yZWFjdFJvdXRlci5icm93c2VySGlzdG9yeSwgaW5pdGlhbFN0YXRlKTtcblxudmFyIGhpc3RvcnkgPSAoMCwgX3JlYWN0Um91dGVyUmVkdXguc3luY0hpc3RvcnlXaXRoU3RvcmUpKF9yZWFjdFJvdXRlci5icm93c2VySGlzdG9yeSwgc3RvcmUpO1xuXG4oMCwgX3JlYWN0RG9tLnJlbmRlcikoX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gIF9yZWFjdFJlZHV4LlByb3ZpZGVyLFxuICB7IHN0b3JlOiBzdG9yZSB9LFxuICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RSb3V0ZXIuUm91dGVyLCB7XG4gICAgY2hpbGRyZW46ICgwLCBfcm91dGVyMi5kZWZhdWx0KShzdG9yZSksXG4gICAgaGlzdG9yeTogaGlzdG9yeSxcbiAgICByZW5kZXI6ICgwLCBfcmVhY3RSb3V0ZXIuYXBwbHlSb3V0ZXJNaWRkbGV3YXJlKSgoMCwgX3JlYWN0Um91dGVyU2Nyb2xsMi5kZWZhdWx0KSgpKVxuICB9KVxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0LXZpZXcnKSk7XG5cbn0se1wiLi9oZWxwZXJzL0FwaUNsaWVudFwiOjE3LFwiLi9yb3V0ZXJcIjoyNCxcIi4vc3RvcmVcIjoyNSxcInJlYWN0XCI6XCJyZWFjdFwiLFwicmVhY3QtZG9tXCI6XCJyZWFjdC1kb21cIixcInJlYWN0LXJlZHV4XCI6XCJyZWFjdC1yZWR1eFwiLFwicmVhY3Qtcm91dGVyXCI6XCJyZWFjdC1yb3V0ZXJcIixcInJlYWN0LXJvdXRlci1yZWR1eFwiOjgxLFwicmVhY3Qtcm91dGVyLXNjcm9sbFwiOlwicmVhY3Qtcm91dGVyLXNjcm9sbFwifV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWR1eCA9IHJlcXVpcmUoJ3JlZHV4Jyk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RIZWxtZXQgPSByZXF1aXJlKCdyZWFjdC1oZWxtZXQnKTtcblxudmFyIF9yZWFjdEhlbG1ldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEhlbG1ldCk7XG5cbnZhciBfY29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJyk7XG5cbnZhciBfY29uZmlnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7XG5cbnZhciBfYWN0aW9ucyA9IHJlcXVpcmUoJy4uLy4uL2FjdGlvbnMnKTtcblxudmFyIF8gPSByZXF1aXJlKCcuLi8nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEFwcFZpZXcgPSBmdW5jdGlvbiBBcHBWaWV3KF9yZWYpIHtcbiAgdmFyIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIHsgaWQ6ICdhcHAtdmlldycsIGNsYXNzTmFtZTogJ2FwcC12aWV3JyB9LFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdEhlbG1ldDIuZGVmYXVsdCwgX2NvbmZpZzIuZGVmYXVsdC5oZWFkKSxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfLk5hdiwgbnVsbCksXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnZGl2JyxcbiAgICAgIHsgY2xhc3NOYW1lOiAnY29udGFpbmVyJyB9LFxuICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdzZWN0aW9uJyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICksXG4gICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfLkZvb3RlciwgbnVsbClcbiAgICApXG4gICk7XG59O1xuXG5BcHBWaWV3LnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMubm9kZVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlKTtcbn0sIGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICByZXR1cm4gKDAsIF9yZWR1eC5iaW5kQWN0aW9uQ3JlYXRvcnMpKF9leHRlbmRzKHt9LCBfYWN0aW9ucy5hdXRoKSwgZGlzcGF0Y2gpO1xufSkoQXBwVmlldyk7XG5cbn0se1wiLi4vXCI6OSxcIi4uLy4uL2FjdGlvbnNcIjoyLFwiLi4vLi4vY29uZmlnXCI6MTUsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWhlbG1ldFwiOlwicmVhY3QtaGVsbWV0XCIsXCJyZWFjdC1yZWR1eFwiOlwicmVhY3QtcmVkdXhcIixcInJlZHV4XCI6XCJyZWR1eFwifV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEZvb3RlciA9IGZ1bmN0aW9uIEZvb3RlcigpIHtcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdmb290ZXInLFxuICAgIG51bGwsXG4gICAgJ3RoaXMgaXMgYSBmb290ZXInXG4gICk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb290ZXI7XG5cbn0se1wicmVhY3RcIjpcInJlYWN0XCJ9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX3JlZHV4ID0gcmVxdWlyZSgncmVkdXgnKTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBOYXYgPSBmdW5jdGlvbiBOYXYoX3JlZikge1xuICB2YXIgYXV0aCA9IF9yZWYuYXV0aDtcbiAgdmFyIGxvZ291dCA9IF9yZWYubG9nb3V0O1xuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ25hdicsXG4gICAgbnVsbCxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICd1bCcsXG4gICAgICBudWxsLFxuICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdsaScsXG4gICAgICAgIG51bGwsXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIF9yZWFjdFJvdXRlci5JbmRleExpbmssXG4gICAgICAgICAgeyB0bzogJy8nIH0sXG4gICAgICAgICAgJ2hvbWUnXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2xpJyxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgX3JlYWN0Um91dGVyLkluZGV4TGluayxcbiAgICAgICAgICB7IHRvOiAnL2Fib3V0JyB9LFxuICAgICAgICAgICdhYm91dCdcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnbGknLFxuICAgICAgICBudWxsLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBfcmVhY3RSb3V0ZXIuSW5kZXhMaW5rLFxuICAgICAgICAgIHsgdG86ICcvY29udGFjdCcgfSxcbiAgICAgICAgICAnY29udGFjdCdcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGF1dGgudXNlciA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnbGknLFxuICAgICAgICBudWxsLFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBfcmVhY3RSb3V0ZXIuTGluayxcbiAgICAgICAgICB7IHRvOiAnL2FkbWluJyB9LFxuICAgICAgICAgICdhZG1pbidcbiAgICAgICAgKVxuICAgICAgKSA6ICcnLFxuICAgICAgJyAnLFxuICAgICAgYXV0aC51c2VyID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdsaScsXG4gICAgICAgIG51bGwsXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIF9yZWFjdFJvdXRlci5MaW5rLFxuICAgICAgICAgIHsgdG86ICcvJywgb25DbGljazogbG9nb3V0IH0sXG4gICAgICAgICAgJ2xvZ291dCdcbiAgICAgICAgKVxuICAgICAgKSA6ICcnXG4gICAgKVxuICApO1xufTtcblxuTmF2LnByb3BUeXBlcyA9IHtcbiAgYXV0aDogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIGxvZ291dDogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkoZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xufSwgZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gIHJldHVybiAoMCwgX3JlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycykoX2V4dGVuZHMoe30sIF9hY3Rpb25zLmF1dGgpLCBkaXNwYXRjaCk7XG59KShOYXYpO1xuXG59LHtcIi4uLy4uL2FjdGlvbnNcIjoyLFwicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1yZWR1eFwiOlwicmVhY3QtcmVkdXhcIixcInJlYWN0LXJvdXRlclwiOlwicmVhY3Qtcm91dGVyXCIsXCJyZWR1eFwiOlwicmVkdXhcIn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX3JlYWN0Um91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfbHJ1TWVtb2l6ZSA9IHJlcXVpcmUoJ2xydS1tZW1vaXplJyk7XG5cbnZhciBfbHJ1TWVtb2l6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9scnVNZW1vaXplKTtcblxudmFyIF9mb3JtRmFjdG9yeSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvZm9ybUZhY3RvcnknKTtcblxudmFyIF9mb3JtRmFjdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mb3JtRmFjdG9yeSk7XG5cbnZhciBfdmFsaWRhdGlvbiA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvdmFsaWRhdGlvbicpO1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9hY3Rpb25zJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2YWxpZGF0aW9uID0gKDAsIF92YWxpZGF0aW9uLmNyZWF0ZVZhbGlkYXRvcikoe1xuICBlbWFpbDogW192YWxpZGF0aW9uLnJlcXVpcmVkLCBfdmFsaWRhdGlvbi5lbWFpbF0sXG4gIHBhc3N3b3JkOiBfdmFsaWRhdGlvbi5yZXF1aXJlZFxufSk7XG5cbnZhciBGb3JtID0gKDAsIF9mb3JtRmFjdG9yeTIuZGVmYXVsdCkoe1xuICB2YWxpZGF0ZTogKDAsIF9scnVNZW1vaXplMi5kZWZhdWx0KSgxMCkodmFsaWRhdGlvbiksXG4gIHN0eWxlQ2xhc3M6ICdzaWduaW4tZm9ybScsXG4gIGZvcm1OYW1lOiAnc2lnbmluJyxcbiAgaW5wdXRGaWVsZHM6IFt7XG4gICAgbmFtZTogJ2VtYWlsJyxcbiAgICB0eXBlOiAnZW1haWwnLFxuICAgIGxhYmVsOiAnZW1haWwnXG4gIH0sIHtcbiAgICBuYW1lOiAncGFzc3dvcmQnLFxuICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgbGFiZWw6ICdwYXNzd29yZCdcbiAgfV0sXG4gIHN1Ym1pdFRleHQ6ICdTaWduIEluJ1xufSk7XG5cbnZhciBTaWduSW5Gb3JtID0gZnVuY3Rpb24gU2lnbkluRm9ybShfcmVmKSB7XG4gIHZhciBhdXRoID0gX3JlZi5hdXRoO1xuICB2YXIgc2lnbkluID0gX3JlZi5zaWduSW47XG4gIHZhciBsb2dvdXQgPSBfcmVmLmxvZ291dDtcbiAgdmFyIGxvYWRBdXRoID0gX3JlZi5sb2FkQXV0aDtcblxuICBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZGF0YSkge1xuICAgIHZhciBzdWJtaXRDaGFpbiA9IGZ1bmN0aW9uIHN1Ym1pdENoYWluKCkge1xuICAgICAgcmV0dXJuIHNpZ25JbihkYXRhKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgX3JlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5LnB1c2goJy9hZG1pbicpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBfcmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3RvcnkucHVzaCgnL2FkbWluJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9KS50aGVuKGxvYWRBdXRoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGF1dGgudXNlciA/IGxvZ291dCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN1Ym1pdENoYWluKCk7XG4gICAgfSkgOiBzdWJtaXRDaGFpbigpO1xuICB9XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEZvcm0sIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCB9KTtcbn07XG5cblNpZ25JbkZvcm0ucHJvcFR5cGVzID0ge1xuICBhdXRoOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgc2lnbkluOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIGxvZ291dDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBsb2FkQXV0aDogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSAoMCwgX3JlYWN0UmVkdXguY29ubmVjdCkoZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xufSwgZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gIHJldHVybiAoMCwgX3JlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycykoX2V4dGVuZHMoe30sIF9hY3Rpb25zLmF1dGgpLCBkaXNwYXRjaCk7XG59KShTaWduSW5Gb3JtKTtcblxufSx7XCIuLi8uLi9hY3Rpb25zXCI6MixcIi4uLy4uL2hlbHBlcnMvZm9ybUZhY3RvcnlcIjoxOCxcIi4uLy4uL2hlbHBlcnMvdmFsaWRhdGlvblwiOjE5LFwibHJ1LW1lbW9pemVcIjozMixcInJlYWN0XCI6XCJyZWFjdFwiLFwicmVhY3QtcmVkdXhcIjpcInJlYWN0LXJlZHV4XCIsXCJyZWFjdC1yb3V0ZXJcIjpcInJlYWN0LXJvdXRlclwiLFwicmVkdXhcIjpcInJlZHV4XCJ9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQWRtaW4gPSBleHBvcnRzLlNpZ25JbiA9IGV4cG9ydHMuQ29udGFjdCA9IGV4cG9ydHMuQWJvdXQgPSBleHBvcnRzLkhvbWUgPSBleHBvcnRzLlNpZ25JbkZvcm0gPSBleHBvcnRzLkZvb3RlciA9IGV4cG9ydHMuTmF2ID0gZXhwb3J0cy5BcHBWaWV3ID0gdW5kZWZpbmVkO1xuXG52YXIgX0FwcFZpZXcyID0gcmVxdWlyZSgnLi9jb250YWluZXJzL0FwcFZpZXcnKTtcblxudmFyIF9BcHBWaWV3MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FwcFZpZXcyKTtcblxudmFyIF9OYXYyID0gcmVxdWlyZSgnLi9jb250YWluZXJzL05hdicpO1xuXG52YXIgX05hdjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9OYXYyKTtcblxudmFyIF9Gb290ZXIyID0gcmVxdWlyZSgnLi9jb250YWluZXJzL0Zvb3RlcicpO1xuXG52YXIgX0Zvb3RlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Gb290ZXIyKTtcblxudmFyIF9TaWduSW5Gb3JtMiA9IHJlcXVpcmUoJy4vY29udGFpbmVycy9TaWduSW5Gb3JtJyk7XG5cbnZhciBfU2lnbkluRm9ybTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaWduSW5Gb3JtMik7XG5cbnZhciBfSG9tZTIgPSByZXF1aXJlKCcuL3ByZXNlbnRhdGlvbmFsL0hvbWUnKTtcblxudmFyIF9Ib21lMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0hvbWUyKTtcblxudmFyIF9BYm91dDIgPSByZXF1aXJlKCcuL3ByZXNlbnRhdGlvbmFsL0Fib3V0Jyk7XG5cbnZhciBfQWJvdXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWJvdXQyKTtcblxudmFyIF9Db250YWN0MiA9IHJlcXVpcmUoJy4vcHJlc2VudGF0aW9uYWwvQ29udGFjdCcpO1xuXG52YXIgX0NvbnRhY3QzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udGFjdDIpO1xuXG52YXIgX1NpZ25JbjIgPSByZXF1aXJlKCcuL3ByZXNlbnRhdGlvbmFsL1NpZ25JbicpO1xuXG52YXIgX1NpZ25JbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TaWduSW4yKTtcblxudmFyIF9BZG1pbjIgPSByZXF1aXJlKCcuL3ByZXNlbnRhdGlvbmFsL0FkbWluJyk7XG5cbnZhciBfQWRtaW4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWRtaW4yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5BcHBWaWV3ID0gX0FwcFZpZXczLmRlZmF1bHQ7IC8vIENvbnRhaW5lcnNcblxuZXhwb3J0cy5OYXYgPSBfTmF2My5kZWZhdWx0O1xuZXhwb3J0cy5Gb290ZXIgPSBfRm9vdGVyMy5kZWZhdWx0O1xuZXhwb3J0cy5TaWduSW5Gb3JtID0gX1NpZ25JbkZvcm0zLmRlZmF1bHQ7XG5cbi8vIFByZXNlbnRhdGlvbmFsXG5cbmV4cG9ydHMuSG9tZSA9IF9Ib21lMy5kZWZhdWx0O1xuZXhwb3J0cy5BYm91dCA9IF9BYm91dDMuZGVmYXVsdDtcbmV4cG9ydHMuQ29udGFjdCA9IF9Db250YWN0My5kZWZhdWx0O1xuZXhwb3J0cy5TaWduSW4gPSBfU2lnbkluMy5kZWZhdWx0O1xuZXhwb3J0cy5BZG1pbiA9IF9BZG1pbjMuZGVmYXVsdDtcblxufSx7XCIuL2NvbnRhaW5lcnMvQXBwVmlld1wiOjUsXCIuL2NvbnRhaW5lcnMvRm9vdGVyXCI6NixcIi4vY29udGFpbmVycy9OYXZcIjo3LFwiLi9jb250YWluZXJzL1NpZ25JbkZvcm1cIjo4LFwiLi9wcmVzZW50YXRpb25hbC9BYm91dFwiOjEwLFwiLi9wcmVzZW50YXRpb25hbC9BZG1pblwiOjExLFwiLi9wcmVzZW50YXRpb25hbC9Db250YWN0XCI6MTIsXCIuL3ByZXNlbnRhdGlvbmFsL0hvbWVcIjoxMyxcIi4vcHJlc2VudGF0aW9uYWwvU2lnbkluXCI6MTR9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEhlbG1ldCA9IHJlcXVpcmUoJ3JlYWN0LWhlbG1ldCcpO1xuXG52YXIgX3JlYWN0SGVsbWV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SGVsbWV0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEFib3V0ID0gZnVuY3Rpb24gQWJvdXQoKSB7XG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBudWxsLFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdEhlbG1ldDIuZGVmYXVsdCwgeyB0aXRsZTogJ2Fib3V0JyB9KSxcbiAgICAnYWJvdXQnXG4gICk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBYm91dDtcblxufSx7XCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWhlbG1ldFwiOlwicmVhY3QtaGVsbWV0XCJ9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEhlbG1ldCA9IHJlcXVpcmUoJ3JlYWN0LWhlbG1ldCcpO1xuXG52YXIgX3JlYWN0SGVsbWV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SGVsbWV0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEFkbWluID0gZnVuY3Rpb24gQWRtaW4oKSB7XG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBudWxsLFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdEhlbG1ldDIuZGVmYXVsdCwgeyB0aXRsZTogJ2FkbWluJyB9KSxcbiAgICAnYWRtaW4nXG4gICk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBZG1pbjtcblxufSx7XCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWhlbG1ldFwiOlwicmVhY3QtaGVsbWV0XCJ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEhlbG1ldCA9IHJlcXVpcmUoJ3JlYWN0LWhlbG1ldCcpO1xuXG52YXIgX3JlYWN0SGVsbWV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SGVsbWV0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIENvbnRhY3QgPSBmdW5jdGlvbiBDb250YWN0KCkge1xuICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RIZWxtZXQyLmRlZmF1bHQsIHsgdGl0bGU6ICdjb250YWN0JyB9KSxcbiAgICAnY29udGFjdCdcbiAgKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbnRhY3Q7XG5cbn0se1wicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1oZWxtZXRcIjpcInJlYWN0LWhlbG1ldFwifV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJlZHV4Jyk7XG5cbnZhciBfcmVhY3RIZWxtZXQgPSByZXF1aXJlKCdyZWFjdC1oZWxtZXQnKTtcblxudmFyIF9yZWFjdEhlbG1ldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEhlbG1ldCk7XG5cbnZhciBfbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBfbW9tZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBIb21lID0gZnVuY3Rpb24gSG9tZShfcmVmKSB7XG4gIHZhciBwb3N0cyA9IF9yZWYucG9zdHMucG9zdHM7XG4gIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7IGNsYXNzTmFtZTogJ2hvbWUnIH0sXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0SGVsbWV0Mi5kZWZhdWx0LCB7IHRpdGxlOiAnaG9tZScgfSksXG4gICAgcG9zdHMubWFwKGZ1bmN0aW9uIChwb3N0LCBpbmRleCkge1xuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYXJ0aWNsZScsXG4gICAgICAgIHsga2V5OiBpbmRleCB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnc21hbGwnLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgKDAsIF9tb21lbnQyLmRlZmF1bHQpKHBvc3QuY3JlYXRlZEF0LCAnWVlZWU1NREQnKS5mcm9tTm93KClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2gyJyxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHBvc3QudGl0bGVcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2gzJyxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHBvc3Quc3VidGl0bGVcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KVxuICApO1xufTtcblxuSG9tZS5wcm9wVHlwZXMgPSB7XG4gIHBvc3RzOiBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9yZWFjdFJlZHV4LmNvbm5lY3QpKGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlKTtcbn0pKEhvbWUpO1xuXG59LHtcIm1vbWVudFwiOjM2LFwicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1oZWxtZXRcIjpcInJlYWN0LWhlbG1ldFwiLFwicmVhY3QtcmVkdXhcIjpcInJlYWN0LXJlZHV4XCJ9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEhlbG1ldCA9IHJlcXVpcmUoJ3JlYWN0LWhlbG1ldCcpO1xuXG52YXIgX3JlYWN0SGVsbWV0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0SGVsbWV0KTtcblxudmFyIF8gPSByZXF1aXJlKCcuLi8nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNpZ25JbiA9IGZ1bmN0aW9uIFNpZ25JbigpIHtcbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0SGVsbWV0Mi5kZWZhdWx0LCB7IHRpdGxlOiAnc2lnbiBpbicgfSksXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXy5TaWduSW5Gb3JtLCBudWxsKVxuICApO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2lnbkluO1xuXG59LHtcIi4uL1wiOjksXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LWhlbG1ldFwiOlwicmVhY3QtaGVsbWV0XCJ9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGFwaUhvc3Q6ICcxMjcuMC4wLjEnLFxuICBhcGlQb3J0OiAnNTAwMCcsXG4gIGhlYWQ6IHtcbiAgICB0aXRsZTogJ3BvcnRlZm9saW8nLFxuICAgIHRpdGxlVGVtcGxhdGU6ICdtYWxiZXJuYXogzrsgJXMnLFxuICAgIG1ldGE6IFt7XG4gICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgY29udGVudDogJ015IHBlcnNvbmFsIHBvcnRmb2xpby4nXG4gICAgfSwge1xuICAgICAgY2hhcnNldDogJ3V0Zi04J1xuICAgIH1dXG4gIH1cbn07XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIEF1dGhcbnZhciBMT0FEX0FVVEggPSBleHBvcnRzLkxPQURfQVVUSCA9ICdMT0FEX0FVVEgnO1xudmFyIExPQURfQVVUSF9TVUNDRVNTID0gZXhwb3J0cy5MT0FEX0FVVEhfU1VDQ0VTUyA9ICdMT0FEX0FVVEhfU1VDQ0VTUyc7XG52YXIgTE9BRF9BVVRIX0ZBSUwgPSBleHBvcnRzLkxPQURfQVVUSF9GQUlMID0gJ0xPQURfQVVUSF9GQUlMJztcbnZhciBTSUdOSU4gPSBleHBvcnRzLlNJR05JTiA9ICdTSUdOSU4nO1xudmFyIFNJR05JTl9TVUNDRVNTID0gZXhwb3J0cy5TSUdOSU5fU1VDQ0VTUyA9ICdTSUdOSU5fU1VDQ0VTUyc7XG52YXIgU0lHTklOX0ZBSUwgPSBleHBvcnRzLlNJR05JTl9GQUlMID0gJ1NJR05JTl9GQUlMJztcbnZhciBMT0dPVVQgPSBleHBvcnRzLkxPR09VVCA9ICdMT0dPVVQnO1xudmFyIExPR09VVF9TVUNDRVNTID0gZXhwb3J0cy5MT0dPVVRfU1VDQ0VTUyA9ICdMT0dPVVRfU1VDQ0VTUyc7XG52YXIgTE9HT1VUX0ZBSUwgPSBleHBvcnRzLkxPR09VVF9GQUlMID0gJ0xPR09VVF9GQUlMJztcblxuLy8gUG9zdHNcbnZhciBMT0FEX1BPU1RTID0gZXhwb3J0cy5MT0FEX1BPU1RTID0gJ0xPQURfUE9TVFMnO1xudmFyIExPQURfUE9TVFNfU1VDQ0VTUyA9IGV4cG9ydHMuTE9BRF9QT1NUU19TVUNDRVNTID0gJ0xPQURfUE9TVFNfU1VDQ0VTUyc7XG52YXIgTE9BRF9QT1NUU19GQUlMID0gZXhwb3J0cy5MT0FEX1BPU1RTX0ZBSUwgPSAnTE9BRF9QT1NUU19GQUlMJztcblxudmFyIFNIT1dfTUVTU0FHRSA9IGV4cG9ydHMuU0hPV19NRVNTQUdFID0gJ1NIT1dfTUVTU0FHRSc7XG52YXIgSElERV9NRVNTQUdFID0gZXhwb3J0cy5ISURFX01FU1NBR0UgPSAnSElERV9NRVNTQUdFJztcblxufSx7fV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9zdXBlcmFnZW50ID0gcmVxdWlyZSgnc3VwZXJhZ2VudCcpO1xuXG52YXIgX3N1cGVyYWdlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3VwZXJhZ2VudCk7XG5cbnZhciBfY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJyk7XG5cbnZhciBfY29uZmlnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBtZXRob2RzID0gWydnZXQnLCAncG9zdCcsICdwdXQnLCAnZGVsJ107XG5cbnZhciBpc1NlcnZlciA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih3aW5kb3cpKSAhPT0gJ29iamVjdCc7XG5cbmZ1bmN0aW9uIGZvcm1hdFVybChwYXRoKSB7XG4gIHZhciBhZGp1c3RlZFBhdGggPSBwYXRoWzBdICE9PSAnLycgPyAnJyArIHBhdGggOiBwYXRoO1xuXG4gIGlmIChpc1NlcnZlcikge1xuICAgIHJldHVybiAnaHR0cDovLycgKyBfY29uZmlnMi5kZWZhdWx0LmFwaUhvc3QgKyAnOicgKyAoX2NvbmZpZzIuZGVmYXVsdC5hcGlQb3J0ICsgYWRqdXN0ZWRQYXRoKTtcbiAgfVxuXG4gIHJldHVybiAnL2FwaS8nICsgYWRqdXN0ZWRQYXRoO1xufVxuXG52YXIgQXBpQ2xpZW50ID0gZnVuY3Rpb24gQXBpQ2xpZW50KHJlcSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcGlDbGllbnQpO1xuXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgcmV0dXJuIF90aGlzW21ldGhvZF0gPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgdmFyIHBhcmFtcyA9IF9yZWYucGFyYW1zO1xuICAgICAgdmFyIGRhdGEgPSBfcmVmLmRhdGE7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IF9zdXBlcmFnZW50Mi5kZWZhdWx0W21ldGhvZF0oZm9ybWF0VXJsKHBhdGgpKTtcblxuICAgICAgICBpZiAocGFyYW1zKSByZXF1ZXN0LnF1ZXJ5KHBhcmFtcyk7XG5cbiAgICAgICAgaWYgKGlzU2VydmVyICYmIHJlcS5nZXQoJ2Nvb2tpZScpKSB7XG4gICAgICAgICAgcmVxdWVzdC5zZXQoJ2Nvb2tpZScsIHJlcS5nZXQoJ2Nvb2tpZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhKSByZXF1ZXN0LnNlbmQoZGF0YSk7XG5cbiAgICAgICAgcmVxdWVzdC5lbmQoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgdmFyIGJvZHkgPSBfcmVmMi5ib2R5O1xuXG4gICAgICAgICAgdmFyIHJlcXVlc3RFcnIgPSBlcnI7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3RFcnIgPyByZWplY3QoYm9keSB8fCBlcnIpIDogcmVzb2x2ZShib2R5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFwaUNsaWVudDtcblxufSx7XCIuLi9jb25maWdcIjoxNSxcInN1cGVyYWdlbnRcIjpcInN1cGVyYWdlbnRcIn1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlZHV4Rm9ybSA9IHJlcXVpcmUoJ3JlZHV4LWZvcm0nKTtcblxudmFyIF91bmRlcnNjb3JlID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xuXG52YXIgX3VuZGVyc2NvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdW5kZXJzY29yZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIGZvcm1GYWN0b3J5ID0gZnVuY3Rpb24gZm9ybUZhY3RvcnkoX3JlZikge1xuICB2YXIgdmFsaWRhdGUgPSBfcmVmLnZhbGlkYXRlO1xuICB2YXIgc3R5bGVDbGFzcyA9IF9yZWYuc3R5bGVDbGFzcztcbiAgdmFyIGZvcm1OYW1lID0gX3JlZi5mb3JtTmFtZTtcbiAgdmFyIGlucHV0RmllbGRzID0gX3JlZi5pbnB1dEZpZWxkcztcbiAgdmFyIHN1Ym1pdFRleHQgPSBfcmVmLnN1Ym1pdFRleHQ7XG5cbiAgdmFyIEZvcm0gPSBmdW5jdGlvbiBGb3JtKF9yZWYyKSB7XG4gICAgdmFyIGhhbmRsZVN1Ym1pdCA9IF9yZWYyLmhhbmRsZVN1Ym1pdDtcblxuICAgIHZhciBmaWVsZHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIuZmllbGRzLCBbXSk7XG5cbiAgICB2YXIgcmVuZGVySW5wdXQgPSBmdW5jdGlvbiByZW5kZXJJbnB1dChmaWVsZCwgdHlwZSwgbGFiZWwpIHtcbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3NOYW1lOiAnZmllbGQnLCBrZXk6IGZpZWxkLm5hbWUgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2xhYmVsJyxcbiAgICAgICAgICB7IGh0bWxGb3I6IGZpZWxkLm5hbWUgfSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBmaWVsZC5kaXJ0eSA/ICdpbnB1dC1sYWJlbCBoYXN2YWx1ZScgOiAnaW5wdXQtbGFiZWwnIH0sXG4gICAgICAgICAgICBsYWJlbFxuICAgICAgICAgICksXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgX2V4dGVuZHMoe1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIG5hbWU6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogbGFiZWwsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGZpZWxkLmludmFsaWQgJiYgZmllbGQudG91Y2hlZCA/ICdpbnZhbGlkJyA6ICcnXG4gICAgICAgICAgfSwgZmllbGQpKSxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZXJyb3JzJyB9LFxuICAgICAgICAgICAgZmllbGQudG91Y2hlZCA/IGZpZWxkLmVycm9yIDogJydcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICdmb3JtJyxcbiAgICAgIHsgY2xhc3NOYW1lOiBzdHlsZUNsYXNzLCBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBhY3Rpb246ICcvYWRtaW0nIH0sXG4gICAgICBfdW5kZXJzY29yZTIuZGVmYXVsdC5tYXAoZmllbGRzLCBmdW5jdGlvbiAoZmllbGQsIGtleSkge1xuICAgICAgICB2YXIgX2lucHV0RmllbGRzJGZpbHRlciQgPSBpbnB1dEZpZWxkcy5maWx0ZXIoZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZi5uYW1lID09PSBrZXk7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICB2YXIgdHlwZSA9IF9pbnB1dEZpZWxkcyRmaWx0ZXIkLnR5cGU7XG4gICAgICAgIHZhciBsYWJlbCA9IF9pbnB1dEZpZWxkcyRmaWx0ZXIkLmxhYmVsO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJJbnB1dChmaWVsZCwgdHlwZSwgbGFiZWwpO1xuICAgICAgfSksXG4gICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3NOYW1lOiAnY3RhJyB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICB7IGNsYXNzTmFtZTogJ2J0biBsYXJnZScsIG9uQ2xpY2s6IGhhbmRsZVN1Ym1pdCB9LFxuICAgICAgICAgIHN1Ym1pdFRleHRcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH07XG5cbiAgRm9ybS5wcm9wVHlwZXMgPSB7XG4gICAgaGFuZGxlU3VibWl0OiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBmaWVsZHM6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfTtcblxuICByZXR1cm4gKDAsIF9yZWR1eEZvcm0ucmVkdXhGb3JtKSh7XG4gICAgZm9ybTogZm9ybU5hbWUsXG4gICAgZmllbGRzOiBpbnB1dEZpZWxkcy5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICByZXR1cm4gZmllbGQubmFtZTtcbiAgICB9KSxcbiAgICB2YWxpZGF0ZTogdmFsaWRhdGVcbiAgfSkoRm9ybSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtRmFjdG9yeTtcblxufSx7XCJyZWFjdFwiOlwicmVhY3RcIixcInJlZHV4LWZvcm1cIjo2MixcInVuZGVyc2NvcmVcIjpcInVuZGVyc2NvcmVcIn1dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZW1haWwgPSBlbWFpbDtcbmV4cG9ydHMucmVxdWlyZWQgPSByZXF1aXJlZDtcbmV4cG9ydHMubWF0Y2ggPSBtYXRjaDtcbmV4cG9ydHMuY3JlYXRlVmFsaWRhdG9yID0gY3JlYXRlVmFsaWRhdG9yO1xuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cblxudmFyIGlzRW1wdHkgPSBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJztcbn07XG5cbnZhciBqb2luID0gZnVuY3Rpb24gam9pbihydWxlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBkYXRhKSB7XG4gICAgcmV0dXJuIHJ1bGVzLm1hcChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgcmV0dXJuIHJ1bGUodmFsdWUsIGRhdGEpO1xuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAhIWVycm9yO1xuICAgIH0pWzBdO1xuICB9O1xufTtcblxuZnVuY3Rpb24gZW1haWwodmFsdWUpIHtcbiAgaWYgKCFpc0VtcHR5KHZhbHVlKSAmJiAhL15bQS1aMC05Ll8lKy1dK0BbQS1aMC05Li1dK1xcLltBLVpdezIsNH0kL2kudGVzdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ0ludmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVxdWlyZWQodmFsdWUpIHtcbiAgaWYgKGlzRW1wdHkodmFsdWUpKSByZXR1cm4gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnO1xufVxuXG5mdW5jdGlvbiBtYXRjaChmaWVsZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gZGF0YVtmaWVsZF0pIHtcbiAgICAgICAgcmV0dXJuICdBcyBzZW5oYXMgbsOjbyBjb2luY2lkZW0nO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmFsaWRhdG9yKHJ1bGVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGEgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICAgIHZhciBlcnJvcnMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhydWxlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgcnVsZSA9IGpvaW4oW10uY29uY2F0KHJ1bGVzW2tleV0pKTtcbiAgICAgIHZhciBlcnJvciA9IHJ1bGUoZGF0YVtrZXldLCBkYXRhKTtcbiAgICAgIGlmIChlcnJvcikgZXJyb3JzW2tleV0gPSBlcnJvcjtcbiAgICB9KTtcbiAgICByZXR1cm4gZXJyb3JzO1xuICB9O1xufVxuXG59LHt9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcHJvbWlzZU1pZGRsZXdhcmU7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gcHJvbWlzZU1pZGRsZXdhcmUoY2xpZW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgdmFyIGRpc3BhdGNoID0gX3JlZi5kaXNwYXRjaDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByb21pc2UgPSBhY3Rpb24ucHJvbWlzZTtcbiAgICAgICAgdmFyIHR5cGVzID0gYWN0aW9uLnR5cGVzO1xuXG4gICAgICAgIHZhciByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKGFjdGlvbiwgWydwcm9taXNlJywgJ3R5cGVzJ10pO1xuXG4gICAgICAgIGlmICghcHJvbWlzZSkgcmV0dXJuIG5leHQoYWN0aW9uKTtcblxuICAgICAgICB2YXIgX3R5cGVzID0gX3NsaWNlZFRvQXJyYXkodHlwZXMsIDMpO1xuXG4gICAgICAgIHZhciBSRVFVRVNUID0gX3R5cGVzWzBdO1xuICAgICAgICB2YXIgU1VDQ0VTUyA9IF90eXBlc1sxXTtcbiAgICAgICAgdmFyIEZBSUxVUkUgPSBfdHlwZXNbMl07XG5cblxuICAgICAgICBuZXh0KF9leHRlbmRzKHt9LCByZXN0LCB7IHR5cGU6IFJFUVVFU1QgfSkpO1xuXG4gICAgICAgIHZhciBhY3Rpb25Qcm9taXNlID0gcHJvbWlzZShjbGllbnQpO1xuXG4gICAgICAgIGFjdGlvblByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoX2V4dGVuZHMoe30sIHJlc3QsIHsgcmVzdWx0OiByZXN1bHQsIHR5cGU6IFNVQ0NFU1MgfSkpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChfZXh0ZW5kcyh7fSwgcmVzdCwgeyBlcnJvcjogZXJyb3IsIHR5cGU6IEZBSUxVUkUgfSkpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignTUlERExFV0FSRSBFUlJPUjonLCBlcnIpO1xuICAgICAgICAgIG5leHQoX2V4dGVuZHMoe30sIHJlc3QsIHsgZXJyOiBlcnIsIHR5cGU6IEZBSUxVUkUgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWN0aW9uUHJvbWlzZTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxufSx7fV0sMjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgcmVkdWNlciA9IGZ1bmN0aW9uIHJlZHVjZXIoKSB7XG4gIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHsgbG9hZGVkOiBmYWxzZSB9IDogYXJndW1lbnRzWzBdO1xuICB2YXIgYWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgX2NvbnN0YW50cy5MT0FEX0FVVEg6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgIH0pO1xuICAgIGNhc2UgX2NvbnN0YW50cy5MT0FEX0FVVEhfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGxvYWRlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24ucmVzdWx0LnN0YXR1cyxcbiAgICAgICAgdXNlcjogYWN0aW9uLnJlc3VsdC51c2VyXG4gICAgICB9KTtcbiAgICBjYXNlIF9jb25zdGFudHMuTE9BRF9BVVRIX0ZBSUw6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0dXM6ICd1bmF0aG9yaXplZCdcbiAgICAgIH0pO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05JTjpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgc2lnbmluZ0luOiB0cnVlXG4gICAgICB9KTtcbiAgICBjYXNlIF9jb25zdGFudHMuU0lHTklOX1NVQ0NFU1M6XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgICAgIHNpZ25pbmdJbjogZmFsc2UsXG4gICAgICAgIHN0YXR1czogYWN0aW9uLnJlc3VsdC5zdGF0dXMsXG4gICAgICAgIHVzZXI6IGFjdGlvbi5yZXN1bHQudXNlclxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLlNJR05JTl9GQUlMOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaWduaW5nSW46IGZhbHNlLFxuICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICBzdGF0dXM6IGFjdGlvbi5lcnJvci5zdGF0dXNcbiAgICAgIH0pO1xuXG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVDpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9nZ2luZ091dDogdHJ1ZVxuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnaW5nT3V0OiBmYWxzZSxcbiAgICAgICAgdXNlcjogbnVsbCxcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24ucmVzdWx0LnN0YXR1c1xuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPR09VVF9GQUlMOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnaW5nT3V0OiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24uZXJyb3Iuc3RhdHVzXG4gICAgICB9KTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlZHVjZXI7XG5cbn0se1wiLi4vY29uc3RhbnRzXCI6MTZ9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVkdXggPSByZXF1aXJlKCdyZWR1eCcpO1xuXG52YXIgX3JlYWN0Um91dGVyUmVkdXggPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXItcmVkdXgnKTtcblxudmFyIF9yZWR1eEZvcm0gPSByZXF1aXJlKCdyZWR1eC1mb3JtJyk7XG5cbnZhciBfYXV0aCA9IHJlcXVpcmUoJy4vYXV0aCcpO1xuXG52YXIgX2F1dGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXV0aCk7XG5cbnZhciBfcG9zdHMgPSByZXF1aXJlKCcuL3Bvc3RzJyk7XG5cbnZhciBfcG9zdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9zdHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcm9vdFJlZHVjZXIgPSAoMCwgX3JlZHV4LmNvbWJpbmVSZWR1Y2Vycykoe1xuICBhdXRoOiBfYXV0aDIuZGVmYXVsdCxcbiAgcG9zdHM6IF9wb3N0czIuZGVmYXVsdCxcbiAgZm9ybTogX3JlZHV4Rm9ybS5yZWR1Y2VyLFxuICByb3V0aW5nOiBfcmVhY3RSb3V0ZXJSZWR1eC5yb3V0ZXJSZWR1Y2VyXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcm9vdFJlZHVjZXI7XG5cbn0se1wiLi9hdXRoXCI6MjEsXCIuL3Bvc3RzXCI6MjMsXCJyZWFjdC1yb3V0ZXItcmVkdXhcIjo4MSxcInJlZHV4XCI6XCJyZWR1eFwiLFwicmVkdXgtZm9ybVwiOjYyfV0sMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgcmVkdWNlciA9IGZ1bmN0aW9uIHJlZHVjZXIoKSB7XG4gIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHsgbG9hZGVkOiBmYWxzZSB9IDogYXJndW1lbnRzWzBdO1xuICB2YXIgYWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgX2NvbnN0YW50cy5MT0FEX1BPU1RTOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICB9KTtcbiAgICBjYXNlIF9jb25zdGFudHMuTE9BRF9QT1NUU19TVUNDRVNTOlxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6IGFjdGlvbi5yZXN1bHQuc3RhdHVzLm1lc3NhZ2UsXG4gICAgICAgIHBvc3RzOiBhY3Rpb24ucmVzdWx0LnN0YXR1cy5wb3N0c1xuICAgICAgfSk7XG4gICAgY2FzZSBfY29uc3RhbnRzLkxPQURfUE9TVFNfRkFJTDpcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogT2JqZWN0LmtleXMoYWN0aW9uLmVycm9yKSAhPT0gMCA/IGFjdGlvbi5lcnJvciA6ICd1bmF0aG9yaXplZCdcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlZHVjZXI7XG5cbn0se1wiLi4vY29uc3RhbnRzXCI6MTZ9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xuXG52YXIgX2F1dGggPSByZXF1aXJlKCcuL2FjdGlvbnMvYXV0aCcpO1xuXG52YXIgX2NvbXBvbmVudHMgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0b3JlKSB7XG4gIHZhciBtdXN0QmVMb2dnZWQgPSBmdW5jdGlvbiBtdXN0QmVMb2dnZWQobmV4dFN0YXRlLCByZXBsYWNlLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIGNoZWNrQXV0aCgpIHtcbiAgICAgIHZhciBfc3RvcmUkZ2V0U3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuXG4gICAgICB2YXIgdXNlciA9IF9zdG9yZSRnZXRTdGF0ZS5hdXRoLnVzZXI7XG5cbiAgICAgIGlmICghdXNlcikgcmVwbGFjZSgnL2FkbWluL3NpZ25pbicpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBpZiAoISgwLCBfYXV0aC5pc0xvYWRlZCkoc3RvcmUuZ2V0U3RhdGUoKSkpIHtcbiAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaCgoMCwgX2F1dGgubG9hZEF1dGgpKCkpLnRoZW4oY2hlY2tBdXRoKS5jYXRjaChjaGVja0F1dGgpO1xuICAgIH1cbiAgICByZXR1cm4gY2hlY2tBdXRoKCk7XG4gIH07XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgIF9yZWFjdFJvdXRlci5Sb3V0ZSxcbiAgICB7IG5hbWU6ICdhcHAnLCBjb21wb25lbnQ6IF9jb21wb25lbnRzLkFwcFZpZXcsIHBhdGg6ICcvJyB9LFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5JbmRleFJvdXRlLCB7IGNvbXBvbmVudDogX2NvbXBvbmVudHMuSG9tZSB9KSxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RSb3V0ZXIuUm91dGUsIHsgY29tcG9uZW50OiBfY29tcG9uZW50cy5BYm91dCwgcGF0aDogJ2Fib3V0JyB9KSxcbiAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RSb3V0ZXIuUm91dGUsIHsgY29tcG9uZW50OiBfY29tcG9uZW50cy5Db250YWN0LCBwYXRoOiAnY29udGFjdCcgfSksXG4gICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBfcmVhY3RSb3V0ZXIuUm91dGUsXG4gICAgICB7IG5hbWU6ICdhZG1pbicsIHBhdGg6ICdhZG1pbicgfSxcbiAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9yZWFjdFJvdXRlci5Sb3V0ZSwgeyBjb21wb25lbnQ6IF9jb21wb25lbnRzLlNpZ25JbiwgcGF0aDogJ3NpZ25pbicgfSksXG4gICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgX3JlYWN0Um91dGVyLlJvdXRlLFxuICAgICAgICB7IG9uRW50ZXI6IG11c3RCZUxvZ2dlZCB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfcmVhY3RSb3V0ZXIuSW5kZXhSb3V0ZSwgeyBjb21wb25lbnQ6IF9jb21wb25lbnRzLkFkbWluIH0pXG4gICAgICApXG4gICAgKVxuICApO1xufTtcblxufSx7XCIuL2FjdGlvbnMvYXV0aFwiOjEsXCIuL2NvbXBvbmVudHNcIjo5LFwicmVhY3RcIjpcInJlYWN0XCIsXCJyZWFjdC1yb3V0ZXJcIjpcInJlYWN0LXJvdXRlclwifV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9yZWR1eCA9IHJlcXVpcmUoJ3JlZHV4Jyk7XG5cbnZhciBfcmVhY3RSb3V0ZXJSZWR1eCA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlci1yZWR1eCcpO1xuXG52YXIgX2NsaWVudE1pZGRsZXdhcmUgPSByZXF1aXJlKCcuL21pZGRsZXdhcmUvY2xpZW50TWlkZGxld2FyZScpO1xuXG52YXIgX2NsaWVudE1pZGRsZXdhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xpZW50TWlkZGxld2FyZSk7XG5cbnZhciBfcmVkdWNlcnMgPSByZXF1aXJlKCcuL3JlZHVjZXJzJyk7XG5cbnZhciBfcmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVkdWNlcnMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY29uZmlndXJlU3RvcmUgPSBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShjbGllbnQsIGhpc3RvcnkpIHtcbiAgdmFyIGluaXRpYWxTdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG4gIHZhciByZWR1eFJvdXRlck1pZGRsZXdhcmUgPSAoMCwgX3JlYWN0Um91dGVyUmVkdXgucm91dGVyTWlkZGxld2FyZSkoaGlzdG9yeSk7XG4gIHZhciBtaWRkbGV3YXJlID0gWygwLCBfY2xpZW50TWlkZGxld2FyZTIuZGVmYXVsdCkoY2xpZW50KSwgcmVkdXhSb3V0ZXJNaWRkbGV3YXJlXTtcblxuICB2YXIgc3RvcmUgPSAoMCwgX3JlZHV4LmNyZWF0ZVN0b3JlKShfcmVkdWNlcnMyLmRlZmF1bHQsIGluaXRpYWxTdGF0ZSwgKDAsIF9yZWR1eC5jb21wb3NlKShfcmVkdXguYXBwbHlNaWRkbGV3YXJlLmFwcGx5KHVuZGVmaW5lZCwgbWlkZGxld2FyZSksICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih3aW5kb3cpKSA9PT0gJ29iamVjdCcgPyB3aW5kb3cuZGV2VG9vbHNFeHRlbnNpb24oKSA6IGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGY7XG4gIH0pKTtcbiAgcmV0dXJuIHN0b3JlO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY29uZmlndXJlU3RvcmU7XG5cbn0se1wiLi9taWRkbGV3YXJlL2NsaWVudE1pZGRsZXdhcmVcIjoyMCxcIi4vcmVkdWNlcnNcIjoyMixcInJlYWN0LXJvdXRlci1yZWR1eFwiOjgxLFwicmVkdXhcIjpcInJlZHV4XCJ9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCB8fCB0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuXG59LHtcIi4vbGliL2lzX2FyZ3VtZW50cy5qc1wiOjI3LFwiLi9saWIva2V5cy5qc1wiOjI4fV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxufSx7fV0sMjg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxufSx7fV0sMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBtaXhpbnM6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICAgIG5hbWU6IHRydWUsXG4gICAgbGVuZ3RoOiB0cnVlLFxuICAgIHByb3RvdHlwZTogdHJ1ZSxcbiAgICBjYWxsZXI6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghUkVBQ1RfU1RBVElDU1trZXlzW2ldXSAmJiAhS05PV05fU1RBVElDU1trZXlzW2ldXSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbXBvbmVudFtrZXlzW2ldXSA9IHNvdXJjZUNvbXBvbmVudFtrZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn07XG5cbn0se31dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuXG59LHt9XSwzMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBkZWVwRXF1YWxzO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGRlZXBFcXVhbHMoZXF1YWxzLCBkZWVwT2JqZWN0cykge1xuICBmdW5jdGlvbiBkZWVwKHZhbHVlQSwgdmFsdWVCKSB7XG4gICAgaWYgKGVxdWFscyh2YWx1ZUEsIHZhbHVlQikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlQSkpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZUIpIHx8IHZhbHVlQS5sZW5ndGggIT09IHZhbHVlQi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHZhbHVlQS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgaWYgKCFkZWVwKHZhbHVlQVtpbmRleF0sIHZhbHVlQltpbmRleF0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjb3VsZCBub3QgZmluZCB1bmVxdWFsIGl0ZW1zXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZUIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZUEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlQiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXNBTnVsbCA9IHZhbHVlQSA9PT0gbnVsbDtcbiAgICAgIHZhciBpc0JOdWxsID0gdmFsdWVCID09PSBudWxsO1xuICAgICAgaWYgKGlzQU51bGwgfHwgaXNCTnVsbCkge1xuICAgICAgICByZXR1cm4gaXNBTnVsbCA9PT0gaXNCTnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXModmFsdWVBKTtcbiAgICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlQik7XG5cbiAgICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhS2V5cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGtleSA9IGFLZXlzW2luZGV4XTtcbiAgICAgICAgaWYgKGhhc093bi5jYWxsKHZhbHVlQSwga2V5KSAmJiAoIWhhc093bi5jYWxsKHZhbHVlQiwga2V5KSB8fCAhKGRlZXBPYmplY3RzID8gZGVlcCA6IGVxdWFscykodmFsdWVBW2tleV0sIHZhbHVlQltrZXldKSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNvdWxkIG5vdCBmaW5kIHVuZXF1YWwga2V5cyBvciB2YWx1ZXNcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGVlcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9tZW1vaXplID0gcmVxdWlyZSgnLi9tZW1vaXplJyk7XG5cbnZhciBfbWVtb2l6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZW1vaXplKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX21lbW9pemUyWydkZWZhdWx0J107XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0se1wiLi9tZW1vaXplXCI6MzR9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbHJ1Q2FjaGU7XG5cbmZ1bmN0aW9uIGxydUNhY2hlKGxpbWl0LCBlcXVhbHMpIHtcbiAgdmFyIGVudHJpZXMgPSBbXTtcblxuICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgIGlmIChlcXVhbHMoa2V5LCBlbnRyeS5rZXkpKSB7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAvLyBtb3ZlIHRoaXMgZW50cnkgdG8gdGhlIHRvcCBvZiB0aGUgY2FjaGVcbiAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgZW50cmllcy51bnNoaWZ0KGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnkudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHV0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAoIWdldChrZXkpKSB7XG4gICAgICBlbnRyaWVzLnVuc2hpZnQoeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID4gbGltaXQpIHtcbiAgICAgICAgZW50cmllcy5wb3AoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBnZXQ6IGdldCwgcHV0OiBwdXQgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcbn0se31dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IG1lbW9pemU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9zaW5nbGV0b25DYWNoZSA9IHJlcXVpcmUoJy4vc2luZ2xldG9uQ2FjaGUnKTtcblxudmFyIF9zaW5nbGV0b25DYWNoZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaW5nbGV0b25DYWNoZSk7XG5cbnZhciBfbHJ1Q2FjaGUgPSByZXF1aXJlKCcuL2xydUNhY2hlJyk7XG5cbnZhciBfbHJ1Q2FjaGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbHJ1Q2FjaGUpO1xuXG52YXIgX2RlZXBFcXVhbHMgPSByZXF1aXJlKCcuL2RlZXBFcXVhbHMnKTtcblxudmFyIF9kZWVwRXF1YWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZXBFcXVhbHMpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYWNoZShsaW1pdCwgZXF1YWxzKSB7XG4gIHJldHVybiBsaW1pdCA9PT0gMSA/IF9zaW5nbGV0b25DYWNoZTJbJ2RlZmF1bHQnXShlcXVhbHMpIDogX2xydUNhY2hlMlsnZGVmYXVsdCddKGxpbWl0LCBlcXVhbHMpO1xufVxuXG5mdW5jdGlvbiBtZW1vaXplKCkge1xuICB2YXIgbGltaXQgPSAxO1xuICB2YXIgZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzKHZhbHVlQSwgdmFsdWVCKSB7XG4gICAgcmV0dXJuIHZhbHVlQSA9PT0gdmFsdWVCO1xuICB9O1xuICB2YXIgZGVlcE9iamVjdHMgPSBmYWxzZTtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY29uZmlnID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgY29uZmlnW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBjb25maWdbMF0gPT09ICdudW1iZXInKSB7XG4gICAgbGltaXQgPSBjb25maWcuc2hpZnQoKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbmZpZ1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVxdWFscyA9IGNvbmZpZy5zaGlmdCgpO1xuICB9XG4gIGlmICh0eXBlb2YgY29uZmlnWzBdID09PSAnYm9vbGVhbicpIHtcbiAgICBkZWVwT2JqZWN0cyA9IGNvbmZpZ1swXTtcbiAgfVxuXG4gIHZhciBjYWNoZSA9IGNyZWF0ZUNhY2hlKGxpbWl0LCBfZGVlcEVxdWFsczJbJ2RlZmF1bHQnXShlcXVhbHMsIGRlZXBPYmplY3RzKSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGNhY2hlLmdldChhcmdzKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlID0gZm4uYXBwbHkoZm4sIGFyZ3MpO1xuICAgICAgICBjYWNoZS5wdXQoYXJncywgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSx7XCIuL2RlZXBFcXVhbHNcIjozMSxcIi4vbHJ1Q2FjaGVcIjozMyxcIi4vc2luZ2xldG9uQ2FjaGVcIjozNX1dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBzaW5nbGV0b25DYWNoZTtcblxuZnVuY3Rpb24gc2luZ2xldG9uQ2FjaGUoZXF1YWxzKSB7XG4gIHZhciBlbnRyeSA9IHVuZGVmaW5lZDtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgIGlmIChlbnRyeSAmJiBlcXVhbHMoa2V5LCBlbnRyeS5rZXkpKSB7XG4gICAgICAgIHJldHVybiBlbnRyeS52YWx1ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHV0OiBmdW5jdGlvbiBwdXQoa2V5LCB2YWx1ZSkge1xuICAgICAgZW50cnkgPSB7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG59LHt9XSwzNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyEgbW9tZW50LmpzXG4vLyEgdmVyc2lvbiA6IDIuMTMuMFxuLy8hIGF1dGhvcnMgOiBUaW0gV29vZCwgSXNrcmVuIENoZXJuZXYsIE1vbWVudC5qcyBjb250cmlidXRvcnNcbi8vISBsaWNlbnNlIDogTUlUXG4vLyEgbW9tZW50anMuY29tXG5cbjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIGdsb2JhbC5tb21lbnQgPSBmYWN0b3J5KClcbn0odGhpcywgZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgaG9va0NhbGxiYWNrO1xuXG4gICAgZnVuY3Rpb24gdXRpbHNfaG9va3NfX2hvb2tzICgpIHtcbiAgICAgICAgcmV0dXJuIGhvb2tDYWxsYmFjay5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIG1vbWVudCgpXG4gICAgLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAgZnVuY3Rpb24gc2V0SG9va0NhbGxiYWNrIChjYWxsYmFjaykge1xuICAgICAgICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXRlKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcChhcnIsIGZuKSB7XG4gICAgICAgIHZhciByZXMgPSBbXSwgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVzLnB1c2goZm4oYXJyW2ldLCBpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNPd25Qcm9wKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmQoYSwgYikge1xuICAgICAgICBmb3IgKHZhciBpIGluIGIpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGIsIGkpKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IGJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xuICAgICAgICAgICAgYS50b1N0cmluZyA9IGIudG9TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndmFsdWVPZicpKSB7XG4gICAgICAgICAgICBhLnZhbHVlT2YgPSBiLnZhbHVlT2Y7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVfdXRjX19jcmVhdGVVVEMgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbXB0eSAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHVudXNlZFRva2VucyAgICA6IFtdLFxuICAgICAgICAgICAgdW51c2VkSW5wdXQgICAgIDogW10sXG4gICAgICAgICAgICBvdmVyZmxvdyAgICAgICAgOiAtMixcbiAgICAgICAgICAgIGNoYXJzTGVmdE92ZXIgICA6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGludmFsaWRNb250aCAgICA6IG51bGwsXG4gICAgICAgICAgICBpbnZhbGlkRm9ybWF0ICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHVzZXJJbnZhbGlkYXRlZCA6IGZhbHNlLFxuICAgICAgICAgICAgaXNvICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBwYXJzZWREYXRlUGFydHMgOiBbXSxcbiAgICAgICAgICAgIG1lcmlkaWVtICAgICAgICA6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MobSkge1xuICAgICAgICBpZiAobS5fcGYgPT0gbnVsbCkge1xuICAgICAgICAgICAgbS5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0uX3BmO1xuICAgIH1cblxuICAgIHZhciBzb21lO1xuICAgIGlmIChBcnJheS5wcm90b3R5cGUuc29tZSkge1xuICAgICAgICBzb21lID0gQXJyYXkucHJvdG90eXBlLnNvbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc29tZSA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICAgICAgICAgIHZhciB0ID0gT2JqZWN0KHRoaXMpO1xuICAgICAgICAgICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgaW4gdCAmJiBmdW4uY2FsbCh0aGlzLCB0W2ldLCBpLCB0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZF9faXNWYWxpZChtKSB7XG4gICAgICAgIGlmIChtLl9pc1ZhbGlkID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBmbGFncyA9IGdldFBhcnNpbmdGbGFncyhtKTtcbiAgICAgICAgICAgIHZhciBwYXJzZWRQYXJ0cyA9IHNvbWUuY2FsbChmbGFncy5wYXJzZWREYXRlUGFydHMsIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgIT0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbS5faXNWYWxpZCA9ICFpc05hTihtLl9kLmdldFRpbWUoKSkgJiZcbiAgICAgICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuZW1wdHkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZE1vbnRoICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLm51bGxJbnB1dCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgICAgICghZmxhZ3MubWVyaWRpZW0gfHwgKGZsYWdzLm1lcmlkaWVtICYmIHBhcnNlZFBhcnRzKSk7XG5cbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcbiAgICAgICAgICAgICAgICBtLl9pc1ZhbGlkID0gbS5faXNWYWxpZCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5jaGFyc0xlZnRPdmVyID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkX19jcmVhdGVJbnZhbGlkIChmbGFncykge1xuICAgICAgICB2YXIgbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhOYU4pO1xuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgZXh0ZW5kKGdldFBhcnNpbmdGbGFncyhtKSwgZmxhZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLnVzZXJJbnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1VuZGVmaW5lZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT09IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBQbHVnaW5zIHRoYXQgYWRkIHByb3BlcnRpZXMgc2hvdWxkIGFsc28gYWRkIHRoZSBrZXkgaGVyZSAobnVsbCB2YWx1ZSksXG4gICAgLy8gc28gd2UgY2FuIHByb3Blcmx5IGNsb25lIG91cnNlbHZlcy5cbiAgICB2YXIgbW9tZW50UHJvcGVydGllcyA9IHV0aWxzX2hvb2tzX19ob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XG5cbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgICAgIHZhciBpLCBwcm9wLCB2YWw7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBtb21lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIHZhciB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE1vbWVudCB8fCAob2JqICE9IG51bGwgJiYgb2JqLl9pc0FNb21lbnRPYmplY3QgIT0gbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzRmxvb3IgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSW50KGFyZ3VtZW50Rm9yQ29lcmNpb24pIHtcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcbiAgICAgICAgICAgIHZhbHVlID0gMDtcblxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBhYnNGbG9vcihjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBjb21wYXJlIHR3byBhcnJheXMsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRpZmZlcmVuY2VzXG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhcnJheTEsIGFycmF5MiwgZG9udENvbnZlcnQpIHtcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgbGVuZ3RoRGlmZiA9IE1hdGguYWJzKGFycmF5MS5sZW5ndGggLSBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGRpZmZzID0gMCxcbiAgICAgICAgICAgIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKChkb250Q29udmVydCAmJiBhcnJheTFbaV0gIT09IGFycmF5MltpXSkgfHxcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpKSB7XG4gICAgICAgICAgICAgICAgZGlmZnMrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZnMgKyBsZW5ndGhEaWZmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4obXNnKSB7XG4gICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2YgY29uc29sZSAhPT0gICd1bmRlZmluZWQnKSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRpb24gd2FybmluZzogJyArIG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xuICAgICAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG51bGwsIG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XG4gICAgICAgICAgICAgICAgd2Fybihtc2cgKyAnXFxuQXJndW1lbnRzOiAnICsgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcsICcpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBmbik7XG4gICAgfVxuXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xuICAgICAgICBpZiAodXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHdhcm4obXNnKTtcbiAgICAgICAgICAgIGRlcHJlY2F0aW9uc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciA9IG51bGw7XG5cbiAgICBmdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEZ1bmN0aW9uIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZV9zZXRfX3NldCAoY29uZmlnKSB7XG4gICAgICAgIHZhciBwcm9wLCBpO1xuICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBwcm9wID0gY29uZmlnW2ldO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gcHJvcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICAvLyBMZW5pZW50IG9yZGluYWwgcGFyc2luZyBhY2NlcHRzIGp1c3QgYSBudW1iZXIgaW4gYWRkaXRpb24gdG9cbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfb3JkaW5hbFBhcnNlTGVuaWVudC5cbiAgICAgICAgdGhpcy5fb3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAodGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSArICd8JyArICgvXFxkezEsMn0vKS5zb3VyY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNoaWxkQ29uZmlnKSB7XG4gICAgICAgIHZhciByZXMgPSBleHRlbmQoe30sIHBhcmVudENvbmZpZyksIHByb3A7XG4gICAgICAgIGZvciAocHJvcCBpbiBjaGlsZENvbmZpZykge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoY2hpbGRDb25maWcsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1twcm9wXSkgJiYgaXNPYmplY3QoY2hpbGRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBwYXJlbnRDb25maWdbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQocmVzW3Byb3BdLCBjaGlsZENvbmZpZ1twcm9wXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZENvbmZpZ1twcm9wXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IGNoaWxkQ29uZmlnW3Byb3BdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXNbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5cztcblxuICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAga2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBpLCByZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duUHJvcChvYmosIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xuICAgIHZhciBsb2NhbGVzID0ge307XG4gICAgdmFyIGdsb2JhbExvY2FsZTtcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xuICAgIH1cblxuICAgIC8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxuICAgIGZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xuICAgICAgICB2YXIgaSA9IDAsIGosIG5leHQsIGxvY2FsZSwgc3BsaXQ7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNwbGl0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2ldKS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcbiAgICAgICAgICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcbiAgICAgICAgICAgIHdoaWxlIChqID4gMCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoc3BsaXQuc2xpY2UoMCwgaikuam9pbignLScpKTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRMb2NhbGUobmFtZSkge1xuICAgICAgICB2YXIgb2xkTG9jYWxlID0gbnVsbDtcbiAgICAgICAgLy8gVE9ETzogRmluZCBhIGJldHRlciB3YXkgdG8gcmVnaXN0ZXIgYW5kIGxvYWQgYWxsIHRoZSBsb2NhbGVzIGluIE5vZGVcbiAgICAgICAgaWYgKCFsb2NhbGVzW25hbWVdICYmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gZ2xvYmFsTG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vbG9jYWxlLycgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZVxuICAgICAgICAgICAgICAgIC8vIHdhbnQgdG8gdW5kbyB0aGF0IGZvciBsYXp5IGxvYWRlZCBsb2NhbGVzXG4gICAgICAgICAgICAgICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgbG9jYWxlIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGxvY2FsZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsb2NhbGUga2V5LlxuICAgIGZ1bmN0aW9uIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGVmaW5lTG9jYWxlKGtleSwgdmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZS5fYWJicjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVMb2NhbGUgKG5hbWUsIGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuYWJiciA9IG5hbWU7XG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGVwcmVjYXRlU2ltcGxlKCdkZWZpbmVMb2NhbGVPdmVycmlkZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlIG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlTmFtZSwgY29uZmlnKSB0byBjaGFuZ2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW4gZXhpc3RpbmcgbG9jYWxlLiBtb21lbnQuZGVmaW5lTG9jYWxlKGxvY2FsZU5hbWUsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmZpZykgc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgY3JlYXRpbmcgYSBuZXcgbG9jYWxlJyk7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKGxvY2FsZXNbbmFtZV0uX2NvbmZpZywgY29uZmlnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyZWF0IGFzIGlmIHRoZXJlIGlzIG5vIGJhc2UgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgncGFyZW50TG9jYWxlVW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3BlY2lmaWVkIHBhcmVudExvY2FsZSBpcyBub3QgZGVmaW5lZCB5ZXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZShjb25maWcpO1xuXG4gICAgICAgICAgICAvLyBiYWNrd2FyZHMgY29tcGF0IGZvciBub3c6IGFsc28gc2V0IHRoZSBsb2NhbGVcbiAgICAgICAgICAgIGxvY2FsZV9sb2NhbGVzX19nZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXNlZnVsIGZvciB0ZXN0aW5nXG4gICAgICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxlKG5hbWUsIGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGU7XG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWdzKGxvY2FsZXNbbmFtZV0uX2NvbmZpZywgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsZSA9IG5ldyBMb2NhbGUoY29uZmlnKTtcbiAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IGxvY2FsZTtcblxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXG4gICAgICAgICAgICBsb2NhbGVfbG9jYWxlc19fZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIGxvY2FsZTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0FycmF5KGtleSkpIHtcbiAgICAgICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0gW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hvb3NlTG9jYWxlKGtleSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2xvY2FsZXNfX2xpc3RMb2NhbGVzKCkge1xuICAgICAgICByZXR1cm4ga2V5cyhsb2NhbGVzKTtcbiAgICB9XG5cbiAgICB2YXIgYWxpYXNlcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkVW5pdEFsaWFzICh1bml0LCBzaG9ydGhhbmQpIHtcbiAgICAgICAgdmFyIGxvd2VyQ2FzZSA9IHVuaXQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgYWxpYXNlc1tsb3dlckNhc2VdID0gYWxpYXNlc1tsb3dlckNhc2UgKyAncyddID0gYWxpYXNlc1tzaG9ydGhhbmRdID0gdW5pdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVVbml0cyh1bml0cykge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHVuaXRzID09PSAnc3RyaW5nJyA/IGFsaWFzZXNbdW5pdHNdIHx8IGFsaWFzZXNbdW5pdHMudG9Mb3dlckNhc2UoKV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplT2JqZWN0VW5pdHMoaW5wdXRPYmplY3QpIHtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IHt9LFxuICAgICAgICAgICAgbm9ybWFsaXplZFByb3AsXG4gICAgICAgICAgICBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBpbnB1dE9iamVjdCkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3AoaW5wdXRPYmplY3QsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZFByb3AgPSBub3JtYWxpemVVbml0cyhwcm9wKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZFByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplZElucHV0W25vcm1hbGl6ZWRQcm9wXSA9IGlucHV0T2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUdldFNldCAodW5pdCwga2VlcFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnZXRfc2V0X19zZXQodGhpcywgdW5pdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX2dldCAobW9tLCB1bml0KSB7XG4gICAgICAgIHJldHVybiBtb20uaXNWYWxpZCgpID9cbiAgICAgICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9zZXRfX3NldCAobW9tLCB1bml0LCB2YWx1ZSkge1xuICAgICAgICBpZiAobW9tLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldCAodW5pdHMsIHZhbHVlKSB7XG4gICAgICAgIHZhciB1bml0O1xuICAgICAgICBpZiAodHlwZW9mIHVuaXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh1bml0IGluIHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQodW5pdCwgdW5pdHNbdW5pdF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0c10odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcbiAgICAgICAgdmFyIGFic051bWJlciA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgICAgIHplcm9zVG9GaWxsID0gdGFyZ2V0TGVuZ3RoIC0gYWJzTnVtYmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcbiAgICAgICAgcmV0dXJuIChzaWduID8gKGZvcmNlU2lnbiA/ICcrJyA6ICcnKSA6ICctJykgK1xuICAgICAgICAgICAgTWF0aC5wb3coMTAsIE1hdGgubWF4KDAsIHplcm9zVG9GaWxsKSkudG9TdHJpbmcoKS5zdWJzdHIoMSkgKyBhYnNOdW1iZXI7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oW0hoXW1tKHNzKT98TW98TU0/TT9NP3xEb3xERERvfEREP0Q/RD98ZGRkP2Q/fGRvP3x3W298d10/fFdbb3xXXT98UW8/fFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fGtrP3xtbT98c3M/fFN7MSw5fXx4fFh8eno/fFpaP3wuKS9nO1xuXG4gICAgdmFyIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2c7XG5cbiAgICB2YXIgZm9ybWF0RnVuY3Rpb25zID0ge307XG5cbiAgICB2YXIgZm9ybWF0VG9rZW5GdW5jdGlvbnMgPSB7fTtcblxuICAgIC8vIHRva2VuOiAgICAnTSdcbiAgICAvLyBwYWRkZWQ6ICAgWydNTScsIDJdXG4gICAgLy8gb3JkaW5hbDogICdNbydcbiAgICAvLyBjYWxsYmFjazogZnVuY3Rpb24gKCkgeyB0aGlzLm1vbnRoKCkgKyAxIH1cbiAgICBmdW5jdGlvbiBhZGRGb3JtYXRUb2tlbiAodG9rZW4sIHBhZGRlZCwgb3JkaW5hbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dID0gZnVuYztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFkZGVkKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1twYWRkZWRbMF1dID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB6ZXJvRmlsbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHBhZGRlZFsxXSwgcGFkZGVkWzJdKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGluYWwpIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdG9rZW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJywgaTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0obSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBpID0gNTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpID49IDAgJiYgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UobG9jYWxGb3JtYXR0aW5nVG9rZW5zLCByZXBsYWNlTG9uZ0RhdGVGb3JtYXRUb2tlbnMpO1xuICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICBpIC09IDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cblxuICAgIHZhciBtYXRjaDEgICAgICAgICA9IC9cXGQvOyAgICAgICAgICAgIC8vICAgICAgIDAgLSA5XG4gICAgdmFyIG1hdGNoMiAgICAgICAgID0gL1xcZFxcZC87ICAgICAgICAgIC8vICAgICAgMDAgLSA5OVxuICAgIHZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcbiAgICB2YXIgbWF0Y2g0ICAgICAgICAgPSAvXFxkezR9LzsgICAgICAgICAvLyAgICAwMDAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDYgICAgICAgICA9IC9bKy1dP1xcZHs2fS87ICAgIC8vIC05OTk5OTkgLSA5OTk5OTlcbiAgICB2YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XG4gICAgdmFyIG1hdGNoM3RvNCAgICAgID0gL1xcZFxcZFxcZFxcZD8vOyAgICAgLy8gICAgIDk5OSAtIDk5OTlcbiAgICB2YXIgbWF0Y2g1dG82ICAgICAgPSAvXFxkXFxkXFxkXFxkXFxkXFxkPy87IC8vICAgOTk5OTkgLSA5OTk5OTlcbiAgICB2YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XG4gICAgdmFyIG1hdGNoMXRvNCAgICAgID0gL1xcZHsxLDR9LzsgICAgICAgLy8gICAgICAgMCAtIDk5OTlcbiAgICB2YXIgbWF0Y2gxdG82ICAgICAgPSAvWystXT9cXGR7MSw2fS87ICAvLyAtOTk5OTk5IC0gOTk5OTk5XG5cbiAgICB2YXIgbWF0Y2hVbnNpZ25lZCAgPSAvXFxkKy87ICAgICAgICAgICAvLyAgICAgICAwIC0gaW5mXG4gICAgdmFyIG1hdGNoU2lnbmVkICAgID0gL1srLV0/XFxkKy87ICAgICAgLy8gICAgLWluZiAtIGluZlxuXG4gICAgdmFyIG1hdGNoT2Zmc2V0ICAgID0gL1p8WystXVxcZFxcZDo/XFxkXFxkL2dpOyAvLyArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcbiAgICB2YXIgbWF0Y2hTaG9ydE9mZnNldCA9IC9afFsrLV1cXGRcXGQoPzo6P1xcZFxcZCk/L2dpOyAvLyArMDAgLTAwICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuXG4gICAgdmFyIG1hdGNoVGltZXN0YW1wID0gL1srLV0/XFxkKyhcXC5cXGR7MSwzfSk/LzsgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcblxuICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxuICAgIC8vIGluY2x1ZGVzIHNjb3R0aXNoIGdhZWxpYyB0d28gd29yZCBhbmQgaHlwaGVuYXRlZCBtb250aHNcbiAgICB2YXIgbWF0Y2hXb3JkID0gL1swLTldKlsnYS16XFx1MDBBMC1cXHUwNUZGXFx1MDcwMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSt8W1xcdTA2MDAtXFx1MDZGRlxcL10rKFxccyo/W1xcdTA2MDAtXFx1MDZGRl0rKXsxLDJ9L2k7XG5cblxuICAgIHZhciByZWdleGVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIChpc1N0cmljdCAmJiBzdHJpY3RSZWdleCkgPyBzdHJpY3RSZWdleCA6IHJlZ2V4O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNlUmVnZXhGb3JUb2tlbiAodG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnZXhFc2NhcGUocykge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5zID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBhcnJheVtjYWxsYmFja10gPSB0b0ludChpbnB1dCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW5zW3Rva2VuW2ldXSA9IGZ1bmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgICAgIGNvbmZpZy5fdyA9IGNvbmZpZy5fdyB8fCB7fTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgaW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCAmJiBoYXNPd25Qcm9wKHRva2VucywgdG9rZW4pKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5dKGlucHV0LCBjb25maWcuX2EsIGNvbmZpZywgdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFlFQVIgPSAwO1xuICAgIHZhciBNT05USCA9IDE7XG4gICAgdmFyIERBVEUgPSAyO1xuICAgIHZhciBIT1VSID0gMztcbiAgICB2YXIgTUlOVVRFID0gNDtcbiAgICB2YXIgU0VDT05EID0gNTtcbiAgICB2YXIgTUlMTElTRUNPTkQgPSA2O1xuICAgIHZhciBXRUVLID0gNztcbiAgICB2YXIgV0VFS0RBWSA9IDg7XG5cbiAgICB2YXIgaW5kZXhPZjtcblxuICAgIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgICAgICBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhPZiA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgICAvLyBJIGtub3dcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gbykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoICsgMSwgMCkpLmdldFVUQ0RhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ01vJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCgpICsgMTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCh0aGlzLCBmb3JtYXQpO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTU0nLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbW9udGgnLCAnTScpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignTU0nLCAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU0nLCAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcbiAgICBhZGRSZWdleFRva2VuKCdNTU1NJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9IHRvSW50KGlucHV0KSAtIDE7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnTU1NJywgJ01NTU0nXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXG4gICAgICAgIGlmIChtb250aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheVtNT05USF0gPSBtb250aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRNb250aCA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgTU9OVEhTX0lOX0ZPUk1BVCA9IC9EW29EXT8oXFxbW15cXFtcXF1dKlxcXXxcXHMrKStNTU1NPy87XG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHMgKG0sIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzW01PTlRIU19JTl9GT1JNQVQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0W20ubW9udGgoKV0gOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRbTU9OVEhTX0lOX0ZPUk1BVC50ZXN0KGZvcm1hdCkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ11bbS5tb250aCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml0c19tb250aF9faGFuZGxlU3RyaWN0UGFyc2UobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghdGhpcy5fbW9udGhzUGFyc2UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHVzZWRcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmljdCkge1xuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ01NTScpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNQYXJzZSAobW9udGhOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuaXRzX21vbnRoX19oYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlclxuICAgICAgICAvLyBzZWUgc29ydGluZyBpbiBjb21wdXRlTW9udGhzUGFyc2VcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIXRoaXMuX21vbnRoc1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX21vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gc2V0TW9udGggKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGggKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0X3NldF9fZ2V0KHRoaXMsICdNb250aCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xuICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIG1vbnRoc1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX21vbnRoc1Nob3J0UmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE1vbnRoc1JlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIG1vbnRoc1JlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fbW9udGhzUGFyc2VFeGFjdCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlTW9udGhzUGFyc2UgKCkge1xuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSwgbW9tO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICBtb20gPSBjcmVhdGVfdXRjX19jcmVhdGVVVEMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgbW9udGggKG9yIGFiYnIpIGlzIGEgcHJlZml4IG9mIGFub3RoZXIgaXRcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxuICAgICAgICBzaG9ydFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGxvbmdQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9udGhzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJmbG93IChtKSB7XG4gICAgICAgIHZhciBvdmVyZmxvdztcbiAgICAgICAgdmFyIGEgPSBtLl9hO1xuXG4gICAgICAgIGlmIChhICYmIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9PT0gLTIpIHtcbiAgICAgICAgICAgIG92ZXJmbG93ID1cbiAgICAgICAgICAgICAgICBhW01PTlRIXSAgICAgICA8IDAgfHwgYVtNT05USF0gICAgICAgPiAxMSAgPyBNT05USCA6XG4gICAgICAgICAgICAgICAgYVtEQVRFXSAgICAgICAgPCAxIHx8IGFbREFURV0gICAgICAgID4gZGF5c0luTW9udGgoYVtZRUFSXSwgYVtNT05USF0pID8gREFURSA6XG4gICAgICAgICAgICAgICAgYVtIT1VSXSAgICAgICAgPCAwIHx8IGFbSE9VUl0gICAgICAgID4gMjQgfHwgKGFbSE9VUl0gPT09IDI0ICYmIChhW01JTlVURV0gIT09IDAgfHwgYVtTRUNPTkRdICE9PSAwIHx8IGFbTUlMTElTRUNPTkRdICE9PSAwKSkgPyBIT1VSIDpcbiAgICAgICAgICAgICAgICBhW01JTlVURV0gICAgICA8IDAgfHwgYVtNSU5VVEVdICAgICAgPiA1OSAgPyBNSU5VVEUgOlxuICAgICAgICAgICAgICAgIGFbU0VDT05EXSAgICAgIDwgMCB8fCBhW1NFQ09ORF0gICAgICA+IDU5ICA/IFNFQ09ORCA6XG4gICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gPCAwIHx8IGFbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxuICAgICAgICAgICAgICAgIC0xO1xuXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd0RheU9mWWVhciAmJiAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSkpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IERBVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFSztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUtEQVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS5vdmVyZmxvdyA9IG92ZXJmbG93O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gaXNvIDg2MDEgcmVnZXhcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcbiAgICB2YXIgZXh0ZW5kZWRJc29SZWdleCA9IC9eXFxzKigoPzpbKy1dXFxkezZ9fFxcZHs0fSktKD86XFxkXFxkLVxcZFxcZHxXXFxkXFxkLVxcZHxXXFxkXFxkfFxcZFxcZFxcZHxcXGRcXGQpKSg/OihUfCApKFxcZFxcZCg/OjpcXGRcXGQoPzo6XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xuICAgIHZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8vO1xuXG4gICAgdmFyIHR6UmVnZXggPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy87XG5cbiAgICB2YXIgaXNvRGF0ZXMgPSBbXG4gICAgICAgIFsnWVlZWVlZLU1NLUREJywgL1srLV1cXGR7Nn0tXFxkXFxkLVxcZFxcZC9dLFxuICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICAgICAgWydHR0dHLVtXXVdXLUUnLCAvXFxkezR9LVdcXGRcXGQtXFxkL10sXG4gICAgICAgIFsnR0dHRy1bV11XVycsIC9cXGR7NH0tV1xcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXG4gICAgICAgIFsnWVlZWS1NTScsIC9cXGR7NH0tXFxkXFxkLywgZmFsc2VdLFxuICAgICAgICBbJ1lZWVlZWU1NREQnLCAvWystXVxcZHsxMH0vXSxcbiAgICAgICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcbiAgICAgICAgLy8gWVlZWU1NIGlzIE5PVCBhbGxvd2VkIGJ5IHRoZSBzdGFuZGFyZFxuICAgICAgICBbJ0dHR0dbV11XV0UnLCAvXFxkezR9V1xcZHszfS9dLFxuICAgICAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxuICAgICAgICBbJ1lZWVlEREQnLCAvXFxkezd9L11cbiAgICBdO1xuXG4gICAgLy8gaXNvIHRpbWUgZm9ybWF0cyBhbmQgcmVnZXhlc1xuICAgIHZhciBpc29UaW1lcyA9IFtcbiAgICAgICAgWydISDptbTpzcy5TU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkKy9dLFxuICAgICAgICBbJ0hIOm1tOnNzLFNTU1MnLCAvXFxkXFxkOlxcZFxcZDpcXGRcXGQsXFxkKy9dLFxuICAgICAgICBbJ0hIOm1tOnNzJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkL10sXG4gICAgICAgIFsnSEg6bW0nLCAvXFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIbW1zcy5TU1NTJywgL1xcZFxcZFxcZFxcZFxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgWydISG1tc3MsU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGQsXFxkKy9dLFxuICAgICAgICBbJ0hIbW1zcycsIC9cXGRcXGRcXGRcXGRcXGRcXGQvXSxcbiAgICAgICAgWydISG1tJywgL1xcZFxcZFxcZFxcZC9dLFxuICAgICAgICBbJ0hIJywgL1xcZFxcZC9dXG4gICAgXTtcblxuICAgIHZhciBhc3BOZXRKc29uUmVnZXggPSAvXlxcLz9EYXRlXFwoKFxcLT9cXGQrKS9pO1xuXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXRcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSVNPKGNvbmZpZykge1xuICAgICAgICB2YXIgaSwgbCxcbiAgICAgICAgICAgIHN0cmluZyA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIG1hdGNoID0gZXh0ZW5kZWRJc29SZWdleC5leGVjKHN0cmluZykgfHwgYmFzaWNJc29SZWdleC5leGVjKHN0cmluZyksXG4gICAgICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xuXG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChpID0gMCwgbCA9IGlzb0RhdGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKG1hdGNoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRlRm9ybWF0ID0gaXNvRGF0ZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGFsbG93VGltZSA9IGlzb0RhdGVzW2ldWzJdICE9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29UaW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFsyXSBzaG91bGQgYmUgJ1QnIG9yIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lRm9ybWF0ID0gKG1hdGNoWzJdIHx8ICcgJykgKyBpc29UaW1lc1tpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFsbG93VGltZSAmJiB0aW1lRm9ybWF0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHpSZWdleC5leGVjKG1hdGNoWzRdKSkge1xuICAgICAgICAgICAgICAgICAgICB0ekZvcm1hdCA9ICdaJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpZy5fZiA9IGRhdGVGb3JtYXQgKyAodGltZUZvcm1hdCB8fCAnJykgKyAodHpGb3JtYXQgfHwgJycpO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcblxuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayhjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUuIFRoaXMgaXMgJyArXG4gICAgICAgICdkaXNjb3VyYWdlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHVwY29taW5nIG1ham9yICcgK1xuICAgICAgICAncmVsZWFzZS4gUGxlYXNlIHJlZmVyIHRvICcgK1xuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MDcgZm9yIG1vcmUgaW5mby4nLFxuICAgICAgICBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShjb25maWcuX2kgKyAoY29uZmlnLl91c2VVVEMgPyAnIFVUQycgOiAnJykpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XG4gICAgICAgIC8vY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XG4gICAgICAgIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xODEzNDgvaW5zdGFudGlhdGluZy1hLWphdmFzY3JpcHQtb2JqZWN0LWJ5LWNhbGxpbmctcHJvdG90eXBlLWNvbnN0cnVjdG9yLWFwcGx5XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xuXG4gICAgICAgIC8vdGhlIGRhdGUgY29uc3RydWN0b3IgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcblxuICAgICAgICAvL3RoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1knLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB5ID0gdGhpcy55ZWFyKCk7XG4gICAgICAgIHJldHVybiB5IDw9IDk5OTkgPyAnJyArIHkgOiAnKycgKyB5O1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWScsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnllYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWScsICAgNF0sICAgICAgIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWScsICA1XSwgICAgICAgMCwgJ3llYXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVlZWScsIDYsIHRydWVdLCAwLCAneWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1knLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gaW5wdXQubGVuZ3RoID09PSAyID8gdXRpbHNfaG9va3NfX2hvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbWUVBUl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gcGFyc2VJbnQoaW5wdXQsIDEwKTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIGZ1bmN0aW9uIGRheXNJblllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwO1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRvSW50KGlucHV0KSArICh0b0ludChpbnB1dCkgPiA2OCA/IDE5MDAgOiAyMDAwKTtcbiAgICB9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldFllYXIgPSBtYWtlR2V0U2V0KCdGdWxsWWVhcicsIHRydWUpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydC1vZi1maXJzdC13ZWVrIC0gc3RhcnQtb2YteWVhclxuICAgIGZ1bmN0aW9uIGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXG4gICAgICAgICAgICBmd2QgPSA3ICsgZG93IC0gZG95LFxuICAgICAgICAgICAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xuXG4gICAgICAgIHJldHVybiAtZndkbHcgKyBmd2QgLSAxO1xuICAgIH1cblxuICAgIC8vaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgbG9jYWxXZWVrZGF5ID0gKDcgKyB3ZWVrZGF5IC0gZG93KSAlIDcsXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQsXG4gICAgICAgICAgICByZXNZZWFyLCByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQobW9tLnllYXIoKSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgd2VlayA9IE1hdGguZmxvb3IoKG1vbS5kYXlPZlllYXIoKSAtIHdlZWtPZmZzZXQgLSAxKSAvIDcpICsgMSxcbiAgICAgICAgICAgIHJlc1dlZWssIHJlc1llYXI7XG5cbiAgICAgICAgaWYgKHdlZWsgPCAxKSB7XG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayArIHdlZWtzSW5ZZWFyKHJlc1llYXIsIGRvdywgZG95KTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrID4gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2VlazogcmVzV2VlayxcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuXG4gICAgZnVuY3Rpb24gZGVmYXVsdHMoYSwgYiwgYykge1xuICAgICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50RGF0ZUFycmF5KGNvbmZpZykge1xuICAgICAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxuICAgICAgICB2YXIgbm93VmFsdWUgPSBuZXcgRGF0ZSh1dGlsc19ob29rc19faG9va3Mubm93KCkpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0VVRDTW9udGgoKSwgbm93VmFsdWUuZ2V0VVRDRGF0ZSgpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXG4gICAgLy8gdGhlIGFycmF5IHNob3VsZCBtaXJyb3IgdGhlIHBhcmFtZXRlcnMgYmVsb3dcbiAgICAvLyBub3RlOiBhbGwgdmFsdWVzIHBhc3QgdGhlIHllYXIgYXJlIG9wdGlvbmFsIGFuZCB3aWxsIGRlZmF1bHQgdG8gdGhlIGxvd2VzdCBwb3NzaWJsZSB2YWx1ZS5cbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tQXJyYXkgKGNvbmZpZykge1xuICAgICAgICB2YXIgaSwgZGF0ZSwgaW5wdXQgPSBbXSwgY3VycmVudERhdGUsIHllYXJUb1VzZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIpIHtcbiAgICAgICAgICAgIHllYXJUb1VzZSA9IGRlZmF1bHRzKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dEYXlPZlllYXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBjcmVhdGVVVENEYXRlIDogY3JlYXRlRGF0ZSkuYXBwbHkobnVsbCwgaW5wdXQpO1xuICAgICAgICAvLyBBcHBseSB0aW1lem9uZSBvZmZzZXQgZnJvbSBpbnB1dC4gVGhlIGFjdHVhbCB1dGNPZmZzZXQgY2FuIGJlIGNoYW5nZWRcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXG4gICAgICAgIGlmIChjb25maWcuX3R6bSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWcuX2Quc2V0VVRDTWludXRlcyhjb25maWcuX2QuZ2V0VVRDTWludXRlcygpIC0gY29uZmlnLl90em0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fbmV4dERheSkge1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XG4gICAgICAgIHZhciB3LCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdztcblxuICAgICAgICB3ID0gY29uZmlnLl93O1xuICAgICAgICBpZiAody5HRyAhPSBudWxsIHx8IHcuVyAhPSBudWxsIHx8IHcuRSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkb3cgPSAxO1xuICAgICAgICAgICAgZG95ID0gNDtcblxuICAgICAgICAgICAgLy8gVE9ETzogV2UgbmVlZCB0byB0YWtlIHRoZSBjdXJyZW50IGlzb1dlZWtZZWFyLCBidXQgdGhhdCBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXG4gICAgICAgICAgICAvLyBhIG5vdyB2ZXJzaW9uIG9mIGN1cnJlbnQgY29uZmlnICh0YWtlIGxvY2FsL3V0Yy9vZmZzZXQgZmxhZ3MsIGFuZFxuICAgICAgICAgICAgLy8gY3JlYXRlIG5vdykuXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihsb2NhbF9fY3JlYXRlTG9jYWwoKSwgMSwgNCkueWVhcik7XG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody5XLCAxKTtcbiAgICAgICAgICAgIHdlZWtkYXkgPSBkZWZhdWx0cyh3LkUsIDEpO1xuICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAxIHx8IHdlZWtkYXkgPiA3KSB7XG4gICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvdyA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRvdztcbiAgICAgICAgICAgIGRveSA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRveTtcblxuICAgICAgICAgICAgd2Vla1llYXIgPSBkZWZhdWx0cyh3LmdnLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobG9jYWxfX2NyZWF0ZUxvY2FsKCksIGRvdywgZG95KS55ZWFyKTtcbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIDEpO1xuXG4gICAgICAgICAgICBpZiAody5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5kO1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMCB8fCB3ZWVrZGF5ID4gNikge1xuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAody5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSBkb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdlZWsgPCAxIHx8IHdlZWsgPiB3ZWVrc0luWWVhcih3ZWVrWWVhciwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd1dlZWtkYXkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xuICAgICAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0ZW1wLmRheU9mWWVhcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBJU08gc3RhbmRhcmRcbiAgICB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgICAgICBpZiAoY29uZmlnLl9mID09PSB1dGlsc19ob29rc19faG9va3MuSVNPXzg2MDEpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICAgICAgaSwgcGFyc2VkSW5wdXQsIHRva2VucywgdG9rZW4sIHNraXBwZWQsXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XG5cbiAgICAgICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgcGFyc2VkSW5wdXQgPSAoc3RyaW5nLm1hdGNoKGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSkgfHwgW10pWzBdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rva2VuJywgdG9rZW4sICdwYXJzZWRJbnB1dCcsIHBhcnNlZElucHV0LFxuICAgICAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgc2tpcHBlZCA9IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggKz0gcGFyc2VkSW5wdXQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuX3N0cmljdCAmJiAhcGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHVucGFyc2VkIGlucHV0IGxlbmd0aCB0byB0aGUgc3RyaW5nXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdIDw9IDEyICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID4gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykubWVyaWRpZW0gPSBjb25maWcuX21lcmlkaWVtO1xuICAgICAgICAvLyBoYW5kbGUgbWVyaWRpZW1cbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xuXG4gICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgICAgICBjaGVja092ZXJmbG93KGNvbmZpZyk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAgKGxvY2FsZSwgaG91ciwgbWVyaWRpZW0pIHtcbiAgICAgICAgdmFyIGlzUG07XG5cbiAgICAgICAgaWYgKG1lcmlkaWVtID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbGUubWVyaWRpZW1Ib3VyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubWVyaWRpZW1Ib3VyKGhvdXIsIG1lcmlkaWVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChsb2NhbGUuaXNQTSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICAgICAgaXNQbSA9IGxvY2FsZS5pc1BNKG1lcmlkaWVtKTtcbiAgICAgICAgICAgIGlmIChpc1BtICYmIGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzUG0gJiYgaG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBub3Qgc3VwcG9zZWQgdG8gaGFwcGVuXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGFycmF5IG9mIGZvcm1hdCBzdHJpbmdzXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgdGVtcENvbmZpZyxcbiAgICAgICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShOYU4pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZy5fZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcbiAgICAgICAgICAgIHRlbXBDb25maWcgPSBjb3B5Q29uZmlnKHt9LCBjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBDb25maWcuX2YgPSBjb25maWcuX2ZbaV07XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XG5cbiAgICAgICAgICAgIC8vb3IgdG9rZW5zXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xuXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChbaS55ZWFyLCBpLm1vbnRoLCBpLmRheSB8fCBpLmRhdGUsIGkuaG91ciwgaS5taW51dGUsIGkuc2Vjb25kLCBpLm1pbGxpc2Vjb25kXSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIHZhciByZXMgPSBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3cocHJlcGFyZUNvbmZpZyhjb25maWcpKSk7XG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxuICAgICAgICAgICAgcmVzLmFkZCgxLCAnZCcpO1xuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZShjb25maWcuX2wpO1xuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCB8fCAoZm9ybWF0ID09PSB1bmRlZmluZWQgJiYgaW5wdXQgPT09ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKHtudWxsSW5wdXQ6IHRydWV9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWcuX2kgPSBpbnB1dCA9IGNvbmZpZy5fbG9jYWxlLnByZXBhcnNlKGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01vbWVudChpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3coaW5wdXQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCkge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXZhbGlkX19pc1ZhbGlkKGNvbmZpZykpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21JbnB1dChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xuICAgICAgICBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUodXRpbHNfaG9va3NfX2hvb2tzLm5vdygpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaW5wdXQpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uZmlnRnJvbU9iamVjdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBpZiAodHlwZW9mKGxvY2FsZSkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl91c2VVVEMgPSBjLl9pc1VUQyA9IGlzVVRDO1xuICAgICAgICBjLl9sID0gbG9jYWxlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcblxuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbUNvbmZpZyhjKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbF9fY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAgICAgICdtb21lbnQoKS5taW4gaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5tYXggaW5zdGVhZC4gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE1NDgnLFxuICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgIHZhciBvdGhlciA9IGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRfX2NyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICk7XG5cbiAgICB2YXIgcHJvdG90eXBlTWF4ID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gbG9jYWxfX2NyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkX19jcmVhdGVJbnZhbGlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUGljayBhIG1vbWVudCBtIGZyb20gbW9tZW50cyBzbyB0aGF0IG1bZm5dKG90aGVyKSBpcyB0cnVlIGZvciBhbGxcbiAgICAvLyBvdGhlci4gVGhpcyByZWxpZXMgb24gdGhlIGZ1bmN0aW9uIGZuIHRvIGJlIHRyYW5zaXRpdmUuXG4gICAgLy9cbiAgICAvLyBtb21lbnRzIHNob3VsZCBlaXRoZXIgYmUgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMgb3IgYW4gYXJyYXksIHdob3NlXG4gICAgLy8gZmlyc3QgZWxlbWVudCBpcyBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cy5cbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcbiAgICAgICAgdmFyIHJlcywgaTtcbiAgICAgICAgaWYgKG1vbWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkobW9tZW50c1swXSkpIHtcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbW9tZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbF9fY3JlYXRlTG9jYWwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXMgPSBtb21lbnRzWzBdO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbW9tZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKCFtb21lbnRzW2ldLmlzVmFsaWQoKSB8fCBtb21lbnRzW2ldW2ZuXShyZXMpKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XG4gICAgZnVuY3Rpb24gbWluICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNCZWZvcmUnLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXggKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfVxuXG4gICAgdmFyIG5vdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93ID8gRGF0ZS5ub3coKSA6ICsobmV3IERhdGUoKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIER1cmF0aW9uIChkdXJhdGlvbikge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0gbm9ybWFsaXplT2JqZWN0VW5pdHMoZHVyYXRpb24pLFxuICAgICAgICAgICAgeWVhcnMgPSBub3JtYWxpemVkSW5wdXQueWVhciB8fCAwLFxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxuICAgICAgICAgICAgbW9udGhzID0gbm9ybWFsaXplZElucHV0Lm1vbnRoIHx8IDAsXG4gICAgICAgICAgICB3ZWVrcyA9IG5vcm1hbGl6ZWRJbnB1dC53ZWVrIHx8IDAsXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxuICAgICAgICAgICAgaG91cnMgPSBub3JtYWxpemVkSW5wdXQuaG91ciB8fCAwLFxuICAgICAgICAgICAgbWludXRlcyA9IG5vcm1hbGl6ZWRJbnB1dC5taW51dGUgfHwgMCxcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXG4gICAgICAgICAgICBtaWxsaXNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmQgfHwgMDtcblxuICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSArbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHNlY29uZHMgKiAxZTMgKyAvLyAxMDAwXG4gICAgICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICBob3VycyAqIDEwMDAgKiA2MCAqIDYwOyAvL3VzaW5nIDEwMDAgKiA2MCAqIDYwIGluc3RlYWQgb2YgMzZlNSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzI5NzhcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXG4gICAgICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICAgICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcbiAgICAgICAgICAgIHdlZWtzICogNztcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgICAgICBxdWFydGVycyAqIDMgK1xuICAgICAgICAgICAgeWVhcnMgKiAxMjtcblxuICAgICAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xuXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRHVyYXRpb247XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKHRva2VuLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgICAgIHZhciBzaWduID0gJysnO1xuICAgICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNpZ24gPSAnLSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2lnbiArIHplcm9GaWxsKH5+KG9mZnNldCAvIDYwKSwgMikgKyBzZXBhcmF0b3IgKyB6ZXJvRmlsbCh+fihvZmZzZXQpICUgNjAsIDIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvZmZzZXQoJ1onLCAnOicpO1xuICAgIG9mZnNldCgnWlonLCAnJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdaJywgIG1hdGNoU2hvcnRPZmZzZXQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ1onLCAnWlonXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fdXNlVVRDID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIHRpbWV6b25lIGNodW5rZXJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cbiAgICAvLyAnLTE1MzAnICA+IFsnLTE1JywgJzMwJ11cbiAgICB2YXIgY2h1bmtPZmZzZXQgPSAvKFtcXCtcXC1dfFxcZFxcZCkvZ2k7XG5cbiAgICBmdW5jdGlvbiBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoZXIsIHN0cmluZykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9ICgoc3RyaW5nIHx8ICcnKS5tYXRjaChtYXRjaGVyKSB8fCBbXSk7XG4gICAgICAgIHZhciBjaHVuayAgID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdIHx8IFtdO1xuICAgICAgICB2YXIgcGFydHMgICA9IChjaHVuayArICcnKS5tYXRjaChjaHVua09mZnNldCkgfHwgWyctJywgMCwgMF07XG4gICAgICAgIHZhciBtaW51dGVzID0gKyhwYXJ0c1sxXSAqIDYwKSArIHRvSW50KHBhcnRzWzJdKTtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0gPT09ICcrJyA/IG1pbnV0ZXMgOiAtbWludXRlcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBtb21lbnQgZnJvbSBpbnB1dCwgdGhhdCBpcyBsb2NhbC91dGMvem9uZSBlcXVpdmFsZW50IHRvIG1vZGVsLlxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPSAoaXNNb21lbnQoaW5wdXQpIHx8IGlzRGF0ZShpbnB1dCkgPyBpbnB1dC52YWx1ZU9mKCkgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLnZhbHVlT2YoKSkgLSByZXMudmFsdWVPZigpO1xuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICAgICAgcmVzLl9kLnNldFRpbWUocmVzLl9kLnZhbHVlT2YoKSArIGRpZmYpO1xuICAgICAgICAgICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS5sb2NhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZU9mZnNldCAobSkge1xuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9wdWxsLzE4NzFcbiAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKG0uX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xuICAgIH1cblxuICAgIC8vIEhPT0tTXG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIGEgbW9tZW50IGlzIG11dGF0ZWQuXG4gICAgLy8gSXQgaXMgaW50ZW5kZWQgdG8ga2VlcCB0aGUgb2Zmc2V0IGluIHN5bmMgd2l0aCB0aGUgdGltZXpvbmUuXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVwZGF0ZU9mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgLy8ga2VlcExvY2FsVGltZSA9IHRydWUgbWVhbnMgb25seSBjaGFuZ2UgdGhlIHRpbWV6b25lLCB3aXRob3V0XG4gICAgLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cbiAgICAvLyA1OjMxOjI2ICswMjAwIEl0IGlzIHBvc3NpYmxlIHRoYXQgNTozMToyNiBkb2Vzbid0IGV4aXN0IHdpdGggb2Zmc2V0XG4gICAgLy8gKzAyMDAsIHNvIHdlIGFkanVzdCB0aGUgdGltZSBhcyBuZWVkZWQsIHRvIGJlIHZhbGlkLlxuICAgIC8vXG4gICAgLy8gS2VlcGluZyB0aGUgdGltZSBhY3R1YWxseSBhZGRzL3N1YnRyYWN0cyAob25lIGhvdXIpXG4gICAgLy8gZnJvbSB0aGUgYWN0dWFsIHJlcHJlc2VudGVkIHRpbWUuIFRoYXQgaXMgd2h5IHdlIGNhbGwgdXBkYXRlT2Zmc2V0XG4gICAgLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxuICAgIC8vIF9jaGFuZ2VJblByb2dyZXNzID09IHRydWUgY2FzZSwgdGhlbiB3ZSBoYXZlIHRvIGFkanVzdCwgYmVjYXVzZVxuICAgIC8vIHRoZXJlIGlzIG5vIHN1Y2ggdGltZSBpbiB0aGUgZ2l2ZW4gdGltZXpvbmUuXG4gICAgZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXG4gICAgICAgICAgICBsb2NhbEFkanVzdDtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gb2Zmc2V0RnJvbVN0cmluZyhtYXRjaFNob3J0T2Zmc2V0LCBpbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2KSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCAqIDYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxBZGp1c3QgPSBnZXREYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XG4gICAgICAgICAgICBpZiAobG9jYWxBZGp1c3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGxvY2FsQWRqdXN0LCAnbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9mZnNldCAhPT0gaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWtlZXBMb2NhbFRpbWUgfHwgdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICBhZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQgLSBvZmZzZXQsICdtJyksIDEsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1dGlsc19ob29rc19faG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvVVRDIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90em0pIHtcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldChvZmZzZXRGcm9tU3RyaW5nKG1hdGNoT2Zmc2V0LCB0aGlzLl9pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KS51dGNPZmZzZXQoKSA6IDA7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnV0Y09mZnNldCgpIC0gaW5wdXQpICUgNjAgPT09IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWUgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCg1KS51dGNPZmZzZXQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCAoKSB7XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjID0ge307XG5cbiAgICAgICAgY29weUNvbmZpZyhjLCB0aGlzKTtcbiAgICAgICAgYyA9IHByZXBhcmVDb25maWcoYyk7XG5cbiAgICAgICAgaWYgKGMuX2EpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGMuX2lzVVRDID8gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKGMuX2EpIDogbG9jYWxfX2NyZWF0ZUxvY2FsKGMuX2EpO1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gdGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlQXJyYXlzKGMuX2EsIG90aGVyLnRvQXJyYXkoKSkgPiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTG9jYWwgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyAhdGhpcy5faXNVVEMgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1V0Y09mZnNldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcbiAgICB2YXIgYXNwTmV0UmVnZXggPSAvXihcXC0pPyg/OihcXGQqKVsuIF0pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKVxcLj8oXFxkezN9KT9cXGQqKT8kLztcblxuICAgIC8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXG4gICAgLy8gc29tZXdoYXQgbW9yZSBpbiBsaW5lIHdpdGggNC40LjMuMiAyMDA0IHNwZWMsIGJ1dCBhbGxvd3MgZGVjaW1hbCBhbnl3aGVyZVxuICAgIC8vIGFuZCBmdXJ0aGVyIG1vZGlmaWVkIHRvIGFsbG93IGZvciBzdHJpbmdzIGNvbnRhaW5pbmcgYm90aCB3ZWVrIGFuZCBkYXlcbiAgICB2YXIgaXNvUmVnZXggPSAvXigtKT9QKD86KC0/WzAtOSwuXSopWSk/KD86KC0/WzAtOSwuXSopTSk/KD86KC0/WzAtOSwuXSopVyk/KD86KC0/WzAtOSwuXSopRCk/KD86VCg/OigtP1swLTksLl0qKUgpPyg/OigtP1swLTksLl0qKU0pPyg/OigtP1swLTksLl0qKVMpPyk/JC87XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGQgIDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbi5taWxsaXNlY29uZHMgPSBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghIShtYXRjaCA9IGFzcE5ldFJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIHkgIDogMCxcbiAgICAgICAgICAgICAgICBkICA6IHRvSW50KG1hdGNoW0RBVEVdKSAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIGggIDogdG9JbnQobWF0Y2hbSE9VUl0pICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBzICA6IHRvSW50KG1hdGNoW1NFQ09ORF0pICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIG1zIDogdG9JbnQobWF0Y2hbTUlMTElTRUNPTkRdKSAqIHNpZ25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29SZWdleC5leGVjKGlucHV0KSkpIHtcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB5IDogcGFyc2VJc28obWF0Y2hbMl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXG4gICAgICAgICAgICAgICAgdyA6IHBhcnNlSXNvKG1hdGNoWzRdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBkIDogcGFyc2VJc28obWF0Y2hbNV0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgbSA6IHBhcnNlSXNvKG1hdGNoWzddLCBzaWduKSxcbiAgICAgICAgICAgICAgICBzIDogcGFyc2VJc28obWF0Y2hbOF0sIHNpZ24pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHsvLyBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgZGlmZlJlcyA9IG1vbWVudHNEaWZmZXJlbmNlKGxvY2FsX19jcmVhdGVMb2NhbChkdXJhdGlvbi5mcm9tKSwgbG9jYWxfX2NyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XG5cbiAgICAgICAgICAgIGR1cmF0aW9uID0ge307XG4gICAgICAgICAgICBkdXJhdGlvbi5tcyA9IGRpZmZSZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgZHVyYXRpb24uTSA9IGRpZmZSZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0ID0gbmV3IER1cmF0aW9uKGR1cmF0aW9uKTtcblxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xuICAgICAgICAgICAgcmV0Ll9sb2NhbGUgPSBpbnB1dC5fbG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJc28gKGlucCwgc2lnbikge1xuICAgICAgICAvLyBXZSdkIG5vcm1hbGx5IHVzZSB+fmlucCBmb3IgdGhpcywgYnV0IHVuZm9ydHVuYXRlbHkgaXQgYWxzb1xuICAgICAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cbiAgICAgICAgLy8gaW5wIG1heSBiZSB1bmRlZmluZWQsIHNvIGNhcmVmdWwgY2FsbGluZyByZXBsYWNlIG9uIGl0LlxuICAgICAgICB2YXIgcmVzID0gaW5wICYmIHBhcnNlRmxvYXQoaW5wLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgICAgICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxuICAgICAgICByZXR1cm4gKGlzTmFOKHJlcykgPyAwIDogcmVzKSAqIHNpZ247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzID0ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcblxuICAgICAgICByZXMubW9udGhzID0gb3RoZXIubW9udGgoKSAtIGJhc2UubW9udGgoKSArXG4gICAgICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNSb3VuZCAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4nKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/ICt2YWwgOiB2YWw7XG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVfX2NyZWF0ZUR1cmF0aW9uKHZhbCwgcGVyaW9kKTtcbiAgICAgICAgICAgIGFkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgZHVyLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1pbGxpc2Vjb25kcykge1xuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUobW9tLl9kLnZhbHVlT2YoKSArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgZ2V0X3NldF9fc2V0KG1vbSwgJ0RhdGUnLCBnZXRfc2V0X19nZXQobW9tLCAnRGF0ZScpICsgZGF5cyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9udGhzKSB7XG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldF9zZXRfX2dldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGVPZmZzZXQpIHtcbiAgICAgICAgICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYWRkX3N1YnRyYWN0X19hZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcbiAgICB2YXIgYWRkX3N1YnRyYWN0X19zdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXIgKHRpbWUsIGZvcm1hdHMpIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBjb21wYXJlIHRoZSBzdGFydCBvZiB0b2RheSwgdnMgdGhpcy5cbiAgICAgICAgLy8gR2V0dGluZyBzdGFydC1vZi10b2RheSBkZXBlbmRzIG9uIHdoZXRoZXIgd2UncmUgbG9jYWwvdXRjL29mZnNldCBvciBub3QuXG4gICAgICAgIHZhciBub3cgPSB0aW1lIHx8IGxvY2FsX19jcmVhdGVMb2NhbCgpLFxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXG4gICAgICAgICAgICBkaWZmID0gdGhpcy5kaWZmKHNvZCwgJ2RheXMnLCB0cnVlKSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAtMSA/ICdsYXN0V2VlaycgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDIgPyAnbmV4dERheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdHMgJiYgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKSA/IGZvcm1hdHNbZm9ybWF0XSgpIDogZm9ybWF0c1tmb3JtYXRdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgbG9jYWxfX2NyZWF0ZUxvY2FsKG5vdykpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTW9tZW50KHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQWZ0ZXIgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbG9jYWxfX2NyZWF0ZUxvY2FsKGlucHV0KTtcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyghaXNVbmRlZmluZWQodW5pdHMpID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPiBsb2NhbElucHV0LnZhbHVlT2YoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbElucHV0LnZhbHVlT2YoKSA8IHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JlZm9yZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKCFpc1VuZGVmaW5lZCh1bml0cykgPyB1bml0cyA6ICdtaWxsaXNlY29uZCcpO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cywgaW5jbHVzaXZpdHkpIHtcbiAgICAgICAgaW5jbHVzaXZpdHkgPSBpbmNsdXNpdml0eSB8fCAnKCknO1xuICAgICAgICByZXR1cm4gKGluY2x1c2l2aXR5WzBdID09PSAnKCcgPyB0aGlzLmlzQWZ0ZXIoZnJvbSwgdW5pdHMpIDogIXRoaXMuaXNCZWZvcmUoZnJvbSwgdW5pdHMpKSAmJlxuICAgICAgICAgICAgKGluY2x1c2l2aXR5WzFdID09PSAnKScgPyB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cykgOiAhdGhpcy5pc0FmdGVyKHRvLCB1bml0cykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBsb2NhbF9fY3JlYXRlTG9jYWwoaW5wdXQpLFxuICAgICAgICAgICAgaW5wdXRNcztcbiAgICAgICAgaWYgKCEodGhpcy5pc1ZhbGlkKCkgJiYgbG9jYWxJbnB1dC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyB8fCAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNcyA9IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2FtZShpbnB1dCwgdW5pdHMpIHx8IHRoaXMuaXNBZnRlcihpbnB1dCx1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQmVmb3JlKGlucHV0LHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcbiAgICAgICAgdmFyIHRoYXQsXG4gICAgICAgICAgICB6b25lRGVsdGEsXG4gICAgICAgICAgICBkZWx0YSwgb3V0cHV0O1xuXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICd5ZWFyJyB8fCB1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7XG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAneWVhcicpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgLyAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbHRhID0gdGhpcyAtIHRoYXQ7XG4gICAgICAgICAgICBvdXRwdXQgPSB1bml0cyA9PT0gJ3NlY29uZCcgPyBkZWx0YSAvIDFlMyA6IC8vIDEwMDBcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ21pbnV0ZScgPyBkZWx0YSAvIDZlNCA6IC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnaG91cicgPyBkZWx0YSAvIDM2ZTUgOiAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAgICAgICAgIHVuaXRzID09PSAnZGF5JyA/IChkZWx0YSAtIHpvbmVEZWx0YSkgLyA4NjRlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICB1bml0cyA9PT0gJ3dlZWsnID8gKGRlbHRhIC0gem9uZURlbHRhKSAvIDYwNDhlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICAgICAgZGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFzRmxvYXQgPyBvdXRwdXQgOiBhYnNGbG9vcihvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoRGlmZiAoYSwgYikge1xuICAgICAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXG4gICAgICAgICAgICAvLyBiIGlzIGluIChhbmNob3IgLSAxIG1vbnRoLCBhbmNob3IgKyAxIG1vbnRoKVxuICAgICAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxuICAgICAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xuXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jaGVjayBmb3IgbmVnYXRpdmUgemVybywgcmV0dXJuIHplcm8gaWYgbmVnYXRpdmUgemVyb1xuICAgICAgICByZXR1cm4gLSh3aG9sZU1vbnRoRGlmZiArIGFkanVzdCkgfHwgMDtcbiAgICB9XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXRVdGMgPSAnWVlZWS1NTS1ERFRISDptbTpzc1taXSc7XG5cbiAgICBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZyAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5jbG9uZSgpLnV0YygpO1xuICAgICAgICBpZiAoMCA8IG0ueWVhcigpICYmIG0ueWVhcigpIDw9IDk5OTkpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9EYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXQgKGlucHV0U3RyaW5nKSB7XG4gICAgICAgIGlmICghaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIGlucHV0U3RyaW5nID0gdGhpcy5pc1V0YygpID8gdXRpbHNfaG9va3NfX2hvb2tzLmRlZmF1bHRGb3JtYXRVdGMgOiB1dGlsc19ob29rc19faG9va3MuZGVmYXVsdEZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0cHV0ID0gZm9ybWF0TW9tZW50KHRoaXMsIGlucHV0U3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmcm9tTm93ICh3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyb20obG9jYWxfX2NyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvICh0aW1lLCB3aXRob3V0U3VmZml4KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxuICAgICAgICAgICAgICAgICgoaXNNb21lbnQodGltZSkgJiYgdGltZS5pc1ZhbGlkKCkpIHx8XG4gICAgICAgICAgICAgICAgIGxvY2FsX19jcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlX19jcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy50byhsb2NhbF9fY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgLy8gSWYgcGFzc2VkIGEgbG9jYWxlIGtleSwgaXQgd2lsbCBzZXQgdGhlIGxvY2FsZSBmb3IgdGhpc1xuICAgIC8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cbiAgICAvLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAgZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGxvY2FsZV9sb2NhbGVzX19nZXRMb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChuZXdMb2NhbGVEYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbGUgPSBuZXdMb2NhbGVEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFuZyA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcbiAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVEYXRhICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBzd2l0Y2ggaW50ZW50aW9uYWxseSBvbWl0cyBicmVhayBrZXl3b3Jkc1xuICAgICAgICAvLyB0byB1dGlsaXplIGZhbGxpbmcgdGhyb3VnaCB0aGUgY2FzZXMuXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgdGhpcy5ob3VycygwKTtcbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMoMCk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlZWtzIGFyZSBhIHNwZWNpYWwgY2FzZVxuICAgICAgICBpZiAodW5pdHMgPT09ICd3ZWVrJykge1xuICAgICAgICAgICAgdGhpcy53ZWVrZGF5KDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ2lzb1dlZWsnKSB7XG4gICAgICAgICAgICB0aGlzLmlzb1dlZWtkYXkoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBxdWFydGVycyBhcmUgYWxzbyBzcGVjaWFsXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoKE1hdGguZmxvb3IodGhpcy5tb250aCgpIC8gMykgKiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZE9mICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ2RhdGUnIGlzIGFuIGFsaWFzIGZvciAnZGF5Jywgc28gaXQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYXMgc3VjaC5cbiAgICAgICAgaWYgKHVuaXRzID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHVuaXRzID0gJ2RheSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvX3R5cGVfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZC52YWx1ZU9mKCkgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4ICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ID8gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpIDogdGhpcy5fZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0FycmF5ICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b09iamVjdCAoKSB7XG4gICAgICAgIHZhciBtID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXJzOiBtLnllYXIoKSxcbiAgICAgICAgICAgIG1vbnRoczogbS5tb250aCgpLFxuICAgICAgICAgICAgZGF0ZTogbS5kYXRlKCksXG4gICAgICAgICAgICBob3VyczogbS5ob3VycygpLFxuICAgICAgICAgICAgbWludXRlczogbS5taW51dGVzKCksXG4gICAgICAgICAgICBzZWNvbmRzOiBtLnNlY29uZHMoKSxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogbS5taWxsaXNlY29uZHMoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gICAgICAgIC8vIG5ldyBEYXRlKE5hTikudG9KU09OKCkgPT09IG51bGxcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy50b0lTT1N0cmluZygpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRfdmFsaWRfX2lzVmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRfX2lzVmFsaWQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2luZ0ZsYWdzICgpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpLm92ZXJmbG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0aW9uRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLl9pLFxuICAgICAgICAgICAgZm9ybWF0OiB0aGlzLl9mLFxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXG4gICAgICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXG4gICAgICAgICAgICBzdHJpY3Q6IHRoaXMuX3N0cmljdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnZ2cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydHRycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XG4gICAgICAgIGFkZEZvcm1hdFRva2VuKDAsIFt0b2tlbiwgdG9rZW4ubGVuZ3RoXSwgMCwgZ2V0dGVyKTtcbiAgICB9XG5cbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnJywgICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2dnJywgICAgJ3dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdHR0dHRycsICdpc29XZWVrWWVhcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrWWVhcicsICdnZycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdnJywgICAgICBtYXRjaFNpZ25lZCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdHR0dHJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignZ2dnZycsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnZycsICBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbi5zdWJzdHIoMCwgMildID0gdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydnZycsICdHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB1dGlsc19ob29rc19faG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrKCksXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5KCksXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWsuZG93LFxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPV2Vla1llYXIgKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXG4gICAgICAgICAgICAgICAgaW5wdXQsIHRoaXMuaXNvV2VlaygpLCB0aGlzLmlzb1dlZWtkYXkoKSwgMSwgNCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SVNPV2Vla3NJblllYXIgKCkge1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdlZWtzSW5ZZWFyICgpIHtcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XG4gICAgICAgIHJldHVybiB3ZWVrc0luWWVhcih0aGlzLnllYXIoKSwgd2Vla0luZm8uZG93LCB3ZWVrSW5mby5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFySGVscGVyKGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla3NUYXJnZXQ7XG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gd2Vla09mWWVhcih0aGlzLCBkb3csIGRveSkueWVhcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcbiAgICAgICAgICAgIGlmICh3ZWVrID4gd2Vla3NUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICB3ZWVrID0gd2Vla3NUYXJnZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2V0V2Vla0FsbC5jYWxsKHRoaXMsIGlucHV0LCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXZWVrQWxsKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgZGF0ZSA9IGNyZWF0ZVVUQ0RhdGUoZGF5T2ZZZWFyRGF0YS55ZWFyLCAwLCBkYXlPZlllYXJEYXRhLmRheU9mWWVhcik7XG5cbiAgICAgICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XG4gICAgICAgIHRoaXMubW9udGgoZGF0ZS5nZXRVVENNb250aCgpKTtcbiAgICAgICAgdGhpcy5kYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1EnLCAwLCAnUW8nLCAncXVhcnRlcicpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1EnLCBtYXRjaDEpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W01PTlRIXSA9ICh0b0ludChpbnB1dCkgLSAxKSAqIDM7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3cnLCBbJ3d3JywgMl0sICd3bycsICd3ZWVrJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ1cnLCBbJ1dXJywgMl0sICdXbycsICdpc29XZWVrJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ3dlZWsnLCAndycpO1xuICAgIGFkZFVuaXRBbGlhcygnaXNvV2VlaycsICdXJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCd3JywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignVycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1dXJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWyd3JywgJ3d3JywgJ1cnLCAnV1cnXSwgZnVuY3Rpb24gKGlucHV0LCB3ZWVrLCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHdlZWtbdG9rZW4uc3Vic3RyKDAsIDEpXSA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xuICAgICAgICByZXR1cm4gd2Vla09mWWVhcihtb20sIHRoaXMuX3dlZWsuZG93LCB0aGlzLl93ZWVrLmRveSkud2VlaztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWsgPSB7XG4gICAgICAgIGRvdyA6IDAsIC8vIFN1bmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgICAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG93O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWsuZG95O1xuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XG4gICAgICAgIHZhciB3ZWVrID0gd2Vla09mWWVhcih0aGlzLCAxLCA0KS53ZWVrO1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWsgOiB0aGlzLmFkZCgoaW5wdXQgLSB3ZWVrKSAqIDcsICdkJyk7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RhdGUnLCAnRCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID8gbG9jYWxlLl9vcmRpbmFsUGFyc2UgOiBsb2NhbGUuX29yZGluYWxQYXJzZUxlbmllbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdLCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0RGF5T2ZNb250aCA9IG1ha2VHZXRTZXQoJ0RhdGUnLCB0cnVlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtLCBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fd2Vla2RheXMpID8gdGhpcy5fd2Vla2RheXNbbS5kYXkoKV0gOlxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNbdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20uZGF5KCldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNTaG9ydCAobSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFttLmRheSgpXTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluID0gJ1N1X01vX1R1X1dlX1RoX0ZyX1NhJy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzTWluIChtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlfb2Zfd2Vla19faGFuZGxlU3RyaWN0UGFyc2Uod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBpaSwgbW9tLCBsbGMgPSB3ZWVrZGF5TmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5X29mX3dlZWtfX2hhbmRsZVN0cmljdFBhcnNlLmNhbGwodGhpcywgd2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG5cbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZV91dGNfX2NyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fd2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGRkZCcgJiYgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZCcgJiYgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZCcgJiYgdGhpcy5fbWluV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXkgPSB0aGlzLl9pc1VUQyA/IHRoaXMuX2QuZ2V0VVRDRGF5KCkgOiB0aGlzLl9kLmdldERheSgpO1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChpbnB1dCAtIGRheSwgJ2QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRMb2NhbGVEYXlPZldlZWsgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxuICAgICAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxuICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gdGhpcy5kYXkoKSB8fCA3IDogdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyBpbnB1dCA6IGlucHV0IC0gNyk7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c1JlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIHdlZWtkYXlzUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleCA9IG1hdGNoV29yZDtcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1Nob3J0UmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xuICAgIGZ1bmN0aW9uIHdlZWtkYXlzTWluUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVXZWVrZGF5c1BhcnNlICgpIHtcbiAgICAgICAgZnVuY3Rpb24gY21wTGVuUmV2KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pblBpZWNlcyA9IFtdLCBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLCBtb20sIG1pbnAsIHNob3J0cCwgbG9uZ3A7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICAgICAgbWlucCA9IHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgICAgICBzaG9ydHAgPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJyk7XG4gICAgICAgICAgICBsb25ncCA9IHRoaXMud2Vla2RheXMobW9tLCAnJyk7XG4gICAgICAgICAgICBtaW5QaWVjZXMucHVzaChtaW5wKTtcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKG1pbnApO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChzaG9ydHApO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSB3ZWVrZGF5IChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cbiAgICAgICAgbWluUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgc2hvcnRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbWl4ZWRQaWVjZXMuc29ydChjbXBMZW5SZXYpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobWl4ZWRQaWVjZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaW5QaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2RheU9mWWVhcicsICdEREQnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RERCcsICBtYXRjaDF0bzMpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydEREQnLCAnRERERCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kYXlPZlllYXIgPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XG4gICAgICAgIHZhciBkYXlPZlllYXIgPSBNYXRoLnJvdW5kKCh0aGlzLmNsb25lKCkuc3RhcnRPZignZGF5JykgLSB0aGlzLmNsb25lKCkuc3RhcnRPZigneWVhcicpKSAvIDg2NGU1KSArIDE7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gZGF5T2ZZZWFyIDogdGhpcy5hZGQoKGlucHV0IC0gZGF5T2ZZZWFyKSwgJ2QnKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBoRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24ga0Zvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSB8fCAyNDtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgaEZvcm1hdCk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ2snLCBbJ2trJywgMl0sIDAsIGtGb3JtYXQpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xuICAgIH1cblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2EnLCAgbWF0Y2hNZXJpZGllbSk7XG4gICAgYWRkUmVnZXhUb2tlbignQScsICBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignaCcsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcbiAgICAgICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXG4gICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIGhlIHdhbnRzLiBTbyB0cnlpbmcgdG8gbWFpbnRhaW4gdGhlIHNhbWUgaG91ciAoaW5cbiAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcbiAgICAvLyB0aGlzIHJ1bGUuXG4gICAgdmFyIGdldFNldEhvdXIgPSBtYWtlR2V0U2V0KCdIb3VycycsIHRydWUpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ20nLCBbJ21tJywgMl0sIDAsICdtaW51dGUnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWludXRlJywgJ20nKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ20nLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnbScsICdtbSddLCBNSU5VVEUpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldE1pbnV0ZSA9IG1ha2VHZXRTZXQoJ01pbnV0ZXMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdzZWNvbmQnLCAncycpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3NzJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFBhcnNlVG9rZW4oWydzJywgJ3NzJ10sIFNFQ09ORCk7XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdTJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTAwKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1MnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xuICAgIH0pO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTJywgNF0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1MnLCA1XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTJywgNl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDA7XG4gICAgfSk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTJywgN10sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1MnLCA4XSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZCgpICogMTAwMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTU1NTJywgOV0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDA7XG4gICAgfSk7XG5cblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnbWlsbGlzZWNvbmQnLCAnbXMnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1MnLCAgICBtYXRjaDF0bzMsIG1hdGNoMSk7XG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCAgIG1hdGNoMXRvMywgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG4gICAgdmFyIHRva2VuO1xuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xuICAgIH1cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigneicsICAwLCAwLCAnem9uZUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbiAgICB9XG5cbiAgICB2YXIgbW9tZW50UHJvdG90eXBlX19wcm90byA9IE1vbWVudC5wcm90b3R5cGU7XG5cbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgICAgID0gYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jYWxlbmRhciAgICAgICAgICA9IG1vbWVudF9jYWxlbmRhcl9fY2FsZW5kYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICAgICA9IGdldFNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBtb21lbnRfdmFsaWRfX2lzVmFsaWQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNldCAgICAgICAgICAgICAgID0gZ2V0U2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBhZGRfc3VidHJhY3RfX3N1YnRyYWN0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9BcnJheSAgICAgICAgICAgPSB0b0FycmF5O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9PYmplY3QgICAgICAgICAgPSB0b09iamVjdDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvRGF0ZSAgICAgICAgICAgID0gdG9EYXRlO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9JU09TdHJpbmcgICAgICAgPSBtb21lbnRfZm9ybWF0X190b0lTT1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgICAgID0gdG9KU09OO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgICAgPSB0b1N0cmluZztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnVuaXggICAgICAgICAgICAgID0gdW5peDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnZhbHVlT2YgICAgICAgICAgID0gdG9fdHlwZV9fdmFsdWVPZjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmNyZWF0aW9uRGF0YSAgICAgID0gY3JlYXRpb25EYXRhO1xuXG4gICAgLy8gWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0xlYXBZZWFyID0gZ2V0SXNMZWFwWWVhcjtcblxuICAgIC8vIFdlZWsgWWVhclxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtZZWFyID0gZ2V0U2V0SVNPV2Vla1llYXI7XG5cbiAgICAvLyBRdWFydGVyXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVyID0gbW9tZW50UHJvdG90eXBlX19wcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG5cbiAgICAvLyBNb250aFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGggICAgICAgPSBnZXRTZXRNb250aDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGg7XG5cbiAgICAvLyBXZWVrXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by53ZWVrICAgICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWsgICAgICAgID0gbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrcyAgICAgPSBnZXRTZXRJU09XZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzb1dlZWtzSW5ZZWFyID0gZ2V0SVNPV2Vla3NJblllYXI7XG5cbiAgICAvLyBEYXlcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmRhdGUgICAgICAgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5ICAgICAgICA9IG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcblxuICAgIC8vIEhvdXJcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXIgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmhvdXJzID0gZ2V0U2V0SG91cjtcblxuICAgIC8vIE1pbnV0ZVxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWludXRlID0gbW9tZW50UHJvdG90eXBlX19wcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xuXG4gICAgLy8gU2Vjb25kXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5zZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnNlY29uZHMgPSBnZXRTZXRTZWNvbmQ7XG5cbiAgICAvLyBNaWxsaXNlY29uZFxuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmQgPSBtb21lbnRQcm90b3R5cGVfX3Byb3RvLm1pbGxpc2Vjb25kcyA9IGdldFNldE1pbGxpc2Vjb25kO1xuXG4gICAgLy8gT2Zmc2V0XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by51dGNPZmZzZXQgICAgICAgICAgICA9IGdldFNldE9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnV0YyAgICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9VVEM7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5wYXJzZVpvbmUgICAgICAgICAgICA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc0RTVFNoaWZ0ZWQgICAgICAgICA9IGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzTG9jYWwgICAgICAgICAgICAgID0gaXNMb2NhbDtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by5pc1V0YyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uaXNVVEMgICAgICAgICAgICAgICAgPSBpc1V0YztcblxuICAgIC8vIFRpbWV6b25lXG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcblxuICAgIC8vIERlcHJlY2F0aW9uc1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8uZGF0ZXMgID0gZGVwcmVjYXRlKCdkYXRlcyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgZGF0ZSBpbnN0ZWFkLicsIGdldFNldERheU9mTW9udGgpO1xuICAgIG1vbWVudFByb3RvdHlwZV9fcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG4gICAgbW9tZW50UHJvdG90eXBlX19wcm90by55ZWFycyAgPSBkZXByZWNhdGUoJ3llYXJzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSB5ZWFyIGluc3RlYWQnLCBnZXRTZXRZZWFyKTtcbiAgICBtb21lbnRQcm90b3R5cGVfX3Byb3RvLnpvbmUgICA9IGRlcHJlY2F0ZSgnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNzc5JywgZ2V0U2V0Wm9uZSk7XG5cbiAgICB2YXIgbW9tZW50UHJvdG90eXBlID0gbW9tZW50UHJvdG90eXBlX19wcm90bztcblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlVW5peCAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbChpbnB1dCAqIDEwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbWVudF9fY3JlYXRlSW5ab25lICgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsX19jcmVhdGVMb2NhbC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhcnNlWm9uZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXG4gICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgICAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcbiAgICAgICAgc2FtZUVsc2UgOiAnTCdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhciAoa2V5LCBtb20sIG5vdykge1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fY2FsZW5kYXJba2V5XTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KSA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xuICAgICAgICBMVFMgIDogJ2g6bW06c3MgQScsXG4gICAgICAgIExUICAgOiAnaDptbSBBJyxcbiAgICAgICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgTEwgICA6ICdNTU1NIEQsIFlZWVknLFxuICAgICAgICBMTEwgIDogJ01NTU0gRCwgWVlZWSBoOm1tIEEnLFxuICAgICAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGxvbmdEYXRlRm9ybWF0IChrZXkpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0sXG4gICAgICAgICAgICBmb3JtYXRVcHBlciA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleS50b1VwcGVyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoZm9ybWF0IHx8ICFmb3JtYXRVcHBlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV0gPSBmb3JtYXRVcHBlci5yZXBsYWNlKC9NTU1NfE1NfEREfGRkZGQvZywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xuXG4gICAgZnVuY3Rpb24gaW52YWxpZERhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcbiAgICB2YXIgZGVmYXVsdE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XG5cbiAgICBmdW5jdGlvbiBvcmRpbmFsIChudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZVBhcnNlUG9zdEZvcm1hdCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXG4gICAgICAgIHBhc3QgICA6ICclcyBhZ28nLFxuICAgICAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgbSAgOiAnYSBtaW51dGUnLFxuICAgICAgICBtbSA6ICclZCBtaW51dGVzJyxcbiAgICAgICAgaCAgOiAnYW4gaG91cicsXG4gICAgICAgIGhoIDogJyVkIGhvdXJzJyxcbiAgICAgICAgZCAgOiAnYSBkYXknLFxuICAgICAgICBkZCA6ICclZCBkYXlzJyxcbiAgICAgICAgTSAgOiAnYSBtb250aCcsXG4gICAgICAgIE1NIDogJyVkIG1vbnRocycsXG4gICAgICAgIHkgIDogJ2EgeWVhcicsXG4gICAgICAgIHl5IDogJyVkIHllYXJzJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWxhdGl2ZV9fcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xuICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xuICAgICAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxuICAgICAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGZvcm1hdCkgPyBmb3JtYXQob3V0cHV0KSA6IGZvcm1hdC5yZXBsYWNlKC8lcy9pLCBvdXRwdXQpO1xuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGVfX3Byb3RvID0gTG9jYWxlLnByb3RvdHlwZTtcblxuICAgIHByb3RvdHlwZV9fcHJvdG8uX2NhbGVuZGFyICAgICAgID0gZGVmYXVsdENhbGVuZGFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uY2FsZW5kYXIgICAgICAgID0gbG9jYWxlX2NhbGVuZGFyX19jYWxlbmRhcjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9sb25nRGF0ZUZvcm1hdCA9IGRlZmF1bHRMb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLmxvbmdEYXRlRm9ybWF0ICA9IGxvbmdEYXRlRm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX2ludmFsaWREYXRlICAgID0gZGVmYXVsdEludmFsaWREYXRlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uaW52YWxpZERhdGUgICAgID0gaW52YWxpZERhdGU7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbCAgICAgICAgPSBkZWZhdWx0T3JkaW5hbDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLm9yZGluYWwgICAgICAgICA9IG9yZGluYWw7XG4gICAgcHJvdG90eXBlX19wcm90by5fb3JkaW5hbFBhcnNlICAgPSBkZWZhdWx0T3JkaW5hbFBhcnNlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucHJlcGFyc2UgICAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ucG9zdGZvcm1hdCAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3JlbGF0aXZlVGltZSAgID0gZGVmYXVsdFJlbGF0aXZlVGltZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlX19yZWxhdGl2ZVRpbWU7XG4gICAgcHJvdG90eXBlX19wcm90by5wYXN0RnV0dXJlICAgICAgPSBwYXN0RnV0dXJlO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uc2V0ICAgICAgICAgICAgID0gbG9jYWxlX3NldF9fc2V0O1xuXG4gICAgLy8gTW9udGhcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRocztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHMgICAgICAgICAgID0gZGVmYXVsdExvY2FsZU1vbnRocztcbiAgICBwcm90b3R5cGVfX3Byb3RvLm1vbnRoc1Nob3J0ICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX21vbnRoc1Nob3J0ICAgICAgPSBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNQYXJzZSAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNQYXJzZTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNSZWdleCAgICAgID0gZGVmYXVsdE1vbnRoc1JlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ubW9udGhzUmVnZXggICAgICAgPSBtb250aHNSZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tb250aHNTaG9ydFJlZ2V4ID0gZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXg7XG4gICAgcHJvdG90eXBlX19wcm90by5tb250aHNTaG9ydFJlZ2V4ICA9IG1vbnRoc1Nob3J0UmVnZXg7XG5cbiAgICAvLyBXZWVrXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrID0gbG9jYWxlV2VlaztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrID0gZGVmYXVsdExvY2FsZVdlZWs7XG4gICAgcHJvdG90eXBlX19wcm90by5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xuICAgIHByb3RvdHlwZV9fcHJvdG8uZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuICAgIC8vIERheSBvZiBXZWVrXG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5cyAgICAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5cztcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5cyAgICAgID0gZGVmYXVsdExvY2FsZVdlZWtkYXlzO1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNNaW4gICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNNaW47XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNNaW4gICA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbjtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzU2hvcnQgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG90eXBlX19wcm90by5fd2Vla2RheXNTaG9ydCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNQYXJzZSAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNQYXJzZTtcblxuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzUmVnZXggICAgICA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8ud2Vla2RheXNSZWdleCAgICAgICA9ICAgICAgICB3ZWVrZGF5c1JlZ2V4O1xuICAgIHByb3RvdHlwZV9fcHJvdG8uX3dlZWtkYXlzU2hvcnRSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXg7XG4gICAgcHJvdG90eXBlX19wcm90by53ZWVrZGF5c1Nob3J0UmVnZXggID0gICAgICAgIHdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl93ZWVrZGF5c01pblJlZ2V4ICAgPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcbiAgICBwcm90b3R5cGVfX3Byb3RvLndlZWtkYXlzTWluUmVnZXggICAgPSAgICAgICAgd2Vla2RheXNNaW5SZWdleDtcblxuICAgIC8vIEhvdXJzXG4gICAgcHJvdG90eXBlX19wcm90by5pc1BNID0gbG9jYWxlSXNQTTtcbiAgICBwcm90b3R5cGVfX3Byb3RvLl9tZXJpZGllbVBhcnNlID0gZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2U7XG4gICAgcHJvdG90eXBlX19wcm90by5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2dldCAoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xuICAgICAgICB2YXIgbG9jYWxlID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSgpO1xuICAgICAgICB2YXIgdXRjID0gY3JlYXRlX3V0Y19fY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlW2ZpZWxkXSh1dGMsIGZvcm1hdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRoc0ltcGwgKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0c19fZ2V0KGZvcm1hdCwgaW5kZXgsIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgaSwgZmllbGQsICdtb250aCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLy8gKClcbiAgICAvLyAoNSlcbiAgICAvLyAoZm10LCA1KVxuICAgIC8vIChmbXQpXG4gICAgLy8gKHRydWUpXG4gICAgLy8gKHRydWUsIDUpXG4gICAgLy8gKHRydWUsIGZtdCwgNSlcbiAgICAvLyAodHJ1ZSwgZm10KVxuICAgIGZ1bmN0aW9uIGxpc3RXZWVrZGF5c0ltcGwgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhbGVTb3J0ZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGxvY2FsZVNvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2NhbGUgPSBsb2NhbGVfbG9jYWxlc19fZ2V0TG9jYWxlKCksXG4gICAgICAgICAgICBzaGlmdCA9IGxvY2FsZVNvcnRlZCA/IGxvY2FsZS5fd2Vlay5kb3cgOiAwO1xuXG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdHNfX2dldChmb3JtYXQsIChpbmRleCArIHNoaWZ0KSAlIDcsIGZpZWxkLCAnZGF5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBsaXN0c19fZ2V0KGZvcm1hdCwgKGkgKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RNb250aHMgKGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RNb250aHNJbXBsKGZvcm1hdCwgaW5kZXgsICdtb250aHMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdE1vbnRoc1Nob3J0IChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0c19fbGlzdFdlZWtkYXlzU2hvcnQgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdHNfX2xpc3RXZWVrZGF5c01pbiAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJyk7XG4gICAgfVxuXG4gICAgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgICAgIG9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KHRofHN0fG5kfHJkKS8sXG4gICAgICAgIG9yZGluYWwgOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwLFxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICh0b0ludChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDEpID8gJ3N0JyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDIpID8gJ25kJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XG4gICAgICAgICAgICByZXR1cm4gbnVtYmVyICsgb3V0cHV0O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmcgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZSk7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZSk7XG5cbiAgICB2YXIgbWF0aEFicyA9IE1hdGguYWJzO1xuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWJzX19hYnMgKCkge1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xuXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9IG1hdGhBYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5fZGF5cyAgICAgICAgID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcbiAgICAgICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICAgPSBtYXRoQWJzKGRhdGEuc2Vjb25kcyk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcbiAgICAgICAgZGF0YS5tb250aHMgICAgICAgID0gbWF0aEFicyhkYXRhLm1vbnRocyk7XG4gICAgICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGRTdWJ0cmFjdCAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24oaW5wdXQsIHZhbHVlKTtcblxuICAgICAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XG4gICAgICAgIGR1cmF0aW9uLl9kYXlzICAgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX2RheXM7XG4gICAgICAgIGR1cmF0aW9uLl9tb250aHMgICAgICAgKz0gZGlyZWN0aW9uICogb3RoZXIuX21vbnRocztcblxuICAgICAgICByZXR1cm4gZHVyYXRpb24uX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIGFkZCgxLCAncycpIG9yIGFkZChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZCAoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX2FkZFN1YnRyYWN0KHRoaXMsIGlucHV0LCB2YWx1ZSwgMSk7XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9hZGRfc3VidHJhY3RfX3N1YnRyYWN0IChpbnB1dCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fYWRkU3VidHJhY3QodGhpcywgaW5wdXQsIHZhbHVlLCAtMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJzQ2VpbCAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnViYmxlICgpIHtcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IHRoaXMuX2RheXM7XG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSB0aGlzLl9tb250aHM7XG4gICAgICAgIHZhciBkYXRhICAgICAgICAgPSB0aGlzLl9kYXRhO1xuICAgICAgICB2YXIgc2Vjb25kcywgbWludXRlcywgaG91cnMsIHllYXJzLCBtb250aHNGcm9tRGF5cztcblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbWl4IG9mIHBvc2l0aXZlIGFuZCBuZWdhdGl2ZSB2YWx1ZXMsIGJ1YmJsZSBkb3duIGZpcnN0XG4gICAgICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxuICAgICAgICBpZiAoISgobWlsbGlzZWNvbmRzID49IDAgJiYgZGF5cyA+PSAwICYmIG1vbnRocyA+PSAwKSB8fFxuICAgICAgICAgICAgICAgIChtaWxsaXNlY29uZHMgPD0gMCAmJiBkYXlzIDw9IDAgJiYgbW9udGhzIDw9IDApKSkge1xuICAgICAgICAgICAgbWlsbGlzZWNvbmRzICs9IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRocykgKyBkYXlzKSAqIDg2NGU1O1xuICAgICAgICAgICAgZGF5cyA9IDA7XG4gICAgICAgICAgICBtb250aHMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIGJ1YmJsZXMgdXAgdmFsdWVzLCBzZWUgdGhlIHRlc3RzIGZvclxuICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzID0gbWlsbGlzZWNvbmRzICUgMTAwMDtcblxuICAgICAgICBzZWNvbmRzICAgICAgICAgICA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICA9IHNlY29uZHMgJSA2MDtcblxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgID0gbWludXRlcyAlIDYwO1xuXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgPSBob3VycyAlIDI0O1xuXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XG5cbiAgICAgICAgLy8gY29udmVydCBkYXlzIHRvIG1vbnRoc1xuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XG4gICAgICAgIG1vbnRocyArPSBtb250aHNGcm9tRGF5cztcbiAgICAgICAgZGF5cyAtPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHNGcm9tRGF5cykpO1xuXG4gICAgICAgIC8vIDEyIG1vbnRocyAtPiAxIHllYXJcbiAgICAgICAgeWVhcnMgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuICAgICAgICBkYXRhLmRheXMgICA9IGRheXM7XG4gICAgICAgIGRhdGEubW9udGhzID0gbW9udGhzO1xuICAgICAgICBkYXRhLnllYXJzICA9IHllYXJzO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDEyIG1vbnRocyA9PT0gNDgwMFxuICAgICAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9udGhzVG9EYXlzIChtb250aHMpIHtcbiAgICAgICAgLy8gdGhlIHJldmVyc2Ugb2YgZGF5c1RvTW9udGhzXG4gICAgICAgIHJldHVybiBtb250aHMgKiAxNDYwOTcgLyA0ODAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzICh1bml0cykge1xuICAgICAgICB2YXIgZGF5cztcbiAgICAgICAgdmFyIG1vbnRocztcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgZGF5cyAgID0gdGhpcy5fZGF5cyAgICsgbWlsbGlzZWNvbmRzIC8gODY0ZTU7XG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMgKyBkYXlzVG9Nb250aHMoZGF5cyk7XG4gICAgICAgICAgICByZXR1cm4gdW5pdHMgPT09ICdtb250aCcgPyBtb250aHMgOiBtb250aHMgLyAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcbiAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzICsgTWF0aC5yb3VuZChtb250aHNUb0RheXModGhpcy5fbW9udGhzKSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2VlaycgICA6IHJldHVybiBkYXlzIC8gNyAgICAgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGF5JyAgICA6IHJldHVybiBkYXlzICAgICAgICAgKyBtaWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdob3VyJyAgIDogcmV0dXJuIGRheXMgKiAyNCAgICArIG1pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJyA6IHJldHVybiBkYXlzICogMTQ0MCAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJyA6IHJldHVybiBkYXlzICogODY0MDAgKyBtaWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgICAgIC8vIE1hdGguZmxvb3IgcHJldmVudHMgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgaGVyZVxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzogcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XG4gICAgZnVuY3Rpb24gZHVyYXRpb25fYXNfX3ZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHRoaXMuX2RheXMgKiA4NjRlNSArXG4gICAgICAgICAgICAodGhpcy5fbW9udGhzICUgMTIpICogMjU5MmU2ICtcbiAgICAgICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQXMgKGFsaWFzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFzTWlsbGlzZWNvbmRzID0gbWFrZUFzKCdtcycpO1xuICAgIHZhciBhc1NlY29uZHMgICAgICA9IG1ha2VBcygncycpO1xuICAgIHZhciBhc01pbnV0ZXMgICAgICA9IG1ha2VBcygnbScpO1xuICAgIHZhciBhc0hvdXJzICAgICAgICA9IG1ha2VBcygnaCcpO1xuICAgIHZhciBhc0RheXMgICAgICAgICA9IG1ha2VBcygnZCcpO1xuICAgIHZhciBhc1dlZWtzICAgICAgICA9IG1ha2VBcygndycpO1xuICAgIHZhciBhc01vbnRocyAgICAgICA9IG1ha2VBcygnTScpO1xuICAgIHZhciBhc1llYXJzICAgICAgICA9IG1ha2VBcygneScpO1xuXG4gICAgZnVuY3Rpb24gZHVyYXRpb25fZ2V0X19nZXQgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICByZXR1cm4gdGhpc1t1bml0cyArICdzJ10oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhW25hbWVdO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBtaWxsaXNlY29uZHMgPSBtYWtlR2V0dGVyKCdtaWxsaXNlY29uZHMnKTtcbiAgICB2YXIgc2Vjb25kcyAgICAgID0gbWFrZUdldHRlcignc2Vjb25kcycpO1xuICAgIHZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XG4gICAgdmFyIGhvdXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ2hvdXJzJyk7XG4gICAgdmFyIGRheXMgICAgICAgICA9IG1ha2VHZXR0ZXIoJ2RheXMnKTtcbiAgICB2YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XG4gICAgdmFyIHllYXJzICAgICAgICA9IG1ha2VHZXR0ZXIoJ3llYXJzJyk7XG5cbiAgICBmdW5jdGlvbiB3ZWVrcyAoKSB7XG4gICAgICAgIHJldHVybiBhYnNGbG9vcih0aGlzLmRheXMoKSAvIDcpO1xuICAgIH1cblxuICAgIHZhciByb3VuZCA9IE1hdGgucm91bmQ7XG4gICAgdmFyIHRocmVzaG9sZHMgPSB7XG4gICAgICAgIHM6IDQ1LCAgLy8gc2Vjb25kcyB0byBtaW51dGVcbiAgICAgICAgbTogNDUsICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICAgICAgaDogMjIsICAvLyBob3VycyB0byBkYXlcbiAgICAgICAgZDogMjYsICAvLyBkYXlzIHRvIG1vbnRoXG4gICAgICAgIE06IDExICAgLy8gbW9udGhzIHRvIHllYXJcbiAgICB9O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIGZvciBtb21lbnQuZm4uZnJvbSwgbW9tZW50LmZuLmZyb21Ob3csIGFuZCBtb21lbnQuZHVyYXRpb24uZm4uaHVtYW5pemVcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLnJlbGF0aXZlVGltZShudW1iZXIgfHwgMSwgISF3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xuICAgICAgICB2YXIgc2Vjb25kcyAgPSByb3VuZChkdXJhdGlvbi5hcygncycpKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgID0gcm91bmQoZHVyYXRpb24uYXMoJ20nKSk7XG4gICAgICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xuICAgICAgICB2YXIgZGF5cyAgICAgPSByb3VuZChkdXJhdGlvbi5hcygnZCcpKTtcbiAgICAgICAgdmFyIG1vbnRocyAgID0gcm91bmQoZHVyYXRpb24uYXMoJ00nKSk7XG4gICAgICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xuXG4gICAgICAgIHZhciBhID0gc2Vjb25kcyA8IHRocmVzaG9sZHMucyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcbiAgICAgICAgICAgICAgICBtaW51dGVzIDw9IDEgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gJiYgWydtbScsIG1pbnV0ZXNdIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgICA8PSAxICAgICAgICAgICAmJiBbJ2gnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBob3VycyAgIDwgdGhyZXNob2xkcy5oICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgICAgIGRheXMgICAgPD0gMSAgICAgICAgICAgJiYgWydkJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgZGF5cyAgICA8IHRocmVzaG9sZHMuZCAmJiBbJ2RkJywgZGF5c10gICAgfHxcbiAgICAgICAgICAgICAgICBtb250aHMgIDw9IDEgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gJiYgWydNTScsIG1vbnRoc10gIHx8XG4gICAgICAgICAgICAgICAgeWVhcnMgICA8PSAxICAgICAgICAgICAmJiBbJ3knXSAgICAgICAgICAgfHwgWyd5eScsIHllYXJzXTtcblxuICAgICAgICBhWzJdID0gd2l0aG91dFN1ZmZpeDtcbiAgICAgICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgICAgIGFbNF0gPSBsb2NhbGU7XG4gICAgICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseShudWxsLCBhKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2V0IGEgdGhyZXNob2xkIGZvciByZWxhdGl2ZSB0aW1lIHN0cmluZ3NcbiAgICBmdW5jdGlvbiBkdXJhdGlvbl9odW1hbml6ZV9fZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBodW1hbml6ZSAod2l0aFN1ZmZpeCkge1xuICAgICAgICB2YXIgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIHZhciBvdXRwdXQgPSBkdXJhdGlvbl9odW1hbml6ZV9fcmVsYXRpdmVUaW1lKHRoaXMsICF3aXRoU3VmZml4LCBsb2NhbGUpO1xuXG4gICAgICAgIGlmICh3aXRoU3VmZml4KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBsb2NhbGUucGFzdEZ1dHVyZSgrdGhpcywgb3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsb2NhbGUucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIHZhciBpc29fc3RyaW5nX19hYnMgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nKCkge1xuICAgICAgICAvLyBmb3IgSVNPIHN0cmluZ3Mgd2UgZG8gbm90IHVzZSB0aGUgbm9ybWFsIGJ1YmJsaW5nIHJ1bGVzOlxuICAgICAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXG4gICAgICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcbiAgICAgICAgLy8gICogbW9udGhzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSB5ZWFyc1xuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xuICAgICAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcbiAgICAgICAgLy8gYW5kIGFsc28gbm90IGJldHdlZW4gZGF5cyBhbmQgbW9udGhzICgyOC0zMSBkYXlzIHBlciBtb250aClcbiAgICAgICAgdmFyIHNlY29uZHMgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbWlsbGlzZWNvbmRzKSAvIDEwMDA7XG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fZGF5cyk7XG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSBpc29fc3RyaW5nX19hYnModGhpcy5fbW9udGhzKTtcbiAgICAgICAgdmFyIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycztcblxuICAgICAgICAvLyAzNjAwIHNlY29uZHMgLT4gNjAgbWludXRlcyAtPiAxIGhvdXJcbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIHNlY29uZHMgJT0gNjA7XG4gICAgICAgIG1pbnV0ZXMgJT0gNjA7XG5cbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICB5ZWFycyAgPSBhYnNGbG9vcihtb250aHMgLyAxMik7XG4gICAgICAgIG1vbnRocyAlPSAxMjtcblxuXG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgIHZhciBZID0geWVhcnM7XG4gICAgICAgIHZhciBNID0gbW9udGhzO1xuICAgICAgICB2YXIgRCA9IGRheXM7XG4gICAgICAgIHZhciBoID0gaG91cnM7XG4gICAgICAgIHZhciBtID0gbWludXRlcztcbiAgICAgICAgdmFyIHMgPSBzZWNvbmRzO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAodG90YWwgPCAwID8gJy0nIDogJycpICtcbiAgICAgICAgICAgICdQJyArXG4gICAgICAgICAgICAoWSA/IFkgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKE0gPyBNICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChEID8gRCArICdEJyA6ICcnKSArXG4gICAgICAgICAgICAoKGggfHwgbSB8fCBzKSA/ICdUJyA6ICcnKSArXG4gICAgICAgICAgICAoaCA/IGggKyAnSCcgOiAnJykgK1xuICAgICAgICAgICAgKG0gPyBtICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChzID8gcyArICdTJyA6ICcnKTtcbiAgICB9XG5cbiAgICB2YXIgZHVyYXRpb25fcHJvdG90eXBlX19wcm90byA9IER1cmF0aW9uLnByb3RvdHlwZTtcblxuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYWJzICAgICAgICAgICAgPSBkdXJhdGlvbl9hYnNfX2FicztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFkZCAgICAgICAgICAgID0gZHVyYXRpb25fYWRkX3N1YnRyYWN0X19hZGQ7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zdWJ0cmFjdCAgICAgICA9IGR1cmF0aW9uX2FkZF9zdWJ0cmFjdF9fc3VidHJhY3Q7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hcyAgICAgICAgICAgICA9IGFzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzU2Vjb25kcyAgICAgID0gYXNTZWNvbmRzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uYXNNaW51dGVzICAgICAgPSBhc01pbnV0ZXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc0RheXMgICAgICAgICA9IGFzRGF5cztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzV2Vla3MgICAgICAgID0gYXNXZWVrcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5hc1llYXJzICAgICAgICA9IGFzWWVhcnM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by52YWx1ZU9mICAgICAgICA9IGR1cmF0aW9uX2FzX192YWx1ZU9mO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uX2J1YmJsZSAgICAgICAgPSBidWJibGU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5nZXQgICAgICAgICAgICA9IGR1cmF0aW9uX2dldF9fZ2V0O1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubWlsbGlzZWNvbmRzICAgPSBtaWxsaXNlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5ob3VycyAgICAgICAgICA9IGhvdXJzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8uZGF5cyAgICAgICAgICAgPSBkYXlzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ud2Vla3MgICAgICAgICAgPSB3ZWVrcztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLm1vbnRocyAgICAgICAgID0gbW9udGhzO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ueWVhcnMgICAgICAgICAgPSB5ZWFycztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by50b0lTT1N0cmluZyAgICA9IGlzb19zdHJpbmdfX3RvSVNPU3RyaW5nO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9TdHJpbmcgICAgICAgPSBpc29fc3RyaW5nX190b0lTT1N0cmluZztcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLnRvSlNPTiAgICAgICAgID0gaXNvX3N0cmluZ19fdG9JU09TdHJpbmc7XG4gICAgZHVyYXRpb25fcHJvdG90eXBlX19wcm90by5sb2NhbGUgICAgICAgICA9IGxvY2FsZTtcbiAgICBkdXJhdGlvbl9wcm90b3R5cGVfX3Byb3RvLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcblxuICAgIC8vIERlcHJlY2F0aW9uc1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8udG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoJ3RvSXNvU3RyaW5nKCkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0b0lTT1N0cmluZygpIGluc3RlYWQgKG5vdGljZSB0aGUgY2FwaXRhbHMpJywgaXNvX3N0cmluZ19fdG9JU09TdHJpbmcpO1xuICAgIGR1cmF0aW9uX3Byb3RvdHlwZV9fcHJvdG8ubGFuZyA9IGxhbmc7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignWCcsIDAsIDAsICd1bml4Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ3gnLCAwLCAwLCAndmFsdWVPZicpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdYJywgbWF0Y2hUaW1lc3RhbXApO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbigneCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xuICAgIH0pO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG5cbiAgICB1dGlsc19ob29rc19faG9va3MudmVyc2lvbiA9ICcyLjEzLjAnO1xuXG4gICAgc2V0SG9va0NhbGxiYWNrKGxvY2FsX19jcmVhdGVMb2NhbCk7XG5cbiAgICB1dGlsc19ob29rc19faG9va3MuZm4gICAgICAgICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5taW4gICAgICAgICAgICAgICAgICAgPSBtaW47XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLm1heCAgICAgICAgICAgICAgICAgICA9IG1heDtcbiAgICB1dGlsc19ob29rc19faG9va3Mubm93ICAgICAgICAgICAgICAgICAgID0gbm93O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVfdXRjX19jcmVhdGVVVEM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLnVuaXggICAgICAgICAgICAgICAgICA9IG1vbWVudF9fY3JlYXRlVW5peDtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzICAgICAgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHM7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlICAgICAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldFNldEdsb2JhbExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gdmFsaWRfX2NyZWF0ZUludmFsaWQ7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmR1cmF0aW9uICAgICAgICAgICAgICA9IGNyZWF0ZV9fY3JlYXRlRHVyYXRpb247XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmlzTW9tZW50ICAgICAgICAgICAgICA9IGlzTW9tZW50O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0c19fbGlzdFdlZWtkYXlzO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5wYXJzZVpvbmUgICAgICAgICAgICAgPSBtb21lbnRfX2NyZWF0ZUluWm9uZTtcbiAgICB1dGlsc19ob29rc19faG9va3MubG9jYWxlRGF0YSAgICAgICAgICAgID0gbG9jYWxlX2xvY2FsZXNfX2dldExvY2FsZTtcbiAgICB1dGlsc19ob29rc19faG9va3MuaXNEdXJhdGlvbiAgICAgICAgICAgID0gaXNEdXJhdGlvbjtcbiAgICB1dGlsc19ob29rc19faG9va3MubW9udGhzU2hvcnQgICAgICAgICAgID0gbGlzdHNfX2xpc3RNb250aHNTaG9ydDtcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNNaW4gICAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c01pbjtcbiAgICB1dGlsc19ob29rc19faG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy51cGRhdGVMb2NhbGUgICAgICAgICAgPSB1cGRhdGVMb2NhbGU7XG4gICAgdXRpbHNfaG9va3NfX2hvb2tzLmxvY2FsZXMgICAgICAgICAgICAgICA9IGxvY2FsZV9sb2NhbGVzX19saXN0TG9jYWxlcztcbiAgICB1dGlsc19ob29rc19faG9va3Mud2Vla2RheXNTaG9ydCAgICAgICAgID0gbGlzdHNfX2xpc3RXZWVrZGF5c1Nob3J0O1xuICAgIHV0aWxzX2hvb2tzX19ob29rcy5ub3JtYWxpemVVbml0cyAgICAgICAgPSBub3JtYWxpemVVbml0cztcbiAgICB1dGlsc19ob29rc19faG9va3MucmVsYXRpdmVUaW1lVGhyZXNob2xkID0gZHVyYXRpb25faHVtYW5pemVfX2dldFNldFJlbGF0aXZlVGltZVRocmVzaG9sZDtcbiAgICB1dGlsc19ob29rc19faG9va3MucHJvdG90eXBlICAgICAgICAgICAgID0gbW9tZW50UHJvdG90eXBlO1xuXG4gICAgdmFyIF9tb21lbnQgPSB1dGlsc19ob29rc19faG9va3M7XG5cbiAgICByZXR1cm4gX21vbWVudDtcblxufSkpO1xufSx7fV0sMzc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgX2RlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxudmFyIF9kZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVlcEVxdWFsKTtcblxuZnVuY3Rpb24gaW50ZXJzZWN0cyhhcnJheTEsIGFycmF5Mikge1xuICByZXR1cm4gISEoYXJyYXkxICYmIGFycmF5MiAmJiBhcnJheTEuc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiB+YXJyYXkyLmluZGV4T2YoaXRlbSk7XG4gIH0pKTtcbn1cblxudmFyIExhenlDYWNoZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExhenlDYWNoZShjb21wb25lbnQsIGNhbGN1bGF0b3JzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMYXp5Q2FjaGUpO1xuXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgdGhpcy5hbGxQcm9wcyA9IFtdO1xuICAgIHRoaXMuY2FjaGUgPSBPYmplY3Qua2V5cyhjYWxjdWxhdG9ycykucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwga2V5KSB7XG4gICAgICB2YXIgX2V4dGVuZHMyO1xuXG4gICAgICB2YXIgY2FsY3VsYXRvciA9IGNhbGN1bGF0b3JzW2tleV07XG4gICAgICB2YXIgZm4gPSBjYWxjdWxhdG9yLmZuO1xuICAgICAgdmFyIHBhcmFtTmFtZXMgPSBjYWxjdWxhdG9yLnBhcmFtcztcbiAgICAgIHBhcmFtTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgaWYgKCEgfl90aGlzLmFsbFByb3BzLmluZGV4T2YocGFyYW0pKSB7XG4gICAgICAgICAgX3RoaXMuYWxsUHJvcHMucHVzaChwYXJhbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBhY2N1bXVsYXRvciwgKF9leHRlbmRzMiA9IHt9LCBfZXh0ZW5kczJba2V5XSA9IHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJvcHM6IHBhcmFtTmFtZXMsXG4gICAgICAgIGZuOiBmblxuICAgICAgfSwgX2V4dGVuZHMyKSk7XG4gICAgfSwge30pO1xuICB9XG5cbiAgTGF6eUNhY2hlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50O1xuICAgIHZhciBfY2FjaGUka2V5ID0gdGhpcy5jYWNoZVtrZXldO1xuICAgIHZhciB2YWx1ZSA9IF9jYWNoZSRrZXkudmFsdWU7XG4gICAgdmFyIGZuID0gX2NhY2hlJGtleS5mbjtcbiAgICB2YXIgcHJvcHMgPSBfY2FjaGUka2V5LnByb3BzO1xuXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdmFyIHBhcmFtcyA9IHByb3BzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcmV0dXJuIGNvbXBvbmVudC5wcm9wc1twcm9wXTtcbiAgICB9KTtcbiAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodW5kZWZpbmVkLCBwYXJhbXMpO1xuICAgIHRoaXMuY2FjaGVba2V5XS52YWx1ZSA9IHJlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIExhenlDYWNoZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnQ7XG5cbiAgICB2YXIgZGlmZlByb3BzID0gW107XG4gICAgdGhpcy5hbGxQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAoIV9kZWVwRXF1YWwyWydkZWZhdWx0J10oY29tcG9uZW50LnByb3BzW3Byb3BdLCBuZXh0UHJvcHNbcHJvcF0pKSB7XG4gICAgICAgIGRpZmZQcm9wcy5wdXNoKHByb3ApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChkaWZmUHJvcHMubGVuZ3RoKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNhY2hlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGludGVyc2VjdHMoZGlmZlByb3BzLCBfdGhpczIuY2FjaGVba2V5XS5wcm9wcykpIHtcbiAgICAgICAgICBkZWxldGUgX3RoaXMyLmNhY2hlW2tleV0udmFsdWU7IC8vIHVuY2FjaGUgdmFsdWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMYXp5Q2FjaGU7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBMYXp5Q2FjaGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0se1wiZGVlcC1lcXVhbFwiOjI2fV0sMzg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9ub0dldHRlcnMnKTtcblxufSx7XCIuL2xpYi9ub0dldHRlcnNcIjozN31dLDM5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBBRERfQVJSQVlfVkFMVUUgPSBleHBvcnRzLkFERF9BUlJBWV9WQUxVRSA9ICdyZWR1eC1mb3JtL0FERF9BUlJBWV9WQUxVRSc7XG52YXIgQVVUT0ZJTEwgPSBleHBvcnRzLkFVVE9GSUxMID0gJ3JlZHV4LWZvcm0vQVVUT0ZJTEwnO1xudmFyIEJMVVIgPSBleHBvcnRzLkJMVVIgPSAncmVkdXgtZm9ybS9CTFVSJztcbnZhciBDSEFOR0UgPSBleHBvcnRzLkNIQU5HRSA9ICdyZWR1eC1mb3JtL0NIQU5HRSc7XG52YXIgREVTVFJPWSA9IGV4cG9ydHMuREVTVFJPWSA9ICdyZWR1eC1mb3JtL0RFU1RST1knO1xudmFyIEZPQ1VTID0gZXhwb3J0cy5GT0NVUyA9ICdyZWR1eC1mb3JtL0ZPQ1VTJztcbnZhciBJTklUSUFMSVpFID0gZXhwb3J0cy5JTklUSUFMSVpFID0gJ3JlZHV4LWZvcm0vSU5JVElBTElaRSc7XG52YXIgUkVNT1ZFX0FSUkFZX1ZBTFVFID0gZXhwb3J0cy5SRU1PVkVfQVJSQVlfVkFMVUUgPSAncmVkdXgtZm9ybS9SRU1PVkVfQVJSQVlfVkFMVUUnO1xudmFyIFJFU0VUID0gZXhwb3J0cy5SRVNFVCA9ICdyZWR1eC1mb3JtL1JFU0VUJztcbnZhciBTVEFSVF9BU1lOQ19WQUxJREFUSU9OID0gZXhwb3J0cy5TVEFSVF9BU1lOQ19WQUxJREFUSU9OID0gJ3JlZHV4LWZvcm0vU1RBUlRfQVNZTkNfVkFMSURBVElPTic7XG52YXIgU1RBUlRfU1VCTUlUID0gZXhwb3J0cy5TVEFSVF9TVUJNSVQgPSAncmVkdXgtZm9ybS9TVEFSVF9TVUJNSVQnO1xudmFyIFNUT1BfQVNZTkNfVkFMSURBVElPTiA9IGV4cG9ydHMuU1RPUF9BU1lOQ19WQUxJREFUSU9OID0gJ3JlZHV4LWZvcm0vU1RPUF9BU1lOQ19WQUxJREFUSU9OJztcbnZhciBTVE9QX1NVQk1JVCA9IGV4cG9ydHMuU1RPUF9TVUJNSVQgPSAncmVkdXgtZm9ybS9TVE9QX1NVQk1JVCc7XG52YXIgU1VCTUlUX0ZBSUxFRCA9IGV4cG9ydHMuU1VCTUlUX0ZBSUxFRCA9ICdyZWR1eC1mb3JtL1NVQk1JVF9GQUlMRUQnO1xudmFyIFNXQVBfQVJSQVlfVkFMVUVTID0gZXhwb3J0cy5TV0FQX0FSUkFZX1ZBTFVFUyA9ICdyZWR1eC1mb3JtL1NXQVBfQVJSQVlfVkFMVUVTJztcbnZhciBUT1VDSCA9IGV4cG9ydHMuVE9VQ0ggPSAncmVkdXgtZm9ybS9UT1VDSCc7XG52YXIgVU5UT1VDSCA9IGV4cG9ydHMuVU5UT1VDSCA9ICdyZWR1eC1mb3JtL1VOVE9VQ0gnO1xufSx7fV0sNDA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy51bnRvdWNoID0gZXhwb3J0cy50b3VjaCA9IGV4cG9ydHMuc3dhcEFycmF5VmFsdWVzID0gZXhwb3J0cy5zdWJtaXRGYWlsZWQgPSBleHBvcnRzLnN0b3BTdWJtaXQgPSBleHBvcnRzLnN0b3BBc3luY1ZhbGlkYXRpb24gPSBleHBvcnRzLnN0YXJ0U3VibWl0ID0gZXhwb3J0cy5zdGFydEFzeW5jVmFsaWRhdGlvbiA9IGV4cG9ydHMucmVzZXQgPSBleHBvcnRzLnJlbW92ZUFycmF5VmFsdWUgPSBleHBvcnRzLmluaXRpYWxpemUgPSBleHBvcnRzLmZvY3VzID0gZXhwb3J0cy5kZXN0cm95ID0gZXhwb3J0cy5jaGFuZ2UgPSBleHBvcnRzLmJsdXIgPSBleHBvcnRzLmF1dG9maWxsID0gZXhwb3J0cy5hZGRBcnJheVZhbHVlID0gdW5kZWZpbmVkO1xuXG52YXIgX2FjdGlvblR5cGVzID0gcmVxdWlyZSgnLi9hY3Rpb25UeXBlcycpO1xuXG52YXIgYWRkQXJyYXlWYWx1ZSA9IGV4cG9ydHMuYWRkQXJyYXlWYWx1ZSA9IGZ1bmN0aW9uIGFkZEFycmF5VmFsdWUocGF0aCwgdmFsdWUsIGluZGV4LCBmaWVsZHMpIHtcbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLkFERF9BUlJBWV9WQUxVRSwgcGF0aDogcGF0aCwgdmFsdWU6IHZhbHVlLCBpbmRleDogaW5kZXgsIGZpZWxkczogZmllbGRzIH07XG59O1xuXG52YXIgYXV0b2ZpbGwgPSBleHBvcnRzLmF1dG9maWxsID0gZnVuY3Rpb24gYXV0b2ZpbGwoZmllbGQsIHZhbHVlKSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5BVVRPRklMTCwgZmllbGQ6IGZpZWxkLCB2YWx1ZTogdmFsdWUgfTtcbn07XG5cbnZhciBibHVyID0gZXhwb3J0cy5ibHVyID0gZnVuY3Rpb24gYmx1cihmaWVsZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLkJMVVIsIGZpZWxkOiBmaWVsZCwgdmFsdWU6IHZhbHVlIH07XG59O1xuXG52YXIgY2hhbmdlID0gZXhwb3J0cy5jaGFuZ2UgPSBmdW5jdGlvbiBjaGFuZ2UoZmllbGQsIHZhbHVlKSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5DSEFOR0UsIGZpZWxkOiBmaWVsZCwgdmFsdWU6IHZhbHVlIH07XG59O1xuXG52YXIgZGVzdHJveSA9IGV4cG9ydHMuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5ERVNUUk9ZIH07XG59O1xuXG52YXIgZm9jdXMgPSBleHBvcnRzLmZvY3VzID0gZnVuY3Rpb24gZm9jdXMoZmllbGQpIHtcbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLkZPQ1VTLCBmaWVsZDogZmllbGQgfTtcbn07XG5cbnZhciBpbml0aWFsaXplID0gZXhwb3J0cy5pbml0aWFsaXplID0gZnVuY3Rpb24gaW5pdGlhbGl6ZShkYXRhLCBmaWVsZHMpIHtcbiAgdmFyIG92ZXJ3cml0ZVZhbHVlcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhcmd1bWVudHNbMl07XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpZWxkcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgcHJvdmlkZSBmaWVsZHMgYXJyYXkgdG8gaW5pdGlhbGl6ZSgpIGFjdGlvbiBjcmVhdG9yJyk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLklOSVRJQUxJWkUsIGRhdGE6IGRhdGEsIGZpZWxkczogZmllbGRzLCBvdmVyd3JpdGVWYWx1ZXM6IG92ZXJ3cml0ZVZhbHVlcyB9O1xufTtcblxudmFyIHJlbW92ZUFycmF5VmFsdWUgPSBleHBvcnRzLnJlbW92ZUFycmF5VmFsdWUgPSBmdW5jdGlvbiByZW1vdmVBcnJheVZhbHVlKHBhdGgsIGluZGV4KSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5SRU1PVkVfQVJSQVlfVkFMVUUsIHBhdGg6IHBhdGgsIGluZGV4OiBpbmRleCB9O1xufTtcblxudmFyIHJlc2V0ID0gZXhwb3J0cy5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICByZXR1cm4geyB0eXBlOiBfYWN0aW9uVHlwZXMuUkVTRVQgfTtcbn07XG5cbnZhciBzdGFydEFzeW5jVmFsaWRhdGlvbiA9IGV4cG9ydHMuc3RhcnRBc3luY1ZhbGlkYXRpb24gPSBmdW5jdGlvbiBzdGFydEFzeW5jVmFsaWRhdGlvbihmaWVsZCkge1xuICByZXR1cm4geyB0eXBlOiBfYWN0aW9uVHlwZXMuU1RBUlRfQVNZTkNfVkFMSURBVElPTiwgZmllbGQ6IGZpZWxkIH07XG59O1xuXG52YXIgc3RhcnRTdWJtaXQgPSBleHBvcnRzLnN0YXJ0U3VibWl0ID0gZnVuY3Rpb24gc3RhcnRTdWJtaXQoKSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5TVEFSVF9TVUJNSVQgfTtcbn07XG5cbnZhciBzdG9wQXN5bmNWYWxpZGF0aW9uID0gZXhwb3J0cy5zdG9wQXN5bmNWYWxpZGF0aW9uID0gZnVuY3Rpb24gc3RvcEFzeW5jVmFsaWRhdGlvbihlcnJvcnMpIHtcbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLlNUT1BfQVNZTkNfVkFMSURBVElPTiwgZXJyb3JzOiBlcnJvcnMgfTtcbn07XG5cbnZhciBzdG9wU3VibWl0ID0gZXhwb3J0cy5zdG9wU3VibWl0ID0gZnVuY3Rpb24gc3RvcFN1Ym1pdChlcnJvcnMpIHtcbiAgcmV0dXJuIHsgdHlwZTogX2FjdGlvblR5cGVzLlNUT1BfU1VCTUlULCBlcnJvcnM6IGVycm9ycyB9O1xufTtcblxudmFyIHN1Ym1pdEZhaWxlZCA9IGV4cG9ydHMuc3VibWl0RmFpbGVkID0gZnVuY3Rpb24gc3VibWl0RmFpbGVkKCkge1xuICByZXR1cm4geyB0eXBlOiBfYWN0aW9uVHlwZXMuU1VCTUlUX0ZBSUxFRCB9O1xufTtcblxudmFyIHN3YXBBcnJheVZhbHVlcyA9IGV4cG9ydHMuc3dhcEFycmF5VmFsdWVzID0gZnVuY3Rpb24gc3dhcEFycmF5VmFsdWVzKHBhdGgsIGluZGV4QSwgaW5kZXhCKSB7XG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5TV0FQX0FSUkFZX1ZBTFVFUywgcGF0aDogcGF0aCwgaW5kZXhBOiBpbmRleEEsIGluZGV4QjogaW5kZXhCIH07XG59O1xuXG52YXIgdG91Y2ggPSBleHBvcnRzLnRvdWNoID0gZnVuY3Rpb24gdG91Y2goKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmaWVsZHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmaWVsZHNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4geyB0eXBlOiBfYWN0aW9uVHlwZXMuVE9VQ0gsIGZpZWxkczogZmllbGRzIH07XG59O1xuXG52YXIgdW50b3VjaCA9IGV4cG9ydHMudW50b3VjaCA9IGZ1bmN0aW9uIHVudG91Y2goKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgZmllbGRzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBmaWVsZHNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIHJldHVybiB7IHR5cGU6IF9hY3Rpb25UeXBlcy5VTlRPVUNILCBmaWVsZHM6IGZpZWxkcyB9O1xufTtcbn0se1wiLi9hY3Rpb25UeXBlc1wiOjM5fV0sNDE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzUHJvbWlzZSA9IHJlcXVpcmUoJ2lzLXByb21pc2UnKTtcblxudmFyIF9pc1Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQcm9taXNlKTtcblxudmFyIF9pc1ZhbGlkID0gcmVxdWlyZSgnLi9pc1ZhbGlkJyk7XG5cbnZhciBfaXNWYWxpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGFzeW5jVmFsaWRhdGlvbiA9IGZ1bmN0aW9uIGFzeW5jVmFsaWRhdGlvbihmbiwgc3RhcnQsIHN0b3AsIGZpZWxkKSB7XG4gIHN0YXJ0KGZpZWxkKTtcbiAgdmFyIHByb21pc2UgPSBmbigpO1xuICBpZiAoISgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShwcm9taXNlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYXN5bmNWYWxpZGF0ZSBmdW5jdGlvbiBwYXNzZWQgdG8gcmVkdXhGb3JtIG11c3QgcmV0dXJuIGEgcHJvbWlzZScpO1xuICB9XG4gIHZhciBoYW5kbGVFcnJvcnMgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcnMocmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9ycykge1xuICAgICAgaWYgKCEoMCwgX2lzVmFsaWQyLmRlZmF1bHQpKGVycm9ycykpIHtcbiAgICAgICAgc3RvcChlcnJvcnMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FzeW5jaHJvbm91cyB2YWxpZGF0aW9uIHByb21pc2Ugd2FzIHJlamVjdGVkIHdpdGhvdXQgZXJyb3JzLicpO1xuICAgICAgfVxuICAgICAgc3RvcCgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gIH07XG4gIHJldHVybiBwcm9taXNlLnRoZW4oaGFuZGxlRXJyb3JzKGZhbHNlKSwgaGFuZGxlRXJyb3JzKHRydWUpKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGFzeW5jVmFsaWRhdGlvbjtcbn0se1wiLi9pc1ZhbGlkXCI6NjUsXCJpcy1wcm9taXNlXCI6MzB9XSw0MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJpbmRBY3Rpb25EYXRhO1xuXG52YXIgX21hcFZhbHVlcyA9IHJlcXVpcmUoJy4vbWFwVmFsdWVzJyk7XG5cbnZhciBfbWFwVmFsdWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21hcFZhbHVlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQWRkcyBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIGZ1bmN0aW9uIG9yIG1hcCBvZiBmdW5jdGlvbnMgcGFzc2VkXG4gKi9cbmZ1bmN0aW9uIGJpbmRBY3Rpb25EYXRhKGFjdGlvbiwgZGF0YSkge1xuICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGFjdGlvbi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyksIGRhdGEpO1xuICAgIH07XG4gIH1cbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuICgwLCBfbWFwVmFsdWVzMi5kZWZhdWx0KShhY3Rpb24sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGJpbmRBY3Rpb25EYXRhKHZhbHVlLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYWN0aW9uO1xufVxufSx7XCIuL21hcFZhbHVlc1wiOjY2fV0sNDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVBbGw7XG5cbnZhciBfcmVkdWNlciA9IHJlcXVpcmUoJy4vcmVkdWNlcicpO1xuXG52YXIgX3JlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVkdWNlcik7XG5cbnZhciBfY3JlYXRlUmVkdXhGb3JtID0gcmVxdWlyZSgnLi9jcmVhdGVSZWR1eEZvcm0nKTtcblxudmFyIF9jcmVhdGVSZWR1eEZvcm0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlUmVkdXhGb3JtKTtcblxudmFyIF9tYXBWYWx1ZXMgPSByZXF1aXJlKCcuL21hcFZhbHVlcycpO1xuXG52YXIgX21hcFZhbHVlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXBWYWx1ZXMpO1xuXG52YXIgX2JpbmRBY3Rpb25EYXRhID0gcmVxdWlyZSgnLi9iaW5kQWN0aW9uRGF0YScpO1xuXG52YXIgX2JpbmRBY3Rpb25EYXRhMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRBY3Rpb25EYXRhKTtcblxudmFyIF9hY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XG5cbnZhciBhY3Rpb25zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FjdGlvbnMpO1xuXG52YXIgX2FjdGlvblR5cGVzID0gcmVxdWlyZSgnLi9hY3Rpb25UeXBlcycpO1xuXG52YXIgYWN0aW9uVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYWN0aW9uVHlwZXMpO1xuXG52YXIgX2NyZWF0ZVByb3BUeXBlcyA9IHJlcXVpcmUoJy4vY3JlYXRlUHJvcFR5cGVzJyk7XG5cbnZhciBfY3JlYXRlUHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVByb3BUeXBlcyk7XG5cbnZhciBfZ2V0VmFsdWVzRnJvbVN0YXRlID0gcmVxdWlyZSgnLi9nZXRWYWx1ZXNGcm9tU3RhdGUnKTtcblxudmFyIF9nZXRWYWx1ZXNGcm9tU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmFsdWVzRnJvbVN0YXRlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gYmluZCBmb3JtIGFzIGZpcnN0IHBhcmFtZXRlciBvZiBhY3Rpb24gY3JlYXRvcnNcbnZhciBib3VuZEFjdGlvbnMgPSBfZXh0ZW5kcyh7fSwgKDAsIF9tYXBWYWx1ZXMyLmRlZmF1bHQpKF9leHRlbmRzKHt9LCBhY3Rpb25zLCB7XG4gIGF1dG9maWxsV2l0aEtleTogZnVuY3Rpb24gYXV0b2ZpbGxXaXRoS2V5KGtleSkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfYmluZEFjdGlvbkRhdGEyLmRlZmF1bHQpKGFjdGlvbnMuYXV0b2ZpbGwsIHsga2V5OiBrZXkgfSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgfSxcbiAgY2hhbmdlV2l0aEtleTogZnVuY3Rpb24gY2hhbmdlV2l0aEtleShrZXkpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX2JpbmRBY3Rpb25EYXRhMi5kZWZhdWx0KShhY3Rpb25zLmNoYW5nZSwgeyBrZXk6IGtleSB9KS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICB9LFxuICBpbml0aWFsaXplV2l0aEtleTogZnVuY3Rpb24gaW5pdGlhbGl6ZVdpdGhLZXkoa2V5KSB7XG4gICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkoYWN0aW9ucy5pbml0aWFsaXplLCB7IGtleToga2V5IH0pLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gIH0sXG4gIHJlc2V0OiBmdW5jdGlvbiByZXNldChrZXkpIHtcbiAgICByZXR1cm4gKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkoYWN0aW9ucy5yZXNldCwgeyBrZXk6IGtleSB9KSgpO1xuICB9LFxuICB0b3VjaFdpdGhLZXk6IGZ1bmN0aW9uIHRvdWNoV2l0aEtleShrZXkpIHtcbiAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICBhcmdzW19rZXk0IC0gMV0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX2JpbmRBY3Rpb25EYXRhMi5kZWZhdWx0KShhY3Rpb25zLnRvdWNoLCB7IGtleToga2V5IH0pLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gIH0sXG4gIHVudG91Y2hXaXRoS2V5OiBmdW5jdGlvbiB1bnRvdWNoV2l0aEtleShrZXkpIHtcbiAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuNSA+IDEgPyBfbGVuNSAtIDEgOiAwKSwgX2tleTUgPSAxOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICBhcmdzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX2JpbmRBY3Rpb25EYXRhMi5kZWZhdWx0KShhY3Rpb25zLnVudG91Y2gsIHsga2V5OiBrZXkgfSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveShrZXkpIHtcbiAgICByZXR1cm4gKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkoYWN0aW9ucy5kZXN0cm95LCB7IGtleToga2V5IH0pKCk7XG4gIH1cbn0pLCBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZm9ybSkge1xuICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW42ID4gMSA/IF9sZW42IC0gMSA6IDApLCBfa2V5NiA9IDE7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgIGFyZ3NbX2tleTYgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfYmluZEFjdGlvbkRhdGEyLmRlZmF1bHQpKGFjdGlvbiwgeyBmb3JtOiBmb3JtIH0pLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gIH07XG59KSk7XG5cbnZhciBhZGRBcnJheVZhbHVlID0gYm91bmRBY3Rpb25zLmFkZEFycmF5VmFsdWU7XG52YXIgYXV0b2ZpbGwgPSBib3VuZEFjdGlvbnMuYXV0b2ZpbGw7XG52YXIgYXV0b2ZpbGxXaXRoS2V5ID0gYm91bmRBY3Rpb25zLmF1dG9maWxsV2l0aEtleTtcbnZhciBibHVyID0gYm91bmRBY3Rpb25zLmJsdXI7XG52YXIgY2hhbmdlID0gYm91bmRBY3Rpb25zLmNoYW5nZTtcbnZhciBjaGFuZ2VXaXRoS2V5ID0gYm91bmRBY3Rpb25zLmNoYW5nZVdpdGhLZXk7XG52YXIgZGVzdHJveSA9IGJvdW5kQWN0aW9ucy5kZXN0cm95O1xudmFyIGZvY3VzID0gYm91bmRBY3Rpb25zLmZvY3VzO1xudmFyIGluaXRpYWxpemUgPSBib3VuZEFjdGlvbnMuaW5pdGlhbGl6ZTtcbnZhciBpbml0aWFsaXplV2l0aEtleSA9IGJvdW5kQWN0aW9ucy5pbml0aWFsaXplV2l0aEtleTtcbnZhciByZW1vdmVBcnJheVZhbHVlID0gYm91bmRBY3Rpb25zLnJlbW92ZUFycmF5VmFsdWU7XG52YXIgcmVzZXQgPSBib3VuZEFjdGlvbnMucmVzZXQ7XG52YXIgc3RhcnRBc3luY1ZhbGlkYXRpb24gPSBib3VuZEFjdGlvbnMuc3RhcnRBc3luY1ZhbGlkYXRpb247XG52YXIgc3RhcnRTdWJtaXQgPSBib3VuZEFjdGlvbnMuc3RhcnRTdWJtaXQ7XG52YXIgc3RvcEFzeW5jVmFsaWRhdGlvbiA9IGJvdW5kQWN0aW9ucy5zdG9wQXN5bmNWYWxpZGF0aW9uO1xudmFyIHN0b3BTdWJtaXQgPSBib3VuZEFjdGlvbnMuc3RvcFN1Ym1pdDtcbnZhciBzdWJtaXRGYWlsZWQgPSBib3VuZEFjdGlvbnMuc3VibWl0RmFpbGVkO1xudmFyIHN3YXBBcnJheVZhbHVlcyA9IGJvdW5kQWN0aW9ucy5zd2FwQXJyYXlWYWx1ZXM7XG52YXIgdG91Y2ggPSBib3VuZEFjdGlvbnMudG91Y2g7XG52YXIgdG91Y2hXaXRoS2V5ID0gYm91bmRBY3Rpb25zLnRvdWNoV2l0aEtleTtcbnZhciB1bnRvdWNoID0gYm91bmRBY3Rpb25zLnVudG91Y2g7XG52YXIgdW50b3VjaFdpdGhLZXkgPSBib3VuZEFjdGlvbnMudW50b3VjaFdpdGhLZXk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUFsbChpc1JlYWN0TmF0aXZlLCBSZWFjdCwgY29ubmVjdCkge1xuICByZXR1cm4ge1xuICAgIGFjdGlvblR5cGVzOiBhY3Rpb25UeXBlcyxcbiAgICBhZGRBcnJheVZhbHVlOiBhZGRBcnJheVZhbHVlLFxuICAgIGF1dG9maWxsOiBhdXRvZmlsbCxcbiAgICBhdXRvZmlsbFdpdGhLZXk6IGF1dG9maWxsV2l0aEtleSxcbiAgICBibHVyOiBibHVyLFxuICAgIGNoYW5nZTogY2hhbmdlLFxuICAgIGNoYW5nZVdpdGhLZXk6IGNoYW5nZVdpdGhLZXksXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBmb2N1czogZm9jdXMsXG4gICAgZ2V0VmFsdWVzOiBfZ2V0VmFsdWVzRnJvbVN0YXRlMi5kZWZhdWx0LFxuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG4gICAgaW5pdGlhbGl6ZVdpdGhLZXk6IGluaXRpYWxpemVXaXRoS2V5LFxuICAgIHByb3BUeXBlczogKDAsIF9jcmVhdGVQcm9wVHlwZXMyLmRlZmF1bHQpKFJlYWN0KSxcbiAgICByZWR1eEZvcm06ICgwLCBfY3JlYXRlUmVkdXhGb3JtMi5kZWZhdWx0KShpc1JlYWN0TmF0aXZlLCBSZWFjdCwgY29ubmVjdCksXG4gICAgcmVkdWNlcjogX3JlZHVjZXIyLmRlZmF1bHQsXG4gICAgcmVtb3ZlQXJyYXlWYWx1ZTogcmVtb3ZlQXJyYXlWYWx1ZSxcbiAgICByZXNldDogcmVzZXQsXG4gICAgc3RhcnRBc3luY1ZhbGlkYXRpb246IHN0YXJ0QXN5bmNWYWxpZGF0aW9uLFxuICAgIHN0YXJ0U3VibWl0OiBzdGFydFN1Ym1pdCxcbiAgICBzdG9wQXN5bmNWYWxpZGF0aW9uOiBzdG9wQXN5bmNWYWxpZGF0aW9uLFxuICAgIHN0b3BTdWJtaXQ6IHN0b3BTdWJtaXQsXG4gICAgc3VibWl0RmFpbGVkOiBzdWJtaXRGYWlsZWQsXG4gICAgc3dhcEFycmF5VmFsdWVzOiBzd2FwQXJyYXlWYWx1ZXMsXG4gICAgdG91Y2g6IHRvdWNoLFxuICAgIHRvdWNoV2l0aEtleTogdG91Y2hXaXRoS2V5LFxuICAgIHVudG91Y2g6IHVudG91Y2gsXG4gICAgdW50b3VjaFdpdGhLZXk6IHVudG91Y2hXaXRoS2V5XG4gIH07XG59XG59LHtcIi4vYWN0aW9uVHlwZXNcIjozOSxcIi4vYWN0aW9uc1wiOjQwLFwiLi9iaW5kQWN0aW9uRGF0YVwiOjQyLFwiLi9jcmVhdGVQcm9wVHlwZXNcIjo0NSxcIi4vY3JlYXRlUmVkdXhGb3JtXCI6NDYsXCIuL2dldFZhbHVlc0Zyb21TdGF0ZVwiOjYwLFwiLi9tYXBWYWx1ZXNcIjo2NixcIi4vcmVkdWNlclwiOjcxfV0sNDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcblxudmFyIGltcG9ydGVkQWN0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9hY3Rpb25zKTtcblxudmFyIF9nZXREaXNwbGF5TmFtZSA9IHJlcXVpcmUoJy4vZ2V0RGlzcGxheU5hbWUnKTtcblxudmFyIF9nZXREaXNwbGF5TmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXREaXNwbGF5TmFtZSk7XG5cbnZhciBfcmVkdWNlciA9IHJlcXVpcmUoJy4vcmVkdWNlcicpO1xuXG52YXIgX2RlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxudmFyIF9kZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVlcEVxdWFsKTtcblxudmFyIF9iaW5kQWN0aW9uRGF0YSA9IHJlcXVpcmUoJy4vYmluZEFjdGlvbkRhdGEnKTtcblxudmFyIF9iaW5kQWN0aW9uRGF0YTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uRGF0YSk7XG5cbnZhciBfZ2V0VmFsdWVzID0gcmVxdWlyZSgnLi9nZXRWYWx1ZXMnKTtcblxudmFyIF9nZXRWYWx1ZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmFsdWVzKTtcblxudmFyIF9pc1ZhbGlkID0gcmVxdWlyZSgnLi9pc1ZhbGlkJyk7XG5cbnZhciBfaXNWYWxpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkKTtcblxudmFyIF9yZWFkRmllbGRzID0gcmVxdWlyZSgnLi9yZWFkRmllbGRzJyk7XG5cbnZhciBfcmVhZEZpZWxkczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFkRmllbGRzKTtcblxudmFyIF9oYW5kbGVTdWJtaXQyID0gcmVxdWlyZSgnLi9oYW5kbGVTdWJtaXQnKTtcblxudmFyIF9oYW5kbGVTdWJtaXQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlU3VibWl0Mik7XG5cbnZhciBfYXN5bmNWYWxpZGF0aW9uID0gcmVxdWlyZSgnLi9hc3luY1ZhbGlkYXRpb24nKTtcblxudmFyIF9hc3luY1ZhbGlkYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXN5bmNWYWxpZGF0aW9uKTtcblxudmFyIF9zaWxlbmNlRXZlbnRzID0gcmVxdWlyZSgnLi9ldmVudHMvc2lsZW5jZUV2ZW50cycpO1xuXG52YXIgX3NpbGVuY2VFdmVudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2lsZW5jZUV2ZW50cyk7XG5cbnZhciBfc2lsZW5jZUV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudHMvc2lsZW5jZUV2ZW50Jyk7XG5cbnZhciBfc2lsZW5jZUV2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NpbGVuY2VFdmVudCk7XG5cbnZhciBfd3JhcE1hcERpc3BhdGNoVG9Qcm9wcyA9IHJlcXVpcmUoJy4vd3JhcE1hcERpc3BhdGNoVG9Qcm9wcycpO1xuXG52YXIgX3dyYXBNYXBEaXNwYXRjaFRvUHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd3JhcE1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbnZhciBfd3JhcE1hcFN0YXRlVG9Qcm9wcyA9IHJlcXVpcmUoJy4vd3JhcE1hcFN0YXRlVG9Qcm9wcycpO1xuXG52YXIgX3dyYXBNYXBTdGF0ZVRvUHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd3JhcE1hcFN0YXRlVG9Qcm9wcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIENyZWF0ZXMgYSBIT0MgdGhhdCBrbm93cyBob3cgdG8gY3JlYXRlIHJlZHV4LWNvbm5lY3RlZCBzdWItY29tcG9uZW50cy5cbiAqL1xudmFyIGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50ID0gZnVuY3Rpb24gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQoY29uZmlnLCBpc1JlYWN0TmF0aXZlLCBSZWFjdCwgY29ubmVjdCwgV3JhcHBlZENvbXBvbmVudCwgbWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMpIHtcbiAgdmFyIENvbXBvbmVudCA9IFJlYWN0LkNvbXBvbmVudDtcbiAgdmFyIFByb3BUeXBlcyA9IFJlYWN0LlByb3BUeXBlcztcblxuICByZXR1cm4gZnVuY3Rpb24gKHJlZHV4TW91bnRQb2ludCwgZm9ybU5hbWUsIGZvcm1LZXksIGdldEZvcm1TdGF0ZSkge1xuICAgIHZhciBSZWR1eEZvcm0gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgX2luaGVyaXRzKFJlZHV4Rm9ybSwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIFJlZHV4Rm9ybShwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVkdXhGb3JtKTtcblxuICAgICAgICAvLyBiaW5kIGZ1bmN0aW9uc1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgIF90aGlzLmFzeW5jVmFsaWRhdGUgPSBfdGhpcy5hc3luY1ZhbGlkYXRlLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5oYW5kbGVTdWJtaXQgPSBfdGhpcy5oYW5kbGVTdWJtaXQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLmZpZWxkcyA9ICgwLCBfcmVhZEZpZWxkczIuZGVmYXVsdCkocHJvcHMsIHt9LCB7fSwgX3RoaXMuYXN5bmNWYWxpZGF0ZSwgaXNSZWFjdE5hdGl2ZSk7XG4gICAgICAgIHZhciBzdWJtaXRQYXNzYmFjayA9IF90aGlzLnByb3BzLnN1Ym1pdFBhc3NiYWNrO1xuXG4gICAgICAgIHN1Ym1pdFBhc3NiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgIH0pOyAvLyB3cmFwcGVkIGluIGZ1bmN0aW9uIHRvIGRpc2FsbG93IHBhcmFtc1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIFJlZHV4Rm9ybS5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIGZpZWxkcyA9IF9wcm9wcy5maWVsZHM7XG4gICAgICAgIHZhciBmb3JtID0gX3Byb3BzLmZvcm07XG4gICAgICAgIHZhciBpbml0aWFsaXplID0gX3Byb3BzLmluaXRpYWxpemU7XG4gICAgICAgIHZhciBpbml0aWFsVmFsdWVzID0gX3Byb3BzLmluaXRpYWxWYWx1ZXM7XG5cbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZXMgJiYgIWZvcm0uX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgaW5pdGlhbGl6ZShpbml0aWFsVmFsdWVzLCBmaWVsZHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBSZWR1eEZvcm0ucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAoISgwLCBfZGVlcEVxdWFsMi5kZWZhdWx0KSh0aGlzLnByb3BzLmZpZWxkcywgbmV4dFByb3BzLmZpZWxkcykgfHwgISgwLCBfZGVlcEVxdWFsMi5kZWZhdWx0KSh0aGlzLnByb3BzLmZvcm0sIG5leHRQcm9wcy5mb3JtLCB7IHN0cmljdDogdHJ1ZSB9KSkge1xuICAgICAgICAgIHRoaXMuZmllbGRzID0gKDAsIF9yZWFkRmllbGRzMi5kZWZhdWx0KShuZXh0UHJvcHMsIHRoaXMucHJvcHMsIHRoaXMuZmllbGRzLCB0aGlzLmFzeW5jVmFsaWRhdGUsIGlzUmVhY3ROYXRpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKDAsIF9kZWVwRXF1YWwyLmRlZmF1bHQpKHRoaXMucHJvcHMuaW5pdGlhbFZhbHVlcywgbmV4dFByb3BzLmluaXRpYWxWYWx1ZXMpKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5pbml0aWFsaXplKG5leHRQcm9wcy5pbml0aWFsVmFsdWVzLCBuZXh0UHJvcHMuZmllbGRzLCB0aGlzLnByb3BzLm92ZXJ3cml0ZU9uSW5pdGlhbFZhbHVlc0NoYW5nZSB8fCAhdGhpcy5wcm9wcy5mb3JtLl9pbml0aWFsaXplZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIFJlZHV4Rm9ybS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5kZXN0cm95T25Vbm1vdW50KSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIFJlZHV4Rm9ybS5wcm90b3R5cGUuYXN5bmNWYWxpZGF0ZSA9IGZ1bmN0aW9uIGFzeW5jVmFsaWRhdGUobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgICB2YXIgYWx3YXlzQXN5bmNWYWxpZGF0ZSA9IF9wcm9wczIuYWx3YXlzQXN5bmNWYWxpZGF0ZTtcbiAgICAgICAgdmFyIGFzeW5jVmFsaWRhdGUgPSBfcHJvcHMyLmFzeW5jVmFsaWRhdGU7XG4gICAgICAgIHZhciBkaXNwYXRjaCA9IF9wcm9wczIuZGlzcGF0Y2g7XG4gICAgICAgIHZhciBmaWVsZHMgPSBfcHJvcHMyLmZpZWxkcztcbiAgICAgICAgdmFyIGZvcm0gPSBfcHJvcHMyLmZvcm07XG4gICAgICAgIHZhciBzdGFydEFzeW5jVmFsaWRhdGlvbiA9IF9wcm9wczIuc3RhcnRBc3luY1ZhbGlkYXRpb247XG4gICAgICAgIHZhciBzdG9wQXN5bmNWYWxpZGF0aW9uID0gX3Byb3BzMi5zdG9wQXN5bmNWYWxpZGF0aW9uO1xuICAgICAgICB2YXIgdmFsaWRhdGUgPSBfcHJvcHMyLnZhbGlkYXRlO1xuXG4gICAgICAgIHZhciBpc1N1Ym1pdHRpbmcgPSAhbmFtZTtcbiAgICAgICAgaWYgKGFzeW5jVmFsaWRhdGUpIHtcbiAgICAgICAgICB2YXIgX3JldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSAoMCwgX2dldFZhbHVlczIuZGVmYXVsdCkoZmllbGRzLCBmb3JtKTtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgIHZhbHVlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN5bmNFcnJvcnMgPSB2YWxpZGF0ZSh2YWx1ZXMsIF90aGlzMi5wcm9wcyk7XG4gICAgICAgICAgICB2YXIgYWxsUHJpc3RpbmUgPSBfdGhpczIuZmllbGRzLl9tZXRhLmFsbFByaXN0aW5lO1xuXG4gICAgICAgICAgICB2YXIgaW5pdGlhbGl6ZWQgPSBmb3JtLl9pbml0aWFsaXplZDtcblxuICAgICAgICAgICAgLy8gaWYgYmx1ciB2YWxpZGF0aW5nLCBvbmx5IHJ1biBhc3luYyB2YWxpZGF0ZSBpZiBzeW5jIHZhbGlkYXRpb24gcGFzc2VzXG4gICAgICAgICAgICAvLyBhbmQgc3VibWl0dGluZyAobm90IGJsdXIgdmFsaWRhdGlvbikgb3IgZm9ybSBpcyBkaXJ0eSBvciBmb3JtIHdhcyBuZXZlciBpbml0aWFsaXplZFxuICAgICAgICAgICAgLy8gdW5sZXNzIGFsd2F5c0FzeW5jVmFsaWRhdGUgaXMgdHJ1ZVxuICAgICAgICAgICAgdmFyIHN5bmNWYWxpZGF0aW9uUGFzc2VzID0gaXNTdWJtaXR0aW5nIHx8ICgwLCBfaXNWYWxpZDIuZGVmYXVsdCkoc3luY0Vycm9yc1tuYW1lXSk7XG4gICAgICAgICAgICBpZiAoYWx3YXlzQXN5bmNWYWxpZGF0ZSB8fCBzeW5jVmFsaWRhdGlvblBhc3NlcyAmJiAoaXNTdWJtaXR0aW5nIHx8ICFhbGxQcmlzdGluZSB8fCAhaW5pdGlhbGl6ZWQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdjogKDAsIF9hc3luY1ZhbGlkYXRpb24yLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhc3luY1ZhbGlkYXRlKHZhbHVlcywgZGlzcGF0Y2gsIF90aGlzMi5wcm9wcyk7XG4gICAgICAgICAgICAgICAgfSwgc3RhcnRBc3luY1ZhbGlkYXRpb24sIHN0b3BBc3luY1ZhbGlkYXRpb24sIG5hbWUpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSgpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBfcmV0ID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldC52O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBSZWR1eEZvcm0ucHJvdG90eXBlLmhhbmRsZVN1Ym1pdCA9IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChzdWJtaXRPckV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIG9uU3VibWl0ID0gX3Byb3BzMy5vblN1Ym1pdDtcbiAgICAgICAgdmFyIGZpZWxkcyA9IF9wcm9wczMuZmllbGRzO1xuICAgICAgICB2YXIgZm9ybSA9IF9wcm9wczMuZm9ybTtcblxuICAgICAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjayhzdWJtaXQpIHtcbiAgICAgICAgICBpZiAoIXN1Ym1pdCB8fCB0eXBlb2Ygc3VibWl0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IGVpdGhlciBwYXNzIGhhbmRsZVN1Ym1pdCgpIGFuIG9uU3VibWl0IGZ1bmN0aW9uIG9yIHBhc3Mgb25TdWJtaXQgYXMgYSBwcm9wJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdWJtaXQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAhc3VibWl0T3JFdmVudCB8fCAoMCwgX3NpbGVuY2VFdmVudDIuZGVmYXVsdCkoc3VibWl0T3JFdmVudCkgP1xuICAgICAgICAvLyBzdWJtaXRPckV2ZW50IGlzIGFuIGV2ZW50OiBmaXJlIHN1Ym1pdFxuICAgICAgICAoMCwgX2hhbmRsZVN1Ym1pdDMuZGVmYXVsdCkoY2hlY2sob25TdWJtaXQpLCAoMCwgX2dldFZhbHVlczIuZGVmYXVsdCkoZmllbGRzLCBmb3JtKSwgdGhpcy5wcm9wcywgdGhpcy5hc3luY1ZhbGlkYXRlKSA6XG4gICAgICAgIC8vIHN1Ym1pdE9yRXZlbnQgaXMgdGhlIHN1Ym1pdCBmdW5jdGlvbjogcmV0dXJuIGRlZmVycmVkIHN1Ym1pdCB0aHVua1xuICAgICAgICAoMCwgX3NpbGVuY2VFdmVudHMyLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gKDAsIF9oYW5kbGVTdWJtaXQzLmRlZmF1bHQpKGNoZWNrKHN1Ym1pdE9yRXZlbnQpLCAoMCwgX2dldFZhbHVlczIuZGVmYXVsdCkoZmllbGRzLCBmb3JtKSwgX3RoaXMzLnByb3BzLCBfdGhpczMuYXN5bmNWYWxpZGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgUmVkdXhGb3JtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfdGhpczQgPSB0aGlzLFxuICAgICAgICAgICAgX3JlZjtcblxuICAgICAgICB2YXIgYWxsRmllbGRzID0gdGhpcy5maWVsZHM7XG4gICAgICAgIHZhciBfcHJvcHM0ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIGFkZEFycmF5VmFsdWUgPSBfcHJvcHM0LmFkZEFycmF5VmFsdWU7XG4gICAgICAgIHZhciBhc3luY0JsdXJGaWVsZHMgPSBfcHJvcHM0LmFzeW5jQmx1ckZpZWxkcztcbiAgICAgICAgdmFyIGF1dG9maWxsID0gX3Byb3BzNC5hdXRvZmlsbDtcbiAgICAgICAgdmFyIGJsdXIgPSBfcHJvcHM0LmJsdXI7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBfcHJvcHM0LmNoYW5nZTtcbiAgICAgICAgdmFyIGRlc3Ryb3kgPSBfcHJvcHM0LmRlc3Ryb3k7XG4gICAgICAgIHZhciBmb2N1cyA9IF9wcm9wczQuZm9jdXM7XG4gICAgICAgIHZhciBmaWVsZHMgPSBfcHJvcHM0LmZpZWxkcztcbiAgICAgICAgdmFyIGZvcm0gPSBfcHJvcHM0LmZvcm07XG4gICAgICAgIHZhciBpbml0aWFsVmFsdWVzID0gX3Byb3BzNC5pbml0aWFsVmFsdWVzO1xuICAgICAgICB2YXIgaW5pdGlhbGl6ZSA9IF9wcm9wczQuaW5pdGlhbGl6ZTtcbiAgICAgICAgdmFyIG9uU3VibWl0ID0gX3Byb3BzNC5vblN1Ym1pdDtcbiAgICAgICAgdmFyIHByb3BOYW1lc3BhY2UgPSBfcHJvcHM0LnByb3BOYW1lc3BhY2U7XG4gICAgICAgIHZhciByZXNldCA9IF9wcm9wczQucmVzZXQ7XG4gICAgICAgIHZhciByZW1vdmVBcnJheVZhbHVlID0gX3Byb3BzNC5yZW1vdmVBcnJheVZhbHVlO1xuICAgICAgICB2YXIgcmV0dXJuUmVqZWN0ZWRTdWJtaXRQcm9taXNlID0gX3Byb3BzNC5yZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2U7XG4gICAgICAgIHZhciBzdGFydEFzeW5jVmFsaWRhdGlvbiA9IF9wcm9wczQuc3RhcnRBc3luY1ZhbGlkYXRpb247XG4gICAgICAgIHZhciBzdGFydFN1Ym1pdCA9IF9wcm9wczQuc3RhcnRTdWJtaXQ7XG4gICAgICAgIHZhciBzdG9wQXN5bmNWYWxpZGF0aW9uID0gX3Byb3BzNC5zdG9wQXN5bmNWYWxpZGF0aW9uO1xuICAgICAgICB2YXIgc3RvcFN1Ym1pdCA9IF9wcm9wczQuc3RvcFN1Ym1pdDtcbiAgICAgICAgdmFyIHN1Ym1pdEZhaWxlZCA9IF9wcm9wczQuc3VibWl0RmFpbGVkO1xuICAgICAgICB2YXIgc3dhcEFycmF5VmFsdWVzID0gX3Byb3BzNC5zd2FwQXJyYXlWYWx1ZXM7XG4gICAgICAgIHZhciB0b3VjaCA9IF9wcm9wczQudG91Y2g7XG4gICAgICAgIHZhciB1bnRvdWNoID0gX3Byb3BzNC51bnRvdWNoO1xuICAgICAgICB2YXIgdmFsaWRhdGUgPSBfcHJvcHM0LnZhbGlkYXRlO1xuXG4gICAgICAgIHZhciBwYXNzYWJsZVByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wczQsIFsnYWRkQXJyYXlWYWx1ZScsICdhc3luY0JsdXJGaWVsZHMnLCAnYXV0b2ZpbGwnLCAnYmx1cicsICdjaGFuZ2UnLCAnZGVzdHJveScsICdmb2N1cycsICdmaWVsZHMnLCAnZm9ybScsICdpbml0aWFsVmFsdWVzJywgJ2luaXRpYWxpemUnLCAnb25TdWJtaXQnLCAncHJvcE5hbWVzcGFjZScsICdyZXNldCcsICdyZW1vdmVBcnJheVZhbHVlJywgJ3JldHVyblJlamVjdGVkU3VibWl0UHJvbWlzZScsICdzdGFydEFzeW5jVmFsaWRhdGlvbicsICdzdGFydFN1Ym1pdCcsICdzdG9wQXN5bmNWYWxpZGF0aW9uJywgJ3N0b3BTdWJtaXQnLCAnc3VibWl0RmFpbGVkJywgJ3N3YXBBcnJheVZhbHVlcycsICd0b3VjaCcsICd1bnRvdWNoJywgJ3ZhbGlkYXRlJ10pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlZGVjbGFyZVxuXG5cbiAgICAgICAgdmFyIF9hbGxGaWVsZHMkX21ldGEgPSBhbGxGaWVsZHMuX21ldGE7XG4gICAgICAgIHZhciBhbGxQcmlzdGluZSA9IF9hbGxGaWVsZHMkX21ldGEuYWxsUHJpc3RpbmU7XG4gICAgICAgIHZhciBhbGxWYWxpZCA9IF9hbGxGaWVsZHMkX21ldGEuYWxsVmFsaWQ7XG4gICAgICAgIHZhciBlcnJvcnMgPSBfYWxsRmllbGRzJF9tZXRhLmVycm9ycztcbiAgICAgICAgdmFyIGZvcm1FcnJvciA9IF9hbGxGaWVsZHMkX21ldGEuZm9ybUVycm9yO1xuICAgICAgICB2YXIgdmFsdWVzID0gX2FsbEZpZWxkcyRfbWV0YS52YWx1ZXM7XG5cblxuICAgICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgICAgLy8gU3RhdGU6XG4gICAgICAgICAgYWN0aXZlOiBmb3JtLl9hY3RpdmUsXG4gICAgICAgICAgYXN5bmNWYWxpZGF0aW5nOiBmb3JtLl9hc3luY1ZhbGlkYXRpbmcsXG4gICAgICAgICAgZGlydHk6ICFhbGxQcmlzdGluZSxcbiAgICAgICAgICBlcnJvcjogZm9ybUVycm9yLFxuICAgICAgICAgIGVycm9yczogZXJyb3JzLFxuICAgICAgICAgIGZpZWxkczogYWxsRmllbGRzLFxuICAgICAgICAgIGZvcm1LZXk6IGZvcm1LZXksXG4gICAgICAgICAgaW52YWxpZDogIWFsbFZhbGlkLFxuICAgICAgICAgIHByaXN0aW5lOiBhbGxQcmlzdGluZSxcbiAgICAgICAgICBzdWJtaXR0aW5nOiBmb3JtLl9zdWJtaXR0aW5nLFxuICAgICAgICAgIHN1Ym1pdEZhaWxlZDogZm9ybS5fc3VibWl0RmFpbGVkLFxuICAgICAgICAgIHZhbGlkOiBhbGxWYWxpZCxcbiAgICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcblxuICAgICAgICAgIC8vIEFjdGlvbnM6XG4gICAgICAgICAgYXN5bmNWYWxpZGF0ZTogKDAsIF9zaWxlbmNlRXZlbnRzMi5kZWZhdWx0KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXM0LmFzeW5jVmFsaWRhdGUoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAvLyBeIGRvZXNuJ3QganVzdCBwYXNzIHRoaXMuYXN5bmNWYWxpZGF0ZSB0byBkaXNhbGxvdyB2YWx1ZXMgcGFzc2luZ1xuICAgICAgICAgIGRlc3Ryb3lGb3JtOiAoMCwgX3NpbGVuY2VFdmVudHMyLmRlZmF1bHQpKGRlc3Ryb3kpLFxuICAgICAgICAgIGhhbmRsZVN1Ym1pdDogdGhpcy5oYW5kbGVTdWJtaXQsXG4gICAgICAgICAgaW5pdGlhbGl6ZUZvcm06ICgwLCBfc2lsZW5jZUV2ZW50czIuZGVmYXVsdCkoZnVuY3Rpb24gKGluaXRWYWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsaXplKGluaXRWYWx1ZXMsIGZpZWxkcyk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgcmVzZXRGb3JtOiAoMCwgX3NpbGVuY2VFdmVudHMyLmRlZmF1bHQpKHJlc2V0KSxcbiAgICAgICAgICB0b3VjaDogKDAsIF9zaWxlbmNlRXZlbnRzMi5kZWZhdWx0KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdG91Y2guYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRvdWNoQWxsOiAoMCwgX3NpbGVuY2VFdmVudHMyLmRlZmF1bHQpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0b3VjaC5hcHBseSh1bmRlZmluZWQsIGZpZWxkcyk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdW50b3VjaDogKDAsIF9zaWxlbmNlRXZlbnRzMi5kZWZhdWx0KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW50b3VjaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdW50b3VjaEFsbDogKDAsIF9zaWxlbmNlRXZlbnRzMi5kZWZhdWx0KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW50b3VjaC5hcHBseSh1bmRlZmluZWQsIGZpZWxkcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhc3NlZFByb3BzID0gcHJvcE5hbWVzcGFjZSA/IChfcmVmID0ge30sIF9yZWZbcHJvcE5hbWVzcGFjZV0gPSBwcm9wcywgX3JlZikgOiBwcm9wcztcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgX2V4dGVuZHMoe30sIHBhc3NhYmxlUHJvcHMsIHBhc3NlZFByb3BzKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVkdXhGb3JtO1xuICAgIH0oQ29tcG9uZW50KTtcblxuICAgIFJlZHV4Rm9ybS5kaXNwbGF5TmFtZSA9ICdSZWR1eEZvcm0oJyArICgwLCBfZ2V0RGlzcGxheU5hbWUyLmRlZmF1bHQpKFdyYXBwZWRDb21wb25lbnQpICsgJyknO1xuICAgIFJlZHV4Rm9ybS5XcmFwcGVkQ29tcG9uZW50ID0gV3JhcHBlZENvbXBvbmVudDtcbiAgICBSZWR1eEZvcm0ucHJvcFR5cGVzID0ge1xuICAgICAgLy8gcHJvcHM6XG4gICAgICBhbHdheXNBc3luY1ZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGFzeW5jQmx1ckZpZWxkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgICBhc3luY1ZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKS5pc1JlcXVpcmVkLFxuICAgICAgZm9ybTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIGluaXRpYWxWYWx1ZXM6IFByb3BUeXBlcy5hbnksXG4gICAgICBvblN1Ym1pdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICBvblN1Ym1pdFN1Y2Nlc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgb25TdWJtaXRGYWlsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG92ZXJ3cml0ZU9uSW5pdGlhbFZhbHVlc0NoYW5nZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIHByb3BOYW1lc3BhY2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICByZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2U6IFByb3BUeXBlcy5ib29sLFxuICAgICAgc3VibWl0UGFzc2JhY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB2YWxpZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAgIC8vIGFjdGlvbnM6XG4gICAgICBhZGRBcnJheVZhbHVlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgYXV0b2ZpbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBibHVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgY2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZGVzdHJveTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGZvY3VzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgaW5pdGlhbGl6ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlbW92ZUFycmF5VmFsdWU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICByZXNldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHN0YXJ0QXN5bmNWYWxpZGF0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc3RhcnRTdWJtaXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBzdG9wQXN5bmNWYWxpZGF0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgc3RvcFN1Ym1pdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHN1Ym1pdEZhaWxlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHN3YXBBcnJheVZhbHVlczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvdWNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdW50b3VjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICAgIH07XG4gICAgUmVkdXhGb3JtLmRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGFzeW5jQmx1ckZpZWxkczogW10sXG4gICAgICBmb3JtOiBfcmVkdWNlci5pbml0aWFsU3RhdGUsXG4gICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICByZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2U6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGJpbmQgdG91Y2ggZmxhZ3MgdG8gYmx1ciBhbmQgY2hhbmdlXG4gICAgdmFyIHVuYm91bmRBY3Rpb25zID0gX2V4dGVuZHMoe30sIGltcG9ydGVkQWN0aW9ucywge1xuICAgICAgYmx1cjogKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkoaW1wb3J0ZWRBY3Rpb25zLmJsdXIsIHtcbiAgICAgICAgdG91Y2g6ICEhY29uZmlnLnRvdWNoT25CbHVyXG4gICAgICB9KSxcbiAgICAgIGNoYW5nZTogKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkoaW1wb3J0ZWRBY3Rpb25zLmNoYW5nZSwge1xuICAgICAgICB0b3VjaDogISFjb25maWcudG91Y2hPbkNoYW5nZVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vIG1ha2UgcmVkdXggY29ubmVjdG9yIHdpdGggb3Igd2l0aG91dCBmb3JtIGtleVxuICAgIHZhciBkZWNvcmF0ZSA9IGZvcm1LZXkgIT09IHVuZGVmaW5lZCAmJiBmb3JtS2V5ICE9PSBudWxsID8gY29ubmVjdCgoMCwgX3dyYXBNYXBTdGF0ZVRvUHJvcHMyLmRlZmF1bHQpKG1hcFN0YXRlVG9Qcm9wcywgZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICB2YXIgZm9ybVN0YXRlID0gZ2V0Rm9ybVN0YXRlKHN0YXRlLCByZWR1eE1vdW50UG9pbnQpO1xuICAgICAgaWYgKCFmb3JtU3RhdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBtb3VudCB0aGUgcmVkdXgtZm9ybSByZWR1Y2VyIGF0IFwiJyArIHJlZHV4TW91bnRQb2ludCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcm1TdGF0ZSAmJiBmb3JtU3RhdGVbZm9ybU5hbWVdICYmIGZvcm1TdGF0ZVtmb3JtTmFtZV1bZm9ybUtleV07XG4gICAgfSksICgwLCBfd3JhcE1hcERpc3BhdGNoVG9Qcm9wczIuZGVmYXVsdCkobWFwRGlzcGF0Y2hUb1Byb3BzLCAoMCwgX2JpbmRBY3Rpb25EYXRhMi5kZWZhdWx0KSh1bmJvdW5kQWN0aW9ucywge1xuICAgICAgZm9ybTogZm9ybU5hbWUsXG4gICAgICBrZXk6IGZvcm1LZXlcbiAgICB9KSksIG1lcmdlUHJvcHMsIG9wdGlvbnMpIDogY29ubmVjdCgoMCwgX3dyYXBNYXBTdGF0ZVRvUHJvcHMyLmRlZmF1bHQpKG1hcFN0YXRlVG9Qcm9wcywgZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICB2YXIgZm9ybVN0YXRlID0gZ2V0Rm9ybVN0YXRlKHN0YXRlLCByZWR1eE1vdW50UG9pbnQpO1xuICAgICAgaWYgKCFmb3JtU3RhdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBtb3VudCB0aGUgcmVkdXgtZm9ybSByZWR1Y2VyIGF0IFwiJyArIHJlZHV4TW91bnRQb2ludCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcm1TdGF0ZSAmJiBmb3JtU3RhdGVbZm9ybU5hbWVdO1xuICAgIH0pLCAoMCwgX3dyYXBNYXBEaXNwYXRjaFRvUHJvcHMyLmRlZmF1bHQpKG1hcERpc3BhdGNoVG9Qcm9wcywgKDAsIF9iaW5kQWN0aW9uRGF0YTIuZGVmYXVsdCkodW5ib3VuZEFjdGlvbnMsIHsgZm9ybTogZm9ybU5hbWUgfSkpLCBtZXJnZVByb3BzLCBvcHRpb25zKTtcblxuICAgIHJldHVybiBkZWNvcmF0ZShSZWR1eEZvcm0pO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQ7XG59LHtcIi4vYWN0aW9uc1wiOjQwLFwiLi9hc3luY1ZhbGlkYXRpb25cIjo0MSxcIi4vYmluZEFjdGlvbkRhdGFcIjo0MixcIi4vZXZlbnRzL3NpbGVuY2VFdmVudFwiOjU1LFwiLi9ldmVudHMvc2lsZW5jZUV2ZW50c1wiOjU2LFwiLi9nZXREaXNwbGF5TmFtZVwiOjU4LFwiLi9nZXRWYWx1ZXNcIjo1OSxcIi4vaGFuZGxlU3VibWl0XCI6NjEsXCIuL2lzVmFsaWRcIjo2NSxcIi4vcmVhZEZpZWxkc1wiOjcwLFwiLi9yZWR1Y2VyXCI6NzEsXCIuL3dyYXBNYXBEaXNwYXRjaFRvUHJvcHNcIjo3NyxcIi4vd3JhcE1hcFN0YXRlVG9Qcm9wc1wiOjc4LFwiZGVlcC1lcXVhbFwiOjI2fV0sNDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY3JlYXRlUHJvcFR5cGVzID0gZnVuY3Rpb24gY3JlYXRlUHJvcFR5cGVzKF9yZWYpIHtcbiAgdmFyIF9yZWYkUHJvcFR5cGVzID0gX3JlZi5Qcm9wVHlwZXM7XG4gIHZhciBhbnkgPSBfcmVmJFByb3BUeXBlcy5hbnk7XG4gIHZhciBib29sID0gX3JlZiRQcm9wVHlwZXMuYm9vbDtcbiAgdmFyIHN0cmluZyA9IF9yZWYkUHJvcFR5cGVzLnN0cmluZztcbiAgdmFyIGZ1bmMgPSBfcmVmJFByb3BUeXBlcy5mdW5jO1xuICB2YXIgb2JqZWN0ID0gX3JlZiRQcm9wVHlwZXMub2JqZWN0O1xuICByZXR1cm4ge1xuICAgIC8vIFN0YXRlOlxuICAgIGFjdGl2ZTogc3RyaW5nLCAvLyBjdXJyZW50bHkgYWN0aXZlIGZpZWxkXG4gICAgYXN5bmNWYWxpZGF0aW5nOiBib29sLmlzUmVxdWlyZWQsIC8vIHRydWUgaWYgYXN5bmMgdmFsaWRhdGlvbiBpcyBydW5uaW5nXG4gICAgYXV0b2ZpbGxlZDogYm9vbCwgLy8gdHJ1ZSBpZiBzZXQgcHJvZ3JhbW1hdGljYWxseSBieSBhdXRvZmlsbFxuICAgIGRpcnR5OiBib29sLmlzUmVxdWlyZWQsIC8vIHRydWUgaWYgYW55IHZhbHVlcyBhcmUgZGlmZmVyZW50IGZyb20gaW5pdGlhbFZhbHVlc1xuICAgIGVycm9yOiBhbnksIC8vIGZvcm0td2lkZSBlcnJvciBmcm9tICdfZXJyb3InIGtleSBpbiB2YWxpZGF0aW9uIHJlc3VsdFxuICAgIGVycm9yczogb2JqZWN0LCAvLyBhIG1hcCBvZiBlcnJvcnMgY29ycmVzcG9uZGluZyB0byBzdHJ1Y3R1cmUgb2YgZm9ybSBkYXRhIChyZXN1bHQgb2YgdmFsaWRhdGlvbilcbiAgICBmaWVsZHM6IG9iamVjdC5pc1JlcXVpcmVkLCAvLyB0aGUgbWFwIG9mIGZpZWxkc1xuICAgIGZvcm1LZXk6IGFueSwgLy8gdGhlIGZvcm0ga2V5IGlmIG9uZSB3YXMgcHJvdmlkZWQgKHVzZWQgd2hlbiBkb2luZyBtdWx0aXJlY29yZCBmb3JtcylcbiAgICBpbnZhbGlkOiBib29sLmlzUmVxdWlyZWQsIC8vIHRydWUgaWYgdGhlcmUgYXJlIGFueSB2YWxpZGF0aW9uIGVycm9yc1xuICAgIHByaXN0aW5lOiBib29sLmlzUmVxdWlyZWQsIC8vIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWUgYXMgaW5pdGlhbFZhbHVlc1xuICAgIHN1Ym1pdHRpbmc6IGJvb2wuaXNSZXF1aXJlZCwgLy8gdHJ1ZSBpZiB0aGUgZm9ybSBpcyBpbiB0aGUgcHJvY2VzcyBvZiBiZWluZyBzdWJtaXR0ZWRcbiAgICBzdWJtaXRGYWlsZWQ6IGJvb2wuaXNSZXF1aXJlZCwgLy8gdHJ1ZSBpZiB0aGUgZm9ybSB3YXMgc3VibWl0dGVkIGFuZCBmYWlsZWQgZm9yIGFueSByZWFzb25cbiAgICB2YWxpZDogYm9vbC5pc1JlcXVpcmVkLCAvLyB0cnVlIGlmIHRoZXJlIGFyZSBubyB2YWxpZGF0aW9uIGVycm9yc1xuICAgIHZhbHVlczogb2JqZWN0LmlzUmVxdWlyZWQsIC8vIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gYXMgdGhleSB3aWxsIGJlIHN1Ym1pdHRlZFxuXG4gICAgLy8gQWN0aW9uczpcbiAgICBhc3luY1ZhbGlkYXRlOiBmdW5jLmlzUmVxdWlyZWQsIC8vIGZ1bmN0aW9uIHRvIHRyaWdnZXIgYXN5bmMgdmFsaWRhdGlvblxuICAgIGRlc3Ryb3lGb3JtOiBmdW5jLmlzUmVxdWlyZWQsIC8vIGFjdGlvbiB0byBkZXN0cm95IHRoZSBmb3JtJ3MgZGF0YSBpbiBSZWR1eFxuICAgIGhhbmRsZVN1Ym1pdDogZnVuYy5pc1JlcXVpcmVkLCAvLyBmdW5jdGlvbiB0byBzdWJtaXQgdGhlIGZvcm1cbiAgICBpbml0aWFsaXplRm9ybTogZnVuYy5pc1JlcXVpcmVkLCAvLyBhY3Rpb24gdG8gaW5pdGlhbGl6ZSBmb3JtIGRhdGFcbiAgICByZXNldEZvcm06IGZ1bmMuaXNSZXF1aXJlZCwgLy8gYWN0aW9uIHRvIHJlc2V0IHRoZSBmb3JtIGRhdGEgdG8gcHJldmlvdXNseSBpbml0aWFsaXplZCB2YWx1ZXNcbiAgICB0b3VjaDogZnVuYy5pc1JlcXVpcmVkLCAvLyBhY3Rpb24gdG8gbWFyayBmaWVsZHMgYXMgdG91Y2hlZFxuICAgIHRvdWNoQWxsOiBmdW5jLmlzUmVxdWlyZWQsIC8vIGFjdGlvbiB0byBtYXJrIEFMTCBmaWVsZHMgYXMgdG91Y2hlZFxuICAgIHVudG91Y2g6IGZ1bmMuaXNSZXF1aXJlZCwgLy8gYWN0aW9uIHRvIG1hcmsgZmllbGRzIGFzIHVudG91Y2hlZFxuICAgIHVudG91Y2hBbGw6IGZ1bmMuaXNSZXF1aXJlZCAvLyBhY3Rpb24gdG8gbWFyayBBTEwgZmllbGRzIGFzIHVudG91Y2hlZFxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvcFR5cGVzO1xufSx7fV0sNDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZVJlZHV4Rm9ybUNvbm5lY3RvciA9IHJlcXVpcmUoJy4vY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yJyk7XG5cbnZhciBfY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVJlZHV4Rm9ybUNvbm5lY3Rvcik7XG5cbnZhciBfaG9pc3ROb25SZWFjdFN0YXRpY3MgPSByZXF1aXJlKCdob2lzdC1ub24tcmVhY3Qtc3RhdGljcycpO1xuXG52YXIgX2hvaXN0Tm9uUmVhY3RTdGF0aWNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hvaXN0Tm9uUmVhY3RTdGF0aWNzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRoZSBkZWNvcmF0b3IgdGhhdCBpcyB0aGUgbWFpbiBBUEkgdG8gcmVkdXgtZm9ybVxuICovXG52YXIgY3JlYXRlUmVkdXhGb3JtID0gZnVuY3Rpb24gY3JlYXRlUmVkdXhGb3JtKGlzUmVhY3ROYXRpdmUsIFJlYWN0LCBjb25uZWN0KSB7XG4gIHZhciBDb21wb25lbnQgPSBSZWFjdC5Db21wb25lbnQ7XG5cbiAgdmFyIHJlZHV4Rm9ybUNvbm5lY3RvciA9ICgwLCBfY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yMi5kZWZhdWx0KShpc1JlYWN0TmF0aXZlLCBSZWFjdCwgY29ubmVjdCk7XG4gIHJldHVybiBmdW5jdGlvbiAoY29uZmlnLCBtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgb3B0aW9ucykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoV3JhcHBlZENvbXBvbmVudCkge1xuICAgICAgdmFyIFJlZHV4Rm9ybUNvbm5lY3RvciA9IHJlZHV4Rm9ybUNvbm5lY3RvcihXcmFwcGVkQ29tcG9uZW50LCBtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgb3B0aW9ucyk7XG4gICAgICB2YXIgY29uZmlnV2l0aERlZmF1bHRzID0gX2V4dGVuZHMoe1xuICAgICAgICBvdmVyd3JpdGVPbkluaXRpYWxWYWx1ZXNDaGFuZ2U6IHRydWUsXG4gICAgICAgIHRvdWNoT25CbHVyOiB0cnVlLFxuICAgICAgICB0b3VjaE9uQ2hhbmdlOiBmYWxzZSxcbiAgICAgICAgZGVzdHJveU9uVW5tb3VudDogdHJ1ZVxuICAgICAgfSwgY29uZmlnKTtcblxuICAgICAgdmFyIENvbm5lY3RlZEZvcm0gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgICBfaW5oZXJpdHMoQ29ubmVjdGVkRm9ybSwgX0NvbXBvbmVudCk7XG5cbiAgICAgICAgZnVuY3Rpb24gQ29ubmVjdGVkRm9ybShwcm9wcykge1xuICAgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb25uZWN0ZWRGb3JtKTtcblxuICAgICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgICAgICAgX3RoaXMuaGFuZGxlU3VibWl0UGFzc2JhY2sgPSBfdGhpcy5oYW5kbGVTdWJtaXRQYXNzYmFjay5iaW5kKF90aGlzKTtcbiAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBDb25uZWN0ZWRGb3JtLnByb3RvdHlwZS5oYW5kbGVTdWJtaXRQYXNzYmFjayA9IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdFBhc3NiYWNrKHN1Ym1pdCkge1xuICAgICAgICAgIHRoaXMuc3VibWl0ID0gc3VibWl0O1xuICAgICAgICB9O1xuXG4gICAgICAgIENvbm5lY3RlZEZvcm0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWR1eEZvcm1Db25uZWN0b3IsIF9leHRlbmRzKHt9LCBjb25maWdXaXRoRGVmYXVsdHMsIHRoaXMucHJvcHMsIHtcbiAgICAgICAgICAgIHN1Ym1pdFBhc3NiYWNrOiB0aGlzLmhhbmRsZVN1Ym1pdFBhc3NiYWNrIH0pKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQ29ubmVjdGVkRm9ybTtcbiAgICAgIH0oQ29tcG9uZW50KTtcblxuICAgICAgcmV0dXJuICgwLCBfaG9pc3ROb25SZWFjdFN0YXRpY3MyLmRlZmF1bHQpKENvbm5lY3RlZEZvcm0sIFdyYXBwZWRDb21wb25lbnQpO1xuICAgIH07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVSZWR1eEZvcm07XG59LHtcIi4vY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yXCI6NDcsXCJob2lzdC1ub24tcmVhY3Qtc3RhdGljc1wiOjI5fV0sNDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX25vR2V0dGVycyA9IHJlcXVpcmUoJ3JlYWN0LWxhenktY2FjaGUvbm9HZXR0ZXJzJyk7XG5cbnZhciBfbm9HZXR0ZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25vR2V0dGVycyk7XG5cbnZhciBfZ2V0RGlzcGxheU5hbWUgPSByZXF1aXJlKCcuL2dldERpc3BsYXlOYW1lJyk7XG5cbnZhciBfZ2V0RGlzcGxheU5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0RGlzcGxheU5hbWUpO1xuXG52YXIgX2NyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCcpO1xuXG52YXIgX2NyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgdHJhY2tzIHByb3BzIHRoYXQgYWZmZWN0IGhvdyB0aGUgZm9ybSBpcyBtb3VudGVkIHRvIHRoZSBzdG9yZS4gTm9ybWFsbHkgdGhlc2Ugc2hvdWxkIG5vdCBjaGFuZ2UsXG4gKiBidXQgaWYgdGhleSBkbywgdGhlIGNvbm5lY3RlZCBjb21wb25lbnRzIGJlbG93IGl0IG5lZWQgdG8gYmUgcmVkZWZpbmVkLlxuICovXG52YXIgY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yID0gZnVuY3Rpb24gY3JlYXRlUmVkdXhGb3JtQ29ubmVjdG9yKGlzUmVhY3ROYXRpdmUsIFJlYWN0LCBjb25uZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoV3JhcHBlZENvbXBvbmVudCwgbWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMpIHtcbiAgICB2YXIgQ29tcG9uZW50ID0gUmVhY3QuQ29tcG9uZW50O1xuICAgIHZhciBQcm9wVHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbiAgICB2YXIgUmVkdXhGb3JtQ29ubmVjdG9yID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICAgIF9pbmhlcml0cyhSZWR1eEZvcm1Db25uZWN0b3IsIF9Db21wb25lbnQpO1xuXG4gICAgICBmdW5jdGlvbiBSZWR1eEZvcm1Db25uZWN0b3IocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlZHV4Rm9ybUNvbm5lY3Rvcik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICAgICAgX3RoaXMuY2FjaGUgPSBuZXcgX25vR2V0dGVyczIuZGVmYXVsdChfdGhpcywge1xuICAgICAgICAgIFJlZHV4Rm9ybToge1xuICAgICAgICAgICAgcGFyYW1zOiBbXG4gICAgICAgICAgICAvLyBwcm9wcyB0aGF0IGVmZmVjdCBob3cgcmVkdXgtZm9ybSBjb25uZWN0cyB0byB0aGUgcmVkdXggc3RvcmVcbiAgICAgICAgICAgICdyZWR1eE1vdW50UG9pbnQnLCAnZm9ybScsICdmb3JtS2V5JywgJ2dldEZvcm1TdGF0ZSddLFxuICAgICAgICAgICAgZm46ICgwLCBfY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQyLmRlZmF1bHQpKHByb3BzLCBpc1JlYWN0TmF0aXZlLCBSZWFjdCwgY29ubmVjdCwgV3JhcHBlZENvbXBvbmVudCwgbWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuXG4gICAgICBSZWR1eEZvcm1Db25uZWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLmNhY2hlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIFJlZHV4Rm9ybUNvbm5lY3Rvci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgUmVkdXhGb3JtID0gdGhpcy5jYWNoZS5nZXQoJ1JlZHV4Rm9ybScpO1xuICAgICAgICAvLyByZW1vdmUgc29tZSByZWR1eC1mb3JtIGNvbmZpZy1vbmx5IHByb3BzXG4gICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICB2YXIgcmVkdXhNb3VudFBvaW50ID0gX3Byb3BzLnJlZHV4TW91bnRQb2ludDtcbiAgICAgICAgdmFyIGRlc3Ryb3lPblVubW91bnQgPSBfcHJvcHMuZGVzdHJveU9uVW5tb3VudDtcbiAgICAgICAgdmFyIGZvcm0gPSBfcHJvcHMuZm9ybTtcbiAgICAgICAgdmFyIGdldEZvcm1TdGF0ZSA9IF9wcm9wcy5nZXRGb3JtU3RhdGU7XG4gICAgICAgIHZhciB0b3VjaE9uQmx1ciA9IF9wcm9wcy50b3VjaE9uQmx1cjtcbiAgICAgICAgdmFyIHRvdWNoT25DaGFuZ2UgPSBfcHJvcHMudG91Y2hPbkNoYW5nZTtcblxuICAgICAgICB2YXIgcGFzc2FibGVQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsncmVkdXhNb3VudFBvaW50JywgJ2Rlc3Ryb3lPblVubW91bnQnLCAnZm9ybScsICdnZXRGb3JtU3RhdGUnLCAndG91Y2hPbkJsdXInLCAndG91Y2hPbkNoYW5nZSddKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZWRlY2xhcmVcblxuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlZHV4Rm9ybSwgcGFzc2FibGVQcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVkdXhGb3JtQ29ubmVjdG9yO1xuICAgIH0oQ29tcG9uZW50KTtcblxuICAgIFJlZHV4Rm9ybUNvbm5lY3Rvci5kaXNwbGF5TmFtZSA9ICdSZWR1eEZvcm1Db25uZWN0b3IoJyArICgwLCBfZ2V0RGlzcGxheU5hbWUyLmRlZmF1bHQpKFdyYXBwZWRDb21wb25lbnQpICsgJyknO1xuICAgIFJlZHV4Rm9ybUNvbm5lY3Rvci5XcmFwcGVkQ29tcG9uZW50ID0gV3JhcHBlZENvbXBvbmVudDtcbiAgICBSZWR1eEZvcm1Db25uZWN0b3IucHJvcFR5cGVzID0ge1xuICAgICAgZGVzdHJveU9uVW5tb3VudDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICByZWR1eE1vdW50UG9pbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBmb3JtOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBmb3JtS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZ2V0Rm9ybVN0YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIHRvdWNoT25CbHVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIHRvdWNoT25DaGFuZ2U6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcbiAgICBSZWR1eEZvcm1Db25uZWN0b3IuZGVmYXVsdFByb3BzID0ge1xuICAgICAgcmVkdXhNb3VudFBvaW50OiAnZm9ybScsXG4gICAgICBnZXRGb3JtU3RhdGU6IGZ1bmN0aW9uIGdldEZvcm1TdGF0ZShzdGF0ZSwgcmVkdXhNb3VudFBvaW50KSB7XG4gICAgICAgIHJldHVybiBzdGF0ZVtyZWR1eE1vdW50UG9pbnRdO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFJlZHV4Rm9ybUNvbm5lY3RvcjtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVJlZHV4Rm9ybUNvbm5lY3Rvcjtcbn0se1wiLi9jcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudFwiOjQ0LFwiLi9nZXREaXNwbGF5TmFtZVwiOjU4LFwicmVhY3QtbGF6eS1jYWNoZS9ub0dldHRlcnNcIjozOH1dLDQ4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9nZXRWYWx1ZSA9IHJlcXVpcmUoJy4vZ2V0VmFsdWUnKTtcblxudmFyIF9nZXRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVPbkJsdXIgPSBmdW5jdGlvbiBjcmVhdGVPbkJsdXIobmFtZSwgYmx1ciwgaXNSZWFjdE5hdGl2ZSwgYWZ0ZXJCbHVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSAoMCwgX2dldFZhbHVlMi5kZWZhdWx0KShldmVudCwgaXNSZWFjdE5hdGl2ZSk7XG4gICAgYmx1cihuYW1lLCB2YWx1ZSk7XG4gICAgaWYgKGFmdGVyQmx1cikge1xuICAgICAgYWZ0ZXJCbHVyKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH07XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlT25CbHVyO1xufSx7XCIuL2dldFZhbHVlXCI6NTN9XSw0OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZ2V0VmFsdWUgPSByZXF1aXJlKCcuL2dldFZhbHVlJyk7XG5cbnZhciBfZ2V0VmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmFsdWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlT25DaGFuZ2UgPSBmdW5jdGlvbiBjcmVhdGVPbkNoYW5nZShuYW1lLCBjaGFuZ2UsIGlzUmVhY3ROYXRpdmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiBjaGFuZ2UobmFtZSwgKDAsIF9nZXRWYWx1ZTIuZGVmYXVsdCkoZXZlbnQsIGlzUmVhY3ROYXRpdmUpKTtcbiAgfTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVPbkNoYW5nZTtcbn0se1wiLi9nZXRWYWx1ZVwiOjUzfV0sNTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGRhdGFLZXkgPSBleHBvcnRzLmRhdGFLZXkgPSAndmFsdWUnO1xudmFyIGNyZWF0ZU9uRHJhZ1N0YXJ0ID0gZnVuY3Rpb24gY3JlYXRlT25EcmFnU3RhcnQobmFtZSwgZ2V0VmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKGRhdGFLZXksIGdldFZhbHVlKCkpO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlT25EcmFnU3RhcnQ7XG59LHt9XSw1MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfY3JlYXRlT25EcmFnU3RhcnQgPSByZXF1aXJlKCcuL2NyZWF0ZU9uRHJhZ1N0YXJ0Jyk7XG5cbnZhciBjcmVhdGVPbkRyb3AgPSBmdW5jdGlvbiBjcmVhdGVPbkRyb3AobmFtZSwgY2hhbmdlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjaGFuZ2UobmFtZSwgZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoX2NyZWF0ZU9uRHJhZ1N0YXJ0LmRhdGFLZXkpKTtcbiAgfTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVPbkRyb3A7XG59LHtcIi4vY3JlYXRlT25EcmFnU3RhcnRcIjo1MH1dLDUyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNyZWF0ZU9uRm9jdXMgPSBmdW5jdGlvbiBjcmVhdGVPbkZvY3VzKG5hbWUsIGZvY3VzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZvY3VzKG5hbWUpO1xuICB9O1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZU9uRm9jdXM7XG59LHt9XSw1MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNFdmVudCA9IHJlcXVpcmUoJy4vaXNFdmVudCcpO1xuXG52YXIgX2lzRXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNFdmVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBnZXRTZWxlY3RlZFZhbHVlcyA9IGZ1bmN0aW9uIGdldFNlbGVjdGVkVmFsdWVzKG9wdGlvbnMpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob3B0aW9ucykge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBvcHRpb25zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbaW5kZXhdO1xuICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICByZXN1bHQucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoZXZlbnQsIGlzUmVhY3ROYXRpdmUpIHtcbiAgaWYgKCgwLCBfaXNFdmVudDIuZGVmYXVsdCkoZXZlbnQpKSB7XG4gICAgaWYgKCFpc1JlYWN0TmF0aXZlICYmIGV2ZW50Lm5hdGl2ZUV2ZW50ICYmIGV2ZW50Lm5hdGl2ZUV2ZW50LnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2ZW50Lm5hdGl2ZUV2ZW50LnRleHQ7XG4gICAgfVxuICAgIGlmIChpc1JlYWN0TmF0aXZlICYmIGV2ZW50Lm5hdGl2ZUV2ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmVudC5uYXRpdmVFdmVudC50ZXh0O1xuICAgIH1cbiAgICB2YXIgX2V2ZW50JHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgdHlwZSA9IF9ldmVudCR0YXJnZXQudHlwZTtcbiAgICB2YXIgdmFsdWUgPSBfZXZlbnQkdGFyZ2V0LnZhbHVlO1xuICAgIHZhciBjaGVja2VkID0gX2V2ZW50JHRhcmdldC5jaGVja2VkO1xuICAgIHZhciBmaWxlcyA9IF9ldmVudCR0YXJnZXQuZmlsZXM7XG4gICAgdmFyIGRhdGFUcmFuc2ZlciA9IGV2ZW50LmRhdGFUcmFuc2ZlcjtcblxuICAgIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICByZXR1cm4gY2hlY2tlZDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdmaWxlJykge1xuICAgICAgcmV0dXJuIGZpbGVzIHx8IGRhdGFUcmFuc2ZlciAmJiBkYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgICAgcmV0dXJuIGdldFNlbGVjdGVkVmFsdWVzKGV2ZW50LnRhcmdldC5vcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIC8vIG5vdCBhbiBldmVudCwgc28gbXVzdCBiZSBlaXRoZXIgb3VyIHZhbHVlIG9yIGFuIG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSBpbiB0aGUgJ3ZhbHVlJyBrZXlcbiAgcmV0dXJuIGV2ZW50ICYmIHR5cGVvZiBldmVudCA9PT0gJ29iamVjdCcgJiYgZXZlbnQudmFsdWUgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnZhbHVlIDogLy8gZXh0cmFjdCB2YWx1ZSBmcm9tIHsgdmFsdWU6IHZhbHVlIH0gc3RydWN0dXJlLiBodHRwczovL2dpdGh1Yi5jb20vbmlrZ3JhZi9iZWxsZS9pc3N1ZXMvNThcbiAgZXZlbnQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRWYWx1ZTtcbn0se1wiLi9pc0V2ZW50XCI6NTR9XSw1NDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBpc0V2ZW50ID0gZnVuY3Rpb24gaXNFdmVudChjYW5kaWRhdGUpIHtcbiAgcmV0dXJuICEhKGNhbmRpZGF0ZSAmJiBjYW5kaWRhdGUuc3RvcFByb3BhZ2F0aW9uICYmIGNhbmRpZGF0ZS5wcmV2ZW50RGVmYXVsdCk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpc0V2ZW50O1xufSx7fV0sNTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzRXZlbnQgPSByZXF1aXJlKCcuL2lzRXZlbnQnKTtcblxudmFyIF9pc0V2ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzRXZlbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc2lsZW5jZUV2ZW50ID0gZnVuY3Rpb24gc2lsZW5jZUV2ZW50KGV2ZW50KSB7XG4gIHZhciBpcyA9ICgwLCBfaXNFdmVudDIuZGVmYXVsdCkoZXZlbnQpO1xuICBpZiAoaXMpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHJldHVybiBpcztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHNpbGVuY2VFdmVudDtcbn0se1wiLi9pc0V2ZW50XCI6NTR9XSw1NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2lsZW5jZUV2ZW50ID0gcmVxdWlyZSgnLi9zaWxlbmNlRXZlbnQnKTtcblxudmFyIF9zaWxlbmNlRXZlbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2lsZW5jZUV2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHNpbGVuY2VFdmVudHMgPSBmdW5jdGlvbiBzaWxlbmNlRXZlbnRzKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX3NpbGVuY2VFdmVudDIuZGVmYXVsdCkoZXZlbnQpID8gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKSA6IGZuLmFwcGx5KHVuZGVmaW5lZCwgW2V2ZW50XS5jb25jYXQoYXJncykpO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2lsZW5jZUV2ZW50cztcbn0se1wiLi9zaWxlbmNlRXZlbnRcIjo1NX1dLDU3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMubWFrZUZpZWxkVmFsdWUgPSBtYWtlRmllbGRWYWx1ZTtcbmV4cG9ydHMuaXNGaWVsZFZhbHVlID0gaXNGaWVsZFZhbHVlO1xudmFyIGZsYWcgPSAnX2lzRmllbGRWYWx1ZSc7XG52YXIgaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xufTtcblxuZnVuY3Rpb24gbWFrZUZpZWxkVmFsdWUob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgJiYgaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGZsYWcsIHsgdmFsdWU6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gaXNGaWVsZFZhbHVlKG9iamVjdCkge1xuICByZXR1cm4gISEob2JqZWN0ICYmIGlzT2JqZWN0KG9iamVjdCkgJiYgb2JqZWN0W2ZsYWddKTtcbn1cbn0se31dLDU4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldERpc3BsYXlOYW1lO1xuZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoQ29tcCkge1xuICByZXR1cm4gQ29tcC5kaXNwbGF5TmFtZSB8fCBDb21wLm5hbWUgfHwgJ0NvbXBvbmVudCc7XG59XG59LHt9XSw1OTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vKipcbiAqIEdpdmVuIGEgc3RhdGVbZmllbGRdLCBnZXQgdGhlIHZhbHVlLlxuICogIEZhbGxiYWNrIHRvIC5pbml0aWFsVmFsdWUgd2hlbiAudmFsdWUgaXMgdW5kZWZpbmVkIHRvIHByZXZlbnQgZG91YmxlIHJlbmRlci9pbml0aWFsaXplIGN5Y2xlLlxuICogIFNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2VyaWtyYXMvcmVkdXgtZm9ybS9pc3N1ZXMvNjIxfS5cbiAqL1xudmFyIGl0ZW1Ub1ZhbHVlID0gZnVuY3Rpb24gaXRlbVRvVmFsdWUoX3JlZikge1xuICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlO1xuICB2YXIgaW5pdGlhbFZhbHVlID0gX3JlZi5pbml0aWFsVmFsdWU7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnID8gdmFsdWUgOiBpbml0aWFsVmFsdWU7XG59O1xuXG52YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZShmaWVsZCwgc3RhdGUsIGRlc3QpIHtcbiAgdmFyIGRvdEluZGV4ID0gZmllbGQuaW5kZXhPZignLicpO1xuICB2YXIgb3BlbkluZGV4ID0gZmllbGQuaW5kZXhPZignWycpO1xuICB2YXIgY2xvc2VJbmRleCA9IGZpZWxkLmluZGV4T2YoJ10nKTtcbiAgaWYgKG9wZW5JbmRleCA+IDAgJiYgY2xvc2VJbmRleCAhPT0gb3BlbkluZGV4ICsgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZm91bmQgWyBub3QgZm9sbG93ZWQgYnkgXScpO1xuICB9XG4gIGlmIChvcGVuSW5kZXggPiAwICYmIChkb3RJbmRleCA8IDAgfHwgb3BlbkluZGV4IDwgZG90SW5kZXgpKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGFycmF5IGZpZWxkXG4gICAgICB2YXIga2V5ID0gZmllbGQuc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgICB2YXIgcmVzdCA9IGZpZWxkLnN1YnN0cmluZyhjbG9zZUluZGV4ICsgMSk7XG4gICAgICBpZiAocmVzdFswXSA9PT0gJy4nKSB7XG4gICAgICAgIHJlc3QgPSByZXN0LnN1YnN0cmluZygxKTtcbiAgICAgIH1cbiAgICAgIHZhciBhcnJheSA9IHN0YXRlICYmIHN0YXRlW2tleV0gfHwgW107XG4gICAgICBpZiAocmVzdCkge1xuICAgICAgICBpZiAoIWRlc3Rba2V5XSkge1xuICAgICAgICAgIGRlc3Rba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFkZXN0W2tleV1baW5kZXhdKSB7XG4gICAgICAgICAgICBkZXN0W2tleV1baW5kZXhdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGdldFZhbHVlKHJlc3QsIGl0ZW0sIGRlc3Rba2V5XVtpbmRleF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc3Rba2V5XSA9IGFycmF5Lm1hcChpdGVtVG9WYWx1ZSk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfSBlbHNlIGlmIChkb3RJbmRleCA+IDApIHtcbiAgICAvLyBzdWJvYmplY3QgZmllbGRcbiAgICB2YXIgX2tleSA9IGZpZWxkLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gICAgdmFyIF9yZXN0ID0gZmllbGQuc3Vic3RyaW5nKGRvdEluZGV4ICsgMSk7XG4gICAgaWYgKCFkZXN0W19rZXldKSB7XG4gICAgICBkZXN0W19rZXldID0ge307XG4gICAgfVxuICAgIGdldFZhbHVlKF9yZXN0LCBzdGF0ZSAmJiBzdGF0ZVtfa2V5XSB8fCB7fSwgZGVzdFtfa2V5XSk7XG4gIH0gZWxzZSB7XG4gICAgZGVzdFtmaWVsZF0gPSBzdGF0ZVtmaWVsZF0gJiYgaXRlbVRvVmFsdWUoc3RhdGVbZmllbGRdKTtcbiAgfVxufTtcblxudmFyIGdldFZhbHVlcyA9IGZ1bmN0aW9uIGdldFZhbHVlcyhmaWVsZHMsIHN0YXRlKSB7XG4gIHJldHVybiBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgZmllbGQpIHtcbiAgICBnZXRWYWx1ZShmaWVsZCwgc3RhdGUsIGFjY3VtdWxhdG9yKTtcbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH0sIHt9KTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGdldFZhbHVlcztcbn0se31dLDYwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9maWVsZFZhbHVlID0gcmVxdWlyZSgnLi9maWVsZFZhbHVlJyk7XG5cbi8qKlxuICogQSBkaWZmZXJlbnQgdmVyc2lvbiBvZiBnZXRWYWx1ZXMoKSB0aGF0IGRvZXMgbm90IG5lZWQgdGhlIGZpZWxkcyBhcnJheVxuICovXG52YXIgZ2V0VmFsdWVzRnJvbVN0YXRlID0gZnVuY3Rpb24gZ2V0VmFsdWVzRnJvbVN0YXRlKHN0YXRlKSB7XG4gIGlmICghc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzdGF0ZSk7XG4gIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGtleSkge1xuICAgIHZhciBmaWVsZCA9IHN0YXRlW2tleV07XG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICBpZiAoKDAsIF9maWVsZFZhbHVlLmlzRmllbGRWYWx1ZSkoZmllbGQpKSB7XG4gICAgICAgIGlmIChmaWVsZC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IGZpZWxkLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZmllbGQpKSB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSBmaWVsZC5tYXAoZnVuY3Rpb24gKGFycmF5RmllbGQpIHtcbiAgICAgICAgICByZXR1cm4gKDAsIF9maWVsZFZhbHVlLmlzRmllbGRWYWx1ZSkoYXJyYXlGaWVsZCkgPyBhcnJheUZpZWxkLnZhbHVlIDogZ2V0VmFsdWVzRnJvbVN0YXRlKGFycmF5RmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpZWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0VmFsdWVzRnJvbVN0YXRlKGZpZWxkKTtcblxuICAgICAgICBpZiAocmVzdWx0ICYmIE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCB7fSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRWYWx1ZXNGcm9tU3RhdGU7XG59LHtcIi4vZmllbGRWYWx1ZVwiOjU3fV0sNjE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzUHJvbWlzZSA9IHJlcXVpcmUoJ2lzLXByb21pc2UnKTtcblxudmFyIF9pc1Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQcm9taXNlKTtcblxudmFyIF9pc1ZhbGlkID0gcmVxdWlyZSgnLi9pc1ZhbGlkJyk7XG5cbnZhciBfaXNWYWxpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGhhbmRsZVN1Ym1pdCA9IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChzdWJtaXQsIHZhbHVlcywgcHJvcHMsIGFzeW5jVmFsaWRhdGUpIHtcbiAgdmFyIGRpc3BhdGNoID0gcHJvcHMuZGlzcGF0Y2g7XG4gIHZhciBmaWVsZHMgPSBwcm9wcy5maWVsZHM7XG4gIHZhciBvblN1Ym1pdFN1Y2Nlc3MgPSBwcm9wcy5vblN1Ym1pdFN1Y2Nlc3M7XG4gIHZhciBvblN1Ym1pdEZhaWwgPSBwcm9wcy5vblN1Ym1pdEZhaWw7XG4gIHZhciBzdGFydFN1Ym1pdCA9IHByb3BzLnN0YXJ0U3VibWl0O1xuICB2YXIgc3RvcFN1Ym1pdCA9IHByb3BzLnN0b3BTdWJtaXQ7XG4gIHZhciBzdWJtaXRGYWlsZWQgPSBwcm9wcy5zdWJtaXRGYWlsZWQ7XG4gIHZhciByZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2UgPSBwcm9wcy5yZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2U7XG4gIHZhciB0b3VjaCA9IHByb3BzLnRvdWNoO1xuICB2YXIgdmFsaWRhdGUgPSBwcm9wcy52YWxpZGF0ZTtcblxuICB2YXIgc3luY0Vycm9ycyA9IHZhbGlkYXRlKHZhbHVlcywgcHJvcHMpO1xuICB0b3VjaC5hcHBseSh1bmRlZmluZWQsIGZpZWxkcyk7IC8vIHRvdWNoIGFsbCBmaWVsZHNcbiAgaWYgKCgwLCBfaXNWYWxpZDIuZGVmYXVsdCkoc3luY0Vycm9ycykpIHtcbiAgICB2YXIgZG9TdWJtaXQgPSBmdW5jdGlvbiBkb1N1Ym1pdCgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBzdWJtaXQodmFsdWVzLCBkaXNwYXRjaCk7XG4gICAgICBpZiAoKDAsIF9pc1Byb21pc2UyLmRlZmF1bHQpKHJlc3VsdCkpIHtcbiAgICAgICAgc3RhcnRTdWJtaXQoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChzdWJtaXRSZXN1bHQpIHtcbiAgICAgICAgICBzdG9wU3VibWl0KCk7XG4gICAgICAgICAgaWYgKG9uU3VibWl0U3VjY2Vzcykge1xuICAgICAgICAgICAgb25TdWJtaXRTdWNjZXNzKHN1Ym1pdFJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdWJtaXRSZXN1bHQ7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChzdWJtaXRFcnJvcikge1xuICAgICAgICAgIHN0b3BTdWJtaXQoc3VibWl0RXJyb3IpO1xuICAgICAgICAgIGlmIChvblN1Ym1pdEZhaWwpIHtcbiAgICAgICAgICAgIG9uU3VibWl0RmFpbChzdWJtaXRFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzdWJtaXRFcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChvblN1Ym1pdFN1Y2Nlc3MpIHtcbiAgICAgICAgb25TdWJtaXRTdWNjZXNzKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgdmFyIGFzeW5jVmFsaWRhdGVSZXN1bHQgPSBhc3luY1ZhbGlkYXRlKCk7XG4gICAgcmV0dXJuICgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShhc3luY1ZhbGlkYXRlUmVzdWx0KSA/XG4gICAgLy8gYXN5bmNWYWxpZGF0ZVJlc3VsdCB3aWxsIGJlIHJlamVjdGVkIGlmIGFzeW5jIHZhbGlkYXRpb24gZmFpbGVkXG4gICAgYXN5bmNWYWxpZGF0ZVJlc3VsdC50aGVuKGRvU3VibWl0LCBmdW5jdGlvbiAoKSB7XG4gICAgICBzdWJtaXRGYWlsZWQoKTtcbiAgICAgIGlmIChvblN1Ym1pdEZhaWwpIHtcbiAgICAgICAgb25TdWJtaXRGYWlsKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dXJuUmVqZWN0ZWRTdWJtaXRQcm9taXNlID8gUHJvbWlzZS5yZWplY3QoKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0pIDogZG9TdWJtaXQoKTsgLy8gbm8gYXN5bmMgdmFsaWRhdGlvbiwgc28gc3VibWl0XG4gIH1cbiAgc3VibWl0RmFpbGVkKCk7XG5cbiAgaWYgKG9uU3VibWl0RmFpbCkge1xuICAgIG9uU3VibWl0RmFpbChzeW5jRXJyb3JzKTtcbiAgfVxuXG4gIGlmIChyZXR1cm5SZWplY3RlZFN1Ym1pdFByb21pc2UpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc3luY0Vycm9ycyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGhhbmRsZVN1Ym1pdDtcbn0se1wiLi9pc1ZhbGlkXCI6NjUsXCJpcy1wcm9taXNlXCI6MzB9XSw2MjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnVudG91Y2hXaXRoS2V5ID0gZXhwb3J0cy51bnRvdWNoID0gZXhwb3J0cy50b3VjaFdpdGhLZXkgPSBleHBvcnRzLnRvdWNoID0gZXhwb3J0cy5zd2FwQXJyYXlWYWx1ZXMgPSBleHBvcnRzLnN0b3BTdWJtaXQgPSBleHBvcnRzLnN0b3BBc3luY1ZhbGlkYXRpb24gPSBleHBvcnRzLnN0YXJ0U3VibWl0ID0gZXhwb3J0cy5zdGFydEFzeW5jVmFsaWRhdGlvbiA9IGV4cG9ydHMucmVzZXQgPSBleHBvcnRzLnByb3BUeXBlcyA9IGV4cG9ydHMuaW5pdGlhbGl6ZVdpdGhLZXkgPSBleHBvcnRzLmluaXRpYWxpemUgPSBleHBvcnRzLmdldFZhbHVlcyA9IGV4cG9ydHMucmVtb3ZlQXJyYXlWYWx1ZSA9IGV4cG9ydHMucmVkdXhGb3JtID0gZXhwb3J0cy5yZWR1Y2VyID0gZXhwb3J0cy5mb2N1cyA9IGV4cG9ydHMuZGVzdHJveSA9IGV4cG9ydHMuY2hhbmdlV2l0aEtleSA9IGV4cG9ydHMuY2hhbmdlID0gZXhwb3J0cy5ibHVyID0gZXhwb3J0cy5hdXRvZmlsbFdpdGhLZXkgPSBleHBvcnRzLmF1dG9maWxsID0gZXhwb3J0cy5hZGRBcnJheVZhbHVlID0gZXhwb3J0cy5hY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0UmVkdXggPSByZXF1aXJlKCdyZWFjdC1yZWR1eCcpO1xuXG52YXIgX2NyZWF0ZUFsbDIgPSByZXF1aXJlKCcuL2NyZWF0ZUFsbCcpO1xuXG52YXIgX2NyZWF0ZUFsbDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVBbGwyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGlzTmF0aXZlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLnByb2R1Y3QgJiYgd2luZG93Lm5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnO1xuXG52YXIgX2NyZWF0ZUFsbCA9ICgwLCBfY3JlYXRlQWxsMy5kZWZhdWx0KShpc05hdGl2ZSwgX3JlYWN0Mi5kZWZhdWx0LCBfcmVhY3RSZWR1eC5jb25uZWN0KTtcblxudmFyIGFjdGlvblR5cGVzID0gX2NyZWF0ZUFsbC5hY3Rpb25UeXBlcztcbnZhciBhZGRBcnJheVZhbHVlID0gX2NyZWF0ZUFsbC5hZGRBcnJheVZhbHVlO1xudmFyIGF1dG9maWxsID0gX2NyZWF0ZUFsbC5hdXRvZmlsbDtcbnZhciBhdXRvZmlsbFdpdGhLZXkgPSBfY3JlYXRlQWxsLmF1dG9maWxsV2l0aEtleTtcbnZhciBibHVyID0gX2NyZWF0ZUFsbC5ibHVyO1xudmFyIGNoYW5nZSA9IF9jcmVhdGVBbGwuY2hhbmdlO1xudmFyIGNoYW5nZVdpdGhLZXkgPSBfY3JlYXRlQWxsLmNoYW5nZVdpdGhLZXk7XG52YXIgZGVzdHJveSA9IF9jcmVhdGVBbGwuZGVzdHJveTtcbnZhciBmb2N1cyA9IF9jcmVhdGVBbGwuZm9jdXM7XG52YXIgcmVkdWNlciA9IF9jcmVhdGVBbGwucmVkdWNlcjtcbnZhciByZWR1eEZvcm0gPSBfY3JlYXRlQWxsLnJlZHV4Rm9ybTtcbnZhciByZW1vdmVBcnJheVZhbHVlID0gX2NyZWF0ZUFsbC5yZW1vdmVBcnJheVZhbHVlO1xudmFyIGdldFZhbHVlcyA9IF9jcmVhdGVBbGwuZ2V0VmFsdWVzO1xudmFyIGluaXRpYWxpemUgPSBfY3JlYXRlQWxsLmluaXRpYWxpemU7XG52YXIgaW5pdGlhbGl6ZVdpdGhLZXkgPSBfY3JlYXRlQWxsLmluaXRpYWxpemVXaXRoS2V5O1xudmFyIHByb3BUeXBlcyA9IF9jcmVhdGVBbGwucHJvcFR5cGVzO1xudmFyIHJlc2V0ID0gX2NyZWF0ZUFsbC5yZXNldDtcbnZhciBzdGFydEFzeW5jVmFsaWRhdGlvbiA9IF9jcmVhdGVBbGwuc3RhcnRBc3luY1ZhbGlkYXRpb247XG52YXIgc3RhcnRTdWJtaXQgPSBfY3JlYXRlQWxsLnN0YXJ0U3VibWl0O1xudmFyIHN0b3BBc3luY1ZhbGlkYXRpb24gPSBfY3JlYXRlQWxsLnN0b3BBc3luY1ZhbGlkYXRpb247XG52YXIgc3RvcFN1Ym1pdCA9IF9jcmVhdGVBbGwuc3RvcFN1Ym1pdDtcbnZhciBzd2FwQXJyYXlWYWx1ZXMgPSBfY3JlYXRlQWxsLnN3YXBBcnJheVZhbHVlcztcbnZhciB0b3VjaCA9IF9jcmVhdGVBbGwudG91Y2g7XG52YXIgdG91Y2hXaXRoS2V5ID0gX2NyZWF0ZUFsbC50b3VjaFdpdGhLZXk7XG52YXIgdW50b3VjaCA9IF9jcmVhdGVBbGwudW50b3VjaDtcbnZhciB1bnRvdWNoV2l0aEtleSA9IF9jcmVhdGVBbGwudW50b3VjaFdpdGhLZXk7XG5leHBvcnRzLmFjdGlvblR5cGVzID0gYWN0aW9uVHlwZXM7XG5leHBvcnRzLmFkZEFycmF5VmFsdWUgPSBhZGRBcnJheVZhbHVlO1xuZXhwb3J0cy5hdXRvZmlsbCA9IGF1dG9maWxsO1xuZXhwb3J0cy5hdXRvZmlsbFdpdGhLZXkgPSBhdXRvZmlsbFdpdGhLZXk7XG5leHBvcnRzLmJsdXIgPSBibHVyO1xuZXhwb3J0cy5jaGFuZ2UgPSBjaGFuZ2U7XG5leHBvcnRzLmNoYW5nZVdpdGhLZXkgPSBjaGFuZ2VXaXRoS2V5O1xuZXhwb3J0cy5kZXN0cm95ID0gZGVzdHJveTtcbmV4cG9ydHMuZm9jdXMgPSBmb2N1cztcbmV4cG9ydHMucmVkdWNlciA9IHJlZHVjZXI7XG5leHBvcnRzLnJlZHV4Rm9ybSA9IHJlZHV4Rm9ybTtcbmV4cG9ydHMucmVtb3ZlQXJyYXlWYWx1ZSA9IHJlbW92ZUFycmF5VmFsdWU7XG5leHBvcnRzLmdldFZhbHVlcyA9IGdldFZhbHVlcztcbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGluaXRpYWxpemU7XG5leHBvcnRzLmluaXRpYWxpemVXaXRoS2V5ID0gaW5pdGlhbGl6ZVdpdGhLZXk7XG5leHBvcnRzLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbmV4cG9ydHMucmVzZXQgPSByZXNldDtcbmV4cG9ydHMuc3RhcnRBc3luY1ZhbGlkYXRpb24gPSBzdGFydEFzeW5jVmFsaWRhdGlvbjtcbmV4cG9ydHMuc3RhcnRTdWJtaXQgPSBzdGFydFN1Ym1pdDtcbmV4cG9ydHMuc3RvcEFzeW5jVmFsaWRhdGlvbiA9IHN0b3BBc3luY1ZhbGlkYXRpb247XG5leHBvcnRzLnN0b3BTdWJtaXQgPSBzdG9wU3VibWl0O1xuZXhwb3J0cy5zd2FwQXJyYXlWYWx1ZXMgPSBzd2FwQXJyYXlWYWx1ZXM7XG5leHBvcnRzLnRvdWNoID0gdG91Y2g7XG5leHBvcnRzLnRvdWNoV2l0aEtleSA9IHRvdWNoV2l0aEtleTtcbmV4cG9ydHMudW50b3VjaCA9IHVudG91Y2g7XG5leHBvcnRzLnVudG91Y2hXaXRoS2V5ID0gdW50b3VjaFdpdGhLZXk7XG59LHtcIi4vY3JlYXRlQWxsXCI6NDMsXCJyZWFjdFwiOlwicmVhY3RcIixcInJlYWN0LXJlZHV4XCI6XCJyZWFjdC1yZWR1eFwifV0sNjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2ZpZWxkVmFsdWUgPSByZXF1aXJlKCcuL2ZpZWxkVmFsdWUnKTtcblxudmFyIG1ha2VFbnRyeSA9IGZ1bmN0aW9uIG1ha2VFbnRyeSh2YWx1ZSwgcHJldmlvdXNWYWx1ZSwgb3ZlcndyaXRlVmFsdWVzKSB7XG4gIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHZhbHVlID09PSB1bmRlZmluZWQgPyB7fSA6IHtcbiAgICBpbml0aWFsOiB2YWx1ZSxcbiAgICB2YWx1ZTogb3ZlcndyaXRlVmFsdWVzID8gdmFsdWUgOiBwcmV2aW91c1ZhbHVlXG4gIH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbml0aWFsIHZhbHVlcyBpbnRvIHRoZSBzdGF0ZSBhbmQgcmV0dXJucyBhIG5ldyBjb3B5IG9mIHRoZSBzdGF0ZVxuICovXG52YXIgaW5pdGlhbGl6ZVN0YXRlID0gZnVuY3Rpb24gaW5pdGlhbGl6ZVN0YXRlKHZhbHVlcywgZmllbGRzKSB7XG4gIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuICB2YXIgb3ZlcndyaXRlVmFsdWVzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1szXTtcblxuICBpZiAoIWZpZWxkcykge1xuICAgIHRocm93IG5ldyBFcnJvcignZmllbGRzIG11c3QgYmUgcGFzc2VkIHdoZW4gaW5pdGlhbGl6aW5nIHN0YXRlJyk7XG4gIH1cbiAgaWYgKCF2YWx1ZXMgfHwgIWZpZWxkcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgdmFyIGluaXRpYWxpemVGaWVsZCA9IGZ1bmN0aW9uIGluaXRpYWxpemVGaWVsZChwYXRoLCBzcmMsIGRlc3QpIHtcbiAgICB2YXIgZG90SW5kZXggPSBwYXRoLmluZGV4T2YoJy4nKTtcbiAgICBpZiAoZG90SW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybiBpbml0aWFsaXplRmllbGQocGF0aC5zdWJzdHJpbmcoMSksIHNyYywgZGVzdCk7XG4gICAgfVxuICAgIHZhciBvcGVuSW5kZXggPSBwYXRoLmluZGV4T2YoJ1snKTtcbiAgICB2YXIgY2xvc2VJbmRleCA9IHBhdGguaW5kZXhPZignXScpO1xuICAgIHZhciByZXN1bHQgPSBfZXh0ZW5kcyh7fSwgZGVzdCkgfHwge307XG4gICAgaWYgKGRvdEluZGV4ID49IDAgJiYgKG9wZW5JbmRleCA8IDAgfHwgZG90SW5kZXggPCBvcGVuSW5kZXgpKSB7XG4gICAgICAvLyBpcyBkb3Qgbm90YXRpb25cbiAgICAgIHZhciBrZXkgPSBwYXRoLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gICAgICByZXN1bHRba2V5XSA9IHNyY1trZXldICYmIGluaXRpYWxpemVGaWVsZChwYXRoLnN1YnN0cmluZyhkb3RJbmRleCArIDEpLCBzcmNba2V5XSwgcmVzdWx0W2tleV0gfHwge30pO1xuICAgIH0gZWxzZSBpZiAob3BlbkluZGV4ID49IDAgJiYgKGRvdEluZGV4IDwgMCB8fCBvcGVuSW5kZXggPCBkb3RJbmRleCkpIHtcbiAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGlzIGFycmF5IG5vdGF0aW9uXG4gICAgICAgIGlmIChjbG9zZUluZGV4IDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZm91bmQgXFwnW1xcJyBidXQgbm8gXFwnXVxcJzogXFwnJyArIHBhdGggKyAnXFwnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IHBhdGguc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgICAgIHZhciBzcmNBcnJheSA9IHNyY1trZXldO1xuICAgICAgICB2YXIgZGVzdEFycmF5ID0gcmVzdWx0W2tleV07XG4gICAgICAgIHZhciByZXN0ID0gcGF0aC5zdWJzdHJpbmcoY2xvc2VJbmRleCArIDEpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzcmNBcnJheSkpIHtcbiAgICAgICAgICBpZiAocmVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8ga2VlcCByZWN1cnNpbmdcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc3JjQXJyYXkubWFwKGZ1bmN0aW9uIChzcmNWYWx1ZSwgc3JjSW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxpemVGaWVsZChyZXN0LCBzcmNWYWx1ZSwgZGVzdEFycmF5ICYmIGRlc3RBcnJheVtzcmNJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc3JjQXJyYXkubWFwKGZ1bmN0aW9uIChzcmNWYWx1ZSwgc3JjSW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1ha2VFbnRyeShzcmNWYWx1ZSwgZGVzdEFycmF5ICYmIGRlc3RBcnJheVtzcmNJbmRleF0gJiYgZGVzdEFycmF5W3NyY0luZGV4XS52YWx1ZSwgb3ZlcndyaXRlVmFsdWVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbcGF0aF0gPSBtYWtlRW50cnkoc3JjICYmIHNyY1twYXRoXSwgZGVzdCAmJiBkZXN0W3BhdGhdICYmIGRlc3RbcGF0aF0udmFsdWUsIG92ZXJ3cml0ZVZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgZmllbGQpIHtcbiAgICByZXR1cm4gaW5pdGlhbGl6ZUZpZWxkKGZpZWxkLCB2YWx1ZXMsIGFjY3VtdWxhdG9yKTtcbiAgfSwgX2V4dGVuZHMoe30sIHN0YXRlKSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpbml0aWFsaXplU3RhdGU7XG59LHtcIi4vZmllbGRWYWx1ZVwiOjU3fV0sNjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNQcmlzdGluZTtcbmZ1bmN0aW9uIGlzUHJpc3RpbmUoaW5pdGlhbCwgZGF0YSkge1xuICBpZiAoaW5pdGlhbCA9PT0gZGF0YSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5pdGlhbCA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBkYXRhID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gaW5pdGlhbCA9PT0gZGF0YTtcbiAgfSBlbHNlIGlmIChpbml0aWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBkYXRhIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBpbml0aWFsLmdldFRpbWUoKSA9PT0gZGF0YS5nZXRUaW1lKCk7XG4gIH0gZWxzZSBpZiAoaW5pdGlhbCAmJiB0eXBlb2YgaW5pdGlhbCA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBpbml0aWFsS2V5cyA9IE9iamVjdC5rZXlzKGluaXRpYWwpO1xuICAgIHZhciBkYXRhS2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgIGlmIChpbml0aWFsS2V5cy5sZW5ndGggIT09IGRhdGFLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZGF0YUtleXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0gZGF0YUtleXNbaW5kZXhdO1xuICAgICAgaWYgKCFpc1ByaXN0aW5lKGluaXRpYWxba2V5XSwgZGF0YVtrZXldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGluaXRpYWwgfHwgZGF0YSkge1xuICAgIC8vIGFsbG93ICcnIHRvIGVxdWF0ZSB0byB1bmRlZmluZWQgb3IgbnVsbFxuICAgIHJldHVybiBpbml0aWFsID09PSBkYXRhO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxufSx7fV0sNjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZDtcbmZ1bmN0aW9uIGlzVmFsaWQoZXJyb3IpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXJyb3IpKSB7XG4gICAgcmV0dXJuIGVycm9yLnJlZHVjZShmdW5jdGlvbiAodmFsaWQsIGVycm9yVmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWxpZCAmJiBpc1ZhbGlkKGVycm9yVmFsdWUpO1xuICAgIH0sIHRydWUpO1xuICB9XG4gIGlmIChlcnJvciAmJiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9yKS5yZWR1Y2UoZnVuY3Rpb24gKHZhbGlkLCBrZXkpIHtcbiAgICAgIHJldHVybiB2YWxpZCAmJiBpc1ZhbGlkKGVycm9yW2tleV0pO1xuICAgIH0sIHRydWUpO1xuICB9XG4gIHJldHVybiAhZXJyb3I7XG59XG59LHt9XSw2NjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbWFwVmFsdWVzO1xuLyoqXG4gKiBNYXBzIGFsbCB0aGUgdmFsdWVzIGluIHRoZSBnaXZlbiBvYmplY3QgdGhyb3VnaCB0aGUgZ2l2ZW4gZnVuY3Rpb24gYW5kIHNhdmVzIHRoZW0sIGJ5IGtleSwgdG8gYSByZXN1bHQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1hcFZhbHVlcyhvYmosIGZuKSB7XG4gIHJldHVybiBvYmogPyBPYmplY3Qua2V5cyhvYmopLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGtleSkge1xuICAgIHZhciBfZXh0ZW5kczI7XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGFjY3VtdWxhdG9yLCAoX2V4dGVuZHMyID0ge30sIF9leHRlbmRzMltrZXldID0gZm4ob2JqW2tleV0sIGtleSksIF9leHRlbmRzMikpO1xuICB9LCB7fSkgOiBvYmo7XG59XG59LHt9XSw2NzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG5vcm1hbGl6ZUZpZWxkcztcblxudmFyIF9maWVsZFZhbHVlID0gcmVxdWlyZSgnLi9maWVsZFZhbHVlJyk7XG5cbmZ1bmN0aW9uIGV4dHJhY3RLZXkoZmllbGQpIHtcbiAgdmFyIGRvdEluZGV4ID0gZmllbGQuaW5kZXhPZignLicpO1xuICB2YXIgb3BlbkluZGV4ID0gZmllbGQuaW5kZXhPZignWycpO1xuICB2YXIgY2xvc2VJbmRleCA9IGZpZWxkLmluZGV4T2YoJ10nKTtcblxuICBpZiAob3BlbkluZGV4ID4gMCAmJiBjbG9zZUluZGV4ICE9PSBvcGVuSW5kZXggKyAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmb3VuZCBbIG5vdCBmb2xsb3dlZCBieSBdJyk7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IG9wZW5JbmRleCA+IDAgJiYgKGRvdEluZGV4IDwgMCB8fCBvcGVuSW5kZXggPCBkb3RJbmRleCk7XG4gIHZhciBrZXkgPSB2b2lkIDA7XG4gIHZhciBuZXN0ZWRQYXRoID0gdm9pZCAwO1xuXG4gIGlmIChpc0FycmF5KSB7XG4gICAga2V5ID0gZmllbGQuc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgbmVzdGVkUGF0aCA9IGZpZWxkLnN1YnN0cmluZyhjbG9zZUluZGV4ICsgMSk7XG5cbiAgICBpZiAobmVzdGVkUGF0aFswXSA9PT0gJy4nKSB7XG4gICAgICBuZXN0ZWRQYXRoID0gbmVzdGVkUGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRvdEluZGV4ID4gMCkge1xuICAgIGtleSA9IGZpZWxkLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gICAgbmVzdGVkUGF0aCA9IGZpZWxkLnN1YnN0cmluZyhkb3RJbmRleCArIDEpO1xuICB9IGVsc2Uge1xuICAgIGtleSA9IGZpZWxkO1xuICB9XG5cbiAgcmV0dXJuIHsgaXNBcnJheTogaXNBcnJheSwga2V5OiBrZXksIG5lc3RlZFBhdGg6IG5lc3RlZFBhdGggfTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRmllbGQoZmllbGQsIGZ1bGxGaWVsZFBhdGgsIHN0YXRlLCBwcmV2aW91c1N0YXRlLCB2YWx1ZXMsIHByZXZpb3VzVmFsdWVzLCBub3JtYWxpemVycykge1xuICBpZiAoZmllbGQuaXNBcnJheSkge1xuICAgIGlmIChmaWVsZC5uZXN0ZWRQYXRoKSB7XG4gICAgICB2YXIgX3JldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gc3RhdGUgJiYgc3RhdGVbZmllbGQua2V5XSB8fCBbXTtcbiAgICAgICAgdmFyIHByZXZpb3VzQXJyYXkgPSBwcmV2aW91c1N0YXRlICYmIHByZXZpb3VzU3RhdGVbZmllbGQua2V5XSB8fCBbXTtcbiAgICAgICAgdmFyIG5lc3RlZEZpZWxkID0gZXh0cmFjdEtleShmaWVsZC5uZXN0ZWRQYXRoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IGFycmF5Lm1hcChmdW5jdGlvbiAobmVzdGVkU3RhdGUsIGkpIHtcbiAgICAgICAgICAgIG5lc3RlZFN0YXRlW25lc3RlZEZpZWxkLmtleV0gPSBub3JtYWxpemVGaWVsZChuZXN0ZWRGaWVsZCwgZnVsbEZpZWxkUGF0aCwgbmVzdGVkU3RhdGUsIHByZXZpb3VzQXJyYXlbaV0sIHZhbHVlcywgcHJldmlvdXNWYWx1ZXMsIG5vcm1hbGl6ZXJzKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5lc3RlZFN0YXRlO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KCk7XG5cbiAgICAgIGlmICh0eXBlb2YgX3JldCA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQudjtcbiAgICB9XG5cbiAgICB2YXIgX25vcm1hbGl6ZXIgPSBub3JtYWxpemVyc1tmdWxsRmllbGRQYXRoXTtcblxuICAgIHZhciByZXN1bHQgPSBfbm9ybWFsaXplcihzdGF0ZSAmJiBzdGF0ZVtmaWVsZC5rZXldLCBwcmV2aW91c1N0YXRlICYmIHByZXZpb3VzU3RhdGVbZmllbGQua2V5XSwgdmFsdWVzLCBwcmV2aW91c1ZhbHVlcyk7XG4gICAgcmV0dXJuIGZpZWxkLmlzQXJyYXkgPyByZXN1bHQgJiYgcmVzdWx0Lm1hcChfZmllbGRWYWx1ZS5tYWtlRmllbGRWYWx1ZSkgOiByZXN1bHQ7XG4gIH0gZWxzZSBpZiAoZmllbGQubmVzdGVkUGF0aCkge1xuICAgIHZhciBuZXN0ZWRTdGF0ZSA9IHN0YXRlICYmIHN0YXRlW2ZpZWxkLmtleV0gfHwge307XG4gICAgdmFyIF9uZXN0ZWRGaWVsZCA9IGV4dHJhY3RLZXkoZmllbGQubmVzdGVkUGF0aCk7XG5cbiAgICBuZXN0ZWRTdGF0ZVtfbmVzdGVkRmllbGQua2V5XSA9IG5vcm1hbGl6ZUZpZWxkKF9uZXN0ZWRGaWVsZCwgZnVsbEZpZWxkUGF0aCwgbmVzdGVkU3RhdGUsIHByZXZpb3VzU3RhdGUgJiYgcHJldmlvdXNTdGF0ZVtmaWVsZC5rZXldLCB2YWx1ZXMsIHByZXZpb3VzVmFsdWVzLCBub3JtYWxpemVycyk7XG5cbiAgICByZXR1cm4gbmVzdGVkU3RhdGU7XG4gIH1cblxuICB2YXIgZmluYWxGaWVsZCA9IHN0YXRlICYmIHN0YXRlW2ZpZWxkLmtleV0gfHwge307XG4gIHZhciBub3JtYWxpemVyID0gbm9ybWFsaXplcnNbZnVsbEZpZWxkUGF0aF07XG5cbiAgZmluYWxGaWVsZC52YWx1ZSA9IG5vcm1hbGl6ZXIoZmluYWxGaWVsZC52YWx1ZSwgcHJldmlvdXNTdGF0ZSAmJiBwcmV2aW91c1N0YXRlW2ZpZWxkLmtleV0gJiYgcHJldmlvdXNTdGF0ZVtmaWVsZC5rZXldLnZhbHVlLCB2YWx1ZXMsIHByZXZpb3VzVmFsdWVzKTtcblxuICByZXR1cm4gKDAsIF9maWVsZFZhbHVlLm1ha2VGaWVsZFZhbHVlKShmaW5hbEZpZWxkKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplRmllbGRzKG5vcm1hbGl6ZXJzLCBzdGF0ZSwgcHJldmlvdXNTdGF0ZSwgdmFsdWVzLCBwcmV2aW91c1ZhbHVlcykge1xuICB2YXIgbmV3U3RhdGUgPSBPYmplY3Qua2V5cyhub3JtYWxpemVycykucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgZmllbGQpIHtcbiAgICB2YXIgZXh0cmFjdGVkID0gZXh0cmFjdEtleShmaWVsZCk7XG5cbiAgICBhY2N1bXVsYXRvcltleHRyYWN0ZWQua2V5XSA9IG5vcm1hbGl6ZUZpZWxkKGV4dHJhY3RlZCwgZmllbGQsIHN0YXRlLCBwcmV2aW91c1N0YXRlLCB2YWx1ZXMsIHByZXZpb3VzVmFsdWVzLCBub3JtYWxpemVycyk7XG5cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH0sIHt9KTtcblxuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG59XG59LHtcIi4vZmllbGRWYWx1ZVwiOjU3fV0sNjg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuLyoqXG4gKiBSZWFkcyBhbnkgcG90ZW50aWFsbHkgZGVlcCB2YWx1ZSBmcm9tIGFuIG9iamVjdCB1c2luZyBkb3QgYW5kIGFycmF5IHN5bnRheFxuICovXG52YXIgcmVhZCA9IGZ1bmN0aW9uIHJlYWQocGF0aCwgb2JqZWN0KSB7XG4gIGlmICghcGF0aCB8fCAhb2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICB2YXIgZG90SW5kZXggPSBwYXRoLmluZGV4T2YoJy4nKTtcbiAgaWYgKGRvdEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIHJlYWQocGF0aC5zdWJzdHJpbmcoMSksIG9iamVjdCk7XG4gIH1cbiAgdmFyIG9wZW5JbmRleCA9IHBhdGguaW5kZXhPZignWycpO1xuICB2YXIgY2xvc2VJbmRleCA9IHBhdGguaW5kZXhPZignXScpO1xuICBpZiAoZG90SW5kZXggPj0gMCAmJiAob3BlbkluZGV4IDwgMCB8fCBkb3RJbmRleCA8IG9wZW5JbmRleCkpIHtcbiAgICAvLyBpdGVyYXRlIGRvd24gb2JqZWN0IHRyZWVcbiAgICByZXR1cm4gcmVhZChwYXRoLnN1YnN0cmluZyhkb3RJbmRleCArIDEpLCBvYmplY3RbcGF0aC5zdWJzdHJpbmcoMCwgZG90SW5kZXgpXSk7XG4gIH1cbiAgaWYgKG9wZW5JbmRleCA+PSAwICYmIChkb3RJbmRleCA8IDAgfHwgb3BlbkluZGV4IDwgZG90SW5kZXgpKSB7XG4gICAgaWYgKGNsb3NlSW5kZXggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvdW5kIFsgYnV0IG5vIF0nKTtcbiAgICB9XG4gICAgdmFyIGtleSA9IHBhdGguc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgdmFyIGluZGV4ID0gcGF0aC5zdWJzdHJpbmcob3BlbkluZGV4ICsgMSwgY2xvc2VJbmRleCk7XG4gICAgaWYgKCFpbmRleC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBvYmplY3Rba2V5XTtcbiAgICB9XG4gICAgaWYgKG9wZW5JbmRleCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHJlYWQocGF0aC5zdWJzdHJpbmcoY2xvc2VJbmRleCArIDEpLCBvYmplY3RbaW5kZXhdKTtcbiAgICB9XG4gICAgaWYgKCFvYmplY3Rba2V5XSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWQocGF0aC5zdWJzdHJpbmcoY2xvc2VJbmRleCArIDEpLCBvYmplY3Rba2V5XVtpbmRleF0pO1xuICB9XG4gIHJldHVybiBvYmplY3RbcGF0aF07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSByZWFkO1xufSx7fV0sNjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZU9uQmx1ciA9IHJlcXVpcmUoJy4vZXZlbnRzL2NyZWF0ZU9uQmx1cicpO1xuXG52YXIgX2NyZWF0ZU9uQmx1cjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVPbkJsdXIpO1xuXG52YXIgX2NyZWF0ZU9uQ2hhbmdlID0gcmVxdWlyZSgnLi9ldmVudHMvY3JlYXRlT25DaGFuZ2UnKTtcblxudmFyIF9jcmVhdGVPbkNoYW5nZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVPbkNoYW5nZSk7XG5cbnZhciBfY3JlYXRlT25EcmFnU3RhcnQgPSByZXF1aXJlKCcuL2V2ZW50cy9jcmVhdGVPbkRyYWdTdGFydCcpO1xuXG52YXIgX2NyZWF0ZU9uRHJhZ1N0YXJ0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZU9uRHJhZ1N0YXJ0KTtcblxudmFyIF9jcmVhdGVPbkRyb3AgPSByZXF1aXJlKCcuL2V2ZW50cy9jcmVhdGVPbkRyb3AnKTtcblxudmFyIF9jcmVhdGVPbkRyb3AyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlT25Ecm9wKTtcblxudmFyIF9jcmVhdGVPbkZvY3VzID0gcmVxdWlyZSgnLi9ldmVudHMvY3JlYXRlT25Gb2N1cycpO1xuXG52YXIgX2NyZWF0ZU9uRm9jdXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlT25Gb2N1cyk7XG5cbnZhciBfc2lsZW5jZVByb21pc2UgPSByZXF1aXJlKCcuL3NpbGVuY2VQcm9taXNlJyk7XG5cbnZhciBfc2lsZW5jZVByb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2lsZW5jZVByb21pc2UpO1xuXG52YXIgX3JlYWQgPSByZXF1aXJlKCcuL3JlYWQnKTtcblxudmFyIF9yZWFkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWQpO1xuXG52YXIgX3VwZGF0ZUZpZWxkID0gcmVxdWlyZSgnLi91cGRhdGVGaWVsZCcpO1xuXG52YXIgX3VwZGF0ZUZpZWxkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VwZGF0ZUZpZWxkKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gZ2V0U3VmZml4KGlucHV0LCBjbG9zZUluZGV4KSB7XG4gIHZhciBzdWZmaXggPSBpbnB1dC5zdWJzdHJpbmcoY2xvc2VJbmRleCArIDEpO1xuICBpZiAoc3VmZml4WzBdID09PSAnLicpIHtcbiAgICBzdWZmaXggPSBzdWZmaXguc3Vic3RyaW5nKDEpO1xuICB9XG4gIHJldHVybiBzdWZmaXg7XG59XG5cbnZhciBnZXROZXh0S2V5ID0gZnVuY3Rpb24gZ2V0TmV4dEtleShwYXRoKSB7XG4gIHZhciBkb3RJbmRleCA9IHBhdGguaW5kZXhPZignLicpO1xuICB2YXIgb3BlbkluZGV4ID0gcGF0aC5pbmRleE9mKCdbJyk7XG4gIGlmIChvcGVuSW5kZXggPiAwICYmIChkb3RJbmRleCA8IDAgfHwgb3BlbkluZGV4IDwgZG90SW5kZXgpKSB7XG4gICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gIH1cbiAgcmV0dXJuIGRvdEluZGV4ID4gMCA/IHBhdGguc3Vic3RyaW5nKDAsIGRvdEluZGV4KSA6IHBhdGg7XG59O1xuXG52YXIgc2hvdWxkQXN5bmNWYWxpZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZEFzeW5jVmFsaWRhdGUobmFtZSwgYXN5bmNCbHVyRmllbGRzKSB7XG4gIHJldHVybihcbiAgICAvLyByZW1vdmUgYXJyYXkgaW5kaWNlc1xuICAgIH5hc3luY0JsdXJGaWVsZHMuaW5kZXhPZihuYW1lLnJlcGxhY2UoL1xcW1swLTldK1xcXS9nLCAnW10nKSlcbiAgKTtcbn07XG5cbnZhciByZWFkRmllbGQgPSBmdW5jdGlvbiByZWFkRmllbGQoc3RhdGUsIGZpZWxkTmFtZSkge1xuICB2YXIgcGF0aFRvSGVyZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzJdO1xuICB2YXIgZmllbGRzID0gYXJndW1lbnRzWzNdO1xuICB2YXIgc3luY0Vycm9ycyA9IGFyZ3VtZW50c1s0XTtcbiAgdmFyIGFzeW5jVmFsaWRhdGUgPSBhcmd1bWVudHNbNV07XG4gIHZhciBpc1JlYWN0TmF0aXZlID0gYXJndW1lbnRzWzZdO1xuICB2YXIgcHJvcHMgPSBhcmd1bWVudHNbN107XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPD0gOCB8fCBhcmd1bWVudHNbOF0gPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSA6IGFyZ3VtZW50c1s4XTtcbiAgdmFyIHByZWZpeCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gOSB8fCBhcmd1bWVudHNbOV0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzldO1xuICB2YXIgYXN5bmNCbHVyRmllbGRzID0gcHJvcHMuYXN5bmNCbHVyRmllbGRzO1xuICB2YXIgYXV0b2ZpbGwgPSBwcm9wcy5hdXRvZmlsbDtcbiAgdmFyIGJsdXIgPSBwcm9wcy5ibHVyO1xuICB2YXIgY2hhbmdlID0gcHJvcHMuY2hhbmdlO1xuICB2YXIgZm9jdXMgPSBwcm9wcy5mb2N1cztcbiAgdmFyIGZvcm0gPSBwcm9wcy5mb3JtO1xuICB2YXIgaW5pdGlhbFZhbHVlcyA9IHByb3BzLmluaXRpYWxWYWx1ZXM7XG4gIHZhciByZWFkb25seSA9IHByb3BzLnJlYWRvbmx5O1xuICB2YXIgYWRkQXJyYXlWYWx1ZSA9IHByb3BzLmFkZEFycmF5VmFsdWU7XG4gIHZhciByZW1vdmVBcnJheVZhbHVlID0gcHJvcHMucmVtb3ZlQXJyYXlWYWx1ZTtcbiAgdmFyIHN3YXBBcnJheVZhbHVlcyA9IHByb3BzLnN3YXBBcnJheVZhbHVlcztcblxuICB2YXIgZG90SW5kZXggPSBmaWVsZE5hbWUuaW5kZXhPZignLicpO1xuICB2YXIgb3BlbkluZGV4ID0gZmllbGROYW1lLmluZGV4T2YoJ1snKTtcbiAgdmFyIGNsb3NlSW5kZXggPSBmaWVsZE5hbWUuaW5kZXhPZignXScpO1xuICBpZiAob3BlbkluZGV4ID4gMCAmJiBjbG9zZUluZGV4ICE9PSBvcGVuSW5kZXggKyAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmb3VuZCBbIG5vdCBmb2xsb3dlZCBieSBdJyk7XG4gIH1cblxuICBpZiAob3BlbkluZGV4ID4gMCAmJiAoZG90SW5kZXggPCAwIHx8IG9wZW5JbmRleCA8IGRvdEluZGV4KSkge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gYXJyYXkgZmllbGRcbiAgICAgIHZhciBrZXkgPSBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgICB2YXIgcmVzdCA9IGdldFN1ZmZpeChmaWVsZE5hbWUsIGNsb3NlSW5kZXgpO1xuICAgICAgdmFyIHN0YXRlQXJyYXkgPSBzdGF0ZSAmJiBzdGF0ZVtrZXldIHx8IFtdO1xuICAgICAgdmFyIGZ1bGxQcmVmaXggPSBwcmVmaXggKyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGNsb3NlSW5kZXggKyAxKTtcbiAgICAgIHZhciBzdWJmaWVsZHMgPSBwcm9wcy5maWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgZmllbGQpIHtcbiAgICAgICAgaWYgKGZpZWxkLmluZGV4T2YoZnVsbFByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCBbXSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gZ2V0U3VmZml4KGZpZWxkLCBwcmVmaXgubGVuZ3RoICsgY2xvc2VJbmRleCk7XG4gICAgICB9KTtcbiAgICAgIHZhciBhZGRNZXRob2RzID0gZnVuY3Rpb24gYWRkTWV0aG9kcyhkZXN0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCAnYWRkRmllbGQnLCB7XG4gICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRBcnJheVZhbHVlKHBhdGhUb0hlcmUgKyBrZXksIF92YWx1ZSwgaW5kZXgsIHN1YmZpZWxkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsICdyZW1vdmVGaWVsZCcsIHtcbiAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVBcnJheVZhbHVlKHBhdGhUb0hlcmUgKyBrZXksIGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgJ3N3YXBGaWVsZHMnLCB7XG4gICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKGluZGV4QSwgaW5kZXhCKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhcEFycmF5VmFsdWVzKHBhdGhUb0hlcmUgKyBrZXksIGluZGV4QSwgaW5kZXhCKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICAgIH07XG4gICAgICBpZiAoIWZpZWxkc1trZXldIHx8IGZpZWxkc1trZXldLmxlbmd0aCAhPT0gc3RhdGVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgZmllbGRzW2tleV0gPSBmaWVsZHNba2V5XSA/IFtdLmNvbmNhdChmaWVsZHNba2V5XSkgOiBbXTtcbiAgICAgICAgYWRkTWV0aG9kcyhmaWVsZHNba2V5XSk7XG4gICAgICB9XG4gICAgICB2YXIgZmllbGRBcnJheSA9IGZpZWxkc1trZXldO1xuICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGRTdGF0ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHJlc3QgJiYgIWZpZWxkQXJyYXlbaW5kZXhdKSB7XG4gICAgICAgICAgZmllbGRBcnJheVtpbmRleF0gPSB7fTtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVzdCA9IHJlc3QgPyBmaWVsZEFycmF5W2luZGV4XSA6IHt9O1xuICAgICAgICB2YXIgbmV4dFBhdGggPSAnJyArIHBhdGhUb0hlcmUgKyBrZXkgKyAnWycgKyBpbmRleCArICddJyArIChyZXN0ID8gJy4nIDogJycpO1xuICAgICAgICB2YXIgbmV4dFByZWZpeCA9ICcnICsgcHJlZml4ICsga2V5ICsgJ1tdJyArIChyZXN0ID8gJy4nIDogJycpO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSByZWFkRmllbGQoZmllbGRTdGF0ZSwgcmVzdCwgbmV4dFBhdGgsIGRlc3QsIHN5bmNFcnJvcnMsIGFzeW5jVmFsaWRhdGUsIGlzUmVhY3ROYXRpdmUsIHByb3BzLCBjYWxsYmFjaywgbmV4dFByZWZpeCk7XG4gICAgICAgIGlmICghcmVzdCAmJiBmaWVsZEFycmF5W2luZGV4XSAhPT0gcmVzdWx0KSB7XG4gICAgICAgICAgLy8gaWYgbm90aGluZyBhZnRlciBbXSBpbiBmaWVsZCBuYW1lLCBhc3NpZ24gZGlyZWN0bHkgdG8gYXJyYXlcbiAgICAgICAgICBmaWVsZEFycmF5W2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoZmllbGRBcnJheS5sZW5ndGggPiBzdGF0ZUFycmF5Lmxlbmd0aCkge1xuICAgICAgICAvLyByZW1vdmUgZXh0cmEgaXRlbXMgdGhhdCBhcmVuJ3QgaW4gc3RhdGUgYXJyYXlcbiAgICAgICAgZmllbGRBcnJheS5zcGxpY2Uoc3RhdGVBcnJheS5sZW5ndGgsIGZpZWxkQXJyYXkubGVuZ3RoIC0gc3RhdGVBcnJheS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdjogY2hhbmdlZCA/IGFkZE1ldGhvZHMoW10uY29uY2F0KGZpZWxkQXJyYXkpKSA6IGZpZWxkQXJyYXlcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgaWYgKHR5cGVvZiBfcmV0ID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldC52O1xuICB9XG4gIGlmIChkb3RJbmRleCA+IDApIHtcbiAgICAvLyBzdWJvYmplY3QgZmllbGRcbiAgICB2YXIgX2tleSA9IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICAgIHZhciBfcmVzdCA9IGZpZWxkTmFtZS5zdWJzdHJpbmcoZG90SW5kZXggKyAxKTtcbiAgICB2YXIgc3Vib2JqZWN0ID0gZmllbGRzW19rZXldIHx8IHt9O1xuICAgIHZhciBuZXh0UGF0aCA9IHBhdGhUb0hlcmUgKyBfa2V5ICsgJy4nO1xuICAgIHZhciBuZXh0S2V5ID0gZ2V0TmV4dEtleShfcmVzdCk7XG4gICAgdmFyIHByZXZpb3VzID0gc3Vib2JqZWN0W25leHRLZXldO1xuICAgIHZhciByZXN1bHQgPSByZWFkRmllbGQoc3RhdGVbX2tleV0gfHwge30sIF9yZXN0LCBuZXh0UGF0aCwgc3Vib2JqZWN0LCBzeW5jRXJyb3JzLCBhc3luY1ZhbGlkYXRlLCBpc1JlYWN0TmF0aXZlLCBwcm9wcywgY2FsbGJhY2ssIG5leHRQYXRoKTtcbiAgICBpZiAocmVzdWx0ICE9PSBwcmV2aW91cykge1xuICAgICAgdmFyIF9leHRlbmRzMjtcblxuICAgICAgc3Vib2JqZWN0ID0gX2V4dGVuZHMoe30sIHN1Ym9iamVjdCwgKF9leHRlbmRzMiA9IHt9LCBfZXh0ZW5kczJbbmV4dEtleV0gPSByZXN1bHQsIF9leHRlbmRzMikpO1xuICAgIH1cbiAgICBmaWVsZHNbX2tleV0gPSBzdWJvYmplY3Q7XG4gICAgcmV0dXJuIHN1Ym9iamVjdDtcbiAgfVxuICB2YXIgbmFtZSA9IHBhdGhUb0hlcmUgKyBmaWVsZE5hbWU7XG4gIHZhciBmaWVsZCA9IGZpZWxkc1tmaWVsZE5hbWVdIHx8IHt9O1xuICBpZiAoZmllbGQubmFtZSAhPT0gbmFtZSkge1xuICAgIHZhciBvbkNoYW5nZSA9ICgwLCBfY3JlYXRlT25DaGFuZ2UyLmRlZmF1bHQpKG5hbWUsIGNoYW5nZSwgaXNSZWFjdE5hdGl2ZSk7XG4gICAgdmFyIGluaXRpYWxGb3JtVmFsdWUgPSAoMCwgX3JlYWQyLmRlZmF1bHQpKG5hbWUgKyAnLmluaXRpYWwnLCBmb3JtKTtcbiAgICB2YXIgaW5pdGlhbFZhbHVlID0gaW5pdGlhbEZvcm1WYWx1ZSB8fCAoMCwgX3JlYWQyLmRlZmF1bHQpKG5hbWUsIGluaXRpYWxWYWx1ZXMpO1xuICAgIGluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkID8gJycgOiBpbml0aWFsVmFsdWU7XG4gICAgZmllbGQubmFtZSA9IG5hbWU7XG4gICAgZmllbGQuY2hlY2tlZCA9IGluaXRpYWxWYWx1ZSA9PT0gdHJ1ZSB8fCB1bmRlZmluZWQ7XG4gICAgZmllbGQudmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgZmllbGQuaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICAgIGlmICghcmVhZG9ubHkpIHtcbiAgICAgIGZpZWxkLmF1dG9maWxsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhdXRvZmlsbChuYW1lLCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgZmllbGQub25CbHVyID0gKDAsIF9jcmVhdGVPbkJsdXIyLmRlZmF1bHQpKG5hbWUsIGJsdXIsIGlzUmVhY3ROYXRpdmUsIHNob3VsZEFzeW5jVmFsaWRhdGUobmFtZSwgYXN5bmNCbHVyRmllbGRzKSAmJiBmdW5jdGlvbiAoYmx1ck5hbWUsIGJsdXJWYWx1ZSkge1xuICAgICAgICByZXR1cm4gKDAsIF9zaWxlbmNlUHJvbWlzZTIuZGVmYXVsdCkoYXN5bmNWYWxpZGF0ZShibHVyTmFtZSwgYmx1clZhbHVlKSk7XG4gICAgICB9KTtcbiAgICAgIGZpZWxkLm9uQ2hhbmdlID0gb25DaGFuZ2U7XG4gICAgICBmaWVsZC5vbkRyYWdTdGFydCA9ICgwLCBfY3JlYXRlT25EcmFnU3RhcnQyLmRlZmF1bHQpKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkLnZhbHVlO1xuICAgICAgfSk7XG4gICAgICBmaWVsZC5vbkRyb3AgPSAoMCwgX2NyZWF0ZU9uRHJvcDIuZGVmYXVsdCkobmFtZSwgY2hhbmdlKTtcbiAgICAgIGZpZWxkLm9uRm9jdXMgPSAoMCwgX2NyZWF0ZU9uRm9jdXMyLmRlZmF1bHQpKG5hbWUsIGZvY3VzKTtcbiAgICAgIGZpZWxkLm9uVXBkYXRlID0gb25DaGFuZ2U7IC8vIGFsaWFzIHRvIHN1cHBvcnQgYmVsbGUuIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtncmFmL2JlbGxlL2lzc3Vlcy81OFxuICAgIH1cbiAgICBmaWVsZC52YWxpZCA9IHRydWU7XG4gICAgZmllbGQuaW52YWxpZCA9IGZhbHNlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWVsZCwgJ19pc0ZpZWxkJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIHZhciBkZWZhdWx0RmllbGRTdGF0ZSA9IHtcbiAgICBpbml0aWFsOiBmaWVsZC52YWx1ZSxcbiAgICB2YWx1ZTogZmllbGQudmFsdWVcbiAgfTtcblxuICB2YXIgZmllbGRTdGF0ZSA9IChmaWVsZE5hbWUgPyBzdGF0ZVtmaWVsZE5hbWVdIDogc3RhdGUpIHx8IGRlZmF1bHRGaWVsZFN0YXRlO1xuICB2YXIgc3luY0Vycm9yID0gKDAsIF9yZWFkMi5kZWZhdWx0KShuYW1lLCBzeW5jRXJyb3JzKTtcbiAgdmFyIHVwZGF0ZWQgPSAoMCwgX3VwZGF0ZUZpZWxkMi5kZWZhdWx0KShmaWVsZCwgZmllbGRTdGF0ZSwgbmFtZSA9PT0gZm9ybS5fYWN0aXZlLCBzeW5jRXJyb3IpO1xuICBpZiAoZmllbGROYW1lIHx8IGZpZWxkc1tmaWVsZE5hbWVdICE9PSB1cGRhdGVkKSB7XG4gICAgZmllbGRzW2ZpZWxkTmFtZV0gPSB1cGRhdGVkO1xuICB9XG4gIGNhbGxiYWNrKHVwZGF0ZWQpO1xuICByZXR1cm4gdXBkYXRlZDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlYWRGaWVsZDtcbn0se1wiLi9ldmVudHMvY3JlYXRlT25CbHVyXCI6NDgsXCIuL2V2ZW50cy9jcmVhdGVPbkNoYW5nZVwiOjQ5LFwiLi9ldmVudHMvY3JlYXRlT25EcmFnU3RhcnRcIjo1MCxcIi4vZXZlbnRzL2NyZWF0ZU9uRHJvcFwiOjUxLFwiLi9ldmVudHMvY3JlYXRlT25Gb2N1c1wiOjUyLFwiLi9yZWFkXCI6NjgsXCIuL3NpbGVuY2VQcm9taXNlXCI6NzUsXCIuL3VwZGF0ZUZpZWxkXCI6NzZ9XSw3MDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhZEZpZWxkID0gcmVxdWlyZSgnLi9yZWFkRmllbGQnKTtcblxudmFyIF9yZWFkRmllbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhZEZpZWxkKTtcblxudmFyIF93cml0ZSA9IHJlcXVpcmUoJy4vd3JpdGUnKTtcblxudmFyIF93cml0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93cml0ZSk7XG5cbnZhciBfZ2V0VmFsdWVzID0gcmVxdWlyZSgnLi9nZXRWYWx1ZXMnKTtcblxudmFyIF9nZXRWYWx1ZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmFsdWVzKTtcblxudmFyIF9yZW1vdmVGaWVsZCA9IHJlcXVpcmUoJy4vcmVtb3ZlRmllbGQnKTtcblxudmFyIF9yZW1vdmVGaWVsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW1vdmVGaWVsZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogUmVhZHMgcHJvcHMgYW5kIGdlbmVyYXRlcyAob3IgdXBkYXRlcykgZmllbGQgc3RydWN0dXJlXG4gKi9cbnZhciByZWFkRmllbGRzID0gZnVuY3Rpb24gcmVhZEZpZWxkcyhwcm9wcywgcHJldmlvdXNQcm9wcywgbXlGaWVsZHMsIGFzeW5jVmFsaWRhdGUsIGlzUmVhY3ROYXRpdmUpIHtcbiAgdmFyIGZpZWxkcyA9IHByb3BzLmZpZWxkcztcbiAgdmFyIGZvcm0gPSBwcm9wcy5mb3JtO1xuICB2YXIgdmFsaWRhdGUgPSBwcm9wcy52YWxpZGF0ZTtcblxuICB2YXIgcHJldmlvdXNGaWVsZHMgPSBwcmV2aW91c1Byb3BzLmZpZWxkcztcbiAgdmFyIHZhbHVlcyA9ICgwLCBfZ2V0VmFsdWVzMi5kZWZhdWx0KShmaWVsZHMsIGZvcm0pO1xuICB2YXIgc3luY0Vycm9ycyA9IHZhbGlkYXRlKHZhbHVlcywgcHJvcHMpIHx8IHt9O1xuICB2YXIgZXJyb3JzID0ge307XG4gIHZhciBmb3JtRXJyb3IgPSBzeW5jRXJyb3JzLl9lcnJvciB8fCBmb3JtLl9lcnJvcjtcbiAgdmFyIGFsbFZhbGlkID0gIWZvcm1FcnJvcjtcbiAgdmFyIGFsbFByaXN0aW5lID0gdHJ1ZTtcbiAgdmFyIHRhbGx5ID0gZnVuY3Rpb24gdGFsbHkoZmllbGQpIHtcbiAgICBpZiAoZmllbGQuZXJyb3IpIHtcbiAgICAgIGVycm9ycyA9ICgwLCBfd3JpdGUyLmRlZmF1bHQpKGZpZWxkLm5hbWUsIGZpZWxkLmVycm9yLCBlcnJvcnMpO1xuICAgICAgYWxsVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLmRpcnR5KSB7XG4gICAgICBhbGxQcmlzdGluZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgdmFyIGZpZWxkT2JqZWN0cyA9IHByZXZpb3VzRmllbGRzID8gcHJldmlvdXNGaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgcHJldmlvdXNGaWVsZCkge1xuICAgIHJldHVybiB+ZmllbGRzLmluZGV4T2YocHJldmlvdXNGaWVsZCkgPyBhY2N1bXVsYXRvciA6ICgwLCBfcmVtb3ZlRmllbGQyLmRlZmF1bHQpKGFjY3VtdWxhdG9yLCBwcmV2aW91c0ZpZWxkKTtcbiAgfSwgX2V4dGVuZHMoe30sIG15RmllbGRzKSkgOiBfZXh0ZW5kcyh7fSwgbXlGaWVsZHMpO1xuICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICgwLCBfcmVhZEZpZWxkMi5kZWZhdWx0KShmb3JtLCBuYW1lLCB1bmRlZmluZWQsIGZpZWxkT2JqZWN0cywgc3luY0Vycm9ycywgYXN5bmNWYWxpZGF0ZSwgaXNSZWFjdE5hdGl2ZSwgcHJvcHMsIHRhbGx5KTtcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWVsZE9iamVjdHMsICdfbWV0YScsIHtcbiAgICB2YWx1ZToge1xuICAgICAgYWxsUHJpc3RpbmU6IGFsbFByaXN0aW5lLFxuICAgICAgYWxsVmFsaWQ6IGFsbFZhbGlkLFxuICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICBlcnJvcnM6IGVycm9ycyxcbiAgICAgIGZvcm1FcnJvcjogZm9ybUVycm9yXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZpZWxkT2JqZWN0cztcbn07XG5leHBvcnRzLmRlZmF1bHQgPSByZWFkRmllbGRzO1xufSx7XCIuL2dldFZhbHVlc1wiOjU5LFwiLi9yZWFkRmllbGRcIjo2OSxcIi4vcmVtb3ZlRmllbGRcIjo3MixcIi4vd3JpdGVcIjo3OX1dLDcxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuaW5pdGlhbFN0YXRlID0gZXhwb3J0cy5nbG9iYWxFcnJvcktleSA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9pbml0aWFsU3RhdGUsIF9iZWhhdmlvcnM7XG5cbnZhciBfYWN0aW9uVHlwZXMgPSByZXF1aXJlKCcuL2FjdGlvblR5cGVzJyk7XG5cbnZhciBfbWFwVmFsdWVzID0gcmVxdWlyZSgnLi9tYXBWYWx1ZXMnKTtcblxudmFyIF9tYXBWYWx1ZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWFwVmFsdWVzKTtcblxudmFyIF9yZWFkID0gcmVxdWlyZSgnLi9yZWFkJyk7XG5cbnZhciBfcmVhZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFkKTtcblxudmFyIF93cml0ZSA9IHJlcXVpcmUoJy4vd3JpdGUnKTtcblxudmFyIF93cml0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93cml0ZSk7XG5cbnZhciBfZ2V0VmFsdWVzRnJvbVN0YXRlID0gcmVxdWlyZSgnLi9nZXRWYWx1ZXNGcm9tU3RhdGUnKTtcblxudmFyIF9nZXRWYWx1ZXNGcm9tU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VmFsdWVzRnJvbVN0YXRlKTtcblxudmFyIF9pbml0aWFsaXplU3RhdGUgPSByZXF1aXJlKCcuL2luaXRpYWxpemVTdGF0ZScpO1xuXG52YXIgX2luaXRpYWxpemVTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbml0aWFsaXplU3RhdGUpO1xuXG52YXIgX3Jlc2V0U3RhdGUgPSByZXF1aXJlKCcuL3Jlc2V0U3RhdGUnKTtcblxudmFyIF9yZXNldFN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Jlc2V0U3RhdGUpO1xuXG52YXIgX3NldEVycm9ycyA9IHJlcXVpcmUoJy4vc2V0RXJyb3JzJyk7XG5cbnZhciBfc2V0RXJyb3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldEVycm9ycyk7XG5cbnZhciBfZmllbGRWYWx1ZSA9IHJlcXVpcmUoJy4vZmllbGRWYWx1ZScpO1xuXG52YXIgX25vcm1hbGl6ZUZpZWxkcyA9IHJlcXVpcmUoJy4vbm9ybWFsaXplRmllbGRzJyk7XG5cbnZhciBfbm9ybWFsaXplRmllbGRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25vcm1hbGl6ZUZpZWxkcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIGdsb2JhbEVycm9yS2V5ID0gZXhwb3J0cy5nbG9iYWxFcnJvcktleSA9ICdfZXJyb3InO1xuXG52YXIgaW5pdGlhbFN0YXRlID0gZXhwb3J0cy5pbml0aWFsU3RhdGUgPSAoX2luaXRpYWxTdGF0ZSA9IHtcbiAgX2FjdGl2ZTogdW5kZWZpbmVkLFxuICBfYXN5bmNWYWxpZGF0aW5nOiBmYWxzZVxufSwgX2luaXRpYWxTdGF0ZVtnbG9iYWxFcnJvcktleV0gPSB1bmRlZmluZWQsIF9pbml0aWFsU3RhdGUuX2luaXRpYWxpemVkID0gZmFsc2UsIF9pbml0aWFsU3RhdGUuX3N1Ym1pdHRpbmcgPSBmYWxzZSwgX2luaXRpYWxTdGF0ZS5fc3VibWl0RmFpbGVkID0gZmFsc2UsIF9pbml0aWFsU3RhdGUpO1xuXG52YXIgYmVoYXZpb3JzID0gKF9iZWhhdmlvcnMgPSB7fSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuQUREX0FSUkFZX1ZBTFVFXSA9IGZ1bmN0aW9uIChzdGF0ZSwgX3JlZikge1xuICB2YXIgcGF0aCA9IF9yZWYucGF0aDtcbiAgdmFyIGluZGV4ID0gX3JlZi5pbmRleDtcbiAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZTtcbiAgdmFyIGZpZWxkcyA9IF9yZWYuZmllbGRzO1xuXG4gIHZhciBhcnJheSA9ICgwLCBfcmVhZDIuZGVmYXVsdCkocGF0aCwgc3RhdGUpO1xuICB2YXIgc3RhdGVDb3B5ID0gX2V4dGVuZHMoe30sIHN0YXRlKTtcbiAgdmFyIGFycmF5Q29weSA9IGFycmF5ID8gW10uY29uY2F0KGFycmF5KSA6IFtdO1xuICB2YXIgbmV3VmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gKDAsIF9pbml0aWFsaXplU3RhdGUyLmRlZmF1bHQpKHZhbHVlLCBmaWVsZHMgfHwgT2JqZWN0LmtleXModmFsdWUpKSA6ICgwLCBfZmllbGRWYWx1ZS5tYWtlRmllbGRWYWx1ZSkoeyB2YWx1ZTogdmFsdWUgfSk7XG4gIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXlDb3B5LnB1c2gobmV3VmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGFycmF5Q29weS5zcGxpY2UoaW5kZXgsIDAsIG5ld1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gKDAsIF93cml0ZTIuZGVmYXVsdCkocGF0aCwgYXJyYXlDb3B5LCBzdGF0ZUNvcHkpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuQVVUT0ZJTExdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmMikge1xuICB2YXIgZmllbGQgPSBfcmVmMi5maWVsZDtcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG5cbiAgcmV0dXJuICgwLCBfd3JpdGUyLmRlZmF1bHQpKGZpZWxkLCBmdW5jdGlvbiAocHJldmlvdXMpIHtcbiAgICB2YXIgX3ByZXZpb3VzJHZhbHVlJGF1dG9mID0gX2V4dGVuZHMoe30sIHByZXZpb3VzLCB7IHZhbHVlOiB2YWx1ZSwgYXV0b2ZpbGxlZDogdHJ1ZSB9KTtcblxuICAgIHZhciBhc3luY0Vycm9yID0gX3ByZXZpb3VzJHZhbHVlJGF1dG9mLmFzeW5jRXJyb3I7XG4gICAgdmFyIHN1Ym1pdEVycm9yID0gX3ByZXZpb3VzJHZhbHVlJGF1dG9mLnN1Ym1pdEVycm9yO1xuXG4gICAgdmFyIHJlc3VsdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJldmlvdXMkdmFsdWUkYXV0b2YsIFsnYXN5bmNFcnJvcicsICdzdWJtaXRFcnJvciddKTtcblxuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHJlc3VsdCk7XG4gIH0sIHN0YXRlKTtcbn0sIF9iZWhhdmlvcnNbX2FjdGlvblR5cGVzLkJMVVJdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmMykge1xuICB2YXIgZmllbGQgPSBfcmVmMy5maWVsZDtcbiAgdmFyIHZhbHVlID0gX3JlZjMudmFsdWU7XG4gIHZhciB0b3VjaCA9IF9yZWYzLnRvdWNoO1xuICB2YXIgX2FjdGl2ZSA9IHN0YXRlLl9hY3RpdmU7XG5cbiAgdmFyIHN0YXRlQ29weSA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhzdGF0ZSwgWydfYWN0aXZlJ10pO1xuXG4gIGlmIChfYWN0aXZlICYmIF9hY3RpdmUgIT09IGZpZWxkKSB7XG4gICAgLy8gcmVtb3ZlIF9hY3RpdmUgZnJvbSBzdGF0ZVxuICAgIHN0YXRlQ29weS5fYWN0aXZlID0gX2FjdGl2ZTtcbiAgfVxuICByZXR1cm4gKDAsIF93cml0ZTIuZGVmYXVsdCkoZmllbGQsIGZ1bmN0aW9uIChwcmV2aW91cykge1xuICAgIHZhciByZXN1bHQgPSBfZXh0ZW5kcyh7fSwgcHJldmlvdXMpO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHRvdWNoKSB7XG4gICAgICByZXN1bHQudG91Y2hlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHJlc3VsdCk7XG4gIH0sIHN0YXRlQ29weSk7XG59LCBfYmVoYXZpb3JzW19hY3Rpb25UeXBlcy5DSEFOR0VdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmNCkge1xuICB2YXIgZmllbGQgPSBfcmVmNC5maWVsZDtcbiAgdmFyIHZhbHVlID0gX3JlZjQudmFsdWU7XG4gIHZhciB0b3VjaCA9IF9yZWY0LnRvdWNoO1xuXG4gIHJldHVybiAoMCwgX3dyaXRlMi5kZWZhdWx0KShmaWVsZCwgZnVuY3Rpb24gKHByZXZpb3VzKSB7XG4gICAgdmFyIF9wcmV2aW91cyR2YWx1ZSA9IF9leHRlbmRzKHt9LCBwcmV2aW91cywgeyB2YWx1ZTogdmFsdWUgfSk7XG5cbiAgICB2YXIgYXN5bmNFcnJvciA9IF9wcmV2aW91cyR2YWx1ZS5hc3luY0Vycm9yO1xuICAgIHZhciBzdWJtaXRFcnJvciA9IF9wcmV2aW91cyR2YWx1ZS5zdWJtaXRFcnJvcjtcbiAgICB2YXIgYXV0b2ZpbGxlZCA9IF9wcmV2aW91cyR2YWx1ZS5hdXRvZmlsbGVkO1xuXG4gICAgdmFyIHJlc3VsdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJldmlvdXMkdmFsdWUsIFsnYXN5bmNFcnJvcicsICdzdWJtaXRFcnJvcicsICdhdXRvZmlsbGVkJ10pO1xuXG4gICAgaWYgKHRvdWNoKSB7XG4gICAgICByZXN1bHQudG91Y2hlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHJlc3VsdCk7XG4gIH0sIHN0YXRlKTtcbn0sIF9iZWhhdmlvcnNbX2FjdGlvblR5cGVzLkRFU1RST1ldID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdW5kZWZpbmVkO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuRk9DVVNdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmNSkge1xuICB2YXIgZmllbGQgPSBfcmVmNS5maWVsZDtcblxuICB2YXIgc3RhdGVDb3B5ID0gKDAsIF93cml0ZTIuZGVmYXVsdCkoZmllbGQsIGZ1bmN0aW9uIChwcmV2aW91cykge1xuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKF9leHRlbmRzKHt9LCBwcmV2aW91cywgeyB2aXNpdGVkOiB0cnVlIH0pKTtcbiAgfSwgc3RhdGUpO1xuICBzdGF0ZUNvcHkuX2FjdGl2ZSA9IGZpZWxkO1xuICByZXR1cm4gc3RhdGVDb3B5O1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuSU5JVElBTElaRV0gPSBmdW5jdGlvbiAoc3RhdGUsIF9yZWY2KSB7XG4gIHZhciBfZXh0ZW5kczI7XG5cbiAgdmFyIGRhdGEgPSBfcmVmNi5kYXRhO1xuICB2YXIgZmllbGRzID0gX3JlZjYuZmllbGRzO1xuICB2YXIgb3ZlcndyaXRlVmFsdWVzID0gX3JlZjYub3ZlcndyaXRlVmFsdWVzO1xuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgKDAsIF9pbml0aWFsaXplU3RhdGUyLmRlZmF1bHQpKGRhdGEsIGZpZWxkcywgc3RhdGUsIG92ZXJ3cml0ZVZhbHVlcyksIChfZXh0ZW5kczIgPSB7XG4gICAgX2FzeW5jVmFsaWRhdGluZzogZmFsc2UsXG4gICAgX2FjdGl2ZTogdW5kZWZpbmVkXG4gIH0sIF9leHRlbmRzMltnbG9iYWxFcnJvcktleV0gPSB1bmRlZmluZWQsIF9leHRlbmRzMi5faW5pdGlhbGl6ZWQgPSB0cnVlLCBfZXh0ZW5kczIuX3N1Ym1pdHRpbmcgPSBmYWxzZSwgX2V4dGVuZHMyLl9zdWJtaXRGYWlsZWQgPSBmYWxzZSwgX2V4dGVuZHMyKSk7XG59LCBfYmVoYXZpb3JzW19hY3Rpb25UeXBlcy5SRU1PVkVfQVJSQVlfVkFMVUVdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmNykge1xuICB2YXIgcGF0aCA9IF9yZWY3LnBhdGg7XG4gIHZhciBpbmRleCA9IF9yZWY3LmluZGV4O1xuXG4gIHZhciBhcnJheSA9ICgwLCBfcmVhZDIuZGVmYXVsdCkocGF0aCwgc3RhdGUpO1xuICB2YXIgc3RhdGVDb3B5ID0gX2V4dGVuZHMoe30sIHN0YXRlKTtcbiAgdmFyIGFycmF5Q29weSA9IGFycmF5ID8gW10uY29uY2F0KGFycmF5KSA6IFtdO1xuICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5Q29weS5wb3AoKTtcbiAgfSBlbHNlIGlmIChpc05hTihpbmRleCkpIHtcbiAgICBkZWxldGUgYXJyYXlDb3B5W2luZGV4XTtcbiAgfSBlbHNlIHtcbiAgICBhcnJheUNvcHkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gKDAsIF93cml0ZTIuZGVmYXVsdCkocGF0aCwgYXJyYXlDb3B5LCBzdGF0ZUNvcHkpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuUkVTRVRdID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gIHZhciBfZXh0ZW5kczM7XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCAoMCwgX3Jlc2V0U3RhdGUyLmRlZmF1bHQpKHN0YXRlKSwgKF9leHRlbmRzMyA9IHtcbiAgICBfYWN0aXZlOiB1bmRlZmluZWQsXG4gICAgX2FzeW5jVmFsaWRhdGluZzogZmFsc2VcbiAgfSwgX2V4dGVuZHMzW2dsb2JhbEVycm9yS2V5XSA9IHVuZGVmaW5lZCwgX2V4dGVuZHMzLl9pbml0aWFsaXplZCA9IHN0YXRlLl9pbml0aWFsaXplZCwgX2V4dGVuZHMzLl9zdWJtaXR0aW5nID0gZmFsc2UsIF9leHRlbmRzMy5fc3VibWl0RmFpbGVkID0gZmFsc2UsIF9leHRlbmRzMykpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuU1RBUlRfQVNZTkNfVkFMSURBVElPTl0gPSBmdW5jdGlvbiAoc3RhdGUsIF9yZWY4KSB7XG4gIHZhciBmaWVsZCA9IF9yZWY4LmZpZWxkO1xuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIHtcbiAgICBfYXN5bmNWYWxpZGF0aW5nOiBmaWVsZCB8fCB0cnVlXG4gIH0pO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuU1RBUlRfU1VCTUlUXSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7XG4gICAgX3N1Ym1pdHRpbmc6IHRydWVcbiAgfSk7XG59LCBfYmVoYXZpb3JzW19hY3Rpb25UeXBlcy5TVE9QX0FTWU5DX1ZBTElEQVRJT05dID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmOSkge1xuICB2YXIgX2V4dGVuZHM0O1xuXG4gIHZhciBlcnJvcnMgPSBfcmVmOS5lcnJvcnM7XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCAoMCwgX3NldEVycm9yczIuZGVmYXVsdCkoc3RhdGUsIGVycm9ycywgJ2FzeW5jRXJyb3InKSwgKF9leHRlbmRzNCA9IHtcbiAgICBfYXN5bmNWYWxpZGF0aW5nOiBmYWxzZVxuICB9LCBfZXh0ZW5kczRbZ2xvYmFsRXJyb3JLZXldID0gZXJyb3JzICYmIGVycm9yc1tnbG9iYWxFcnJvcktleV0sIF9leHRlbmRzNCkpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuU1RPUF9TVUJNSVRdID0gZnVuY3Rpb24gKHN0YXRlLCBfcmVmMTApIHtcbiAgdmFyIF9leHRlbmRzNTtcblxuICB2YXIgZXJyb3JzID0gX3JlZjEwLmVycm9ycztcblxuICByZXR1cm4gX2V4dGVuZHMoe30sICgwLCBfc2V0RXJyb3JzMi5kZWZhdWx0KShzdGF0ZSwgZXJyb3JzLCAnc3VibWl0RXJyb3InKSwgKF9leHRlbmRzNSA9IHt9LCBfZXh0ZW5kczVbZ2xvYmFsRXJyb3JLZXldID0gZXJyb3JzICYmIGVycm9yc1tnbG9iYWxFcnJvcktleV0sIF9leHRlbmRzNS5fc3VibWl0dGluZyA9IGZhbHNlLCBfZXh0ZW5kczUuX3N1Ym1pdEZhaWxlZCA9ICEhKGVycm9ycyAmJiBPYmplY3Qua2V5cyhlcnJvcnMpLmxlbmd0aCksIF9leHRlbmRzNSkpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuU1VCTUlUX0ZBSUxFRF0gPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdGF0ZSwge1xuICAgIF9zdWJtaXRGYWlsZWQ6IHRydWVcbiAgfSk7XG59LCBfYmVoYXZpb3JzW19hY3Rpb25UeXBlcy5TV0FQX0FSUkFZX1ZBTFVFU10gPSBmdW5jdGlvbiAoc3RhdGUsIF9yZWYxMSkge1xuICB2YXIgcGF0aCA9IF9yZWYxMS5wYXRoO1xuICB2YXIgaW5kZXhBID0gX3JlZjExLmluZGV4QTtcbiAgdmFyIGluZGV4QiA9IF9yZWYxMS5pbmRleEI7XG5cbiAgdmFyIGFycmF5ID0gKDAsIF9yZWFkMi5kZWZhdWx0KShwYXRoLCBzdGF0ZSk7XG4gIHZhciBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgaWYgKGluZGV4QSA9PT0gaW5kZXhCIHx8IGlzTmFOKGluZGV4QSkgfHwgaXNOYU4oaW5kZXhCKSB8fCBpbmRleEEgPj0gYXJyYXlMZW5ndGggfHwgaW5kZXhCID49IGFycmF5TGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0YXRlOyAvLyBkbyBub3RoaW5nXG4gIH1cbiAgdmFyIHN0YXRlQ29weSA9IF9leHRlbmRzKHt9LCBzdGF0ZSk7XG4gIHZhciBhcnJheUNvcHkgPSBbXS5jb25jYXQoYXJyYXkpO1xuICBhcnJheUNvcHlbaW5kZXhBXSA9IGFycmF5W2luZGV4Ql07XG4gIGFycmF5Q29weVtpbmRleEJdID0gYXJyYXlbaW5kZXhBXTtcbiAgcmV0dXJuICgwLCBfd3JpdGUyLmRlZmF1bHQpKHBhdGgsIGFycmF5Q29weSwgc3RhdGVDb3B5KTtcbn0sIF9iZWhhdmlvcnNbX2FjdGlvblR5cGVzLlRPVUNIXSA9IGZ1bmN0aW9uIChzdGF0ZSwgX3JlZjEyKSB7XG4gIHZhciBmaWVsZHMgPSBfcmVmMTIuZmllbGRzO1xuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBmaWVsZCkge1xuICAgIHJldHVybiAoMCwgX3dyaXRlMi5kZWZhdWx0KShmaWVsZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKDAsIF9maWVsZFZhbHVlLm1ha2VGaWVsZFZhbHVlKShfZXh0ZW5kcyh7fSwgdmFsdWUsIHsgdG91Y2hlZDogdHJ1ZSB9KSk7XG4gICAgfSwgYWNjdW11bGF0b3IpO1xuICB9LCBzdGF0ZSkpO1xufSwgX2JlaGF2aW9yc1tfYWN0aW9uVHlwZXMuVU5UT1VDSF0gPSBmdW5jdGlvbiAoc3RhdGUsIF9yZWYxMykge1xuICB2YXIgZmllbGRzID0gX3JlZjEzLmZpZWxkcztcblxuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgZmllbGQpIHtcbiAgICByZXR1cm4gKDAsIF93cml0ZTIuZGVmYXVsdCkoZmllbGQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhciB0b3VjaGVkID0gdmFsdWUudG91Y2hlZDtcblxuICAgICAgICB2YXIgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh2YWx1ZSwgWyd0b3VjaGVkJ10pO1xuXG4gICAgICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHJlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgwLCBfZmllbGRWYWx1ZS5tYWtlRmllbGRWYWx1ZSkodmFsdWUpO1xuICAgIH0sIGFjY3VtdWxhdG9yKTtcbiAgfSwgc3RhdGUpKTtcbn0sIF9iZWhhdmlvcnMpO1xuXG52YXIgcmVkdWNlciA9IGZ1bmN0aW9uIHJlZHVjZXIoKSB7XG4gIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IGluaXRpYWxTdGF0ZSA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBiZWhhdmlvciA9IGJlaGF2aW9yc1thY3Rpb24udHlwZV07XG4gIHJldHVybiBiZWhhdmlvciA/IGJlaGF2aW9yKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG59O1xuXG5mdW5jdGlvbiBmb3JtUmVkdWNlcigpIHtcbiAgdmFyIF9leHRlbmRzMTE7XG5cbiAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgdmFyIGZvcm0gPSBhY3Rpb24uZm9ybTtcbiAgdmFyIGtleSA9IGFjdGlvbi5rZXk7XG5cbiAgdmFyIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoYWN0aW9uLCBbJ2Zvcm0nLCAna2V5J10pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlZGVjbGFyZVxuXG5cbiAgaWYgKCFmb3JtKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGlmIChrZXkpIHtcbiAgICB2YXIgX2V4dGVuZHM4LCBfZXh0ZW5kczk7XG5cbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09IF9hY3Rpb25UeXBlcy5ERVNUUk9ZKSB7XG4gICAgICB2YXIgX2V4dGVuZHM3O1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCAoX2V4dGVuZHM3ID0ge30sIF9leHRlbmRzN1tmb3JtXSA9IHN0YXRlW2Zvcm1dICYmIE9iamVjdC5rZXlzKHN0YXRlW2Zvcm1dKS5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBzdGF0ZUtleSkge1xuICAgICAgICB2YXIgX2V4dGVuZHM2O1xuXG4gICAgICAgIHJldHVybiBzdGF0ZUtleSA9PT0ga2V5ID8gYWNjdW11bGF0b3IgOiBfZXh0ZW5kcyh7fSwgYWNjdW11bGF0b3IsIChfZXh0ZW5kczYgPSB7fSwgX2V4dGVuZHM2W3N0YXRlS2V5XSA9IHN0YXRlW2Zvcm1dW3N0YXRlS2V5XSwgX2V4dGVuZHM2KSk7XG4gICAgICB9LCB7fSksIF9leHRlbmRzNykpO1xuICAgIH1cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCAoX2V4dGVuZHM5ID0ge30sIF9leHRlbmRzOVtmb3JtXSA9IF9leHRlbmRzKHt9LCBzdGF0ZVtmb3JtXSwgKF9leHRlbmRzOCA9IHt9LCBfZXh0ZW5kczhba2V5XSA9IHJlZHVjZXIoKHN0YXRlW2Zvcm1dIHx8IHt9KVtrZXldLCByZXN0KSwgX2V4dGVuZHM4KSksIF9leHRlbmRzOSkpO1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gX2FjdGlvblR5cGVzLkRFU1RST1kpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc3RhdGUpLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGZvcm1OYW1lKSB7XG4gICAgICB2YXIgX2V4dGVuZHMxMDtcblxuICAgICAgcmV0dXJuIGZvcm1OYW1lID09PSBmb3JtID8gYWNjdW11bGF0b3IgOiBfZXh0ZW5kcyh7fSwgYWNjdW11bGF0b3IsIChfZXh0ZW5kczEwID0ge30sIF9leHRlbmRzMTBbZm9ybU5hbWVdID0gc3RhdGVbZm9ybU5hbWVdLCBfZXh0ZW5kczEwKSk7XG4gICAgfSwge30pO1xuICB9XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RhdGUsIChfZXh0ZW5kczExID0ge30sIF9leHRlbmRzMTFbZm9ybV0gPSByZWR1Y2VyKHN0YXRlW2Zvcm1dLCByZXN0KSwgX2V4dGVuZHMxMSkpO1xufVxuXG4vKipcbiAqIEFkZHMgYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5IHRvIHRoZSByZWR1Y2VyXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlKHRhcmdldCkge1xuICB0YXJnZXQucGx1Z2luID0gZnVuY3Rpb24gcGx1Z2luKHJlZHVjZXJzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIHVzZSAnZnVuY3Rpb24nIGtleXdvcmQgdG8gZW5hYmxlICd0aGlzJ1xuICAgIHJldHVybiBkZWNvcmF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgdmFyIHJlc3VsdCA9IF90aGlzKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCByZXN1bHQsICgwLCBfbWFwVmFsdWVzMi5kZWZhdWx0KShyZWR1Y2VycywgZnVuY3Rpb24gKHBsdWdpblJlZHVjZXIsIGtleSkge1xuICAgICAgICByZXR1cm4gcGx1Z2luUmVkdWNlcihyZXN1bHRba2V5XSB8fCBpbml0aWFsU3RhdGUsIGFjdGlvbik7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGFyZ2V0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZShub3JtYWxpemVycykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgLy8gdXNlICdmdW5jdGlvbicga2V5d29yZCB0byBlbmFibGUgJ3RoaXMnXG4gICAgcmV0dXJuIGRlY29yYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gX3RoaXMyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCByZXN1bHQsICgwLCBfbWFwVmFsdWVzMi5kZWZhdWx0KShub3JtYWxpemVycywgZnVuY3Rpb24gKGZvcm1Ob3JtYWxpemVycywgZm9ybSkge1xuICAgICAgICB2YXIgcnVuTm9ybWFsaXplID0gZnVuY3Rpb24gcnVuTm9ybWFsaXplKHByZXZpb3VzLCBjdXJyZW50UmVzdWx0KSB7XG4gICAgICAgICAgdmFyIHByZXZpb3VzVmFsdWVzID0gKDAsIF9nZXRWYWx1ZXNGcm9tU3RhdGUyLmRlZmF1bHQpKF9leHRlbmRzKHt9LCBpbml0aWFsU3RhdGUsIHByZXZpb3VzKSk7XG4gICAgICAgICAgdmFyIGZvcm1SZXN1bHQgPSBfZXh0ZW5kcyh7fSwgaW5pdGlhbFN0YXRlLCBjdXJyZW50UmVzdWx0KTtcbiAgICAgICAgICB2YXIgdmFsdWVzID0gKDAsIF9nZXRWYWx1ZXNGcm9tU3RhdGUyLmRlZmF1bHQpKGZvcm1SZXN1bHQpO1xuICAgICAgICAgIHJldHVybiAoMCwgX25vcm1hbGl6ZUZpZWxkczIuZGVmYXVsdCkoZm9ybU5vcm1hbGl6ZXJzLCBmb3JtUmVzdWx0LCBwcmV2aW91cywgdmFsdWVzLCBwcmV2aW91c1ZhbHVlcyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhY3Rpb24ua2V5KSB7XG4gICAgICAgICAgdmFyIF9leHRlbmRzMTI7XG5cbiAgICAgICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHJlc3VsdFtmb3JtXSwgKF9leHRlbmRzMTIgPSB7fSwgX2V4dGVuZHMxMlthY3Rpb24ua2V5XSA9IHJ1bk5vcm1hbGl6ZShzdGF0ZVtmb3JtXVthY3Rpb24ua2V5XSwgcmVzdWx0W2Zvcm1dW2FjdGlvbi5rZXldKSwgX2V4dGVuZHMxMikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydW5Ob3JtYWxpemUoc3RhdGVbZm9ybV0sIHJlc3VsdFtmb3JtXSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVjb3JhdGUoZm9ybVJlZHVjZXIpO1xufSx7XCIuL2FjdGlvblR5cGVzXCI6MzksXCIuL2ZpZWxkVmFsdWVcIjo1NyxcIi4vZ2V0VmFsdWVzRnJvbVN0YXRlXCI6NjAsXCIuL2luaXRpYWxpemVTdGF0ZVwiOjYzLFwiLi9tYXBWYWx1ZXNcIjo2NixcIi4vbm9ybWFsaXplRmllbGRzXCI6NjcsXCIuL3JlYWRcIjo2OCxcIi4vcmVzZXRTdGF0ZVwiOjczLFwiLi9zZXRFcnJvcnNcIjo3NCxcIi4vd3JpdGVcIjo3OX1dLDcyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIHdpdGhvdXQgPSBmdW5jdGlvbiB3aXRob3V0KG9iamVjdCwga2V5KSB7XG4gIHZhciBjb3B5ID0gX2V4dGVuZHMoe30sIG9iamVjdCk7XG4gIGRlbGV0ZSBjb3B5W2tleV07XG4gIHJldHVybiBjb3B5O1xufTtcblxudmFyIHJlbW92ZUZpZWxkID0gZnVuY3Rpb24gcmVtb3ZlRmllbGQoZmllbGRzLCBwYXRoKSB7XG4gIHZhciBkb3RJbmRleCA9IHBhdGguaW5kZXhPZignLicpO1xuICB2YXIgb3BlbkluZGV4ID0gcGF0aC5pbmRleE9mKCdbJyk7XG4gIHZhciBjbG9zZUluZGV4ID0gcGF0aC5pbmRleE9mKCddJyk7XG4gIGlmIChvcGVuSW5kZXggPiAwICYmIGNsb3NlSW5kZXggIT09IG9wZW5JbmRleCArIDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvdW5kIFsgbm90IGZvbGxvd2VkIGJ5IF0nKTtcbiAgfVxuICBpZiAob3BlbkluZGV4ID4gMCAmJiAoZG90SW5kZXggPCAwIHx8IG9wZW5JbmRleCA8IGRvdEluZGV4KSkge1xuICAgIHZhciBfcmV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gYXJyYXkgZmllbGRcbiAgICAgIHZhciBrZXkgPSBwYXRoLnN1YnN0cmluZygwLCBvcGVuSW5kZXgpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpZWxkc1trZXldKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IHdpdGhvdXQoZmllbGRzLCBrZXkpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgcmVzdCA9IHBhdGguc3Vic3RyaW5nKGNsb3NlSW5kZXggKyAxKTtcbiAgICAgIGlmIChyZXN0WzBdID09PSAnLicpIHtcbiAgICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyaW5nKDEpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3QpIHtcbiAgICAgICAgdmFyIF9yZXQyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBfZXh0ZW5kczI7XG5cbiAgICAgICAgICB2YXIgY29weSA9IFtdO1xuICAgICAgICAgIGZpZWxkc1trZXldLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVtb3ZlRmllbGQoaXRlbSwgcmVzdCk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29weVtpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHY6IHtcbiAgICAgICAgICAgICAgdjogY29weS5sZW5ndGggPyBfZXh0ZW5kcyh7fSwgZmllbGRzLCAoX2V4dGVuZHMyID0ge30sIF9leHRlbmRzMltrZXldID0gY29weSwgX2V4dGVuZHMyKSkgOiB3aXRob3V0KGZpZWxkcywga2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0oKTtcblxuICAgICAgICBpZiAodHlwZW9mIF9yZXQyID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldDIudjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHY6IHdpdGhvdXQoZmllbGRzLCBrZXkpXG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGlmICh0eXBlb2YgX3JldCA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQudjtcbiAgfVxuICBpZiAoZG90SW5kZXggPiAwKSB7XG4gICAgdmFyIF9leHRlbmRzMztcblxuICAgIC8vIHN1Ym9iamVjdCBmaWVsZFxuICAgIHZhciBfa2V5ID0gcGF0aC5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICAgIHZhciBfcmVzdCA9IHBhdGguc3Vic3RyaW5nKGRvdEluZGV4ICsgMSk7XG4gICAgaWYgKCFmaWVsZHNbX2tleV0pIHtcbiAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSByZW1vdmVGaWVsZChmaWVsZHNbX2tleV0sIF9yZXN0KTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGggPyBfZXh0ZW5kcyh7fSwgZmllbGRzLCAoX2V4dGVuZHMzID0ge30sIF9leHRlbmRzM1tfa2V5XSA9IHJlbW92ZUZpZWxkKGZpZWxkc1tfa2V5XSwgX3Jlc3QpLCBfZXh0ZW5kczMpKSA6IHdpdGhvdXQoZmllbGRzLCBfa2V5KTtcbiAgfVxuICByZXR1cm4gd2l0aG91dChmaWVsZHMsIHBhdGgpO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcmVtb3ZlRmllbGQ7XG59LHt9XSw3MzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZmllbGRWYWx1ZSA9IHJlcXVpcmUoJy4vZmllbGRWYWx1ZScpO1xuXG52YXIgcmVzZXQgPSBmdW5jdGlvbiByZXNldCh2YWx1ZSkge1xuICByZXR1cm4gKDAsIF9maWVsZFZhbHVlLm1ha2VGaWVsZFZhbHVlKSh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlICYmIHZhbHVlLmluaXRpYWwgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBpbml0aWFsOiB2YWx1ZS5pbml0aWFsLCB2YWx1ZTogdmFsdWUuaW5pdGlhbCB9KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgaW5pdGlhbCB2YWx1ZXMgaW50byB0aGUgc3RhdGUgYW5kIHJldHVybnMgYSBuZXcgY29weSBvZiB0aGUgc3RhdGVcbiAqL1xudmFyIHJlc2V0U3RhdGUgPSBmdW5jdGlvbiByZXNldFN0YXRlKHZhbHVlcykge1xuICByZXR1cm4gdmFsdWVzID8gT2JqZWN0LmtleXModmFsdWVzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBrZXkpIHtcbiAgICB2YXIgdmFsdWUgPSB2YWx1ZXNba2V5XTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICgwLCBfZmllbGRWYWx1ZS5pc0ZpZWxkVmFsdWUpKGl0ZW0pID8gcmVzZXQoaXRlbSkgOiByZXNldFN0YXRlKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgaWYgKCgwLCBfZmllbGRWYWx1ZS5pc0ZpZWxkVmFsdWUpKHZhbHVlKSkge1xuICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gcmVzZXQodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSByZXNldFN0YXRlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9LCB7fSkgOiB2YWx1ZXM7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSByZXNldFN0YXRlO1xufSx7XCIuL2ZpZWxkVmFsdWVcIjo1N31dLDc0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9maWVsZFZhbHVlID0gcmVxdWlyZSgnLi9maWVsZFZhbHVlJyk7XG5cbnZhciBpc01ldGFLZXkgPSBmdW5jdGlvbiBpc01ldGFLZXkoa2V5KSB7XG4gIHJldHVybiBrZXlbMF0gPT09ICdfJztcbn07XG5cbi8qKlxuICogU2V0cyBhbiBlcnJvciBvbiBhIGZpZWxkIGRlZXAgaW4gdGhlIHRyZWUsIHJldHVybmluZyBhIG5ldyBjb3B5IG9mIHRoZSBzdGF0ZVxuICovXG52YXIgc2V0RXJyb3JzID0gZnVuY3Rpb24gc2V0RXJyb3JzKHN0YXRlLCBlcnJvcnMsIGRlc3RLZXkpIHtcbiAgdmFyIGNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGUpKSB7XG4gICAgICByZXR1cm4gc3RhdGUubWFwKGZ1bmN0aW9uIChzdGF0ZUl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBzZXRFcnJvcnMoc3RhdGVJdGVtLCBlcnJvcnMgJiYgZXJyb3JzW2luZGV4XSwgZGVzdEtleSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHN0YXRlICYmIHR5cGVvZiBzdGF0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBPYmplY3Qua2V5cyhzdGF0ZSkucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwga2V5KSB7XG4gICAgICAgIHZhciBfZXh0ZW5kczI7XG5cbiAgICAgICAgcmV0dXJuIGlzTWV0YUtleShrZXkpID8gYWNjdW11bGF0b3IgOiBfZXh0ZW5kcyh7fSwgYWNjdW11bGF0b3IsIChfZXh0ZW5kczIgPSB7fSwgX2V4dGVuZHMyW2tleV0gPSBzZXRFcnJvcnMoc3RhdGVba2V5XSwgZXJyb3JzICYmIGVycm9yc1trZXldLCBkZXN0S2V5KSwgX2V4dGVuZHMyKSk7XG4gICAgICB9LCBzdGF0ZSk7XG4gICAgICBpZiAoKDAsIF9maWVsZFZhbHVlLmlzRmllbGRWYWx1ZSkoc3RhdGUpKSB7XG4gICAgICAgICgwLCBfZmllbGRWYWx1ZS5tYWtlRmllbGRWYWx1ZSkocmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKHN0YXRlKTtcbiAgfTtcbiAgaWYgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiBzdGF0ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgaWYgKCFlcnJvcnMpIHtcbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIGlmIChzdGF0ZVtkZXN0S2V5XSkge1xuICAgICAgdmFyIGNvcHkgPSBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xuICAgICAgZGVsZXRlIGNvcHlbZGVzdEtleV07XG4gICAgICByZXR1cm4gKDAsIF9maWVsZFZhbHVlLm1ha2VGaWVsZFZhbHVlKShjb3B5KTtcbiAgICB9XG4gICAgcmV0dXJuIGNsZWFyKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBlcnJvcnMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIF9leHRlbmRzMztcblxuICAgIHJldHVybiAoMCwgX2ZpZWxkVmFsdWUubWFrZUZpZWxkVmFsdWUpKF9leHRlbmRzKHt9LCBzdGF0ZSwgKF9leHRlbmRzMyA9IHt9LCBfZXh0ZW5kczNbZGVzdEtleV0gPSBlcnJvcnMsIF9leHRlbmRzMykpKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcnMpKSB7XG4gICAgaWYgKCFzdGF0ZSB8fCBBcnJheS5pc0FycmF5KHN0YXRlKSkge1xuICAgICAgdmFyIF9yZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3B5ID0gKHN0YXRlIHx8IFtdKS5tYXAoZnVuY3Rpb24gKHN0YXRlSXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gc2V0RXJyb3JzKHN0YXRlSXRlbSwgZXJyb3JzW2luZGV4XSwgZGVzdEtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoZXJyb3JJdGVtLCBpbmRleCkge1xuICAgICAgICAgIHJldHVybiBjb3B5W2luZGV4XSA9IHNldEVycm9ycyhjb3B5W2luZGV4XSwgZXJyb3JJdGVtLCBkZXN0S2V5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogY29weVxuICAgICAgICB9O1xuICAgICAgfSgpO1xuXG4gICAgICBpZiAodHlwZW9mIF9yZXQgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gICAgfVxuICAgIHJldHVybiBzZXRFcnJvcnMoc3RhdGUsIGVycm9yc1swXSwgZGVzdEtleSk7IC8vIHVzZSBmaXJzdCBlcnJvclxuICB9XG4gIGlmICgoMCwgX2ZpZWxkVmFsdWUuaXNGaWVsZFZhbHVlKShzdGF0ZSkpIHtcbiAgICB2YXIgX2V4dGVuZHM0O1xuXG4gICAgcmV0dXJuICgwLCBfZmllbGRWYWx1ZS5tYWtlRmllbGRWYWx1ZSkoX2V4dGVuZHMoe30sIHN0YXRlLCAoX2V4dGVuZHM0ID0ge30sIF9leHRlbmRzNFtkZXN0S2V5XSA9IGVycm9ycywgX2V4dGVuZHM0KSkpO1xuICB9XG4gIHZhciBlcnJvcktleXMgPSBPYmplY3Qua2V5cyhlcnJvcnMpO1xuICBpZiAoIWVycm9yS2V5cy5sZW5ndGggJiYgIXN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIHJldHVybiBlcnJvcktleXMucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwga2V5KSB7XG4gICAgdmFyIF9leHRlbmRzNTtcblxuICAgIHJldHVybiBpc01ldGFLZXkoa2V5KSA/IGFjY3VtdWxhdG9yIDogX2V4dGVuZHMoe30sIGFjY3VtdWxhdG9yLCAoX2V4dGVuZHM1ID0ge30sIF9leHRlbmRzNVtrZXldID0gc2V0RXJyb3JzKHN0YXRlICYmIHN0YXRlW2tleV0sIGVycm9yc1trZXldLCBkZXN0S2V5KSwgX2V4dGVuZHM1KSk7XG4gIH0sIGNsZWFyKCkgfHwge30pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gc2V0RXJyb3JzO1xufSx7XCIuL2ZpZWxkVmFsdWVcIjo1N31dLDc1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc1Byb21pc2UgPSByZXF1aXJlKCdpcy1wcm9taXNlJyk7XG5cbnZhciBfaXNQcm9taXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbnZhciBzaWxlbmNlUHJvbWlzZSA9IGZ1bmN0aW9uIHNpbGVuY2VQcm9taXNlKHByb21pc2UpIHtcbiAgcmV0dXJuICgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShwcm9taXNlKSA/IHByb21pc2UudGhlbihub29wLCBub29wKSA6IHByb21pc2U7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzaWxlbmNlUHJvbWlzZTtcbn0se1wiaXMtcHJvbWlzZVwiOjMwfV0sNzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2lzUHJpc3RpbmUgPSByZXF1aXJlKCcuL2lzUHJpc3RpbmUnKTtcblxudmFyIF9pc1ByaXN0aW5lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJpc3RpbmUpO1xuXG52YXIgX2lzVmFsaWQgPSByZXF1aXJlKCcuL2lzVmFsaWQnKTtcblxudmFyIF9pc1ZhbGlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIFVwZGF0ZXMgYSBmaWVsZCBvYmplY3QgZnJvbSB0aGUgc3RvcmUgdmFsdWVzXG4gKi9cbnZhciB1cGRhdGVGaWVsZCA9IGZ1bmN0aW9uIHVwZGF0ZUZpZWxkKGZpZWxkLCBmb3JtRmllbGQsIGFjdGl2ZSwgc3luY0Vycm9yKSB7XG4gIHZhciBkaWZmID0ge307XG4gIHZhciBmb3JtRmllbGRWYWx1ZSA9IGZvcm1GaWVsZC52YWx1ZSA9PT0gdW5kZWZpbmVkID8gJycgOiBmb3JtRmllbGQudmFsdWU7XG5cbiAgLy8gdXBkYXRlIGZpZWxkIHZhbHVlXG4gIGlmIChmaWVsZC52YWx1ZSAhPT0gZm9ybUZpZWxkVmFsdWUpIHtcbiAgICBkaWZmLnZhbHVlID0gZm9ybUZpZWxkVmFsdWU7XG4gICAgZGlmZi5jaGVja2VkID0gdHlwZW9mIGZvcm1GaWVsZFZhbHVlID09PSAnYm9vbGVhbicgPyBmb3JtRmllbGRWYWx1ZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBkaXJ0eS9wcmlzdGluZVxuICB2YXIgcHJpc3RpbmUgPSAoMCwgX2lzUHJpc3RpbmUyLmRlZmF1bHQpKGZvcm1GaWVsZFZhbHVlLCBmb3JtRmllbGQuaW5pdGlhbCk7XG4gIGlmIChmaWVsZC5wcmlzdGluZSAhPT0gcHJpc3RpbmUpIHtcbiAgICBkaWZmLmRpcnR5ID0gIXByaXN0aW5lO1xuICAgIGRpZmYucHJpc3RpbmUgPSBwcmlzdGluZTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBmaWVsZCBlcnJvclxuICB2YXIgZXJyb3IgPSBzeW5jRXJyb3IgfHwgZm9ybUZpZWxkLnN1Ym1pdEVycm9yIHx8IGZvcm1GaWVsZC5hc3luY0Vycm9yO1xuICBpZiAoZXJyb3IgIT09IGZpZWxkLmVycm9yKSB7XG4gICAgZGlmZi5lcnJvciA9IGVycm9yO1xuICB9XG4gIHZhciB2YWxpZCA9ICgwLCBfaXNWYWxpZDIuZGVmYXVsdCkoZXJyb3IpO1xuICBpZiAoZmllbGQudmFsaWQgIT09IHZhbGlkKSB7XG4gICAgZGlmZi5pbnZhbGlkID0gIXZhbGlkO1xuICAgIGRpZmYudmFsaWQgPSB2YWxpZDtcbiAgfVxuXG4gIGlmIChhY3RpdmUgIT09IGZpZWxkLmFjdGl2ZSkge1xuICAgIGRpZmYuYWN0aXZlID0gYWN0aXZlO1xuICB9XG4gIHZhciB0b3VjaGVkID0gISFmb3JtRmllbGQudG91Y2hlZDtcbiAgaWYgKHRvdWNoZWQgIT09IGZpZWxkLnRvdWNoZWQpIHtcbiAgICBkaWZmLnRvdWNoZWQgPSB0b3VjaGVkO1xuICB9XG4gIHZhciB2aXNpdGVkID0gISFmb3JtRmllbGQudmlzaXRlZDtcbiAgaWYgKHZpc2l0ZWQgIT09IGZpZWxkLnZpc2l0ZWQpIHtcbiAgICBkaWZmLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICB9XG4gIHZhciBhdXRvZmlsbGVkID0gISFmb3JtRmllbGQuYXV0b2ZpbGxlZDtcbiAgaWYgKGF1dG9maWxsZWQgIT09IGZpZWxkLmF1dG9maWxsZWQpIHtcbiAgICBkaWZmLmF1dG9maWxsZWQgPSBhdXRvZmlsbGVkO1xuICB9XG5cbiAgaWYgKCdpbml0aWFsJyBpbiBmb3JtRmllbGQgJiYgZm9ybUZpZWxkLmluaXRpYWwgIT09IGZpZWxkLmluaXRpYWxWYWx1ZSkge1xuICAgIGZpZWxkLmluaXRpYWxWYWx1ZSA9IGZvcm1GaWVsZC5pbml0aWFsO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGRpZmYpLmxlbmd0aCA/IF9leHRlbmRzKHt9LCBmaWVsZCwgZGlmZikgOiBmaWVsZDtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB1cGRhdGVGaWVsZDtcbn0se1wiLi9pc1ByaXN0aW5lXCI6NjQsXCIuL2lzVmFsaWRcIjo2NX1dLDc3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWR1eCA9IHJlcXVpcmUoJ3JlZHV4Jyk7XG5cbnZhciB3cmFwTWFwRGlzcGF0Y2hUb1Byb3BzID0gZnVuY3Rpb24gd3JhcE1hcERpc3BhdGNoVG9Qcm9wcyhtYXBEaXNwYXRjaFRvUHJvcHMsIGFjdGlvbkNyZWF0b3JzKSB7XG4gIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIG1hcERpc3BhdGNoVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICAgICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaFxuICAgICAgICAgIH0sIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpLCAoMCwgX3JlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycykoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBfZXh0ZW5kcyh7XG4gICAgICAgICAgZGlzcGF0Y2g6IGRpc3BhdGNoXG4gICAgICAgIH0sIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCksICgwLCBfcmVkdXguYmluZEFjdGlvbkNyZWF0b3JzKShhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7XG4gICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaFxuICAgICAgfSwgKDAsIF9yZWR1eC5iaW5kQWN0aW9uQ3JlYXRvcnMpKG1hcERpc3BhdGNoVG9Qcm9wcywgZGlzcGF0Y2gpLCAoMCwgX3JlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycykoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaFxuICAgIH0sICgwLCBfcmVkdXguYmluZEFjdGlvbkNyZWF0b3JzKShhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHdyYXBNYXBEaXNwYXRjaFRvUHJvcHM7XG59LHtcInJlZHV4XCI6XCJyZWR1eFwifV0sNzg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgd3JhcE1hcFN0YXRlVG9Qcm9wcyA9IGZ1bmN0aW9uIHdyYXBNYXBTdGF0ZVRvUHJvcHMobWFwU3RhdGVUb1Byb3BzLCBnZXRGb3JtKSB7XG4gIGlmIChtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIG1hcFN0YXRlVG9Qcm9wcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYXBTdGF0ZVRvUHJvcHMgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGlmIChtYXBTdGF0ZVRvUHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwge1xuICAgICAgICAgIGZvcm06IGdldEZvcm0oc3RhdGUpXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpLCB7XG4gICAgICAgIGZvcm06IGdldEZvcm0oc3RhdGUpXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9ybTogZ2V0Rm9ybShzdGF0ZSlcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gd3JhcE1hcFN0YXRlVG9Qcm9wcztcbn0se31dLDc5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuLyoqXG4gKiBXcml0ZXMgYW55IHBvdGVudGlhbGx5IGRlZXAgdmFsdWUgZnJvbSBhbiBvYmplY3QgdXNpbmcgZG90IGFuZCBhcnJheSBzeW50YXgsXG4gKiBhbmQgcmV0dXJucyBhIG5ldyBjb3B5IG9mIHRoZSBvYmplY3QuXG4gKi9cbnZhciB3cml0ZSA9IGZ1bmN0aW9uIHdyaXRlKHBhdGgsIHZhbHVlLCBvYmplY3QpIHtcbiAgdmFyIF9leHRlbmRzNztcblxuICB2YXIgZG90SW5kZXggPSBwYXRoLmluZGV4T2YoJy4nKTtcbiAgaWYgKGRvdEluZGV4ID09PSAwKSB7XG4gICAgcmV0dXJuIHdyaXRlKHBhdGguc3Vic3RyaW5nKDEpLCB2YWx1ZSwgb2JqZWN0KTtcbiAgfVxuICB2YXIgb3BlbkluZGV4ID0gcGF0aC5pbmRleE9mKCdbJyk7XG4gIHZhciBjbG9zZUluZGV4ID0gcGF0aC5pbmRleE9mKCddJyk7XG4gIGlmIChkb3RJbmRleCA+PSAwICYmIChvcGVuSW5kZXggPCAwIHx8IGRvdEluZGV4IDwgb3BlbkluZGV4KSkge1xuICAgIHZhciBfZXh0ZW5kczI7XG5cbiAgICAvLyBpcyBkb3Qgbm90YXRpb25cbiAgICB2YXIga2V5ID0gcGF0aC5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgb2JqZWN0LCAoX2V4dGVuZHMyID0ge30sIF9leHRlbmRzMltrZXldID0gd3JpdGUocGF0aC5zdWJzdHJpbmcoZG90SW5kZXggKyAxKSwgdmFsdWUsIG9iamVjdFtrZXldIHx8IHt9KSwgX2V4dGVuZHMyKSk7XG4gIH1cbiAgaWYgKG9wZW5JbmRleCA+PSAwICYmIChkb3RJbmRleCA8IDAgfHwgb3BlbkluZGV4IDwgZG90SW5kZXgpKSB7XG4gICAgdmFyIF9yZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2V4dGVuZHM2O1xuXG4gICAgICAvLyBpcyBhcnJheSBub3RhdGlvblxuICAgICAgaWYgKGNsb3NlSW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm91bmQgWyBidXQgbm8gXScpO1xuICAgICAgfVxuICAgICAgdmFyIGtleSA9IHBhdGguc3Vic3RyaW5nKDAsIG9wZW5JbmRleCk7XG4gICAgICB2YXIgaW5kZXggPSBwYXRoLnN1YnN0cmluZyhvcGVuSW5kZXggKyAxLCBjbG9zZUluZGV4KTtcbiAgICAgIHZhciBhcnJheSA9IG9iamVjdFtrZXldIHx8IFtdO1xuICAgICAgdmFyIHJlc3QgPSBwYXRoLnN1YnN0cmluZyhjbG9zZUluZGV4ICsgMSk7XG4gICAgICBpZiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIF9leHRlbmRzNDtcblxuICAgICAgICAvLyBpbmRleGVkIGFycmF5XG4gICAgICAgIGlmIChyZXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHZhciBfZXh0ZW5kczM7XG5cbiAgICAgICAgICAvLyBuZWVkIHRvIGtlZXAgcmVjdXJzaW5nXG4gICAgICAgICAgdmFyIGRlc3QgPSBhcnJheVtpbmRleF0gfHwge307XG4gICAgICAgICAgdmFyIGFycmF5Q29weSA9IFtdLmNvbmNhdChhcnJheSk7XG4gICAgICAgICAgYXJyYXlDb3B5W2luZGV4XSA9IHdyaXRlKHJlc3QsIHZhbHVlLCBkZXN0KTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdjogX2V4dGVuZHMoe30sIG9iamVjdCB8fCB7fSwgKF9leHRlbmRzMyA9IHt9LCBfZXh0ZW5kczNba2V5XSA9IGFycmF5Q29weSwgX2V4dGVuZHMzKSlcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb3B5ID0gW10uY29uY2F0KGFycmF5KTtcbiAgICAgICAgY29weVtpbmRleF0gPSB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZShjb3B5W2luZGV4XSkgOiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2OiBfZXh0ZW5kcyh7fSwgb2JqZWN0IHx8IHt9LCAoX2V4dGVuZHM0ID0ge30sIF9leHRlbmRzNFtrZXldID0gY29weSwgX2V4dGVuZHM0KSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIGluZGV4bGVzcyBhcnJheVxuICAgICAgaWYgKHJlc3QubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfZXh0ZW5kczU7XG5cbiAgICAgICAgLy8gbmVlZCB0byBrZWVwIHJlY3Vyc2luZ1xuICAgICAgICBpZiAoKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdjogb2JqZWN0XG4gICAgICAgICAgfTsgLy8gZG9uJ3QgZXZlbiBzZXQgYSB2YWx1ZSB1bmRlciBba2V5XVxuICAgICAgICB9XG4gICAgICAgIHZhciBfYXJyYXlDb3B5ID0gYXJyYXkubWFwKGZ1bmN0aW9uIChkZXN0KSB7XG4gICAgICAgICAgcmV0dXJuIHdyaXRlKHJlc3QsIHZhbHVlLCBkZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogX2V4dGVuZHMoe30sIG9iamVjdCB8fCB7fSwgKF9leHRlbmRzNSA9IHt9LCBfZXh0ZW5kczVba2V5XSA9IF9hcnJheUNvcHksIF9leHRlbmRzNSkpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChvYmplY3Rba2V5XSkge1xuICAgICAgICByZXN1bHQgPSBhcnJheS5tYXAoZnVuY3Rpb24gKGRlc3QpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUoZGVzdCkgOiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IG9iamVjdFxuICAgICAgICB9OyAvLyBkb24ndCBldmVuIHNldCBhIHZhbHVlIHVuZGVyIFtrZXldXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2OiBfZXh0ZW5kcyh7fSwgb2JqZWN0IHx8IHt9LCAoX2V4dGVuZHM2ID0ge30sIF9leHRlbmRzNltrZXldID0gcmVzdWx0LCBfZXh0ZW5kczYpKVxuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBpZiAodHlwZW9mIF9yZXQgPT09IFwib2JqZWN0XCIpIHJldHVybiBfcmV0LnY7XG4gIH1cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBvYmplY3QsIChfZXh0ZW5kczcgPSB7fSwgX2V4dGVuZHM3W3BhdGhdID0gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUob2JqZWN0W3BhdGhdKSA6IHZhbHVlLCBfZXh0ZW5kczcpKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHdyaXRlO1xufSx7fV0sODA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBUaGlzIGFjdGlvbiB0eXBlIHdpbGwgYmUgZGlzcGF0Y2hlZCBieSB0aGUgaGlzdG9yeSBhY3Rpb25zIGJlbG93LlxuICogSWYgeW91J3JlIHdyaXRpbmcgYSBtaWRkbGV3YXJlIHRvIHdhdGNoIGZvciBuYXZpZ2F0aW9uIGV2ZW50cywgYmUgc3VyZSB0b1xuICogbG9vayBmb3IgYWN0aW9ucyBvZiB0aGlzIHR5cGUuXG4gKi9cbnZhciBDQUxMX0hJU1RPUllfTUVUSE9EID0gZXhwb3J0cy5DQUxMX0hJU1RPUllfTUVUSE9EID0gJ0BAcm91dGVyL0NBTExfSElTVE9SWV9NRVRIT0QnO1xuXG5mdW5jdGlvbiB1cGRhdGVMb2NhdGlvbihtZXRob2QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQ0FMTF9ISVNUT1JZX01FVEhPRCxcbiAgICAgIHBheWxvYWQ6IHsgbWV0aG9kOiBtZXRob2QsIGFyZ3M6IGFyZ3MgfVxuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogVGhlc2UgYWN0aW9ucyBjb3JyZXNwb25kIHRvIHRoZSBoaXN0b3J5IEFQSS5cbiAqIFRoZSBhc3NvY2lhdGVkIHJvdXRlck1pZGRsZXdhcmUgd2lsbCBjYXB0dXJlIHRoZXNlIGV2ZW50cyBiZWZvcmUgdGhleSBnZXQgdG9cbiAqIHlvdXIgcmVkdWNlciBhbmQgcmVpc3N1ZSB0aGVtIGFzIHRoZSBtYXRjaGluZyBmdW5jdGlvbiBvbiB5b3VyIGhpc3RvcnkuXG4gKi9cbnZhciBwdXNoID0gZXhwb3J0cy5wdXNoID0gdXBkYXRlTG9jYXRpb24oJ3B1c2gnKTtcbnZhciByZXBsYWNlID0gZXhwb3J0cy5yZXBsYWNlID0gdXBkYXRlTG9jYXRpb24oJ3JlcGxhY2UnKTtcbnZhciBnbyA9IGV4cG9ydHMuZ28gPSB1cGRhdGVMb2NhdGlvbignZ28nKTtcbnZhciBnb0JhY2sgPSBleHBvcnRzLmdvQmFjayA9IHVwZGF0ZUxvY2F0aW9uKCdnb0JhY2snKTtcbnZhciBnb0ZvcndhcmQgPSBleHBvcnRzLmdvRm9yd2FyZCA9IHVwZGF0ZUxvY2F0aW9uKCdnb0ZvcndhcmQnKTtcblxudmFyIHJvdXRlckFjdGlvbnMgPSBleHBvcnRzLnJvdXRlckFjdGlvbnMgPSB7IHB1c2g6IHB1c2gsIHJlcGxhY2U6IHJlcGxhY2UsIGdvOiBnbywgZ29CYWNrOiBnb0JhY2ssIGdvRm9yd2FyZDogZ29Gb3J3YXJkIH07XG59LHt9XSw4MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJvdXRlck1pZGRsZXdhcmUgPSBleHBvcnRzLnJvdXRlckFjdGlvbnMgPSBleHBvcnRzLmdvRm9yd2FyZCA9IGV4cG9ydHMuZ29CYWNrID0gZXhwb3J0cy5nbyA9IGV4cG9ydHMucmVwbGFjZSA9IGV4cG9ydHMucHVzaCA9IGV4cG9ydHMuQ0FMTF9ISVNUT1JZX01FVEhPRCA9IGV4cG9ydHMucm91dGVyUmVkdWNlciA9IGV4cG9ydHMuTE9DQVRJT05fQ0hBTkdFID0gZXhwb3J0cy5zeW5jSGlzdG9yeVdpdGhTdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9yZWR1Y2VyID0gcmVxdWlyZSgnLi9yZWR1Y2VyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnTE9DQVRJT05fQ0hBTkdFJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3JlZHVjZXIuTE9DQVRJT05fQ0hBTkdFO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAncm91dGVyUmVkdWNlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9yZWR1Y2VyLnJvdXRlclJlZHVjZXI7XG4gIH1cbn0pO1xuXG52YXIgX2FjdGlvbnMgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDQUxMX0hJU1RPUllfTUVUSE9EJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2FjdGlvbnMuQ0FMTF9ISVNUT1JZX01FVEhPRDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3B1c2gnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYWN0aW9ucy5wdXNoO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAncmVwbGFjZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLnJlcGxhY2U7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdnbycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLmdvO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZ29CYWNrJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2FjdGlvbnMuZ29CYWNrO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZ29Gb3J3YXJkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2FjdGlvbnMuZ29Gb3J3YXJkO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAncm91dGVyQWN0aW9ucycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9hY3Rpb25zLnJvdXRlckFjdGlvbnM7XG4gIH1cbn0pO1xuXG52YXIgX3N5bmMgPSByZXF1aXJlKCcuL3N5bmMnKTtcblxudmFyIF9zeW5jMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bmMpO1xuXG52YXIgX21pZGRsZXdhcmUgPSByZXF1aXJlKCcuL21pZGRsZXdhcmUnKTtcblxudmFyIF9taWRkbGV3YXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pZGRsZXdhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmV4cG9ydHMuc3luY0hpc3RvcnlXaXRoU3RvcmUgPSBfc3luYzJbJ2RlZmF1bHQnXTtcbmV4cG9ydHMucm91dGVyTWlkZGxld2FyZSA9IF9taWRkbGV3YXJlMlsnZGVmYXVsdCddO1xufSx7XCIuL2FjdGlvbnNcIjo4MCxcIi4vbWlkZGxld2FyZVwiOjgyLFwiLi9yZWR1Y2VyXCI6ODMsXCIuL3N5bmNcIjo4NH1dLDgyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJvdXRlck1pZGRsZXdhcmU7XG5cbnZhciBfYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLyoqXG4gKiBUaGlzIG1pZGRsZXdhcmUgY2FwdHVyZXMgQ0FMTF9ISVNUT1JZX01FVEhPRCBhY3Rpb25zIHRvIHJlZGlyZWN0IHRvIHRoZVxuICogcHJvdmlkZWQgaGlzdG9yeSBvYmplY3QuIFRoaXMgd2lsbCBwcmV2ZW50IHRoZXNlIGFjdGlvbnMgZnJvbSByZWFjaGluZyB5b3VyXG4gKiByZWR1Y2VyIG9yIGFueSBtaWRkbGV3YXJlIHRoYXQgY29tZXMgYWZ0ZXIgdGhpcyBvbmUuXG4gKi9cbmZ1bmN0aW9uIHJvdXRlck1pZGRsZXdhcmUoaGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlICE9PSBfYWN0aW9ucy5DQUxMX0hJU1RPUllfTUVUSE9EKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfYWN0aW9uJHBheWxvYWQgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgICAgdmFyIG1ldGhvZCA9IF9hY3Rpb24kcGF5bG9hZC5tZXRob2Q7XG4gICAgICAgIHZhciBhcmdzID0gX2FjdGlvbiRwYXlsb2FkLmFyZ3M7XG5cbiAgICAgICAgaGlzdG9yeVttZXRob2RdLmFwcGx5KGhpc3RvcnksIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG59LHtcIi4vYWN0aW9uc1wiOjgwfV0sODM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLnJvdXRlclJlZHVjZXIgPSByb3V0ZXJSZWR1Y2VyO1xuLyoqXG4gKiBUaGlzIGFjdGlvbiB0eXBlIHdpbGwgYmUgZGlzcGF0Y2hlZCB3aGVuIHlvdXIgaGlzdG9yeVxuICogcmVjZWl2ZXMgYSBsb2NhdGlvbiBjaGFuZ2UuXG4gKi9cbnZhciBMT0NBVElPTl9DSEFOR0UgPSBleHBvcnRzLkxPQ0FUSU9OX0NIQU5HRSA9ICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnO1xuXG52YXIgaW5pdGlhbFN0YXRlID0ge1xuICBsb2NhdGlvbkJlZm9yZVRyYW5zaXRpb25zOiBudWxsXG59O1xuXG4vKipcbiAqIFRoaXMgcmVkdWNlciB3aWxsIHVwZGF0ZSB0aGUgc3RhdGUgd2l0aCB0aGUgbW9zdCByZWNlbnQgbG9jYXRpb24gaGlzdG9yeVxuICogaGFzIHRyYW5zaXRpb25lZCB0by4gVGhpcyBtYXkgbm90IGJlIGluIHN5bmMgd2l0aCB0aGUgcm91dGVyLCBwYXJ0aWN1bGFybHlcbiAqIGlmIHlvdSBoYXZlIGFzeW5jaHJvbm91c2x5LWxvYWRlZCByb3V0ZXMsIHNvIHJlYWRpbmcgZnJvbSBhbmQgcmVseWluZyBvblxuICogdGhpcyBzdGF0ZSBpcyBkaXNjb3VyYWdlZC5cbiAqL1xuZnVuY3Rpb24gcm91dGVyUmVkdWNlcigpIHtcbiAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gaW5pdGlhbFN0YXRlIDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHR5cGUgPSBfcmVmLnR5cGU7XG4gIHZhciBwYXlsb2FkID0gX3JlZi5wYXlsb2FkO1xuXG4gIGlmICh0eXBlID09PSBMT0NBVElPTl9DSEFOR0UpIHtcbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCB7IGxvY2F0aW9uQmVmb3JlVHJhbnNpdGlvbnM6IHBheWxvYWQgfSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG59LHt9XSw4NDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bmNIaXN0b3J5V2l0aFN0b3JlO1xuXG52YXIgX3JlZHVjZXIgPSByZXF1aXJlKCcuL3JlZHVjZXInKTtcblxudmFyIGRlZmF1bHRTZWxlY3RMb2NhdGlvblN0YXRlID0gZnVuY3Rpb24gZGVmYXVsdFNlbGVjdExvY2F0aW9uU3RhdGUoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnJvdXRpbmc7XG59O1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gc3luY2hyb25pemVzIHlvdXIgaGlzdG9yeSBzdGF0ZSB3aXRoIHRoZSBSZWR1eCBzdG9yZS5cbiAqIExvY2F0aW9uIGNoYW5nZXMgZmxvdyBmcm9tIGhpc3RvcnkgdG8gdGhlIHN0b3JlLiBBbiBlbmhhbmNlZCBoaXN0b3J5IGlzXG4gKiByZXR1cm5lZCB3aXRoIGEgbGlzdGVuIG1ldGhvZCB0aGF0IHJlc3BvbmRzIHRvIHN0b3JlIHVwZGF0ZXMgZm9yIGxvY2F0aW9uLlxuICpcbiAqIFdoZW4gdGhpcyBoaXN0b3J5IGlzIHByb3ZpZGVkIHRvIHRoZSByb3V0ZXIsIHRoaXMgbWVhbnMgdGhlIGxvY2F0aW9uIGRhdGFcbiAqIHdpbGwgZmxvdyBsaWtlIHRoaXM6XG4gKiBoaXN0b3J5LnB1c2ggLT4gc3RvcmUuZGlzcGF0Y2ggLT4gZW5oYW5jZWRIaXN0b3J5Lmxpc3RlbiAtPiByb3V0ZXJcbiAqIFRoaXMgZW5zdXJlcyB0aGF0IHdoZW4gdGhlIHN0b3JlIHN0YXRlIGNoYW5nZXMgZHVlIHRvIGEgcmVwbGF5IG9yIG90aGVyXG4gKiBldmVudCwgdGhlIHJvdXRlciB3aWxsIGJlIHVwZGF0ZWQgYXBwcm9wcmlhdGVseSBhbmQgY2FuIHRyYW5zaXRpb24gdG8gdGhlXG4gKiBjb3JyZWN0IHJvdXRlciBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gc3luY0hpc3RvcnlXaXRoU3RvcmUoaGlzdG9yeSwgc3RvcmUpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuICB2YXIgX3JlZiRzZWxlY3RMb2NhdGlvblN0ID0gX3JlZi5zZWxlY3RMb2NhdGlvblN0YXRlO1xuICB2YXIgc2VsZWN0TG9jYXRpb25TdGF0ZSA9IF9yZWYkc2VsZWN0TG9jYXRpb25TdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFNlbGVjdExvY2F0aW9uU3RhdGUgOiBfcmVmJHNlbGVjdExvY2F0aW9uU3Q7XG4gIHZhciBfcmVmJGFkanVzdFVybE9uUmVwbGEgPSBfcmVmLmFkanVzdFVybE9uUmVwbGF5O1xuICB2YXIgYWRqdXN0VXJsT25SZXBsYXkgPSBfcmVmJGFkanVzdFVybE9uUmVwbGEgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJGFkanVzdFVybE9uUmVwbGE7XG5cbiAgLy8gRW5zdXJlIHRoYXQgdGhlIHJlZHVjZXIgaXMgbW91bnRlZCBvbiB0aGUgc3RvcmUgYW5kIGZ1bmN0aW9uaW5nIHByb3Blcmx5LlxuICBpZiAodHlwZW9mIHNlbGVjdExvY2F0aW9uU3RhdGUoc3RvcmUuZ2V0U3RhdGUoKSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcm91dGluZyBzdGF0ZSB0byBiZSBhdmFpbGFibGUgZWl0aGVyIGFzIGBzdGF0ZS5yb3V0aW5nYCAnICsgJ29yIGFzIHRoZSBjdXN0b20gZXhwcmVzc2lvbiB5b3UgY2FuIHNwZWNpZnkgYXMgYHNlbGVjdExvY2F0aW9uU3RhdGVgICcgKyAnaW4gdGhlIGBzeW5jSGlzdG9yeVdpdGhTdG9yZSgpYCBvcHRpb25zLiAnICsgJ0Vuc3VyZSB5b3UgaGF2ZSBhZGRlZCB0aGUgYHJvdXRlclJlZHVjZXJgIHRvIHlvdXIgc3RvcmVcXCdzICcgKyAncmVkdWNlcnMgdmlhIGBjb21iaW5lUmVkdWNlcnNgIG9yIHdoYXRldmVyIG1ldGhvZCB5b3UgdXNlIHRvIGlzb2xhdGUgJyArICd5b3VyIHJlZHVjZXJzLicpO1xuICB9XG5cbiAgdmFyIGluaXRpYWxMb2NhdGlvbiA9IHZvaWQgMDtcbiAgdmFyIGlzVGltZVRyYXZlbGluZyA9IHZvaWQgMDtcbiAgdmFyIHVuc3Vic2NyaWJlRnJvbVN0b3JlID0gdm9pZCAwO1xuICB2YXIgdW5zdWJzY3JpYmVGcm9tSGlzdG9yeSA9IHZvaWQgMDtcblxuICAvLyBXaGF0IGRvZXMgdGhlIHN0b3JlIHNheSBhYm91dCBjdXJyZW50IGxvY2F0aW9uP1xuICB2YXIgZ2V0TG9jYXRpb25JblN0b3JlID0gZnVuY3Rpb24gZ2V0TG9jYXRpb25JblN0b3JlKHVzZUluaXRpYWxJZkVtcHR5KSB7XG4gICAgdmFyIGxvY2F0aW9uU3RhdGUgPSBzZWxlY3RMb2NhdGlvblN0YXRlKHN0b3JlLmdldFN0YXRlKCkpO1xuICAgIHJldHVybiBsb2NhdGlvblN0YXRlLmxvY2F0aW9uQmVmb3JlVHJhbnNpdGlvbnMgfHwgKHVzZUluaXRpYWxJZkVtcHR5ID8gaW5pdGlhbExvY2F0aW9uIDogdW5kZWZpbmVkKTtcbiAgfTtcblxuICAvLyBJbml0IGN1cnJlbnRMb2NhdGlvbiB3aXRoIHBvdGVudGlhbCBsb2NhdGlvbiBpbiBzdG9yZVxuICB2YXIgY3VycmVudExvY2F0aW9uID0gZ2V0TG9jYXRpb25JblN0b3JlKCk7XG5cbiAgLy8gSWYgdGhlIHN0b3JlIGlzIHJlcGxheWVkLCB1cGRhdGUgdGhlIFVSTCBpbiB0aGUgYnJvd3NlciB0byBtYXRjaC5cbiAgaWYgKGFkanVzdFVybE9uUmVwbGF5KSB7XG4gICAgdmFyIGhhbmRsZVN0b3JlQ2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlU3RvcmVDaGFuZ2UoKSB7XG4gICAgICB2YXIgbG9jYXRpb25JblN0b3JlID0gZ2V0TG9jYXRpb25JblN0b3JlKHRydWUpO1xuICAgICAgaWYgKGN1cnJlbnRMb2NhdGlvbiA9PT0gbG9jYXRpb25JblN0b3JlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGFkZHJlc3MgYmFyIHRvIHJlZmxlY3Qgc3RvcmUgc3RhdGVcbiAgICAgIGlzVGltZVRyYXZlbGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbkluU3RvcmU7XG4gICAgICBoaXN0b3J5LnRyYW5zaXRpb25UbyhfZXh0ZW5kcyh7fSwgbG9jYXRpb25JblN0b3JlLCB7XG4gICAgICAgIGFjdGlvbjogJ1BVU0gnXG4gICAgICB9KSk7XG4gICAgICBpc1RpbWVUcmF2ZWxpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgdW5zdWJzY3JpYmVGcm9tU3RvcmUgPSBzdG9yZS5zdWJzY3JpYmUoaGFuZGxlU3RvcmVDaGFuZ2UpO1xuICAgIGhhbmRsZVN0b3JlQ2hhbmdlKCk7XG4gIH1cblxuICAvLyBXaGVuZXZlciBsb2NhdGlvbiBjaGFuZ2VzLCBkaXNwYXRjaCBhbiBhY3Rpb24gdG8gZ2V0IGl0IGluIHRoZSBzdG9yZVxuICB2YXIgaGFuZGxlTG9jYXRpb25DaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2NhdGlvbkNoYW5nZShsb2NhdGlvbikge1xuICAgIC8vIC4uLiB1bmxlc3Mgd2UganVzdCBjYXVzZWQgdGhhdCBsb2NhdGlvbiBjaGFuZ2VcbiAgICBpZiAoaXNUaW1lVHJhdmVsaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVtZW1iZXIgd2hlcmUgd2UgYXJlXG4gICAgY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgICAvLyBBcmUgd2UgYmVpbmcgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZT9cbiAgICBpZiAoIWluaXRpYWxMb2NhdGlvbikge1xuICAgICAgLy8gUmVtZW1iZXIgYXMgYSBmYWxsYmFjayBpbiBjYXNlIHN0YXRlIGlzIHJlc2V0XG4gICAgICBpbml0aWFsTG9jYXRpb24gPSBsb2NhdGlvbjtcblxuICAgICAgLy8gUmVzcGVjdCBwZXJzaXN0ZWQgbG9jYXRpb24sIGlmIGFueVxuICAgICAgaWYgKGdldExvY2F0aW9uSW5TdG9yZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUZWxsIHRoZSBzdG9yZSB0byB1cGRhdGUgYnkgZGlzcGF0Y2hpbmcgYW4gYWN0aW9uXG4gICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgdHlwZTogX3JlZHVjZXIuTE9DQVRJT05fQ0hBTkdFLFxuICAgICAgcGF5bG9hZDogbG9jYXRpb25cbiAgICB9KTtcbiAgfTtcbiAgdW5zdWJzY3JpYmVGcm9tSGlzdG9yeSA9IGhpc3RvcnkubGlzdGVuKGhhbmRsZUxvY2F0aW9uQ2hhbmdlKTtcblxuICAvLyBUaGUgZW5oYW5jZWQgaGlzdG9yeSB1c2VzIHN0b3JlIGFzIHNvdXJjZSBvZiB0cnV0aFxuICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICAvLyBUaGUgbGlzdGVuZXJzIGFyZSBzdWJzY3JpYmVkIHRvIHRoZSBzdG9yZSBpbnN0ZWFkIG9mIGhpc3RvcnlcblxuICAgIGxpc3RlbjogZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgICAvLyBDb3B5IG9mIGxhc3QgbG9jYXRpb24uXG4gICAgICB2YXIgbGFzdFB1Ymxpc2hlZExvY2F0aW9uID0gZ2V0TG9jYXRpb25JblN0b3JlKHRydWUpO1xuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgd2UgdW5zdWJzY3JpYmVkLCBhcyBSZWR1eCBzdG9yZVxuICAgICAgLy8gb25seSBhcHBsaWVzIGNoYW5nZXMgaW4gc3Vic2NyaXB0aW9ucyBvbiBuZXh0IGRpc3BhdGNoXG4gICAgICB2YXIgdW5zdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB2YXIgdW5zdWJzY3JpYmVGcm9tU3RvcmUgPSBzdG9yZS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VycmVudExvY2F0aW9uID0gZ2V0TG9jYXRpb25JblN0b3JlKHRydWUpO1xuICAgICAgICBpZiAoY3VycmVudExvY2F0aW9uID09PSBsYXN0UHVibGlzaGVkTG9jYXRpb24pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFB1Ymxpc2hlZExvY2F0aW9uID0gY3VycmVudExvY2F0aW9uO1xuICAgICAgICBpZiAoIXVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgIGxpc3RlbmVyKGxhc3RQdWJsaXNoZWRMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBIaXN0b3J5IGxpc3RlbmVycyBleHBlY3QgYSBzeW5jaHJvbm91cyBjYWxsLiBNYWtlIHRoZSBmaXJzdCBjYWxsIHRvIHRoZVxuICAgICAgLy8gbGlzdGVuZXIgYWZ0ZXIgc3Vic2NyaWJpbmcgdG8gdGhlIHN0b3JlLCBpbiBjYXNlIHRoZSBsaXN0ZW5lciBjYXVzZXMgYVxuICAgICAgLy8gbG9jYXRpb24gY2hhbmdlIChlLmcuIHdoZW4gaXQgcmVkaXJlY3RzKVxuICAgICAgbGlzdGVuZXIobGFzdFB1Ymxpc2hlZExvY2F0aW9uKTtcblxuICAgICAgLy8gTGV0IHVzZXIgdW5zdWJzY3JpYmUgbGF0ZXJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIHVuc3Vic2NyaWJlRnJvbVN0b3JlKCk7XG4gICAgICB9O1xuICAgIH0sXG5cblxuICAgIC8vIEl0IGFsc28gcHJvdmlkZXMgYSB3YXkgdG8gZGVzdHJveSBpbnRlcm5hbCBsaXN0ZW5lcnNcbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoYWRqdXN0VXJsT25SZXBsYXkpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVGcm9tU3RvcmUoKTtcbiAgICAgIH1cbiAgICAgIHVuc3Vic2NyaWJlRnJvbUhpc3RvcnkoKTtcbiAgICB9XG4gIH0pO1xufVxufSx7XCIuL3JlZHVjZXJcIjo4M31dfSx7fSxbNF0pO1xuIl0sImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
