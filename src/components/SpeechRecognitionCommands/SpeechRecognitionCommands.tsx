import React, { FC } from "react";
import "../SpeechRecognitionCommands/SpeechRecognitionCommands.css";

const SpeechRecognitionCommands: FC = () => {
  return (
    <div className="speechRecognitionCommands">
      <h2 className="speechRecognitionCommands_title">
        Speech Recognition Commands
      </h2>
      <h3 className="speechRecognitionCommands_title-page">Home</h3>
      <div className="speechRecognitionCommands_wrapper">
        <table className="speechRecognitionCommands_table">
          <thead className="speechRecognitionCommands_thead">
            <tr>
              <th>To do this</th>
              <th>Say this</th>
            </tr>
          </thead>
          <tbody>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Microphone off</td>
              <td>sleep or end</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Sign in with google</td>
              <td>sign in with google</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Sign out</td>
              <td>sign out</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Open menu</td>
              <td>open menu</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Close menu</td>
              <td>close menu</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Dark mode off</td>
              <td>dark mode off</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Dark mode on</td>
              <td>dark mode on</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Go to collections</td>
              <td>go to collections</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Go to albums</td>
              <td>go to albums</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Search collections</td>
              <td>collections (name of collection)</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Search albums</td>
              <td>albums (name of album)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="speechRecognitionCommands_title-page">Images</h3>
      <div className="speechRecognitionCommands_wrapper">
        <table className="speechRecognitionCommands_table">
          <thead className="speechRecognitionCommands_thead">
            <tr>
              <th>To do this</th>
              <th>Say this</th>
            </tr>
          </thead>
          <tbody>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Microphone off</td>
              <td>sleep or end</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Back to home</td>
              <td>back to home</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Next image</td>
              <td>next image</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Previous image</td>
              <td>previous image</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Pause auto slider</td>
              <td>pause auto slider</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Play auto slider</td>
              <td>play auto slider</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Interval Time Slider for 10 seconds</td>
              <td>10 seconds</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Interval Time Slider for 30 seconds</td>
              <td>30 seconds</td>
            </tr>
            <tr className="speechRecognitionCommands_tbody-tr">
              <td>Interval Time Slider for 60 seconds</td>
              <td>60 seconds</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpeechRecognitionCommands;
