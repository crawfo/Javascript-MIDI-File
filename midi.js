//test file
const testFile = [ 77, 84, 104, 100, 0, 0, 0, 6, 0, 1, 0,
                   2, 1, 224, 77, 84, 114, 107, 0, 0, 0, 21, 
                   0, 146, 60, 68, 0, 64, 65, 0, 67, 62, 
                   0, 240, 4, 127, 127, 127, 247, 0, 255, 47, 0,
                   77, 84, 114, 107, 0, 0, 0, 21, 
                   0, 146, 60, 68, 0, 64, 65, 0, 67, 62, 
                   0, 240, 4, 127, 127, 127, 247, 0, 255, 47, 0 ];
                   
const testTrack = testFile.slice(14, 43);
const testTracks = testFile.slice(14, 43).concat(testFile.slice(14, 43));

//constants
const MAX_7_BIT_VALUE = 127;
const FILE_HEADER_LENGTH = 14; 
const TRACK_HEADER_LENGTH = 8; 
const MAX_MIDI_VALUE = 0xfffffff;

//enums
const ChannelEventTypeEnum = {
    TWO_BYTE: 2,
    THREE_BYTE: 3
};

const StatusEnum = {
    NOTE_OFF: 0x8,
    NOTE_ON: 0x9,
    NOTE_AFTERTOUCH: 0xa,
    CONTROLLER: 0xb,
    PROGRAM_CHANGE: 0xc,
    CHANNEL_AFTERTOUCH: 0xd,
    PITCH_BEND: 0xe,
    META_EVENT: 0xff,
    SYSTEM_EXCLUSIVE_START: 0xf0,
    SYSTEM_EXCLUSIVE_CONTINUE: 0xf7,
    SYSTEM_EXCLUSIVE_END: 0xf7
};

const MetaEventTypeEnum = {
    SEQUENCE_NUMBER: 0x0,
    TEXT_EVENT: 0x1,
    COPYRIGHT_NOTICE: 0x2,
    SEQUENCE_TRACK_NAME: 0x3,
    INSTRUMENT_NAME: 0x4,
    LYRICS: 0x5,
    MARKER: 0x6,
    CUE_POINT: 0x7,
    MIDI_CHANNEL_PREFIX: 0x20,
    MIDI_PORT: 0x21,
    END_OF_TRACK: 0x2f,
    SET_TEMPO: 0x51,
    SMPTE_OFFSET: 0x54,
    TIME_SIGNATURE: 0x58,
    KEY_SIGNATURE: 0x59,
    SEQUENCER_SPECIFIC: 0x7f
};

const SystemExclusiveTypeEnum = {
    NORMAL: 0,
    DIVIDED: 1,
    AUTHORIZATION: 2
};

const ContinuousControllerTypeEnum = {
    BANK_SELECT_MSB: 0,
    MODULATION_MSB: 1,
    BREATH_CONTROLLER_MSB: 2,
    FOOT_CONTROLLER_MSB: 4,
    PORTAMENTO_TIME_MSB: 5,
    DATA_ENTRY_MSB: 6,
    CHANNEL_VOLUME_MSB: 7,
    BALANCE_MSB: 8,
    PAN_MSB: 10,
    EXPRESSION_CONTROLLER_MSB: 11,
    EFFECT_CONTROL_1_MSB: 12,
    EFFECT_CONTROL_2_MSB: 13,
    CONTINUOUS_CONTROLLER_14: 14,
    CONTINUOUS_CONTROLLER_15: 15,
    GENERAL_PURPOSE_CONTROLLER_1: 16,
    GENERAL_PURPOSE_CONTROLLER_2: 17,
    GENERAL_PURPOSE_CONTROLLER_3: 18,
    GENERAL_PURPOSE_CONTROLLER_4: 19,
    CONTINUOUS_CONTROLLER_20: 20,
    CONTINUOUS_CONTROLLER_21: 21,
    CONTINUOUS_CONTROLLER_22: 22,
    CONTINUOUS_CONTROLLER_23: 23,
    CONTINUOUS_CONTROLLER_24: 24,
    CONTINUOUS_CONTROLLER_25: 25,
    CONTINUOUS_CONTROLLER_26: 26,
    CONTINUOUS_CONTROLLER_27: 27,
    CONTINUOUS_CONTROLLER_28: 28,
    CONTINUOUS_CONTROLLER_29: 29,
    CONTINUOUS_CONTROLLER_30: 30,
    CONTINUOUS_CONTROLLER_31: 31,
    BANK_SELECT_LSB: 32,
    MODULATION_LSB: 33,
    BREATH_CONTROLLER_LSB: 34,
    FOOT_CONTROLLER_LSB: 36,
    PORTAMENTO_TIME_LSB: 37,
    DATA_ENTRY_LSB: 38,
    CHANNEL_VOLUME_LSB: 39,
    BALANCE_LSB: 40,
    PAN_LSB: 42,
    EXPRESSION_CONTROLLER_LSB: 43,
    EFFECT_CONTROL_1_LSB: 44,
    EFFECT_CONTROL_2_LSB: 45,
    CONTROLLER_14_LSB: 46,
    CONTROLLER_15_LSB: 47,
    CONTROLLER_16_LSB: 48,
    CONTROLLER_17_LSB: 49,
    CONTROLLER_18_LSB: 50,
    CONTROLLER_19_LSB: 51,
    CONTROLLER_20_LSB: 52,
    CONTROLLER_21_LSB: 53,
    CONTROLLER_22_LSB: 54,
    CONTROLLER_23_LSB: 55,
    CONTROLLER_24_LSB: 56,
    CONTROLLER_25_LSB: 57,
    CONTROLLER_26_LSB: 58,
    CONTROLLER_27_LSB: 59,
    CONTROLLER_28_LSB: 60,
    CONTROLLER_29_LSB: 61,
    CONTROLLER_30_LSB: 62,
    CONTROLLER_31_LSB: 63,
    SUSTAIN_PEDAL: 64,
    PORTAMENTO: 65,
    SOSTENUTO: 66,
    SOFT_PEDAL: 67,
    LEGATO_FOOTSWITCH: 68,
    HOLD_2_PEDAL: 69,
    SOUND_VARIATION: 70,
    SOUND_RESONANCE: 71,
    SOUND_RELEASE_TIME: 72,
    SOUND_ATTACK_TIME: 73,
    SOUND_FREQUENCY_CUTOFF: 74,
    SOUND_CONTROLLER_6: 75,
    SOUND_CONTROLLER_7: 76,
    SOUND_CONTROLLER_8: 77,
    SOUND_CONTROLLER_9: 78,
    SOUND_CONTROLLER_10: 79,
    GENERAL_PURPOSE_CONTROLLER_5: 80,
    GENERAL_PURPOSE_CONTROLLER_6: 81,
    GENERAL_PURPOSE_CONTROLLER_7: 82,
    GENERAL_PURPOSE_CONTROLLER_8: 83,
    PORTAMENTO_CONTROL: 84,
    CONTINUOUS_CONTROLLER_85: 85,
    CONTINUOUS_CONTROLLER_86: 86,
    CONTINUOUS_CONTROLLER_87: 87,
    CONTINUOUS_CONTROLLER_88: 88,
    CONTINUOUS_CONTROLLER_89: 89,
    CONTINUOUS_CONTROLLER_90: 90,
    EFFECTS_DEPTH_1_EXTERNAL_EFFECTS_DEPTH: 91,
    EFFECTS_DEPTH_2_TREMOLO_DEPTH: 92,
    EFFECTS_DEPTH_3_CHORUS_DEPTH: 93,
    EFFECTS_DEPTH_4_CELESTE_DETUNE: 94,
    EFFECTS_DEPTH_5_PHASER_DEPTH: 95,
    DATA_INCREMENT: 96,
    DATA_DECREMENT: 97,
    NON_REGISTERED_PARAMETER_NUMBER_LSB: 98,
    NON_REGISTERED_PARAMETER_NUMBER_MSB: 99,
    REGISTERED_PARAMETER_NUMBER_LSB: 100,
    REGISTERED_PARAMETER_NUMBER_MSB: 101,
    
    ALL_SOUND_OFF: 120,
    RESET_ALL_CONTROLLERS: 121,
    LOCAL_CONTROL_ON_OFF: 122,
    ALL_NOTES_OFF: 123,
    OMNI_MODE_OFF: 124,
    OMNI_MODE_ON: 125,
    POLY_MODE_ON_OFF: 126,
    POLY_MODE_ON: 127
};

