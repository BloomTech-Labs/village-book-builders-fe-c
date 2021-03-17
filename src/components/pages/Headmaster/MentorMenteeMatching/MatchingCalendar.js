import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import 'antd/dist/antd.css';
import React, { createRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import Events from './Events';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
// import MatchingModal from './MatchingModal';
import {
  fetchCalendar,
  addCalendarSession,
  createCalendarEvent,
  editCalendarEvent,
} from '../../../../state/actions/index';

const MatchingCalendar = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendarReducer.events);

  let calendar = createRef();

  useEffect(() => {
    const startOfWeek = moment()
      .startOf('week')
      .toISOString(true);
    const endOfWeek = moment()
      .endOf('week')
      .toISOString(true);
    dispatch(fetchCalendar(startOfWeek, endOfWeek));
  }, [dispatch]);

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(events)));
  }, [events]);

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
          sessions: [
            {
              id: uuid(),
              mentors: [],
              mentees: [],
              computerId: 1,
            },
          ],
        },
      },
      true
    );
  };

  const handleEventAdd = ({ event }) => {
    console.log(event.toPlainObject());
    dispatch(createCalendarEvent(event.toPlainObject()));
  };

  const [clickMenteeList, setClickMenteeList] = useState(false);
  const [clickMentorList, setClickMentorList] = useState(false);

  const handleClickMenteeList = () => {
    setClickMenteeList(!clickMenteeList);
  };
  const handleClickMentorList = () => {
    setClickMentorList(!clickMentorList);
  };

  const handleDrop = element => {
    console.log(element);
  };

  const showAddButton = ({ event, el }) => {
    el.classList.remove('sessionHide');
    el.classList.add('sessionShow');
  };

  const hideAddButton = ({ event, el }) => {
    el.classList.remove('sessionShow');
    el.classList.add('sessionHide');
  };

  const addSessionToEvent = event => {
    dispatch(addCalendarSession(event));
  };

  const handleEventChange = changeInfo => {
    dispatch(editCalendarEvent(changeInfo.event));
  };

  const renderSlotLane = _ => <div style={{ height: '76px' }}></div>;

  const renderEventContent = ({ event }) => {
    return event.extendedProps.sessions &&
      event.extendedProps.sessions.length > 3 ? (
      <Avatar className="sessionsBadge" size={50}>
        {event.extendedProps.sessions.length}
      </Avatar>
    ) : (
      <Events event={event} addSession={addSessionToEvent} />
    );
  };

  const transformDataToEvents = eventData => {
    const { sessions } = eventData;
    // if (sessions.length === 0) return false;
    eventData.start = sessions[0].start;
    eventData.end = sessions[0].end;
    eventData.extendedProps = { sessions };
    return { ...eventData };
  };

  return (
    <div>
      <h1>Mentor - Mentee Matching</h1>
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
          eventDataTransform={transformDataToEvents}
          eventMouseEnter={showAddButton}
          eventMouseLeave={hideAddButton}
          events={events}
          eventChange={handleEventChange}
          drop={handleDrop}
          slotLabelClassNames={['slotRow']}
          eventClassNames={['sessionsEvent']}
          slotLaneContent={renderSlotLane}
          slotDuration={{ minutes: 30 }}
          slotMinTime={'08:00:00'}
        />
      </div>
      {/* <Draggable>
        <MatchingModal />
      </Draggable> */}
      <div className="miniListContainer">
        <div className="miniMentorList">
          <h1>Mentor List</h1>
          <button className="miniMentorButton" onClick={handleClickMentorList}>
            {clickMentorList ? 'Hide' : 'Show'}
          </button>
          {clickMentorList ? <MiniMentorList /> : null}
        </div>
        <div className="miniMenteeList">
          <h1>Mentee List</h1>
          <button className="miniMenteeButton" onClick={handleClickMenteeList}>
            {clickMenteeList ? 'Hide' : 'Show'}
          </button>
          {clickMenteeList ? <MiniMenteeList /> : null}
        </div>
      </div>
    </div>
  );
};

export default MatchingCalendar;
