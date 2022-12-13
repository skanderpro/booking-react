import React, {useMemo} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function Calendar(props) {
	console.log('items', props.items);

	const events = useMemo(() => {
	    return props.items.map(event => {
	        const isCourse = event.type === 'course';
	        const date = new Date();
	        const dateParts = event.product.lesson_date.split('/');
	        date.setFullYear(dateParts[2]);
	        date.setMonth(+dateParts[1] - 1);
	        date.setDate(dateParts[0]);

	        console.log('date', dateParts.join('/'), date);

	        return {
	            title: event.product.name,
                // date: new Date(event.product.lesson_date),
                date,
            }
        });
    }, [props.items]);

    return (
        <div className={"classes-section"}>
            <div className={"classes-container"}>
                <h2 className="portfolio-navs-header">Calendar Class</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                />
            </div>
        </div>
    );
}

export default Calendar;
