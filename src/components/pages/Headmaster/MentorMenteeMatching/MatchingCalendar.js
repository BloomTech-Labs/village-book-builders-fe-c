import React, { createRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Button } from 'antd';
import Events from './Events';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import PersonInfoModal from './PersonInfoModal';
import DraggableMenuLists from './DraggableMenuLists';

import {
  fetchCalendar,
  saveCalendar,
  createCalendarEvent,
  editCalendarEvent,
  removeCalendarEvent,
  fetchMentors,
  fetchMentees,
  showModal,
} from '../../../../state/actions/index';
import ComputerDropdown from './ComputerDropdown';

const MatchingCalendar = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendarReducer.events);
  const changesMade = useSelector(state => state.calendarReducer.changesMade);
  const isLoading = useSelector(state => state.calendarReducer.isLoading);
  const selectedComputerId = useSelector(
    state => state.calendarReducer.selectedComputerId
  );
  const mentors = useSelector(state => state.headmasterReducer.mentors);
  const mentees = useSelector(state => state.headmasterReducer.mentees);
  const headmasterProfile = useSelector(
    state => state.headmasterReducer.headmasterProfile
  );
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

  const startOfWeek = moment()
    .startOf('week')
    .toISOString(true);
  const endOfWeek = moment()
    .endOf('week')
    .toISOString(true);

  useEffect(() => {
    dispatch(fetchMentees());
    dispatch(fetchMentors());
  }, [dispatch]);

  // params : { start, end, computerId, villageId, schooldId, libraryId }
  useEffect(() => {
    if (changesMade || headmasterProfile.villageId === undefined) return;
    const params = {
      start: startOfWeek,
      end: endOfWeek,
      computerId: selectedComputerId,
      villageId: headmasterProfile.villageId,
      libraryId: headmasterProfile.libraryId,
      schoolId: headmasterProfile.schoolId,
    };
    dispatch(fetchCalendar(params));
  }, [dispatch, headmasterProfile, changesMade, selectedComputerId]);

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
          mentor: [],
          mentee: [],
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

  const handleEventChange = changeInfo => {
    const newEvent = { ...changeInfo.event.toPlainObject() };
    newEvent.mentor = newEvent.extendedProps.mentor
      ? [...newEvent.extendedProps.mentor]
      : [];
    newEvent.mentee = newEvent.extendedProps.mentee
      ? [...newEvent.extendedProps.mentee]
      : [];
    delete newEvent.extendedProps;
    dispatch(editCalendarEvent(newEvent));
  };

  const renderSlotLane = _ => {
    return <div className="timeSlotRow"></div>;
  };

  const removeEvent = event => {
    event.remove();
  };

  const handleEventRemove = removeInfo => {
    dispatch(removeCalendarEvent(removeInfo.event.toPlainObject()));
  };

  const renderEventContent = ({ event }) => {
    return <Events event={event} removeEvent={removeEvent} />;
  };

  // This gets called when an event is going to be dropped
  // into the calendar.
  const handleEventReceive = dropInfo => {
    // Check if there's no events in that slot already
    let eventInSlot = events.filter(
      event => event.start === dropInfo.event.startStr
    );

    // if there aren't, then create a new event with this information
    if (eventInSlot.length === 0) {
      dispatch(
        createCalendarEvent({
          ...dropInfo.event.toPlainObject(),
          id: uuid(),
          mentor: [...dropInfo.event.extendedProps.mentor],
          mentee: [...dropInfo.event.extendedProps.mentee],
        })
      );
    } else {
      // There is an event in this slot.
      eventInSlot = eventInSlot[0];
      // What type of event is trying to be added?
      const typeToAdd = dropInfo.event.extendedProps.dropping;
      const otherType = typeToAdd === 'mentor' ? 'mentee' : 'mentor';
      const newEvent = { ...eventInSlot };
      newEvent[typeToAdd] = dropInfo.event.extendedProps[typeToAdd];
      newEvent[otherType] = eventInSlot[otherType];

      console.log(newEvent);

      dispatch(editCalendarEvent(newEvent));
    }
    dropInfo.revert();
  };

  return (
    <div>
      <PersonInfoModal />
      <h1>Mentor - Mentee Matching</h1>
      <section className="calendarSection">
        <section>
          <ComputerDropdown />
          <DraggableMenuLists />
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
