import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Image
        src="/cidc.png"
        width={200}
        height={180}
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <div className="flex flex-col items-center justify-center p-5 text-center align-middle text-white text-5xl">
        CIDC NextJS Starter
      </div>
    </main>
  );
}
