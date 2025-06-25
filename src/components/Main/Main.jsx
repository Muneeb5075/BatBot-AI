import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Batbto97jk</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Unde, nesciunt.
                </p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Placeat, ratione?
                </p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Unde, nesciunt.
                </p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Unde, nesciunt.
                </p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <input
                type="file"
                id="formFile"
                style={{ display: "none" }}
                onChange={(e) => onSent(e.target.files[0])}
              />
              <label htmlFor="formFile" style={{ cursor: "pointer" }}>
                <img src={assets.gallery_icon} alt="Upload Icon" />
              </label>
              <img
                src={assets.mic_icon}
                alt="Mic Icon"
                style={{ cursor: "pointer" }}
                onClick={() => alert("Mic functionality not implemented")}
              />
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="Send Icon"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            minus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;