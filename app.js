(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const store = window.RokyStorage;
  const I = window.RokyI18n, t = I.t;
  let callback, state, toastTimer, focusBeforeDialog, loadingStarted = false;
  const firstDay = '2026-10-24', dayMs = 86400000;
  let calendarMonth = '';
  const format = seconds => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  let reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { reduceMotion ||= localStorage.getItem('roky.daily-puzzle.motion') === 'reduce'; } catch {}
  document.body.classList.toggle('reduced-motion', reduceMotion);
  function act(name, value = 0) { if (callback) callback(name, value); }
  function toast(text) {
    $('toast').textContent = text; $('toast').hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, 4200);
  }
  function update(raw) {
    state = JSON.parse(raw);
    const s = state;
    $('loading').hidden = true;
    for (const el of document.querySelectorAll('[data-level]')) {
      el.disabled = false;
      el.setAttribute('aria-pressed', String(Number(el.dataset.level) === s.level));
      el.querySelector('i').classList.toggle('done', s.stats.today.includes(Number(el.dataset.level)));
      el.setAttribute('aria-label', t('난이도 {name} {n} 곱하기 {n}{done}', {name:el.querySelector('span').textContent, n:el.dataset.level, done:s.stats.today.includes(Number(el.dataset.level)) ? ', ' + t('해당 퍼즐 완료') : ''}));
    }
    for (const el of document.querySelectorAll('[data-mode]')) {
      el.disabled = s.completed || s.paused;
      el.setAttribute('aria-pressed', String(Number(el.dataset.mode) === s.mode));
    }
    $('pause').disabled = s.completed;
    $('hint').disabled = s.completed || s.paused || s.hints >= s.hintLimit;
    $('hint').setAttribute('aria-pressed', String(s.choosingHint));
    $('hint-guide').hidden = !s.choosingHint;
    $('reset').disabled = s.completed || s.paused;
    $('undo').disabled = !s.undo || s.paused;
    $('timer').textContent = format(s.elapsed);
    $('timer').setAttribute('aria-label', t('플레이 시간 {minutes}분 {seconds}초', {minutes:Math.floor(s.elapsed / 60), seconds:s.elapsed % 60}));
    $('puzzle-label').textContent = t(s.day !== s.today ? '지난 퍼즐' : (s.completed ? '오늘도 한 장 완성' : '오늘의 퍼즐'));
    $('puzzle-date').value = s.day;
    $('puzzle-date').max = s.today;
    $('puzzle-date').disabled = false;
    $('go-today').disabled = s.day === s.today;
    $('daily-date').textContent = I.date(s.day);
    $('daily-date').dateTime = s.day;
    $('issue').textContent = `No. ${String(Math.max(1, Math.floor((Date.parse(s.day) - Date.parse('2026-10-24')) / 86400000) + 1)).padStart(3, '0')}`;
    $('hint-count').textContent = t('힌트 남은 횟수 {remaining}/{limit}', {remaining:Math.max(0, s.hintLimit - s.hints), limit:s.hintLimit});
    $('storage-status').textContent = t(s.storageMessage);
    $('storage-status').classList.toggle('error', !s.storageOK);
    $('stat-solved').textContent = s.stats.solved;
    $('stat-streak').replaceChildren(document.createTextNode(String(s.stats.streak)), Object.assign(document.createElement('small'), { textContent: t('일') }));
    $('win').hidden = !s.completed;
    $('replay').hidden = s.day === s.today;
    $('win-heading').textContent = t(s.day === s.today ? '오늘의 한 장, 완성했어요!' : '선택한 퍼즐을 완성했어요!');
    $('win-copy').textContent = t('{n} × {n} · {time} · {hints} 완성', {n:s.level, time:format(s.elapsed), hints:s.hints ? t('힌트 {n}회', {n:s.hints}) : t('힌트 없이 스스로')});
    $('pause-cover').hidden = !s.paused;
    renderWeek(s);
    renderCalendar(s);
    renderTextBoard(s);
    if (s.message) { $('announce').textContent = t(s.message, s.messageArgs); toast(t(s.message, s.messageArgs)); }
  }
  function renderWeek(s) {
    const signature = I.language + s.today + s.stats.recent.join(',');
    if ($('week').dataset.key === signature) return;
    $('week').dataset.key = signature;
    $('week').replaceChildren();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.parse(s.today) - i * 86400000);
      const day = d.toISOString().slice(0, 10);
      const done = s.stats.recent.includes(day);
      const div = document.createElement('div');
      div.className = `${done ? 'done' : ''} ${i === 0 ? 'today' : ''}`;
      div.setAttribute('aria-label', `${I.date(day)} ${t(done ? '완료' : '완료 기록 없음')}`);
      div.append(document.createTextNode(I.weekday(d)), Object.assign(document.createElement('b'), { textContent: done ? '✓' : String(d.getUTCDate()) }));
      $('week').append(div);
    }
  }
  function chooseDay(day) {
    if (!state || !/^\d{4}-\d{2}-\d{2}$/.test(day) || day < firstDay || day > state.today) return;
    const date = new Date(day + 'T00:00:00Z');
    if (!Number.isFinite(+date) || date.toISOString().slice(0,10) !== day) return;
    calendarMonth = day.slice(0,7);
    act('date', Math.round((+date - Date.parse(state.today + 'T00:00:00Z')) / dayMs));
    renderCalendar(state);
  }
  function renderCalendar(s) {
    calendarMonth ||= s.day.slice(0,7);
    const grid = $('calendar');
    const complete = s.stats.completionDays || [];
    const key = [I.language, calendarMonth, s.day, s.today, complete.join(',')].join('|');
    if (grid.dataset.key === key) return;
    grid.dataset.key = key;
    const focused = grid.contains(document.activeElement) ? document.activeElement?.dataset.day : '';
    const monthStart = new Date(calendarMonth + '-01T00:00:00Z');
    const year = monthStart.getUTCFullYear(), month = monthStart.getUTCMonth();
    $('calendar-month').textContent = new Intl.DateTimeFormat(I.language,{year:'numeric',month:'long',timeZone:'UTC'}).format(monthStart);
    $('calendar-prev').disabled = calendarMonth <= firstDay.slice(0,7);
    $('calendar-next').disabled = calendarMonth >= s.today.slice(0,7);
    grid.replaceChildren();
    for (let i=0; i<7; i++) {
      const weekday = document.createElement('span');
      weekday.className = 'calendar-weekday';
      weekday.textContent = I.weekday(new Date(Date.UTC(2026, 9, 25 + i)));
      grid.append(weekday);
    }
    for (let i=0; i<monthStart.getUTCDay(); i++) {
      const blank = document.createElement('span'); blank.setAttribute('aria-hidden','true'); grid.append(blank);
    }
    const count = new Date(Date.UTC(year,month+1,0)).getUTCDate();
    for (let n=1; n<=count; n++) {
      const date = new Date(Date.UTC(year,month,n)).toISOString().slice(0,10);
      const button = document.createElement('button');
      button.type='button'; button.dataset.day=date; button.textContent=String(n);
      button.disabled=date<firstDay || date>s.today;
      button.classList.toggle('done',complete.includes(date));
      button.setAttribute('aria-pressed',String(date===s.day));
      button.setAttribute('aria-label',t('퍼즐이 있는 날: {date}, {status}',{date:I.date(date),status:t(complete.includes(date)?'이날 완료':'완료 기록 없음')}));
      button.onclick=()=>chooseDay(date);
      grid.append(button);
    }
    if(focused) grid.querySelector(`[data-day="${focused}"]`)?.focus();
  }
  function shiftCalendar(delta) {
    if (!state) return;
    const date = new Date(calendarMonth + '-01T00:00:00Z');
    date.setUTCMonth(date.getUTCMonth()+delta);
    calendarMonth=date.toISOString().slice(0,7);
    renderCalendar(state);
  }
  function renderTextBoard(s) {
    const board = $('text-board');
    if (board.children.length !== s.cells.length) {
      board.replaceChildren(); board.style.gridTemplateColumns = `repeat(${s.level},1fr)`;
      s.cells.forEach((_, i) => {
        const button = document.createElement('button');
        button.addEventListener('click', () => act('cell', i));
        board.append(button);
      });
    }
    [...board.children].forEach((button, i) => {
      const name = t(['미표시', '채움', '빈칸'][s.cells[i]]);
      button.textContent = ['·', '■', '×'][s.cells[i]];
      button.dataset.value = s.cells[i];
      button.disabled = s.completed || s.paused;
      button.setAttribute('aria-label', t('{row}행 {col}열 {name}', {row:Math.floor(i / s.level) + 1, col:i % s.level + 1, name}));
    });
    $('clue-text').textContent = t('행 힌트: {rows}. 열 힌트: {cols}.', {rows:s.rows.map((c,i) => t('{n}행 {clues}', {n:i+1, clues:c.join(', ')})).join(' / '), cols:s.cols.map((c,i) => t('{n}열 {clues}', {n:i+1, clues:c.join(', ')})).join(' / ')});
  }
  function download(raw, name) {
    if (!raw) { toast(t('아직 저장된 기록이 없어요.')); return; }
    const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: name });
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function openDialog(type) {
    focusBeforeDialog = document.activeElement;
    act('pause', 1);
    const content = $('dialog-content');
    content.className = 'dialog-body';
    const pages = {
      help: ['네모로직, 이렇게 풀어요', '<p>가로·세로 숫자를 보고 숨겨진 칸을 채우는 논리 퍼즐이에요. 모든 채울 칸을 맞히면 완성됩니다.</p><div class="example"><b>2 1</b><i class="on"></i><i class="on"></i><i>×</i><i class="on"></i><i>×</i></div><ol><li><strong>숫자 = 연속으로 채울 칸의 수.</strong> 2, 1이면 두 칸 묶음 뒤에 한 칸 묶음이 있어요.</li><li>묶음 사이에는 빈칸이 하나 이상 있어야 해요. 숫자 순서도 같아야 합니다.</li><li>0은 그 줄에 채울 칸이 없다는 뜻이에요.</li><li>빈칸 표시(×)는 메모예요. 정답의 채울 칸을 모두 찾으면 나머지 빈칸은 자동으로 표시돼요.</li></ol><h3>편한 방법으로 플레이</h3><p>마우스 클릭·드래그로 표시하고 우클릭으로 빈칸을 표시해요. 휴대폰에서는 아래 도구를 선택하고 칸을 눌러주세요. 같은 표시를 다시 누르면 지워집니다.</p><p>키보드: 보드에서 방향키로 이동, Space·Enter로 선택 도구 사용, X로 빈칸, Delete로 지우기, Ctrl/⌘ + Z로 되돌리기. 화면 읽기 프로그램은 보드 아래의 텍스트 보드를 이용해 주세요.</p><h3>매일 세 가지 도전</h3><p>한국 시간 자정에 새 퍼즐이 열려요. 난이도를 바꿔도 현재 진행은 남아 있어요. 모든 퍼즐은 숫자만으로 추측 없이 풀 수 있는지 검사합니다. 힌트는 한 칸을 알려주며 사용 횟수가 기록돼요. 완성 전에는 정답을 자동 검사하지 않아요.</p><p>힌트 버튼을 누른 뒤 원하는 칸을 선택하세요. 이미 맞는 칸은 횟수를 쓰지 않습니다.</p><p>날짜 선택이나 완료 달력에서 지난 퍼즐을 열 수 있어요. 달력은 실제로 퍼즐을 완성한 날을 표시하며, 이전 기록은 퍼즐 날짜를 표시합니다.</p><p>5×5는 3회, 7×7은 7회, 9×9는 9회까지 힌트를 쓸 수 있어요. 되돌리거나 칸을 비워도 사용 횟수는 유지됩니다.</p><label><input id="reduce-motion" type="checkbox"> 움직임 줄이기</label>'],
      privacy: ['기록은 내 기기에만', '<p>로그인 없이 사용해요. 퍼즐 진행 상황, 완료 기록, 시간과 힌트 횟수를 현재 브라우저의 localStorage에 저장합니다. 기록을 서버나 Supabase로 전송하지 않습니다.</p><p>다른 기기·브라우저와는 자동 동기화되지 않아요. 방문 기록이나 사이트 데이터를 지우거나 시크릿 모드를 닫으면 기록이 사라질 수 있습니다. <strong>백업 관리에서 JSON 파일을 내려받아 보관해 주세요.</strong></p><p>자동 저장이 실패하면 보드 아래에 안내합니다. 이때는 탭을 닫기 전에 백업을 내려받아 주세요. 저장 기록이 손상되면 원본을 보존하고, 가능한 경우 이전 정상 기록을 불러옵니다.</p><p>서비스 제공을 위해 GitHub Pages에서 게임 파일을 내려받아요. 개선 의견·소셜 링크는 외부 사이트의 새 탭으로 연결됩니다.</p><p>완료 기록은 최대 1,095개 퍼즐을 보관해요. 이보다 오래된 기록은 정리됩니다. 기기 시계가 잘못되어 있으면 일일 퍼즐 날짜도 달라질 수 있어요.</p>'],
      updates: ['업데이트 내역', '<p class="eyebrow">2026.10.27 · v1.3.0</p><h3>원하는 칸 힌트와 지난 퍼즐</h3><p>원하는 칸에 힌트를 쓰고 지난 퍼즐을 다시 풀 수 있어요. 월간 달력에서 완료한 날도 확인해 보세요.</p><p class="eyebrow">2026.10.27 · v1.2.0</p><h3>난이도별 힌트 3·7·9회</h3><p>5×5는 3회, 7×7은 7회, 9×9는 9회 힌트를 사용할 수 있어요. 남은 횟수는 진행 기록과 함께 저장됩니다.</p><p class="eyebrow">2026.10.24 · v1.1.0</p><h3>네 가지 언어로 만나는 오늘의 퍼즐</h3><p>영어·일본어·중국어(간체)와 언어 선택을 추가했어요. 선택한 언어는 이 브라우저에 저장되며 퍼즐 진행과 백업은 그대로 이어집니다.</p><p class="eyebrow">2026.10.24 · v1.0.0</p><h3>하루 한 장, 첫 번째 페이지</h3><p>공통 메뉴의 전자책 버튼에서 로키스튜디오 전자책 안내를 새 탭으로 열 수 있습니다.</p><p>더 좋은 앱을 위한 후원 버튼에서 Buy Me a Coffee 후원 페이지를 새 탭으로 열 수 있습니다.</p><ul><li>Godot 4.5.2로 그린 5×5·7×7·9×9 일일 네모로직</li><li>한국 시간 자정 갱신, 검증된 날짜별 랜덤 퍼즐</li><li>진행 자동 저장, 이전 정상 기록 보존, JSON 백업·복원</li><li>빈칸 표시, 드래그, 되돌리기, 힌트, 완료 기록</li><li>모바일·키보드·텍스트 보드, 움직임 줄이기</li></ul>'],
      reset: ['현재 퍼즐을 비울까요?', '<p>지금 선택한 난이도의 칸 표시를 모두 지워요. 플레이 시간과 힌트 횟수는 유지됩니다. 되돌리기로 복구할 수 있어요.</p><div class="dialog-actions"><button class="danger" id="confirm-reset">칸 모두 지우기</button><button id="cancel-reset">계속 풀기</button></div>'],
      replay: ['이 퍼즐을 다시 풀까요?', '<p>칸을 비우고 다시 시작해요. 완성 기록, 플레이 시간과 사용한 힌트 횟수는 유지됩니다.</p><div class="dialog-actions"><button id="confirm-replay">다시 시작하기</button><button id="cancel-replay">취소</button></div>'],
      records: ['차곡차곡 쌓인 기록', '<p id="record-summary"></p><p id="recent-records"></p><h3>백업 내려받기 · 복원</h3><p>백업에는 모든 난이도의 진행·완료 기록이 포함돼요. 다른 기기로 옮길 때도 사용할 수 있어요. 복원하면 현재 기록을 교체하므로 먼저 백업해 주세요.</p><div class="dialog-actions"><button id="export-backup">기록 백업 ↓</button><label for="import-backup">백업 파일 선택 ↑</label><input class="backup-input" id="import-backup" type="file" accept="application/json,.json"></div><p id="import-status" role="status"></p><div id="import-confirm" class="dialog-actions" hidden><button id="confirm-import">선택한 백업으로 교체</button><button id="cancel-import">취소</button></div><div id="recovery-options" hidden><h3>보존된 원본 확인</h3><p>손상된 원본을 내려받아 보관한 뒤, 현재 복구한 기록으로 저장을 다시 시작할 수 있어요.</p><div class="dialog-actions"><button id="export-original">보존된 원본 ↓</button><button id="confirm-recovery">현재 기록으로 복구 확정</button></div></div>'],
    };
    const [title, html] = pages[type] || pages.help;
    $('dialog-title').textContent = t(title);
    content.innerHTML = html;
    I.register(content); I.apply();
    if (type === 'help') {
      $('reduce-motion').checked = reduceMotion;
      $('reduce-motion').onchange = e => {
        reduceMotion = e.target.checked;
        document.body.classList.toggle('reduced-motion', reduceMotion);
        try { localStorage.setItem('roky.daily-puzzle.motion', reduceMotion ? 'reduce' : 'normal'); } catch {}
        act('motion', Number(reduceMotion));
      };
    }
    if (type === 'reset') {
      $('confirm-reset').onclick = () => { closeDialog(); act('reset'); toast(t('칸을 비웠어요. 되돌리기로 복구할 수 있어요.')); };
      $('cancel-reset').onclick = closeDialog;
    }
    if (type === 'replay') {
      $('confirm-replay').onclick = () => { closeDialog(); act('pause', 0); act('replay'); };
      $('cancel-replay').onclick = closeDialog;
    }
    if (type === 'records') setupRecords();
    $('dialog').showModal();
    $('close-dialog').focus();
  }
  function setupRecords() {
    $('record-summary').textContent = state ? t('{days}일 동안 {solved}개의 퍼즐을 완성했어요. 현재 연속 기록은 {streak}일이에요.', {days:state.stats.days, solved:state.stats.solved, streak:state.stats.streak}) : t('게임을 불러오는 중입니다.');
    $('recent-records').textContent = state?.stats.recent.length ? t('최근 완료일: {dates}', {dates:state.stats.recent.map(I.date).join(' · ')}) : t('첫 한 장을 완성하고 기록을 남겨보세요.');
    $('export-backup').onclick = () => { act('save'); download(store.current(), `daily-puzzle-${state?.day || 'backup'}.json`); };
    let pending = '';
    $('import-backup').onchange = async e => {
      const file = e.target.files[0]; if (!file) return;
      pending = '';
      $('import-confirm').hidden = true;
      if (file.size > store.LIMIT) { $('import-status').textContent = t('파일이 너무 큽니다. 최대 1.5MB까지 읽을 수 있어요.'); return; }
      try {
        const raw = await file.text();
        if (!store.validate(raw)) throw new Error(t('지원하는 백업 파일이 아니거나 자료가 손상됐어요. 현재 기록은 유지됩니다.'));
        pending = raw;
        $('import-status').textContent = t('{n}개 퍼즐 기록을 확인했어요. 현재 기록을 교체할까요?', {n:Object.keys(JSON.parse(raw).records).length});
        $('import-confirm').hidden = false;
      } catch (error) { $('import-status').textContent = error.message; }
    };
    $('confirm-import').onclick = () => {
      if (!pending) return;
      try { store.replace(pending); act('reload'); closeDialog(); toast(t('백업 기록을 복원했어요.')); }
      catch (error) { $('import-status').textContent = error.message; }
    };
    $('cancel-import').onclick = () => { pending = ''; $('import-confirm').hidden = true; $('import-status').textContent = t('복원을 취소했어요. 현재 기록을 유지합니다.'); };
    $('recovery-options').hidden = !store.recoveryNeeded();
    $('export-original').onclick = () => download(store.original(), 'daily-puzzle-original.json');
    $('confirm-recovery').onclick = () => {
      act('save');
      try { store.replace(store.current()); act('reload'); closeDialog(); toast(t('복구를 확정하고 자동 저장을 다시 시작했어요.')); }
      catch (error) { $('import-status').textContent = error.message; }
    };
  }
  function closeDialog() { $('dialog').close(); }
  $('dialog').addEventListener('close', () => { act('pause', 0); focusBeforeDialog?.focus(); });
  $('close-dialog').onclick = closeDialog;
  document.querySelectorAll('[data-dialog]').forEach(el => el.onclick = () => openDialog(el.dataset.dialog));
  document.querySelectorAll('[data-level]').forEach(el => el.onclick = () => act('level', Number(el.dataset.level)));
  document.querySelectorAll('[data-mode]').forEach(el => el.onclick = () => act('mode', Number(el.dataset.mode)));
  $('undo').onclick = () => act('undo');
  $('hint').onclick = () => { act('hint'); if (state?.choosingHint) $('canvas').focus(); };
  $('puzzle-date').onchange = event => { chooseDay(event.target.value); event.target.value=state.day; };
  $('go-today').onclick = () => chooseDay(state.today);
  $('calendar-prev').onclick = () => shiftCalendar(-1);
  $('calendar-next').onclick = () => shiftCalendar(1);
  $('reset').onclick = () => openDialog('reset');
  $('replay').onclick = () => openDialog('replay');
  $('pause').onclick = () => { act('pause', 1); $('resume').focus(); };
  $('resume').onclick = () => { act('pause', 0); $('canvas').focus(); };
  $('share').onclick = async () => {
    if (!state?.completed) return;
    const text = t('퍼즐 {day}\n{n}×{n} 완성 ✦ {time} · 힌트 {hints}회', {day:state.day, n:state.level, time:format(state.elapsed), hints:state.hints}) + '\nhttps://mcroky.github.io/daily-puzzle/';
    try { await navigator.clipboard.writeText(text); toast(t('결과를 복사했어요.')); }
    catch { openDialog('records'); toast(t('복사하지 못했어요. 완료 기록에서 확인해 주세요.')); }
  };
  const saveOnLeave = () => act('save');
  window.addEventListener('pagehide', saveOnLeave);
  window.addEventListener('blur', () => { if (callback) { act('save'); act('pause', 1); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { act('save'); act('pause', 1); } });
  // A second tab must reload the latest state before writing, never silently overwrite it.
  window.addEventListener('storage', event => { if (event.key === store.KEY && callback) { act('reload'); act('pause', 1); toast(t('다른 탭에서 변경된 기록을 불러왔어요.')); } });
  $('canvas').addEventListener('contextmenu', e => e.preventDefault());
  $('retry-load').onclick = () => location.reload();
  let supportWasPaused = false;
  window.addEventListener('roky:support', event => {
    if(event.detail){supportWasPaused=Boolean(state?.paused);act('save');act('pause',1);}
    else if(!supportWasPaused) act('pause',0);
  });
  function countdown() {
    const now = Date.now();
    const next = (Math.floor((now + 32400000) / 86400000) + 1) * 86400000 - 32400000;
    const seconds = Math.max(0, Math.floor((next - now) / 1000));
    $('next-reset').textContent = t('다음 퍼즐까지 {time}', {time:`${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${format(seconds % 3600)}`});
  }
  countdown(); setInterval(countdown, 1000);
  window.addEventListener('roky:language', () => {
    if (state) update(JSON.stringify({...state, message:''}));
    countdown(); $('announce').textContent = ''; $('toast').hidden = true;
  });
  window.RokyPuzzle = {
    connectGame: fn => { callback = fn; }, update,
    load: () => store.load(), save: raw => store.save(raw),
    storageMessage: () => store.messageKey, storageOK: () => store.ok,
    isActive: () => !document.hidden && !$('dialog').open,
    reducedMotion: () => reduceMotion,
  };
  window.startPuzzle = async engine => {
    if (loadingStarted) return; loadingStarted = true;
    try {
      const missing = Engine.getMissingFeatures({ threads: false });
      if (missing.length) throw new Error(t('WebGL 2.0 / WebAssembly를 지원하는 최신 브라우저에서 열어주세요.'));
      await engine.startGame({ canvas: $('canvas'), canvasResizePolicy: 0, focusCanvas: false,
        onProgress: (current, total) => {
          if (total) { $('load-progress').value = current / total * 100; $('load-status').textContent = t('퍼즐 불러오는 중 {n}%', {n:Math.floor(current / total * 100)}); }
        },
      });
    } catch (error) {
      $('load-status').textContent = t('게임을 불러오지 못했어요. {reason}', {reason:error.message || t('연결을 확인하고 다시 시도해 주세요.')});
      $('load-progress').hidden = true;
      $('retry-load').hidden = false;
      console.error(error);
    }
  };
})();
