// pages/page.tsx
import React from "react";
import Layout from "@/components/Layout/Layout";
import SparkleIcon from "@/components/SparkleIcon";

// Custom Components
import { Article } from "@/components/Article";
import { img as Img } from "@/components/CustomImage";

const Page = () => {
  return (
    <Layout>
      {/* <Article id="introduction-greenmarket" date={date1}>
        <Img
          src={GreenMarketImage}
          alt="Introduction to GreenMarket"
          width={800}
          height={450}
        />
        <h2 className="text-2xl font-bold mt-4">
          <SparkleIcon className="h-4 w-4" /> Welcome to GreenMarket: A New Era
          in Emission Trading
        </h2>
        <p className="text-md mt-2">
          {`GreenMarket is transforming the environmental impact landscape by enabling companies to trade a wider range of emission credits, including CO2, methane, and more. Our platform brings together 'green' companies, which absorb significant amounts of greenhouse gases, with businesses that aim to offset their emissions.`}
        </p>
      </Article> */}

      <Article
        id="sustainable-business-impact"
        date="Sustainable Business Impact"
      >
        <Img
          src={"/images/trees.png"}
          alt="Sustainable Business Impact"
          width={800}
          height={450}
        />
        <h3 className="text-xl font-bold mt-4 dark:text-white">
          <SparkleIcon className="h-6 w-6" /> Empowering Sustainable Businesses
        </h3>
        <p className="text-lg mt-2">
          {`Businesses that contribute significantly to environmental sustainability by absorbing greenhouse gases can now leverage GreenMarket to get recognized and rewarded. By minting and selling their emission reduction credits as NFTs, these eco-friendly companies can generate new revenue streams while aiding others in achieving their sustainability goals.`}
        </p>
      </Article>

      <Article id="nft-minting-process" date="Innovative NFT Minting">
        <Img
          src={"/images/nft.png"}
          alt="NFT Minting Process in GreenMarket"
          width={800}
          height={450}
        />
        <h3 className="text-xl font-bold mt-4 dark:text-white">
          <SparkleIcon className="h-6 w-6" /> The NFT Minting Process for
          Emission Credits
        </h3>
        <p className="text-lg mt-2">
          {`GreenMarket utilizes NFT technology to mint unique emission credits. These digital assets represent verified environmental contributions, such as CO2 absorption or methane reduction. This method ensures the authenticity and traceability of each credit, empowering 'green' companies to effectively monetize their positive environmental impact.`}
        </p>
      </Article>

      <Article
        id="emission-trading-mechanism"
        date="Emission Trading Mechanism"
      >
        <Img
          src={"/images/emissions.png"}
          alt="Emission Trading Mechanism"
          width={800}
          height={450}
        />
        <h3 className="text-xl font-bold mt-4 dark:text-white">
          <SparkleIcon className="h-6 w-6" /> How Emission Trading Works on
          GreenMarket
        </h3>
        <p className="text-lg mt-2">
          {`On GreenMarket, companies with high emission levels can purchase NFT-based emission credits to offset their environmental impact. This process provides a flexible and transparent way for businesses to meet regulatory requirements and sustainability commitments, while also supporting eco-friendly initiatives and green companies.`}
        </p>
      </Article>
      <Article id="reforestation-commitment" date="Reforestation Initiative">
        <Img
          src={"/images/reforestation.png"}
          alt="Reforestation Commitment"
          width={800}
          height={450}
        />
        <h3 className="text-xl font-bold mt-4 dark:text-white">
          <SparkleIcon className="h-6 w-6" /> Our Commitment to Reforestation
        </h3>
        <p className="text-lg mt-2">
          {`As part of our mission to foster a greener planet, GreenMarket dedicates a portion of its earnings to reforestation projects. Every transaction on our platform contributes to planting trees across the globe, helping to restore ecosystems, enhance biodiversity, and combat climate change.`}
        </p>
      </Article>
    </Layout>
  );
};

export default Page;
