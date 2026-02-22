
export default function MapComponent() {
  return (
    <div style={{ height: "450px", width: "100%" }}>
      <iframe
        src="https://maps.google.com/maps?q=22.7182218,75.8846607&z=17&output=embed"
        width="100%"
        height="450px"
        frameBorder="0"
        style={{ border: 0, display: "block" }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title="Edunoble Location - Nipania, Indore"
      ></iframe>
    </div>
  );
}
