'use client';

import data from "./data";
import { Fragment } from "react";
import { useStore } from "@/stores/encounter";

import H2Block from "../_/components/H2Block";

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

  return (<>
    <main className="flex min-h-screen flex-col gap-4 p-24">
      {/** for debug */}
      {<div className="p-4 block bg-gray-300/70 rounded">
        <a
          className="[&:link]:underline text-blue-500 hover:text-red-500"
          href="/encounter"
        >/encounter</a><br/>
        <br/>
        symps: {JSON.stringify(sympsStore)}<br/>
        diags: {JSON.stringify(diagsStore)}<br/>
        exams: {JSON.stringify(examsStore)}<br/>
      </div>}

      <button
        className="p-2 w-fit text-white bg-gray-500 rounded"
        onClick={() => initStore()}
      >リセット</button><br/>

      <h1>診察</h1>
      <div>患者情報</div>
      氏名：小林慎治、54歳、男性

      {!!sympsStore.length && (<>
        <H2Block heading={'受診理由（主訴・症状）'}>
          {sympsStore.map((symp) => <Fragment key={symp}>
            <div>
              {symp}
            </div>
          </Fragment>)}
        </H2Block>
      </>)}

      <div>現病歴</div>

      <div>検査結果</div>

      {!!diagsStore.length && (<>
        <H2Block heading='今の検査で考えられる病気は以下の通りです。'>
          {diagsStore.map((diag) => <Fragment key={diag}>
            <div>
              {diag}
            </div>
          </Fragment>)}
        </H2Block>
      </>)}

      {!!diagsStore.length && (<>
        <H2Block heading='追加で以下の検査を提案します。'>
          {(() => {
            const exams = new Set(
              diagsStore
                .map((diag) =>  data.diag2exam[diag])
                .flat()
            );

            return [...exams].map((exam) => {
              const examData = data.exams?.[exam];

              return (<Fragment key={exam}>
                <div>
                  <label>
                    <input
                      // id="symptom"
                      type="checkbox"
                      // name="interest"
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

                  {!!examData && (<details className="ml-4">
                    <summary>詳細</summary>
                    <div>{examData.desc}</div>
                    <div>{examData.point} points</div>
                  </details>)}
                </div>
              </Fragment>);
            });
          })()}
        </H2Block>
      </>)}

      <div>追加検査
        大腸内視鏡検査
       大腸造影検査
       腹部単純CT
       腹部造影CT
      </div>
    </main>
  </>);
}
