import ImagePicker from 'react-native-customized-image-picker';

ImagePicker.openPicker({}).then(image => {
    console.log(image);
});
ImagePicker.openPicker({
    multiple: true
}).then(images => {
    console.log(images);
});
ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true
}).then(image => {
    console.log(image);
});
ImagePicker.openCamera({
    width: 300,
    height: 400,
    isVideo: true
}).then(image => {
    console.log(image);
});
ImagePicker.clean()
    .then(() => {
        console.log("removed all tmp images from tmp directory");
    })
    .catch(e => {
        console.log(e);
    });
