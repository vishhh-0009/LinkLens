import { useState } from "react";
import { createShortLink, getQRCode } from "../services/linkService";
function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [result, setResult] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const handleSubmit = async () => {
    try {
      const data = await createShortLink({
        long_url: longUrl,
        custom_alias: customAlias,
        expiry_date: expiryDate || null,
      });

      setResult(data);

      const qrData = await getQRCode(data.short_code);
      setQrCode(qrData.qrCode);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.error || "Failed");
    }
  };

  return (
    <div className="w-full max-w-3xl mt-12">
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 outline-none text-white cursor-pointer relative z-50"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Custom Alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 outline-none text-white cursor-pointer relative z-50"
          />
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 outline-none text-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-white text-black py-4 rounded-xl font-semibold hover:scale-[1.02] transition cursor-pointer relative z-50"
        >
          Generate Smart Link
        </button>

        {result && (
          <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
            <p className="text-green-400 font-semibold">
              Short URL Created Successfully ✅
            </p>

            <p className="mt-3">
              <strong>Code:</strong> {result.short_code}
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:5000/api/links/${result.short_code}`,
                );

                alert("Link copied successfully 🚀");
              }}
              className="mt-3 bg-blue-600 px-4 py-2 rounded-lg"
            >
              Copy Link
            </button>

            {qrCode && (
              <div className="mt-6 flex flex-col items-center">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-44 h-44 bg-white p-2 rounded-xl"
                />

                <p className="text-gray-400 mt-2">Scan QR to open link</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default UrlForm;
