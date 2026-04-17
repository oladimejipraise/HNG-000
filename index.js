const COLLAPSE_THRESHOLD = 120;

let state = {
  title: 'Complete TypeScript Assignment',
  desc: 'Complete all 5 questions in the TypeScript Playground covering generics, type aliases, utility types, and the any vs unknown distinction. Submit the shareable URL before the deadline. Make sure all test IDs are present and all edge cases are handled properly before submission.',
  priority: 'high',
  status: 'pending',
  due: '2026-04-18',
  tags: ['work', 'urgent', 'typescript'],
  done: false,
  expanded: false
};

let savedState = null;
let timerInterval = null;

const priorityMap = {
  high:   { label: 'High',   cls: 'high' },
  medium: { label: 'Medium', cls: 'medium' },
  low:    { label: 'Low',    cls: 'low' }
};

const statusMap = {
  pending:  { label: 'Pending',     cls: 'pending' },
  progress: { label: 'In Progress', cls: 'progress' },
  done:     { label: 'Done',        cls: 'done' }
};

function initExpand() {
  const desc = document.getElementById('todo-desc');
  const toggle = document.getElementById('expand-toggle');
  const section = document.getElementById('collapsible-section');
  const text = desc ? desc.textContent.trim() : '';

  if (text.length > COLLAPSE_THRESHOLD) {
    toggle.classList.add('visible');
    section.classList.toggle('collapsed', !state.expanded);
    section.classList.toggle('expanded', state.expanded);
    section.setAttribute('aria-expanded', state.expanded);
    toggle.textContent = state.expanded ? 'Show less ▴' : 'Show more ▾';
    toggle.setAttribute('aria-expanded', state.expanded);
  } else {
    toggle.classList.remove('visible');
    section.classList.remove('collapsed');
    section.classList.add('expanded');
  }
}

function toggleExpand() {
  state.expanded = !state.expanded;
  const section = document.getElementById('collapsible-section');
  const toggle = document.getElementById('expand-toggle');
  section.classList.toggle('collapsed', !state.expanded);
  section.classList.toggle('expanded', state.expanded);
  section.setAttribute('aria-expanded', state.expanded);
  toggle.setAttribute('aria-expanded', state.expanded);
  toggle.textContent = state.expanded ? 'Show less ▴' : 'Show more ▾';
}

function renderTags() {
  const ul = document.getElementById('tags-list');
  ul.innerHTML = '';
  state.tags.forEach((tag, i) => {
    const li = document.createElement('li');
    li.className = 'tag';
    li.setAttribute('role', 'listitem');
    if (tag === 'work')   li.setAttribute('data-testid', 'test-todo-tag-work');
    if (tag === 'urgent') li.setAttribute('data-testid', 'test-todo-tag-urgent');
    const span = document.createElement('span');
    span.textContent = tag;
    const rm = document.createElement('button');
    rm.className = 'rm';
    rm.setAttribute('aria-label', 'Remove tag ' + tag);
    rm.innerHTML = '&#x2715;';
    rm.onclick = () => removeTag(i);
    li.appendChild(span);
    li.appendChild(rm);
    ul.appendChild(li);
  });
}

function addTag() {
  const inp = document.getElementById('tag-input');
  const val = inp.value.trim().toLowerCase().replace(/\s+/g, '-');
  if (!val || state.tags.includes(val)) { inp.value = ''; return; }
  state.tags.push(val);
  inp.value = '';
  renderTags();
}

function removeTag(i) {
  state.tags.splice(i, 1);
  renderTags();
}

function getTimeRemaining() {
  const due = new Date(state.due + 'T18:00:00');
  const diff = due - new Date();
  const abs = Math.abs(diff);
  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);

  if (diff < 0) {
    if (mins < 60)  return { text: `Overdue by ${mins} min${mins !== 1 ? 's' : ''}`,    cls: 'overdue-text', overdue: true };
    if (hours < 24) return { text: `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`, cls: 'overdue-text', overdue: true };
    return { text: `Overdue by ${days} day${days !== 1 ? 's' : ''}`, cls: 'overdue-text', overdue: true };
  }
  if (mins < 60)  return { text: 'Due now!',                                         cls: 'soon-text',   overdue: false };
  if (hours < 24) return { text: `Due in ${hours} hour${hours !== 1 ? 's' : ''}`,   cls: 'soon-text',   overdue: false };
  if (days === 1) return { text: 'Due tomorrow',                                     cls: 'soon-text',   overdue: false };
  return { text: `Due in ${days} days`, cls: 'ok-text', overdue: false };
}

