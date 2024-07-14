'use client';

import Image from "next/image";

import { useState } from "react";

const data = require('./data.js');

export default function Encounter() {
  const [flag, setFlag] = useState(false);

  const [symps, setSymps] = useState(new Set());
  const [diags, setDiags] = useState(new Set());

  return (
    <main className="flex min-h-screen flex-col gap-4 p-24">
      {/* {JSON.stringify(data.data.diag2exam)}<br/> */}
      {JSON.stringify(data.data.diag2exam['大腸がん'])}<br/>
      <h1>診察</h1>
      <div>患者情報</div>
      氏名：小林慎治、54歳、男性
      <div>受診理由（主訴・症状）</div>
        {
        Object.keys(data.data.symp2diag)
        // [
        //   {
        //     label: '発熱',
        //     value: 'fever',
        //   },
        //   {
        //     label: '血便',
        //     value: "melena"
        //   },
        //   {
        //     label: '便秘',
        //     value: "constipation"
        //   },
        //   {
        //     label: '下痢',
        //     value: "diarrhea"
        //   },
        // ]
        .map((symp) => <>
          <div>
            <label>
              <input
                type="checkbox" id="symptom" name="interest" value={symp}
                // checked={flag}
                onChange={(event) => {
                  // setFlag((v) => !v)
                  // console.log(event.target);
                  // const target = event.target;
                  // const label = target.parent?.textContent;
                  // console.log(label);
                  setSymps((symps) => {
                    // symps.add(because.label);
                    // setDiags(new Set([...symps]))
                    return new Set(symps.add(symp));
                  });
                }}
              />
              {/* {because.label} */}
              {symp}
            </label>
          </div>
        </>)}
      <div>現病歴</div>

      {JSON.stringify([...symps])}<br/>
      <div>検査結果</div>
      {symps.size != 0 &&

      <div>考えられる疾患
        {(() => {
          const diags = [...symps].map((symp) => {
            return data.data.symp2diag[symp];
          }).flat();

          return [...(new Set(diags))].map((diag) => <>
            <div>{diag}</div>
          </>);
        })()}
        {/* {data.data.symp2diag[symp].map((exam) => <>
          <div>{exam}</div>
        </>)} */}

        <label>
          
        </label>
      </div>
      }
      <div>追加検査
        大腸内視鏡検査
       大腸造影検査
       腹部単純CT
       腹部造影CT
      </div>
    </main>
  );
}