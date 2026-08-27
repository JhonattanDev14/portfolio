"use client";

import { useEffect, useRef, useState } from "react";
import { playlist } from "@/components/three/data/Playlist";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function MusicPlayer({
  enabled,
  analyserRef,
}: {
  enabled: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
}) {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);


  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [showVolume, setShowVolume] = useState(false);


  useEffect(() => {
    const audio = new Audio(playlist[currentTrack].src);

audio.loop = false;
audio.volume = volume;

const AudioContextClass =
  window.AudioContext || (window as typeof window & {
    webkitAudioContext: typeof AudioContext;
  }).webkitAudioContext;

  const audioContext = new AudioContextClass();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);

  analyser.fftSize = 256;

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  audioContextRef.current = audioContext;
  analyserRef.current = analyser;
  sourceRef.current = source;

  audioRef.current = audio;

  return () => {
    audio.pause();
    audio.currentTime = 0;

    source.disconnect();
    analyser.disconnect();
    audioContext.close();
  };
  }, [currentTrack]);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;

    const playAudio = async () => {
      try {
        if (audioContextRef.current?.state === "suspended") {
          await audioContextRef.current.resume();
        }

        await audioRef.current?.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playAudio();
}, [enabled, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const nextTrack = () => {
    setCurrentTrack((current) =>
      current === playlist.length - 1 ? 0 : current + 1
    );
  };

  const previousTrack = () => {
    setCurrentTrack((current) =>
      current === 0 ? playlist.length - 1 : current - 1
    );
  };

return (
  <div className="fixed bottom-6 right-6 z-[9999]">
    <div className="flex items-center gap-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-md">
<button
  onClick={previousTrack}
  className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
>
  <ChevronLeft size={16} />
</button>

<div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
    <span className="text-xs opacity-60">
      {String(playlist[currentTrack].id).padStart(2, "0")}
    </span>

    <span className="text-sm">
      {playlist[currentTrack].title}
    </span>
  </div>

  <button
    onClick={nextTrack}
    className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
  >
    <ChevronRight size={16} />
  </button>

  <button
    onClick={togglePlay}
    className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
  >
    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
  </button>

  <div className="relative flex items-center">
  {showVolume && (
      <div className="absolute bottom-10 right-0 flex h-28 items-center rounded-full bg-white/10 px-2 py-3">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="h-24 w-2 cursor-pointer appearance-none rounded-full bg-white/20"
          style={{
            writingMode: "vertical-lr",
            direction: "rtl",
          }}
        />
      </div>
    )}

    <button
      onClick={() => setShowVolume(!showVolume)}
      className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white/10 hover:scale-110 active:scale-95"
    >
      {volume === 0 ? (
        <VolumeX size={16} />
      ) : (
        <Volume2 size={16} />
      )}
    </button>
  </div>

    </div>
  </div>
);
}