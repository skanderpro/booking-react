import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function Calendar() {
	return (
	<div className={"classes-section"}>
		<div className={"classes-container"}>
			<h2 className="portfolio-navs-header">Calendar Class</h2>
			<FullCalendar
				plugins={[ dayGridPlugin ]}
				initialView="dayGridMonth"
			/>
		</div>
	</div>
	);
}
export default Calendar;
