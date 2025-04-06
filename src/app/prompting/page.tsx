"use client";

import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";


export default function Page() {
const [input, setInput] = useState(`You are an expert at creating beautiful clean API documentation in the style of ShadCN. Make me a thorough piece of API documentation in the style of ShadCN that is just html and tailwind css. Only return the plain code as text (do not wrap it in markdown code fences or include any syntax highlighting) so I can render it on a webpage for this code: @app.route("/recharge", methods=["POST"])
def recharge_account():
    """
    POST /recharge
    Expects a JSON payload:
      - user_id: int
      - amount: float
    Adds the specified amount to the user's balance.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    user_id = data.get("user_id")
    amount = data.get("amount", 0)

    # Locate the user
    user = next((u for u in users if u["id"] == user_id), None)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    user["balance"] += amount
    return jsonify({
        "message": "Recharge successful",
        "new_balance": user["balance"]
    }), 200"); `);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const handleTestPrompt = async () => {
    try {
      // Here, "TestComponent" is passed as the component name; adjust as needed.
      setLoading(true);
      const result = await gemmaSend(input);
      console.log(result)
      const htmlString = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(htmlString)
      setResponse(htmlString);
      setLoading(false);
    } catch (error) {
      console.error("Error calling gemmaSend:", error);
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter prompt"
        className="border p-2 rounded mb-4 w-full resize-y overflow-hidden"
        rows={3} // starting height, adjust as needed
      />
      <button
        onClick={handleTestPrompt}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Test Prompt
      </button>
        {loading && (
            <div>
                loading
            </div>
        )
        
        }

      {response && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Response:</h3>
          <div
      className="bg-gray-100 p-4 rounded text-black"
      dangerouslySetInnerHTML={{ __html: response }}
    />
          {/* <pre className="bg-gray-100 p-4 rounded text-black">
            {response}
          </pre> */}
        </div>
      )}
    </div>
  );
}


async function gemmaSend(inputText: string): Promise<any> {

  const llm_key = process.env.NEXT_PUBLIC_LLM_KEY;
  if (!llm_key) {
    throw new Error("llm_key is not defined in your environment variables.");
  }
  
  const ai = new GoogleGenAI({ apiKey: llm_key });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: inputText,
  });

  return response;
  
}

