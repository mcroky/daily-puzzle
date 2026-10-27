/* Namespaced, versioned, validated local-only storage. No network requests. */
(() => {
  'use strict';
  const t = key => window.RokyI18n ? window.RokyI18n.t(key) : key;
  const KEY = 'roky.daily-puzzle.v1';
  const BACKUP = KEY + '.backup';
  const LIMIT = 1500000;
  let blocked = false;
  let ok = true;
  let message = '기기에 자동 저장됨';
  let memory = '';
  function validDay(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(+date) && date.toISOString().slice(0, 10) === value;
  }
  function validate(raw) {
    if (typeof raw !== 'string' || raw.length > LIMIT) return false;
    try {
      const data = JSON.parse(raw);
      if (!data || data.version !== 1 || data.generator !== 1 || ![5, 7, 9].includes(data.level) || !data.records || typeof data.records !== 'object' || Array.isArray(data.records)) return false;
      if (data.archiveDay !== undefined && data.archiveDay !== '' && !validDay(data.archiveDay)) return false;
      const entries = Object.entries(data.records);
      if (entries.length > 1500) return false;
      return entries.every(([key, record]) => {
        if (!/^\d{4}-\d{2}-\d{2}\/[579]$/.test(key)) return false;
        const date = new Date(key.slice(0, 10) + 'T00:00:00Z');
        if (!Number.isFinite(+date) || date.toISOString().slice(0, 10) !== key.slice(0, 10)) return false;
        const n = Number(key.slice(11));
        return record && Array.isArray(record.cells) && record.cells.length === n * n && record.cells.every(c => [0, 1, 2].includes(c)) && ['elapsed', 'hints'].every(k => Number.isInteger(record[k]) && record[k] >= 0 && record[k] <= 31536000) && typeof record.completed === 'boolean' && (record.completedOn === undefined || validDay(record.completedOn)) && (record.completionDays === undefined || (Array.isArray(record.completionDays) && record.completionDays.length <= 1095 && record.completionDays.every(validDay)));
      });
    } catch { return false; }
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY) || '';
      if (!raw) return '';
      if (validate(raw)) { memory = raw; blocked = false; ok = true; message = '기기에 자동 저장됨'; return raw; }
      const backup = localStorage.getItem(BACKUP);
      if (backup && validate(backup)) {
        memory = backup;
        blocked = true;
        ok = false;
        message = '이전 정상 기록을 복구했습니다. 원본을 보존 중입니다. 백업 관리에서 복구를 확정해 주세요.';
        return backup;
      }
      blocked = true;
      ok = false;
      message = '저장 기록을 읽지 못했습니다. 원본 보존 중 · 백업 관리에서 확인해 주세요.';
      return '';
    } catch {
      ok = false;
      message = '저장 공간에 접근할 수 없습니다. 기록은 현재 화면에만 유지돼요. 백업을 내려받아 주세요.';
      return memory;
    }
  }
  function save(raw) {
    if (!validate(raw)) { ok = false; message = '저장 자료 검증 실패 · 백업을 확인해 주세요.'; return false; }
    memory = raw;
    if (blocked) return false;
    try {
      // The primary write is atomic. A backup failure must never block it.
      const previous = localStorage.getItem(KEY);
      localStorage.setItem(KEY, raw);
      ok = true;
      message = '기기에 자동 저장됨';
      if (previous && validate(previous)) {
        try { localStorage.setItem(BACKUP, previous); } catch { /* primary is already saved */ }
      }
      return true;
    } catch {
      ok = false;
      message = '자동 저장 실패 · 기록을 잃지 않도록 백업을 내려받아 주세요.';
      return false;
    }
  }
  function replace(raw) {
    if (!validate(raw)) throw new Error(t('지원하는 백업 파일이 아니거나 자료가 손상됐어요. 현재 기록은 유지됩니다.'));
    const oldBlocked = blocked;
    blocked = false;
    if (!save(raw)) { blocked = oldBlocked; throw new Error(t('기기 저장 공간에 쓸 수 없어요. 기존 기록을 보존했습니다.')); }
    return true;
  }
  window.RokyStorage = {
    KEY, BACKUP, LIMIT, validate, load, save, replace,
    get ok() { return ok; }, get message() { return t(message); }, get messageKey() { return message; },
    current: () => memory,
    original: () => { try { return localStorage.getItem(KEY) || memory; } catch { return memory; } },
    recoveryNeeded: () => blocked,
  };
})();
