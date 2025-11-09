"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mic, MicOff, Volume2, FileText, MessageSquare, Play, Pause, Square, Trash2 } from "lucide-react";
import Link from "next/link";

// Extend Window interface for Speech APIs
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

export default function AIVoiceAssistantDemo() {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize browser compatibility on client side only
  useEffect(() => {
    const checkBrowserSupport = () => {
      if (typeof window !== 'undefined') {
        const speechSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
        setIsSpeechSupported(speechSupported);
        setIsLoading(false);
      }
    };

    checkBrowserSupport();
    
    // Load saved notes from localStorage
    const savedNotes = localStorage.getItem('voice-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!isSpeechSupported || typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInputText(prev => prev + ' ' + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsTranscribing(false);
    };

    recognition.onend = () => {
      setIsTranscribing(false);
    };

    recognitionRef.current = recognition;
  }, [isSpeechSupported]);

  // Start/stop live transcription
  const toggleTranscription = () => {
    if (!recognitionRef.current) return;

    if (isTranscribing) {
      recognitionRef.current.stop();
      setIsTranscribing(false);
    } else {
      recognitionRef.current.start();
      setIsTranscribing(true);
    }
  };

  // Start/stop recording with transcription
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recognitionRef.current && isTranscribing) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      setIsTranscribing(false);
    } else {
      // Start recording and transcription
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.start();
        setIsRecording(true);

        // Also start speech recognition for transcription
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsTranscribing(true);
        }
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check permissions.');
      }
    }
  };

  // Save note
  const saveNote = () => {
    if (!inputText.trim()) {
      alert("Please add some content to save!");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title: `Voice Note ${notes.length + 1}`,
      content: inputText.trim(),
      timestamp: new Date().toLocaleString()
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('voice-notes', JSON.stringify(updatedNotes));
    setInputText("");
    
    alert("Note saved successfully!");
  };

  // Delete note
  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('voice-notes', JSON.stringify(updatedNotes));
  };

  // Clear all notes
  const clearAllNotes = () => {
    if (confirm("Are you sure you want to delete all notes?")) {
      setNotes([]);
      localStorage.removeItem('voice-notes');
    }
  };

  

  const loadSample = (text: string) => {
    setInputText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06B6D4] mx-auto mb-4"></div>
          <p>Loading AI Voice Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container max-w-6xl py-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#06B6D4] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              <Mic className="h-6 w-6 text-[#06B6D4]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Voice Assistant</h1>
              <p className="text-muted-foreground">Experience the future of voice-powered productivity with our intelligent assistant system</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Interactive Demo
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Speech Recognition
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Voice Notes
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Real-time Transcription
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Browser Compatibility & Setup Alerts */}
        {!isSpeechSupported ? (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <MessageSquare className="h-5 w-5" />
                <p className="font-medium">
                  Speech recognition is not supported in this browser. Please use Google Chrome for the best experience.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 mb-6">
            {/* Suggestions Section */}
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:border-amber-800/50 dark:from-amber-900/10 dark:to-yellow-900/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                      💡 Pro Tips & Recommendations
                    </h4>
                    <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                      <p className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-0.5">🌐</span>
                        <span><strong>Use Google Chrome</strong> for full functionality and best Web Speech API support</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-0.5">📁</span>
                        <span><strong>Check GitHub for the complete project</strong> - This is a simplified demo version</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Setup Instructions */}
            <Card className="border-[#06B6D4]/30 bg-gradient-to-r from-cyan-50/80 to-blue-50/80 dark:border-[#06B6D4]/20 dark:from-cyan-900/10 dark:to-blue-900/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 rounded-full">
                    <Volume2 className="h-4 w-4 text-[#06B6D4]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-3 flex items-center gap-2">
                      🔧 Setup for Audio Transcription
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm text-cyan-700 dark:text-cyan-300">
                          <span className="text-green-500 mt-1">✓</span>
                          <span><strong>Enable microphone permissions</strong> when prompted by browser</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-cyan-700 dark:text-cyan-300">
                          <span className="text-green-500 mt-1">✓</span>
                          <span><strong>Use a quiet environment</strong> to reduce background noise</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm text-cyan-700 dark:text-cyan-300">
                          <span className="text-blue-500 mt-1">💡</span>
                          <span><strong>Speak clearly</strong> and at moderate pace for better accuracy</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-cyan-700 dark:text-cyan-300">
                          <span className="text-blue-500 mt-1">💡</span>
                          <span><strong>Test with short phrases</strong> first to ensure it's working</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demo Info */}
        <Card className="mb-6 border-[#06B6D4]/20 bg-[#06B6D4]/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-[#06B6D4]" />
              About This Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              This is a <strong>full-featured voice assistant demo</strong> that showcases real-time speech recognition, 
              voice recording, and intelligent note management. The system uses the Web Speech API for accurate 
              transcription and includes advanced features like continuous listening and voice commands. 
              For the complete implementation, visit the{" "}
              <a 
                href="https://github.com/ashwin-rajakannan/AI-powered-voice-notes-workspace-v2" 
                target="_blank"
                className="text-[#06B6D4] hover:underline font-medium"
              >
                GitHub repository
              </a>.
            </p>
          </CardContent>
        </Card>

        {/* Voice Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mic className="h-5 w-5 text-[#06B6D4]" />
              Voice Controls
            </CardTitle>
            <CardDescription>
              Use these controls to record your voice and transcribe speech to text
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={toggleRecording}
                disabled={!isSpeechSupported}
                className={`${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Record & Transcribe
                  </>
                )}
              </Button>

              <Button
                onClick={toggleTranscription}
                disabled={!isSpeechSupported || isRecording}
                variant="outline"
                className="text-[#06B6D4] border-[#06B6D4]/30 hover:bg-[#06B6D4]/10"
              >
                {isTranscribing ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" />
                    Stop Live Transcription
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Live Transcription Only
                  </>
                )}
              </Button>
            </div>

            {/* Status Indicators */}
            {(isRecording || isTranscribing) && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {isRecording ? 'Recording and transcribing your voice...' : 'Listening for speech...'}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Demo Area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Voice Input</CardTitle>
              <CardDescription>Speak or type your content - it will be transcribed automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Start speaking or type your notes here..."
                className="w-full h-64 p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                disabled={isRecording || isTranscribing}
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {inputText.length} characters
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setInputText("")}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-300 hover:bg-red-50"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={saveNote}
                    disabled={!inputText.trim()}
                    className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Save Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Library */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes Library ({notes.length})</CardTitle>
              <CardDescription>Your saved voice notes and transcriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 overflow-y-auto">
                {notes.length > 0 ? (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="p-3 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{note.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {note.content}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">{note.timestamp}</p>
                          </div>
                          <Button
                            onClick={() => deleteNote(note.id)}
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0 text-red-500 hover:bg-red-100"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No notes yet</p>
                    <p className="text-xs">Use voice commands or type to create your first note</p>
                  </div>
                )}
              </div>
              {notes.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Button
                    onClick={clearAllNotes}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-500 border-red-300 hover:bg-red-50"
                  >
                    Clear All Notes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>



        {/* Technical Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Core Features:</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Real-time Speech Recognition:</strong> Uses Web Speech API for accurate voice-to-text conversion</li>
                <li><strong>Audio Recording:</strong> MediaRecorder API for capturing and processing voice recordings</li>
                <li><strong>Continuous Listening:</strong> Advanced speech recognition with interim and final results</li>
                <li><strong>Note Management:</strong> Local storage with create, read, delete operations</li>
                <li><strong>Browser Compatibility:</strong> Optimized for Chrome with fallbacks for other browsers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Web Speech API</Badge>
                <Badge variant="secondary">MediaRecorder API</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to see the complete implementation with advanced AI features?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
            >
              <a href="https://github.com/ashwin-rajakannan/AI-powered-voice-notes-workspace-v2" target="_blank">
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#projects">Back to Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}