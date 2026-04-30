// script.js
document.addEventListener("DOMContentLoaded", () => {
    // 0. Dynamic 60-Second Sprints (12 Datasets)
    const sprintLessons = [
        { title: "What is an ETF?", content: "An Exchange-Traded Fund is a basket of securities you buy or sell through a brokerage firm on a stock exchange.", icon: "landmark", color: "neon-purple" },
        { title: "Compound Interest", content: "Interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods.", icon: "percent", color: "neon-blue" },
        { title: "Emergency Fund", content: "A stash of money set aside to cover the financial surprises life throws your way, ideally 3-6 months of expenses.", icon: "shield-alert", color: "neon-green" },
        { title: "What is Inflation?", content: "The rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling.", icon: "trending-up", color: "neon-pink" },
        { title: "Cash Liquidity", content: "How quickly you can get your hands on your cash. Some investments are 'liquid' (easy to sell) and some are 'illiquid'.", icon: "wallet", color: "neon-orange" },
        { title: "Diversification", content: "Don't put all your eggs in one basket. Spreading investments across various assets to reduce risk.", icon: "layout-grid", color: "neon-blue" },
        { title: "What is Net Worth?", content: "Everything you own (assets) minus everything you owe (liabilities). It's your financial report card.", icon: "user-check", color: "neon-purple" },
        { title: "Credit Score", content: "A number between 300–850 that depicts a consumer's creditworthiness. The higher the score, the better.", icon: "credit-card", color: "neon-green" },
        { title: "Magic of SIP", content: "Systematic Investment Plan allows you to invest small amounts regularly in mutual funds, benefiting from Rupee Cost Averaging.", icon: "repeat", color: "neon-pink" },
        { title: "Asset Allocation", content: "Balancing risk and reward by dividing your portfolio's assets according to your goals and risk tolerance.", icon: "pie-chart", color: "neon-blue" },
        { title: "Bull vs Bear", content: "A bull market is when prices are rising (optimism); a bear market is when prices are falling (pessimism).", icon: "activity", color: "neon-orange" },
        { title: "What are Dividends?", content: "A portion of a company's earnings distributed to its shareholders. It's like getting paid just for owning a stock.", icon: "coins", color: "neon-green" },
        { title: "Crypto Basics", content: "Decentralized digital currency based on blockchain technology. High volatility, high potential, high risk.", icon: "bitcoin", color: "neon-orange" },
        { title: "Tax Harvesting", content: "Selling securities at a loss to offset a capital gains tax liability. It's a legal way to lower your tax bill.", icon: "scissors", color: "neon-pink" },
        { title: "Hedge Funds", content: "Limited partnerships of investors that use high-risk methods, such as investing with borrowed money, in hopes of large gains.", icon: "briefcase", color: "neon-purple" },
        { title: "Short Selling", content: "A strategy that profits from a decline in a stock's price. You borrow shares, sell them, and buy them back cheaper.", icon: "trending-down", color: "neon-red" }
    ];

    const sprintsContainer = document.getElementById('sprints-container');
    if (sprintsContainer) {
        // Better shuffle logic
        const shuffled = [...sprintLessons]
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
            
        const selected = shuffled.slice(0, 3);
        
        sprintsContainer.innerHTML = selected.map(lesson => `
            <div class="w-full sm:w-72 h-[22rem] relative group cursor-pointer stagger-card" style="perspective: 1000px;">
                <div class="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <!-- Front -->
                    <div class="absolute inset-0 glass-card rounded-2xl p-6 flex flex-col justify-center items-center [backface-visibility:hidden] border border-border">
                        <div class="w-20 h-20 rounded-full bg-${lesson.color}/10 flex items-center justify-center mb-6 text-${lesson.color}">
                            <i data-lucide="${lesson.icon}" class="w-10 h-10"></i>
                        </div>
                        <h4 class="font-display font-bold text-2xl mb-2 text-white text-center">${lesson.title}</h4>
                        <span class="text-xs text-slate-500 uppercase tracking-widest mt-auto">Tap to flip</span>
                    </div>
                    <!-- Back -->
                    <div class="absolute inset-0 glass-card bg-${lesson.color}/10 rounded-2xl p-6 flex flex-col justify-center items-center [backface-visibility:hidden] border border-${lesson.color}/30 [transform:rotateY(180deg)]">
                        <p class="text-base text-slate-200 text-center leading-relaxed font-medium">${lesson.content}</p>
                        <div class="mt-6 px-4 py-1.5 bg-${lesson.color}/20 rounded-full text-${lesson.color} text-sm font-bold">+10 XP</div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-initialize Lucide icons for new elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Refresh ScrollTrigger as the DOM height has changed
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time)=>{
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Intercept anchor clicks for smooth scrolling via Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    // Smoothly scroll to the target, offsetting for the fixed navbar
                    lenis.scrollTo(targetElement, { offset: -80, duration: 1.5 });
                    
                    // Close mobile menu if it's open
                    if (typeof toggleMenu === 'function' && document.getElementById('mobile-menu').classList.contains('active')) {
                        toggleMenu(false);
                    }
                }
            });
        });
    }

    // Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (active) => {
        if (active) {
            mobileMenu.classList.remove('hidden');
            gsap.to(mobileMenu, {
                x: 0, opacity: 1, duration: 0.5, ease: "power3.out",
                onStart: () => mobileMenu.classList.add('active')
            });
        } else {
            gsap.to(mobileMenu, {
                x: '100%', opacity: 0, duration: 0.4, ease: "power3.in",
                onComplete: () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('active');
                }
            });
        }
    };

    if (menuToggle) menuToggle.addEventListener('click', () => toggleMenu(true));
    if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // Initial Navbar State
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'bg-dark/80');
        } else {
            nav.classList.remove('shadow-lg', 'bg-dark/80');
        }
    });

    // Hero Section Animations
    const tl = gsap.timeline();
    
    tl.from(".nav-anim", {
        y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out"
    })
    .from(".hero-badge", {
        y: 20, opacity: 0, duration: 0.5, ease: "power3.out"
    }, "-=0.3")
    .from(".hero-title-line", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power4.out", rotationX: -20, transformOrigin: "0% 50% -50"
    }, "-=0.2")
    .from(".hero-subtitle", {
        y: 20, opacity: 0, duration: 0.6, ease: "power3.out"
    }, "-=0.4")
    .from(".hero-cta", {
        y: 20, opacity: 0, duration: 0.5, ease: "power3.out"
    }, "-=0.2")
    .from(".hero-visual-element", {
        x: 50, opacity: 0, duration: 0.8, ease: "power3.out"
    }, "-=0.4");

    // Parallax effect on mouse move for hero - Only for Desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            gsap.to(".hero-parallax", {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
            
            gsap.to(".hero-parallax-reverse", {
                x: -x * 2,
                y: -y * 2,
                duration: 1,
                ease: "power2.out"
            });

            // Interactive Background Glow Tracking
            gsap.to("#interactive-glow", {
                x: e.clientX,
                y: e.clientY,
                duration: 1.5,
                ease: "power3.out"
            });
        });
        
        // Dynamic Glow Pulsing
        gsap.to("#interactive-glow", {
            scale: 1.1,
            opacity: 0.45,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Advanced Button Interactive Engine - Only for Desktop
    if (!isTouchDevice) {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Update Spotlight Position
                btn.style.setProperty('--x', `${x}px`);
                btn.style.setProperty('--y', `${y}px`);
                
                // Subdued 3D Tilt Effect
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15; // More subtle divisor
                const rotateY = (centerX - x) / 15;
                
                gsap.to(btn, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    scale: 1.01, // Minimal scale
                    duration: 0.5,
                    ease: "power2.out",
                    transformPerspective: 1000
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mousedown', () => {
                gsap.to(btn, { scale: 0.98, duration: 0.1 });
            });

            btn.addEventListener('mouseup', () => {
                gsap.to(btn, { scale: 1, duration: 0.2 });
            });
        });
    }

    // Section reveals
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Refresh ScrollTrigger after all initializations
    ScrollTrigger.refresh();

    // Cards stagger animation
    gsap.utils.toArray(".stagger-cards").forEach(container => {
        const cards = container.querySelectorAll(".stagger-card");
        gsap.from(cards, {
            scrollTrigger: {
                trigger: container,
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out"
        });
    });

    // 3D Tilt effect for cards - Only for Desktop
    if (!isTouchDevice) {
        const tiltCards = document.querySelectorAll(".tilt-card");
        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                const highlight = card.querySelector(".card-highlight");
                if (highlight) {
                    gsap.to(highlight, {
                        x: x - highlight.offsetWidth / 2,
                        y: y - highlight.offsetHeight / 2,
                        opacity: 1,
                        duration: 0.2
                    });
                }
            });
            
            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                const highlight = card.querySelector(".card-highlight");
                if (highlight) {
                    gsap.to(highlight, { opacity: 0, duration: 0.2 });
                }
            });
        });
    }

    // Fill XP Bars on scroll
    gsap.utils.toArray(".xp-fill").forEach(bar => {
        const targetWidth = bar.getAttribute("data-width") || "100%";
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 85%",
            },
            width: targetWidth,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.3
        });
    });

    // 1. Live Bull-Run Chart Animation
    const bullRunMask = document.getElementById("bull-run-mask");
    const bullRunDot = document.getElementById("bull-run-dot");
    if(bullRunMask && bullRunDot) {
        ScrollTrigger.create({
            trigger: "#arcade-chart-container",
            start: "top 85%",
            onEnter: () => {
                gsap.to(bullRunMask, { width: "100%", duration: 2, ease: "power2.inOut" });
                gsap.to(bullRunDot, { opacity: 1, duration: 0.2 });
                gsap.fromTo(bullRunDot, 
                    { left: "0%" }, 
                    { left: "100%", duration: 2, ease: "power2.inOut", 
                      onUpdate: function() {
                          const progress = this.progress();
                          let yPos = "10%";
                          if(progress < 0.1) yPos = "90%";
                          else if(progress < 0.2) yPos = "76%";
                          else if(progress < 0.35) yPos = "80%";
                          else if(progress < 0.5) yPos = "50%";
                          else if(progress < 0.65) yPos = "60%";
                          else if(progress < 0.8) yPos = "30%";
                          else if(progress < 0.9) yPos = "40%";
                          else yPos = "10%";
                          bullRunDot.style.top = yPos;
                      }
                    }
                );
            }
        });
    }

    // RPG Damage Numbers on BUY/SELL
    const btnBuy = document.getElementById('btn-buy');
    const btnSell = document.getElementById('btn-sell');
    const spawnDamageNumber = (btn, text, colorClass) => {
        const num = document.createElement('div');
        num.className = `absolute pointer-events-none font-bold text-sm ${colorClass}`;
        num.innerText = text;
        
        const rect = btn.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * rect.width;
        
        num.style.left = `calc(50% + ${offsetX}px)`;
        num.style.top = '0px';
        btn.appendChild(num);
        
        gsap.to(num, {
            y: -50 - Math.random() * 20,
            x: (Math.random() - 0.5) * 30,
            opacity: 0,
            duration: 1 + Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => num.remove()
        });
    };

    if(btnBuy) {
        btnBuy.addEventListener('click', () => spawnDamageNumber(btnBuy, '+ ₹500', 'text-neon-green'));
        btnBuy.addEventListener('mouseenter', () => spawnDamageNumber(btnBuy, '+ ₹150', 'text-neon-green'));
    }
    if(btnSell) {
        btnSell.addEventListener('click', () => spawnDamageNumber(btnSell, '- ₹200', 'text-red-400'));
        btnSell.addEventListener('mouseenter', () => spawnDamageNumber(btnSell, '- ₹50', 'text-red-400'));
    }

    // 5. XP Sparks on Flashcard Hover
    const flashcards = document.querySelectorAll('#learning .stagger-card');
    flashcards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            for(let i=0; i<10; i++) {
                const spark = document.createElement('div');
                spark.className = 'absolute w-1.5 h-1.5 rounded-full bg-neon-purple pointer-events-none z-50';
                spark.style.boxShadow = '0 0 10px var(--neon-purple)';
                spark.style.left = '50%';
                spark.style.top = '50%';
                card.appendChild(spark);
                
                gsap.to(spark, {
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    scale: 0,
                    opacity: 0,
                    duration: 0.5 + Math.random() * 0.5,
                    ease: "power2.out",
                    onComplete: () => spark.remove()
                });
            }
        });
    });

    // 6. Alive Background Grid
    const streamContainer = document.getElementById('data-streams-container');
    if(streamContainer) {
        const createStream = () => {
            const stream = document.createElement('div');
            stream.className = 'absolute w-[1px] bg-gradient-to-b from-transparent via-neon-green/40 to-transparent';
            stream.style.left = `${Math.random() * 100}vw`;
            stream.style.height = `${100 + Math.random() * 200}px`;
            stream.style.top = `-300px`;
            
            streamContainer.appendChild(stream);
            
            gsap.to(stream, {
                y: window.innerHeight + 500,
                duration: 2 + Math.random() * 3,
                ease: "linear",
                onComplete: () => {
                    stream.remove();
                    createStream(); // Loop
                }
            });
        };
        for(let i=0; i<5; i++) {
            setTimeout(createStream, Math.random() * 3000);
        }
    }

    // 7. Leaderboard Rank Up
    const userLeaderboard = document.querySelector('.leaderboard-user');
    const userRank = document.querySelector('.user-rank');
    const userXp = document.querySelector('.user-xp');
    if(userLeaderboard) {
        ScrollTrigger.create({
            trigger: userLeaderboard,
            start: "top 85%",
            onEnter: () => {
                // Animate jumping up
                gsap.to(userLeaderboard, {
                    y: -10,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
                
                // Add a glow
                gsap.to(userLeaderboard, {
                    boxShadow: "0 0 20px rgba(var(--neon-purple-rgb), 0.4)",
                    backgroundColor: "rgba(var(--neon-purple-rgb), 0.2)",
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1
                });

                // Update rank and XP numbers
                setTimeout(() => {
                    if(userRank) userRank.innerText = "2";
                    if(userXp) {
                        let xp = { val: 3850 };
                        gsap.to(xp, {
                            val: 4150,
                            duration: 1,
                            onUpdate: () => {
                                userXp.innerText = Math.floor(xp.val).toLocaleString() + " XP";
                            }
                        });
                    }
                }, 300);
            }
        });
    }

    // 8. Background Audio Syncing (Now handled by audio-manager.js)

    // Base XP state from local storage
    let userState = JSON.parse(localStorage.getItem('pedestalState')) || {
        xp: 0,
        quizCompleted: false,
        streakCount: 1,
        lastVisit: new Date().getTime(),
        lastScrollProgress: 0,
        toastShown: false
    };

    // Evaluate True Streak (Consecutive days)
    const evaluateStreak = () => {
        const lastVisitDate = new Date(userState.lastVisit);
        lastVisitDate.setHours(0,0,0,0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const daysDiff = Math.floor((today.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            // Consecutive day visit
            userState.streakCount += 1;
            userState.lastVisit = new Date().getTime();
        } else if (daysDiff > 1) {
            // Streak broken
            userState.streakCount = 1;
            userState.lastVisit = new Date().getTime();
        } else if (daysDiff === 0) {
            // Same day, just update the exact lastVisit time
            userState.lastVisit = new Date().getTime();
        }
    };
    evaluateStreak();
    
    const saveState = () => localStorage.setItem('pedestalState', JSON.stringify(userState));
    saveState();

    // 9. Live XP Counter (Scroll based, accumulates to max 250 from scrolling)
    const xpCounter = document.getElementById('live-xp-counter');
    const xpToast = document.getElementById('xp-toast');
    const closeToastBtn = document.getElementById('close-toast');
    
    if (xpCounter) {
        setTimeout(() => {
            xpCounter.classList.remove('translate-x-32');
        }, 1500);
    }
    
    window.updateXPUI = () => {
        // Refresh state from storage to catch updates from other scripts (like jigsaw.js)
        userState = JSON.parse(localStorage.getItem('pedestalState')) || userState;
        
        const xpValue = Math.floor(userState.xp);
        
        // Update all XP display elements across the page
        document.querySelectorAll('#xp-number, .final-xp-cta').forEach(el => {
            el.innerText = xpValue;
        });
        
        if (userState.xp >= 250 && !userState.toastShown && xpToast) {
            userState.toastShown = true;
            saveState();
            xpToast.classList.remove('translate-y-[200%]', 'opacity-0');
            xpToast.classList.add('translate-y-0', 'opacity-100');
        }
    };
    window.updateXPUI();
    
    if (closeToastBtn && xpToast) {
        closeToastBtn.addEventListener('click', () => {
            xpToast.classList.remove('translate-y-0', 'opacity-100');
            xpToast.classList.add('translate-y-[200%]', 'opacity-0');
        });
    }

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            if (self.progress > userState.lastScrollProgress) {
                const addedXP = (self.progress - userState.lastScrollProgress) * 250;
                userState.xp += addedXP;
                userState.lastScrollProgress = self.progress;
                updateXPUI();
                saveState();
            }
        }
    });

    // 11. Streak Timer Countdown
    const streakTimer = document.getElementById('streak-timer');
    const streakDayUI = document.getElementById('streak-day');
    
    if (streakTimer) {
        if(streakDayUI) streakDayUI.innerText = userState.streakCount;

        const updateTimer = () => {
            const nowTime = new Date();
            const tomorrow = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1);
            const diff = tomorrow - nowTime;
            
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            streakTimer.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };
        updateTimer();
        setInterval(updateTimer, 1000);
    }

});