const TrackChunkTypeEnum = {
    BYTE_1: 0x4d, //77
    BYTE_2: 0x54, //84
    BYTE_3: 0x72, //114
    BYTE_4: 0x6b //107
};

const HeaderChunkEnum = {
    CHUNK_TYPE_BYTE_1: 0x4D, //77
    CHUNK_TYPE_BYTE_2: 0x54, //84
    CHUNK_TYPE_BYTE_3: 0x68, //104
    CHUNK_TYPE_BYTE_4: 0x64, //100
    CHUNK_LENGTH_BYTE_1: 0x0, //0
    CHUNK_LENGTH_BYTE_2: 0x0, //0
    CHUNK_LENGTH_BYTE_3: 0x0, //0
    CHUNK_LENGTH_BYTE_4: 0x6, //6
    FORMAT_BYTE_1: 0x0
};

const TimeDivisionTypeEnum = {
    PULSES_PER_QUARTER_NOTE: 1,
    SMPTE_MIDI_TIME_CODE: 2
};

const SmpteFormatEnum = {
    FPS_24: -24,
    FPS_25: -25,
    FPS_29: -29,
    FPS_30_DROP_FRAME: -30
};

//common midi functions
function encodeVLV( value ) {
    //encodes a number to an array of variable length value bytes
    let valueBitShiftedRight;
    let vlvBytes = [];
    let numBits;
        
    const BIT_MASK_PRESERVE_BITS_0_TO_7 = 0x7f ; // 0 1111111
    const BIT_MASK_SET_BIT_8_PRESERVE_BITS_0_TO_7 = 0x80; // 1 0000000
    const MAX_MIDI_VALUE = 0xfffffff;
    
    if ( value > MAX_MIDI_VALUE || value < 0 ) {
        throw new RangeError( `Value must be between 0 and $(MAX_MIDI_VALUE)` );
    } 
    
    for ( let numBits = 21; numBits >= 7; numBits -= 7 ) {
        valueBitShiftedRight = value >> numBits;
        if ( valueBitShiftedRight > 0  ) {
            vlvBytes.push( ( valueBitShiftedRight & BIT_MASK_PRESERVE_BITS_0_TO_7 ) | 
                            BIT_MASK_SET_BIT_8_PRESERVE_BITS_0_TO_7 );
        }
    }
    
    //last byte so must have msb clear not set
    vlvBytes.push( ( value >> numBits ) & BIT_MASK_PRESERVE_BITS_0_TO_7 );
    
    return vlvBytes;
}

function decodeVLV( vlvBytes ) {
    //decodes an array of variable length value bytes to a number
    const BIT_MASK_MSB = 0xff; //0b11111111
    const BIT_MASK_MSB_CLEARED = 0x80; //0b10000000
    let msbIsCleared = false;
    let decodedVlv;
    let currentByte;
    let i = 0;
    
    //guard clause
    if ( ( vlvBytes[vlvBytes.length - 1] > MAX_7_BIT_VALUE ) || ( vlvBytes.length - 1 > 4) )  {
        throw new RangeError( `Decoded value must be between 0 and $(MAX_MIDI_VALUE)` );
    }
    
    do {
        //apply msb bit mask
        currentByte = vlvBytes[ i ] & BIT_MASK_MSB; //0xff
        //shifts bits 7 places to left,      masks first 7 bits
        decodedVlv = ( decodedVlv << 7 ) | ( currentByte & 0x7f );
        // let p1 = 
        msbIsCleared = ( currentByte & BIT_MASK_MSB_CLEARED ) === 0 ;
        i++;
    }
    while ( !msbIsCleared );
    
    
    return decodedVlv;
}

function toFourBytesFromLong( trackDataLength ) {
    let bytes = [];
    bytes[0] = ( trackDataLength & 0b11111111000000000000000000000000 ) >> 24;
    bytes[1] = ( trackDataLength & 0b00000000111111110000000000000000 ) >> 16;
    bytes[2] = ( trackDataLength & 0b00000000000000001111111100000000 ) >> 8;
    bytes[3] = ( trackDataLength & 0b00000000000000000000000011111111 );
    return bytes;
}

function getVLVBytes( bytes, startPosition ) {
    //returns vlv byte collection from an array
    let i = startPosition;
    let vlvBytes = [];

    //collect vlv bytes
    while ( hasMsbSet( bytes[i] ) && ( i < bytes.length ) ) {
        vlvBytes.push( bytes[i] ); 
        i += 1;
    }

    //add last value - no need to check msb as if last value then msb must be 0
    vlvBytes.push( bytes[i] );

    return vlvBytes;
}

function hasMsbSet( byteToCheck ) {
    //returns true when msb is set, otherwise false
    return byteToCheck > MAX_7_BIT_VALUE;
}

//----------------------------------------------------------------------------------------
//factory function implementation
//----------------------------------------------------------------------------------------
function createSerializer() { //todo: incomplete
    return {
        serializeChannelEvent: function( channelEvent ) {
            
        },
        serializeMetaEvent: function( metaEvent ) {
            
        },
        serializeSystemExclusiveEvent: function( systemExclusiveEvent ) {
            
        }
    };
}

function serialize( trackEvent ) {
    const eventBytes = [];
    const deltaBytes = encodeVLV( trackEvent.delta );
    
    //add delta bytes
    deltaBytes.forEach( function( deltaByte ) {
        eventBytes.push( deltaByte );
    } );
   
    //add event bytes
    const isMetaEvt = ( trackEvent.status === StatusEnum.META_EVENT );
    const isSyxEvt = ( trackEvent.status === StatusEnum.SYSTEM_EXCLUSIVE_START || 
                       trackEvent.status === StatusEnum.SYSTEM_EXCLUSIVE_CONTINUE );
    const isChannelEvt = !( isMetaEvt || isSyxEvt );
    
    if ( isChannelEvt ) {
        const isTwoByteEvt = ( trackEvent.channelEventType === 
                               ChannelEventTypeEnum.TWO_BYTE );
        if ( trackEvent.isRunningStatus ) {
            //data
            eventBytes.push( trackEvent.data[0] );
            if ( !isTwoByteEvt ) {
                eventBytes.push( trackEvent.data[1] );
            }
        } 
        else {
            //status
            eventBytes.push( joinTwoNibbles( trackEvent.statusNibble, trackEvent.channelNibble ) );
            //data
            eventBytes.push( trackEvent.data[0] ); //todo: magic nums
            if ( !isTwoByteEvt ) {
                eventBytes.push( trackEvent.data[1] ); //todo: magic nums
            }
        }
    }
    else {
        //status
        eventBytes.push( trackEvent.status );
        //meta type
        if ( isMetaEvt ) {
            eventBytes.push( trackEvent.metaType );
        }  
        //data len
        const vlvBytes = encodeVLV( trackEvent.data.length );
        vlvBytes.forEach( function( vlvByte ) {
            eventBytes.push( vlvByte );
        } );
        //data
        trackEvent.data.forEach( function( dataByte ) {
            eventBytes.push( dataByte );
        } );
    };
    return eventBytes;
    function joinTwoNibbles( nibbleHigh, nibbleLow ) {
        return ( nibbleHigh << 4 ) | nibbleLow;
    }
}

