/**
 * audio-manager.js
 * Handles background music synchronization across all pages.
 */

(function() {
    const AUDIO_SRC = 'bgmusic.mp3';
    const VOLUME = 0.2;
    const SYNC_INTERVAL = 500; // ms

    const styles = `
        .audio-manager-toggle {
            background: rgba(28, 28, 36, 0.6) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
        }
        .audio-manager-toggle.playing {
            border-color: var(--neon-green, #00F5A0) !important;
            color: var(--neon-green, #00F5A0) !important;
            background: rgba(0, 245, 160, 0.05) !important;
        }
        @keyframes audio-pulse-glow {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-audio-pulse {
            animation: audio-pulse-glow 2s ease-in-out infinite;
        }
    `;

    const audioHTML = `
        <audio id="bg-audio" loop>
            <source src="${AUDIO_SRC}" type="audio/mpeg">
        </audio>
        <button id="audio-toggle" class="audio-manager-toggle fixed bottom-8 left-8 z-[10000] w-14 h-14 rounded-full border border-border flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
            <div class="absolute inset-0 rounded-full bg-neon-green/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div id="icon-muted" class="relative z-10 flex items-center justify-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="volume-x" aria-hidden="true" class="lucide lucide-volume-x w-6 h-6"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>
            </div>
            <div id="icon-playing" class="relative z-10 hidden items-center justify-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-audio-pulse"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            </div>
        </button>
    `;

    function initAudio() {
        // Prevent duplicate injection
        if (document.getElementById('bg-audio')) return;

        // Inject styles
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);

        document.body.insertAdjacentHTML('beforeend', audioHTML);

        const audio = document.getElementById('bg-audio');
        const toggleBtn = document.getElementById('audio-toggle');
        const iconMuted = document.getElementById('icon-muted');
        const iconPlaying = document.getElementById('icon-playing');

        if (!audio || !toggleBtn) return;

        audio.volume = VOLUME;

        // Sync logic
        const isPlaying = localStorage.getItem('bgAudioPlaying') === 'true';
        const savedTime = parseFloat(localStorage.getItem('bgAudioTime')) || 0;

        // Resume from saved time with a small buffer for page load
        // Use a slightly larger buffer if we're coming from a redirect
        audio.currentTime = savedTime > 0 ? savedTime + 0.4 : 0;

        const updateUI = (playing) => {
            if (playing) {
                iconMuted?.classList.add('hidden');
                iconPlaying?.classList.remove('hidden');
                iconPlaying?.classList.add('flex');
                toggleBtn.classList.add('playing');
            } else {
                iconMuted?.classList.remove('hidden');
                iconPlaying?.classList.add('hidden');
                iconPlaying?.classList.remove('flex');
                toggleBtn.classList.remove('playing');
            }
        };

        const playAudio = () => {
            audio.play().then(() => {
                localStorage.setItem('bgAudioPlaying', 'true');
                updateUI(true);
            }).catch(err => {
                console.log("Autoplay prevented or failed", err);
                // Keep the UI in playing state if the user INTENDS it to be playing
                if (localStorage.getItem('bgAudioPlaying') === 'true') {
                    updateUI(true);
                } else {
                    updateUI(false);
                }
            });
        };

        const pauseAudio = () => {
            audio.pause();
            localStorage.setItem('bgAudioPlaying', 'false');
            updateUI(false);
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                playAudio();
            } else {
                pauseAudio();
            }
        });

        // Autoplay/Resume logic
        if (isPlaying) {
            // Initial attempt
            playAudio();
            
            // Interaction fallback - extremely aggressive to ensure it resumes on any touch/click/scroll
            const interactionHandler = () => {
                if (localStorage.getItem('bgAudioPlaying') === 'true' && audio.paused) {
                    playAudio();
                }
                // Only remove if it successfully started or we want to keep trying
                if (!audio.paused) {
                    document.removeEventListener('click', interactionHandler);
                    document.removeEventListener('touchstart', interactionHandler);
                    document.removeEventListener('mousedown', interactionHandler);
                    document.removeEventListener('keydown', interactionHandler);
                }
            };
            
            ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'].forEach(evt => {
                document.addEventListener(evt, interactionHandler, { passive: true });
            });
        }

        // Save time on various events to ensure we have the most recent position
        const saveTime = () => {
            if (!audio.paused) {
                localStorage.setItem('bgAudioTime', audio.currentTime);
            }
        };

        // Continuous sync
        setInterval(saveTime, SYNC_INTERVAL);

        // Save on unload and visibility change
        window.addEventListener('beforeunload', saveTime);
        document.addEventListener('visibilitychange', saveTime);

        // Visibility API to handle tab switching
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Refetch isPlaying state in case it was changed in another tab
                const currentPlaying = localStorage.getItem('bgAudioPlaying') === 'true';
                if (currentPlaying && audio.paused) {
                    // Sync time if we're coming back from another tab
                    const remoteTime = parseFloat(localStorage.getItem('bgAudioTime'));
                    if (Math.abs(remoteTime - audio.currentTime) > 2) {
                        audio.currentTime = remoteTime;
                    }
                    playAudio();
                } else if (!currentPlaying && !audio.paused) {
                    pauseAudio();
                }
            }
        });

        // Initialize Lucide icons for the injected button
        if (window.lucide) lucide.createIcons();
    }

    // Run as soon as possible
    const tryInit = () => {
        if (document.body) {
            initAudio();
        } else {
            requestAnimationFrame(tryInit);
        }
    };
    tryInit();
})();
