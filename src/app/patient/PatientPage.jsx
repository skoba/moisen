'use client';

import data from "@/app/_/data/encounter";
import { Fragment } from "react";
import { FcHome } from "react-icons/fc";
import { twMerge } from 'tailwind-merge'

import { useStore } from "@/stores/encounter";
import H2Block from "../_/components/H2Block";
import PatientInfo from "../_/components/PatientInfo";

import DatePicker from "../_/components/DatePicker";
import { format, formatISO, parse } from '@/libs/date-fns';

export default function PatientPage() {
  const initStore = useStore((state) => state.init);

  const sympsStore = useStore((state) => state.symps);
  // const addSympStore = useStore((state) => state.addSymp);
  // const deleteSympStore = useStore((state) => state.deleteSymp);

  const diagsStore = useStore((state) => state.diags);
  // const addDiagStore = useStore((state) => state.addDiag);
  // const deleteDiagStore = useStore((state) => state.deleteDiag);

  const examsStore = useStore((state) => state.exams);
  const addExamStore = useStore((state) => state.addExam);
  const deleteExamStore = useStore((state) => state.deleteExam);

  const eventsStore = useStore((state) => state.events);
  const addEventStore = useStore((state) => state.addEvent);
  const deleteEventStore = useStore((state) => state.deleteEvent);

  const dialogStore = useStore((state) => state.dialog);
  // const updateDialogStore = useStore((state) => state.updateDialog);

  // const isSubmittedDialogStore = useStore((state) => state.isSubmittedDialogStore);
  // const updateSubmittedDialogStore = useStore((state) => state.updateIsSubmittedDialogStore);

  return (<>
    <main className="flex min-h-screen flex-col gap-4 p-24 text-lg">
      <PatientInfo />
      {!!sympsStore.length && (<>
        <H2Block heading={'受診理由（主訴・症状）'}>
          {sympsStore.map((symp) => <Fragment key={symp}>
            <div>
              {symp}
            </div>
          </Fragment>)}
        </H2Block>
      </>)}

      {!!dialogStore && (<>
        <H2Block heading={'診療記録'}>
          <div>{dialogStore}</div>
        </H2Block>
      </>)}

      {!!diagsStore.length && (<>
        <H2Block heading='検査の結果、考えられる病気は以下の通りです'>
          {diagsStore.map((diag) => <Fragment key={diag}>
            <div>
              {diag}
            </div>
          </Fragment>)}
        </H2Block>
      </>)}

      {!!diagsStore.length && (<>
        <H2Block heading='追加で以下の検査を提案します'>
          {(() => {
            const exams = new Set(
              diagsStore
                .map((diag) =>  data.diag2exam[diag])
                .flat()
            );

            return [...exams].map((exam, idx) => {
              const examData = data.exams?.[exam];

              return (<Fragment key={`${idx}-${exam}`}>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      value={exam}
                      checked={examsStore.includes(exam)}
                      onChange={(event) => {
                        const checked = event.target.checked;

                        if (checked) {
                          addExamStore(exam);
                        } else {
                          deleteExamStore(exam);
                        }
                      }}
                    />
                    {exam}
                  </label>

                  {examsStore.includes(exam) && (<>
                    <div className="ml-4">
                      <DatePicker
                        className="border border-[--foreground-rgb] rounded"
                        dateFormat='yyyy/MM/dd HH:mm'
                        // timeFormat='HH:mm'
                        showTimeSelect
                        filterTime={(time) => {
                          const current = new Date();
                          const selected = new Date(time);
                          return current.getTime() < selected.getTime();
                        }}
                        selected={
                          (new Map(eventsStore)).get(exam)?.start
                            ? new Date((new Map(eventsStore)).get(exam).start)
                            : null
                        }
                        onChange={(date, event) => {
                          const value = (() => {
                            if (!date) return '';
                            // const _date = isEndOfDay ? endOfDay(date) : date;
                            const _date = date;
                            // return formatString ? format(_date, formatString) : formatISO(_date);
                            return formatISO(_date);
                          })();

                          // console.warn(event?.type);
                          // if (event?.type === 'click') {
                          // }
                          if (value) {
                            addEventStore({
                              title: exam,
                              start: value,
                            });
                          } else {
                            deleteEventStore(exam);
                          }
                        }}
                      />
                    </div>
                  </>)}

                  {!!examData && (<details className="ml-4">
                    <summary>詳細</summary>
                    <div>{examData.desc}</div>
                    <div>{examData.point * 3}円</div>
                  </details>)}
                </div>
              </Fragment>);
            });
          })()}
        </H2Block>
      </>)}
    </main>
  </>);
}
