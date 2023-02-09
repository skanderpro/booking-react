import React, { useMemo } from "react";

import FullCalendar from "@fullcalendar/react";
import { NavLink, withRouter } from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { makeUrl } from "../../redux/actions/functions";
import { connect } from "react-redux";

function Calendar(props) {
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
				date,
				imageurl: props.settings.mainUrl + '/storage/' + event.product.image_url,
				extendedProps: event
			}
		});
	}, [props.items]);


	function renderEventContent(eventInfo) {
		console.log('eventInfo', eventInfo);
		const linkParam = eventInfo.event.extendedProps.product.slug || eventInfo.event.extendedProps.product.id;

		return (
			<a className="calendar-class"
				href={`/class-detail/${linkParam}`}>
				<div
					className="calendar-class-title">{eventInfo.event.title}</div>
				<div className="calendar-class-box">
					<div className="calendar-class-inner">
						<div
							className="calendar-class-date">{eventInfo.timeText}</div>
						<div
							className="calendar-class-price">£{eventInfo.event.extendedProps.product.price}</div>
					</div>

					<div className="calendar-class-img">
						<img src={eventInfo.event.extendedProps.imageurl}
							alt={eventInfo.event.title} />
					</div>
				</div>
			</a>
		)
	}

	return (

		<FullCalendar
            firstDay={1}
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			eventContent={renderEventContent}
			events={events}
		/>

	);
}

function mapStateToProps(state) {
	return {
		settings: state.settings,
	};
}

export default connect(mapStateToProps)(withRouter(Calendar));
