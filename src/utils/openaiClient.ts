// utils/dallEService.ts

import { Configuration, OpenAIApi } from "openai";

class CustomFormData extends FormData {
  getHeaders() {
    return {};
  }
}

const generateDallEImages = async (/*prompt: string*/) => {
  // OpenAPI Configuration
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    formDataCtor: CustomFormData,
  });

  // Open API Session
  const openai = new OpenAIApi(configuration);

  try {
    // Assuming you have the image Blob
    // const imagePath = "/images/nft-test.png";
    // const responseImage = await fetch(imagePath);
    // const imageBlob = await responseImage.blob();

    // const imageFile = new File([imageBlob], "nft-test.png", {
    //   type: "image/png",
    // });

    // Call the DALL-E 3 API's createImageEdit function
    const response = await openai.createImage({
      prompt:
        "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: Low-poly Geometric Trees Abstract Digital art Stylized Polygonal Nature Landscape Colorful Triangular facets Artistic Computer-generated Minimalist Green foliage Blue sky Outdoors Tranquil Red foliage Seasonal Warm colors Cool colors Bright Simple Modern Contemporary Creative Environment Scenery Summer Autumn Serene Conceptual Illustration Graphic Visual Texture Shadow Light Unique Organic shapes Contrast Vibrant Pastel sky Clear weather Isolated tree Gradient sky Green grass Red field Blue backdrop", // Description for the edit
      n: 1, // Number of images to generate
      size: "1024x1024", // Size of the generated images
    });

    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: "1024x1024",

    // });

    console.log("Response ::: ", response);

    return response.data;
  } catch (error) {
    // if (error.response) {
    //   console.log(error.response.status);
    //   console.log(error.response.data);
    // } else {
    //   console.log(error.message);
    // }
    throw error;
  }
};

export { generateDallEImages };
