import Image from "next/image"; 

export default function SocialProof() {
  return (
    <>
      {" "}
      <div className="w-full  flex gap-2 p-2 items-center justify-center">
        <div className="flex">
          <Image
            className="hue-rotate-270"
            src={"/hamza.png"}
            width={40}
            height={40}
            alt="social proof image"
          />
          <Image
            className="-ml-2 grayscale"
            src={"/hamza.png"}
            width={40}
            height={40}
            alt="social proof image"
          />
          <Image
            className="-ml-2 invert"
            src={"/hamza.png"}
            width={40}
            height={40}
            alt="social proof image"
          />
          <Image
            className="-ml-2 sepia-50"
            src={"/hamza.png"}
            width={40}
            height={40}
            alt="social proof image"
          />
        </div>
        <div>
          <div className="flex">
            <Image src={"/star.png"} width={14} height={14} alt="star icon" />
            <Image src={"/star.png"} width={14} height={14} alt="star icon" />
            <Image src={"/star.png"} width={14} height={14} alt="star icon" />
            <Image src={"/star.png"} width={14} height={14} alt="star icon" />
            <Image src={"/star.png"} width={14} height={14} alt="star icon" />
          </div>
          <span className="text-sm text-text/70">
            Trusted by 20,000+ members
          </span>
        </div>
      </div>
    </>
  );
}
