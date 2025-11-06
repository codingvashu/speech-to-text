
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState, useEffect} from "react";


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isListening, setIsListening] = useState(false); 
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const { transcript, browserSupportsSpeechRecognition, resetTranscript  } = useSpeechRecognition();

    useEffect(() => {
        setTextToCopy(transcript);
    }, [transcript]);

    useEffect(() => {
    if (!isListening) return;

    const silenceTimer = setTimeout(() => {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }, 5000); // 5 sec silence auto stop

    return () => clearTimeout(silenceTimer);
  }, [transcript, isListening]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-IN'
    });
  };

  // ✅ Stop listening handler
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript || "Start speaking to see your words here..."}
                </div>
                

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                     {!isListening && (
                    <button onClick={startListening}>Start Listening</button>
                    )}
                     {isListening && (
                    <button onClick={stopListening}>Stop Listening</button>
                    )}
                    <button onClick={() => { resetTranscript(); setIsListening(false); }}>
          Clear
        </button>
                </div>

            </div>

        </>
    );
};

export default App;