function createChannelEvent( { isRunningStatus, 
                               deltaTime ,
                               absoluteTime,
                               statusNibble,
                               channelNibble,
                               dataByte1,
                               dataByte2 } ) { //dataByte2 is optional
    let data;
    let channelEventType;
    if (  typeof( dataByte2 ) === 'undefined' ) {
        //guard clause
        if ( isNot7BitValue( dataByte1 ) ) {
            throw new RangeError( "Data bytes must be in range 0 <= 127" );
        }
        data = [ dataByte1 ];
        channelEventType = ChannelEventTypeEnum.TWO_BYTE;
    } else {
        //guard clause
        if ( isNot7BitValue( dataByte1 ) || isNot7BitValue( dataByte2 ) ) {
            throw new RangeError( "Data bytes must be in range 0 <= 127" );
        }
        data = [ dataByte1, dataByte2 ];
        channelEventType = ChannelEventTypeEnum.THREE_BYTE;
    }
    
    const objectName = "ChannelEvent";
	const eventCoreLength = isRunningStatus ? 0 : 1; //eventCoreLength is the number of non-data event bytes
    const eventLength = eventCoreLength + data.length;    
   	let statusName = toStatusName( statusNibble );
    if ( statusNibble === StatusEnum.CONTROLLER ) {
        statusName = statusName + ":" + toControllerName( dataByte1 );
    };

    return { isRunningStatus, 
             delta: deltaTime,
             absoluteTime,
             statusNibble,
             statusName,
             channelNibble,
             data, //todo: rename eventData?
             eventCoreLength,
             eventLength,
             objectName };
             
    //private methods
    function is7BitValue( value ) {
        return value >= 0 && value <= 127;
    }

    function isNot7BitValue( value ) {
        return !is7BitValue( value );
    }

    function toStatusName( statusNibble ) {
        //converts status nibble to name: e.g. 8 --> "NoteOff"
        let statusName;
        switch(statusNibble) {
            case StatusEnum.NOTE_OFF:
                statusName = "NoteOff";
                break;
            case StatusEnum.NOTE_ON:
                statusName = "NoteOn";
                break;
            case StatusEnum.NOTE_AFTERTOUCH:
                statusName = "NoteAftertouch";
                break;
            case StatusEnum.CONTROLLER:
                statusName = "Controller";
                break;
            case StatusEnum.PROGRAM_CHANGE:
                statusName = "ProgramChange";
                break;
            case StatusEnum.CHANNEL_AFTERTOUCH:
                statusName = "ChannelAftertouch";
                break;
            case StatusEnum.PITCH_BEND:
                statusName = "PitchBend";
                break;
            default:
                throw new RangeError("Invalid status byte");
                //statusName = "Invalid status byte";
                break;
        }
        return  statusName;
    }

    function toControllerName( controllerNumber ) {
        let controllerName;
        switch( controllerNumber ) {
            case ContinuousControllerTypeEnum.BANK_SELECT_MSB:
                controllerName = "BankSelectMSB";
                break;
            case ContinuousControllerTypeEnum.MODULATION_MSB:
                controllerName = "ModulationMSB";
                break;
            case ContinuousControllerTypeEnum.BREATH_CONTROLLER_MSB:
                controllerName = "BreathControllerMSB";
                break;
            case ContinuousControllerTypeEnum.FOOT_CONTROLLER_MSB:
                controllerName = "FootControllerMSB";
                break;
            case ContinuousControllerTypeEnum.PORTAMENTO_TIME_MSB:
                controllerName = "PortamentoTimeMSB";
                break;
            case ContinuousControllerTypeEnum.DATA_ENTRY_MSB:
                controllerName = "DataEntryMSB";
                break;
            case ContinuousControllerTypeEnum.CHANNEL_VOLUME_MSB:
                controllerName = "ChannelVolumeMSB";
                break;
            case ContinuousControllerTypeEnum.BALANCE_MSB:
                controllerName = "BalanceMSB";
                break;
            case ContinuousControllerTypeEnum.PAN_MSB:
                controllerName = "PanMSB";
                break;
            case ContinuousControllerTypeEnum.EXPRESSION_CONTROLLER_MSB:
                controllerName = "ExpressionControllerMSB";
                break;
            case ContinuousControllerTypeEnum.EFFECT_CONTROL_1_MSB:
                controllerName = "EffectControl1MSB";
                break;
            case ContinuousControllerTypeEnum.EFFECT_CONTROL_2_MSB:
                controllerName = "EffectControl2MSB";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_14:
                controllerName = "ContinuousController14";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_15:
                controllerName = "ContinuousController15";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_1:
                controllerName = "GeneralPurposeController1";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_2:
                controllerName = "GeneralPurposeController2";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_3:
                controllerName = "GeneralPurposeController3";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_4:
                controllerName = "GeneralPurposeController4";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_20:
                controllerName = "ContinuousController20";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_21:
                controllerName = "ContinuousController21";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_22:
                controllerName = "ContinuousController22";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_23:
                controllerName = "ContinuousController23";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_24:
                controllerName = "ContinuousController24";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_25:
                controllerName = "ContinuousController25";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_26:
                controllerName = "ContinuousController26";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_27:
                controllerName = "ContinuousController27";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_28:
                controllerName = "ContinuousController28";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_29:
                controllerName = "ContinuousController29";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_30:
                controllerName = "ContinuousController30";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_31:
                controllerName = "ContinuousController31";
                break;
            case ContinuousControllerTypeEnum.BANK_SELECT_LSB:
                controllerName = "BankSelectLSB";
                break;
            case ContinuousControllerTypeEnum.MODULATION_LSB:
                controllerName = "ModulationLSB";
                break;
            case ContinuousControllerTypeEnum.BREATH_CONTROLLER_LSB:
                controllerName = "BreathControllerLSB";
                break;
            case ContinuousControllerTypeEnum.FOOT_CONTROLLER_LSB:
                controllerName = "FootControllerLSB";
                break;
            case ContinuousControllerTypeEnum.PORTAMENTO_TIME_LSB:
                controllerName = "PortamentoTimeLSB";
                break;
            case ContinuousControllerTypeEnum.DATA_ENTRY_LSB:
                controllerName = "DataEntryLSB";
                break;
            case ContinuousControllerTypeEnum.CHANNEL_VOLUME_LSB:
                controllerName = "ChannelVolumeLSB";
                break;
            case ContinuousControllerTypeEnum.BALANCE_LSB:
                controllerName = "BalanceLSB";
                break;
            case ContinuousControllerTypeEnum.PAN_LSB:
                controllerName = "PanLSB";
                break;
            case ContinuousControllerTypeEnum.EXPRESSION_CONTROLLER_LSB:
                controllerName = "ExpressionControllerLSB";
                break;
            case ContinuousControllerTypeEnum.EFFECT_CONTROL_1_LSB:
                controllerName = "EffectControl1LSB";
                break;
            case ContinuousControllerTypeEnum.EFFECT_CONTROL_2_LSB:
                controllerName = "EffectControl2LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_14_LSB:
                controllerName = "Controller14LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_15_LSB:
                controllerName = "Controller15LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_16_LSB:
                controllerName = "Controller16LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_17_LSB:
                controllerName = "Controller17LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_18_LSB:
                controllerName = "Controller18LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_19_LSB:
                controllerName = "Controller19LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_20_LSB:
                controllerName = "Controller20LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_21_LSB:
                controllerName = "Controller21LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_22_LSB:
                controllerName = "Controller22LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_23_LSB:
                controllerName = "Controller23LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_24_LSB:
                controllerName = "Controller24LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_25_LSB:
                controllerName = "Controller25LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_26_LSB:
                controllerName = "Controller26LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_27_LSB:
                controllerName = "Controller27LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_28_LSB:
                controllerName = "Controller28LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_29_LSB:
                controllerName = "Controller29LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_30_LSB:
                controllerName = "Controller30LSB";
                break;
            case ContinuousControllerTypeEnum.CONTROLLER_31_LSB:
                controllerName = "Controller31LSB";
                break;
            case ContinuousControllerTypeEnum.SUSTAIN_PEDAL:
                controllerName = "SustainPedal";
                break;
            case ContinuousControllerTypeEnum.PORTAMENTO:
                controllerName = "Portamento";
                break;
            case ContinuousControllerTypeEnum.SOSTENUTO:
                controllerName = "Sostenuto";
                break;
            case ContinuousControllerTypeEnum.SOFT_PEDAL:
                controllerName = "SoftPedal";
                break;
            case ContinuousControllerTypeEnum.LEGATO_FOOTSWITCH:
                controllerName = "LegatoFootswitch";
                break;
            case ContinuousControllerTypeEnum.HOLD_2_PEDAL:
                controllerName = "Hold2Pedal";
                break;
            case ContinuousControllerTypeEnum.SOUND_VARIATION:
                controllerName = "SoundVariation";
                break;
            case ContinuousControllerTypeEnum.SOUND_RESONANCE:
                controllerName = "SoundResonance";
                break;
            case ContinuousControllerTypeEnum.SOUND_RELEASE_TIME:
                controllerName = "SoundReleaseTime";
                break;
            case ContinuousControllerTypeEnum.SOUND_ATTACK_TIME:
                controllerName = "SoundAttackTime";
                break;
            case ContinuousControllerTypeEnum.SOUND_FREQUENCY_CUTOFF:
                controllerName = "SoundFrequencyCutoff";
                break;
            case ContinuousControllerTypeEnum.SOUND_CONTROLLER_6:
                controllerName = "SoundController6";
                break;
            case ContinuousControllerTypeEnum.SOUND_CONTROLLER_7:
                controllerName = "SoundController7";
                break;
            case ContinuousControllerTypeEnum.SOUND_CONTROLLER_8:
                controllerName = "SoundController8";
                break;
            case ContinuousControllerTypeEnum.SOUND_CONTROLLER_9:
                controllerName = "SoundController9";
                break;
            case ContinuousControllerTypeEnum.SOUND_CONTROLLER_10:
                controllerName = "SoundController10";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_5:
                controllerName = "GeneralPurposeController5";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_6:
                controllerName = "GeneralPurposeController6";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_7:
                controllerName = "GeneralPurposeController7";
                break;
            case ContinuousControllerTypeEnum.GENERAL_PURPOSE_CONTROLLER_8:
                controllerName = "GeneralPurposeController8";
                break;
            case ContinuousControllerTypeEnum.PORTAMENTO_CONTROL:
                controllerName = "PortamentoControl";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_85:
                controllerName = "ContinuousController85";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_86:
                controllerName = "ContinuousController86";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_87:
                controllerName = "ContinuousController87";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_88:
                controllerName = "ContinuousController88";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_89:
                controllerName = "ContinuousController89";
                break;
            case ContinuousControllerTypeEnum.CONTINUOUS_CONTROLLER_90:
                controllerName = "ContinuousController90";
                break;
            case ContinuousControllerTypeEnum.EFFECTS_DEPTH_1_EXTERNAL_EFFECTS_DEPTH:
                controllerName = "Effects1Depth(ExternalEffectsDepth)";
                break;
            case ContinuousControllerTypeEnum.EFFECTS_DEPTH_2_TREMOLO_DEPTH:
                controllerName = "Effects2Depth(TremoloDepth)";
                break;
            case ContinuousControllerTypeEnum.EFFECTS_DEPTH_3_CHORUS_DEPTH:
                controllerName = "Effects3Depth(ChorusDepth)";
                break;
            case ContinuousControllerTypeEnum.EFFECTS_DEPTH_4_CELESTE_DETUNE:
                controllerName = "Effects4Depth(CelesteDetune)";
                break;
            case ContinuousControllerTypeEnum.EFFECTS_DEPTH_5_PHASER_DEPTH:
                controllerName = "Effects5Depth(PhaserDepth)";
                break;
            case ContinuousControllerTypeEnum.DATA_INCREMENT:
                controllerName = "DataIncrement";
                break;
            case ContinuousControllerTypeEnum.DATA_DECREMENT:
                controllerName = "DataDecrement";
                break;
            case ContinuousControllerTypeEnum.NON_REGISTERED_PARAMETER_NUMBER_LSB:
                controllerName = "NonRegisteredParameterNumberLSB";
                break;
            case ContinuousControllerTypeEnum.NON_REGISTERED_PARAMETER_NUMBER_MSB:
                controllerName = "NonRegisteredParameterNumberMSB";
                break;
            case ContinuousControllerTypeEnum.REGISTERED_PARAMETER_NUMBER_LSB:
                controllerName = "RegisteredParameterNumberLSB";
                break;
            case ContinuousControllerTypeEnum.REGISTERED_PARAMETER_NUMBER_MSB:
                controllerName = "RegisteredParameterNumberMSB";
                break;
            case ContinuousControllerTypeEnum.ALL_SOUND_OFF:
                controllerName = "AllSoundsOff";
                break;
            case ContinuousControllerTypeEnum.RESET_ALL_CONTROLLERS:
                controllerName = "ResetAllControllers";
                break;
            case ContinuousControllerTypeEnum.LOCAL_CONTROL_ON_OFF:
                controllerName = "LocalContorlOnOff";
                break;
            case ContinuousControllerTypeEnum.ALL_NOTES_OFF:
                controllerName = "AllNotesOff";
                break;
            case ContinuousControllerTypeEnum.OMNI_MODE_OFF:
                controllerName = "OmniModeOff";
                break;
            case ContinuousControllerTypeEnum.OMNI_MODE_ON:
                controllerName = "OmniModeOn";
                break;
            case ContinuousControllerTypeEnum.POLY_MODE_ON_OFF:
                controllerName = "PolyModeOnOff";
                break;
            case ContinuousControllerTypeEnum.POLY_MODE_ON:
                controllerName = "PolyModeOn";
                break;
            default:
                if ( controllerNumber >= 0 && controllerNumber <= 127 ) {
                    controllerName = "Unknown";
                } else {
                    throw new RangeError("Invalid controller number: must be in range 0-127.");
                };
                break;
        }
        return controllerName;
    }
}

