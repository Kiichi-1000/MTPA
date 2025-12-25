import { MaskTypeDefinition, MaskTypeCode } from "../types/diagnosis";
import sfcpImage from "../assets/sfcp.png";
import sfcqImage from "../assets/sf.cqpng.png";
import sfgpImage from "../assets/sfgp.png";
import sfgqImage from "../assets/sfgq.png";
import sfceImage from "../assets/sfce.png";
import sfchImage from "../assets/sfch.png";
import sfdeImage from "../assets/sfde.png";
import sfdhImage from "../assets/sfdh.png";
import sbcpImage from "../assets/sbcp.png";
import sbcqImage from "../assets/sbcq.png";
import sbgpImage from "../assets/sbgp.png";
import sbgqImage from "../assets/sbgq.png";
import mfcpImage from "../assets/mfcp.png";
import mfcqImage from "../assets/mfcq copy.png";
import mfgpImage from "../assets/mfgp copy.png";
import mfgqImage from "../assets/mfgq copy.png";
import mbcpImage from "../assets/mbcp.png";
import mbcqImage from "../assets/mbcq.png";
import mbgpImage from "../assets/mbgp.png";
import mbgqImage from "../assets/mbgq.png";

export const MASK_TYPES: Record<MaskTypeCode, MaskTypeDefinition> = {
  SFCP: {
    code: "SFCP",
    name: "明るいリーダー仮面",
    shortLabel: "温かく、前に立ち、やり切る。みんなの太陽。",
    description: "明るさで場を立ち上げ、前に立って引っ張り、近い距離で巻き込み、粘り強くやり切る人。周囲に「頼れる」「前向き」「一緒にいると安心」と思われやすいタイプです。",
    image: sfcpImage,
    axesSummary: {
      tension: "Sunny",
      position: "Front",
      distance: "Close",
      work: "Persistent"
    },
    article: {
      opening: "SFCPの人は、場に入った瞬間から「安心」を運びます。明るい声、柔らかい表情、「大丈夫？」と最初に声をかける人。誰も仕切らないなら、自然に「じゃあ、こうしよ」を置く。困ってる人がいたら、自分から近づく。そして、最後までやり切る。\n\nSFCPの「仮面」は、やさしさよりも「頼もしさ」。明るさよりも「前進力」。チームに一人いると、なぜか回り始める。そういうタイプです。",
      strengths: {
        title: "温かさと実行力を、同時に出せる",
        items: [
          "【場を立ち上げる力】固い空気も、バラバラの集団も、最初の一言で「動ける状態」にできる",
          "【巻き込みが自然】指示じゃなく「一緒にやろ」。距離が近いから、頼まれた側も安心して動ける",
          "【粘り強さが見える】途中で投げ出さない。準備も、フォローも、ちゃんとやる。だから信頼される",
          "【困ってる人に気づく】誰が遅れてるか、誰が置いていかれてるか。見えてるから、声をかけられる"
        ]
      },
      weaknesses: {
        title: "抱え込みすぎて、自分が一番しんどくなる",
        items: [
          "【全部背負う】前に立つ、近づく、やり切る。全部が揃うと、気づいたら一人で回してる",
          "【明るさの役割固定】しんどい日も「空気を悪くしたくない」で明るく振る舞う。周りは気づかない",
          "【努力の基準が高すぎる】自分が頑張るほど、それが「普通」になって、周りが息苦しくなることもある",
          "【「お願い」が言いにくい】人を頼るより、自分でやる方が早い。結果、仕事が増える"
        ]
      },
      workplaceHabits: {
        colleague: {
          description: "SFCPが「同僚」だと",
          examples: [
            "新しいプロジェクトの立ち上げで、最初に「じゃあ役割決めよ」を置く人",
            "ランチに一人でいる新人がいたら、「一緒に行こ」と声をかける",
            "締切前に「大丈夫、なんとかなる」と言いながら、裏で段取りを整えてる",
            "あるある：「気づいたらリーダーやってる」「頼られすぎて休めない」"
          ]
        },
        subordinate: {
          description: "SFCPが「部下・後輩」だと",
          examples: [
            "上司の指示を待つより、「こうしましょうか？」を先に提案するタイプ",
            "チームの空気が悪いとき、雑談や軽い声かけで場を戻そうとする",
            "ただ、抱え込みすぎて報告が遅れると「勝手にやった」に見えるので、早めの相談が鍵",
            "あるある：「仕事を振られすぎる」「断れなくて増える」"
          ]
        },
        leader: {
          description: "SFCPが「リーダー・先輩側」だと",
          examples: [
            "温かさで場を作り、方向性を置き、メンバーを巻き込んで進める",
            "遅れてる人、困ってる人に自分から声をかけてフォローする",
            "ただ、自分も実務を背負うと、気づいたら一番忙しくなってる",
            "あるある：「みんなのケアもして、自分の仕事も全部やってる」「休む時間がない」"
          ]
        }
      },
      careerPaths: {
        strengths: [
          "【立ち上げ役】新しいチーム、新プロジェクト：バラバラを束ねて、動ける状態にする",
          "【リーダー・まとめ役】前に立って引っ張りつつ、メンバーをケアする",
          "【調整・フォロー役】人と人をつなぎ、困ってる人を支える",
          "【長期プロジェクト】粘り強く、最後までやり切る力が光る"
        ],
        challenges: "逆にしんどくなりやすいのは、「全員が自走してて、リーダー不要」「淡々と個人作業が続く」「ケアや温かさが評価されない」環境。SFCPの「巻き込む力」が、活かせないから。"
      },
      conclusion: "SFCPは、「温かさ」を武器にしながら、「実行力」まで持ってる仮面です。場を作り、人を巻き込み、最後までやり切る。だから、頼られる。\n\nもしSFCPがさらに強くなるなら、鍵はひとつ。\n\n「全部やる」前に、「ここは誰かに任せる」を置くこと。\n「自分でやる方が早い」を一度止めて、「この人に頼む方が、チーム全体が育つ」を選ぶ。その一手があるだけで、SFCPは「抱え込むリーダー」から「育てるリーダー」へ変わります。"
    },
    details: {
      characteristics: [
        "場に入った瞬間の表情・声・リアクションが明るく、「まず空気を温める」ムーブが無意識に出る",
        "誰も進行しないと、気づいたら仕切っている。役割が曖昧な場ほど「方向を置く」のが早い",
        "初対面でも距離を縮めるのが早く、「みんなを置いていかない」雰囲気を作るのが得意",
        "途中経過や準備量が多く、周りから「頑張ってる」が見えやすい。締切前に詰めるより、早めに動いて安心を作る"
      ],
      behaviors: [
        "【グループ活動の初動】「じゃあまず役割決めよ！」で場を動かす。雰囲気が硬いと「簡単に自己紹介しよっか」みたいに緩衝材になる。結果、最初に話したSFCPが「中心」として認識されやすい",
        "【進行中の動き】遅れてる人や話に入れてない人に声をかける。進捗が怪しいと、自分が手を動かして穴埋めする。表に立ちながら裏方もやり始めて仕事が増える",
        "【トラブル時】まず「大丈夫、なんとかなる」を置いて安心させる → 次に「じゃあ何が必要？」とやることを切り出す → 最後に「ここは自分やるよ」で実務まで背負う"
      ],
      risks: [
        "【抱え込み】「前に立つ」＋「近い」＋「やり切る」が揃うと、人の面倒＋進行＋実務が全部自分に寄りがち",
        "【明るい人の役割固定】しんどい時でも空気を悪くしたくなくて、明るく振る舞い続ける。結果、周りは「余裕あるんだ」と見て気づきにくい",
        "【頑張りの見せ方が過多】努力量が多いほど「基準」になって、周りが息苦しくなることもある"
      ],
      compatibility: {
        good: [
          "SBCQ / MBCQ（支えつつ効率化）：SFCPが作った熱量を裏で整理・段取りして回転率を上げてくれる。抱え込みも分散しやすい",
          "MFGQ / MBGQ（静かに決める／参謀）：SFCPが前面の温度を作り、相手が構造・リスク・判断を引き受けると強い対人補完になる"
        ],
        moderate: [
          "SFCQ（同じく前で回すが効率派）：速い推進力が出る一方で、SFCPが「過程も大事」、SFCQが「結果優先」になりやすい。役割を分けると最強",
          "MFCP（安心感リーダー）：温度は近いが表出のテンションが違う。SFCPが押しすぎるとMFCPが疲れるので、ペース配慮が鍵"
        ],
        challenging: [
          "SFGP / SFGQ / MFGQ（前×前）：「誰が方向を決めるか」がぶつかりやすい。決定領域の線引き、意思決定ルールを先に決める必要がある",
          "Gタイプ（距離を取りたい層）：SFCPの近さが「踏み込み」に見えることがある。「今ここ聞いても大丈夫？」という許可取りが重要"
        ]
      },
      tips: [
        "新しいチーム・新学期・新プロジェクトなど、立ち上げ期に強みが最大化する。まとまりがない集団を雰囲気と方向性で束ねるのが得意",
        "温かさを維持しつつ、有能さを押し付けにしない。「決めちゃっていい？」より「AとBならどっちがやりやすい？」が効きやすい",
        "「明るい役」を常時にしない。休憩時は低テンションでもOKな居場所を確保し、感情労働のコストを管理する"
      ]
    }
  },
  SFCQ: {
    code: "SFCQ",
    name: "フレンドリー実行者仮面",
    shortLabel: "うまく回して、ちゃんと進める。しかも感じがいい。",
    description: "人前では明るく社交的で、前に出ることを恐れません。親しみやすく人との距離が近く、効率的に物事を進めるタイプです。",
    image: sfcqImage,
    axesSummary: {
      tension: "Sunny",
      position: "Front",
      distance: "Close",
      work: "Quick"
    },
    article: {
      opening: "SFCQの人は、場に入った瞬間から「進行」が始まります。空気を温めるのが上手くて、話しかけやすくて、気づけば中心にいる。でも、ただ目立ちたいわけじゃない。早く、いい形にしたい。そのために、人を巻き込み、段取りを整え、結論へ運びます。\n\nSFCQの「仮面」は、陽気さよりも「軽快さ」。やる気よりも「推進力」。みんなが迷っている時間を、自然に短くしてくれるタイプです。",
      strengths: {
        title: "空気を明るくしながら、前に進める",
        items: [
          "【場の立ち上げが速い】はじめましての場でも、固い空気でも、「とりあえず喋れる状態」に持っていくのが上手い",
          "【巻き込みが軽い】指示ではなく「一緒にやろ」で人を動かす。頼まれた側が重く感じにくい",
          "【段取りで勝つ】「何からやる？」「どこで決める？」を先に置いて、ムダな往復を減らす",
          "【結論へ運ぶ力】話が散ったときほど、「論点の整理→選択肢→決め」が自然に出る"
        ]
      },
      weaknesses: {
        title: "速さが「雑」に見えたり、納得を置き去りにしがち",
        items: [
          "【結論を急ぎすぎる】自分の中では「早く決めて、あとで整える」でも、周りには「急に決まった」に見えることがある",
          "【努力が見えにくい】うまく省略して進めるほど、「さらっとやってる」「本気出してない？」と言われやすい",
          "【巻き込みが「操作」に誤解される瞬間】軽いノリで人を動かせるからこそ、相手が不安だと「乗せられた」と感じることがある",
          "【「回す人」固定】便利すぎて、永遠に進行役が回ってくる"
        ]
      },
      workplaceHabits: {
        colleague: {
          description: "SFCQが「同僚」だと",
          examples: [
            "「明るい進行役」として、会議や作業をテンポ良く回す",
            "相談されたら、共感より先に「じゃあこうしよ」を出せる",
            "人間関係の空気が悪いときほど、雑談や軽さで場を戻そうとする",
            "あるある：「気づいたら司会してる」「締切が近いと勝手に段取り表作ってる」"
          ]
        },
        subordinate: {
          description: "SFCQが「部下・後輩」だと",
          examples: [
            "指示待ちより、「こうした方が早いです」を提案しがち",
            "上司の意図を「最短で形にする」方向へ寄せる",
            "ただ、理由を言わずに進めると「勝手にやった」に見えるので、報告は短くても「先出し」すると強い",
            "あるある：「許可取りが後になる」「進めてから報告して驚かれる」"
          ]
        },
        leader: {
          description: "SFCQが「リーダー・先輩側」だと",
          examples: [
            "号令型というより、ノリと提案で人を動かすタイプ",
            "役割分担が速い（得意そうな人に軽く振る）",
            "結果を出すのが早い分、丁寧派からは「詰めが甘い」と言われやすいので、品質基準を一言で共有すると最強",
            "あるある：「みんなが楽になる仕組みは作るけど、気づくと自分が一番忙しい」"
          ]
        }
      },
      careerPaths: {
        strengths: [
          "【進行役】MC / ファシリテーター：場を回し、結論へ運ぶ",
          "【推進役】プロジェクトの前輪：止まってるところを動かす",
          "【調整役】巻き込みと分担：人を集めて回る形にする",
          "【改善役】最短化：ムダを減らす、手順を整理する"
        ],
        challenges: "逆にしんどくなりやすいのは、「ゆっくり合意形成が必要」「過程の丁寧さが最重要」「形式が重い」タイプの環境。SFCQの「速さ」が、価値になりにくいから。"
      },
      conclusion: "SFCQは、「明るさ」を武器にしながら、「前進」を仕事にできる仮面です。人を動かすのが上手くて、空気も壊さず、しかも現実的に進める。\n\nもしSFCQがさらに強くなるなら、鍵はひとつ。\n\n「速く決める」前に、短い一言で納得を置くこと。\n「こういう理由で、これが一番早い」──この一文があるだけで、SFCQは「雑に速い人」から「スマートに進める人」へ変わります。"
    },
    details: {
      characteristics: [
        "温かさ（親しみやすさ）×有能さ（できる/進める）の両方を狙いに行きやすい構造。「感じが良いのに仕事が速い」印象を作りやすい",
        "印象管理として好かれにいく戦略と有能さの示し方を自然に混ぜるタイプ",
        "外向性（前に出る/エネルギー/主導性）と推進・最適化志向が見えやすく、プロアクティブに環境に働きかける"
      ],
      behaviors: [
        "【立ち上がりが速い】初回の集まりで「今日ここまでやろう」をサクッと置き、話し合いが伸びると自然に論点整理→選択肢→決定へ寄せる。温度を上げつつ締切・段取りも同時に回す",
        "【巻き込み方が軽い】「これ、○○得意だよね？一緒にやろ」みたいに指名が柔らかく、個別に声をかけて参加者を増やす",
        "【成果の見せ方がスマート】途中経過は細かく見せず節目でまとめて出す。努力の量より「やり方がうまい」「回しがうまい」を印象として残し、無駄を削る提案が出やすい"
      ],
      risks: [
        "【速さが雑に見える】最適化・省略が得意なぶん、周囲が「丁寧さ」や「過程の納得」を求める場面では説明不足に見えることがある。特に努力重視の文化では損をしやすい",
        "【政治力っぽい誤解】人を回す力が強いぶん、相手によっては「うまく使われてる？」と感じることがある。信頼の透明性（理由の説明・配分の公平感）が重要",
        "【感情労働のコスト】明るく前に出るタイプは調子が悪い日も明るい顔を維持しがちで、感情労働として蓄積し燃え尽きに繋がりやすい",
        "【勝ち筋志向の副作用】成果志向が強すぎると情報共有が渋くなったり、競争モードが強い環境で協力を削ることがある"
      ],
      compatibility: {
        good: [
          "MBGQ / MFGQ（静かに構造化・決断できる参謀）：SFCQが前で回し、相手が裏で構造・判断・リスク管理を支えると強い前進×設計の関係になる",
          "SBCP / MBCP（ケア・フォローが厚い支援タイプ）：SFCQの速さで取りこぼす感情や不安を相手が拾ってくれ、チームの摩擦が減る"
        ],
        moderate: [
          "SFCP（明るい努力型リーダー）：両者とも前に出る。SFCPは過程・努力重視、SFCQは省略・最短重視。役割分担（SFCP＝士気と関係性、SFCQ＝進行と最適化）が決まると最強",
          "MFCP（落ち着いた安心系リーダー）：MFCPのペースをSFCQが急かしすぎるとしんどくなる。MFCPが納得の言語化を担うと、SFCQの推進が通りやすい"
        ],
        challenging: [
          "SFGP / SFGQ / MFGQ（決定権が強いF×G勢）：「誰が最終決定するか」「どこまで詰めるか」でぶつかりやすい。意思決定ルール（最終決定者、締切、判断基準）を先に合意する必要がある",
          "P強めタイプ（＊＊＊P）：P側が「手をかけたい」、SFCQが「削りたい」になりやすい。品質基準を数値化・チェックリスト化して削る範囲を明確にする"
        ]
      },
      tips: [
        "効率化するときほど理由を短く添える。公平感・透明性を確保することで、政治的に見られるリスクを減らせる",
        "努力が見えない問題には、節目だけ可視化する。途中全部は見せないが要所で見せることで、丁寧さの印象も残せる",
        "明るさの維持を義務化しない。感情労働のコストを管理し、低テンションでもOKな時間を確保する"
      ]
    }
  },
  SFGP: {
    code: "SFGP",
    name: "プロフェッショナル仮面",
    shortLabel: "礼儀正しく真面目な表現者",
    description: "人前では明るく前向きですが、適度な距離感を保ちます。前に出て発言しながらも、丁寧に仕事を進めるタイプです。",
    image: sfgpImage,
    axesSummary: {
      tension: "Sunny",
      position: "Front",
      distance: "Guard",
      work: "Persistent"
    }
  },
  SFGQ: {
    code: "SFGQ",
    name: "スマート実践者仮面",
    shortLabel: "洗練された効率派",
    description: "人前では明るく、前に出て行動します。適度な距離感を保ちながら、効率的に成果を出すことを重視するタイプです。",
    image: sfgqImage,
    axesSummary: {
      tension: "Sunny",
      position: "Front",
      distance: "Guard",
      work: "Quick"
    }
  },
  SBCP: {
    code: "SBCP",
    name: "温かいサポーター仮面",
    shortLabel: "裏方から支える太陽",
    description: "人前では明るく振る舞いますが、裏方での支援を好みます。親しみやすく、真面目にコツコツと作業を進めるタイプです。",
    image: sbcpImage,
    axesSummary: {
      tension: "Sunny",
      position: "Back",
      distance: "Close",
      work: "Persistent"
    }
  },
  SBCQ: {
    code: "SBCQ",
    name: "気さくな調整役仮面",
    shortLabel: "柔軟なムードメーカー",
    description: "人前では明るく、親しみやすい雰囲気を出しながら、裏方で効率的にサポートするタイプです。",
    image: sbcqImage,
    axesSummary: {
      tension: "Sunny",
      position: "Back",
      distance: "Close",
      work: "Quick"
    }
  },
  SBGP: {
    code: "SBGP",
    name: "誠実な職人仮面",
    shortLabel: "静かに品質を追求する",
    description: "人前では明るいですが、裏方での作業を好み、適度な距離感を保ちながら丁寧に仕事を進めるタイプです。",
    image: sbgpImage,
    axesSummary: {
      tension: "Sunny",
      position: "Back",
      distance: "Guard",
      work: "Persistent"
    }
  },
  SBGQ: {
    code: "SBGQ",
    name: "スマートサポーター仮面",
    shortLabel: "効率的な裏方の太陽",
    description: "人前では明るく振る舞いますが、裏方で効率的に物事を進めることを好むタイプです。",
    image: sbgqImage,
    axesSummary: {
      tension: "Sunny",
      position: "Back",
      distance: "Guard",
      work: "Quick"
    }
  },
  MFCP: {
    code: "MFCP",
    name: "穏やかな指導者仮面",
    shortLabel: "落ち着いた信頼の象徴",
    description: "人前では落ち着いていますが、リーダーシップを発揮します。親しみやすく、真面目に物事に取り組むタイプです。",
    image: mfcpImage,
    axesSummary: {
      tension: "Moon",
      position: "Front",
      distance: "Close",
      work: "Persistent"
    }
  },
  MFCQ: {
    code: "MFCQ",
    name: "冷静な実行者仮面",
    shortLabel: "効率的な前線指揮官",
    description: "人前では落ち着いて前に出て行動します。親しみやすく、効率的に成果を出すことを重視するタイプです。",
    image: mfcqImage,
    axesSummary: {
      tension: "Moon",
      position: "Front",
      distance: "Close",
      work: "Quick"
    }
  },
  MFGP: {
    code: "MFGP",
    name: "知的リーダー仮面",
    shortLabel: "冷静で真摯な責任者",
    description: "人前では落ち着いて前に出ますが、適度な距離感を保ちながら丁寧に仕事を進めるタイプです。",
    image: mfgpImage,
    axesSummary: {
      tension: "Moon",
      position: "Front",
      distance: "Guard",
      work: "Persistent"
    }
  },
  MFGQ: {
    code: "MFGQ",
    name: "戦略的実践者仮面",
    shortLabel: "論理的な成果主義者",
    description: "人前では落ち着いて前に出て、適度な距離感を保ちながら効率的に物事を進めるタイプです。",
    image: mfgqImage,
    axesSummary: {
      tension: "Moon",
      position: "Front",
      distance: "Guard",
      work: "Quick"
    }
  },
  MBCP: {
    code: "MBCP",
    name: "優しい支援者仮面",
    shortLabel: "静かに寄り添う月",
    description: "人前では落ち着いて裏方を好みます。親しみやすく、真面目にコツコツと作業を進めるタイプです。",
    image: mbcpImage,
    axesSummary: {
      tension: "Moon",
      position: "Back",
      distance: "Close",
      work: "Persistent"
    }
  },
  MBCQ: {
    code: "MBCQ",
    name: "柔軟な協力者仮面",
    shortLabel: "臨機応変な調整役",
    description: "人前では落ち着いて裏方で支援します。親しみやすく、効率的に物事を進めるタイプです。",
    image: mbcqImage,
    axesSummary: {
      tension: "Moon",
      position: "Back",
      distance: "Close",
      work: "Quick"
    }
  },
  MBGP: {
    code: "MBGP",
    name: "職人気質仮面",
    shortLabel: "静かに完璧を目指す",
    description: "人前では落ち着いて裏方を好み、適度な距離感を保ちながら丁寧に仕事を進めるタイプです。",
    image: mbgpImage,
    axesSummary: {
      tension: "Moon",
      position: "Back",
      distance: "Guard",
      work: "Persistent"
    }
  },
  MBGQ: {
    code: "MBGQ",
    name: "効率的専門家仮面",
    shortLabel: "静かに成果を出す",
    description: "人前では落ち着いて裏方を好み、適度な距離感を保ちながら効率的に物事を進めるタイプです。",
    image: mbgqImage,
    axesSummary: {
      tension: "Moon",
      position: "Back",
      distance: "Guard",
      work: "Quick"
    }
  }
};
