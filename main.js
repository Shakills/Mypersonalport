// ═══ AUDIO & VOICE SYSTEM ═══
var AudioFX = {
    ctx: null,
    init: function () {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    playAlarm: function () {
        this.init(); if (this.ctx.state === 'suspended') this.ctx.resume();
        var ct = this.ctx.currentTime;
        // Stage 1: Extreme Cinematic Sub-Bass Impact
        for (var i = 0; i < 2; i++) {
            var o1 = this.ctx.createOscillator(), g1 = this.ctx.createGain();
            o1.type = 'sine'; o1.frequency.setValueAtTime(140 - (i * 20), ct);
            o1.frequency.exponentialRampToValueAtTime(40, ct + 0.8);
            g1.gain.setValueAtTime(0.6, ct); g1.gain.exponentialRampToValueAtTime(0.001, ct + 0.8);
            o1.connect(g1); g1.connect(this.ctx.destination); o1.start(ct); o1.stop(ct + 0.8);
        }

        // Stage 2: Rapid Digital "Breach" Scantone
        [1800, 2200, 1900, 2500].forEach((freq, i) => {
            var o2 = this.ctx.createOscillator(), g2 = this.ctx.createGain();
            o2.type = 'sawtooth'; o2.frequency.setValueAtTime(freq, ct + 0.4 + (i * 0.07));
            g2.gain.setValueAtTime(0.1, ct + 0.4 + (i * 0.07));
            g2.gain.exponentialRampToValueAtTime(0.001, ct + 0.4 + (i * 0.07) + 0.05);
            o2.connect(g2); g2.connect(this.ctx.destination);
            o2.start(ct + 0.4 + (i * 0.07)); o2.stop(ct + 0.4 + (i * 0.07) + 0.05);
        });
    },
    playLock: function () {
        this.init(); if (this.ctx.state === 'suspended') this.ctx.resume();
        var o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(120, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.6);
        g.gain.setValueAtTime(0.4, this.ctx.currentTime); g.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
        o.connect(g); g.connect(this.ctx.destination); o.start(); o.stop(this.ctx.currentTime + 0.6);
    },
    playUnlock: function () {
        this.init(); if (this.ctx.state === 'suspended') this.ctx.resume();
        [900, 1400, 500].forEach((freq, i) => {
            var o = this.ctx.createOscillator(), g = this.ctx.createGain();
            o.type = i === 2 ? 'sine' : 'square';
            o.frequency.setValueAtTime(freq, this.ctx.currentTime + (i * 0.06));
            g.gain.setValueAtTime(0.12, this.ctx.currentTime + (i * 0.06));
            g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (i * 0.06) + 0.15);
            o.connect(g); g.connect(this.ctx.destination); o.start(this.ctx.currentTime + (i * 0.06)); o.stop(this.ctx.currentTime + (i * 0.06) + 0.15);
        });
    }
};

