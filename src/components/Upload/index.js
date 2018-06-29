import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = 'lf8r8pyl';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sooonr/upload';

class Upload extends Component{

   
    constructor(props) {
        super(props);

        
       
        
        this.state = {
          uploadedFileCloudinaryUrl: '',
          listIMG:''
        };
        axios.get('https://533857667659211:7me_MjtE5DsfrwcBUgnsD6MjVlI@api.cloudinary.com/v1_1/sooonr/resources/image/upload?max_results=500&prefix=test/user')
        .then(res => {
            console.log(res.data.public_id);
            this.setState({
              listIMG: res
            });
        });
      }


      
      onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }


      handleImageUpload(file) {
         let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file)
                            .field('folder','test/user/video')
                            .field('resource_type','video'); 
                            /* .field('resource_type','image'); */ 

     /*    const params = new URLSearchParams();
        params.append('upload_preset',CLOUDINARY_UPLOAD_PRESET);
        params.append('file', file);
        params.append('folder', 'test'); */
        

       /*  let upload = axios.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);  */
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
            console.log(response.body);
          }
        });
      }

    render() {
        return(
          <form>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              multiple={true}
              accept="image/*,video/*">
              <div>Drop an image /a video or click to select a file to upload.</div>
            </Dropzone>
          </div>
  
          <div>
           <p>{this.state.listIMG}</p>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>}
          </div>
        </form>


        );
        
      }
} 
const styles = StyleSheet.create({
    
});
export default Upload;