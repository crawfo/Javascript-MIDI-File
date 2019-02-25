# Javascript-MIDI-File
Javascript MIDI file parsing and creating.

A Javascript version of VBA-MIDI.
To use create a new midiFile object with the factory function createMidiFile( { bytes, headerChunk, eventTracks } ). The parameter combinations are either bytes which is an array of file bytes, OR, both headerChunk and eventTracks.