// ═══ CENTRALIZED VOICE SYSTEM (SYCHRONIZED) ═══
var PreferredVoice = null;
function initVoiceSelection() {
    var voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        PreferredVoice = voices.find(v => (v.name.includes('Aria') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria')) && (v.name.includes('Female') || v.name.includes('female'))) ||
            voices.find(v => v.lang.includes('en-US') && (v.name.includes('Female') || v.name.includes('female'))) ||
            voices.find(v => v.name.includes('Samantha') || v.name.includes('Zira')) ||
            voices[0];
    }
}
window.speechSynthesis.onvoiceschanged = initVoiceSelection;
initVoiceSelection();

function speak(text) {
    if (!window.speechSynthesis) return;
    if (!PreferredVoice) initVoiceSelection();
    var msg = new SpeechSynthesisUtterance(text);
    msg.voice = PreferredVoice;
    msg.pitch = 1.08; msg.rate = 1.0;
    window.speechSynthesis.speak(msg);
}


// ═══ HACKER PRELOADER RESTORATION ═══
(function () {
    var canvas = document.getElementById('binary-canvas');
    var logsContainer = document.getElementById('status-logs');
    var loader = document.getElementById('hacker-loader');
    var textEl = document.getElementById('loader-text');
    if (!canvas) return;

    var ctx = canvas.getContext('2d'), W, H, fontSize = 16, columns, drops = [];
    var matrixColor = '#e81c2e';

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        columns = Math.floor(W / fontSize);
        for (var i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    }
    window.addEventListener('resize', resize); resize();

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = matrixColor; ctx.font = fontSize + 'px "JetBrains Mono"';
        for (var i = 0; i < drops.length; i++) {
            ctx.fillText(Math.floor(Math.random() * 2), i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > H && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    var matrixInt = setInterval(draw, 33);

    var logs = [
        { t: "INITIALIZING_BREACH_SEQUENCE...", c: "" },
        { t: "TRACING_IP_ADDRESS: [192.168.1.1]", c: "warning" },
        { t: "ESTABLISHING_ENCRYPTED_DARK_LINK...", c: "" },
        { t: "BYPASSING_PHASE_1_FIREWALL...", c: "success" },
        { t: "DECRYPTING_SYSTEM_ROOT_KEYS...", c: "" },
        { t: "INJECTING_PAYLOAD_V3.0.4...", c: "warning" },
        { t: "REMOTE_ACCESS_GRANTED: [OK]", c: "success" },
        { t: "UPLOADING_SENSITIVE_DATA...", c: "" },
        { t: "CLEANING_LOGS... ACCESSING_PORTAL...", c: "success" }
    ];

    function addStatusLine(index) {
        if (!logsContainer || index >= logs.length) return;
        var line = document.createElement('div');
        line.className = 'status-line' + (logs[index].c ? ' ' + logs[index].c : '');
        line.innerHTML = logs[index].t;

        // Add occasional flicker
        if (Math.random() > 0.8) line.style.animationDuration = (0.1 + Math.random() * 0.3) + 's';

        logsContainer.appendChild(line);
        logsContainer.scrollTop = logsContainer.scrollHeight;

        setTimeout(function () { addStatusLine(index + 1); }, 400 + Math.random() * 400);
    }

    // VISUALS START IMMEDIATELY
    window.addEventListener('load', function () {
        var authEl = document.getElementById('auth-trigger');

        // STAGE 1: INITIAL AUTOMATED GLITCH
        var gWrapper = document.getElementById('glitch-wrapper');
        if (gWrapper) {
            gWrapper.classList.add('auth-glitch');
            setTimeout(function () {
                gWrapper.classList.remove('auth-glitch');
                // STAGE 2: REVEAL AUTH PROMPT AFTER 1.2S
                if (authEl) authEl.classList.add('visible');
            }, 1200);
        }

        addStatusLine(0);

        var hasTriggered = false;
        var unlockAudio = function () {
            if (hasTriggered) return;
            // Only allow trigger if auth prompt is visible
            if (!authEl || !authEl.classList.contains('visible')) return;

            hasTriggered = true;
            if (authEl) {
                authEl.classList.remove('visible');
                authEl.classList.add('hidden');
            }

            // STAGE 3: SYSTEM BREACH GLITCH & AUDIO
            if (gWrapper) {
                gWrapper.classList.add('auth-glitch');
                setTimeout(() => gWrapper.classList.remove('auth-glitch'), 800);
            }

            // Resume and Play Cinematic Alarm
            AudioFX.init();
            if (AudioFX.ctx && AudioFX.ctx.state === 'suspended') AudioFX.ctx.resume();

            // PURE AUDIO FOR PHASE 1 - NO VOICE
            AudioFX.playAlarm();
            setTimeout(function () {
                AudioFX.playLock();
                // speak("Security breach detected"); // REMOVED AS REQUESTED
            }, 600);

            // Remove listeners
            ['mousedown', 'touchstart', 'keydown'].forEach(e => document.removeEventListener(e, unlockAudio));
        };

        ['mousedown', 'touchstart', 'keydown'].forEach(e => document.addEventListener(e, unlockAudio));

        // Phase 2 sequence starts once audio is unlocked
        var checkTrigger = setInterval(function () {
            if (hasTriggered) {
                clearInterval(checkTrigger);

                // Phase 2: AUTHORIZED Success State (3.2s after trigger)
                setTimeout(function () {
                    if (loader) loader.classList.add('authorized');
                    matrixColor = '#00ff41';
                    if (textEl) {
                        textEl.innerHTML = "AUTHORIZED<br><span style='font-size:1.45rem; opacity:0.8; letter-spacing:0.05em;'>Your destination is loading...</span>";
                        textEl.setAttribute('data-text', "AUTHORIZED");
                    }
                    AudioFX.playUnlock();
                    speak("Access approved. Authorizing user.");
                }, 3200);

                // Final Transition: Glitch to Home (6.8s after trigger)
                setTimeout(function () {
                    document.body.classList.add('home-glitch');
                    setTimeout(function () {
                        if (loader) loader.classList.add('hidden');
                        document.body.classList.remove('home-glitch');
                        clearInterval(matrixInt);
                        // ABSOLUTE HOME LANDING
                        var homeSec = document.getElementById('home');
                        if (homeSec) homeSec.scrollIntoView({ behavior: 'instant' });
                        window.scrollTo(0, 0);
                        setTimeout(function () {
                            if (loader) loader.remove();
                            document.documentElement.scrollTop = 0;
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }, 600);
                    }, 450);
                }, 6800);
            }
        }, 100);
    });
})();

// ═══ CANVAS BACKGROUND ═══
(function () {
    var canvas = document.getElementById('bg-canvas'), ctx = canvas.getContext('2d');
    var W, H, particles = [], mouse = { x: -1000, y: -1000 };
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    function Particle() {
        this.reset = function () {
            this.x = Math.random() * W; this.y = Math.random() * H;
            this.vx = (Math.random() - .5) * .3; this.vy = (Math.random() - .5) * .3;
            this.r = Math.random() * 1.5 + .3; this.a = Math.random() * .5 + .1;
            this.life = Math.random() * 200 + 100; this.age = 0;
        };
        this.reset(); this.age = Math.random() * this.life;
    }
    for (var i = 0; i < 120; i++)particles.push(new Particle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i]; p.age++;
            if (p.age > p.life) { p.reset(); continue; }
            var dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) { p.vx += dx / dist * .04; p.vy += dy / dist * .04; }
            p.x += p.vx; p.y += p.vy; p.vx *= .99; p.vy *= .99;
            var alpha = p.a * (1 - p.age / p.life);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(232,28,46,' + alpha + ')'; ctx.fill();
        }
        // draw connections
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 80) {
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(232,28,46,' + (0.06 * (1 - d / 80)) + ')'; ctx.lineWidth = .5; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ═══ CUSTOM CURSOR ═══
var cur = document.getElementById('cur'), ring = document.getElementById('curRing');
var mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; spawnTrail(e.clientX, e.clientY); });
(function animC() {
    if (cur && ring) {
        cur.style.left = (mx - 4) + 'px'; cur.style.top = (my - 4) + 'px';
        rx += (mx - rx) * .1; ry += (my - ry) * .1;
        ring.style.left = (rx - 20) + 'px'; ring.style.top = (ry - 20) + 'px';
    }
    requestAnimationFrame(animC);
})();
document.querySelectorAll('a,button,.skill-card,.stat-card,.project-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { cur.classList.add('big'); ring.style.transform = 'scale(1.5)'; ring.style.opacity = '.2'; });
    el.addEventListener('mouseleave', function () { cur.classList.remove('big'); ring.style.transform = 'scale(1)'; ring.style.opacity = '.6'; });
});

