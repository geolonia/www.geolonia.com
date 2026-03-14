(function () {
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  var body = document.body;

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      var isActive = mobileMenuBtn.classList.toggle('active');
      if (mobileNavOverlay) mobileNavOverlay.classList.toggle('active');

      if (isActive) {
        body.style.overflow = 'hidden';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function (e) {
      if (e.target === mobileNavOverlay) {
        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        mobileNavOverlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  document.querySelectorAll('.mobile-menu-item-has-children > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var parentLi = link.parentElement;
      if (parentLi) {
        e.preventDefault();
        parentLi.classList.toggle('active');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
      if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  });
})();
