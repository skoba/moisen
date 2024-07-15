import H2Block from "./H2Block";

export default function PatientInfo() {
  return (
    <>
      <H2Block heading={'患者情報'}>
        <p className="text-md">小林慎治、54歳、男性</p>
      </H2Block>

      <H2Block heading={'現病歴'}>
        <div>特になし</div>
      </H2Block>

      <H2Block heading={'検査結果'}>
        <div>異常なし</div>
      </H2Block>
    </>
  );
}