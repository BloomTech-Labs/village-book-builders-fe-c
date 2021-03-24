import React, { createRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';
import { message } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Events from './Events';
import MiniMentorList from './MiniMentorList';
import MiniMenteeList from './MiniMenteeList';
import PersonInfoModal from './PersonInfoModal';
import ComputerDropdown from './ComputerDropdown';
import DraggableMenuLists from './DraggableMenuLists';

import {
  fetchCalendar,
  createCalendarEvent,
  editCalendarEvent,
  removeCalendarEvent,
} from '../../../../state/actions/index';

const MatchingCalendar = props => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.calendarReducer.events);
  const changesMade = useSelector(state => state.calendarReducer.changesMade);
  const errors = useSelector(state => state.calendarReducer.errors);

  const selectedComputerId = useSelector(
    state => state.calendarReducer.selectedComputerId
  );

  const headmasterProfile = useSelector(
    state => state.headmasterReducer.headmasterProfile
  );

  const [clickMenteeList, setClickMenteeList] = useState(false);
  const [clickMentorList, setClickMentorList] = useState(false);

  let calendar = createRef();

  const startOfWeek = moment()
    .startOf('week')
    .toISOString(true);
  const endOfWeek = moment()
    .endOf('week')
    .toISOString(true);

  // params : { start, end, computerId, villageId, schooldId, libraryId }
  useEffect(() => {
    if (changesMade || headmasterProfile === '') return;
    const params = {
      start: startOfWeek,
      end: endOfWeek,
      computerId: selectedComputerId,
      villageId: headmasterProfile.villageId,
      libraryId: headmasterProfile.libraryId,
      schoolId: headmasterProfile.schoolId,
    };
    dispatch(fetchCalendar(params));
  }, [
    dispatch,
    headmasterProfile,
    changesMade,
    selectedComputerId,
    endOfWeek,
    startOfWeek,
  ]);

  useEffect(() => {
    if (errors.message) message.error(errors.message);
  }, [errors]);

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
    const newEvent = { ...addInfo.event.toPlainObject() };
    const { villageId, schoolId, libraryId } = headmasterProfile;
    newEvent.villageId = villageId;
    newEvent.schoolId = schoolId;
    newEvent.libraryId = libraryId;
    newEvent.computerId = selectedComputerId;
    newEvent.locationId = 1; // HARDCODED CHANGE LATER
    dispatch(createCalendarEvent(newEvent));
  };

  const handleClickMenteeList = () => {
    setClickMenteeList(!clickMenteeList);
  };
  const handleClickMentorList = () => {
    setClickMentorList(!clickMentorList);
  };

  const handleEventChange = changeInfo => {
    const newEvent = { ...changeInfo.event.toPlainObject() };
    const { villageId, schoolId, libraryId } = headmasterProfile;
    newEvent.villageId = villageId;
    newEvent.schoolId = schoolId;
    newEvent.libraryId = libraryId;
    newEvent.computerId = selectedComputerId;
    newEvent.locationId = 1; // HARDCODED CHANGE LATER
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

    const { villageId, schoolId, libraryId } = headmasterProfile;

    // if there aren't, then create a new event with this information
    if (eventInSlot.length === 0) {
      dispatch(
        createCalendarEvent({
          ...dropInfo.event.toPlainObject(),
          id: uuid(),
          mentor: [...dropInfo.event.extendedProps.mentor],
          mentee: [...dropInfo.event.extendedProps.mentee],
          villageId,
          schoolId,
          libraryId,
          computerId: selectedComputerId,
          locationId: 1, // HARDCODED CHANGE LATER
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
      newEvent.villageId = villageId;
      newEvent.schoolId = schoolId;
      newEvent.libraryId = libraryId;
      newEvent.computerId = selectedComputerId;
      newEvent.locationId = 1; // HARDCODED CHANGE LATER

      dispatch(editCalendarEvent(newEvent));
    }
    dropInfo.revert();
  };

  // this function checks if an event CAN be dropped in the
  // hovered spot. true = it can be, false = it cannot
  const handleEventAllow = (dropInfo, draggedEvent) => {
    const { startStr, endStr } = dropInfo;
    const start = moment(startStr);
    const end = moment(endStr);
    const day = start.format('dddd');
    const startTime = start.format('HH:mm');
    const { dropping, mentor, mentee } = draggedEvent.extendedProps;
    let canBeDropped = true;
    if (dropping === 'mentor') {
      mentor.forEach(person => {
        if (
          person.availability.day !== day ||
          person.availability.time !== startTime
        )
          canBeDropped = false;
      });
      return canBeDropped;
    } else if (dropping === 'mentee') {
      mentee.forEach(person => {
        const startOfDay = start.startOf('day');
        if (
          start.isBefore(
            startOfDay.add(moment(person.availability.as_early_as, 'HH:mm'))
          ) ||
          end.isAfter(
            startOfDay.add(moment(person.availability.as_late_as, 'HH:mm'))
          )
        ) {
          canBeDropped = false;
        }
      });
      return canBeDropped;
    } else return true;
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
            eventAllow={handleEventAllow}
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
