/* global L */
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
function ApplicationWindow() {
    //load component dependencies

    var win = Titanium.UI.createWindow({
        backgroundColor : '#c5c5c7',
        layout : 'absolute'
    });

    var count = 0, width = 250, height = 40, top = 10;

    var recording = Ti.Media.createAudioRecorder();
    recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
    recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
    var file;
    var fileName = "test.wav";

    Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;

    var modeArray = [{
        mode : Ti.Media.AUDIO_SESSION_MODE_AMBIENT,
        desc : 'Ambient Mode'
    }, {
        mode : Ti.Media.AUDIO_SESSION_MODE_SOLO_AMBIENT,
        desc : 'Solo Ambient Mode'
    }, {
        mode : Ti.Media.AUDIO_SESSION_MODE_PLAYBACK,
        desc : 'Playback Mode'
    }, {
        mode : Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD,
        desc : 'Play and Record Mode'
    }];

    var audio = Ti.Media.createAudioPlayer({
        url : 'http://appcelerator.qe.test.data.s3.amazonaws.com/KSResources/audio/audio_session.mp3'
    });
    var sound = Titanium.Media.createSound({
        url : '/cricket.wav'
    });

    var startAudio = Titanium.UI.createButton({
        title : 'Play Streaming Audio',
        top : top,
        width : width,
        height : height
    });
    startAudio.addEventListener('click', function() {
        Ti.API.info('streaming with mode ' + modeArray[count].desc + ' count ' + count);
        audio.start();
    });

    var stopAudio = Titanium.UI.createButton({
        title : 'Stop Audio',
        top : top,
        width : width,
        height : height
    });
    stopAudio.addEventListener('click', function() {
        audio.stop();
    });

    var startSound = Titanium.UI.createButton({
        title : 'Play sound',
        top : top,
        width : width,
        height : height
    });
    startSound.addEventListener('click', function() {
        Ti.API.info('playing sound with mode ' + modeArray[count].desc + ' count ' + count);
        sound.play();
    });

    var stopSound = Titanium.UI.createButton({
        title : 'Stop Sound',
        top : top,
        width : width,
        height : height
    });
    stopSound.addEventListener('click', function() {
        sound.stop();
    });

    var startRecord = Titanium.UI.createButton({
        title : 'Record Sound',
        top : top,
        width : width,
        height : height
    });
    startRecord.addEventListener('click', function() {
        Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
        recording.start();
        l.text = 'Play and Record Mode';
    });

    var stopRecord = Titanium.UI.createButton({
        title : 'Stop Record',
        top : top,
        width : width,
        height : height
    });
    stopRecord.addEventListener('click', function() {
        var fileSize, fileandpathspec, savedFile;
        try {
            file = recording.stop();
            fileSize = file.size;
            fileandpathspec = Titanium.Filesystem.applicationDataDirectory + fileName;
            savedFile = Titanium.Filesystem.getFile(fileandpathspec);
            if (file.size > 0) {
                savedFile.write(file);
            } else {
                throw {
                    name : 'stopRecord',
                    message : 'unable to save: file zero bytes'
                };
            }
        } catch (ex) {
            alert(ex.message);
        }
    });

    var changeMode = Titanium.UI.createButton({
        title : 'Change Audio Mode',
        top : top,
        width : width,
        height : height
    });
    changeMode.addEventListener('click', function() {
        audio.stop();
        sound.stop();

        if (count === modeArray.length - 1) {
            count = 0;
        } else {
            count++;
        }
        Titanium.Media.audioSessionMode = modeArray[count].mode;
        l.text = modeArray[count].desc;
    });

    var l = Ti.UI.createLabel({
        text : 'Ambient Mode',
        top : top,
        width : width,
        height : height,
        textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    var view = Ti.UI.createView({
        layout : 'vertical'
    });
    view.add(startAudio);
    view.add(stopAudio);
    view.add(startSound);
    view.add(stopSound);
    view.add(startRecord);
    view.add(stopRecord);
    view.add(changeMode);
    view.add(l);
    win.add(view);
    return win;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