// ═══ CURSOR TRAIL ═══
function spawnTrail(x, y) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;left:' + (x - 2) + 'px;top:' + (y - 2) + 'px;width:4px;height:4px;border-radius:50%;background:rgba(232,28,46,.6);pointer-events:none;z-index:9990;transition:all .5s ease;';
    document.body.appendChild(t);
    setTimeout(function () { t.style.transform = 'scale(3)'; t.style.opacity = '0'; }, 10);
    setTimeout(function () { t.remove(); }, 500);
}

// ═══ TYPING ANIMATION ═══
var phrases = ['> Exploring cybersecurity...', '> Building cool projects...', '> Learning every day...', '> Breaking into IT...', '> Protecting digital worlds...'];
var pi = 0, ci = 0, deleting = false, elTyped = document.getElementById('typed-text');
function type() {
    if (!elTyped) return;
    var phrase = phrases[pi];
    if (!deleting) {
        elTyped.textContent = phrase.slice(0, ci + 1); ci++;
        if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
        elTyped.textContent = phrase.slice(0, ci - 1); ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
}
setTimeout(type, 1200);

// ═══ VISIT COUNTER ═══
var count = Math.floor(Math.random() * 300) + 847;
var elCounter = document.getElementById('visit-counter');
if (elCounter) elCounter.textContent = 'VIEWS: ' + count;

// ═══ SCROLL REVEAL ═══
var revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
setTimeout(function () { revEls.forEach(function (r) { r.classList.add('visible'); }); }, 2000);
if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e, i) {
            if (e.isIntersecting) { setTimeout(function () { e.target.classList.add('visible'); }, i * 70); }
        });
    }, { threshold: .05, rootMargin: '0px 0px -30px 0px' });
    revEls.forEach(function (r) { obs.observe(r); });
}

