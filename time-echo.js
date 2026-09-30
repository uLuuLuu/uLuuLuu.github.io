// Only the short excerpts are diary text; the connection labels are editorial.
(() => {
  const map = document.querySelector('.time-echo-map');
  if (!map) return;
  const reading = document.querySelector('.time-echo-reading');
  const stars = [...map.querySelectorAll('.time-echo-star')];
  const excerpts = {
    spark: {date:'2026.06.03 · 火苗',quote:'不知道为什么我好像把创作的动力弄丢了。',connection:'主题呼应 → 09.04 留下：后来一次旅行中的手绘，带来新的创作经验。',related:'keep'},
    hold: {date:'2026.07.10 · 接住',quote:'我一直都在\n我一直都在\n\n我接住你了',connection:'陪伴线：向前和退后，都可以被接住。',related:'allow'},
    allow: {date:'2026.07.29 · 允许',quote:'我不知道事情将会怎样发生，但我仍然拥有好奇，勇气，爱和善意。',connection:'真实回访 ↔ 09.09 回信：后来，我回读了这一页。',related:'reply',revisit:true},
    keep: {date:'2026.09.04 · 留下',quote:'画的过程当下被延长并经由我的画笔进行再创造',connection:'主题呼应 ← 06.03 火苗：当时的疑问，在一次具体的描画中得到新的经验。',related:'spark'},
    reply: {date:'2026.09.09 · 回信',quote:'所以在行动当中，这些你尚未知道的，你已经拥有的部分，将会一一显现。',connection:'真实回访 ↔ 07.29 允许：九月的自己补充了七月尚未看见的部分。',related:'allow',revisit:true},
    form: {date:'2026.09.21 · 化形',quote:'感受像是汹涌的波涛\n化为文字或是涂鸦',connection:'主题呼应 ← 09.04 留下：从具体的手绘，走向对创作感受的表达。',related:'keep'},
    weave: {date:'2026.09.28 · 交织',quote:'并与伙伴交织自己的根系\n我们似乎有着无限的可能',connection:'向未来敞开：还会有新的相遇，也会有新的文字。',related:'form'}
  };
  stars.forEach(star => star.addEventListener('click', () => {
    const selected = excerpts[star.dataset.timeEcho];
    stars.forEach(item => {
      item.setAttribute('aria-pressed', String(item === star));
      item.classList.toggle('is-related', item.dataset.timeEcho === selected.related);
    });
    map.classList.toggle('has-return', Boolean(selected.revisit));
    reading.querySelector('.time-echo-reading-date').textContent = selected.date;
    reading.querySelector('.time-echo-quote').textContent = selected.quote;
    reading.querySelector('.time-echo-connection').textContent = selected.connection;
  }));
})();