function updateTime() {
  const el = document.getElementById('time-remaining');
  const overdueEl = document.getElementById('overdue-indicator');
  const card = document.getElementById('todo-card');

  if (state.status === 'done' || state.done) {
    el.textContent = 'Completed';
    el.className = 'meta-value ok-text';
    el.setAttribute('aria-label', 'Task completed');
    overdueEl.style.display = 'none';
    card.style.borderColor = 'var(--border)';
    return;
  }

  const { text, cls, overdue } = getTimeRemaining();
  el.textContent = text;
  el.className = 'meta-value ' + cls;
  el.setAttribute('aria-label', text);

  if (overdue) {
    overdueEl.style.display = 'flex';
    card.style.borderColor = 'var(--high-border)';
  } else {
    overdueEl.style.display = 'none';
    card.style.borderColor = 'var(--border)';
  }
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  updateTime();
  timerInterval = setInterval(updateTime, 30000);
}

function renderCard() {
  document.getElementById('todo-title').textContent = state.title;
  document.getElementById('todo-desc').textContent = state.desc;

  const pm = priorityMap[state.priority];
  const pb = document.getElementById('priority-badge');
  pb.className = 'badge ' + pm.cls;
  pb.textContent = pm.label;
  pb.setAttribute('aria-label', 'Priority: ' + pm.label);

  const dot = document.getElementById('priority-dot');
  dot.className = 'priority-dot ' + pm.cls;

  const bar = document.getElementById('priority-bar');
  bar.className = 'priority-bar ' + pm.cls;
  bar.setAttribute('aria-label', 'Priority: ' + pm.label);

  const sm = statusMap[state.status];
  const sb = document.getElementById('status-badge');
  sb.className = 'badge ' + sm.cls;
  sb.textContent = sm.label;
  sb.setAttribute('aria-label', 'Status: ' + sm.label);

  document.getElementById('status-control').value = state.status;

  const chk = document.getElementById('chk');
  const title = document.getElementById('todo-title');
  const card = document.getElementById('todo-card');
  const isDone = state.status === 'done' || state.done;
  chk.checked = isDone;
  title.classList.toggle('done', isDone);
  card.classList.toggle('is-done', isDone);

  const d = new Date(state.due + 'T12:00:00');
  const opts = { year: 'numeric', month: 'short', day: 'numeric' };
  document.getElementById('due-display').textContent = d.toLocaleDateString('en-US', opts);
  document.getElementById('due-display').setAttribute('datetime', state.due);

  startTimer();
  renderTags();
  initExpand();
}

function handleStatusChange(val) {
  state.status = val;
  state.done = val === 'done';
  renderCard();
}

function handleToggle(cb) {
  state.done = cb.checked;
  state.status = cb.checked ? 'done' : 'pending';
  renderCard();
}

function openEdit() {
  savedState = JSON.parse(JSON.stringify(state));
  document.getElementById('e-title').value = state.title;
  document.getElementById('e-desc').value = state.desc;
  document.getElementById('e-priority').value = state.priority;
  document.getElementById('e-due').value = state.due;
  document.getElementById('edit-form').classList.add('open');
  document.getElementById('e-title').focus();
}

function cancelEdit() {
  if (savedState) state = JSON.parse(JSON.stringify(savedState));
  document.getElementById('edit-form').classList.remove('open');
  document.getElementById('edit-btn').focus();
  renderCard();
}

function saveEdit() {
  const t = document.getElementById('e-title').value.trim();
  const d = document.getElementById('e-desc').value.trim();
  if (t) state.title = t;
  if (d) state.desc = d;
  state.priority = document.getElementById('e-priority').value;
  const due = document.getElementById('e-due').value;
  if (due) state.due = due;
  document.getElementById('edit-form').classList.remove('open');
  document.getElementById('edit-btn').focus();
  renderCard();
}

//Delete card
function deleteCard() {
  if (timerInterval) clearInterval(timerInterval);
  const card = document.getElementById('todo-card');
  card.style.opacity = '0';
  card.style.transform = 'scale(0.97)';
  setTimeout(() => { card.style.display = 'none'; }, 300);
}

renderCard();