// ═══ COUNTER ANIMATION ═══
function animCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var current = 0, step = target / 40;
    var t = setInterval(function () { current = Math.min(current + step, target); el.textContent = Math.floor(current) + (current >= target ? '+' : ''); if (current >= target) clearInterval(t); }, 40);
}
var cobs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { animCounter(e.target); cobs.unobserve(e.target); } });
}, { threshold: .5 });
document.querySelectorAll('.counter').forEach(function (el) { cobs.observe(el); });

// ═══ SKILL BARS ═══
var bobs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting) {
            var pct = e.target.getAttribute('data-pct');
            setTimeout(function () { e.target.style.width = pct + '%'; }, 200);
            bobs.unobserve(e.target);
        }
    });
}, { threshold: .3 });
document.querySelectorAll('.skill-bar').forEach(function (b) { bobs.observe(b); });

// ═══ SKILL CARD MOUSE GLOW ═══
document.querySelectorAll('.skill-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
});

// ═══ GSAP ANIMATIONS ═══
document.addEventListener('DOMContentLoaded', () => {
    // GSAP Initial State
    gsap.set(".hero-name .accent", { x: -50, opacity: 0 });
    gsap.set(".hero-name", { scale: 0.8, opacity: 0 });
    gsap.set(".hero-badge", { y: 20, opacity: 0 });

    // Hero Animation Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero-name", { scale: 1, opacity: 1, duration: 1.5 })
        .to(".hero-name .accent", { x: 0, opacity: 1, duration: 1 }, "-=1")
        .to(".hero-badge", { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(".photo-ring", { scale: 0.5, opacity: 0, duration: 1.5, ease: "back.out(1.7)" }, "-=1.2");

    // Scroll Reveal Animations
    gsap.utils.toArray('.reveal').forEach(section => {
        gsap.from(section.querySelectorAll('.sec-label, .sec-title, .about-text, .skill-card, .project-card, .exp-item'), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Magnetic Badges
    document.querySelectorAll('.hero-badge').forEach(badge => {
        badge.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { clientWidth, clientHeight } = target;
            const x = (offsetX - clientWidth / 2) / 5;
            const y = (offsetY - clientHeight / 2) / 5;
            gsap.to(badge, { x: x, y: y, duration: 0.3 });
        });
        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, { x: 0, y: 0, duration: 0.3 });
        });
    });
});

// ═══ CLICK EXPLOSION ═══
document.addEventListener('click', function (e) {
    for (var i = 0; i < 12; i++) {
        var p = document.createElement('div');
        var angle = Math.random() * Math.PI * 2, speed = Math.random() * 80 + 30;
        var vx = Math.cos(angle) * speed, vy = Math.sin(angle) * speed;
        p.style.cssText = 'position:fixed;left:' + (e.clientX - 3) + 'px;top:' + (e.clientY - 3) + 'px;width:6px;height:6px;border-radius:50%;background:var(--r);pointer-events:none;z-index:9995;transition:all .6s cubic-bezier(.25,.46,.45,.94);';
        document.body.appendChild(p);
        setTimeout(function (el, dx, dy) { el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0)'; el.style.opacity = '0'; }, 10, p, vx, vy);
        setTimeout(function (el) { el.remove(); }, 700, p);
    }
});