//meta event, syx factory functions
function createMetaEvent( { deltaTime,
                            absoluteTime,
                            metaType,
                            eventData } ) {
    let eventCoreLength;
    if ( eventData.length <= MAX_7_BIT_VALUE ) {
        eventCoreLength = 3;
    }
    else {
        const dataLengthVLV = encodeVLV( eventData.length );
        eventCoreLength = dataLengthVLV.length + 2;
    };
    const eventLength = eventCoreLength + eventData.length;
    const metaTypeName = toMetaTypeName( metaType );
    
    return { delta: deltaTime,
             absoluteTime,
             status: StatusEnum.META_EVENT,
             metaType,
             data: eventData,
             metaTypeName,
             eventCoreLength,
             eventLength, //todo: is eventLength ever used for anything?
             objectName: "MetaEvent" };
             
    //private methods
    function toMetaTypeName( metaTypeByte ) {
        let metaTypeName;
        switch ( metaTypeByte ) {
            case MetaEventTypeEnum.SEQUENCE_NUMBER:
                metaTypeName = "SequenceNumber";
                break;
            case MetaEventTypeEnum.TEXT_EVENT:
                metaTypeName = "TextEvent";
                break;
            case MetaEventTypeEnum.COPYRIGHT_NOTICE:
                metaTypeName = "CopyrightNotice";
                break;
            case MetaEventTypeEnum.SEQUENCE_TRACK_NAME:
                metaTypeName = "SequenceTrackName";
                break;
            case MetaEventTypeEnum.INSTRUMENT_NAME:
                metaTypeName = "InstrumentName";
                break;
            case MetaEventTypeEnum.LYRICS:
                metaTypeName = "Lyrics";
                break;
            case MetaEventTypeEnum.MARKER:
                metaTypeName = "Marker";
                break;
            case MetaEventTypeEnum.CUE_POINT:
                metaTypeName = "CuePoint";
                break;
            case MetaEventTypeEnum.MIDI_CHANNEL_PREFIX:
                metaTypeName = "MidiChannelPrefix";
                break;
            case MetaEventTypeEnum.MIDI_PORT:
                metaTypeName = "MidiPort";
                break;
            case MetaEventTypeEnum.END_OF_TRACK:
                metaTypeName = "EndOfTrack";
                break;
            case MetaEventTypeEnum.SET_TEMPO:
                metaTypeName = "SetTempo";
                break;
            case MetaEventTypeEnum.SMPTE_OFFSET:
                metaTypeName = "SmpteOffset";
                break;
            case MetaEventTypeEnum.TIME_SIGNATURE:
                metaTypeName = "TimeSignature";
                break;
            case MetaEventTypeEnum.KEY_SIGNATURE:
                metaTypeName = "KeySignature";
                break;
            case MetaEventTypeEnum.SEQUENCER_SPECIFIC:
                metaTypeName = "SequencerSpecific";
                break;
            default: 
                //metaTypeName = "UnknownMetaEvent";
                if ( metaTypeByte >= 0 && metaTypeByte <= 127 ) {
                    metaTypeName = "Unknown";
                } else {
                    throw new RangeError("Invalid metaTypeByte: must be in range 0-127.");
                };
                break;
        }
        return metaTypeName;
    }
}

function createSystemExclusiveEvent( { deltaTime,
                                       absoluteTime,
                                       midiStatus,
                                       eventData,
                                       systemExclusiveType } ) {
	//guard clause
    if (   midiStatus !== StatusEnum.SYSTEM_EXCLUSIVE_START &&
           midiStatus !== StatusEnum.SYSTEM_EXCLUSIVE_CONTINUE ) {
		throw new RangeError( "Invalid system exclusive status" );
	};
    const MANUFACTURER_ID_INDEX = 0;
    let eventCoreLength;
    
    if ( eventData.length <= MAX_7_BIT_VALUE ) {
        eventCoreLength = 2;
    }
    else {
        const lengthVLV = encodeVLV( eventData.length );
        eventCoreLength = lengthVLV.length + 1;
    };
    const eventLength = eventCoreLength + eventData.length;
    return { delta: deltaTime,
             absoluteTime,
             status: midiStatus,
             data: eventData,
             systemExclusiveType,
             eventCoreLength,
             eventLength,
             manufacturerId: eventData[ MANUFACTURER_ID_INDEX ],
             objectName: "SystemExclusiveEvent" };                        

}

