function checkCommand(command) {
    command = jQuery.trim(command);
    console.log( command );

    var str = 'left right down up';
    console.log( str.search(command) );

    if( str.search(command) > -1 ) return true;
    else return false;
}

function move(command){
    var isMatched = checkCommand(command);

    if( isMatched ) {
        
        var box = $("#box");
        switch(jQuery.trim(command)) {
            case 'left':
            box.stop().animate({left:"-=50px", duration: 800});
            break;

            case 'right':
            box.stop().animate({left:"+=50px", duration: 800});
            break;

            case 'up':
            box.stop().animate({top:"-=50px", duration: 800});
            break;

            case 'down':
            box.stop().animate({top:"+=50px", duration: 800});
            break;
        }

    }
}

var Voice = function(obj){
    this.recognition                = new webkitSpeechRecognition(); 
    this.recognition.continuous     = true;
    this.recognition.interimResults = true;
    this.lang                       = "en-GB";

    this.instant = (obj !== undefined && obj.instant !== undefined && obj.instant === true) ? true : false;
};

Voice.prototype.init = function() {
    var _self       = this.recognition,
    self            = this,
    finalTranscript = '';

    _self.start();
    _self.onresult = function(event) {
        
        var interimTranscript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            (event.results[i].isFinal) ? finalTranscript += event.results[i][0].transcript : interimTranscript = event.results[i][0].transcript;
        }

        (!self.instant) ? self.finalText(finalTranscript) : self.instantChange(interimTranscript);

        //console.log("interim:  " + interimTranscript);
        //console.log("final:  " + finalTranscript);

    };

    _self.onerror = function(event) {
        console.log("onerror");
    };

    _self.onend = function() {
        console.log('on end');
    };
 
};

Voice.prototype.finalText = function(text) {
    if(text.length != 0) console.log(text);
};

Voice.prototype.instantChange = function(text) {
    if(text.length != 0) {
        //console.log(text);
        move(text);
    }
};

Voice.prototype.stopVoice = function() {
    this.recognition.stop();
};

jQuery(document).ready(function($) {
    var activate = new Voice({ instant: true });
    activate.init();

    $('.run').click(function(event) {
        activate = new Voice({ instant: true });
        activate.init();
    });

    $('.stop').click(function(event) {
        activate.stopVoice();
    });

});