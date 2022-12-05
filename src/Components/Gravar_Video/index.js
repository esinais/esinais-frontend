import React, { useState } from 'react';
import './styles.css';
import Editor from '../Video_Editor/VideoEditor';

const Teste = (props) => {
  const [playing, setPlaying] = useState(false);
  const [tst, setTst] = useState('');
  const [isEdition, setIsEdition] = useState('');

  const HEIGHT = 500;
  const WIDTH = 500;
  var video = document.getElementsByClassName('app__videoFeed')[0];

  // console.log(video)

  const startVideo = () => {
    setPlaying(true);
    navigator.mediaDevices.getUserMedia({ video: true, })
      .then((mediaStream) => {
        let chunks = [];
        // Create a new MediaRecorder instance
        const mediaRecorder = new MediaRecorder(mediaStream);

        //Make the mediaStream global
        window.mediaStream = mediaStream;
        //Make the mediaRecorder global
        window.mediaRecorder = mediaRecorder;

        mediaRecorder.start();

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/mp4" });
          const recordedMedia = document.createElement("video");
          recordedMedia.controls = true;
          console.log("Olha o blob")
          console.log(blob)
          const recordedMediaURL = URL.createObjectURL(blob);
          localStorage.removeItem('video_link');
          localStorage.setItem('video_link', blob)
          //let gravacao = document.getElementsByClassName('app__videoFeedRecorder')[0];
          //if (gravacao) {
          //gravacao.src = recordedMediaURL;
          setTst(recordedMediaURL);
          console.log("Olha aquiiioo: " + tst);
          //}

        };
        let video = document.getElementsByClassName('app__videoFeed')[0];
        if (video) {
          video.srcObject = mediaStream;
          //console.log(mediaStream)
        }
      }

      );
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName('app__videoFeed')[0];
    video.srcObject.getTracks()[0].stop();
    setIsEdition(true);
    //props.setTrigger(false);
  };
  const exibicaotelaGravar = () => {
    
    return (
      <div className="app" >
        <div className="app__container">
          <video height={HEIGHT} width={WIDTH} muted autoPlay className="app__videoFeed"></video>
        </div>
        <div className="app__input">
          {playing ? (
            <button onClick={stopVideo}>Stop</button>
          ) : (
            <button onClick={startVideo}>Start</button>
          )}

          {/*<video id="recorded-video" controls className="app__videoFeedRecorder">
            //Your browser doesn't support the video tag
          </video>*/}
        </div>

      </div>
    )
    
  }
  const exibicaotela = () => {
    
    return (
      <Editor videoUrl={tst} setVideoUrl={setTst} > </Editor>
    )
  }


  return (
    <div>
      {tst ? exibicaotela() : exibicaotelaGravar()}
    </div>

  );
}
export default Teste

