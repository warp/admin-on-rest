'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _powerSettingsNew = require('material-ui/svg-icons/action/power-settings-new');

var _powerSettingsNew2 = _interopRequireDefault(_powerSettingsNew);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _authActions = require('../../actions/authActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logout = function Logout(_ref) {
    var translate = _ref.translate,
        userLogout = _ref.userLogout;
    return _react2.default.createElement(_MenuItem2.default, {
        className: 'logout',
        leftIcon: _react2.default.createElement(_powerSettingsNew2.default, null),
        primaryText: translate('aor.auth.logout'),
        onClick: userLogout
    });
};

Logout.propTypes = {
    translate: _react.PropTypes.func,
    userLogout: _react.PropTypes.func
};

var enhance = (0, _compose2.default)(_translate2.default, (0, _reactRedux.connect)(null, { userLogout: _authActions.userLogout }));

exports.default = enhance(Logout);
module.exports = exports['default'];