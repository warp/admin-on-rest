'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectInput = require('./SelectInput');

var _SelectInput2 = _interopRequireDefault(_SelectInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NullableBooleanInput = function NullableBooleanInput(_ref) {
    var input = _ref.input,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        label = _ref.label,
        source = _ref.source,
        elStyle = _ref.elStyle,
        resource = _ref.resource;
    return _react2.default.createElement(_SelectInput2.default, {
        input: input,
        label: label,
        source: source,
        resource: resource,
        choices: [{ id: null, name: '' }, { id: false, name: 'aor.boolean.false' }, { id: true, name: 'aor.boolean.true' }],
        errorText: touched && error,
        style: elStyle
    });
};

NullableBooleanInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    elStyle: _react.PropTypes.object,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    meta: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    source: _react.PropTypes.string
};

NullableBooleanInput.defaultProps = {
    addField: true
};

exports.default = NullableBooleanInput;
module.exports = exports['default'];