import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, DiseaseInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    isPlant: {
      type: Type.BOOLEAN,
      description: "Is the image of a plant leaf? Must be true or false."
    },
    diseaseName: {
      type: Type.STRING,
      description: "The common name of the plant disease. If healthy or not a plant, state 'Healthy' or 'Not a Plant Leaf'."
    },
    confidence: {
      type: Type.STRING,
      enum: ["High", "Medium", "Low", "N/A"],
      description: "The confidence level of the diagnosis. 'N/A' if not a plant or healthy."
    },
    description: {
      type: Type.STRING,
      description: "A brief, easy-to-understand description of the disease."
    },
    possibleCauses: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A list of common causes for the disease."
    },
    recommendedTreatments: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A list of actionable treatment steps or solutions."
    },
  },
  required: ["isPlant", "diseaseName", "confidence", "description", "possibleCauses", "recommendedTreatments"]
};

const diseaseLibrarySchema = {
    type: Type.OBJECT,
    properties: {
        diseases: {
            type: Type.ARRAY,
            description: "A list of common plant diseases.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: "The common name of the plant disease."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A brief, one or two-sentence description of the disease."
                    }
                },
                required: ["name", "description"]
            }
        }
    },
    required: ["diseases"]
};

export async function analyzePlantLeaf(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: `Analyze this image of a plant leaf. Determine if it has a disease. If it's not a plant leaf or is healthy, please indicate that. Provide a detailed analysis based on the JSON schema.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw new Error("Failed to analyze the plant leaf. The AI model could not process the request.");
  }
}

export async function getCommonPlantDiseases(): Promise<DiseaseInfo[]> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: "Generate a list of 12 common plant diseases. For each disease, provide its common name and a brief, one-to-two sentence description suitable for a general audience. Format the output as JSON according to the provided schema." }] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: diseaseLibrarySchema,
            },
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return result.diseases as DiseaseInfo[];

    } catch (error) {
        console.error("Error fetching disease library from Gemini:", error);
        throw new Error("Failed to load the disease library. The AI model could not process the request.");
    }
}
