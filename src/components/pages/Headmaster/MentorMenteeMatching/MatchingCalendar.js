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
  fetchMentees,
} from '../../../../state/actions/index';

const MatchingCalendar = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendarReducer.events);
  const mentors = useSelector(state => state.headmasterReducer.mentors);
  const mentees = useSelector(state => state.headmasterReducer.mentees);
  const [clickMenteeList, setClickMenteeList] = useState(false);
  const [clickMentorList, setClickMentorList] = useState(false);

  let calendar = createRef();

  useEffect(() => {
    if (!mentors || mentors.length === 0) return;
    const draggableItems = document.getElementsByClassName('draggableMentor');
    for (let item of draggableItems) new Draggable(item);
  }, [mentors]);

  useEffect(() => {
    if (!mentees || mentees.length === 0) return;
    const draggableItems = document.getElementsByClassName('draggableMentee');
    for (let item of draggableItems) new Draggable(item);
  }, [mentees]);

  useEffect(() => {
    const startOfWeek = moment()
      .startOf('week')
      .toISOString(true);
    const endOfWeek = moment()
      .endOf('week')
      .toISOString(true);
    dispatch(fetchCalendar(startOfWeek, endOfWeek));
    dispatch(fetchMentors());
    dispatch(fetchMentees());
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
    const newEvent = { ...changeInfo.event.toPlainObject() };
    newEvent.sessions = [...newEvent.extendedProps.sessions];
    delete newEvent.extendedProps;
    dispatch(editCalendarEvent(newEvent));
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

  // This gets called when an event is going to be dropped
  // into the calendar.
  const handleEventReceive = dropInfo => {
    console.log(`Running`);
    // Check if there's no events in that slot already
    let eventInSlot = events.filter(
      event => event.start === dropInfo.event.startStr
    );

    // if there aren't, then create a new event with this information
    if (eventInSlot.length === 0) {
      const sessions = [...dropInfo.event.extendedProps.sessions].map(
        session => {
          session.id = uuid();
          session.start = dropInfo.event.startStr;
          session.end = dropInfo.event.endStr;
          return session;
        }
      );
      dispatch(
        createCalendarEvent({
          ...dropInfo.event.toPlainObject(),
          id: uuid(),
          sessions,
        })
      );
    } else {
      // There are events in this slot.
      // What type of event is trying to be added?
      eventInSlot = eventInSlot[0];
      const typeToAdd = dropInfo.event.extendedProps.dropping;
      const newEvent = { ...eventInSlot };
      let allSlotsWereFull = true;
      newEvent.sessions = eventInSlot.sessions.map(session => {
        if (session[typeToAdd].length === 0) {
          session[typeToAdd] =
            dropInfo.event.extendedProps.sessions[0][typeToAdd];
          allSlotsWereFull = false;
        }
        session.id = uuid();
        session.start = dropInfo.event.startStr;
        session.end = dropInfo.event.endStr;
        return session;
      });

      const other = typeToAdd === 'mentor' ? 'mentee' : 'mentor';

      if (allSlotsWereFull)
        newEvent.sessions.push({
          id: uuid(),
          start: dropInfo.event.startStr,
          end: dropInfo.event.endStr,
          [typeToAdd]: dropInfo.event.extendedProps.sessions[0][typeToAdd],
          [other]: [],
        });

      console.log(newEvent);
      dispatch(editCalendarEvent(newEvent));
    }
    dropInfo.revert();
  };

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
      <section className="calendarSection">
        <section>
          <aside className="mentorList">
            <h3>Mentors</h3>
            {mentors &&
              mentors.map(mentorInfo => (
                <div
                  className="draggableMentor"
                  key={mentorInfo.id}
                  data-event={JSON.stringify({
                    title: 'Session',
                    duration: '01:00',
                    dropping: 'mentor',
                    sessions: [
                      {
                        mentor: [
                          {
                            ...mentorInfo,
                          },
                        ],
                        mentee: [],
                      },
                    ],
                  })}
                >
                  {mentorInfo.first_name} ({mentorInfo.availability.as_early_as}{' '}
                  - {mentorInfo.availability.as_late_as})
                </div>
              ))}
          </aside>
          <aside className="menteeList">
            <h3>Mentees</h3>
            {mentees &&
              mentees.map(menteeInfo => (
                <div
                  className="draggableMentee"
                  key={menteeInfo.id}
                  data-event={JSON.stringify({
                    title: 'Session',
                    duration: '01:00',
                    dropping: 'mentee',
                    sessions: [
                      {
                        mentee: [
                          {
                            ...menteeInfo,
                          },
                        ],
                        mentor: [],
                      },
                    ],
                  })}
                >
                  {menteeInfo.first_name} ({menteeInfo.availability.as_early_as}{' '}
                  - {menteeInfo.availability.as_late_as})
                </div>
              ))}
          </aside>
        </section>
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
            eventReceive={handleEventReceive}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove}
            slotLabelClassNames={['slotRow']}
            eventClassNames={['sessionsEvent']}
            slotLaneContent={renderSlotLane}
            slotDuration={{ minutes: 30 }}
            slotMinTime={'08:00:00'}
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
