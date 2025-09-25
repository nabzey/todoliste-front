import React, { useState, useRef } from "react";

export default function AudioRecorder({ onAudioReady }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = e => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      if (onAudioReady) onAudioReady(audioBlob);
      // Ici, vous pouvez faire un upload vers backend avec audioBlob
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop" : "Start"} Enregistrement
      </button>

      {audioUrl && (
        <div>
          <audio src={audioUrl} controls />
          {/* Vous pouvez aussi uploader ici */}
        </div>
      )}
    </div>
  );
}
