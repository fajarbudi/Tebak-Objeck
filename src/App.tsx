import Webcam from "react-webcam";
import * as Tf from "@tensorflow/tfjs";
import * as cocoModel from "@tensorflow-models/coco-ssd";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [models, seModels]: any = useState("");
  const [objects, setObjects] = useState([]);

  async function model() {
    const data = await cocoModel.load();
    seModels(data);
  }

  useEffect(() => {
    Tf.ready().then(() => {
      model();
    });
  }, []);

  async function predik() {
    const detections = await models.detect(document.getElementById("kamera"));
    setObjects(detections);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div>
          {objects.map(
            (object: { class: string; score: number }, i: number) => (
              <div key={i} className="object neumorpism">
                <div>
                  <h1 style={{ textAlign: "center" }}>{object.class}</h1>
                  <h1>Akurasi : {object.score.toFixed(2)}</h1>
                </div>
              </div>
            )
          )}
        </div>
        <h1
          style={{
            display: !document.getElementById("kamera") ? "unset" : "none",
          }}>
          Tunggu Webcam Ready...
        </h1>
        <div style={{ position: "relative" }}>
          <Webcam
            className="webcam"
            id="kamera"
            audio={false}
            mirrored={true}
            width={440}
          />
          <button
            onClick={() => predik()}
            style={{
              display: !document.getElementById("kamera") ? "none" : "unset",
            }}>
            Tebak Object
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