//headerChunk factory function
function createHeaderChunk( { midiFileFormat, 
                              numTracks, 
                              timeDivisionType, 
                              timeDivision } ) {
    const HEADER_CHUNK_LENGTH = 14;
    const MAX_TIME_DIVISION = 32768; //0x8000
    const numTracksBytes = toTwoBytesFromLong( numTracks );
    
    const fileFormat = midiFileFormat;
    const numberTracks = numTracks;
    //TODO: can timeDivisionType param be eliminated?
    const chunkBytes = [];
    
    //midi file id ('MThd')
    chunkBytes.push( HeaderChunkEnum.CHUNK_TYPE_BYTE_1 ); // 0x4d
    chunkBytes.push( HeaderChunkEnum.CHUNK_TYPE_BYTE_2 ); // 0x54
    chunkBytes.push( HeaderChunkEnum.CHUNK_TYPE_BYTE_3 ); // 0x68
    chunkBytes.push( HeaderChunkEnum.CHUNK_TYPE_BYTE_4 ); // 0x64
    //chunk size
    chunkBytes.push( HeaderChunkEnum.CHUNK_LENGTH_BYTE_1 ); // 0x0
    chunkBytes.push( HeaderChunkEnum.CHUNK_LENGTH_BYTE_2 ); // 0x0
    chunkBytes.push( HeaderChunkEnum.CHUNK_LENGTH_BYTE_3 ); // 0x0
    chunkBytes.push( HeaderChunkEnum.CHUNK_LENGTH_BYTE_4 ); // 0x6
    //format type
    chunkBytes.push( HeaderChunkEnum.FORMAT_BYTE_1 );
    chunkBytes.push( midiFileFormat );
    //num tracks 1-65,535
    chunkBytes.push( numTracksBytes[0] );
    chunkBytes.push( numTracksBytes[1] );
    //time division
    const timeDivisionBytes = toTwoBytesFromLong( timeDivision ); 
    chunkBytes.push( timeDivisionBytes[0] );
    chunkBytes.push( timeDivisionBytes[1] );
    //TODO: check^^ if shorter param list is worth joining (in calling fn) then 
    //      unjoining two bytes
    const headerChunk = { fileFormat: midiFileFormat,
                          numberTracks: numTracks,
                          timeDivisionType, //TODO: can timeDivisionType param be eliminated?
                          timeDivision,
                          chunkBytes
    };
    const isTicksPerQuarterNote = timeDivision < MAX_TIME_DIVISION;
    if ( isTicksPerQuarterNote ) { 
        headerChunk.ticksPerQuarterNote = timeDivision;
    }
    else {
        headerChunk.smpteFormat = decodeTwosComplementNumber( timeDivisionBytes[0] );
        headerChunk.frameResolution = timeDivisionBytes[1];
    };
    
    return headerChunk;
    
    //private methods
    function toTwoBytesFromLong( numTracks ) {
        let bytes = [];
        bytes[0] = ( numTracks & 0b1111111100000000 ) >> 8; //0xff00, 65280
        bytes[1] =   numTracks & 0b0000000011111111 ; //0xff, 255
        return bytes;
    };
    
    function encodeTwosComplementByte( integerToEncode ) {
        //guard clause
        if ( integerToEncode <= -128 || integerToEncode >= 127 ) {
            throw new RangeError( "Integer must be in range -128 to 127" );
        };

        if ( integerToEncode < 0 ) { //TODO: better names for const's
            const absIntegerToEncode = Math.abs( integerToEncode );
            const bitFlippedAbsIntegerToEncode = ( ~ absIntegerToEncode ) + 1;
            const truncBitFlippedAbsIntegerToEncode = bitFlippedAbsIntegerToEncode & 0b11111111;
            return truncBitFlippedAbsIntegerToEncode;
        } else {
            return integerToEncode;
        };
    };
    
    function decodeTwosComplementNumber( twosComplementNumber ) {
        const FLIP_BITS_BITMASK = 0b11111111; //255, 0xff
        const isPositive = twosComplementNumber <= MAX_7_BIT_VALUE;
        if ( isPositive ) {
            return twosComplementNumber;
        } else {
            return -( (twosComplementNumber ^ FLIP_BITS_BITMASK) + 1 );
        };
    };

}
    
