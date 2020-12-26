import React, { FC, useState, useEffect, useRef } from "react";
import "../SpeechRecognition/SpeechRecognition.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showDropDownAction,
  darkAndLightModeAction,
  signInAndOutAction,
  setIndexTabAction,
} from "../../Actions/actionsApp";
import {
  isListeningAction,
  nextImageAction,
  backToHomeAction,
  previousImageAction,
  pauseAutoSliderAction,
  playAutoSliderAction,
} from "../../Actions/actionsSpeechRecognition";
import { intervalTimeSliderAction } from "../../Actions/actionsSlider";
import { setSearchAction } from "../../Actions/actionsSearch";
import {
  searchUnsplashCollectionsAction,
  setImagesUnsplashAlbumsAction,
} from "../../Actions/actionsUnsplash";
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

  //getVoices
  useEffect(() => {
    let voicesA = synthRef.current.getVoices()[4];
    setVoices(voicesA);
  }, [voices]);

  //useEffect
  //SpeechRecognitionFunction
  useEffect(() => {
    SpeechRecognitionFunction();
  }, []);

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
      dispatch(isListeningAction(true));
    };
    recognition.onresult = async (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setSpeechRecognitionContent(transcript);
      if (event.results[0].isFinal) {
        setSpeechRecognitionContent(transcript);
        if (inImages) {
          if (transcript.toLowerCase() === "back to home") {
            handleClickOf();
            setTimeout(() => {
              dispatch(backToHomeAction(true));
            }, 500);
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "next image") {
            dispatch(nextImageAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "previous image") {
            dispatch(previousImageAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "pause auto slider") {
            dispatch(pauseAutoSliderAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "play auto slider") {
            dispatch(playAutoSliderAction(true));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "10 seconds") {
            dispatch(intervalTimeSliderAction(10000));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "30 seconds") {
            dispatch(intervalTimeSliderAction(30000));
            readOutLoud(`Ok,done`, voices);
          } else if (transcript.toLowerCase() === "60 seconds") {
            dispatch(intervalTimeSliderAction(60000));
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
          } else if (transcript.toLowerCase() === "go to collections") {
            dispatch(setIndexTabAction(0));
            readOutLoud(`ok,I am in collections`, voices);
          } else if (transcript.toLowerCase() === "go to albums") {
            dispatch(setIndexTabAction(1));
            readOutLoud(`ok,I am in albums`, voices);
          } else if (transcript.toLowerCase().includes("collections")) {
            let arrayTranscript = transcript.split(" ");
            const result = arrayTranscript.filter(
              (word: string) => word !== "collections"
            );
            const finalResult = result.join(" ");
            dispatch(setSearchAction(finalResult));
            dispatch(searchUnsplashCollectionsAction(finalResult, 1));
            readOutLoud(`Ok,Collection is ${finalResult}`, voices);
          } else if (transcript.toLowerCase().includes("albums")) {
            let arrayTranscript = transcript.split(" ");
            const result = arrayTranscript.filter(
              (word: string) => word !== "albums"
            );
            const finalResult = result.join(" ");
            dispatch(setIndexTabAction(1));
            dispatch(setSearchAction(finalResult));
            handleClickOf();
            setTimeout(() => {
              dispatch(setImagesUnsplashAlbumsAction(finalResult, 1));
            }, 500);
            readOutLoud(`Ok,Album is ${finalResult}`, voices);
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
      recognition.start();
    };
    recognition.onerror = (event: any) => {
      handleClickOf();
      readOutLoud(`Please check your microphone and audio levels`, voices);
      setSpeechRecognitionContent("");
    };
  };

  //handleClickOf
  const handleClickOf = () => {
    recognition.stop();
    recognition.onend = () => {
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
    speech.voice = voices || synthRef.current.getVoices()[4];

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
            title="speak"
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
