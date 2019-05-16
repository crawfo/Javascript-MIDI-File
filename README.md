# javascript-midi-file
Javascript MIDI file parsing and creating.

A Javascript version of vba-midi-file.

To create a new midiFile object use the factory function 
  
    createMidiFile( { bytes, headerChunk, eventTracks } ) 

To create a parsed midiFile object from an array of midi file bytes include only the bytes parameter.

To custom build a midiFile object omit the bytes parameter and include both headerChunk and eventTracks parameters

