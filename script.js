(function(){try{function kill(){try{document.body.classList.remove('loading-state','loading','is-loading','preload','no-js');document.documentElement.classList.remove('loading-state','loading','is-loading','preload','no-js');document.querySelectorAll('#preloader,.preloader,#pre-loader,.pre-loader,#loading-overlay,.loading-overlay,#loading-screen,.loading-screen,.site-preloader,.page-preloader').forEach(function(n){n.style.display='none';n.style.opacity='0';n.style.visibility='hidden';n.style.pointerEvents='none';setTimeout(function(){try{n.remove()}catch(e){}},50);});}catch(e){}}kill();document.addEventListener('DOMContentLoaded',kill);window.addEventListener('load',function(){kill();setTimeout(kill,300);setTimeout(kill,1500);});}catch(e){}})();
(function(){try{
    var conventions=[
      {sel:'.scroll-reveal',add:'is-visible'},
      {sel:'.reveal',add:'active'},
      {sel:'.fade-in',add:'visible'},
      {sel:'.slide-in',add:'visible'},
      {sel:'.animate-on-scroll',add:'animated'},
      {sel:'.animate-on-load',add:'in-view'},
      {sel:'[data-aos]',add:'aos-animate'},
      {sel:'[data-reveal]',add:'in-view'},
      {sel:'[data-scroll]',add:'is-inview'},
      {sel:'[data-animate]',add:'is-visible'},
      {sel:'.animate:not(.animated)',add:'animated'},
      {sel:'.will-animate',add:'animated'},
      {sel:'.fade-up',add:'is-visible'},
      {sel:'.fade-down',add:'is-visible'},
      {sel:'.zoom-in',add:'is-visible'}
    ];
    // Force inline opacity/visibility with !important so the element stays
    // visible no matter which class-name convention the AI-written CSS uses
    // (.is-visible vs .animated vs .visible vs …). Without this, the emergency
    // animation's forwards-held state gets DROPPED when IO adds .animated (its
    // :not(.animated) selector stops matching → animation removed → opacity
    // reverts to the base rule's 0). Transform is left cleared, not forced, so
    // hover translations on cards still work.
    function makeVisible(el,cls){el.classList.add(cls);el.style.setProperty('opacity','1','important');el.style.setProperty('visibility','visible','important');el.style.transform='';}
    if(!('IntersectionObserver' in window)){
      conventions.forEach(function(c){document.querySelectorAll(c.sel).forEach(function(el){makeVisible(el,c.add);});});
      return;
    }
    conventions.forEach(function(c){
      var els=document.querySelectorAll(c.sel);
      if(!els.length)return;
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(e){if(e.isIntersecting){makeVisible(e.target,c.add);io.unobserve(e.target);}});
      },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
      els.forEach(function(el){io.observe(el);});
    });
    // Backstop 1: after 2.5s force-reveal anything still hidden by known convention.
    setTimeout(function(){
      conventions.forEach(function(c){document.querySelectorAll(c.sel).forEach(function(el){makeVisible(el,c.add);});});
    },2500);

    // Backstop 2 (ABSOLUTE): after 3.5s walk every direct child of every
    // <section>/<main>/<article>. Any element whose computed opacity is 0 AND
    // is not deliberately-hidden UI (dropdown, modal, tooltip, popover,
    // preloader, cookie banner — those SHOULD stay hidden until interaction)
    // gets force-revealed. Class-name-agnostic — works no matter what
    // convention Gemini invents next. This is the "cannot recur" guarantee.
    var deliberateHideSel='dropdown,submenu,sub-menu,mega-menu,tooltip,popover,modal,dialog,overlay,cookie,consent,preloader,pre-loader,loading,offscreen,collapsed,accordion-content,tab-panel,tab-content';
    function isDeliberatelyHidden(el){
      var e=el;while(e && e.classList){
        for(var i=0;i<e.classList.length;i++){var c=e.classList[i].toLowerCase();
          if(deliberateHideSel.split(',').some(function(k){return c.indexOf(k)!==-1;}))return true;
        }
        if(e.hasAttribute && (e.hasAttribute('hidden')||e.getAttribute('aria-hidden')==='true'||e.getAttribute('role')==='dialog'||e.getAttribute('role')==='menu'||e.getAttribute('role')==='tooltip'))return true;
        e=e.parentElement;
      }
      return false;
    }
    setTimeout(function(){
      var containers=document.querySelectorAll('section,main,article,[class*="section"],[class*="Section"]');
      containers.forEach(function(c){
        c.querySelectorAll('*').forEach(function(el){
          if(!el.isConnected||isDeliberatelyHidden(el))return;
          try{
            var cs=getComputedStyle(el);
            if(cs.opacity==='0'||cs.visibility==='hidden'){
              el.style.setProperty('opacity','1','important');
              el.style.setProperty('visibility','visible','important');
              el.style.setProperty('transform','none','important');
              el.style.setProperty('animation','none','important');
            }
          }catch(e){}
        });
      });
    },3500);
  }catch(e){}})();
/**
 * ForgeAI Builder: abd. Literary Journal
 * Interactive Logic & Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll-Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('section, article.card, .contact-form-box, .contact-info');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    // 2. Archive Filtering Logic
    const archiveContainer = document.getElementById('archive-posts-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (archiveContainer && filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update UI state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const posts = archiveContainer.querySelectorAll('.card');

                posts.forEach(post => {
                    if (filter === 'all' || post.getAttribute('data-category') === filter) {
                        post.style.display = 'flex';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Form Submission Feedback (Simple Validation)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sent.';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                form.reset();
            }, 3000);
        });
    });

    // 4. Smooth Scrolling for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Dynamic Navbar Scroll Effect
    const nav = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        lastScroll = currentScroll;
    });

    // 6. Global Hover Effects for Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s ease';
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

/**
 * Add these required styles to styles.css to support the script:
 * 
 * .reveal-init { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
 * .reveal-active { opacity: 1; transform: translateY(0); }
 * .nav-scrolled { background: rgba(17, 19, 14, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
 */
/* Mobile hamburger nav */
(function(){
  function enhance(){
    var navs = document.querySelectorAll('header nav, .site-header nav, .navbar nav, header .nav-links');
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var header = nav.closest('header, .site-header, .navbar, .main-header') || nav.parentElement;
      if (!header || header.querySelector('.nav-toggle')) continue;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'nav-toggle'; btn.setAttribute('aria-label', 'Toggle menu');
      btn.innerHTML = '<span></span><span></span><span></span>';
      (function(nav){
        btn.addEventListener('click', function(){ nav.classList.toggle('nav-open'); });
        nav.addEventListener('click', function(e){ if (e.target && e.target.closest && e.target.closest('a')) nav.classList.remove('nav-open'); });
      })(nav);
      // Insert into the nav's own flex row (with the brand) so it sits level with
      // the logo — not appended to the outer <header> where it drops to a new line.
      (nav.parentElement || header).appendChild(btn);
    }
  }
  if (document.readyState !== 'loading') enhance(); else document.addEventListener('DOMContentLoaded', enhance);
  try { new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
})();
