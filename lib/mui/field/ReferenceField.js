'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceField = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _referenceActions = require('../../actions/referenceActions');

var _linkToRecord = require('../../util/linkToRecord');

var _linkToRecord2 = _interopRequireDefault(_linkToRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
var ReferenceField = exports.ReferenceField = function (_Component) {
    (0, _inherits3.default)(ReferenceField, _Component);

    function ReferenceField() {
        (0, _classCallCheck3.default)(this, ReferenceField);
        return (0, _possibleConstructorReturn3.default)(this, (ReferenceField.__proto__ || Object.getPrototypeOf(ReferenceField)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReferenceField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.crudGetOneReference(this.props.reference, (0, _lodash2.default)(this.props.record, this.props.source));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.props.crudGetOneReference(nextProps.reference, (0, _lodash2.default)(nextProps.record, nextProps.source));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                record = _props.record,
                source = _props.source,
                reference = _props.reference,
                referenceRecord = _props.referenceRecord,
                basePath = _props.basePath,
                allowEmpty = _props.allowEmpty,
                children = _props.children,
                elStyle = _props.elStyle,
                linkType = _props.linkType;

            if (_react2.default.Children.count(children) !== 1) {
                throw new Error('<ReferenceField> only accepts a single child');
            }
            if (!referenceRecord && !allowEmpty) {
                return _react2.default.createElement(_LinearProgress2.default, null);
            }
            var rootPath = basePath.split('/').slice(0, -1).join('/');
            var href = (0, _linkToRecord2.default)(rootPath + '/' + reference, (0, _lodash2.default)(record, source));
            var child = _react2.default.cloneElement(children, {
                record: referenceRecord,
                resource: reference,
                allowEmpty: allowEmpty,
                basePath: basePath,
                translateChoice: false
            });
            if (linkType === 'edit' || linkType === true) {
                return _react2.default.createElement(
                    _reactRouterDom.Link,
                    { style: elStyle, to: href },
                    child
                );
            }
            if (linkType === 'show') {
                return _react2.default.createElement(
                    _reactRouterDom.Link,
                    { style: elStyle, to: href + '/show' },
                    child
                );
            }
            return child;
        }
    }]);
    return ReferenceField;
}(_react.Component);

ReferenceField.propTypes = {
    addLabel: _react.PropTypes.bool,
    allowEmpty: _react.PropTypes.bool.isRequired,
    basePath: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.element.isRequired,
    crudGetOneReference: _react.PropTypes.func.isRequired,
    elStyle: _react.PropTypes.object,
    label: _react.PropTypes.string,
    record: _react.PropTypes.object,
    reference: _react.PropTypes.string.isRequired,
    referenceRecord: _react.PropTypes.object,
    source: _react.PropTypes.string.isRequired,
    linkType: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool]).isRequired
};

ReferenceField.defaultProps = {
    addLabel: true,
    referenceRecord: null,
    record: {},
    allowEmpty: false,
    linkType: 'edit'
};

function mapStateToProps(state, props) {
    return {
        referenceRecord: state.admin[props.reference].data[(0, _lodash2.default)(props.record, props.source)]
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
    crudGetOneReference: _referenceActions.crudGetOneReference
})(ReferenceField);