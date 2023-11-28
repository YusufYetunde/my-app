import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaMicrophone,
  FaVideo,
  FaVideoSlash,
  FaMicrophoneSlash,
  FaCheckCircle,
  FaRegComment,
} from "react-icons/fa";
import {
  FiCamera, FiCameraOff,
} from "react-icons/fi"
import SimplePeer from "simple-peer";
import { useNavigate } from "react-router-dom";
import ChatPage from "./ChatPage";

const VideoCall: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenRecording, setIsScreenRecording] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [peers, setPeers] = useState<SimplePeer.Instance[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<HTMLVideoElement[]>([]);
  const peerRefs = useRef<SimplePeer.Instance[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const initializeWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;

          const localPeer = new SimplePeer({ initiator: true, stream });

          localPeer.on("stream", (localStream) => {
            // Attach local stream to the local video element
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = localStream;
            }
          });

          setPeers([localPeer]);
          peerRefs.current = [localPeer];
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initializeWebRTC();

    return () => {
      // Cleanup code
      peerRefs.current.forEach((peer) => {
        if (peer) {
          peer.destroy();
        }
      });

      if (
        typeof process !== "undefined" &&
        process.env.NODE_ENV !== "production"
      ) {
        console.log("Cleaning up resources...");
      }

      if (typeof window !== "undefined") {
        navigate("/thank-you");
      }
      
    };
  }, [navigate, isCallEnded]);

  const endCall = () => {
    // Add logic for ending the call
    peerRefs.current.forEach((peer) => {
      if (peer) {
        peer.destroy();
      }
    });

    setIsCallEnded(true);
  };

  const toggleMute = () => {
    // Add logic for muting/unmuting
    if (localVideoRef.current) {
      localVideoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  const toggleCamera = () => {
    // Add logic for toggling the camera
    peerRefs.current.forEach((peer) => {
      const videoTracks = peer?.streams[0]?.getVideoTracks();
      if (videoTracks) {
        videoTracks.forEach((track) => {
          track.enabled = !isCameraOn;
        });
      }
    });
    setIsCameraOn((prev) => !prev);
  };

  const toggleScreenRecording = () => {
    // Add logic for toggling screen recording
    setIsScreenRecording((prev) => !prev);
  };

  const goToChatPage = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="video-call-container">
     
      <div className="video-section">
      <div className="video-header">
        <h1>Logo</h1>
        <div className="header-title">
          <h2>Confrence Call</h2>
          <p>Remakable design and productivity</p>
        </div>
      </div>
        <div className="video-sec">
          <div className="main-video">
            {/* Local Video Display */}
            <video ref={localVideoRef} autoPlay muted  className="main"/>
          </div>

          <div className="peer-videos">
            {/* Remote Video Displays */}
            {peers.map((peer, index) => (
              <video
                key={index}
                ref={(ref) => (remoteVideoRefs.current[index] = ref!)}
                autoPlay
                className="peer-video"
              />
            ))}
            {/* Additional empty divs for remaining peer videos */}
            {[...Array(3 - peers.length)].map((_, index) => (
              <div key={index} className="peer-video" />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="control-buttons">
          <button onClick={endCall}>
            {isCallEnded ? <FaCheckCircle /> : <FaPhone />}
          </button>
          <button onClick={toggleMute}>
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button onClick={toggleCamera}>
            {isCameraOn ? <FiCamera /> : <FiCameraOff/>}
          </button>
          <button onClick={toggleScreenRecording}>
            {isScreenRecording ? <FaVideoSlash /> : <FaVideo />}
          </button>
          <button onClick={goToChatPage}>
            <FaRegComment />
          </button>
        </div>
      </div>
      {/* Chat Sidebar */}
      {isChatOpen && <ChatPage />}
      <style>{`
        .video-call-container {
        
          width: ${isChatOpen ? "80%" : "100%"};
        }
        .chat-page {
          width: ${isChatOpen ? "30%" : "0"};
          overflow: hidden;
        }
        video {
          border: 1px solid #ccc;
          border-radius: 8px;
          width: ${isCallEnded ? "100%" : "400px"};
          max-width: ${isCallEnded ? "100%" : "400px"};
          margin-right: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;
