import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, Redirect } from 'react-router-dom';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
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
          gallery: [],
          image: true,
        };   
      }

      
      
      onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
        console.log(localStorage.getItem('userId'))
        this.handleImageUpload(files[0],localStorage.getItem('userId'));      
        //this.getImage(localStorage.getItem('userId'));
     }


      handleImageUpload(file,userId) {
         let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file)
                            .field('folder','test/user')
                            .field('resource_type','image')
                            .field('tags',userId);
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

      getImage(userId){
        console.log(userId);
        axios.get('http://res.cloudinary.com/sooonr/image/list/'+ userId +'.json') 
        .then(res => {
        console.log(res.data.ressources);
        this.setState({gallery: res.data.resources}); 
      })
    }

    render() {
        return(
          <div>
         {  <CloudinaryContext cloudName="sooonr">
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target="_blank" href={`https://res.cloudinary.com/sooonr/image/upload/${data.public_id}.jpg`}>
                                                <Image publicId={data.public_id}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="300"
                                                        height="200"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                                            </a>
                                            <div className="desc">Created at {data.created_at}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext> }
          <form>
            <Image folder="test/" >

          </Image>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              multiple={true}
              accept="image/*,video/*">
              <div>Glisser une image ou cliquer ici pour choisir une image a importé</div>
            </Dropzone>
          </div>
  
          <div>
          
           <p>{this.state.listIMG}</p>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              
              <img src={this.state.uploadedFileCloudinaryUrl} width="500"/>
            </div>}
          </div>
        </form>
</div>

        );
        
      }
} 
const styles = StyleSheet.create({
    
});
export default Upload;