//TrackChunk factory function
function createTrackChunk( chunkBytes ) {
    const THREE_BYTE_CHAN_EVT_LEN = 3;
    const TWO_BYTE_CHAN_EVT_LEN = 2;
    const CHUNK_TYPE_START_INDEX = 0;
    const CHUNK_TYPE_END_INDEX = 3; //CHUNK_TYPE_END_INDEX is inclusive
    const CHUNK_SIZE_START_INDEX = 4;
    const CHUNK_SIZE_END_INDEX = 7; //CHUNK_SIZE_END_INDEX is inclusive
    
    //note CHUNK_TYPE_END_INDEX, CHUNK_SIZE_END_INDEX are inclusive
    const chunkType = chunkBytes.slice( CHUNK_TYPE_START_INDEX, CHUNK_TYPE_END_INDEX + 1 ) ;
    const chunkSizeBytes = chunkBytes.slice( CHUNK_SIZE_START_INDEX, CHUNK_SIZE_END_INDEX +1 ) ;
    
    return { chunkBytes,
             chunkType,
             chunkSizeBytes,
             parseTrack
    };
    
    function parseTrack() {
        const trackEvents = [];
        let absoluteTime = 0;
        let deltaTime;
        let midiStatus;
        let vlvBytes = [];
        let trackEvent;
        let prevStatusChan; //used for running status
        let trackPosition = TRACK_HEADER_LENGTH; //module level const
        
        //loop thru track parsing msgs
        while ( trackPosition < chunkBytes.length ) {
           //read delta vlv
           vlvBytes = getVLVBytes( chunkBytes, trackPosition );
           deltaTime = decodeVLV(vlvBytes);
           absoluteTime = absoluteTime + deltaTime;
           //incr index to event start
           trackPosition += vlvBytes.length;
           //read status byte
           midiStatus = chunkBytes[ trackPosition ];
           //get event
           trackEvent = readEvent( deltaTime,
                                 absoluteTime, 
                                 midiStatus, 
                                 trackPosition, 
                                 prevStatusChan);
           trackEvents.push( trackEvent ); 
           if ( isChannelEvent( midiStatus ) ) {
               prevStatusChan = midiStatus
           };
           trackPosition += trackEvent.eventLength;
        };
        return createEventTrack( trackEvents );
        
        //private methods
        function readEvent( deltaTime, 
                            absoluteTime, 
                            midiStatus, 
                            trackPosition, 
                            prevStatusChan ) {
            let trackEvent;
            //eval status byte
            if ( isChannelEvent( midiStatus ) ) {
                trackEvent = readChannelEvent( deltaTime, 
                                                absoluteTime, 
                                                chunkBytes, 
                                                trackPosition, 
                                                prevStatusChan );
            } else if ( isRunningStatus( midiStatus ) ) { //TODO: combine with previous if?
                trackEvent = readChannelEvent( deltaTime, 
                                                 absoluteTime, 
                                                 chunkBytes, 
                                                 trackPosition, 
                                                 prevStatusChan );
            } else if ( isMetaEvent( midiStatus ) || isSysExEvent( midiStatus ) ) {
                trackEvent = readSystemExclusiveOrMetaEvent( deltaTime, 
                                                              absoluteTime, 
                                                              chunkBytes, 
                                                              trackPosition );
            } else {
                throw new RangeError( "Invalid midi status" ); //TODO: needed? guard clause?
            };
            return trackEvent;
        }
        
        function isTwoByteChannelEvent( statusByte ) {
            const TWO_BYTE_CHANNEL_EVENT_MIN = 0xc0;
            const TWO_BYTE_CHANNEL_EVENT_MAX = 0xdf;
            return ( statusByte >= TWO_BYTE_CHANNEL_EVENT_MIN ) && 
                   ( statusByte <= TWO_BYTE_CHANNEL_EVENT_MAX);
        }
        
        function isThreeByteChannelEvent( statusByte ) {
            return isChannelEvent( statusByte ) && 
                   !isTwoByteChannelEvent( statusByte );
        }

        function isChannelEvent( statusByte ) {
            const CHANNEL_EVENT_MIN = 0x80;
            const CHANNEL_EVENT_MAX = 0xef;
            return ( statusByte >= CHANNEL_EVENT_MIN ) && 
                   ( statusByte <= CHANNEL_EVENT_MAX );
        }

        function isMetaEvent( statusByte ) {
            return statusByte === StatusEnum.META_EVENT;
        }

        function isSysExEvent( statusByte) {
            return ( statusByte === StatusEnum.SYSTEM_EXCLUSIVE_START ) || 
                   ( statusByte === StatusEnum.SYSTEM_EXCLUSIVE_CONTINUE );
        }

        function isRunningStatus( statusByte ) {
            const STATUS_MIN = 0x80;
            return statusByte < STATUS_MIN;
        }

        function readChannelEvent( deltaTime, 
                                   absoluteTime, 
                                   trackBytes, 
                                   eventStartPosition, 
                                   previousStatusByte) {
            const RUNNING_STATUS_OFFSET = 0;
            const NORMAL_OFFSET = 1;
            let offset;
            let dataByte2;
            let statusByte = trackBytes[ eventStartPosition ];
            let isRunStatus = isRunningStatus( statusByte );

            if ( isRunStatus ) { 
                statusByte = previousStatusByte;
                offset = RUNNING_STATUS_OFFSET;
            } else {
                offset = NORMAL_OFFSET;
            };
            let statusNibble = getNibbleHigh( statusByte );
            let channelNibble = getNibbleLow( statusByte )
            let isThreeByteChanEvt = isThreeByteChannelEvent( statusByte );
            const dataByte1 = trackBytes[ eventStartPosition + offset ];
            offset = offset + 1;
            if ( isThreeByteChanEvt ) {
                dataByte2 = trackBytes[ eventStartPosition + offset ];
                return createChannelEvent( { isRunningStatus: isRunStatus, 
                                             deltaTime, 
                                             absoluteTime, 
                                             statusNibble, 
                                             channelNibble, 
                                             dataByte1, 
                                             dataByte2 } );
            } else {//is 2 byte channel event TODO: should there be a 3rd branch to catch errors?
                return createChannelEvent( { isRunningStatus: isRunStatus, 
                                             deltaTime, 
                                             absoluteTime, 
                                             statusNibble, 
                                             channelNibble, 
                                             dataByte1 } );
            };
        }

        function readSystemExclusiveOrMetaEvent( deltaTime,
                                                 absoluteTime,
                                                 trackBytes,
                                                 eventStartPosition) {
            //reads system exclusive or meta event that starts at specified position in an array of track bytes.
            let metaType;
            let systemExType;
            let currentPosition = eventStartPosition;
            const midiStatus = trackBytes[ currentPosition ];
            const isMetaEvt = isMetaEvent( midiStatus );
            
            //TODO: standardize var names
            //TODO: refactor into small methods
            currentPosition = currentPosition + 1;
            if ( isMetaEvt ) {
                //meta type
                metaType = trackBytes[ currentPosition ];
                currentPosition = currentPosition + 1;
            } else {
                //exclusive type
                if ( midiStatus ===  StatusEnum.SYSTEM_EXCLUSIVE_START ) {
                    systemExType = SystemExclusiveTypeEnum.NORMAL;
                } else {
                    systemExType = SystemExclusiveTypeEnum.DIVIDED;
                };
            };
            
            //length of vlv
            const vlvStartPosition = currentPosition;
            const vlvBytes = getVLVBytes( trackBytes, vlvStartPosition );
            currentPosition = currentPosition + vlvBytes.length; //TODO: rename vlvBytes to vlvLengthBytes

            //length of data
            const evtDataLength = decodeVLV( vlvBytes ); //TODO: standardize vlv abbr. ; test for > 127

            //data
            const eventEndPosition = currentPosition + evtDataLength - 1;
            const sliceStart = currentPosition;
            const sliceEnd = eventEndPosition + 1;
            const eventData = trackBytes.slice( sliceStart, sliceEnd );
             
            //return
            if ( isMetaEvt ) {
                return createMetaEvent( { deltaTime, 
                                          absoluteTime,
                                          metaType,
                                          eventData } );
            } else {
                return createSystemExclusiveEvent( { deltaTime, 
                                                     absoluteTime, 
                                                     midiStatus, 
                                                     eventData, 
                                                     systemExType } );
            };
        }

        function getNibbleHigh( byteToNibblize ) {
            return ( byteToNibblize >> 4 ) & 0xf;
        }

        function getNibbleLow( byteToNibblize ) {
            const BIT_MASK_LOW_NIBBLE = 0xf;
            return byteToNibblize & BIT_MASK_LOW_NIBBLE;
        }
    }

}

