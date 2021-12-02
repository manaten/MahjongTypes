// 略記は https://tenhou.net/2/ に準ずる

type 数牌の数 = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type 数牌の色 = "s" | "p" | "m";
type 字牌の数 = "1" | "2" | "3" | "4" | "5" | "6" | "7";
type 字牌の色 = "z";

type 数牌 = `${数牌の数}${数牌の色}`;
type 中張牌= `${"2" | "3" | "4" | "5" | "6" | "7" | "8"}${数牌の色}`;
type 老頭牌 =`${"1" | "9"}${数牌の色}`;

type 東 = "1z";
type 南 = "2z";
type 西 = "3z";
type 北 = "4z";
type 白 = "5z";
type 發 = "6z";
type 中 = "7z";
type 字牌 = 東 | 南 | 西 | 北 | 白 | 發 | 中;

type 么九牌 = 老頭牌 | 字牌;
type 雀牌 = 数牌 | 字牌;

type ToArray<P extends string> =
  P extends "" ? [] :
    P extends `${infer A}${infer B}${infer Rest}` ?
    `${A}${B}` extends 雀牌 ?
      [`${A}${B}`, ...ToArray<Rest>]
    : never
  : never;

type Ex1 = ToArray<"2p3p4p2m3m4m2s3s4s4s5s6s8s8s">;

type Result = {
  雀頭: [雀牌, 雀牌],
  面子: [雀牌, 雀牌, 雀牌][],
  Rest: (雀牌 | "")[],
  役: string[],
}

type 雀頭判定<A extends 雀牌, B extends 雀牌, Rest extends 雀牌[]> =
  A extends B ?
    [{
      雀頭: [A, B],
      面子: [],
      Rest: Rest,
      役: [],
    }]
  : []

type 雀頭マッチング<A extends 雀牌, P0 extends 雀牌, P1 extends 雀牌, P2 extends 雀牌, P3 extends 雀牌, P4 extends 雀牌, P5 extends 雀牌, P6 extends 雀牌, P7 extends 雀牌, P8 extends 雀牌, P9 extends 雀牌, P10 extends 雀牌, P11 extends 雀牌, P12 extends 雀牌> = [
  ...雀頭判定<A, P0, [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P1, [P0, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P2, [P0, P1, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P3, [P0, P1, P2, P4, P5, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P4, [P0, P1, P2, P3, P5, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P5, [P0, P1, P2, P3, P4, P6, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P6, [P0, P1, P2, P3, P4, P5, P7, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P7, [P0, P1, P2, P3, P4, P5, P6, P8, P9, P10, P11, P12]>,
  ...雀頭判定<A, P8, [P0, P1, P2, P3, P4, P5, P6, P7, P9, P10, P11, P12]>,
  ...雀頭判定<A, P9, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P10, P11, P12]>,
  ...雀頭判定<A, P10, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P11, P12]>,
  ...雀頭判定<A, P11, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P12]>,
  ...雀頭判定<A, P12, [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11]>,
];

type 雀頭チェック<P extends 雀牌[]> = Uniq<[
  ...雀頭マッチング<P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[1], P[0], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[2], P[0], P[1], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[3], P[0], P[1], P[2], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[4], P[0], P[1], P[2], P[3], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[5], P[0], P[1], P[2], P[3], P[4], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[6], P[0], P[1], P[2], P[3], P[4], P[5], P[7], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[7], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[8], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[8], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[9], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[9], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[10], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[10], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[11], P[12], P[13]>,
  ...雀頭マッチング<P[11], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[12], P[13]>,
  ...雀頭マッチング<P[12], P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[13]>,
]>;

// 完全なUniqじゃないけど多少見やすくなるため妥協
type Uniq<A extends any[]> =
  A extends [ infer H, infer I, ...infer T ] ?
    H extends I ? [H, ...Uniq<T>] : [H, I, ...Uniq<T>]
  : A

type Ex2 = 雀頭チェック<ToArray<"2p3p4p2m3m4m2s3s4s4s5s6s8s8s">>

type 数<P> = P extends `${infer N}${数牌の色}` ? `${N}` : never;
type 色<P> = P extends `${数牌の数}${infer C}` ? `${C}` : never;
type 隣の牌<P> =
  数<P> extends "1" ? `2${色<P>}` :
  数<P> extends "2" ? `3${色<P>}` :
  数<P> extends "3" ? `4${色<P>}` :
  数<P> extends "4" ? `5${色<P>}` :
  数<P> extends "5" ? `6${色<P>}` :
  数<P> extends "6" ? `7${色<P>}` :
  数<P> extends "7" ? `8${色<P>}` :
  数<P> extends "8" ? `9${色<P>}` :
  never;

type 面子判定<R extends Result, A0, A1, A2, Rest> =
  A2 extends undefined ? [] : (
    // 刻子チェック
    A0 extends A1 ?
      A1 extends A2 ?
          [{
            雀頭: R["雀頭"],
            面子: [...R["面子"], [A0, A1, A2]],
            Rest: Rest,
            役: [],
          }]
      : []
    // 順子チェック
    : 隣の牌<A0> extends A1  ?
      隣の牌<A1> extends A2 ?
          [{
            雀頭: R["雀頭"],
            面子: [...R["面子"], [A0, A1, A2]],
            Rest: Rest,
            役: [],
          }]
      : []
    : []
  )

type 面子マッチング2<R extends Result, A0, A1, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9> =
  A1 extends undefined ? [] : [
    ...面子判定<R, A0, A1, P0, [P1, P2, P3, P4, P5, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P1, [P0, P2, P3, P4, P5, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P2, [P0, P1, P3, P4, P5, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P3, [P0, P1, P2, P4, P5, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P4, [P0, P1, P2, P3, P5, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P5, [P0, P1, P2, P3, P4, P6, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P6, [P0, P1, P2, P3, P4, P5, P7, P8, P9]>,
    ...面子判定<R, A0, A1, P7, [P0, P1, P2, P3, P4, P5, P6, P8, P9]>,
    ...面子判定<R, A0, A1, P8, [P0, P1, P2, P3, P4, P5, P6, P7, P9]>,
    ...面子判定<R, A0, A1, P9, [P0, P1, P2, P3, P4, P5, P6, P7, P8]>,
  ];

type 面子マッチング1<R extends Result, A0, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10> =
  A0 extends undefined ? [] : [
    ...面子マッチング2<R, A0, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P1, P0, P2, P3, P4, P5, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P2, P0, P1, P3, P4, P5, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P3, P0, P1, P2, P4, P5, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P4, P0, P1, P2, P3, P5, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P5, P0, P1, P2, P3, P4, P6, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P6, P0, P1, P2, P3, P4, P5, P7, P8, P9, P10>,
    ...面子マッチング2<R, A0, P7, P0, P1, P2, P3, P4, P5, P6, P8, P9, P10>,
    ...面子マッチング2<R, A0, P8, P0, P1, P2, P3, P4, P5, P6, P7, P9, P10>,
    ...面子マッチング2<R, A0, P9, P0, P1, P2, P3, P4, P5, P6, P7, P8, P10>,
    ...面子マッチング2<R, A0, P10, P0, P1, P2, P3, P4, P5, P6, P7, P8, P9>,
  ];

type 面子チェック<RS extends Result[]> =
  RS extends [ infer R, ...infer T ] ?
    R extends Result ? T extends Result[] ?
      Uniq<[
        ...面子マッチング1<R, R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][1], R["Rest"][0], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][2], R["Rest"][0], R["Rest"][1], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][3], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][4], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][5], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][6], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][7], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][8], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][8], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][9], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][9], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][10], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][10], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][11]>,
        ...面子マッチング1<R, R["Rest"][11], R["Rest"][0], R["Rest"][1], R["Rest"][2], R["Rest"][3], R["Rest"][4], R["Rest"][5], R["Rest"][6], R["Rest"][7], R["Rest"][8], R["Rest"][9], R["Rest"][10]>,
        ...面子チェック<T>
      ]>
    : [] : []
  : [];

