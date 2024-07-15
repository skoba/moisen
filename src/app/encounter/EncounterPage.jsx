'use client';

import data from "@/app/_/data/encounter";
import { Fragment, useState } from "react";
import { FcHome, FcCheckmark, FcCancel } from "react-icons/fc";
import { twMerge } from 'tailwind-merge'
import PatientInfo from "../_/components/PatientInfo";

import { useStore } from "@/stores/encounter";
import H2Block from "../_/components/H2Block";
import Calendar from "../_/components/Calendar";

import { useSpeechRecognition } from "@/app/_/hooks/useSpeechRecognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa6";


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

  const dialogStore = useStore((state) => state.dialog);
  const updateDialogStore = useStore((state) => state.updateDialog);

  const isSubmittedDialogStore = useStore((state) => state.isSubmittedDialog);
  const updateIsSubmittedDialogStore = useStore((state) => state.updateIsSubmittedDialog);

  const {
    text,
    transcript,
    isRecording,
    setIsRecording,
  } = useSpeechRecognition();

  const [tmpText, setTmpText] = useState("");

  return (<>
    <main className="flex min-h-screen flex-col lg:flex-row gap-4 p-8 text-lg">
      <div className="flex-1">
        <div className="border p-4 rounded-md shadow-md mb-4">
          <PatientInfo />
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

          <H2Block
            heading={<>
              <span className="flex items-center justify-between">
                会話記録
                <button
                  className="btn"
                  disabled={isSubmittedDialogStore || transcript}
                  onClick={() => {
                    setIsRecording(prev => {
                      const next = !prev;

                      if (next) {
                        ;
                      } else {
                        setTmpText(tmpText + text);
                      }

                      return next;
                    });
                  }}
                >
                  {isRecording ? <FaMicrophone /> : <FaMicrophoneSlash /> }
                </button>
              </span>
            </>}
          >
            <textarea
              className="textarea textarea-bordered w-full [field-sizing:content]"
              readOnly={isRecording || isSubmittedDialogStore}
              value={
                isSubmittedDialogStore
                  ? dialogStore
                  : isRecording ? (tmpText + text + transcript) : tmpText
              }
              onChange={(event) => {
                setTmpText(event.value ?? '');
              }}
            />

            <button
              className="btn"
              disabled={isRecording || isSubmittedDialogStore || !tmpText}
              onClick={() => {
                updateDialogStore(tmpText);
                updateIsSubmittedDialogStore(true);
              }}
            >
              患者に送信
            </button>
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
      </div>
    </main>
  </>);
}
