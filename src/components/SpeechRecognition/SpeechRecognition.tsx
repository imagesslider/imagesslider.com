import React, { FC, useState, useEffect, useRef } from "react";
import "../SpeechRecognition/SpeechRecognition.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showDropDownAction,
  darkAndLightModeAction,
  signInAndOutAction,
} from "../../Actions/actionsApp";
import {
  isListeningAction,
  nextImageAction,
} from "../../Actions/actionsSpeechRecognition";
import { SpeechRecognitionType } from "../../Type/Type";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognitionProps = {
  style?: any;
};

const SpeechRecognition: FC<SpeechRecognitionProps> = ({ style }) => {
  //state
  let [recognition, setRecognition] = useState<any>();
  const synthRef = useRef(window.speechSynthesis);
  const [voices, setVoices] = useState<any>();
  const [
    speechRecognitionContent,
    setSpeechRecognitionContent,
  ] = useState<string>("");

  //state redux
  const selectIsListening = (state: SpeechRecognitionType) =>
    state.speechRecognition.isListening;
  const isListening = useSelector(selectIsListening);
  const selectInImages = (state: SpeechRecognitionType) =>
    state.speechRecognition.inImages;
  const inImages = useSelector(selectInImages);

  //actions redux
  const dispatch = useDispatch();

  //useEffect
  //SpeechRecognitionFunction
  useEffect(() => {
    SpeechRecognitionFunction();
    console.log("useEffect speech recognition");
  }, []);

  //getVoices
  useEffect(() => {
    let voicesA = synthRef.current.getVoices()[4];
    setVoices(voicesA);
    console.log("useEffect Voices");
  }, [voices]);

  //function
  //SpeechRecognitionFunction
  const SpeechRecognitionFunction = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognition(new SpeechRecognition());
    }
  };

  //handleClickOn
  const handleClickOn = () => {
    recognition.interimResults = true;
    recognition.start();
    recognition.onstart = () => {
      console.log("Mics on");
      dispatch(isListeningAction(true));
    };
    recognition.onresult = async (event: any) => {
      console.log("event", event);
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      console.log("transcript", transcript);
      setSpeechRecognitionContent(transcript);
      if (event.results[0].isFinal) {
        setSpeechRecognitionContent(transcript);
        if (inImages) {
          if (transcript.toLowerCase() === "next image") {
            dispatch(nextImageAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (
            transcript.toLowerCase() === "end" ||
            transcript.toLowerCase() === "sleep"
          ) {
            readOutLoud("Microphone off", voices);
            handleClickOf();
          } else {
            readOutLoud(`Sorry, try again`, voices);
          }
        } else {
          if (transcript.toLowerCase() === "open menu") {
            dispatch(showDropDownAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "close menu") {
            dispatch(showDropDownAction(false));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "dark mode off") {
            dispatch(darkAndLightModeAction("light"));
            window.localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
            readOutLoud(`Ok, I turned Dark Mode Off`, voices);
          } else if (transcript.toLowerCase() === "dark mode on") {
            dispatch(darkAndLightModeAction("dark"));
            window.localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
            readOutLoud(`Ok, I turned Dark Mode On`, voices);
          } else if (transcript.toLowerCase() === "sign in") {
            dispatch(signInAndOutAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "sign out") {
            dispatch(signInAndOutAction(false));
            readOutLoud(`Ok,done`, voices);
          } else if (
            transcript.toLowerCase() === "end" ||
            transcript.toLowerCase() === "sleep"
          ) {
            readOutLoud("Microphone off", voices);
            handleClickOf();
          } else {
            readOutLoud(`Sorry, try again`, voices);
          }
        }
      }
    };
    recognition.onend = () => {
      console.log("onend");
      recognition.start();
    };
    recognition.onerror = (event: any) => {
      console.log(event.error);
      handleClickOf();
      readOutLoud(`Please check your microphone and audio levels`, voices);
      setSpeechRecognitionContent("");
    };
  };

  //handleClickOf
  const handleClickOf = () => {
    recognition.stop();
    recognition.onend = () => {
      console.log("handleClickOf");
      dispatch(isListeningAction(false));
      setSpeechRecognitionContent("");
    };
  };

  //readOutLoud
  const readOutLoud = (message: string, voices: any) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = voices;

    synthRef.current.speak(speech);
  };

  if (!!recognition) {
    return (
      <div className="speechRecognition_container" style={style}>
        <p
          className="speechRecognition_content"
          style={{
            display: speechRecognitionContent?.length !== 0 ? "block" : "none",
          }}
        >
          {speechRecognitionContent}
        </p>
        {!isListening ? (
          <button
            onClick={() => handleClickOn()}
            className="speechRecognition_pulse"
            style={{
              animation: isListening ? "pulse-animation 1s infinite" : "",
            }}
          >
            <i className="fas fa-microphone fa-2x"></i>
          </button>
        ) : (
          <button
            onClick={() => handleClickOf()}
            className="speechRecognition_pulse"
            style={{
              animation: isListening ? "pulse-animation 1s infinite" : "",
            }}
          >
            <i className="fas fa-microphone fa-2x"></i>
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SpeechRecognition;
