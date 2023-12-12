// // src/app/api/extract-emissions-data/route.ts

// import multer from "multer";
// import readXlsxFile from "read-excel-file/node";
// import { NextApiRequest, NextApiResponse } from "next";
// import { createRouter } from "next-connect";

// const upload = multer({ storage: multer.memoryStorage() });

// // Custom middleware to adapt multer for next-connect
// const multerMiddleware = (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     if (err) {
//       return next(err);
//     }
//     next();
//   });
// };

// // Router initialization
// const router = createRouter<NextApiRequest, NextApiResponse>();

// // POST handler
// export const POST = router.use(multerMiddleware).post(async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     let totalEmissions = 0;
//     let totalAbsorptions = 0;
//     let monthlyData = {};

//     const buffer = req.file.buffer;
//     await readXlsxFile(buffer).then((rows) => {
//       for (let i = 1; i < rows.length; i++) {
//         const [month, nature, value] = rows[i];
//         // Process rows...
//       }
//     });

//     const isGreenCompany = totalAbsorptions > totalEmissions;
//     res.json({ isGreenCompany, totalEmissions, totalAbsorptions, monthlyData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import multer from "multer";

// export async function POST(req, res) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file"); // 'upload' is the name of the file input field

//     if (!file || typeof file === "string") {
//       throw new Error("The file is missing.");
//     }

//     let totalEmissions = 0;
//     let totalAbsorptions = 0;
//     let monthlyData = {};

//     // Use the arrayBuffer directly, since readXlsxFile can handle it
//     const arrayBuffer = await file.arrayBuffer();
//     await readXlsxFile(arrayBuffer).then((rows) => {
//       for (let i = 1; i < rows.length; i++) {
//         const [month, nature, value] = rows[i];
//         console.log("month ", month);
//         const numericValue = Number(value);
//         if (!isNaN(numericValue)) {
//           if (nature === "Emission") {
//             totalEmissions += numericValue;
//           } else if (nature === "Absorption") {
//             totalAbsorptions += numericValue;
//           }
//           monthlyData[month] = monthlyData[month] || {
//             emissions: 0,
//             absorptions: 0,
//           };
//           if (nature === "Emission") {
//             monthlyData[month].emissions += numericValue;
//           } else if (nature === "Absorption") {
//             monthlyData[month].absorptions += numericValue;
//           }
//         }
//       }

//       const isGreenCompany = totalAbsorptions > totalEmissions;

//       res.status(200).json({
//         isGreenCompany,
//         totalEmissions,
//         totalAbsorptions,
//         monthlyData,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

//   //   form.parse(req, async (err, fields, files) => {
//   //     if (err) {
//   //       res.status(500).json({ error: err.message });
//   //       return;
//   //     }

//   //     if (!files) {
//   //       res.status(400).json({ error: "No file uploaded" });
//   //       return;
//   //     }

//   //     console.log("fillleee: ", files[0]);

//   //     let totalEmissions = 0;
//   //     let totalAbsorptions = 0;
//   //     let monthlyData = {};

//   //     const file = files.file as FormidableFile;
//   //     const filePath = file.filepath;

//   //     const stream = fs.createReadStream(filePath);

//   //     try {
//   //       const rows = await readXlsxFile(stream);
//   //       for (let i = 1; i < rows.length; i++) {
//   //         const [month, nature, value] = rows[i];
//   //         console.log("month ", month);
//   //         const numericValue = Number(value);
//   //         // if (!isNaN(numericValue)) {
//   //         //   if (nature === "Emission") {
//   //         //     totalEmissions += numericValue;
//   //         //   } else if (nature === "Absorption") {
//   //         //     totalAbsorptions += numericValue;
//   //         //   }
//   //         //   monthlyData[month] = monthlyData[month] || {
//   //         //     emissions: 0,
//   //         //     absorptions: 0,
//   //         //   };
//   //         //   if (nature === "Emission") {
//   //         //     monthlyData[month].emissions += numericValue;
//   //         //   } else if (nature === "Absorption") {
//   //         //     monthlyData[month].absorptions += numericValue;
//   //         //   }
//   //         // }
//   //       }

//   //       const isGreenCompany = totalAbsorptions > totalEmissions;

