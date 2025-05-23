"use client";
import { useEffect, useState, useRef } from "react";
import {
  LuHexagon,
  LuPaperclip,
  LuCheck,
  LuUser,
  LuFile,
} from "react-icons/lu";
import { FaCloudArrowDown } from "react-icons/fa6";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const ChatWaitingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Animate the hexagons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null || prev === 2) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFill = (index) => (activeIndex === index ? "#eb5939" : "none");

  // Count up timer and switch to chat after 1 minute
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        // Switch to chat after 1 minute (60 seconds)
        if (newTime === 5) {
          setShowChat(true);
          // Add initial message from representative
          setMessages([
            {
              id: 1,
              sender: "rep",
              text: "Hey there! How may we help you today?",
              time: "11:11",
            },
            // Add file message from representative as in the image
            {
              id: 2,
              sender: "rep",
              type: "file",
              fileName: "master_project_files.zip",
              fileSize: "3.13 MB",
              time: "11:11",
            },
          ]);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      time: "11:11",
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage("");

    // Simulate representative response after user sends a message
    if (messages.length === 2) {
      setTimeout(() => {
        const repResponse = {
          id: messages.length + 2,
          sender: "rep",
          text: "I'd be happy to help with your project. Could you tell me more about what you're looking for?",
          time: "11:11",
        };
        setMessages((prev) => [...prev, repResponse]);
      }, 1000);
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file is an image
    const isImage = file.type.startsWith("image/");

    if (isImage) {
      // Handle as image
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageMessage = {
          id: messages.length + 1,
          sender: "user",
          type: "image",
          imageUrl: event.target.result,
          time: "11:11",
        };
        setMessages([...messages, newImageMessage]);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle as file
      const newFileMessage = {
        id: messages.length + 1,
        sender: "user",
        type: "file",
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        time: "11:11",
      };
      setMessages([...messages, newFileMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showChat) {
    return (
      <div className="relative w-full h-[90%]">
        <div className="absolute -top-20 left-0 right-0 ">
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary/80 transition-colors absolute"
          >
            <img
              className="size-8 lg:size-auto"
              src="/images/icons/backarrow.svg"
              alt=""
            />
          </button>
        </div>
        <div className="size-18 absolute max-w-38 w- -top-10 left-0 right-0 mx-auto lg:flex justify-center items-center gap-2 rounded-full overflow-hidden border-2 border-primary mb-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Representative"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="chat-bg h-full bg-[#17171791] backdrop-blur-xs flex flex-col">
          <div className="p-4 mt-11 flex flex-col items-center justify-center">
            <div className="text-center">
              <h3 className="font-bold text-lg">Anatoli Petrovich</h3>
              <p className="text-sm text-[#7F7F7F]">Typing...</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 !pointer-events-auto ">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "rep" && (
                  <div className="size-12 rounded-full overflow-hidden border border-primary mr-3 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Representative"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className={`max-w-[75%] relative group`}>
                  {message.sender === "rep" && (
                    <p className="text-xs text-[#7F7F7F] mb-1 ml-1">
                      Anatoli Petrovich
                    </p>
                  )}

                  {message.sender === "user" && (
                    <p className="text-xs text-[#7F7F7F] mb-1">You</p>
                  )}

                  {/* Regular text message */}
                  {!message.type && (
                    <div
                      className={`-ml-8 -mr-8 px-8 py-2 rounded-2xl backdrop-blur-2xl ${
                        message.sender === "user"
                          ? "bg-primary/60 text-[#ffffff] flex items-end gap-3"
                          : "bg-[#1d1d1d50] text-[#BABABA] flex items-end gap-3"
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs text-[#7F7F7F] mr-1">
                        {message.time}
                      </span>
                    </div>
                  )}

                  {/* File attachment message */}
                  {message.type === "file" && (
                    <div
                      className={`-ml-8 px-8 py-2 rounded-2xl backdrop-blur-2xl ${
                        message.sender === "user"
                          ? "bg-primary/60 text-[#ffffff]"
                          : "bg-[#1d1d1d50] text-[#BABABA]"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        {message.sender === "user" && (
                          <>
                            <div className="bg-black/30 rounded-lg p-3">
                              <LuFile size={24} />
                            </div>
                            <div className=" flex items-end gap-3">
                              <div className="flex-1">
                                <p className="font-medium">
                                  {message.fileName}
                                </p>
                                <p className="text-sm opacity-70">
                                  {message.fileSize}
                                </p>
                              </div>
                              <span className="text-xs text-[#7F7F7F] mr-1">
                                {message.time}
                              </span>
                            </div>
                          </>
                        )}
                        {message.sender === "rep" && (
                          <>
                            <div className="flex-1">
                              <p className="font-medium">{message.fileName}</p>
                              <p className="text-sm opacity-70">
                                {message.fileSize}
                              </p>
                            </div>
                            <div className="flex items-end gap-3">
                              <div className="bg-black rounded-lg p-4 ml-3 hover:opacity-90 cursor-pointer transition-opacity">
                                <FaCloudArrowDown
                                  size={20}
                                  className="text-[#eb5939] scale-x-[-1]"
                                />
                              </div>
                              <span className="text-xs text-[#7F7F7F] mr-1">
                                {message.time}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image attachment message */}
                  {message.type === "image" && (
                    <div
                      className={`p-2 rounded-2xl backdrop-blur-2xl overflow-hidden ${
                        message.sender === "user"
                          ? "bg-primary/60 text-[#ffffff]"
                          : "bg-[#1d1d1d50] text-[#BABABA]"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden relative">
                        <img
                          src={message.imageUrl || "/api/placeholder/400/320"}
                          alt="Attachment"
                          className="w-full h-auto max-h-64 object-cover"
                        />
                        <span className="text-xs text-white mr-1 absolute bottom-1 right-1">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Code attachment message - From image */}
                  {message.type === "code" && (
                    <div
                      className={`p-2 rounded-2xl backdrop-blur-2xl overflow-hidden ${
                        message.sender === "user"
                          ? "bg-primary/60 text-[#ffffff]"
                          : "bg-[#1d1d1d50] text-[#BABABA]"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden bg-[#5b0a00] p-4 text-[#f0a894] font-mono text-sm">
                        <pre>{message.code}</pre>
                      </div>
                    </div>
                  )}

                  <div className=" absolute -right-15 bottom-0">
                    {message.sender === "user" && (
                      <LuCheck className="text-primary size-4" />
                    )}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="size-12 rounded-full overflow-hidden border border-primary ml-3 flex-shrink-0 bg-[#2A2A2A] flex items-center justify-center">
                    <LuUser className="text-primary size-5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Hidden file input that accepts all files */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAttachment}
            className="hidden"
          />

          {/* Input field */}
          <div className="p-4">
            <div className="relative flex w-full items-center px-14 gap-3">
              <div className="flex flex-1 bg-[#000000] rounded-full py-2.5 pl-4 pr-4 focus:outline-none focus:ring-1 focus:ring-primary">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message"
                  className="!pointer-events-auto w-full text-[#BABABA] focus:outline-none bg-transparent"
                />
                <button
                  className="text-[#7F7F7F] hover:text-primary transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <LuPaperclip size={20} />
                </button>
              </div>
              <div className="ml-2">
                <Button onClick={handleSendMessage} type="send">
                  SEND
                </Button>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <p className="text-xs text-[#7F7F7F] flex items-center gap-1">
                <span>256-Bit End-to-end encrypted</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full text-center">
      <div className="hidden absolute max-w-24 w- -top-4 left-0 right-0 mx-auto lg:flex justify-center items-center gap-2">
        {[0, 1, 2].map((index) => (
          <LuHexagon
            key={index}
            size={16}
            fill={getFill(index)}
            className="size-4 text-primary transition-all duration-500"
          />
        ))}
      </div>

      <div className="chat-bg h-full bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8">
        <div className="flex flex-col h-full justify-center items-center">
          <p>Hold tight! A representative will join the chat shortly.</p>
          <h1 className="text-9xl text-primary leading-none my-4">
            {formatTime(elapsedTime)}
          </h1>
          <p className="text-[#7F7F7F]">Estimated: 1:08</p>
        </div>
      </div>
    </div>
  );
};

export default ChatWaitingScreen;
