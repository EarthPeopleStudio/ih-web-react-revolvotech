import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineCode, AiOutlineSound, AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { MdMusicNote, MdWavingHand, MdVolumeUp, MdSpeed } from 'react-icons/md';

// Import styled components
import {
  CodeShowcaseGrid,
  CodeShowcaseItem,
  CodeShowcaseHeader,
  CodeShowcaseTitle,
  CodeShowcaseDescription,
  CodeDemoContainer,
  CodeSnippetContainer,
  CodeHeader,
  CodeFileName,
  CodeLanguage,
  DemoContainer,
  PreBlock
} from '../StyledComponents';

// Web Audio API Melody Generator Demo Component
const MelodyGenerator = ({ title, description, melodyType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [tempo, setTempo] = useState(120);
  const [selectedPattern, setSelectedPattern] = useState(0);
  
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);
  
  // Initialize Web Audio API
  const initAudio = () => {
    if (!audioContextRef.current) {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };
  
  // Play a single note
  const playNote = (frequency, duration) => {
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = melodyType === 'ambient' ? 'sine' : 'triangle';
    oscillator.frequency.value = frequency;
    
    // Create envelope for nice attack/release
    const noteGain = audioContextRef.current.createGain();
    noteGain.gain.value = 0;
    noteGain.connect(gainNodeRef.current);
    
    // Attack
    noteGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    noteGain.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.02);
    
    // Release
    noteGain.gain.setValueAtTime(volume, audioContextRef.current.currentTime + duration - 0.05);
    noteGain.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + duration);
    
    oscillator.connect(noteGain);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      // Stop playing
      clearTimeout(timerRef.current);
      setIsPlaying(false);
      
      // If there's an active oscillator, stop it
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
    } else {
      // Start playing
      setIsPlaying(true);
      
      // Reset button state after 1 second (but let audio continue)
      setTimeout(() => {
        setIsPlaying(false);
      }, 1000);
      
      // Select the appropriate melody generator
      if (melodyType === 'ambient') {
        generateAmbientMelody();
      } else {
        generateRhythmicMelody();
      }
    }
  };
  
  // Generate ambient melody
  const generateAmbientMelody = () => {
    initAudio();
    
    // Ambient pattern options
    const ambientPatterns = [
      {
        name: "Random",
        generateNote: (index) => {
          // Original random pattern
          const pentatonicScale = [
            261.63, 293.66, 329.63, 392.00, 440.00,  // C major pentatonic
            523.25, 587.33, 659.25, 783.99, 880.00   // C5, D5, E5, G5, A5 (octave up)
          ];
          return pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        }
      },
      {
        name: "Ascending",
        generateNote: (index) => {
          // Ascending pattern through the scale
          const ascendingScale = [
            261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25
          ];
          return ascendingScale[index % ascendingScale.length];
        }
      },
      {
        name: "Wave",
        generateNote: (index) => {
          // Wave-like pattern that rises and falls
          const wavePattern = [
            261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66
          ];
          return wavePattern[index % wavePattern.length];
        }
      }
    ];
    
    const currentPattern = ambientPatterns[selectedPattern];
    let noteDuration = 60 / tempo; // Convert BPM to seconds per beat
    
    // Play a limited number of notes instead of continuous play
    let notesPlayed = 0;
    const totalNotesToPlay = 16; // Play 16 notes then stop
    
    // Use Web Audio API's precise timing
    const scheduleNote = () => {
      // Get frequency from the selected pattern
      const frequency = currentPattern.generateNote(notesPlayed);
      
      // Add subtle variation to note duration for organic feel
      const variableDuration = noteDuration * (0.8 + Math.random() * 0.4);
      
      // Play the note
      playNote(frequency, variableDuration);
      
      notesPlayed++;
      
      // Schedule next note with a slight gap - continue until we've played enough notes
      if (notesPlayed < totalNotesToPlay) {
        timerRef.current = setTimeout(scheduleNote, variableDuration * 1000);
      }
    };
    
    scheduleNote();
  };
  
  // Generate rhythmic melody with beats
  const generateRhythmicMelody = () => {
    initAudio();
    
    // C minor scale for a more dramatic sound
    const cMinorScale = [
      261.63, 293.66, 311.13, 349.23, 392.00, 415.30, 466.16,  // C minor
      523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33   // One octave higher
    ];
    
    // Multiple pattern options for variety
    const rhythmPatterns = [
      // Original pattern
      {
        name: "Basic",
        bassPattern: [0, 0, 7, 7, 5, 5, 3, 3],
        kickPattern: [1, 0, 0, 0, 1, 0, 0, 0], // 1 = play kick
        snarePattern: [0, 0, 1, 0, 0, 0, 1, 0], // 1 = play snare
        hihatPattern: [1, 1, 1, 1, 1, 1, 1, 1]  // 1 = play hihat
      },
      // Syncopated pattern
      {
        name: "Syncopated",
        bassPattern: [0, 3, 7, 3, 5, 7, 3, 0],
        kickPattern: [1, 0, 0, 1, 0, 1, 0, 0],
        snarePattern: [0, 0, 1, 0, 0, 0, 1, 1],
        hihatPattern: [0, 1, 0, 1, 0, 1, 0, 1]
      },
      // Waltz-like pattern
      {
        name: "Triple Feel",
        bassPattern: [0, 4, 7, 0, 5, 9, 3, 7],
        kickPattern: [1, 0, 0, 1, 0, 0, 1, 0],
        snarePattern: [0, 0, 1, 0, 0, 1, 0, 0],
        hihatPattern: [1, 0, 1, 0, 1, 0, 1, 0]
      }
    ];
    
    // Drum sounds (created with noise and filters)
    const playKick = () => {
      const kickOsc = audioContextRef.current.createOscillator();
      kickOsc.frequency.value = 150;
      
      const kickGain = audioContextRef.current.createGain();
      kickGain.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.2);
      
      kickOsc.connect(kickGain);
      kickGain.connect(gainNodeRef.current);
      
      kickOsc.start();
      kickOsc.stop(audioContextRef.current.currentTime + 0.2);
    };
    
    const playSnare = () => {
      const noiseBuffer = audioContextRef.current.createBuffer(
        1, 
        audioContextRef.current.sampleRate * 0.1, 
        audioContextRef.current.sampleRate
      );
      
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioContextRef.current.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const snareGain = audioContextRef.current.createGain();
      snareGain.gain.setValueAtTime(volume * 0.8, audioContextRef.current.currentTime);
      snareGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15);
      
      // Filter to shape the sound
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 800;
      
      noise.connect(filter);
      filter.connect(snareGain);
      snareGain.connect(gainNodeRef.current);
      
      noise.start();
      noise.stop(audioContextRef.current.currentTime + 0.15);
    };
    
    const playHihat = () => {
      const noiseBuffer = audioContextRef.current.createBuffer(
        1, 
        audioContextRef.current.sampleRate * 0.05, 
        audioContextRef.current.sampleRate
      );
      
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noise = audioContextRef.current.createBufferSource();
      noise.buffer = noiseBuffer;
      
      // Quieter than other drums
      const hihatGain = audioContextRef.current.createGain();
      hihatGain.gain.setValueAtTime(volume * 0.4, audioContextRef.current.currentTime);
      hihatGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.08);
      
      // Higher frequency filter for hihat
      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7000;
      
      noise.connect(filter);
      filter.connect(hihatGain);
      hihatGain.connect(gainNodeRef.current);
      
      noise.start();
      noise.stop(audioContextRef.current.currentTime + 0.08);
    };
    
    // Get the currently selected pattern
    const currentPattern = rhythmPatterns[selectedPattern];
    
    // Bass pattern from the selected rhythm pattern
    const bassPattern = currentPattern.bassPattern;
    let noteIndex = 0;
    let beatCount = 0;
    
    const noteDuration = 60 / tempo / 2;  // 8th notes
    
    // Play a limited number of bars instead of continuous play
    const totalBarsToPlay = 2; // Play 2 bars (16 eighth notes) then stop
    const totalBeatsToPlay = totalBarsToPlay * 8; // 8 eighth notes per bar
    
    // Schedule a beat pattern
    const scheduleRhythmicPattern = () => {
      const currentBeat = beatCount % 8;
      
      // Play kick based on pattern
      if (currentPattern.kickPattern[currentBeat]) {
        playKick();
      }
      
      // Play snare based on pattern
      if (currentPattern.snarePattern[currentBeat]) {
        playSnare();
      }
      
      // Play hihat based on pattern
      if (currentPattern.hihatPattern[currentBeat]) {
        playHihat();
      }
      
      // Play melody notes on certain beats
      if (currentBeat === 0 || currentBeat === 2 || currentBeat === 4 || currentBeat === 6) {
        // Get the current note from the pattern
        const currentNote = bassPattern[noteIndex % bassPattern.length];
        
        // Play the note
        playNote(cMinorScale[currentNote], noteDuration * 1.8);
        
        // Also play a higher note occasionally for harmony
        if (currentBeat === 0 || currentBeat === 4) {
          playNote(cMinorScale[currentNote + 4], noteDuration * 1.5);
        }
        
        noteIndex++;
      }
      
      beatCount++;
      
      // Continue if we haven't played enough beats
      if (beatCount < totalBeatsToPlay) {
        timerRef.current = setTimeout(scheduleRhythmicPattern, noteDuration * 1000);
      }
    };
    
    scheduleRhythmicPattern();
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  const primaryColor = melodyType === 'ambient' ? '#3E98C7' : '#ff5470';
  const secondaryColor = melodyType === 'ambient' ? '#2A3A8F' : '#ff9770';
  const gradientStyle = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'linear-gradient(120deg, rgba(22,22,35,1) 0%, rgba(32,32,50,1) 100%)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
    }}>
      {/* Header with title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: 'rgba(20,20,35,0.5)'
      }}>
        <div style={{
          display: 'flex', 
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: gradientStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 5px 15px ${melodyType === 'ambient' 
              ? 'rgba(62, 152, 199, 0.3)'
              : 'rgba(255, 84, 112, 0.3)'}`
          }}>
            <MdMusicNote size={24} color="#fff" />
          </div>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '4px',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>{title}</h3>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.7)'
            }}>{description}</p>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div style={{
        display: 'flex',
        flex: 1,
        padding: '20px',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '25px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdVolumeUp size={20} color={primaryColor} />
            </div>
            
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <label style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.85)'
                }}>
                  Volume
                </label>
                <span style={{
                  fontSize: '0.85rem',
                  color: primaryColor,
                  fontWeight: '700',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>{Math.round(volume * 100)}%</span>
              </div>
              
              <div style={{
                position: 'relative',
                height: '10px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${volume * 100}%`,
                  background: gradientStyle,
                  borderRadius: '5px',
                  transition: 'width 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}></div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (gainNodeRef.current) {
                      gainNodeRef.current.gain.value = parseFloat(e.target.value);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    margin: 0
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdSpeed size={20} color={primaryColor} />
            </div>
            
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <label style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.85)'
                }}>
                  Tempo
                </label>
                <span style={{
                  fontSize: '0.85rem',
                  color: primaryColor,
                  fontWeight: '700',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>{tempo} BPM</span>
              </div>
              
              <div style={{
                position: 'relative',
                height: '10px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${((tempo - 60) / (180 - 60)) * 100}%`,
                  background: gradientStyle,
                  borderRadius: '5px',
                  transition: 'width 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}></div>
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="1"
                  value={tempo}
                  onChange={(e) => setTempo(parseInt(e.target.value))}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    margin: 0
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Pattern selector for both melody types */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '4px',
              width: '100%'
            }}>
              {melodyType === 'ambient' ? 'Melody Pattern' : 'Beat Pattern'}
            </div>
            <div style={{
              display: 'flex',
              width: '100%',
              gap: '10px',
              justifyContent: 'space-between'
            }}>
              {melodyType === 'ambient' 
                ? ['Random', 'Ascending', 'Wave'].map((pattern, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPattern(index)}
                      style={{
                        background: selectedPattern === index 
                          ? gradientStyle 
                          : 'rgba(255,255,255,0.08)',
                        border: 'none',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        color: selectedPattern === index 
                          ? '#fff' 
                          : 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexGrow: 1,
                        minWidth: '80px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        boxShadow: selectedPattern === index 
                          ? '0 4px 12px rgba(62, 152, 199, 0.3)' 
                          : 'none'
                      }}
                    >
                      {pattern}
                    </button>
                  ))
                : ['Basic', 'Syncopated', 'Triple Feel'].map((pattern, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPattern(index)}
                      style={{
                        background: selectedPattern === index 
                          ? gradientStyle 
                          : 'rgba(255,255,255,0.08)',
                        border: 'none',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        color: selectedPattern === index 
                          ? '#fff' 
                          : 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexGrow: 1,
                        minWidth: '80px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        boxShadow: selectedPattern === index 
                          ? '0 4px 12px rgba(255, 84, 112, 0.3)' 
                          : 'none'
                      }}
                    >
                      {pattern}
                    </button>
                  ))
              }
            </div>
          </div>
          
          {/* Status message */}
          <div style={{
            padding: '15px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isPlaying ? primaryColor : 'rgba(255,255,255,0.3)',
                boxShadow: isPlaying ? `0 0 10px ${primaryColor}` : 'none',
                transition: 'all 0.3s ease'
              }}></div>
              <p style={{ 
                margin: 0,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '500'
              }}>
                {isPlaying 
                  ? melodyType === 'ambient'
                    ? `Playing ambient melody...`
                    : `Playing rhythmic beat...`
                  : melodyType === 'ambient'
                    ? `Press play to start ${['Random', 'Ascending', 'Wave'][selectedPattern]} melody`
                    : `Press play to start ${['Basic', 'Syncopated', 'Triple Feel'][selectedPattern]} beat`}
              </p>
            </div>
            
            {/* Play/pause button moved below the status text */}
            <button
              onClick={togglePlay}
              style={{
                background: isPlaying 
                  ? 'rgba(255,255,255,0.1)'
                  : gradientStyle,
                border: 'none',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isPlaying 
                  ? 'none'
                  : `0 5px 20px ${melodyType === 'ambient'
                      ? 'rgba(62, 152, 199, 0.4)'
                      : 'rgba(255, 84, 112, 0.4)'}`,
                transition: 'all 0.3s ease',
                transform: isPlaying ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              {isPlaying 
                ? <AiOutlinePauseCircle size={34} color="#fff" /> 
                : <AiOutlinePlayCircle size={34} color="#fff" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Code display component for displaying source code
const CodeDisplay = ({ melodyType }) => {
  const sourceCode = melodyType === 'ambient' 
  ? `// Ambient Melody Generator using Web Audio API
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;
gainNode.connect(audioContext.destination);

// Define different melody patterns
const ambientPatterns = [
  // Random pattern - original implementation
  {
    name: "Random",
    generateNote: (index) => {
      const pentatonicScale = [
        261.63, 293.66, 329.63, 392.00, 440.00,  // C pentatonic
        523.25, 587.33, 659.25, 783.99, 880.00   // Octave up
      ];
      return pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    }
  },
  // Ascending pattern - goes up the scale
  {
    name: "Ascending",
    generateNote: (index) => {
      const ascendingScale = [
        261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25
      ];
      return ascendingScale[index % ascendingScale.length];
    }
  },
  // Wave pattern - rises and falls melodically
  {
    name: "Wave",
    generateNote: (index) => {
      const wavePattern = [
        261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66
      ];
      return wavePattern[index % wavePattern.length];
    }
  }
];

// Select current pattern
const currentPattern = ambientPatterns[0]; // Change index for different patterns

function playNote(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  // Create envelope for attack/release
  const noteGain = audioContext.createGain();
  noteGain.gain.value = 0;
  noteGain.connect(gainNode);
  
  // Attack
  noteGain.gain.setValueAtTime(0, audioContext.currentTime);
  noteGain.gain.linearRampToValueAtTime(
    0.5, 
    audioContext.currentTime + 0.02
  );
  
  // Release
  noteGain.gain.setValueAtTime(
    0.5, 
    audioContext.currentTime + duration - 0.05
  );
  noteGain.gain.linearRampToValueAtTime(
    0, 
    audioContext.currentTime + duration
  );
  
  oscillator.connect(noteGain);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

// Play a melody with auto-stop
function generateMelody() {
  let noteDuration = 60 / 120;  // Seconds per beat
  let notesPlayed = 0;
  const totalNotesToPlay = 16;
  
  function scheduleNote() {
    // Get frequency from the selected pattern
    const frequency = currentPattern.generateNote(notesPlayed);
    
    // Add variation to note duration
    const variableDuration = noteDuration * (0.8 + Math.random() * 0.4);
    
    // Play the note
    playNote(frequency, variableDuration);
    
    notesPlayed++;
    
    // Schedule next note until we've played enough
    if (notesPlayed < totalNotesToPlay) {
      setTimeout(
        scheduleNote, 
        variableDuration * 1000
      );
    }
  }
  
  scheduleNote();
}`
  : `// Rhythmic Melody Generator with Multiple Beat Patterns
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;
gainNode.connect(audioContext.destination);

// C minor scale for melody
const cMinorScale = [
  261.63, 293.66, 311.13, 349.23, 392.00, 415.30, 466.16,  // C minor
  523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33   // Octave up
];

// Multiple rhythm patterns for variety
const rhythmPatterns = [
  // Basic
  {
    name: "Basic",
    bassPattern: [0, 0, 7, 7, 5, 5, 3, 3],
    kickPattern: [1, 0, 0, 0, 1, 0, 0, 0],
    snarePattern: [0, 0, 1, 0, 0, 0, 1, 0]
  },
  // Syncopated pattern
  {
    name: "Syncopated",
    bassPattern: [0, 3, 7, 3, 5, 7, 3, 0],
    kickPattern: [1, 0, 0, 1, 0, 1, 0, 0],
    snarePattern: [0, 0, 1, 0, 0, 0, 1, 1]
  },
  // Triple feel pattern
  {
    name: "Triple Feel",
    bassPattern: [0, 4, 7, 0, 5, 9, 3, 7],
    kickPattern: [1, 0, 0, 1, 0, 0, 1, 0],
    snarePattern: [0, 0, 1, 0, 0, 1, 0, 0]
  }
];

// Select current pattern
const currentPattern = rhythmPatterns[0]; // Change index for different patterns

// Play a melodic note
function playNote(frequency, duration) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  
  const noteGain = audioContext.createGain();
  
  // Set up attack and release envelope
  noteGain.gain.setValueAtTime(0, audioContext.currentTime);
  noteGain.gain.linearRampToValueAtTime(
    0.5, 
    audioContext.currentTime + 0.02
  );
  
  noteGain.gain.setValueAtTime(
    0.5, 
    audioContext.currentTime + duration - 0.05
  );
  
  noteGain.gain.linearRampToValueAtTime(
    0, 
    audioContext.currentTime + duration
  );
  
  oscillator.connect(noteGain);
  noteGain.connect(gainNode);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

// Drum sounds
function playKick() {
  const kickOsc = audioContext.createOscillator();
  kickOsc.frequency.value = 150;
  
  const kickGain = audioContext.createGain();
  kickGain.gain.setValueAtTime(0.5, audioContext.currentTime);
  kickGain.gain.exponentialRampToValueAtTime(
    0.001, 
    audioContext.currentTime + 0.2
  );
  
  kickOsc.connect(kickGain);
  kickGain.connect(gainNode);
  
  kickOsc.start();
  kickOsc.stop(audioContext.currentTime + 0.2);
}

// Start playing the pattern with auto-stop
function generateRhythmicPattern() {
  const tempo = 120;
  const noteDuration = 60 / tempo / 2;  // 8th notes
  let noteIndex = 0;
  let beatCount = 0;
  const totalBeatsToPlay = 16; // 2 bars
  
  function scheduleNextBeat() {
    const currentBeat = beatCount % 8;
    
    // Play kick based on pattern
    if (currentPattern.kickPattern[currentBeat]) {
      playKick();
    }
    
    // Play snare based on pattern
    if (currentPattern.snarePattern[currentBeat]) {
      playSnare();
    }
    
    // Play melody notes
    if (currentBeat % 2 === 0) {
      // Get current note from pattern
      const currentNote = currentPattern.bassPattern[noteIndex % currentPattern.bassPattern.length];
      
      // Play the note
      playNote(cMinorScale[currentNote], noteDuration * 1.8);
      
      // Play harmony notes on strong beats
      if (currentBeat === 0 || currentBeat === 4) {
        playNote(cMinorScale[currentNote + 4], noteDuration * 1.5);
      }
      
      noteIndex++;
    }
    
    beatCount++;
    
    // Schedule next beat until we've played enough
    if (beatCount < totalBeatsToPlay) {
      setTimeout(
        scheduleNextBeat, 
        noteDuration * 1000
      );
    }
  }
  
  scheduleNextBeat();
}`;

  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    fontSize: '0.85rem',
    lineHeight: '1.6',
    letterSpacing: '0.3px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  return (
    <CodeSnippetContainer>
      <CodeHeader>
        <CodeFileName>
          {melodyType === 'ambient' ? 'ambientMelody.js' : 'rhythmicMelody.js'}
        </CodeFileName>
        <CodeLanguage>JavaScript</CodeLanguage>
      </CodeHeader>
      <PreBlock style={{ padding: '16px', maxHeight: '450px' }}>
        <code 
          className="language-javascript"
          style={nonCopyableStyles}
          onCopy={handleCopy}
          onCut={handleCopy}
          onContextMenu={handleContextMenu}
          data-nocopy="true"
        >
          {sourceCode}
        </code>
      </PreBlock>
    </CodeSnippetContainer>
  );
};

// Main Music Showcase Component
const MusicShowcase = () => {
  return (
    <CodeShowcaseGrid>
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Ambient Melody Generator
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Explore how the Web Audio API can be used to generate music programmatically. This example demonstrates how to create ambient melodies using JavaScript.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeDisplay melodyType="ambient" />
          <DemoContainer>
            <MelodyGenerator 
              title="Ambient Melody Generator" 
              description="Peaceful procedurally-generated melodies using pentatonic scale"
              melodyType="ambient"
            />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
      
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Rhythmic Beat Generator
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          This demo creates musical patterns with drum beats and melodic elements. The code uses the Web Audio API to synthesize both percussion and harmonic sounds.
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeDisplay melodyType="rhythmic" />
          <DemoContainer>
            <MelodyGenerator 
              title="Rhythmic Beat Generator" 
              description="Pattern-based composition with synthesized drums and melody"
              melodyType="rhythmic"
            />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default MusicShowcase; 