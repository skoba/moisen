import { useState, useEffect } from "react";

/** @see [Next.js+WebSpeechAPIで超簡単音声認識をしてみよう](https://zenn.dev/imaimai17468/articles/a3e29a59765ab6) */
const useSpeechRecognition = ({
  delimiter
} = {
  delimiter: '。\n'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const recognition = new SpeechRecognition();
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "ja-JP";
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
      // console.log('useEffect:first');
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;
    if (isRecording) {
      recognition.start();
      // console.log('recognition:start');
    } else {
      recognition.stop();
      setText("");
      // console.log('recognition:stop');
    }
    // console.log('useEffect:second');
  }, [isRecording, recognition]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event) => {
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          setText((prevText) => prevText + results[i][0].transcript + delimiter);
          setTranscript("");
        } else {
          setTranscript(results[i][0].transcript);
        }
        // console.log('recognition:onresult:for');
      }
      // console.log('recognition:onresult');
    };
    // console.log('useEffect:thrid');
  }, [recognition]);

  return {
    text,
    transcript,
    isRecording,
    setIsRecording,
  };
};

export {
  useSpeechRecognition,
};
