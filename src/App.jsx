import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.location.replace("https://www.innoflowlinktech.com/");
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#070d1c",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h2>Opening InnoFlowlink Tech website...</h2>
    </main>
  );
}
