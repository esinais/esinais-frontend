import React from 'react';
import { FileDrop } from 'react-file-drop'
import './css/editor.css'
import Editor from './Editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons'



class VideoEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpload: false,
            videoUrl: props.videoUrl,
            isDarkMode: false,
            timings: []
        }
        console.log("Olha aqui editor: " + this.state.videoUrl);
    }
   
    componentDidMount = () => {
        this.toggleThemes()
        document.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
          });
    }

    fechar_tela = () => {

    }

    render_uploader = () => {
        
        return(
            <div className={"wrapper"}>
                <input
                    onChange={(e) => this.upload_file(e.target.files)}
                    type="file"
                    className="hidden"
                    id="up_file"
                    
                />
                <FileDrop
                    onDrop={(e) => this.upload_file(e)}
                    onTargetClick={() => document.getElementById("up_file").click()}
                >
                    Click or drop your video here to edit!
                </FileDrop>
            </div>
        )
    }

    saveVideo = (metadata) => {
        //const history = useHistory(); // navegar entre as páginas
        console.log(metadata)
        console.log("Dados de corte")
        this.props.setVideoUrl(this.state.timings)
        localStorage.removeItem('video_tempo_inicial');
        localStorage.removeItem('video_tempo_final');
        localStorage.setItem('video_tempo_inicial', this.state.timings[0].start)
        localStorage.setItem('video_tempo_final', this.state.timings[0].end)
        alert("Video salvo com sucesso!");
        this.setState({
            isUpload: true
        })
        //return history.push('/cadastrarSinal');
        //this.state.isUpload = false;
        //alert("Please check your console to see all the metadata. This can be used for video post-processing.")
    }

    render_editor = () => {
        
        return(
            // Props:a
            // videoUrl --> URL of uploaded video
            // saveVideo(<metadata of edited video>) --> gives the cut times and if video is muted or not
            <Editor videoUrl={this.state.videoUrl} saveVideo={this.saveVideo}
                    timings={this.state.timings} 
                    updateState={(st,cb) => this.setState(st, cb)}/>
        )
    }

    toggleThemes = () =>{
        if(this.state.isDarkMode){
            document.body.style.backgroundColor = "#1f242a";
            document.body.style.color = "#fff";
        }
        else{
            document.body.style.backgroundColor = "#fff";
            document.body.style.color = "#1f242a";
        }
        this.setState({isDarkMode: !this.state.isDarkMode})
    }

    upload_file = (fileInput) => {
		let fileUrl = window.URL.createObjectURL(fileInput[0]);
        let filename = fileInput.name;
        this.setState({
            isUpload: false,
            videoUrl: fileUrl
        })
    }

    render = () => {
        return(
            <div>
                {this.state.isUpload ? this.fechar_tela() : this.render_editor()}
                <div className={"theme_toggler"} onClick={this.toggleThemes}>{this.state.isDarkMode? (<i className="toggle" aria-hidden="true"><FontAwesomeIcon icon={faLightbulb} /></i>) : <i className="toggle"><FontAwesomeIcon icon={faMoon} /></i>}</div>
            </div>
        )
    }
}

export default VideoEditor