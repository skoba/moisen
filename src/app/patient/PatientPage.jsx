'use client';

import data from "../encounter/data";
import { Fragment } from "react";
import { FcHome } from "react-icons/fc";
import { twMerge } from 'tailwind-merge'

import { useStore } from "@/stores/encounter";
import H2Block from "../_/components/H2Block";
import PatientInfo from "../_/components/PatientInfo";

import DatePicker from "../_/components/DatePicker";
import { format, formatISO } from '@/libs/date-fns';

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

  return (<>
    <main className="flex min-h-screen flex-col gap-4 p-24  bg-white text-lg">
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
                    <DatePicker
                      dateFormat='yyyy/MM/dd'
                      selected={(new Map(eventsStore)).get(exam)?.start ?? null}
                      onChange={(date, event) => {
                        const value = (() => {
                          if (!date) return '';
                          // const _date = isEndOfDay ? endOfDay(date) : date;
                          const _date = date;
                          // return formatString ? format(_date, formatString) : formatISO(_date);
                          return formatISO(_date);
                        })();

                        // console.warn(event?.type);
                        if (event?.type === 'click') {
                          if (value) {
                            addEventStore({
                              title: exam,
                              start: value,
                            });
                          } else {
                            deleteEventStore(exam);
                          }
                        }
                      }}
                    />
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