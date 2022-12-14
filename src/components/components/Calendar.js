import React, {useMemo} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import { withRouter } from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { makeUrl } from "../../redux/actions/functions";
import { connect } from "react-redux";
function Calendar(props) {
	
	console.log(props.settings);

	
	const events = useMemo(() => {
	    return props.items.map(event => {
	        const isCourse = event.type === 'course';
	        const date = new Date();
	        const dateParts = event.product.lesson_date.split('/');
	        date.setFullYear(dateParts[2]);
	        date.setMonth(+dateParts[1] - 1);
	        date.setDate(dateParts[0]);

	      //   console.log('date', dateParts.join('/'), date);

	        return {
	            title: event.product.name,
                // date: new Date(event.product.lesson_date),
               date,
					imageurl: props.settings.mainUrl + '/storage/' + event.product.image_url,
					
            }
        });
    }, [props.items]);
	 

	 function renderEventContent(eventInfo) {
      return (
        <div className="calendar-class">
			<div className="calendar-class-title">{eventInfo.event.title}</div>
			<div className="calendar-class-box">	
				<div className="calendar-class-inner">
					<div className="calendar-class-date">{eventInfo.timeText}</div>
					<div className="calendar-class-price">£50</div>
				</div>
				
				<div className="calendar-class-img">
					<img src={eventInfo.event.extendedProps.imageurl} />
				</div>
			</div>
        </div>
      )
    }
    return (
        <div className={"classes-section"}>
            <div className={"classes-container"}>
                <h2 className="portfolio-navs-header">Calendar Class</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
						  eventContent={renderEventContent}
                    events={events}
						  
                />
					 
            </div>
        </div>
    );
}
function mapStateToProps(state) {
	return {
	  settings: state.settings,
	};
 }
export default connect(mapStateToProps)(withRouter(Calendar));
