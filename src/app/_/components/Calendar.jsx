import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import jaLocale from '@fullcalendar/core/locales/ja';

export default function Calendar(props) {
  const {
    events,
  } = props;

  // const now = Date.now();
  // const dateFormatStr = 'yyyy-MM-dd';

  return (<>
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
      // events={[
      //   {
      //     title:'event title',
      //     start: format(Date.now(), dateFormatStr),
      //   },
      //   {
      //     title: 'event title 2',
      //     start: format(addDays(now, 2), dateFormatStr),
      //     end: format(addDays(now, 5), dateFormatStr),
      //   }
      // ]}
      events={events}
    />
  </>);
}
