var React = require('react');
var ComponentPropType = require('react-pick-2/lib/helpers/ComponentPropType');

var joinClasses = require('react/lib/joinClasses');

var CalendarToggleButton = React.createClass({

  propTypes: {
    buttonComponent: ComponentPropType
  },

  getDefaultProps: function() {
    return {
      buttonComponent: 'button'
    };
  },

  render: function() {
    var ButtonComponent = this.props.buttonComponent;
    var {className, ...otherProps} = this.props;

    return (
      <ButtonComponent
        {...otherProps}
        className={joinClasses('CalendarToggleButton', className)}>
        📅
      </ButtonComponent>
    );
  }

});

module.exports = CalendarToggleButton;