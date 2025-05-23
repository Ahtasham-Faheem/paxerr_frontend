"use client";
import { useEffect, useState, useRef } from "react";
import {
  LuHexagon,
  LuPaperclip,
  LuCheck,
  LuUser,
  LuFile,
  LuArrowLeft,
  LuSquareArrowOutUpRight,
} from "react-icons/lu";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoSend } from "react-icons/io5";
import Button from "../../ui/Button";
import MOrderSummary from "./MOrderSummary";
import MPaymentMethods from "./MPaymentMethods";

const MChatWaitingScreen = () => {
  // Ensure the component is fully interactive by adding pointer-events handling
  useEffect(() => {
    // Force pointer-events-auto on the root elements
    document.documentElement.classList.add("!pointer-events-auto");
    document.body.classList.add("!pointer-events-auto");

    // Add a class to the parent container to ensure proper interaction
    const container = document.querySelector("[data-mchat-container]");
    if (container) {
      container.classList.add("mchat-container");
    }

    return () => {
      // Clean up when component unmounts
      document.documentElement.classList.remove("!pointer-events-auto");
      document.body.classList.remove("!pointer-events-auto");
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Order summary state
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Payment screen state - instead of overlay
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  // Payment currency state
  const [currencyState, setCurrencyState] = useState({
    showChat: false,
    showPaymentScreen: false,
    showSignUp: false,
    showSignIn: false,
    showQrPayment: false,
    selectedCurrency: "USDT",
    showCurrencyOptions: false,
  });

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

  // Count up timer and switch to chat after a few seconds (for demo)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        // Switch to chat after 5 seconds
        if (newTime === 5) {
          setShowChat(true);
          // Add initial messages from representative
          setMessages([
            {
              id: 1,
              sender: "rep",
              type: "file",
              fileName: "master_pro...zip",
              fileSize: "3.13 MB",
              time: "11:11",
            },
            {
              id: 2,
              sender: "rep",
              text: "Hey there! How may we help you today?",
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

    // Check if the message is "order" to show order summary
    if (inputMessage.trim().toLowerCase() === "order") {
      setShowOrderSummary(true);

      // Simulate representative response about the order
      setTimeout(() => {
        const repResponse = {
          id: messages.length + 2,
          sender: "rep",
          text: "Here's your order summary. Please review the details and confirm when ready.",
          time: "11:12",
        };
        setMessages((prev) => [...prev, repResponse]);
      }, 1000);
    } else if (messages.length === 2) {
      // Default response if not about order
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

    setInputMessage("");
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

  // Show payment screen and hide chat
  const handleShowPayment = () => {
    setShowChat(false);
    setShowPaymentScreen(true);

    // Add a message indicating payment is being processed when returning to chat
    const paymentMessage = {
      id: messages.length + 1,
      sender: "rep",
      text: "Processing your payment... Thank you for your order!",
      time: "11:13",
    };
    setMessages((prev) => [...prev, paymentMessage]);
  };

  // Close payment screen and show chat
  const handleClosePaymentScreen = () => {
    setShowPaymentScreen(false);
    setShowChat(true);

    // Add a confirmation message after payment is processed
    setTimeout(() => {
      const confirmationMessage = {
        id: messages.length + 1,
        sender: "rep",
        text: "Your payment has been successfully processed. We'll start working on your order right away!",
        time: "11:14",
      };
      setMessages((prev) => [...prev, confirmationMessage]);

      // Hide order summary
      setShowOrderSummary(false);
    }, 500);
  };

  // Currency option toggle handlers
  const handleToggleCurrencyOptions = () => {
    setCurrencyState((prev) => ({
      ...prev,
      showCurrencyOptions: !prev.showCurrencyOptions,
    }));
  };

  const handleSelectCurrency = (currency) => {
    setCurrencyState((prev) => ({
      ...prev,
      selectedCurrency: currency,
      showCurrencyOptions: false,
    }));
  };

  // Common message container styles
  const getMessageContainerStyles = (sender) => {
    return `max-w-[85%] ${sender === "user" ? "ml-auto" : ""}`;
  };

  // Message bubble styles
  const getMessageBubbleStyles = (sender) => {
    return `${
      sender === "user"
        ? "bg-[#eb5939] rounded-full px-6 py-3 text-white"
        : "bg-[#17171780] backdrop-blur-sm rounded-2xl px-5 py-3 text-white"
    }`;
  };

  // Payment screen view
  if (showPaymentScreen) {
    return (
      <div
        className="relative flex flex-col justify-center items-center w-full h-full mt-5 !pointer-events-auto"
        data-mchat-container
      >
        <MPaymentMethods
          initialState={currencyState}
          onToggleCurrencyOptions={handleToggleCurrencyOptions}
          onSelectCurrency={handleSelectCurrency}
          onBack={handleClosePaymentScreen}
        />
      </div>
    );
  }

  // Chat view
  if (showChat) {
    return (
      <div
        className="relative w-full h-full !pointer-events-auto"
        data-mchat-container
      >
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            style={{ pointerEvents: "auto" }}
            className="text-white mr-5 cursor-pointer transition-colors"
          >
            <img
              className="size-10 lg:size-auto"
              src="/images/icons/backarrow.svg"
              alt=""
            />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#eb5939] mr-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Representative"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-white">Anatoli Petrovich</h3>
              <p className="text-xs text-[#777777]">Typing...</p>
            </div>
          </div>
        </div>

        {/* Main content with chat messages */}
        <div className="h-[calc(100%-132px)] mt-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`px-4 mb-6 flex flex-col ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-end gap-2 mb-1">
                {message.sender === "user" && (
                  <LuCheck className="text-[#eb5939] size-4" />
                )}
                <div className={`${getMessageContainerStyles(message.sender)}`}>
                  {/* Regular text message */}
                  {!message.type && (
                    <div
                      className={`${getMessageBubbleStyles(
                        message.sender
                      )} overflow-hidden`}
                    >
                      <p>{message.text}</p>
                    </div>
                  )}

                  {/* File attachment message */}
                  {message.type === "file" && (
                    <div
                      className={`${getMessageBubbleStyles(message.sender)}`}
                    >
                      <div className="flex items-center gap-3">
                        {message.sender === "rep" ? (
                          <>
                            <div className="bg-[#eb5939] rounded-full p-2">
                              <FaCloudArrowDown
                                size={18}
                                className="text-white scale-x-[-1]"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{message.fileName}</p>
                              <p className="text-xs opacity-70">
                                {message.fileSize}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-black/30 rounded-lg p-2">
                              <LuFile size={18} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{message.fileName}</p>
                              <p className="text-xs opacity-70">
                                {message.fileSize}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image attachment message */}
                  {message.type === "image" && (
                    <div
                      className={`${getMessageBubbleStyles(message.sender)}`}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={message.imageUrl || "/api/placeholder/400/320"}
                          alt="Attachment"
                          className="w-full h-auto max-h-64 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                {message.sender === "rep" && (
                  <LuCheck className="text-[#eb5939] size-4" />
                )}
              </div>

              {/* Time display outside the bubble */}
              <div
                className={`text-xs text-[#777777] px-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.time}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* Order Summary panel */}
          {showOrderSummary && (
            <MOrderSummary onShowPayment={handleShowPayment} />
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAttachment}
          className="hidden"
          style={{ pointerEvents: "auto" }}
        />

        {/* Input field */}
        <div className="absolute bottom-0 left-0 right-0 p-1 bg-[#17171780] rounded-full backdrop-blur-sm mb-4">
          <div className="flex items-center">
            <div className="flex-1 px-4 mr-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message"
                className="w-full text-gray-300 focus:outline-none bg-transparent text-sm"
                style={{ pointerEvents: "auto", cursor: "text" }}
              />
            </div>
            <button
              className="text-[#777777] h-10 w-10 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              style={{ pointerEvents: "auto" }}
            >
              <LuPaperclip size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              className="text-primary rounded-md w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{ pointerEvents: "auto" }}
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Waiting screen view (default initial view)
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-center">
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

      <div className="chat-bg h-1/2 bg-[#17171791] backdrop-blur-xs py-8 lg:pt-12 2xl:pt-16 px-5 lg:px-8">
        <div className="flex flex-col h-full justify-center items-center">
          <p>Hold tight! A representative will join the chat shortly.</p>
          <h1 className="text-4xl text-primary leading-none my-4">
            {formatTime(elapsedTime)}
          </h1>
          <p className="text-[#7F7F7F]">Estimated: 1:08</p>
        </div>
      </div>
    </div>
  );
};

export default MChatWaitingScreen;
