import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import jaLocale from '@fullcalendar/core/locales/ja';

export default function Calendar(props) {
  const {
    events,
  } = props;

  return (<>
    <div style={{ width: '80%', margin: '50px auto 0 auto' }}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin
        ]}
        initialView="dayGridMonth"
        // locales={[jaLocale]}
        // locale='ja'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        events={events}
      />
    </div>
  </>);
}