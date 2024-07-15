'use client';

import data from "./data";
import { Fragment } from "react";
import { FcHome } from "react-icons/fc";
import { twMerge } from 'tailwind-merge'

import { useStore } from "@/stores/encounter";
import H2Block from "../_/components/H2Block";
import Calendar from "../_/components/Calendar";

export default function EncounterPage() {
  const initStore = useStore((state) => state.init);

  const sympsStore = useStore((state) => state.symps);
  const addSympStore = useStore((state) => state.addSymp);
  const deleteSympStore = useStore((state) => state.deleteSymp);

  const diagsStore = useStore((state) => state.diags);
  const addDiagStore = useStore((state) => state.addDiag);
  const deleteDiagStore = useStore((state) => state.deleteDiag);

  const examsStore = useStore((state) => state.exams);
  // const addExamStore = useStore((state) => state.addExam);
  // const deleteExamStore = useStore((state) => state.deleteExam);

  const eventsStore = useStore((state) => state.events);
  // const addEventStore = useStore((state) => state.addEvent);
  // const deleteEventStore = useStore((state) => state.deleteEvent);

  return (<>
    <main className="flex min-h-screen flex-col gap-4 p-24">
      {/** for debug */}
      {<div className="p-4 block bg-gray-300/70 rounded">
        <div className={twMerge(
          "flex items-center gap-2",
          [
            "[&:not(:first-child)]:[&>a]:flex",
            "[&:not(:first-child)]:[&>a]:relative",
            "[&:not(:first-child)]:[&>a]:gap-2",
            "[&:not(:first-child)]:[&>a]:before:content-['>']",
            "[&:not(:first-child)]:[&>a]:before:text-gray-500",
          ]
        )}>
          <a href="/"><FcHome /></a>
          <a
            className="text-blue-500 hover:text-red-500"
            href="/patient"
          >patient</a><br/>
        </div>
        <br/>
        symps: {JSON.stringify(sympsStore)}<br/>
        diags: {JSON.stringify(diagsStore)}<br/>
        exams: {JSON.stringify(examsStore)}<br/>
        events: {JSON.stringify(eventsStore)}<br/>
      </div>}

      <button
        className="p-2 w-fit text-white bg-gray-500 rounded"
        onClick={() => initStore()}
      >リセット</button><br/>

      <h1>診察</h1>
      <div>患者情報</div>
      氏名：小林慎治、54歳、男性

      <H2Block heading={'受診理由（主訴・症状）'}>
        {Object.keys(data.symp2diag).map((symp) => <Fragment key={symp}>
          <div>
            <label>
              <input
                id="symptom"
                type="checkbox"
                name="interest"
                value={symp}
                checked={sympsStore.includes(symp)}
                onChange={(event) => {
                  const checked = event.target.checked;

                  if (checked) {
                    addSympStore(symp);
                  } else {
                    deleteSympStore(symp);
                  }
                }}
              />
              {symp}
            </label>
          </div>
        </Fragment>)}
      </H2Block>

      <div>現病歴</div>

      <div>検査結果</div>

      {!!sympsStore.length && (<>
        <H2Block heading='考えられる疾患'>
          {(() => {
            const diags = new Set(
              sympsStore
                .map((symp) =>  data.symp2diag[symp])
                .flat()
            );

            return [...diags].map((diag) => <Fragment key={diag}>
              <div>
                <label>
                  <input
                    // id="symptom"
                    type="checkbox"
                    // name="interest"
                    value={diag}
                    checked={diagsStore.includes(diag)}
                    onChange={(event) => {
                      const checked = event.target.checked;

                      if (checked) {
                        addDiagStore(diag);
                      } else {
                        deleteDiagStore(diag);
                      }
                    }}
                  />
                  {diag}
                </label>
              </div>
            </Fragment>);
          })()}
        </H2Block>
      </>)}

      {!!examsStore.length && (<>
        <H2Block heading='追加検査'>
          {examsStore.map((exam) => <Fragment key={exam}>
            <div>
              {exam}
            </div>
          </Fragment>)}
        </H2Block>
      </>)}

      {!!eventsStore.length && (
        <Calendar events={[...(new Map(eventsStore)).values()]} />
      )}

      <div>追加検査
        大腸内視鏡検査
       大腸造影検査
       腹部単純CT
       腹部造影CT
      </div>
    </main>
  </>);
}