//   //       return return NextResponse.json({
//   //         isGreenCompany,
//   //         totalEmissions,
//   //         totalAbsorptions,
//   //         monthlyData,
//   //       });
//   //     } catch (error) {
//   //       console.error(error);
//   //       return return NextResponse.json({ error: "Error processing the file" });
//   //     } finally {
//   //       // Clean up the temp file
//   //       fs.unlinkSync(filePath);
//   //     }
//   //   });

//   //   try {
//   //     // Run the middleware
//   //     //   await runMiddleware(req, res, upload.single("file"));

//   //     console.log("Req.file ", req.file);
//   //     console.log("Req.body ", req.body);

//   //     if (!req.body.file) {
//   //       res.json({ error: "No file uploaded" });
//   //     } else {
//   //       console.log("req.body", req.body);
//   //     }

//   //   const buffer = req.file.buffer;
//   //   let totalEmissions = 0;
//   //   let totalAbsorptions = 0;
//   //   let monthlyData = {};

//   //   // Process the file here
//   //   await readXlsxFile(buffer).then((rows) => {
//   //     // Your logic to process the rows
//   //     for (let i = 1; i < rows.length; i++) {
//   //       const [month, nature, value] = rows[i];
//   //       // Process rows...
//   //       console.log("Month : ", month);
//   //       console.log("Nature : ", nature);
//   //       console.log("Value : ", value);
//   //     }
//   //   });

//   //   const isGreenCompany = totalAbsorptions > totalEmissions;

//   //   return return NextResponse.json({
//   //     isGreenCompany,
//   //     totalEmissions,
//   //     totalAbsorptions,
//   //     monthlyData,
//   //   });
//   //   } catch (error) {
//   //     console.error(error);
//   //     return return NextResponse.json({ error: "Internal Server Error" });
//   //   }
// }

import readXlsxFile from "read-excel-file/node";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: any, res: any) {
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        message: `Method ${req.method} Not Allowed`,
      },
      {
        status: 405,
      }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          message: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const rows = await readXlsxFile(stream);

    let totalEmissions = 0;
    let totalAbsorptions = 0;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthlyData = months.reduce((acc, month) => {
      acc[month] = { emissions: 0, absorptions: 0 };
      return acc;
    }, {});

    for (let i = 1; i < rows.length; i++) {
      const [year, activity, emissions, absorptions, nature] = rows[i];
      const emissionValue = Number(emissions);
      const absorptionValue = Number(absorptions);

      if (!isNaN(emissionValue) && !isNaN(absorptionValue)) {
        totalEmissions += emissionValue;
        totalAbsorptions += absorptionValue;
        const monthIndex = i - 1; // Since i starts from 1 and months array is 0-indexed
        if (monthIndex < months.length) {
          const month = months[monthIndex];
          monthlyData[month].emissions += emissionValue;
          monthlyData[month].absorptions += absorptionValue;
        }
      }
    }

    // for (let i = 1; i < rows.length; i++) {
    //   const [year, activity, emissions, absorptions, nature] = rows[i];
    //   const emissionValue = Number(emissions);
    //   const absorptionValue = Number(absorptions);
    //   let monthlyData: any = {};

    //   if (!isNaN(emissionValue) && !isNaN(absorptionValue)) {
    //     totalEmissions += emissionValue;
    //     totalAbsorptions += absorptionValue;

    //     monthlyData[i].emissions = emissionValue;
    //     monthlyData[i].absorptions = absorptionValue;

    //     // monthlyData[month] = monthlyData[month] || {
    //     //   emissions: 0,
    //     //   absorptions: 0,
    //     // };
    //     // monthlyData[month].emissions += emissionValue;
    //     // monthlyData[month].absorptions += absorptionValue;
    //   }
    // }

    const emissionAbsorptionDiff = totalAbsorptions - totalEmissions;
    const isGreenCompany = emissionAbsorptionDiff > 0;
    const resultsArray = Object.values(monthlyData).map((data: any) => [
      data.emissions,
      data.absorptions,
    ]);

    return NextResponse.json(
      {
        isGreen: isGreenCompany,
        emissionAbsorptionDiff,
        resultsArray,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
