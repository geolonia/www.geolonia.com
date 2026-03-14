(function () {
  document.querySelectorAll('.markdown-content pre').forEach(function (pre) {
    var lang = pre.getAttribute('data-language');
    if (!lang || !pre.parentNode) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var label = document.createElement('span');
    label.className = 'code-lang-label';
    label.textContent = lang;
    wrapper.appendChild(label);

    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      if (!code) return;

      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        btn.textContent = 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
        return;
      }

      navigator.clipboard.writeText(code.textContent || '').then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        btn.textContent = 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
      });
    });
    wrapper.appendChild(btn);
  });
})();
