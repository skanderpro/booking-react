import React, {useMemo} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import {NavLink, withRouter} from "react-router-dom";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import {makeUrl} from "../../redux/actions/functions";
import {connect} from "react-redux";

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
            <NavLink className="calendar-class"
                     to={`/class-detail/${linkParam}`}>
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
                             alt={eventInfo.event.title}/>
                    </div>
                </div>
            </NavLink>
        )
    }

    return (
        <div className={"classes-section"}>
            <div className={"classes-container"}>
                <FullCalendar
                    firstDay={1}
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
