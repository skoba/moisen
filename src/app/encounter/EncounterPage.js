'use client';

import data from "./data";
import { Fragment } from "react";
import { FcHome, FcCheckmark, FcCancel } from "react-icons/fc";
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
    <main className="flex min-h-screen flex-col lg:flex-row gap-4 p-8 bg-white text-lg">
      <div className="flex-1">
        <div className="border p-4 rounded-md shadow-md mb-4">
          <H2Block heading={'患者情報'}>
            <p className="text-md">小林慎治、54歳、男性</p>
          </H2Block>

          <H2Block heading={'現病歴'}>
            <div>既往で痔核、胃潰瘍のある方。１ヶ月前から便秘気味になっており、残便感もあり、時々腹痛もある。以前より体重減少もある。1週間前から便に血が混ざっており、心配となり外来受診となった。
</div>
          </H2Block>

          <H2Block heading={'検査結果'}>
            <div>
              <p>検尿：タンパク陰性、糖陰性</p>
              <p>便：潜血陽性</p>
              <p>血算：白血球数5200/μl, 赤血球数 380万/μl, Hb 10.8g/dl, ヘマトクリット 32%, 血小板数 38万/μl</p>
            </div>
          </H2Block>

          <H2Block heading={'受診理由（主訴・症状）'}>
            {Object.keys(data.symp2diag).map((symp) => <Fragment key={symp}>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-lg">
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
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  {symp}
                </label>
              </div>
            </Fragment>)}
          </H2Block>
        </div>
      </div>

      {/* <div className="border-l border-gray-300"></div> 区切り線を追加 */}

      <div className="flex-1">
        <div className="border p-4 rounded-md shadow-md mb-4">
          <H2Block heading='考えられる疾患'>
            {!!sympsStore.length ? (
              <>
                {(() => {
                  const diags = new Set(
                    sympsStore
                      .map((symp) => data.symp2diag[symp])
                      .flat()
                  );

                  return [...diags].map((diag) => <Fragment key={diag}>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-lg">
                        <input
                          type="checkbox"
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
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        {diag}
                      </label>
                    </div>
                  </Fragment>);
                })()}
              </>
            ) : (
              <div>受診理由を選択してください</div>
            )}
          </H2Block>
        </div>

        {!!examsStore.length && (<>
          <div className="border p-4 rounded-md shadow-md mb-4">
            <H2Block heading='追加検査'>
              {examsStore.map((exam) => <Fragment key={exam}>
                <div className="flex items-center gap-2">
                  <FcCheckmark className="text-xl" />
                  {exam}
                </div>
              </Fragment>)}
            </H2Block>
          </div>
        </>)}

      {!!eventsStore.length && (
        <Calendar events={[...(new Map(eventsStore)).values()]} />
      )}


        <div className="border p-4 rounded-md shadow-md">
          <H2Block heading={'追加検査'}>
            <ul className="list-disc list-inside">
              <li>大腸内視鏡検査</li>
              <li>大腸造影検査</li>
              <li>腹部単純CT</li>
              <li>腹部造影CT</li>
            </ul>
          </H2Block>
        </div>
      </div>
    </main>
  </>);
}