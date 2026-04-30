/**
 * Jigsaw Puzzle Logic
 * Integrates with local storage and global XP system
 */

(function() {
    const puzzleWords = [
  {
    "word": "COMPOUND",
    "subtitle": "INTEREST",
    "color": "#d5f0ff",
    "hint": "What financial superpower turns your interest into even more interest over time?",
    "definition": "Interest on interest. It's not magic, it's math. ₹10k at 12% becomes ₹31k in 10 years.",
    "xp": 150
  },
  {
    "word": "INFLATION",
    "subtitle": "THE TAX",
    "color": "#e5a387",
    "hint": "What invisible thief makes your ₹100 buy less every single year?",
    "definition": "The silent killer of wealth. If inflation is 6%, your ₹100 is only worth ₹94 next year.",
    "xp": 120
  },
  {
    "word": "LIQUIDITY",
    "subtitle": "ACCESS",
    "color": "#6b8fb3",
    "hint": "How fast can you turn your investments into usable cash without losing value?",
    "definition": "Cash is perfectly liquid. Real estate isn't. Always keep 3–6 months of expenses in liquid form.",
    "xp": 130
  },
  {
    "word": "BULL RUN",
    "subtitle": "OPTIMISM",
    "color": "#d5f0ff",
    "hint": "What animal represents a market charging up with extreme greed and rising prices?",
    "definition": "When prices rise 20%+ from recent lows. Greed drives it; caution survives it.",
    "xp": 140
  },
  {
    "word": "RISK",
    "subtitle": "MANAGED",
    "color": "#9a8cb9",
    "hint": "What must you 'budget' for if you're hunting for higher potential returns?",
    "definition": "The price of admission for growth. No risk, no reward. High risk, high potential loss.",
    "xp": 110
  },
  {
    "word": "MUTUAL FUND",
    "subtitle": "POOLED",
    "color": "#d6a6b8",
    "hint": "What pools money from thousands of investors to buy a diverse basket of stocks?",
    "definition": "Professional management for the masses. It spreads your risk across many companies in one move.",
    "xp": 130
  },
  {
    "word": "BUDGET",
    "subtitle": "FREEDOM",
    "color": "#d5f0ff",
    "hint": "What 'boss move' plan tracks every rupee you earn and every rupee you spend?",
    "definition": "A budget doesn't limit freedom — it gives you permission to spend without guilt.",
    "xp": 100
  },
  {
    "word": "EQUITY",
    "subtitle": "OWNERSHIP",
    "color": "#6b8fb3",
    "hint": "What do you truly own when you buy a slice of a company on the stock market?",
    "definition": "Ownership stake. When the company wins, you win. Over decades, equity is king.",
    "xp": 140
  },
  {
    "word": "CREDIT SCORE",
    "subtitle": "TRUST",
    "color": "#e5a387",
    "hint": "What 3-digit number determines if banks will trust you with their capital?",
    "definition": "Your financial reputation. A score of 750+ unlocks lower interest rates and better loans.",
    "xp": 120
  },
  {
    "word": "SIP",
    "subtitle": "CONSISTENCY",
    "color": "#d6a6b8",
    "hint": "What 3-letter strategy beats market timing by investing small amounts on a schedule?",
    "definition": "Systematic Investment Plan. Uses Rupee Cost Averaging — buy more units when prices dip.",
    "xp": 110
  },
  {
    "word": "DIVIDEND",
    "subtitle": "PASSIVE",
    "color": "#9a8cb9",
    "hint": "What cash reward does a company pay you just for holding their stock?",
    "definition": "A share of the profits. The ultimate passive income stream for long-term investors.",
    "xp": 150
  },
  {
    "word": "ETF",
    "subtitle": "BASKET",
    "color": "#6b8fb3",
    "hint": "What low-cost 'basket' of stocks trades on an exchange like a single share?",
    "definition": "Exchange Traded Fund. Like a Mutual Fund but cheaper, more flexible, and instantly tradeable.",
    "xp": 130
  },
  {
    "word": "BEAR MARKET",
    "subtitle": "FEAR",
    "color": "#e5a387",
    "hint": "What animal-named market sees everyone panic-selling as prices crash?",
    "definition": "When prices drop 20%+ from highs. Pessimism rules. Historically, it's the best time to buy.",
    "xp": 140
  },
  {
    "word": "NET WORTH",
    "subtitle": "STATUS",
    "color": "#d5f0ff",
    "hint": "What's left if you sold everything you own and paid off every single debt today?",
    "definition": "The ultimate wealth metric. Assets minus Liabilities. Track it monthly — make it grow.",
    "xp": 160
  },
  {
    "word": "ASSET",
    "subtitle": "INCOME",
    "color": "#6b8fb3",
    "hint": "What do we call something you own that puts money *into* your pocket?",
    "definition": "Stocks, bonds, rentals, businesses. If it makes money while you sleep, it's an asset.",
    "xp": 120
  },
  {
    "word": "DIVERSIFY",
    "subtitle": "STRENGTH",
    "color": "#9a8cb9",
    "hint": "What strategy spreads your money across different assets to reduce the risk of loss?",
    "definition": "Don't put all your eggs in one basket. Diversification is the only free lunch in finance.",
    "xp": 140
  },
  {
    "word": "DEBT TRAP",
    "subtitle": "DANGER",
    "color": "#e5a387",
    "hint": "What vicious cycle occurs when you borrow money just to pay off older debt?",
    "definition": "When EMIs exceed income growth. Minimum payments keep you stuck; extra payments set you free.",
    "xp": 150
  },
  {
    "word": "EMERGENCY FUND",
    "subtitle": "SAFETY NET",
    "color": "#d5f0ff",
    "hint": "What financial cushion protects you when life throws an unexpected curveball?",
    "definition": "3–6 months of expenses kept liquid. It's not an investment — it's insurance for your life.",
    "xp": 130
  },
  {
    "word": "PORTFOLIO",
    "subtitle": "COLLECTION",
    "color": "#d6a6b8",
    "hint": "What word describes the full collection of all your investments in one place?",
    "definition": "Your entire investment profile — stocks, bonds, gold, real estate. Balance it with your goals.",
    "xp": 120
  },
  {
    "word": "VOLATILITY",
    "subtitle": "TURBULENCE",
    "color": "#9a8cb9",
    "hint": "What word describes how wildly and unpredictably an asset's price swings?",
    "definition": "High volatility = high swings = high emotions. It punishes panic sellers and rewards the calm.",
    "xp": 140
  },
  {
    "word": "FD",
    "subtitle": "GUARANTEED",
    "color": "#6b8fb3",
    "hint": "What safe, bank-issued product locks your money away for a fixed return and period?",
    "definition": "Fixed Deposit. Safe and predictable, but inflation often eats up the real returns quietly.",
    "xp": 100
  },
  {
    "word": "INDEX FUND",
    "subtitle": "MARKET",
    "color": "#d5f0ff",
    "hint": "What passive fund simply mirrors a market index like NIFTY 50 automatically?",
    "definition": "Beats most active fund managers over the long run. Low cost, broad exposure, less drama.",
    "xp": 140
  },
  {
    "word": "PPF",
    "subtitle": "LONG TERM",
    "color": "#d6a6b8",
    "hint": "What government-backed tax-free account locks your money for 15 years of safety?",
    "definition": "Public Provident Fund. Exempt–Exempt–Exempt tax status. The ultimate slow, safe wealth builder.",
    "xp": 120
  },
  {
    "word": "REBALANCING",
    "subtitle": "RESET",
    "color": "#9a8cb9",
    "hint": "What process restores your original asset allocation after markets shift things around?",
    "definition": "If equity grows to 80% from 60%, you sell some and buy bonds to restore your target mix.",
    "xp": 150
  },
  {
    "word": "OPPORTUNITY COST",
    "subtitle": "TRADEOFF",
    "color": "#e5a387",
    "hint": "What hidden price do you pay for every choice by giving up the next-best alternative?",
    "definition": "Buying a car instead of investing? The returns you'd have earned are the opportunity cost.",
    "xp": 160
  },
  {
    "word": "CAPITAL GAIN",
    "subtitle": "PROFIT",
    "color": "#6b8fb3",
    "hint": "What do we call the profit earned when you sell an asset for more than you paid?",
    "definition": "Short-term (<1 yr) taxed at 20%. Long-term (>1 yr) taxed at 12.5% in India above ₹1.25L.",
    "xp": 140
  },
  {
    "word": "EXPENSE RATIO",
    "subtitle": "HIDDEN FEE",
    "color": "#d5f0ff",
    "hint": "What annual percentage fee silently drains from your mutual fund returns every year?",
    "definition": "A 1% ratio on ₹10L costs you ₹10k/year. Lower is better — especially for passive index funds.",
    "xp": 130
  },
  {
    "word": "NOMINEE",
    "subtitle": "PROTECTION",
    "color": "#d6a6b8",
    "hint": "What legal designation ensures your assets go to the right person if something happens to you?",
    "definition": "Not the same as a legal heir, but controls who gets your money first. Update it regularly.",
    "xp": 110
  },
  {
    "word": "STEP-UP SIP",
    "subtitle": "ACCELERATE",
    "color": "#9a8cb9",
    "hint": "What upgraded investment strategy increases your SIP amount every year alongside your salary?",
    "definition": "As income grows, your SIP grows too. A 10% annual increase can 2x your corpus over time.",
    "xp": 160
  },
  {
    "word": "RULE OF 72",
    "subtitle": "DOUBLING",
    "color": "#e5a387",
    "hint": "What quick mental math trick tells you exactly how many years your money takes to double?",
    "definition": "Divide 72 by your interest rate. At 12%, your money doubles in 6 years. Simple. Powerful.",
    "xp": 150
  }
];

    let canvas, ctx, wrap;
    let W, H, dpr;
    let pieces = [];
    let dragging = null;
    let dragOff = { x: 0, y: 0 };
    let solvedCount = 0;
    let failAttempts = 0;
    let peekActive = false;
    let currentWord;
    let headerHidden = false;
    let animFrame;

    // XP System Integration with script.js
    function updateGlobalXP(earnedXP) {
        let state = JSON.parse(localStorage.getItem('pedestalState') || '{"xp":0}');
        state.xp = (state.xp || 0) + earnedXP;
        localStorage.setItem('pedestalState', JSON.stringify(state));

        // Update UI
        const xpNumberEl = document.getElementById('xp-number');
        const xpCounterEl = document.getElementById('live-xp-counter');

        // If script.js's updateXPUI exists, use it for consistency
        if (typeof window.updateXPUI === 'function') {
            window.updateXPUI();
        } else if (xpNumberEl) {
            // Fallback animation if updateXPUI is not global
            gsap.to(xpNumberEl, {
                innerText: Math.floor(state.xp),
                duration: 1,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        }

        if (xpCounterEl) {
            xpCounterEl.classList.remove('translate-x-32'); // Ensure it's visible
            gsap.to(xpCounterEl, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }
    }

    function pickWord() {
        currentWord = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
        const hintEl = document.getElementById('hint-text');
        if (hintEl) hintEl.textContent = '"' + currentWord.hint + '"';
    }

    function resize() {
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio, 2);
        W = r.width; H = r.height;
        canvas.width = W * dpr; canvas.height = H * dpr;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createPieces() {
        pieces = []; solvedCount = 0;
        const isMobile = W < 500;
        const letters = currentWord.word.split('').filter(ch => ch !== ' ');
        const n = letters.length;

        let cols, rows;
        // Optimized dynamic grid calculation for longer words
        if (n <= 4) { cols = n; rows = 1; }
        else if (n <= 8) { cols = Math.ceil(n / 2); rows = 2; }
        else if (n <= 12) { cols = Math.ceil(n / 3); rows = 3; }
        else if (n <= 16) { cols = 4; rows = 4; }
        else { cols = 5; rows = Math.ceil(n / 5); }

        const gap = isMobile ? 4 : 8;
        const maxPW = Math.floor((W * 0.94 - gap * (cols + 1)) / cols);
        const maxPH = Math.floor((H * 0.75 - gap * (rows + 1)) / rows);
        
        // Scale base size based on word length to keep pieces manageable
        const baseSizeW = n > 12 ? 80 : (n > 8 ? 95 : 115);
        const baseSizeH = n > 12 ? 100 : (n > 8 ? 115 : 135);
        
        const pw = Math.min(maxPW, isMobile ? 65 : baseSizeW);
        const ph = Math.min(maxPH, isMobile ? 80 : baseSizeH);

        const totalW = cols * pw + (cols - 1) * gap;
        const totalH = rows * ph + (rows - 1) * gap;
        const ox = (W - totalW) / 2;
        const oy = (H - totalH) / 2;
        const padX = pw + 20;
        const padY = ph + 20;

        const scatterPositions = [];
        for (let i = 0; i < n; i++) {
            let sx, sy, attempts = 0, ok = false;
            // Use more of the canvas for scattering when piece count is high
            const spreadFactor = n > 10 ? 0.95 : 0.85;
            while (!ok && attempts < 400) {
                sx = (W * (1 - spreadFactor) / 2) + Math.random() * (W * spreadFactor);
                sy = (H * (1 - spreadFactor) / 2) + Math.random() * (H * spreadFactor);
                ok = true;
                // Collision check with smart distance based on piece size
                for (const sp of scatterPositions) {
                    const distLimit = n > 12 ? 0.6 : 0.8;
                    if (Math.abs(sx - sp.x) < pw * distLimit && Math.abs(sy - sp.y) < ph * distLimit) { ok = false; break; }
                }
                attempts++;
            }
            scatterPositions.push({ x: sx - pw / 2, y: sy - ph / 2 });
        }

        for (let i = 0; i < n; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            // Shift last row to center if it's incomplete
            let rowCols = cols;
            let xOffset = 0;
            const piecesInLastRow = n % cols;
            if (r === rows - 1 && piecesInLastRow > 0) {
                xOffset = (cols - piecesInLastRow) * (pw + gap) / 2;
            }

            const tx = ox + c * (pw + gap) + xOffset;
            const ty = oy + r * (ph + gap);
            const sp = scatterPositions[i];
            const sRot = (Math.random() - 0.5) * 50;
            pieces.push({
                x: sp.x, y: sp.y, w: pw, h: ph,
                tx: tx, ty: ty,
                rot: sRot,
                scatterX: sp.x, scatterY: sp.y, scatterRot: sRot,
                locked: false, hovered: false,
                char: letters[i],
                phase: Math.random() * Math.PI * 2,
                floatSpeed: 2 + Math.random() * 2,
                col: c, row: r, cols: cols, rows: rows,
                emissive: 0.08,
                scale: 1
            });
        }
    }

    function drawJigsawPath(p) {
        const hw = p.w / 2, hh = p.h / 2;
        const tab = Math.min(p.w, p.h) * 0.15;
        ctx.beginPath();
        ctx.moveTo(-hw, -hh);
        if (p.row > 0) {
            ctx.lineTo(-tab, -hh);
            ctx.bezierCurveTo(-tab, -hh - tab * 1.2, tab, -hh - tab * 1.2, tab, -hh);
        }
        ctx.lineTo(hw, -hh);
        if (p.col < p.cols - 1) {
            ctx.lineTo(hw, -tab);
            ctx.bezierCurveTo(hw + tab * 1.2, -tab, hw + tab * 1.2, tab, hw, tab);
        }
        ctx.lineTo(hw, hh);
        if (p.row < p.rows - 1) {
            ctx.lineTo(tab, hh);
            ctx.bezierCurveTo(tab, hh + tab * 1.2, -tab, hh + tab * 1.2, -tab, hh);
        }
        ctx.lineTo(-hw, hh);
        if (p.col > 0) {
            ctx.lineTo(-hw, tab);
            ctx.bezierCurveTo(-hw - tab * 1.2, tab, -hw - tab * 1.2, -tab, -hw, -tab);
        }
        ctx.lineTo(-hw, -hh);
        ctx.closePath();
    }

    function drawPiece(p) {
        ctx.save();
        const cx = p.x + p.w / 2, cy = p.y + p.h / 2;
        ctx.translate(cx, cy);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.scale(p.scale, p.scale);
        
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = p.locked ? 8 : (p === dragging ? 30 : 15);
        ctx.shadowOffsetY = p.locked ? 2 : (p === dragging ? 12 : 5);
        
        drawJigsawPath(p);
        
        // Dynamic Glass Fill
        const cR = parseInt(currentWord.color.slice(1, 3), 16);
        const cG = parseInt(currentWord.color.slice(3, 5), 16);
        const cB = parseInt(currentWord.color.slice(5, 7), 16);
        const em = p.emissive;
        
        const grad = ctx.createLinearGradient(-p.w/2, -p.h/2, p.w/2, p.h/2);
        const baseAlpha = 0.12 + (em * 0.15);
        grad.addColorStop(0, `rgba(${cR}, ${cG}, ${cB}, ${baseAlpha})`);
        grad.addColorStop(1, `rgba(15, 20, 28, 0.9)`);
        
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Subtle Border
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = p.locked ? 2.5 : 1.2;
        ctx.strokeStyle = p.locked ? currentWord.color : (p === dragging ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)');
        ctx.stroke();
        
        // Glass Shine
        if (!p.locked) {
            ctx.save();
            drawJigsawPath(p);
            ctx.clip();
            const shine = ctx.createLinearGradient(-p.w, -p.h, p.w, p.h);
            shine.addColorStop(0, 'rgba(255,255,255,0)');
            shine.addColorStop(0.5, 'rgba(255,255,255,0.03)');
            shine.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = shine;
            ctx.fillRect(-p.w, -p.h, p.w*2, p.h*2);
            ctx.restore();
        }

        if (p.char) {
            const alpha = p.locked ? 1 : 0.2 + (em * 0.2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            // Adaptive font size based on piece width
            const fontSize = Math.floor(p.w * 0.5);
            ctx.font = `900 ${fontSize}px Outfit`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(p.char, 0, 2);
        }
        ctx.restore();
    }

    function drawGhostSlots() {
        if (!pieces.length) return;
        ctx.save();
        pieces.forEach(p => {
            if (p.locked) return;
            let nearSlot = false;
            if (dragging === p) {
                const dx = Math.abs((p.x + p.w / 2) - (p.tx + p.w / 2));
                const dy = Math.abs((p.y + p.h / 2) - (p.ty + p.h / 2));
                nearSlot = (dx < 80 && dy < 80);
            }
            ctx.save();
            if (nearSlot) {
                ctx.shadowColor = currentWord.color; ctx.shadowBlur = 20;
                ctx.strokeStyle = currentWord.color; ctx.lineWidth = 2; ctx.setLineDash([]);
            } else {
                ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1.5; ctx.setLineDash([8, 6]);
            }
            const r = 8; ctx.beginPath(); ctx.moveTo(p.tx + r, p.ty); ctx.lineTo(p.tx + p.w - r, p.ty); ctx.arcTo(p.tx + p.w, p.ty, p.tx + p.w, p.ty + r, r); ctx.lineTo(p.tx + p.w, p.ty + p.h - r); ctx.arcTo(p.tx + p.w, p.ty + p.h, p.tx + p.w - r, p.ty + p.h, r); ctx.lineTo(p.tx + r, p.ty + p.h); ctx.arcTo(p.tx, p.ty + p.h, p.tx, p.ty + p.h - r, r); ctx.lineTo(p.tx, p.ty + r); ctx.arcTo(p.tx, p.ty, p.tx + r, p.ty, r); ctx.closePath(); ctx.stroke();
            ctx.restore();
        });
        ctx.restore();
    }

    function draw(t) {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        drawGhostSlots();
        const sorted = [...pieces].sort((a, b) => {
            if (a === dragging) return 1; if (b === dragging) return -1;
            if (a.locked && !b.locked) return -1;
            if (!a.locked && b.locked) return 1;
            return 0;
        });
        sorted.forEach(p => drawPiece(p));
    }

    function animate(t) {
        pieces.forEach(p => {
            if (p.locked || p === dragging) return;
            p.y = p.scatterY + Math.sin(t / 1000 / p.floatSpeed * Math.PI * 2 + p.phase) * 5;
            p.rot = p.scatterRot + Math.sin(t / 1000 / 8 + p.phase) * 0.4;
        });
        pieces.forEach(p => {
            const ts = p === dragging ? 1.08 : 1;
            p.scale += (ts - p.scale) * 0.15;
            const te = p.locked ? 0.25 : (peekActive && !p.locked ? 0.18 : (dragging && p !== dragging ? 0.02 : 0.08));
            p.emissive += (te - p.emissive) * 0.1;
        });
        draw(t);
        animFrame = requestAnimationFrame(animate);
    }

    function getPos(e) {
        const r = canvas.getBoundingClientRect();
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
        else if (e.changedTouches && e.changedTouches.length > 0) { clientX = e.changedTouches[0].clientX; clientY = e.changedTouches[0].clientY; }
        else { clientX = e.clientX; clientY = e.clientY; }
        return { x: clientX - r.left, y: clientY - r.top };
    }

    function hitTest(mx, my) {
        for (let i = pieces.length - 1; i >= 0; i--) {
            const p = pieces[i]; if (p.locked) continue;
            const cx = p.x + p.w / 2, cy = p.y + p.h / 2;
            const dx = mx - cx, dy = my - cy;
            const cos = Math.cos(-p.rot * Math.PI / 180), sin = Math.sin(-p.rot * Math.PI / 180);
            const lx = dx * cos - dy * sin, ly = dx * sin + dy * cos;
            if (Math.abs(lx) < p.w / 2 * 1.2 && Math.abs(ly) < p.h / 2 * 1.2) return p;
        }
        return null;
    }

    function onDown(e) {
        const pos = getPos(e); const p = hitTest(pos.x, pos.y); if (!p) return;
        dragging = p; dragOff.x = pos.x - p.x; dragOff.y = pos.y - p.y;
        canvas.style.cursor = 'grabbing';
        if (!headerHidden) {
            headerHidden = true;
            gsap.to('#jig-header', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out' });
        }
        const idx = pieces.indexOf(p); pieces.splice(idx, 1); pieces.push(p);
    }

    function onMove(e) {
        const pos = getPos(e);
        if (dragging) {
            dragging.x = pos.x - dragOff.x;
            dragging.y = pos.y - dragOff.y;
            dragging.rot += (0 - dragging.rot) * 0.15;
            return;
        }
        const found = hitTest(pos.x, pos.y);
        pieces.forEach(p => p.hovered = (p === found));
        canvas.style.cursor = found ? 'grab' : 'default';
    }

    function onUp() {
        if (!dragging) return;
        const p = dragging; dragging = null; canvas.style.cursor = 'default';
        const pcx = p.x + p.w / 2, pcy = p.y + p.h / 2;
        const tcx = p.tx + p.w / 2, tcy = p.ty + p.h / 2;
        const dist = Math.sqrt((pcx - tcx) ** 2 + (pcy - tcy) ** 2);
        if (dist < 80) {
            p.locked = true; solvedCount++;
            gsap.to(p, { x: p.tx, y: p.ty, rot: 0, duration: 0.35, ease: 'elastic.out(1,0.5)' });
            gsap.to(p, { emissive: 1, duration: 0.15, yoyo: true, repeat: 1, onComplete: () => { p.emissive = 0.25 } });
            if (solvedCount === pieces.length) setTimeout(onSolve, 400);
        } else {
            failAttempts++;
            gsap.to(p, { x: p.scatterX, y: p.scatterY, rot: p.scatterRot, duration: 0.5, ease: 'back.out(2.5)' });
            gsap.to(p, { emissive: 0.6, duration: 0.12, yoyo: true, repeat: 1, onComplete: () => { p.emissive = 0.08 } });
            const origRot = p.scatterRot; gsap.to(p, { rot: origRot + 5, duration: 0.04, yoyo: true, repeat: 5, onComplete: () => { p.rot = origRot } });
            if (failAttempts === 3) {
                const btn = document.getElementById('peek-btn');
                if (btn) { btn.style.display = 'inline-flex'; gsap.from(btn, { opacity: 0, y: 8, duration: 0.4 }); }
            }
        }
    }

    function onSolve() {
        const tl = gsap.timeline();
        tl.to(pieces, { emissive: 0.9, duration: 0.4, stagger: 0.05 }, 0);
        tl.to(pieces, { emissive: 0.3, duration: 0.3, stagger: 0.03 }, 0.5);
        pieces.forEach(p => { tl.to(p, { scale: 0.96, duration: 0.12 }, 0.2); tl.to(p, { scale: 1.06, duration: 0.18 }, 0.32); tl.to(p, { scale: 1, duration: 0.2 }, 0.5); });
        tl.add(() => spawnConfetti(), 0.8);
        tl.add(() => {
            const panel = document.getElementById('jig-panel');
            const wait = document.getElementById('panel-wait');
            const reveal = document.getElementById('panel-reveal');
            panel.classList.add('revealed');
            gsap.to(wait, { opacity: 0, duration: 0.3, onComplete: () => { wait.style.display = 'none' } });
            document.getElementById('rv-word').style.color = currentWord.color;
            document.getElementById('rv-sub').textContent = currentWord.subtitle;
            document.getElementById('rv-sub').style.color = currentWord.color;
            document.getElementById('rv-def').textContent = currentWord.definition;
            document.getElementById('rv-xp').innerHTML = `<i data-lucide="zap"></i><span>+${currentWord.xp} XP</span><span style="margin:0 10px;opacity:0.3">|</span><i data-lucide="flame"></i><span>Streak +1</span>`;
            reveal.style.display = 'flex';
            if (window.lucide) window.lucide.createIcons();
            gsap.from(reveal, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' });
            const wordEl = document.getElementById('rv-word');
            const letters = currentWord.word.split('');
            wordEl.innerHTML = letters.map(l => `<span style="display:inline-block;opacity:0;transform:scale(0)">${l}</span>`).join('');
            gsap.to(wordEl.querySelectorAll('span'), { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)', delay: 0.2 });
            gsap.from(document.getElementById('rv-sub'), { opacity: 0, y: 15, duration: 0.4, delay: 0.5 });
            gsap.from(document.getElementById('rv-def'), { opacity: 0, y: 15, duration: 0.5, delay: 0.7 });
            gsap.from(document.getElementById('rv-xp'), { opacity: 0, scale: 0.5, duration: 0.4, delay: 0.9, ease: 'back.out(3)' });
            gsap.from(document.querySelector('.jig-cta'), { opacity: 0, y: 10, duration: 0.4, delay: 1.2 });
            
            // Update XP!
            updateGlobalXP(currentWord.xp);
        }, 1.0);
        tl.add(() => {
            const btn = document.getElementById('jig-reset');
            btn.style.display = 'flex';
            gsap.from(btn, { opacity: 0, y: 10, duration: 0.4 });
        }, 1.8);
    }

    function spawnConfetti() {
        const colors = [currentWord.color, '#fff', '#FFD700', '#FF6B35', '#00D9FF'];
        const conf = [];
        for (let i = 0; i < 40; i++) {
            conf.push({ x: W / 2, y: H / 2, vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 10 - 4, size: 3 + Math.random() * 5, color: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, vr: (Math.random() - 0.5) * 10, life: 1 });
        }
        function step() {
            let alive = false;
            conf.forEach(c => {
                if (c.life <= 0) return; alive = true;
                c.x += c.vx; c.y += c.vy; c.vy += 0.25; c.rot += c.vr; c.life -= 0.015;
                ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.rot * Math.PI / 180); ctx.globalAlpha = Math.max(0, c.life); ctx.fillStyle = c.color; ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size); ctx.restore();
            });
            if (alive) requestAnimationFrame(step);
        }
        step();
    }

    window.peekWord = function() {
        if (peekActive) return;
        peekActive = true;
        const btn = document.getElementById('peek-btn'); 
        if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i><span>Peeking...</span>';
        if (window.lucide) window.lucide.createIcons();
        pieces.forEach(p => { if (!p.locked) gsap.to(p, { x: p.tx, y: p.ty, rot: 0, duration: 0.6, ease: 'power2.out' }); });
        setTimeout(() => {
            pieces.forEach(p => { if (!p.locked) gsap.to(p, { x: p.scatterX, y: p.scatterY, rot: p.scatterRot, duration: 0.8, ease: 'back.inOut(1.7)' }); });
            setTimeout(() => { 
                peekActive = false; 
                if (btn) btn.innerHTML = '<i data-lucide="eye"></i><span>Peek at the word (3s)</span>'; 
                if (window.lucide) window.lucide.createIcons();
            }, 800);
        }, 3000);
    };

    window.resetPuzzle = function() {
        cancelAnimationFrame(animFrame); headerHidden = false; failAttempts = 0; peekActive = false;
        const btn = document.getElementById('peek-btn'); if (btn) btn.style.display = 'none';
        gsap.set('#jig-header', { clearProps: 'all' }); gsap.to('#jig-header', { opacity: 1, y: 0, duration: 0.5 });
        const panel = document.getElementById('jig-panel'); const wait = document.getElementById('panel-wait'); const reveal = document.getElementById('panel-reveal');
        panel.classList.remove('revealed'); wait.style.display = 'flex'; wait.style.opacity = '1'; reveal.style.display = 'none';
        document.getElementById('jig-reset').style.display = 'none';
        pickWord(); resize(); createPieces();
        animFrame = requestAnimationFrame(animate);
    };

    function init() {
        canvas = document.getElementById('puzzle-canvas');
        if (!canvas) return;
        
        ctx = canvas.getContext('2d');
        wrap = document.getElementById('canvas-wrap');
        
        // Initialize XP from storage
        const state = JSON.parse(localStorage.getItem('pedestalState') || '{"xp":0}');
        const xpNumberEl = document.getElementById('xp-number');
        if (xpNumberEl) xpNumberEl.innerText = Math.floor(state.xp || 0);

        pickWord(); resize(); createPieces();
        canvas.addEventListener('mousedown', onDown);
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseup', onUp);
        canvas.addEventListener('mouseleave', onUp);
        canvas.addEventListener('touchstart', onDown, { passive: false });
        canvas.addEventListener('touchmove', onMove, { passive: false });
        canvas.addEventListener('touchend', onUp, { passive: false });
        window.addEventListener('resize', () => { resize(); if (solvedCount === 0) createPieces() });
        animFrame = requestAnimationFrame(animate);
    }

    // Only init if desktop
    if (window.innerWidth >= 1024) {
        init();
    }
})();
