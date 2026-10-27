/* Local-only language preference. Source phrases are catalog keys (gettext style). */
(() => {
  'use strict';
  const KEY = 'roky.daily-puzzle.language';
  const languages = ['ko', 'en', 'ja', 'zh-CN'];
  const catalog = [
    ['오늘의 퍼즐 · 하루 한 장, 작은 몰입', 'Daily Puzzle · A little focus, every day', '今日のパズル · 一日一枚、ひとときの集中', '每日谜题 · 每天一点专注'],
    ['매일 자정 새로 만나는 네모로직. 5×5부터 9×9까지, 로그인 없이 가볍게 즐기세요. 진행 상황은 내 브라우저에 자동 저장됩니다.', 'Fresh nonograms every midnight in Korea (UTC+9). Play 5×5 to 9×9 without signing in. Progress saves in your browser.', '韓国時間の午前0時に新しいノノグラムをお届け。5×5から9×9まで、ログイン不要。進行状況はブラウザに保存されます。', '每天韩国时间零点更新数织。无需登录，轻松挑战5×5至9×9谜题。进度自动保存在浏览器中。'],
    ['오늘의 퍼즐 · Roky Studio', 'Daily Puzzle · Roky Studio', '今日のパズル · Roky Studio', '每日谜题 · Roky Studio'],
    ['작은 칸에 채우는, 오늘의 여유. 매일 새로운 세 가지 네모로직.', 'A little space to unwind. Three new nonograms every day.', '小さなマスに、今日のゆとりを。毎日3つの新しいノノグラム。', '在小小方格中放松片刻。每天三道全新数织。'],
    ['퍼즐로 바로 가기', 'Skip to puzzle', 'パズルへ移動', '跳转到谜题'],
    ['Roky Studio로 돌아가기', 'Back to Roky Studio', 'Roky Studioへ戻る', '返回Roky Studio'],
    ['도움말과 의견', 'Help and feedback', 'ヘルプとご意見', '帮助与反馈'],
    ['플레이 방법', 'How to play', '遊び方', '玩法说明'],
    ['개선 의견 보내기 새 탭에서 열기', 'Send feedback (opens a new tab)', 'ご意見を送る（新しいタブ）', '发送反馈（在新标签页打开）'],
    ['의견 보내기 ↗', 'Feedback ↗', 'ご意見 ↗', '反馈 ↗'],
    ['언어 선택', 'Choose language', '言語を選択', '选择语言'],
    ['오늘의', 'Daily', '今日の', '每日'],
    ['퍼즐', 'Puzzle', 'パズル', '谜题'],
    ['오늘의 퍼즐', 'Daily Puzzle', '今日のパズル', '每日谜题'],
    ['작은 칸에 채우는, 오늘의 여유.', 'A little space to unwind.', '小さなマスに、今日のゆとりを。', '在小小方格中放松片刻。'],
    ['매일 새로운 네모로직을 만나보세요.', 'A fresh nonogram, every day.', '毎日、新しいノノグラムに出会おう。', '每天邂逅全新的数织。'],
    ['오늘의 날짜', "Today's date", '今日の日付', '今日日期'],
    ['매일 자정 새 퍼즐 · 한국 시간', 'New daily at 00:00 KST (UTC+9)', '毎日午前0時に更新 · 韓国時間', '每天韩国时间零点更新（UTC+9）'],
    ['오늘의 네모로직', "Today's nonogram", '今日のノノグラム', '今日数织'],
    ['하루 한 장의 몰입', 'One puzzle. A little focus.', '一日一枚、ひとときの集中', '每日一题，专注片刻'],
    ['퍼즐 난이도', 'Puzzle difficulty', 'パズルの難易度', '谜题难度'],
    ['가볍게', 'Light', '気軽に', '轻松'], ['작은 시작', 'A small start', '小さな一歩', '小小起步'],
    ['차분하게', 'Steady', 'じっくり', '静心'], ['조금 더 집중', 'A little more focus', 'もう少し集中', '多一点专注'],
    ['깊이 있게', 'Deep', '深く集中', '深入'], ['나만의 도전', 'Your own challenge', '自分への挑戦', '自我挑战'],
    ['오늘도 한 장 완성', "Today's puzzle, complete", '今日も一枚、完成', '今日谜题已完成'],
    ['플레이 시간', 'Play time', 'プレイ時間', '游戏时间'],
    ['퍼즐 일시정지', 'Pause puzzle', 'パズルを一時停止', '暂停谜题'],
    ['네모로직 보드. 방향키로 이동, 스페이스로 채우기, X로 빈칸 표시, Delete로 지우기.', 'Nonogram board. Arrow keys to move, Space to fill, X to mark empty, Delete to erase.', 'ノノグラム盤面。矢印キーで移動、Spaceで塗る、Xで空白、Deleteで消去。', '数织棋盘。方向键移动，空格键填色，X标记空格，Delete擦除。'],
    ['WebGL 2.0을 지원하는 브라우저가 필요합니다.', 'A browser with WebGL 2.0 support is required.', 'WebGL 2.0対応ブラウザが必要です。', '需要支持WebGL 2.0的浏览器。'],
    ['오늘의 작은 몰입을 준비하고 있어요', 'Preparing your daily moment of focus', '今日の集中時間を準備しています', '正在准备今天的专注时光'],
    ['Godot 퍼즐 불러오는 중…', 'Loading Godot puzzle…', 'Godotパズルを読み込み中…', '正在加载Godot谜题…'],
    ['게임 다운로드 진행률', 'Game download progress', 'ゲームのダウンロード状況', '游戏下载进度'],
    ['다시 불러오기', 'Reload', '再読み込み', '重新加载'],
    ['잠깐, 쉬어 가도 좋아요', 'Take a little break', '少し休んでも大丈夫', '休息一下也没关系'],
    ['퍼즐도 시간도 기다리고 있어요.', 'Your puzzle and timer can wait.', 'パズルも時計も待っています。', '谜题和计时器都会等你。'],
    ['이어서 풀기 →', 'Continue →', '続きを解く →', '继续解题 →'],
    ['오늘의 한 장, 완성했어요!', "Today's puzzle, complete!", '今日の一枚、完成！', '今日谜题，完成！'],
    ['결과 복사', 'Copy result', '結果をコピー', '复制结果'],
    ['칸 표시 도구', 'Cell tools', 'マスの操作', '方格工具'],
    ['채우기', 'Fill', '塗る', '填色'], ['빈칸', 'Empty', '空白', '空格'], ['지우기', 'Erase', '消す', '擦除'],
    ['마지막 동작 되돌리기', 'Undo last action', '直前の操作を戻す', '撤销上一步'],
    ['되돌리기', 'Undo', '戻す', '撤销'], ['힌트', 'Hint', 'ヒント', '提示'],
    ['현재 퍼즐 칸 모두 지우기', 'Clear current puzzle cells', '現在の盤面を消去', '清空当前谜题方格'],
    ['내 브라우저에 자동 저장', 'Saved in this browser', 'このブラウザに自動保存', '自动保存在此浏览器'],
    ['힌트 0회 사용', 'Hints used: 0', 'ヒント使用：0回', '已用提示：0次'],
    ['클릭·드래그로 채우기', 'Click or drag to fill', 'クリック・ドラッグで塗る', '点击或拖动填色'],
    ['우클릭으로 빈칸 표시', 'Right-click to mark empty', '右クリックで空白', '右键标记空格'],
    ['방향키 + Space / X', 'Arrows + Space / X', '矢印キー + Space / X', '方向键 + Space / X'],
    ['텍스트 보드로 플레이하기', 'Play with the text board', 'テキスト盤面で遊ぶ', '使用文字棋盘游玩'],
    ['텍스트 퍼즐 보드', 'Text puzzle board', 'テキスト盤面', '文字谜题棋盘'],
    ['나의 기록과 도움말', 'My records and guide', '記録とガイド', '我的记录与指南'],
    ['서두르지 않아도', 'Take your time.', '急がなくても', '慢慢来，'], ['괜찮아요', "You're doing fine", '大丈夫', '没关系'],
    ['정답은 숫자 속에 숨어 있어요.', 'The answer is hidden in the numbers.', '答えは数字の中に隠れています。', '答案就藏在数字之中。'],
    ['한 칸씩, 나만의 속도로 채워보세요.', 'One cell at a time, at your own pace.', '一マスずつ、自分のペースで。', '一格一格，按照自己的节奏填吧。'],
    ['차곡차곡, 나의 기록', 'Your growing collection', '積み重なる、私の記録', '日积月累的记录'],
    ['완성한 퍼즐', 'Puzzles solved', '完成したパズル', '已完成谜题'],
    ['연속 플레이', 'Daily streak', '連続達成', '连续完成'], ['일', ' days', '日', '天'],
    ['최근 7일', 'Last 7 days', '最近7日間', '最近7天'], ['한 장이라도 완성하면', 'Any puzzle solved', '一枚でも完成すると', '完成任意一题'],
    ['최근 7일 완료 기록', 'Completions over the last 7 days', '最近7日間の完成記録', '最近7天完成记录'],
    ['기록은 지금 사용하는 브라우저에만 저장돼요.', 'Records stay in this browser only.', '記録はこのブラウザにのみ保存されます。', '记录仅保存在当前浏览器中。'],
    ['완료 기록 · 백업 관리', 'Records & backups', '完成記録・バックアップ', '完成记录与备份'],
    ['숫자가 건네는 힌트', 'Let the numbers guide you', '数字がくれるヒント', '数字给出的线索'],
    ['힌트 2, 1: 연속 두 칸과 한 칸 사이에는 최소 한 빈칸', 'Clues 2, 1: a run of two, then a run of one, with at least one empty cell between.', 'ヒント2、1：2マスと1マスのかたまりの間には、最低1マスの空白。', '线索2、1：连续两格与一格之间至少留一个空格。'],
    ['숫자는 연속해서 채울 칸의 수예요.', 'Numbers give the length of each filled run.', '数字は連続して塗るマスの数です。', '数字表示连续填色的方格数。'],
    ['숫자와 숫자 사이에는', 'Between each run, leave', 'かたまりとかたまりの間は', '每组之间请留出'],
    ['빈칸을 하나 이상', 'at least one empty cell', '1マス以上の空白を', '至少一个空格'],
    ['남겨주세요.', '.', '空けてください。', '。'], ['조금 더 알아보기', 'Learn more', 'もっと詳しく', '了解更多'],
    ['매일 다른 퍼즐, 변하지 않는 작은 즐거움.', 'A different puzzle. The same small joy.', '毎日違うパズル、変わらない小さな喜び。', '每天不同的谜题，一样的小小乐趣。'],
    ['내일도 여기서 만나요.', 'See you here tomorrow.', '明日もここで会いましょう。', '明天在这里再见。'],
    ['다음 퍼즐까지 --:--:--', 'Next puzzle in --:--:--', '次のパズルまで --:--:--', '距下一题 --:--:--'],
    ['서비스 정보', 'Service information', 'サービス情報', '服务信息'],
    ['로키스튜디오 전자책 새 탭에서 열기', 'Roky Studio e-books (opens a new tab)', 'Roky Studioの電子書籍（新しいタブ）', 'Roky Studio电子书（在新标签页打开）'],
    ['전자책', 'E-books', '電子書籍', '电子书'],
    ['더 좋은 앱을 위한 후원 새 탭에서 열기', 'Support better apps (opens a new tab)', 'より良いアプリづくりを応援（新しいタブ）', '支持开发更好的应用（在新标签页打开）'],
    ['더 좋은 앱을 위한 후원', 'Support better apps', 'より良いアプリづくりを応援', '支持开发更好的应用'],
    ['v1.1.0 · 업데이트', 'v1.1.0 · Updates', 'v1.1.0 · 更新情報', 'v1.1.0 · 更新'],
    ['저장 안내', 'About saving', '保存について', '保存说明'],
    ['X 새 탭에서 열기', 'X (opens a new tab)', 'X（新しいタブ）', 'X（在新标签页打开）'],
    ['Threads 새 탭에서 열기', 'Threads (opens a new tab)', 'Threads（新しいタブ）', 'Threads（在新标签页打开）'],
    ['닫기', 'Close', '閉じる', '关闭'],
    ['네모로직, 이렇게 풀어요', 'How to solve a nonogram', 'ノノグラムの解き方', '如何解数织'],
    ['가로·세로 숫자를 보고 숨겨진 칸을 채우는 논리 퍼즐이에요. 모든 채울 칸을 맞히면 완성됩니다.', 'Use the row and column clues to reveal the hidden pattern. Find every filled cell to finish.', '縦横の数字から隠れたマスを見つける論理パズルです。塗るべきマスをすべて見つけると完成です。', '根据行列数字找出隐藏图案的逻辑谜题。找齐所有需要填色的方格即可完成。'],
    ['숫자 = 연속으로 채울 칸의 수.', 'Number = length of a filled run.', '数字＝連続して塗るマスの数。', '数字＝连续填色的方格数。'],
    ['2, 1이면 두 칸 묶음 뒤에 한 칸 묶음이 있어요.', '2, 1 means a run of two followed by a run of one.', '2、1なら、2マスのかたまりの後に1マスのかたまりがあります。', '2、1表示先连续填两格，再填一格。'],
    ['묶음 사이에는 빈칸이 하나 이상 있어야 해요. 숫자 순서도 같아야 합니다.', 'Leave at least one empty cell between runs. Keep the clue order.', 'かたまりの間には1マス以上の空白が必要です。数字の順序も守ってください。', '每组之间至少留一个空格，并保持数字的顺序。'],
    ['0은 그 줄에 채울 칸이 없다는 뜻이에요.', '0 means that the entire row or column is empty.', '0は、その行や列に塗るマスがないことを示します。', '0表示该行或该列没有需要填色的方格。'],
    ['빈칸 표시(×)는 메모예요. 정답의 채울 칸을 모두 찾으면 나머지 빈칸은 자동으로 표시돼요.', 'Empty marks (×) are notes. Once all filled cells are correct, the remaining empty cells are marked automatically.', '空白マーク（×）はメモです。塗るマスをすべて見つけると、残りの空白は自動で表示されます。', '空格标记（×）是辅助笔记。找齐所有正确填色方格后，其余空格会自动标记。'],
    ['편한 방법으로 플레이', 'Play your way', '好きな方法でプレイ', '选择适合你的操作方式'],
    ['마우스 클릭·드래그로 표시하고 우클릭으로 빈칸을 표시해요. 휴대폰에서는 아래 도구를 선택하고 칸을 눌러주세요. 같은 표시를 다시 누르면 지워집니다.', 'Click or drag to mark cells; right-click to mark empty. On a phone, choose a tool below the board and tap a cell. Repeat the same mark to erase it.', 'クリックやドラッグで塗り、右クリックで空白を付けます。スマートフォンでは下の道具を選んでマスをタップ。同じ印をもう一度付けると消せます。', '点击或拖动标记方格，右键标记空格。手机上先选择下方工具再点击方格。再次使用相同标记即可擦除。'],
    ['키보드: 보드에서 방향키로 이동, Space·Enter로 선택 도구 사용, X로 빈칸, Delete로 지우기, Ctrl/⌘ + Z로 되돌리기. 화면 읽기 프로그램은 보드 아래의 텍스트 보드를 이용해 주세요.', 'Keyboard: arrows to move, Space/Enter to use the selected tool, X to mark empty, Delete to erase, Ctrl/⌘ + Z to undo. For screen readers, use the text board below the puzzle.', 'キーボード：矢印キーで移動、Space・Enterで選択中の道具を使用、Xで空白、Deleteで消去、Ctrl/⌘ + Zで元に戻す。読み上げには盤面の下のテキスト盤面をご利用ください。', '键盘：方向键移动，Space/Enter使用当前工具，X标记空格，Delete擦除，Ctrl/⌘ + Z撤销。屏幕阅读器用户请使用谜题下方的文字棋盘。'],
    ['매일 세 가지 도전', 'Three daily challenges', '毎日3つのチャレンジ', '每天三项挑战'],
    ['한국 시간 자정에 새 퍼즐이 열려요. 난이도를 바꿔도 현재 진행은 남아 있어요. 모든 퍼즐은 숫자만으로 추측 없이 풀 수 있는지 검사합니다. 힌트는 한 칸을 알려주며 사용 횟수가 기록돼요. 완성 전에는 정답을 자동 검사하지 않아요.', 'New puzzles arrive at midnight in Korea (UTC+9). Switching difficulty keeps your progress. Every puzzle is checked to be solvable by logic alone. A hint reveals one cell and counts toward your hint total. Answers are not checked automatically until completion.', '韓国時間の午前0時に新しいパズルが開きます。難易度を変えても進行状況は残ります。すべてのパズルは推測せず数字だけで解けることを検証しています。ヒントは1マスを教え、使用回数を記録します。完成前の自動答え合わせはありません。', '每天韩国时间零点开启新谜题。切换难度会保留进度。每道谜题都经过验证，无需猜测即可凭逻辑解出。提示会揭示一格并记录使用次数。完成前不会自动检查答案。'],
    ['움직임 줄이기', 'Reduce motion', '動きを減らす', '减少动态效果'],
    ['기록은 내 기기에만', 'Your records stay on your device', '記録は自分の端末だけに', '记录仅保存在你的设备上'],
    ['로그인 없이 사용해요. 퍼즐 진행 상황, 완료 기록, 시간과 힌트 횟수를 현재 브라우저의 localStorage에 저장합니다. 기록을 서버나 Supabase로 전송하지 않습니다.', 'No sign-in is needed. Puzzle progress, completions, time and hint counts are stored in this browser’s localStorage. Records are not sent to a server or Supabase.', 'ログインは不要です。進行状況、完成記録、時間、ヒント使用回数は、このブラウザのlocalStorageに保存します。サーバーやSupabaseへ記録を送信しません。', '无需登录。谜题进度、完成记录、用时和提示次数保存在当前浏览器的localStorage中，不会发送至服务器或Supabase。'],
    ['다른 기기·브라우저와는 자동 동기화되지 않아요. 방문 기록이나 사이트 데이터를 지우거나 시크릿 모드를 닫으면 기록이 사라질 수 있습니다.', 'Records do not sync across devices or browsers. Clearing browsing/site data or closing a private session may erase them.', '別の端末やブラウザとの自動同期はありません。閲覧履歴やサイトデータの削除、プライベートモードの終了で記録が消える場合があります。', '记录不会在设备或浏览器之间自动同步。清除浏览记录、网站数据或关闭隐私窗口可能导致记录丢失。'],
    ['백업 관리에서 JSON 파일을 내려받아 보관해 주세요.', 'Download a JSON file from Records & backups and keep it safe.', 'バックアップ管理からJSONファイルをダウンロードして保管してください。', '请在备份管理中下载并保存JSON文件。'],
    ['자동 저장이 실패하면 보드 아래에 안내합니다. 이때는 탭을 닫기 전에 백업을 내려받아 주세요. 저장 기록이 손상되면 원본을 보존하고, 가능한 경우 이전 정상 기록을 불러옵니다.', 'If autosave fails, a notice appears below the board. Download a backup before closing the tab. If records are damaged, the original is preserved and a previous valid copy is restored when available.', '自動保存に失敗すると盤面の下に表示します。タブを閉じる前にバックアップをダウンロードしてください。記録が破損した場合は原本を保全し、可能なら以前の正常な記録を読み込みます。', '自动保存失败时会在棋盘下方提示。请在关闭标签页前下载备份。记录损坏时会保留原始数据，并在可用时恢复之前的有效记录。'],
    ['서비스 제공을 위해 GitHub Pages에서 게임 파일을 내려받아요. 개선 의견·소셜 링크는 외부 사이트의 새 탭으로 연결됩니다.', 'Game files are served by GitHub Pages. Feedback and social links open external sites in a new tab.', 'ゲームファイルはGitHub Pagesから読み込みます。ご意見やソーシャルリンクは外部サイトを新しいタブで開きます。', '游戏文件由GitHub Pages提供。反馈和社交链接会在新标签页中打开外部网站。'],
    ['완료 기록은 최대 1,095개 퍼즐을 보관해요. 이보다 오래된 기록은 정리됩니다. 기기 시계가 잘못되어 있으면 일일 퍼즐 날짜도 달라질 수 있어요.', 'Up to 1,095 puzzle records are kept; older ones are removed. An incorrect device clock may change the daily puzzle date.', '最大1,095件のパズル記録を保存し、それより古いものは整理します。端末の時計がずれていると、日替わりパズルの日付も変わる場合があります。', '最多保留1,095条谜题记录，更早的记录会被清理。设备时钟不准确可能影响每日谜题的日期。'],
    ['업데이트 내역', 'Updates', '更新情報', '更新记录'],
    ['네 가지 언어로 만나는 오늘의 퍼즐', 'Daily Puzzle in four languages', '4つの言語で楽しむ今日のパズル', '四种语言的每日谜题'],
    ['영어·일본어·중국어(간체)와 언어 선택을 추가했어요. 선택한 언어는 이 브라우저에 저장되며 퍼즐 진행과 백업은 그대로 이어집니다.', 'Added English, Japanese, Simplified Chinese and a language selector. Your choice stays in this browser. Puzzle progress and backups carry on unchanged.', '英語・日本語・中国語（簡体字）と言語選択を追加しました。選んだ言語はこのブラウザに保存され、パズルの進行状況やバックアップはそのまま使えます。', '新增英语、日语、简体中文和语言选择。语言偏好保存在当前浏览器，谜题进度和备份继续可用。'],
    ['하루 한 장, 첫 번째 페이지', 'The first page of a daily ritual', '一日一枚、最初のページ', '每日一题，第一页'],
    ['공통 메뉴의 전자책 버튼에서 로키스튜디오 전자책 안내를 새 탭으로 열 수 있습니다.', 'Open Roky Studio’s e-book guide in a new tab from the E-books link.', '共通メニューの電子書籍から、Roky Studioの案内を新しいタブで開けます。', '通过通用菜单的电子书按钮，可在新标签页打开Roky Studio电子书指南。'],
    ['더 좋은 앱을 위한 후원 버튼에서 Buy Me a Coffee 후원 페이지를 새 탭으로 열 수 있습니다.', 'Support better apps opens the Buy Me a Coffee page in a new tab.', '応援ボタンからBuy Me a Coffeeの支援ページを新しいタブで開けます。', '支持开发更好的应用按钮会在新标签页打开Buy Me a Coffee赞助页面。'],
    ['Godot 4.5.2로 그린 5×5·7×7·9×9 일일 네모로직', 'Daily 5×5, 7×7 and 9×9 nonograms drawn with Godot 4.5.2', 'Godot 4.5.2で描く5×5・7×7・9×9の日替わりノノグラム', '使用Godot 4.5.2绘制的5×5、7×7、9×9每日数织'],
    ['한국 시간 자정 갱신, 검증된 날짜별 랜덤 퍼즐', 'Verified daily random puzzles, refreshed at midnight KST', '韓国時間の午前0時更新、検証済みの日替わりランダムパズル', '韩国时间零点更新，经过验证的每日随机谜题'],
    ['진행 자동 저장, 이전 정상 기록 보존, JSON 백업·복원', 'Autosave, previous valid records, JSON backup and restore', '自動保存、以前の正常な記録の保全、JSONバックアップ・復元', '自动保存、保留有效旧记录、JSON备份与恢复'],
    ['빈칸 표시, 드래그, 되돌리기, 힌트, 완료 기록', 'Empty marks, dragging, undo, hints and completion records', '空白マーク、ドラッグ、元に戻す、ヒント、完成記録', '空格标记、拖动、撤销、提示和完成记录'],
    ['모바일·키보드·텍스트 보드, 움직임 줄이기', 'Mobile, keyboard, text board and reduced motion', 'モバイル・キーボード・テキスト盤面、動きを減らす設定', '手机、键盘、文字棋盘及减少动态效果'],
    ['현재 퍼즐을 비울까요?', 'Clear this puzzle?', '現在の盤面を消しますか？', '清空当前谜题？'],
    ['지금 선택한 난이도의 칸 표시를 모두 지워요. 플레이 시간과 힌트 횟수는 유지됩니다. 되돌리기로 복구할 수 있어요.', 'Clear all marks for the selected difficulty. Play time and hints used stay the same. You can undo this.', '選択中の難易度のマークをすべて消します。時間とヒント使用回数は残り、元に戻すこともできます。', '清空当前难度的所有标记，保留用时和提示次数。此操作可撤销。'],
    ['칸 모두 지우기', 'Clear all cells', 'すべてのマスを消す', '清空所有方格'], ['계속 풀기', 'Keep playing', 'プレイを続ける', '继续解题'],
    ['차곡차곡 쌓인 기록', 'Your puzzle records', '積み重なった記録', '积累的谜题记录'],
    ['백업 내려받기 · 복원', 'Download & restore backups', 'バックアップの保存・復元', '下载与恢复备份'],
    ['백업에는 모든 난이도의 진행·완료 기록이 포함돼요. 다른 기기로 옮길 때도 사용할 수 있어요. 복원하면 현재 기록을 교체하므로 먼저 백업해 주세요.', 'Backups include progress and completions for all difficulties and can be moved to another device. Restoring replaces your current records, so download a backup first.', '全難易度の進行状況と完成記録をバックアップします。別の端末への移行にも使えます。復元すると現在の記録を置き換えるため、先にバックアップしてください。', '备份包含所有难度的进度和完成记录，也可用于迁移至其他设备。恢复会替换当前记录，请先下载备份。'],
    ['기록 백업 ↓', 'Download backup ↓', '記録を保存 ↓', '下载备份 ↓'], ['백업 파일 선택 ↑', 'Choose backup ↑', 'バックアップを選択 ↑', '选择备份 ↑'],
    ['선택한 백업으로 교체', 'Replace with this backup', 'このバックアップに置き換え', '使用此备份替换'], ['취소', 'Cancel', 'キャンセル', '取消'],
    ['보존된 원본 확인', 'Preserved original records', '保全した原本を確認', '查看保留的原始数据'],
    ['손상된 원본을 내려받아 보관한 뒤, 현재 복구한 기록으로 저장을 다시 시작할 수 있어요.', 'Download and keep the damaged original, then resume saving with the recovered records.', '破損した原本をダウンロードして保管し、復旧した記録で保存を再開できます。', '下载并保存损坏的原始数据后，可以使用已恢复的记录重新开始保存。'],
    ['보존된 원본 ↓', 'Download original ↓', '保全した原本 ↓', '下载原始数据 ↓'], ['현재 기록으로 복구 확정', 'Confirm recovered records', '現在の記録で復旧を確定', '确认使用已恢复的记录'],
    ['아직 저장된 기록이 없어요.', 'No records saved yet.', 'まだ保存された記録はありません。', '尚无保存的记录。'],
    ['칸을 비웠어요. 되돌리기로 복구할 수 있어요.', 'Cells cleared. You can undo this.', '盤面を消しました。元に戻せます。', '方格已清空，可以撤销。'],
    ['게임을 불러오는 중입니다.', 'Loading the game.', 'ゲームを読み込んでいます。', '正在加载游戏。'],
    ['첫 한 장을 완성하고 기록을 남겨보세요.', 'Solve your first puzzle to start your collection.', '最初の一枚を完成させて記録を残しましょう。', '完成第一道谜题，留下你的记录吧。'],
    ['파일이 너무 큽니다. 최대 1.5MB까지 읽을 수 있어요.', 'File too large. The limit is 1.5 MB.', 'ファイルが大きすぎます。上限は1.5MBです。', '文件过大，最大支持1.5MB。'],
    ['지원하는 백업 파일이 아니거나 자료가 손상됐어요. 현재 기록은 유지됩니다.', 'Unsupported or damaged backup. Your current records are unchanged.', '非対応または破損したバックアップです。現在の記録は保持されます。', '备份不受支持或已损坏。当前记录保持不变。'],
    ['백업 기록을 복원했어요.', 'Backup restored.', 'バックアップを復元しました。', '备份已恢复。'],
    ['복원을 취소했어요. 현재 기록을 유지합니다.', 'Restore cancelled. Current records kept.', '復元をキャンセルしました。現在の記録は保持されます。', '已取消恢复，保留当前记录。'],
    ['복구를 확정하고 자동 저장을 다시 시작했어요.', 'Recovery confirmed. Autosave resumed.', '復旧を確定し、自動保存を再開しました。', '已确认恢复，自动保存已恢复。'],
    ['결과를 복사했어요.', 'Result copied.', '結果をコピーしました。', '结果已复制。'],
    ['복사하지 못했어요. 완료 기록에서 확인해 주세요.', 'Could not copy. Check your completion records.', 'コピーできませんでした。完成記録をご確認ください。', '无法复制，请查看完成记录。'],
    ['다른 탭에서 변경된 기록을 불러왔어요.', 'Loaded records updated in another tab.', '別のタブで更新された記録を読み込みました。', '已加载其他标签页更新的记录。'],
    ['WebGL 2.0 / WebAssembly를 지원하는 최신 브라우저에서 열어주세요.', 'Please use a recent browser with WebGL 2.0 and WebAssembly support.', 'WebGL 2.0とWebAssemblyに対応した最新のブラウザで開いてください。', '请使用支持WebGL 2.0和WebAssembly的新版浏览器。'],
    ['연결을 확인하고 다시 시도해 주세요.', 'Check your connection and try again.', '接続を確認して、もう一度お試しください。', '请检查网络连接后重试。'],
    ['기기에 자동 저장됨', 'Saved on this device', 'この端末に自動保存済み', '已自动保存在此设备'],
    ['이전 정상 기록을 복구했습니다. 원본을 보존 중입니다. 백업 관리에서 복구를 확정해 주세요.', 'Recovered a previous valid save. The original is preserved. Confirm recovery in Records & backups.', '以前の正常な記録を復旧しました。原本を保全中です。バックアップ管理で復旧を確定してください。', '已恢复之前的有效记录，并保留原始数据。请在备份管理中确认恢复。'],
    ['저장 기록을 읽지 못했습니다. 원본 보존 중 · 백업 관리에서 확인해 주세요.', 'Cannot read saved records. Original preserved. Check Records & backups.', '記録を読み込めません。原本を保全中です。バックアップ管理をご確認ください。', '无法读取保存记录，原始数据已保留。请查看备份管理。'],
    ['저장 공간에 접근할 수 없습니다. 기록은 현재 화면에만 유지돼요. 백업을 내려받아 주세요.', 'Storage unavailable. Records are only in this session. Download a backup.', '保存領域にアクセスできません。記録は現在の画面にのみ残ります。バックアップを保存してください。', '无法访问存储空间。记录仅保留在当前会话中，请下载备份。'],
    ['저장 자료 검증 실패 · 백업을 확인해 주세요.', 'Save validation failed. Check your backup.', '保存データの検証に失敗しました。バックアップをご確認ください。', '保存数据验证失败，请检查备份。'],
    ['자동 저장 실패 · 기록을 잃지 않도록 백업을 내려받아 주세요.', 'Autosave failed. Download a backup to keep your records.', '自動保存に失敗しました。記録を失わないようバックアップを保存してください。', '自动保存失败，请下载备份以保留记录。'],
    ['기기 저장 공간에 쓸 수 없어요. 기존 기록을 보존했습니다.', 'Cannot write to device storage. Existing records preserved.', '端末の保存領域に書き込めません。既存の記録を保全しました。', '无法写入设备存储空间，已有记录已保留。'],
    ['저장 형식을 확인할 수 없어 원본을 보존했습니다. 백업을 내려받아 주세요.', 'Unknown save format. Original preserved. Download a backup.', '保存形式を確認できないため原本を保全しました。バックアップを保存してください。', '无法识别保存格式，原始数据已保留。请下载备份。'],
    ['저장 자료가 너무 큽니다. 원본을 보존했습니다.', 'Save data too large. Original preserved.', '保存データが大きすぎます。原本を保全しました。', '保存数据过大，原始数据已保留。'],
    ['새로운 하루의 퍼즐이 도착했어요.', 'A new day’s puzzles are ready.', '新しい一日のパズルが届きました。', '新一天的谜题已准备好。'],
    ['오늘의 퍼즐 완성! 잘하셨어요.', 'Daily puzzle complete! Well done.', '今日のパズル完成！お疲れさまでした。', '每日谜题完成！做得好。'],
    ['난이도 {name} {n} 곱하기 {n}{done}', '{name}, {n} by {n}{done}', '{name}、{n}×{n}{done}', '{name}，{n}乘{n}{done}'],
    ['오늘 완료', 'completed today', '本日完成', '今日已完成'],
    ['플레이 시간 {minutes}분 {seconds}초', 'Play time: {minutes} minutes {seconds} seconds', 'プレイ時間：{minutes}分{seconds}秒', '游戏时间：{minutes}分{seconds}秒'],
    ['힌트 {n}회 사용', 'Hints used: {n}', 'ヒント使用：{n}回', '已用提示：{n}次'],
    ['힌트 남은 횟수 {remaining}/{limit}', 'Hints remaining: {remaining}/{limit}', '残りヒント：{remaining}/{limit}', '剩余提示：{remaining}/{limit}'],
    ['5×5는 3회, 7×7은 7회, 9×9는 9회까지 힌트를 쓸 수 있어요. 되돌리거나 칸을 비워도 사용 횟수는 유지됩니다.', 'Hints per puzzle: 3 for 5×5, 7 for 7×7 and 9 for 9×9. Undo and clearing cells do not restore used hints.', 'ヒントは5×5が3回、7×7が7回、9×9が9回まで。操作を戻したり盤面を消しても使用回数は戻りません。', '5×5可用3次提示，7×7可用7次，9×9可用9次。撤销或清空方格不会恢复已用提示。'],
    ['난이도별 힌트 3·7·9회', 'Hints by difficulty: 3, 7, or 9', '難易度ごとにヒント3・7・9回', '各难度提示次数：3、7、9次'],
    ['5×5는 3회, 7×7은 7회, 9×9는 9회 힌트를 사용할 수 있어요. 남은 횟수는 진행 기록과 함께 저장됩니다.', 'Use 3 hints for 5×5, 7 for 7×7 and 9 for 9×9. Remaining hints are saved with your progress.', '5×5は3回、7×7は7回、9×9は9回のヒントを使えます。残り回数は進行状況と一緒に保存されます。', '5×5可用3次提示，7×7可用7次，9×9可用9次，剩余次数随进度一起保存。'],
    ['v1.2.0 · 업데이트', 'v1.2.0 · Updates', 'v1.2.0 · 更新情報', 'v1.2.0 · 更新'],
    ['힌트 {n}회', '{n} hints', 'ヒント{n}回', '提示{n}次'],
    ['힌트 없이 스스로', 'no hints', 'ヒントなし', '未使用提示'],
    ['{n} × {n} · {time} · {hints} 완성', '{n} × {n} · {time} · {hints}', '{n} × {n} · {time} · {hints}で完成', '{n} × {n} · {time} · {hints}完成'],
    ['완료', 'completed', '完成', '已完成'], ['완료 기록 없음', 'no completions', '完成記録なし', '暂无完成记录'],
    ['미표시', 'unmarked', '未記入', '未标记'], ['채움', 'filled', '塗り', '已填色'],
    ['{row}행 {col}열 {name}', 'Row {row}, column {col}: {name}', '{row}行{col}列、{name}', '第{row}行第{col}列：{name}'],
    ['{n}행 {clues}', 'Row {n}: {clues}', '{n}行：{clues}', '第{n}行：{clues}'],
    ['{n}열 {clues}', 'Column {n}: {clues}', '{n}列：{clues}', '第{n}列：{clues}'],
    ['행 힌트: {rows}. 열 힌트: {cols}.', 'Row clues: {rows}. Column clues: {cols}.', '行のヒント：{rows}。列のヒント：{cols}。', '行线索：{rows}。列线索：{cols}。'],
    ['{days}일 동안 {solved}개의 퍼즐을 완성했어요. 현재 연속 기록은 {streak}일이에요.', '{solved} puzzles completed over {days} days. Current streak: {streak} days.', '{days}日間で{solved}個のパズルを完成。現在の連続記録は{streak}日です。', '{days}天内完成了{solved}道谜题，目前连续完成{streak}天。'],
    ['최근 완료일: {dates}', 'Recent completions: {dates}', '最近の完成日：{dates}', '最近完成日期：{dates}'],
    ['{n}개 퍼즐 기록을 확인했어요. 현재 기록을 교체할까요?', 'Found {n} puzzle records. Replace current records?', '{n}件の記録を確認しました。現在の記録を置き換えますか？', '已找到{n}条谜题记录。替换当前记录吗？'],
    ['오늘의 퍼즐 {day}\n{n}×{n} 완성 ✦ {time} · 힌트 {hints}회', 'Daily Puzzle {day}\n{n}×{n} complete ✦ {time} · Hints: {hints}', '今日のパズル {day}\n{n}×{n}完成 ✦ {time} · ヒント{hints}回', '每日谜题 {day}\n{n}×{n}完成 ✦ {time} · 提示{hints}次'],
    ['다음 퍼즐까지 {time}', 'Next puzzle in {time}', '次のパズルまで {time}', '距下一题 {time}'],
    ['퍼즐 불러오는 중 {n}%', 'Loading puzzle {n}%', 'パズル読み込み中 {n}%', '正在加载谜题 {n}%'],
    ['게임을 불러오지 못했어요. {reason}', 'Could not load the game. {reason}', 'ゲームを読み込めませんでした。{reason}', '无法加载游戏。{reason}'],
    ['hintNotice', 'Revealed row {row}, column {col}. Hint use is recorded.', '{row}行{col}列を表示しました。ヒント使用回数が記録されます。', '已揭示第{row}行第{col}列。提示次数会被记录。'],
  ];
  const phrases = new Map(catalog.map(([key, ...values]) => [key, values]));
  const normalize = value => /^ja\b/i.test(value) ? 'ja' : /^zh\b/i.test(value) ? 'zh-CN' : /^ko\b/i.test(value) ? 'ko' : 'en';
  let language;
  try { const saved = localStorage.getItem(KEY); if (languages.includes(saved)) language = saved; } catch {}
  language ||= normalize(navigator.languages?.[0] || navigator.language || 'ko');
  function t(key, values = {}) {
    let text = language === 'ko' ? key : phrases.get(key)?.[languages.indexOf(language) - 1] || key;
    if (language === 'ko' && key === 'hintNotice') text = '{row}행 {col}열을 알려드렸어요. 힌트 사용 횟수가 기록됩니다.';
    return text.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(values, name) ? String(values[name]) : match);
  }
  // Keep the original text nodes, including nested emphasis and existing listeners.
  let bindings = [];
  const registered = new WeakSet();
  const dynamic = '#daily-date,#puzzle-label,#timer,#hint-count,#storage-status,#stat-streak,#win-copy,#week,#clue-text,#text-board,#next-reset,#load-status,#dialog-title,#record-summary,#recent-records,#import-status,#toast,#announce';
  function register(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, key = node.textContent.trim();
      if (registered.has(node) || node.parentElement.closest('script,style,select,' + dynamic) || !phrases.has(key)) continue;
      registered.add(node);
      const prefix = node.textContent.match(/^\s*/)[0], suffix = node.textContent.match(/\s*$/)[0];
      bindings.push({node, apply: () => { node.textContent = prefix + t(key) + suffix; }});
    }
    for (const el of root.querySelectorAll('[aria-label],meta[content]')) {
      if (registered.has(el) || el.matches('#timer')) continue;
      const attr = el.tagName === 'META' ? 'content' : 'aria-label', key = el.getAttribute(attr);
      if (phrases.has(key)) { registered.add(el); bindings.push({node:el, apply: () => el.setAttribute(attr, t(key))}); }
    }
  }
  function apply() {
    document.documentElement.lang = language;
    bindings = bindings.filter(binding => binding.node.isConnected);
    bindings.forEach(binding => binding.apply());
  }
  function setLanguage(value) {
    if (!languages.includes(value)) return;
    language = value;
    try { localStorage.setItem(KEY, language); } catch { /* preference is session-only when storage is unavailable */ }
    apply();
    document.getElementById('language').value = language;
    window.dispatchEvent(new CustomEvent('roky:language'));
  }
  const date = day => new Intl.DateTimeFormat(language, {year:'numeric', month:'short', day:'numeric', timeZone:'UTC'}).format(new Date(day + 'T00:00:00Z'));
  const weekday = day => new Intl.DateTimeFormat(language, {weekday:'narrow', timeZone:'UTC'}).format(day);
  window.RokyI18n = {KEY, languages, catalog, t, date, weekday, register, apply, setLanguage, get language() { return language; }};
  register(document); apply();
  document.getElementById('language').value = language;
  document.getElementById('language').addEventListener('change', event => setLanguage(event.target.value));
})();