function parseTrack( trackChunk ) {
    const trackEvents = [];
    let absoluteTime = 0;
    let deltaTime;
    let midiStatus;
    let vlvBytes = [];
    let trackEvent;
    let prevStatusChan; //used for running status
    let trackPosition = TRACK_HEADER_LENGTH;
   
    //loop thru track parsing msgs
    while ( trackPosition < trackChunk.chunkBytes.length ) {
       //read delta vlv
       vlvBytes = getVLVBytes( trackChunk.chunkBytes, trackPosition );
       deltaTime = decodeVLV(vlvBytes);
       absoluteTime = absoluteTime + deltaTime;
       //incr index to event start
       trackPosition += vlvBytes.length;
       //read status byte
       midiStatus = trackChunk.chunkBytes[ trackPosition ];
       //get event
       trackEvent = readEvent( deltaTime,
                             absoluteTime, 
                             midiStatus, 
                             trackPosition, 
                             prevStatusChan);
       trackEvents.push( trackEvent ); 
       if ( isChannelEvent( midiStatus ) ) {
           prevStatusChan = midiStatus
       };
       trackPosition += trackEvent.eventLength;
    };
    return createEventTrack( trackEvents );
    
    //private methods
    function readEvent( deltaTime, 
                        absoluteTime, 
                        midiStatus, 
                        trackPosition, 
                        prevStatusChan ) {
        let trackEvent;
        //eval status byte
        if ( isChannelEvent( midiStatus ) ) {
            trackEvent = readChannelEvent( deltaTime, 
                                            absoluteTime, 
                                            trackChunk.chunkBytes, 
                                            trackPosition, 
                                            prevStatusChan );
        } else if ( isRunningStatus( midiStatus ) ) { //TODO: combine with previous if?
            trackEvent = readChannelEvent( deltaTime, 
                                             absoluteTime, 
                                             trackChunk.chunkBytes, 
                                             trackPosition, 
                                             prevStatusChan );
        } else if ( isMetaEvent( midiStatus ) || isSysExEvent( midiStatus ) ) {
            trackEvent = readSystemExclusiveOrMetaEvent( deltaTime, 
                                                          absoluteTime, 
                                                          trackChunk.chunkBytes, 
                                                          trackPosition );
        } else {
            throw new RangeError( "Invalid midi status" ); //TODO: needed? guard clause?
        };
        return trackEvent;
    }
    
    function isTwoByteChannelEvent( statusByte ) {
        const TWO_BYTE_CHANNEL_EVENT_MIN = 0xc0;
        const TWO_BYTE_CHANNEL_EVENT_MAX = 0xdf;
        return ( statusByte >= TWO_BYTE_CHANNEL_EVENT_MIN ) && 
               ( statusByte <= TWO_BYTE_CHANNEL_EVENT_MAX);
    }
    
    function isThreeByteChannelEvent( statusByte ) {
        return isChannelEvent( statusByte ) && 
               !isTwoByteChannelEvent( statusByte );
    }

    function isChannelEvent( statusByte ) {
        const CHANNEL_EVENT_MIN = 0x80;
        const CHANNEL_EVENT_MAX = 0xef;
        return ( statusByte >= CHANNEL_EVENT_MIN ) && 
               ( statusByte <= CHANNEL_EVENT_MAX );
    }

    function isMetaEvent( statusByte ) {
        return statusByte === StatusEnum.META_EVENT;
    }

    function isSysExEvent( statusByte) {
        return ( statusByte === StatusEnum.SYSTEM_EXCLUSIVE_START ) || 
               ( statusByte === StatusEnum.SYSTEM_EXCLUSIVE_CONTINUE );
    }

    function isRunningStatus( statusByte ) {
        const STATUS_MIN = 0x80;
        return statusByte < STATUS_MIN;
    }

    function readChannelEvent( deltaTime, 
                               absoluteTime, 
                               trackBytes, 
                               eventStartPosition, 
                               previousStatusByte) {
        const RUNNING_STATUS_OFFSET = 0;
        const NORMAL_OFFSET = 1;
        let offset;
        let dataByte2;
        let statusByte = trackBytes[ eventStartPosition ];
        let isRunStatus = isRunningStatus( statusByte );

        if ( isRunStatus ) { 
            statusByte = previousStatusByte;
            offset = RUNNING_STATUS_OFFSET;
        } else {
            offset = NORMAL_OFFSET;
        };
        let statusNibble = getNibbleHigh( statusByte );
        let channelNibble = getNibbleLow( statusByte )
        let isThreeByteChanEvt = isThreeByteChannelEvent( statusByte );
        const dataByte1 = trackBytes[ eventStartPosition + offset ];
        offset = offset + 1;

        if ( isThreeByteChanEvt ) {
            dataByte2 = trackBytes[ eventStartPosition + offset ];
            return createChannelEvent( { isRunningStatus: isRunStatus, 
                                         deltaTime, 
                                         absoluteTime, 
                                         statusNibble, 
                                         channelNibble, 
                                         dataByte1, 
                                         dataByte2 } );
        } else {//is 2 byte channel event TODO: should there be a 3rd branch to catch errors?
            return createChannelEvent( { isRunningStatus: isRunStatus, 
                                         deltaTime, 
                                         absoluteTime, 
                                         statusNibble, 
                                         channelNibble, 
                                         dataByte1 } );
        };
    }

    function readSystemExclusiveOrMetaEvent( deltaTime,
                                             absoluteTime,
                                             trackBytes,
                                             eventStartPosition) {
        //reads system exclusive or meta event that starts at specified position in an array of track bytes.
        let metaType;
        let systemExType;
        let currentPosition = eventStartPosition;
        const midiStatus = trackBytes[ currentPosition ];
        const isMetaEvt = isMetaEvent( midiStatus );
        
        //TODO: standardize var names
        //TODO: refactor into small methods
        currentPosition = currentPosition + 1;
        if ( isMetaEvt ) {
            //meta type
            metaType = trackBytes[ currentPosition ];
            currentPosition = currentPosition + 1;
        } else {
            //exclusive type
            if ( midiStatus ===  StatusEnum.SYSTEM_EXCLUSIVE_START ) {
                systemExType = SystemExclusiveTypeEnum.NORMAL;
            } else {
                systemExType = SystemExclusiveTypeEnum.DIVIDED;
            };
        };
        
        //length of vlv
        const vlvStartPosition = currentPosition;
        const vlvBytes = getVLVBytes( trackBytes, vlvStartPosition );
        currentPosition = currentPosition + vlvBytes.length; //TODO: rename vlvBytes to vlvLengthBytes

        //length of data
        const evtDataLength = decodeVLV( vlvBytes ); //TODO: standardize vlv abbr. ; test for > 127

        //data
        const eventEndPosition = currentPosition + evtDataLength - 1;
        const sliceStart = currentPosition;
        const sliceEnd = eventEndPosition + 1;
        const eventData = trackBytes.slice( sliceStart, sliceEnd );
         
        //return
        if ( isMetaEvt ) {
            return createMetaEvent( { deltaTime, 
                                      absoluteTime,
                                      metaType,
                                      eventData } );
        } else {
            return createSystemExclusiveEvent( { deltaTime, 
                                                 absoluteTime, 
                                                 midiStatus, 
                                                 eventData, 
                                                 systemExType } );
        };
    }

    function getNibbleHigh( byteToNibblize ) {
        return ( byteToNibblize >> 4 ) & 0xf;
    }

    function getNibbleLow( byteToNibblize ) {
        const BIT_MASK_LOW_NIBBLE = 0xf;
        return byteToNibblize & BIT_MASK_LOW_NIBBLE;
    }
}

//TrackChunks factory function
function createTrackChunks( trackChunks ) {
    //trackChunks is an array of trackChunks
    return { trackChunks,
             //public method
             parseTracks: function() {
                 const eventTracks = [];
                 let eventTrack;
                
                 trackChunks.forEach( function( trackChunk ) {
                     eventTrack = trackChunk.parseTrack();
                     // eventTrack = parseTrack( trackChunk );
                     eventTracks.push( eventTrack );
                 } );
                 return createEventTracks( eventTracks );
             }
           };
}

//EventTrack factory function
function createEventTrack( trackEvents ) { 
    return { trackEvents,
             //public methods
             serialize: function() {
                const trackBytes = [];
                
                //add track chunk id ('MTrk') 'TODO: extract method
                trackBytes.push( TrackChunkTypeEnum.BYTE_1 );
                trackBytes.push( TrackChunkTypeEnum.BYTE_2 );
                trackBytes.push( TrackChunkTypeEnum.BYTE_3 );
                trackBytes.push( TrackChunkTypeEnum.BYTE_4 );

                addBytesFromAllTrackEventsToTrackBytes( trackBytes, trackEvents );
                const fullTrackBytes = addTrackLengthBytes( trackBytes ); //add chunk size

                return fullTrackBytes;

                //private methods
                function addBytesFromAllTrackEventsToTrackBytes( trackBytes, trackEvents ) {
                    //mutates trackBytes
                    let eventBytes = [];
                    trackEvents.forEach( function( trackEvent ) {
                        eventBytes = serialize( trackEvent );
                        addBytesFromEventToTrackBytes( eventBytes, trackBytes );
                    } );
                }
                
                function addBytesFromEventToTrackBytes( eventBytes, trackBytes ) {
                    //mutates trackBytes
                    eventBytes.forEach( function( eventByte ) {
                        trackBytes.push( eventByte );
                    } );
                }

                function addTrackLengthBytes( trackBytes ) {
                    //mutates parameter trackBytes
                    const TRACK_ID_LENGTH = 4;
                    const length = trackBytes.length - TRACK_ID_LENGTH; //track id bytes were added earlier
                    const trackLengths = toFourBytesFromLong( length );
                    const idSlice = trackBytes.slice( 0, TRACK_ID_LENGTH );
                    const dataSlice = trackBytes.slice( 4 );
                    const lengthBytes = [ trackLengths[0], trackLengths[1], trackLengths[2], trackLengths[3]];
                    const fullTrackBytes = idSlice.concat( lengthBytes, dataSlice );
                    return fullTrackBytes;
                }
                
                function checkForMissingEndOfTrackMetaEvent( trackBytes ) {
                    //adds end of track meta event bytes (if it doesn//t exist)
                    //mutates parameter trackBytes
                    const DELTA_TIME = 0;
                    const END_OF_TRACK_DATA_BYTE = 0; //TODO: end of trak evt deserves own enum?
                    
                    //TODO: use isMetaEvent()?
                    const upperBound = this.trackEvents.length - 1;
                    const isNotMetaEvent = this.trackEvents[ upperBound ].status !== 
                                           StatusEnum.META_EVENT;
                    const isMetaEvt = !isNotMetaEvent;
                    let isNotEndOfTrackMetaEvent = this.trackEvents[ upperBound ].status !== 
                                                     StatusEnum.META_EVENT;
                    if ( isMetaEvt ) {
                       isNotEndOfTrackMetaEvent =  this.trackEvents[ upperBound ].metaType !== 
                                                   MetaEventTypeEnum.END_OF_TRACK ;
                    }
                    
                    if ( isNotMetaEvent || isNotEndOfTrackMetaEvent ) {
                        //add delta
                        trackBytes.push( DELTA_TIME );
                        //add event
                        trackBytes.push( StatusEnum.META_EVENT );
                        trackBytes.push( MetaEventTypeEnum.END_OF_TRACK );
                        trackBytes.push( END_OF_TRACK_DATA_BYTE );
                    }
                }

            }

    };
}

//EventTracks factory function
function createEventTracks( tracks ) { 
    return { tracks,
             //public method
             serialize: function() {
                //return this.getAllTracksBytes( this.tracks );
                const trackBytes = [];
                let eventTrackBytes;
                tracks.forEach( function( eventTrack ) {
                    eventTrackBytes = eventTrack.serialize();
                    eventTrackBytes.forEach( function( trackByte ) {
                        trackBytes.push( trackByte );
                        } );
                    } );

                return trackBytes;
            }
    };
}

