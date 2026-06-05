const KEYS = { users: 'wb_users', posts: 'wb_posts', comments: 'wb_comments', session: 'wb_session' };

function initDemoData() {
  if (!localStorage.getItem(KEYS.users)) {
    localStorage.setItem(KEYS.users, JSON.stringify([
      { id: 1, username: 'admin', password: 'admin123', name: '관리자', createdAt: '2026-01-01T00:00:00Z' }
    ]));
  }
  if (!localStorage.getItem(KEYS.posts)) {
    localStorage.setItem(KEYS.posts, JSON.stringify([
      {
        id: 1,
        title: '👋 WebBoard에 오신 것을 환영합니다!',
        content: '안녕하세요! WebBoard는 자유롭게 생각을 나눌 수 있는 공간입니다.\n\n✅ 로그인 후 글을 작성할 수 있어요.\n✅ 다른 사람의 글에 댓글을 남길 수 있습니다.\n✅ 글 목록에서 검색 기능도 지원합니다.\n\n테스트 계정: admin / admin123\n\n편하게 이용해 주세요 😊',
        authorId: 1, authorName: '관리자', views: 0,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 2,
        title: 'Python 공부 시작했어요 🐍',
        content: '오늘부터 파이썬을 본격적으로 공부하기 시작했습니다.\n\nlru_cache, 제너레이터, 데코레이터... 정말 재밌는 기능들이 많네요.\n\n특히 함수형 프로그래밍 방식으로 map/filter/reduce를 쓰니까 코드가 훨씬 깔끔해지는 것 같아요.\n\n같이 공부하실 분 계신가요? 😄',
        authorId: 1, authorName: '관리자', views: 0,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 3,
        title: 'Claude AI 진짜 신기하다 ✦',
        content: '클로드랑 대화하다 보니 코딩 공부가 너무 재밌어졌어요.\n\n이 게시판도 Claude Code가 만들어줬는데 완성도가 꽤 높아서 놀랐습니다 😮\n\n로그인, 회원가입, 게시판, 댓글까지 모두 localStorage로 구현되어 있어요.\n백엔드 없이 이런 걸 만들 수 있다니!\n\n여러분도 한번 써보세요!',
        authorId: 1, authorName: '관리자', views: 0,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ]));
  }
  if (!localStorage.getItem(KEYS.comments)) {
    localStorage.setItem(KEYS.comments, JSON.stringify([
      { id: 1, postId: 1, authorId: 1, authorName: '관리자', content: '첫 번째 댓글입니다! 자유롭게 댓글을 달아보세요 🎉', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() }
    ]));
  }
}

const Auth = {
  getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(KEYS.session)); } catch { return null; }
  },
  isLoggedIn() { return !!this.getCurrentUser(); },
  login(username, password) {
    const users = JSON.parse(localStorage.getItem(KEYS.users) || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return false;
    localStorage.setItem(KEYS.session, JSON.stringify({ id: user.id, username: user.username, name: user.name }));
    return true;
  },
  logout() { localStorage.removeItem(KEYS.session); },
  register({ username, password, name }) {
    const users = JSON.parse(localStorage.getItem(KEYS.users) || '[]');
    if (users.find(u => u.username === username)) return { ok: false, msg: '이미 사용 중인 아이디입니다.' };
    users.push({ id: Date.now(), username, password, name, createdAt: new Date().toISOString() });
    localStorage.setItem(KEYS.users, JSON.stringify(users));
    return { ok: true };
  },
  guard() {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('redirect', location.href);
      location.href = 'login.html';
      return false;
    }
    return true;
  }
};

const Posts = {
  getAll() { return [...JSON.parse(localStorage.getItem(KEYS.posts) || '[]')].reverse(); },
  getById(id) { return JSON.parse(localStorage.getItem(KEYS.posts) || '[]').find(p => p.id === +id) || null; },
  create({ title, content }) {
    const user = Auth.getCurrentUser();
    const posts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]');
    const post = { id: Date.now(), title, content, authorId: user.id, authorName: user.name, views: 0, createdAt: new Date().toISOString() };
    posts.push(post);
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
    return post;
  },
  incrementViews(id) {
    const posts = JSON.parse(localStorage.getItem(KEYS.posts) || '[]');
    const post = posts.find(p => p.id === +id);
    if (post) { post.views++; localStorage.setItem(KEYS.posts, JSON.stringify(posts)); }
  },
  delete(id) {
    localStorage.setItem(KEYS.posts, JSON.stringify(JSON.parse(localStorage.getItem(KEYS.posts) || '[]').filter(p => p.id !== +id)));
    localStorage.setItem(KEYS.comments, JSON.stringify(JSON.parse(localStorage.getItem(KEYS.comments) || '[]').filter(c => c.postId !== +id)));
  }
};

const Comments = {
  getByPostId(postId) { return JSON.parse(localStorage.getItem(KEYS.comments) || '[]').filter(c => c.postId === +postId); },
  add(postId, content) {
    const user = Auth.getCurrentUser();
    const comments = JSON.parse(localStorage.getItem(KEYS.comments) || '[]');
    const comment = { id: Date.now(), postId: +postId, authorId: user.id, authorName: user.name, content, createdAt: new Date().toISOString() };
    comments.push(comment);
    localStorage.setItem(KEYS.comments, JSON.stringify(comments));
    return comment;
  }
};

function formatDate(iso) {
  const d = new Date(iso), diff = Date.now() - d;
  if (diff < 60000) return '방금 전';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}일 전`;
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatDateFull(iso) {
  return new Date(iso).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getParam(key) {
  return new URLSearchParams(location.search).get(key);
}

function renderNavbar(el) {
  const user = Auth.getCurrentUser();
  el.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="navbar-brand">✦ <span>Web</span>Board</a>
      <div class="navbar-links">
        <a href="board.html">게시판</a>
        ${user
          ? `<span class="navbar-user">${escapeHtml(user.name)}님</span>
             <a href="#" onclick="Auth.logout();location.href='index.html';return false;"
                class="btn btn-sm" style="color:#94a3b8;border:2px solid #334155;background:transparent;">로그아웃</a>`
          : `<a href="register.html">회원가입</a>
             <a href="login.html" class="btn btn-sm btn-primary">로그인</a>`
        }
      </div>
    </nav>`;
}

initDemoData();
