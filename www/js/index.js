var app = {
  startCameraAbove: function(){
    CameraPreview.startCamera({x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, toBack: false, previewDrag: true, tapPhoto: true});
  },

  startCameraBelow: function(){
    CameraPreview.startCamera({x: 0, y: 0, width: window.innerWidth, height:window.innerHeight, camera: "front", tapPhoto: true, previewDrag: false, toBack: true});

    setTimeout(function(){
    document.getElementById('backgroundimg').style ="display:block"
    }, 1000);
  },

  stopCamera: function(){
    CameraPreview.stopCamera();
  },

  takePicture: function(){
    CameraPreview.takePicture({width:window.innerWidth, height:window.innerHeight, quality: 85}, function(imgData){
      document.getElementById('originalPicture').src = 'data:image/jpeg;base64,' + imgData;

      document.getElementById('originalPicture').style ="display:block"
      document.getElementById('frame').style ="display:block"
      document.getElementById('photocontrols').style ="display:none"
      


          setTimeout(function(){
        navigator.screenshot.save(function(error,res){
          if(error){
          console.error(error);
          }else{
          console.log('ok',res.filePath);
          }
        });
        }, 500);

          setTimeout(function(){
    //do what you need here
        document.getElementById('originalPicture').style ="display:none"
        document.getElementById('frame').style ="display:none"
        document.getElementById('photocontrols').style ="display:block"
        }, 1000);

    });
  },

  

  switchCamera: function(){
    CameraPreview.switchCamera();
  },

  show: function(){
    CameraPreview.show();
  },

  hide: function(){
    CameraPreview.hide();
  },

  changeColorEffect: function(){
    var effect = document.getElementById('selectColorEffect').value;
    CameraPreview.setColorEffect(effect);
  },

  changeFlashMode: function(){
    var mode = document.getElementById('selectFlashMode').value;
    CameraPreview.setFlashMode(mode);
  },

  changeZoom: function(){
    var zoom = document.getElementById('zoomSlider').value;
    document.getElementById('zoomValue').innerHTML = zoom;
    CameraPreview.setZoom(zoom);
  },

  changePreviewSize: function(){
    window.smallPreview = !window.smallPreview;
    if(window.smallPreview){
      CameraPreview.setPreviewSize({width: 100, height: 100});
    }else{
      CameraPreview.setPreviewSize({width: window.screen.width, height: window.screen.height});
    }
  },

  showSupportedPictureSizes: function(){
    CameraPreview.getSupportedPictureSizes(function(dimensions){
      dimensions.forEach(function(dimension) {
        console.log(dimension.width + 'x' + dimension.height);
      });
    });
  },

  init: function(){
    document.getElementById('startCameraAboveButton').addEventListener('click', this.startCameraAbove, false);
    document.getElementById('startCameraBelowButton').addEventListener('click', this.startCameraBelow, false);

    document.getElementById('stopCameraButton').addEventListener('click', this.stopCamera, false);
    document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
    document.getElementById('showButton').addEventListener('click', this.show, false);
    document.getElementById('hideButton').addEventListener('click', this.hide, false);
    document.getElementById('takePictureButton').addEventListener('click', this.takePicture, false);
    document.getElementById('selectColorEffect').addEventListener('change', this.changeColorEffect, false);
    document.getElementById('selectFlashMode').addEventListener('change', this.changeFlashMode, false);

    if(navigator.userAgent.match(/Android/i)  == "Android"){
      document.getElementById('zoomSlider').addEventListener('change', this.changeZoom, false);
    }else{
      document.getElementById('androidOnly').style.display = 'none';
    }

    window.smallPreview = false;
    document.getElementById('changePreviewSize').addEventListener('click', this.changePreviewSize, false);

    document.getElementById('showSupportedPictureSizes').addEventListener('click', this.showSupportedPictureSizes, false);

    // legacy - not sure if this was supposed to fix anything
    //window.addEventListener('orientationchange', this.onStopCamera, false);
  }
};

document.addEventListener('deviceready', function(){	
  app.init();
}, false);


function onSaveImageSuccess() {
    console.log('--------------success');
    }
                                            
function onSaveImageError(error) {
    console.log('--------------error: ' + error);
    }