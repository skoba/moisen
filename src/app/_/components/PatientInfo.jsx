import H2Block from "./H2Block";

export default function PatientInfo() {
  return (
    <>
      <H2Block heading={'患者情報'}>
        <p className="text-md">小林慎治、54歳、男性</p>
      </H2Block>

      <H2Block heading={'現病歴'}>
        <p>・以前に、痔、胃潰瘍で病院にかかっていた。</p>
        <p>・１ヶ月前から便秘気味で、残便感もある。</p>
        <p>・時々腹痛も感じていて、体重が減ってきたような気がしている。</p>
        <p>・1週間前から便に血が混ざっており、心配になり病院に来た。</p>
      </H2Block>

      <H2Block heading={'検査結果'}>
        <p>検尿：タンパク陰性、糖陰性</p>
        <p>便：潜血陽性</p>
        <p>血算：白血球数5200/μl, 赤血球数 380万/μl, Hb 10.8g/dl, ヘマトクリット 32%, 血小板数 38万/μl</p>
      </H2Block>
    </>
  );
}