//midiFile factory function
function createMidiFile( { bytes, 
                           headerChunk, 
                           eventTracks } ) {
    if ( bytes ) {
        const headerChunk = getHeaderChunk();
        const eventTracks = getTrackChunks().parseTracks();
        return { bytes,
                 headerChunk,
                 eventTracks
       }
    } else if ( headerChunk && eventTracks ) {
        return {
            bytes: serialize(),
            headerChunk,
            eventTracks
        }
    } else {
        throw new Error("Object parameter(s) missing: " + 
                        "createMidiFile( { bytes, headerChunk, eventTracks } )");
    };
    
    //private methods
    function getTrackChunks() {
        const trackChunks = [];
        const trackDimensions = getTrackDimensions();
        const trackCount = trackDimensions.start.length; //num elements in each TrackDimensions array = num tracks
        
        for ( let i = 0; i < trackCount; i++ ) {
            const trackBytes = getTrackChunk( trackDimensions.start[i],
                                              trackDimensions.end[i] + 1 ); 
            trackChunks.push( trackBytes );
        }
        
        return createTrackChunks( trackChunks );
    };
    
    function getTrackChunk( trackDataStartPosition,
                            trackDataEndPosition ) {
        //returns a trackChunk, trackDataEndPosition is exclusive
        const trackBytes = bytes.slice( trackDataStartPosition, trackDataEndPosition );
        return createTrackChunk( trackBytes );
    };
    
    function getTrackDimensions() {
        //returns the length/start/end positions of each track in midi file
        const TRACK_HEADER_ID_LENGTH = 4;
        const TRACK_HEADER_LENGTH_LENGTH = 4;
        const trackStartPositions = [];
        const trackEndPositions = [];
        const trackLengths = [];
        let trackStartPosition;
        let trackEndPosition;
        let trackDataStartPosition;
        let trackLength;
        let currentPosition = FILE_HEADER_LENGTH; //pos of 1st byte after file hdr, ie start pos of 1st trk
        
        //iterate file bytes to find all tracks and their len, pos.
        while ( currentPosition < bytes.length ) {
            if ( isTrackChunk( currentPosition, bytes ) ) {
                trackStartPosition = currentPosition;
                currentPosition += TRACK_HEADER_ID_LENGTH; //move to length bytes 
                trackLength = joinFourBytes( bytes[ currentPosition ], 
                                              bytes[ currentPosition + 1 ], 
                                              bytes[ currentPosition + 2 ], 
                                              bytes[ currentPosition + 3 ] );
                trackDataStartPosition = currentPosition + TRACK_HEADER_LENGTH_LENGTH;
                if ( !isCorrectTrackLength( trackDataStartPosition, trackLength ) ) {
                    trackLength = getTrackLengthIteratively( trackDataStartPosition );
                };
                trackStartPositions.push( trackStartPosition );
                currentPosition = trackDataStartPosition + trackLength //increment to start of next track chunk
                trackLengths.push ( trackLength );
                trackEndPosition = currentPosition - 1;
                trackEndPositions.push( trackEndPosition );
                trackLength = 0;
            } else {
                currentPosition++;
            };
        }
         
        return { start: trackStartPositions, 
                 end: trackEndPositions, 
                 length: trackLengths };
    }
    
    function getTrackLengthIteratively( dataStartPosition ) {
        const END_OF_TRACK_EVENT_LENGTH = 3;
        const upperBound = bytes.length -1;
        let i = dataStartPosition;
        let currentPos = dataStartPosition;
        let isEndOfTrackMetaEvent = ( bytes[ dataStartPosition ] ===
                                      StatusEnum.META_EVENT ) && 
                                    ( bytes[ dataStartPosition + 1 ] === 
                                      MetaEventTypeEnum.END_OF_TRACK ) &&
                                    ( bytes[ dataStartPosition + 2 ] === 
                                      END_OF_TRACK_EVENT_DATA );
        let isWithinArrayBounds = upperBound >= i + END_OF_TRACK_EVENT_LENGTH;
        
        while ( !isEndOfTrackMetaEvent && isWithinArrayBounds ) {
            i ++;
            isEndOfTrackMetaEvent = ( bytes[i] === StatusEnum.META_EVENT ) &&
                                    ( bytes[i + 1] === MetaEventTypeEnum.END_OF_TRACK ) &&
                                    ( bytes[i + 2] === END_OF_TRACK_EVENT_DATA );
            isWithinArrayBounds = ( upperBound >= i + END_OF_TRACK_EVENT_LENGTH );
        };
        
        return i + END_OF_TRACK_EVENT_LENGTH - dataStartPosition;
    }
   
    function isCorrectTrackLength( trackDataStartPosition, 
                                    reportedTrackLength ) {
    //checks if there is an "end of file" meta event ending right before the reportedTrackLength
    //ie last 3 bytes are FF 2F 00
        const END_OF_TRACK_EVENT_DATA_BYTE = 0;
        return ( bytes[ trackDataStartPosition  + reportedTrackLength - 1 ] ===
                 END_OF_TRACK_EVENT_DATA_BYTE ) && 
               ( bytes[ trackDataStartPosition + reportedTrackLength - 2 ] ===
                 MetaEventTypeEnum.END_OF_TRACK ) && 
               ( bytes[ trackDataStartPosition + reportedTrackLength - 3 ] ===
                 StatusEnum.META_EVENT );
    }

    function isTrackChunk( currentPosition, 
                           midiFileBytes ) {
        //Checks if the first 4 bytes from the current position in an array of
        //midi file byte indicate a track chunk header.
        if ( currentPosition < midiFileBytes.length - 4 ) { //prevent index out of bounds error
            return ( midiFileBytes[ currentPosition ] ===
                     TrackChunkTypeEnum.BYTE_1 ) && 
                   ( midiFileBytes[ currentPosition + 1 ] ===
                     TrackChunkTypeEnum.BYTE_2 ) &&
                   ( midiFileBytes[ currentPosition + 2 ] ===
                     TrackChunkTypeEnum.BYTE_3 ) &&
                   ( midiFileBytes[ currentPosition + 3 ] ===
                     TrackChunkTypeEnum.BYTE_4 );
        } else {
            return false;
        }
    }

    function getHeaderChunk() {
        //returns midi file header
        const BIT_MASK_BYTE_1 = 0x7f; //TODO: better names eg 7bit mask
        const BIT_MASK_BYTE_2 = 0xff;
        const FILE_FORMAT_BYTE_2_INDEX = 9;
        const TRACK_COUNT_BYTE_1_INDEX = 10;
        const TRACK_COUNT_BYTE_2_INDEX = 11;
        const TIME_DIVISION_BYTE_1_INDEX = 12;
        const TIME_DIVISION_BYTE_2_INDEX = 13;

        //isFpsTime
        //smpteFrames the number of SMPTE frames can be 24, 25, 29 (for 29.97 fps) or 30
        const isPpqTime = bytes[ TIME_DIVISION_BYTE_1_INDEX ] <= MAX_7_BIT_VALUE; //TODO: replace index magic nums
        const midiFileFormat = bytes[ FILE_FORMAT_BYTE_2_INDEX ];
        const numTracks = joinTwoBytes( bytes[ TRACK_COUNT_BYTE_1_INDEX ], 
                                         bytes[ TRACK_COUNT_BYTE_2_INDEX ] );
        let timeDivisionType;
        const timeDivision = joinTwoBytes( bytes[ TIME_DIVISION_BYTE_1_INDEX ], 
                                      bytes[ TIME_DIVISION_BYTE_2_INDEX ] );
        if ( isPpqTime ) {
            timeDivisionType = TimeDivisionTypeEnum.PULSES_PER_QUARTER_NOTE;
        } else {
            //is SMPTE frames/sec. TODO: not fully implemented
            timeDivType = TimeDivisionTypeEnum.SMPTE_MIDI_TIME_CODE;
        };
        return createHeaderChunk( { midiFileFormat, 
                                    numTracks, 
                                    timeDivisionType, 
                                    timeDivision } );
    }

    function joinFourBytes( byte1, byte2, byte3, byte4 ) {
        //byte1 is high and byte4 is low
        return byte1 << 24 | byte2 << 16 | byte3 << 8 | byte4;
    }

    function joinTwoBytes( byteHigh, byteLow ) {
        return byteHigh << 8 | byteLow;
    }

    function serialize() {
        const trackBytes = eventTracks.serialize();
        const headerBytes = headerChunk.chunkBytes;
        let fileBytes = headerBytes.concat( trackBytes );
        return fileBytes;
    }
}