type Ex3 = 面子チェック<面子チェック<面子チェック<面子チェック<雀頭チェック<ToArray<"2p3p4p2m3m4m2s3s4s4s5s6s8s8s">>>>>>

type 断么九判定<R extends Result> =
  R extends {
    雀頭: [中張牌, 中張牌],
    面子: [[中張牌, 中張牌, 中張牌], [中張牌, 中張牌, 中張牌], [中張牌, 中張牌, 中張牌], [中張牌, 中張牌, 中張牌]],
  } ? ["断么九"] : []

type 平和判定<R extends Result> =
  R["面子"][0][0] extends infer A ?
    R["面子"][1][0] extends infer B ?
      R["面子"][2][0] extends infer C ?
        R["面子"][3][0] extends infer D ?
          R extends {
            雀頭: [雀牌, 雀牌],
            面子: [
              [A, 隣の牌<A>, 隣の牌<隣の牌<A>>],
              [B, 隣の牌<B>, 隣の牌<隣の牌<B>>],
              [C, 隣の牌<C>, 隣の牌<隣の牌<C>>],
              [D, 隣の牌<D>, 隣の牌<隣の牌<D>>],
            ],
          } ? ["平和"] : []
        : []
      : []
    : []
  : []

type 役チェック<RS extends Result[]> =
  RS extends [ infer R, ...infer T ] ?
    R extends Result ? T extends Result[] ?
      Uniq<[
        {
          雀頭: R["雀頭"],
          面子: R["面子"],
          Rest: [],
          役: [
            ...断么九判定<R>,
            ...平和判定<R>,
          ],
        },
        ...役チェック<T>
      ]>
    : [] : []
  : [];

type Ex4 = 役チェック<面子チェック<面子チェック<面子チェック<面子チェック<雀頭チェック<ToArray<"2p3p4p2m3m4m2s3s4s4s5s6s8s8s">>>>>>>
type Ex5 = 役チェック<面子チェック<面子チェック<面子チェック<面子チェック<雀頭チェック<ToArray<"1p2p3p2m3m4m2s3s4s4s5s6s8s8s">>>>>>>
type Ex6 = 役チェック<面子チェック<面子チェック<面子チェック<面子チェック<雀頭チェック<ToArray<"2p2p2m2m2m2s3s4s4s5s6s8s8s8s">>>>>>>
type Ex7 = 役チェック<面子チェック<面子チェック<面子チェック<面子チェック<雀頭チェック<ToArray<"2p2p2m2m2m2s3s4s4s5s6s7s8s8s">>>>>>>
