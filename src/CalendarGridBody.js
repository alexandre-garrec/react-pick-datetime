var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var joinClasses = require('react/lib/joinClasses');

var CalendarGridBody = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    getDescendantIdForDay: React.PropTypes.func.isRequired,
    days: React.PropTypes.array.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  handleDayClick: function(day) {
    this.props.onComplete(day);
  },

  render: function() {
    var {days, value, ...otherProps} = this.props;

    return (
      <tbody {...otherProps}>
        {days.map((week, idx) => (
          <tr key={idx}>
            {week.map((day, idx) => (
              <td 
                aria-selected={day.isSelected+''}
                className={joinClasses(
                  'CalendarGridBody-day',
                  day.isToday && 'CalendarGridBody-day--isToday',
                  day.isOtherMonth && 'CalendarGridBody-day--isOtherMonth',
                  day.isValue && 'CalendarGridBody-day--isValue'
                )}
                id={this.props.getDescendantIdForDay(day.value)}
                key={idx}
                onClick={this.handleDayClick.bind(this, day.value)}
                role="gridcell">
                {day.formatted}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

});

module.exports = CalendarGridBody;