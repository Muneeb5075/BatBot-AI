import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        const effectivePrompt = prompt || input;
        setRecentPrompt(effectivePrompt);

        try {
            const response = await runChat(effectivePrompt);
            // Split response into paragraphs by double newlines
            const paragraphs = response.split("\n\n");
            let newResponse = "";

            paragraphs.forEach((para, index) => {
                // First paragraph as heading
                if (index === 0) {
                    newResponse += `<h2>${para}</h2>`;
                    return;
                }
                // Handle bullet points (lines starting with "*")
                if (para.includes("*")) {
                    const items = para
                        .split("\n")
                        .filter((line) => line.trim().startsWith("*"))
                        .map((line) => {
                            const content = line.replace(/^\*\s*/, "").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
                            return `<li>${content}</li>`;
                        });
                    if (items.length > 0) {
                        newResponse += `<ul>${items.join("")}</ul>`;
                    } else {
                        newResponse += `<p>${para.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")}</p>`;
                    }
                } else {
                    // Regular paragraph with bold formatting
                    newResponse += `<p>${para.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")}</p>`;
                }
            });

            setResultData(`<div>${newResponse}</div>`);
        } catch (error) {
            setResultData("<p>Error fetching response</p>");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;