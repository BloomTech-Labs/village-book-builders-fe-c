import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';
import 'antd/dist/antd.css';
import React, { createRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Events from './Events';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
// import MatchingModal from './MatchingModal';
import {
  fetchCalendar,
  addCalendarSession,
  createCalendarEvent,
  editCalendarEvent,
  removeCalendarEvent,
  fetchMentors,
} from '../../../../state/actions/index';

const MatchingCalendar = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendarReducer.events);
  const mentors = useSelector(state => state.headmasterReducer.mentors);
  const [clickMenteeList, setClickMenteeList] = useState(false);
  const [clickMentorList, setClickMentorList] = useState(false);

  let calendar = createRef();

  useEffect(() => {
    if (!mentors || mentors.length === 0) return;
    const draggableItems = document.getElementsByClassName('draggableItem');
    for (let item of draggableItems) new Draggable(item);
  }, [mentors]);

  useEffect(() => {
    const startOfWeek = moment()
      .startOf('week')
      .toISOString(true);
    const endOfWeek = moment()
      .endOf('week')
      .toISOString(true);
    dispatch(fetchCalendar(startOfWeek, endOfWeek));
    dispatch(fetchMentors());
  }, [dispatch]);

  const handleSelectClick = selectInfo => {
    const title = 'Session';
    let calendarAPI = calendar.current.getApi();

    calendarAPI.unselect();

    calendarAPI.addEvent(
      {
        id: uuid(),
        title,
        start: selectInfo.startStr,
        end: moment(selectInfo.startStr)
          .add(1, 'hour')
          .toISOString(true),
        allDay: selectInfo.allDay,
        extendedProps: {
          sessions: [],
        },
      },
      true
    );
  };

  const handleEventAdd = addInfo => {
    dispatch(createCalendarEvent(addInfo.event.toPlainObject()));
  };

  const handleClickMenteeList = () => {
    setClickMenteeList(!clickMenteeList);
  };
  const handleClickMentorList = () => {
    setClickMentorList(!clickMentorList);
  };

  const addSessionToEvent = event => {
    dispatch(addCalendarSession(event));
  };

  const handleEventChange = changeInfo => {
    dispatch(editCalendarEvent(changeInfo.event.toPlainObject()));
  };

  const renderSlotLane = _ => {
    return <div style={{ height: '76px' }}></div>;
  };

  const removeEvent = event => {
    event.remove();
  };

  const handleEventRemove = removeInfo => {
    dispatch(removeCalendarEvent(removeInfo.event.toPlainObject()));
  };

  const renderEventContent = ({ event }) => {
    return (
      <Events
        event={event}
        addSession={addSessionToEvent}
        removeEvent={removeEvent}
      />
    );
  };

  const handleDragDrop = dropInfo => {
    console.log(dropInfo);
  };

  const onDrop = dropInfo => {
    console.log(dropInfo.dateStr);
  };

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
      <section className="calendarSection">
        <aside className="mentorList">
          <h3>Mentors</h3>
          {mentors &&
            mentors.map(mentorInfo => (
              <div
                className="draggableItem"
                key={mentorInfo.id}
                data-event={JSON.stringify({
                  title: 'Session',
                  duration: '01:00',
                  sessions: [
                    {
                      mentor: [
                        {
                          id: mentorInfo.id,
                          first_name: mentorInfo.first_name,
                          last_name: mentorInfo.last_name,
                        },
                      ],
                      mentee: [],
                    },
                  ],
                })}
              >
                {mentorInfo.first_name} ({mentorInfo.availability.as_early_as} -{' '}
                {mentorInfo.availability.as_late_as})
              </div>
            ))}
        </aside>
        <div className="calStyling">
          <FullCalendar
            ref={calendar}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            droppable={true}
            expandRows={true}
            contentHeight="auto"
            select={handleSelectClick}
            eventContent={renderEventContent}
            eventAdd={handleEventAdd}
            events={events}
            eventReceive={handleDragDrop}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove}
            slotLabelClassNames={['slotRow']}
            eventClassNames={['sessionsEvent']}
            slotLaneContent={renderSlotLane}
            slotDuration={{ minutes: 30 }}
            slotMinTime={'08:00:00'}
            drop={onDrop}
          />
        </div>
      </section>

      <div className="miniListContainer">
        <div className="listButton1">
          <h1>Mentor List</h1>
          <button onClick={handleClickMentorList}>
            {clickMentorList ? 'Hide' : 'Show'}
          </button>
          {clickMentorList ? <MiniMentorList /> : null}
        </div>
        <div className="listButton2">
          <h1>Mentee List</h1>
          <button onClick={handleClickMenteeList}>
            {clickMenteeList ? 'Hide' : 'Show'}
          </button>
          {clickMenteeList ? <MiniMenteeList /> : null}
        </div>
      </div>
    </div>
  );
};

export default MatchingCalendar;
