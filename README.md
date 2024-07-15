This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## このソフトウェアについて

　このソフトウェアは「[第3回メディカルハッカソン](https://moicen-forest.connpass.com/event/317683/)」で作られたものです。病院を受診したときに、いろいろな検査を受けることになりますが、どのような意図があってその検査を受けることになったのかよくわからないことがあります。

居酒屋のお通しのような感じで「とりあえず」と受けた検査の内容がどのように診断につながっているのだろうかと考えたことはありませんか？追加の検査が必要なときにその料金が明示されていたらいいなと思ったことはありませんか？

どのような疾患を疑ってこの検査を医師が患者に提案し、患者側もそれを理解して検査を受けるという流れをITを使って可視化したいというのがこのソフトウェアでの提案内容です。


### 想定シナリオ

　本ソフトウェアは以下のようなシナリオを想定している。

1. 消化器内科の外来を受診した場合を想定する。
1. 患者が受付画面（スマホ or タブレット）症状を入力する。
    1. 症状は「発熱」、「腹痛」、「便秘」、「下痢」のリストから選択できる。
    1. 症状にはチェックボックスが付与されていて、クリックすることで症状を選択できる
1. 電子カルテの医師画面では、患者が選択した症状から考えられる疾患と、それに対応して診断に必要な検査をリストとして医師に提示する。
    1. 医師は患者に推奨する検査をリストの中から選び、チェックボックスをクリックする。
1. 患者は提案された検査から受けたい検査を選択する。
    1. 患者画面には考えられる疾患と推奨される検査のリストが表示され、検査の説明と、かかる費用も表示される。
    1. かかる費用は点数の3倍である。(1点10円を掛け、負担はその3割)
    1. 検査を選択すると同意したこととなり、カルテに記録される。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
